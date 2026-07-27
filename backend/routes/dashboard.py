from flask import Blueprint, jsonify
from database import mysql

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard/stats")
def dashboard_stats():

    cursor = mysql.connection.cursor()

    # Total Users
    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    # Total Products
    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]

    # Low Stock
    cursor.execute("""
        SELECT COUNT(*)
        FROM inventory
        WHERE quantity <= low_stock_limit
    """)
    low_stock = cursor.fetchone()[0]

    # Total Receipts
    cursor.execute("""
        SELECT COUNT(*)
        FROM issued_products
    """)
    receipts = cursor.fetchone()[0]

    cursor.close()

    return jsonify({
        "total_users": total_users,
        "total_products": total_products,
        "low_stock": low_stock,
        "receipts": receipts
    })