
from flask import Blueprint, request, jsonify, render_template
from database import mysql

supplier_bp = Blueprint('supplier', __name__)


# Open Supplier Page (HTML Form)
@supplier_bp.route('/supplier')
def supplier_page():
    return render_template("supplier.html")


# View all suppliers (JSON)
@supplier_bp.route('/suppliers', methods=['GET'])
def get_suppliers():

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM supplier")

    data = cur.fetchall()

    suppliers = []

    for row in data:
        suppliers.append({
            "supplier_id": row[0],
            "u_id": row[1],
            "add_id": row[2]
        })

    cur.close()

    return jsonify(suppliers)


# Add Supplier
@supplier_bp.route('/suppliers/add', methods=['POST'])
def add_supplier():

    u_id = request.form['u_id']
    add_id = request.form['add_id']

    cursor = mysql.connection.cursor()

    query = """
        INSERT INTO supplier (u_id, add_id)
        VALUES (%s, %s)
    """

    cursor.execute(query, (u_id, add_id))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Supplier added successfully."
    })


# Delete Supplier
@supplier_bp.route('/suppliers/delete/<int:id>', methods=['GET'])
def delete_supplier(id):

    cursor = mysql.connection.cursor()

    cursor.execute(
        "DELETE FROM supplier WHERE supplier_id=%s",
        (id,)
    )

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Supplier deleted successfully."
    })


# Update Supplier
@supplier_bp.route('/suppliers/update/<int:id>', methods=['POST'])
def update_supplier(id):

    u_id = request.form['u_id']
    add_id = request.form['add_id']

    cursor = mysql.connection.cursor()

    query = """
        UPDATE supplier
        SET u_id=%s, add_id=%s
        WHERE supplier_id=%s
    """

    cursor.execute(query, (u_id, add_id, id))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Supplier updated successfully."
    })