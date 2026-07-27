import jwt
from functools import wraps

from flask import Blueprint, request, jsonify, current_app, g
from database import mysql


conditions_bp = Blueprint("conditions", __name__)


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
                "Invalid token",
                401
            )

        return f(*args, **kwargs)

    return decorated



# GET CONDITION HISTORY
@conditions_bp.route("/conditions", methods=["GET"])
@token_required
def get_conditions_history():

    conn = mysql.connection
    cursor = conn.cursor()

    try:

        query = """
            SELECT 
                pc.id,
                pc.product_id,
                p.name AS product_name,
                pc.condition,
                pc.notes,
                u.username AS logged_by,
                pc.created_at
            FROM product_conditions pc
            JOIN products p 
            ON pc.product_id = p.id
            LEFT JOIN users u 
            ON pc.logged_by = u.id
            ORDER BY pc.created_at DESC
        """

        cursor.execute(query)

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

        logs = []

        for row in rows:
            logs.append(dict(zip(columns, row)))


        return success_response(
            data=logs,
            message="Product condition history retrieved"
        )


    except Exception as e:

        return error_response(
            f"Error: {str(e)}",
            500
        )


    finally:

        cursor.close()



# UPDATE PRODUCT CONDITION
@conditions_bp.route("/conditions", methods=["POST"])
@token_required
def update_product_condition():

    data = request.get_json() or {}

    product_id = data.get("product_id")
    condition = data.get("condition", "").strip()
    notes = data.get("notes", "").strip()


    if not product_id or not condition:
        return error_response(
            "product_id and condition are required"
        )


    if condition not in [
        "Good",
        "Damaged",
        "Repair Needed"
    ]:
        return error_response(
            "Invalid condition. Allowed: Good, Damaged, Repair Needed"
        )


    conn = mysql.connection
    cursor = conn.cursor()


    try:

        cursor.execute(
            "SELECT name FROM products WHERE id = %s",
            (product_id,)
        )

        product = cursor.fetchone()


        if not product:
            return error_response(
                "Product not found",
                404
            )


        user_id = g.current_user.get("user_id")


        # Update product condition
        cursor.execute(
            """
            UPDATE products
            SET `condition` = %s
            WHERE id = %s
            """,
            (
                condition,
                product_id
            )
        )


        # Update inventory condition
        cursor.execute(
            """
            UPDATE inventory
            SET `condition` = %s
            WHERE product_id = %s
            """,
            (
                condition,
                product_id
            )
        )


        # Store condition history
        cursor.execute(
            """
            INSERT INTO product_conditions
            (product_id, `condition`, notes, logged_by)
            VALUES (%s, %s, %s, %s)
            """,
            (
                product_id,
                condition,
                notes,
                user_id
            )
        )


        # Create notification
        if condition in [
            "Damaged",
            "Repair Needed"
        ]:

            msg = (
                f"Product '{product[0]}' marked as "
                f"'{condition}'. Notes: {notes}"
            )


            cursor.execute(
                """
                INSERT INTO notifications
                (title, message, type, status)
                VALUES (%s, %s, 'Product Damaged', 'unread')
                """,
                (
                    f"Product {condition}",
                    msg
                )
            )


        mysql.connection.commit()


        return success_response(
            message="Product condition updated successfully"
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error: {str(e)}",
            500
        )


    finally:

        cursor.close()