from flask import Blueprint, render_template
from database import mysql


notifications_bp = Blueprint("notifications", __name__)


@notifications_bp.route("/admin/lowstock")
def lowstock():

    cursor = mysql.connection.cursor()

    try:

        cursor.execute("""
            SELECT
                products.product_name,
                inventory.quantity

            FROM inventory

            JOIN products

            ON inventory.product_id = products.product_id

            WHERE inventory.quantity <= 10
        """)


        data = cursor.fetchall()

        products = []

        for row in data:
            products.append({
                "product_name": row[0],
                "quantity": row[1]
            })


        return render_template(
            "notifications.html",
            products=products
        )


    except Exception as e:

        return str(e), 500


    finally:

        cursor.close()