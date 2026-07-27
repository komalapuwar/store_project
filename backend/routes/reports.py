import jwt
from functools import wraps
from datetime import datetime

from flask import Blueprint, jsonify, request, current_app, g
from database import mysql

report_bp = Blueprint("report", __name__, url_prefix="/reports")


# --------------------------------------------------
# Success Response
# --------------------------------------------------
def success_response(data=None, message="Success", status_code=200):
    response = {
        "success": True,
        "message": message
    }

    if data is not None:
        response["data"] = data

    return jsonify(response), status_code


# --------------------------------------------------
# Error Response
# --------------------------------------------------
def error_response(message="An error occurred", status_code=400):
    return jsonify({
        "success": False,
        "message": message
    }), status_code


# --------------------------------------------------
# JWT Authentication
# --------------------------------------------------
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

            payload = jwt.decode(
                token,
                current_app.config["SECRET_KEY"],
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


# ==================================================
# DAILY REPORT
# ==================================================
@report_bp.route("/daily", methods=["GET"])
@token_required
def daily_report():

    cursor = mysql.connection.cursor()

    try:

        # --------------------------
        # Total Products
        # --------------------------
        cursor.execute("""
            SELECT COUNT(*) AS total_products
            FROM products
        """)

        total_products = cursor.fetchone()["total_products"]


        # --------------------------
        # Low Stock Products
        # --------------------------
        cursor.execute("""
            SELECT
                p.product_name,
                i.quantity_stock,
                i.min_stock
            FROM inventory i
            JOIN products p
            ON i.product_id = p.product_id
            WHERE i.quantity_stock <= i.min_stock
        """)

        low_stock = cursor.fetchall()


        # --------------------------
        # Today's Supplies
        # --------------------------
        cursor.execute("""
            SELECT
                s.supply_id,
                p.product_name,
                s.quantity,
                s.supply_date
            FROM supply s
            JOIN products p
            ON s.product_id = p.product_id
            WHERE DATE(s.supply_date)=CURDATE()
        """)

        supplies = cursor.fetchall()


        # --------------------------
        # Today's Restock Requests
        # --------------------------
        cursor.execute("""
            SELECT
                r.request_id,
                p.product_name,
                r.quantity,
                r.status
            FROM restock_requests r
            JOIN products p
            ON r.product_id=p.product_id
            WHERE DATE(r.request_date)=CURDATE()
        """)

        restocks = cursor.fetchall()


        # --------------------------
        # Damaged Products
        # --------------------------
        cursor.execute("""
            SELECT
                p.product_name,
                pc.condition_status,
                pc.remarks,
                pc.checked_date
            FROM product_condition pc
            JOIN products p
            ON pc.product_id=p.product_id
            WHERE DATE(pc.checked_date)=CURDATE()
            AND pc.condition_status IN
            ('Damaged','Repair')
        """)

        damaged = cursor.fetchall()


        # --------------------------
        # Save Report History
        # --------------------------
        user_id = g.current_user.get("user_id")

        cursor.execute("""
            INSERT INTO reports
            (
                report_name,
                generated_by
            )
            VALUES
            (
                %s,
                %s
            )
        """,
        (
            "Daily Report",
            user_id
        ))

        mysql.connection.commit()


        report = {

            "report_name": "Daily Report",

            "generated_date": datetime.now(),

            "summary": {

                "total_products": total_products,

                "low_stock_products": len(low_stock),

                "today_supplies": len(supplies),

                "today_restock_requests": len(restocks),

                "damaged_products": len(damaged)

            },

            "low_stock_details": low_stock,

            "supplies": supplies,

            "restock_requests": restocks,

            "damaged_products": damaged

        }


        return success_response(
            data=report,
            message="Daily report generated successfully."
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error : {str(e)}",
            500
        )

    finally:

        cursor.close()


# ==================================================
# MONTHLY REPORT
# ==================================================
@report_bp.route("/monthly", methods=["GET"])
@token_required
def monthly_report():

    cursor = mysql.connection.cursor()

    try:

        # --------------------------
        # Total Products
        # --------------------------
        cursor.execute("""
            SELECT COUNT(*) AS total_products
            FROM products
        """)

        total_products = cursor.fetchone()["total_products"]


        # --------------------------
        # Low Stock
        # --------------------------
        cursor.execute("""
            SELECT
                p.product_name,
                i.quantity_stock,
                i.min_stock
            FROM inventory i
            JOIN products p
            ON i.product_id=p.product_id
            WHERE i.quantity_stock<=i.min_stock
        """)

        low_stock = cursor.fetchall()


        # --------------------------
        # Monthly Supplies
        # --------------------------
        cursor.execute("""
            SELECT
                s.supply_id,
                p.product_name,
                s.quantity,
                s.supply_date
            FROM supply s
            JOIN products p
            ON s.product_id=p.product_id
            WHERE s.supply_date>=DATE_SUB(CURDATE(),INTERVAL 30 DAY)
        """)

        supplies = cursor.fetchall()


        # --------------------------
        # Monthly Restock Requests
        # --------------------------
        cursor.execute("""
            SELECT
                r.request_id,
                p.product_name,
                r.quantity,
                r.status
            FROM restock_requests r
            JOIN products p
            ON r.product_id=p.product_id
            WHERE r.request_date>=DATE_SUB(NOW(),INTERVAL 30 DAY)
        """)

        restocks = cursor.fetchall()


        # --------------------------
        # Monthly Damaged Products
        # --------------------------
        cursor.execute("""
            SELECT
                p.product_name,
                pc.condition_status,
                pc.remarks,
                pc.checked_date
            FROM product_condition pc
            JOIN products p
            ON pc.product_id=p.product_id
            WHERE pc.checked_date>=DATE_SUB(NOW(),INTERVAL 30 DAY)
            AND pc.condition_status IN
            ('Damaged','Repair')
        """)

        damaged = cursor.fetchall()


        # --------------------------
        # Save Report
        # --------------------------
        user_id = g.current_user.get("user_id")

        cursor.execute("""
            INSERT INTO reports
            (
                report_name,
                generated_by
            )
            VALUES
            (
                %s,
                %s
            )
        """,
        (
            "Monthly Report",
            user_id
        ))

        mysql.connection.commit()


        report = {

            "report_name": "Monthly Report",

            "generated_date": datetime.now(),

            "summary": {

                "total_products": total_products,

                "low_stock_products": len(low_stock),

                "monthly_supplies": len(supplies),

                "monthly_restock_requests": len(restocks),

                "monthly_damaged_products": len(damaged)

            },

            "low_stock_details": low_stock,

            "monthly_supplies": supplies,

            "monthly_restock_requests": restocks,

            "monthly_damaged_products": damaged

        }


        return success_response(
            data=report,
            message="Monthly report generated successfully."
        )


    except Exception as e:

        mysql.connection.rollback()

        return error_response(
            f"Error : {str(e)}",
            500
        )

    finally:

        cursor.close()