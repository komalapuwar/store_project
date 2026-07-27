from flask import Blueprint, request, jsonify, session
from database import mysql
from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint("auth", __name__)


# -----------------------------
# Backend Test
# -----------------------------
@auth_bp.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "Flask Backend is Running"
    })


# -----------------------------
# Register
# -----------------------------
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    fullname = data["fullname"]
    username = data["username"]
    email = data["email"]
    phone = data["phone"]
    password = data["password"]
    confirm_password = data["confirm_password"]
    role = data["role"]


    if password != confirm_password:

        return jsonify({
            "success": False,
            "message": "Passwords do not match."
        }), 400


    cursor = mysql.connection.cursor()


    # Check duplicate username/email

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE user_name=%s OR gmail=%s
        """,
        (
            username,
            email
        )
    )


    existing = cursor.fetchone()


    if existing:

        cursor.close()

        return jsonify({
            "success": False,
            "message": "Username or Email already exists."
        }), 400



    hashed_password = generate_password_hash(password)



    # Insert user

    cursor.execute(
        """
        INSERT INTO users
        (
            fullname,
            user_name,
            gmail,
            password,
            phone_no,
            role
        )
        VALUES(%s,%s,%s,%s,%s,%s)
        """,
        (
            fullname,
            username,
            email,
            hashed_password,
            phone,
            role
        )
    )


    user_id = cursor.lastrowid



    # Add supplier record if role is supplier

    if role.lower() == "supplier":

        cursor.execute(
            """
            INSERT INTO supplier
            (u_id)
            VALUES(%s)
            """,
            (user_id,)
        )


    mysql.connection.commit()

    cursor.close()


    return jsonify({
        "success": True,
        "message": "Registration Successful."
    })



# -----------------------------
# Login
# -----------------------------
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()


    username = data["username"]
    password = data["password"]
    role = data["role"]


    cursor = mysql.connection.cursor()


    cursor.execute(
        """
        SELECT
            u_id,
            user_name,
            password,
            role
        FROM users
        WHERE user_name=%s
        """,
        (username,)
    )


    user = cursor.fetchone()


    cursor.close()



    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid username."
        }), 401



    if not check_password_hash(
        user[2],
        password
    ):

        return jsonify({
            "success": False,
            "message": "Incorrect password."
        }), 401



    if user[3].lower() != role.lower():

        return jsonify({
            "success": False,
            "message": "Incorrect role selected."
        }), 401



    session["u_id"] = user[0]
    session["role"] = user[3]



    return jsonify({

        "success": True,
        "message": "Login Successful.",
        "role": user[3]

    })