from flask import Blueprint, request, jsonify, render_template
from database import mysql

transactions_bp = Blueprint('transactions', __name__)


# Open Transactions Page
@transactions_bp.route('/transactions')
def transactions_page():
    return render_template("transactions.html")



# View all issued products
@transactions_bp.route('/issued_products', methods=['GET'])
def get_issued_products():

    cursor = mysql.connection.cursor()

    cursor.execute("SELECT * FROM issued_products")

    data = cursor.fetchall()

    issued_products = []


    for row in data:

        issued_products.append({
            "is_id": row[0],
            "prodt_id": row[1],
            "is_quantity": row[2],
            "is_date": str(row[3])
        })


    cursor.close()

    return jsonify(issued_products)




# Add issued product
@transactions_bp.route('/issued_products/add', methods=['POST'])
def add_issued_product():

    prodt_id = request.form['prodt_id']
    is_quantity = request.form['is_quantity']
    is_date = request.form['is_date']


    cursor = mysql.connection.cursor()


    query = """
        INSERT INTO issued_products
        (prodt_id, is_quantity, is_date)
        VALUES (%s,%s,%s)
    """


    cursor.execute(
        query,
        (prodt_id, is_quantity, is_date)
    )


    mysql.connection.commit()

    cursor.close()


    return jsonify({
        "message": "Issued product added successfully."
    })




# Delete issued product
@transactions_bp.route('/issued_products/delete/<int:id>', methods=['GET'])
def delete_issued_product(id):

    cursor = mysql.connection.cursor()


    cursor.execute(
        "DELETE FROM issued_products WHERE is_id=%s",
        (id,)
    )


    mysql.connection.commit()

    cursor.close()


    return jsonify({
        "message": "Issued product deleted successfully."
    })




# Update issued product
@transactions_bp.route('/issued_products/update/<int:id>', methods=['POST'])
def update_issued_product(id):

    prodt_id = request.form['prodt_id']
    is_quantity = request.form['is_quantity']
    is_date = request.form['is_date']


    cursor = mysql.connection.cursor()


    query = """
        UPDATE issued_products
        SET prodt_id=%s,
            is_quantity=%s,
            is_date=%s
        WHERE is_id=%s
    """


    cursor.execute(
        query,
        (
            prodt_id,
            is_quantity,
            is_date,
            id
        )
    )


    mysql.connection.commit()

    cursor.close()


    return jsonify({
        "message": "Issued product updated successfully."
    })