import jwt
from functools import wraps

from flask import Blueprint, request, jsonify, current_app, g
from database import mysql


stock_bp = Blueprint("stock", __name__, url_prefix="/stock")


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
            return error_response(
                "Authorization header missing",
                401
            )

        try:
            parts = auth_header.split()

            secret = current_app.config.get(
                "SECRET_KEY",
                "super-secret-jwt-key"
            )

            payload = jwt.decode(
                parts[1],
                secret,
                algorithms=["HS256"]
            )

            g.current_user = payload

        except Exception:
            return error_response(
                "Invalid token",
                401
            )

        return f(*args, **kwargs)

    return decorated



# ADD STOCK
@stock_bp.route("/incoming", methods=["POST"])
@token_required
def record_incoming_stock():

    data = request.get_json() or {}

    product_id = data.get("product_id")
    quantity = data.get("quantity")


    if not product_id or not quantity:
        return error_response(
            "product_id and quantity are required"
        )


    try:
        qty = int(quantity)

        if qty <= 0:
            return error_response(
                "Quantity must be a positive integer"
            )

    except ValueError:
        return error_response(
            "Invalid quantity format"
        )


    cursor = mysql.connection.cursor()


    try:

        cursor.execute(
            """
            SELECT id, current_stock
            FROM inventory
            WHERE product_id = %s
            """,
            (product_id,)
        )

        inv = cursor.fetchone()


        if not inv:
            return error_response(
                "Inventory record not found for product",
                404
            )


        inventory_id = inv[0]
        current_stock = inv[1]


        new_stock = current_stock + qty


        cursor.execute(
            """
            UPDATE inventory
            SET current_stock=%s,
                quantity=%s,
                last_updated=NOW()
            WHERE id=%s
            """,
            (
                new_stock,
                new_stock,
                inventory_id
            )
        )


        mysql.connection.commit()


        return success_response(
            data={
                "product_id": product_id,
                "new_stock": new_stock
            },
            message=f"Added {qty} units to inventory"
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error: {str(e)}",
            500
        )


    finally:
        cursor.close()




# REMOVE STOCK
@stock_bp.route("/outgoing", methods=["POST"])
@token_required
def record_outgoing_stock():

    data = request.get_json() or {}

    product_id = data.get("product_id")
    quantity = data.get("quantity")


    if not product_id or not quantity:
        return error_response(
            "product_id and quantity are required"
        )


    try:

        qty = int(quantity)

        if qty <= 0:
            return error_response(
                "Quantity must be a positive integer"
            )

    except ValueError:
        return error_response(
            "Invalid quantity format"
        )


    cursor = mysql.connection.cursor()


    try:

        cursor.execute(
            """
            SELECT 
                i.id,
                i.current_stock,
                i.min_stock,
                p.name
            FROM inventory i
            JOIN products p
            ON i.product_id = p.id
            WHERE i.product_id=%s
            """,
            (product_id,)
        )


        inv = cursor.fetchone()


        if not inv:
            return error_response(
                "Inventory record not found for product",
                404
            )


        inventory_id = inv[0]
        current_stock = inv[1]
        min_stock = inv[2]
        product_name = inv[3]


        if current_stock < qty:

            return error_response(
                f"Insufficient stock. Available: {current_stock}, Requested: {qty}"
            )


        new_stock = current_stock - qty


        cursor.execute(
            """
            UPDATE inventory
            SET current_stock=%s,
                quantity=%s,
                last_updated=NOW()
            WHERE id=%s
            """,
            (
                new_stock,
                new_stock,
                inventory_id
            )
        )


        if new_stock < min_stock:

            msg = (
                f"Product '{product_name}' stock "
                f"({new_stock}) dropped below minimum "
                f"threshold ({min_stock})."
            )


            cursor.execute(
                """
                INSERT INTO notifications
                (title, message, type, status)
                VALUES (%s,%s,'Low Stock','unread')
                """,
                (
                    "Low Stock Alert",
                    msg
                )
            )


        mysql.connection.commit()


        return success_response(
            data={
                "product_id": product_id,
                "new_stock": new_stock
            },
            message=f"Issued {qty} units from inventory"
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error: {str(e)}",
            500
        )


    finally:
        cursor.close()