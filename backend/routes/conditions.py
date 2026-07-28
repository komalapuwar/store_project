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



# JWT TOKEN CHECK
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
            token = auth_header.split()[1]

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



# GET ALL PRODUCT CONDITION HISTORY
@conditions_bp.route("/conditions", methods=["GET"])
@token_required
def get_conditions():

    cursor = mysql.connection.cursor()

    try:

        query = """
            SELECT
                pc.condition_id,
                pc.product_id,
                p.product_name,
                pc.condition_status,
                pc.remarks,
                u.user_name AS checked_by,
                pc.checked_date

            FROM product_condition pc

            JOIN products p
            ON pc.product_id = p.product_id

            LEFT JOIN users u
            ON pc.checked_by = u.user_id

            ORDER BY pc.checked_date DESC
        """

        cursor.execute(query)

        columns = [col[0] for col in cursor.description]

        rows = cursor.fetchall()

        data = []

        for row in rows:
            data.append(dict(zip(columns, row)))


        return success_response(
            data,
            "Product condition history retrieved"
        )


    except Exception as e:

        return error_response(
            str(e),
            500
        )


    finally:
        cursor.close()



# ADD PRODUCT CONDITION
@conditions_bp.route("/conditions", methods=["POST"])
@token_required
def add_condition():

    data = request.get_json() or {}

    product_id = data.get("product_id")
    condition_status = data.get("condition_status")
    remarks = data.get("remarks")


    if not product_id or not condition_status:
        return error_response(
            "product_id and condition_status are required"
        )


    if condition_status not in [
        "Good",
        "Damaged",
        "Repair"
    ]:
        return error_response(
            "Invalid condition"
        )


    cursor = mysql.connection.cursor()


    try:

        # Check product exists
        cursor.execute(
            """
            SELECT product_name
            FROM products
            WHERE product_id=%s
            """,
            (product_id,)
        )

        product = cursor.fetchone()


        if not product:
            return error_response(
                "Product not found",
                404
            )


        user_id = g.current_user.get("user_id")


        # Insert condition history
        cursor.execute(
            """
            INSERT INTO product_condition
            (
                product_id,
                condition_status,
                remarks,
                checked_by
            )
            VALUES(%s,%s,%s,%s)
            """,
            (
                product_id,
                condition_status,
                remarks,
                user_id
            )
        )


        # Notification for damaged products
        if condition_status in [
            "Damaged",
            "Repair"
        ]:


            message = (
                f"Product '{product[0]}' condition is "
                f"{condition_status}. "
                f"Remarks: {remarks}"
            )


            cursor.execute(
                """
                INSERT INTO notifications
                (
                    user_id,
                    message,
                    type
                )
                VALUES
                (%s,%s,'General')
                """,
                (
                    user_id,
                    message
                )
            )


        mysql.connection.commit()


        return success_response(
            message="Product condition added successfully"
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            str(e),
            500
        )


    finally:
        cursor.close()



# GET SINGLE PRODUCT CONDITION
@conditions_bp.route("/conditions/<int:product_id>", methods=["GET"])
@token_required
def get_product_condition(product_id):

    cursor = mysql.connection.cursor()


    try:

        cursor.execute(
            """
            SELECT
                condition_id,
                product_id,
                condition_status,
                remarks,
                checked_by,
                checked_date

            FROM product_condition

            WHERE product_id=%s

            ORDER BY checked_date DESC
            """,
            (product_id,)
        )


        rows = cursor.fetchall()

        columns = [
            "condition_id",
            "product_id",
            "condition_status",
            "remarks",
            "checked_by",
            "checked_date"
        ]


        data = []

        for row in rows:
            data.append(dict(zip(columns,row)))


        return success_response(
            data,
            "Condition details retrieved"
        )


    except Exception as e:

        return error_response(
            str(e),
            500
        )


    finally:
        cursor.close()