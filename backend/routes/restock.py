from flask import Blueprint, jsonify
from database import mysql


restock_bp = Blueprint("restock", __name__)


@restock_bp.route("/admin/restock")
def restock():

    cursor = mysql.connection.cursor()

    try:

        cursor.execute(
            "SELECT * FROM restock_requests"
        )

        data = cursor.fetchall()

        columns = [col[0] for col in cursor.description]

        restock_requests = []

        for row in data:
            restock_requests.append(
                dict(zip(columns, row))
            )


        return jsonify(restock_requests)


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


    finally:

        cursor.close()