import jwt
from functools import wraps

from flask import Blueprint, request, jsonify, current_app, g
from database import mysql


inventory_bp = Blueprint("inventory", __name__, url_prefix="/inventory")


def success_response(data=None, message="Success", status_code=200):
    res = {
        "success": True,
        "message": message
    }

    if data is not None:
        res["data"] = data

    return jsonify(res), status_code


def error_response(message="An error occurred", status_code=400):
    return jsonify({
        "success": False,
        "message": message
    }), status_code


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return error_response("Authorization header missing", 401)

        try:
            parts = auth_header.split()
            token = parts[1]

            secret = current_app.config.get(
                "SECRET_KEY",
                "super-secret-jwt-key"
            )

            payload = jwt.decode(
                token,
                secret,
                algorithms=["HS256"]
            )

            g.current_user = payload

        except Exception:
            return error_response(
                "Invalid or expired token",
                401
            )

        return f(*args, **kwargs)

    return decorated


# GET ALL INVENTORY
@inventory_bp.route("", methods=["GET"])
@token_required
def get_inventory():

    cursor = mysql.connection.cursor()

    try:
        query = """
            SELECT 
                i.id AS inventory_id,
                i.product_id,
                p.name AS product_name,
                p.sku,
                i.quantity,
                i.min_stock,
                i.max_stock,
                i.current_stock,
                i.condition,
                (i.current_stock < i.min_stock) AS is_low_stock,
                i.last_updated
            FROM inventory i
            JOIN products p 
            ON i.product_id = p.id
            ORDER BY i.last_updated DESC
        """

        cursor.execute(query)

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

        items = []

        for row in rows:
            items.append(dict(zip(columns, row)))

        return success_response(
            data=items,
            message="Inventory records retrieved"
        )

    except Exception as e:
        return error_response(
            f"Error fetching inventory: {str(e)}",
            500
        )

    finally:
        cursor.close()



# UPDATE INVENTORY
@inventory_bp.route("/<int:inventory_id>", methods=["PUT"])
@token_required
def update_inventory(inventory_id):

    data = request.get_json() or {}

    cursor = mysql.connection.cursor()

    try:

        cursor.execute(
            """
            SELECT 
                i.id,
                i.product_id,
                i.min_stock,
                p.name
            FROM inventory i
            JOIN products p
            ON i.product_id = p.id
            WHERE i.id = %s
            """,
            (inventory_id,)
        )

        item = cursor.fetchone()

        if not item:
            return error_response(
                "Inventory record not found",
                404
            )


        updates = []
        params = []


        if "min_stock" in data:
            updates.append("min_stock=%s")
            params.append(int(data["min_stock"]))


        if "max_stock" in data:
            updates.append("max_stock=%s")
            params.append(int(data["max_stock"]))


        if "current_stock" in data or "quantity" in data:

            value = int(
                data.get("current_stock")
                if "current_stock" in data
                else data.get("quantity")
            )

            updates.append("current_stock=%s")
            updates.append("quantity=%s")

            params.append(value)
            params.append(value)



        if not updates:
            return error_response(
                "No fields to update provided"
            )


        params.append(inventory_id)


        sql = f"""
            UPDATE inventory
            SET {", ".join(updates)},
            last_updated = NOW()
            WHERE id=%s
        """


        cursor.execute(
            sql,
            tuple(params)
        )


        # Check low stock

        cursor.execute(
            """
            SELECT current_stock, min_stock
            FROM inventory
            WHERE id=%s
            """,
            (inventory_id,)
        )

        updated_item = cursor.fetchone()


        if updated_item[0] < updated_item[1]:

            message = (
                f"Product '{item[3]}' stock "
                f"({updated_item[0]}) is below minimum "
                f"stock ({updated_item[1]})."
            )


            cursor.execute(
                """
                INSERT INTO notifications
                (title, message, type, status)
                VALUES (%s,%s,'Low Stock','unread')
                """,
                (
                    "Low Stock Alert",
                    message
                )
            )


        mysql.connection.commit()


        return success_response(
            message="Inventory updated successfully"
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error updating inventory: {str(e)}",
            500
        )


    finally:

        cursor.close()