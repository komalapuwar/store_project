from flask import Blueprint, render_template, request, redirect
from database import mysql


users_bp = Blueprint("users", __name__)


# ==========================
# View All Users
# ==========================
@users_bp.route("/admin/users")
def users():

    cursor = mysql.connection.cursor()

    cursor.execute("SELECT * FROM users")

    data = cursor.fetchall()

    users = []

    for row in data:
        users.append({
            "u_id": row[0],
            "fullname": row[1],
            "user_name": row[2],
            "gmail": row[3],
            "password": row[4],
            "phone_no": row[5],
            "role": row[6]
        })

    cursor.close()

    return render_template(
        "users.html",
        users=users
    )



# ==========================
# Add User
# ==========================
@users_bp.route("/admin/users/add", methods=["POST"])
def add_user():

    fullname = request.form["fullname"]
    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]
    role = request.form["role"]


    cursor = mysql.connection.cursor()


    cursor.execute(
        """
        INSERT INTO users
        (fullname, user_name, gmail, password, role)
        VALUES (%s,%s,%s,%s,%s)
        """,
        (
            fullname,
            username,
            email,
            password,
            role
        )
    )


    mysql.connection.commit()

    cursor.close()


    return redirect("/admin/users")



# ==========================
# Delete User
# ==========================
@users_bp.route("/admin/users/delete/<int:id>")
def delete_user(id):

    cursor = mysql.connection.cursor()


    cursor.execute(
        "DELETE FROM users WHERE u_id=%s",
        (id,)
    )


    mysql.connection.commit()

    cursor.close()


    return redirect("/admin/users")