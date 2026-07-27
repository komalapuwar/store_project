from flask import Blueprint, request, render_template, redirect, session
from database import mysql
from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint('auth', __name__)


  #Login page
@auth_bp.route('/')
def login_page():
    return render_template("login.html")



 # Register page
@auth_bp.route('/register')
def register_page():
  return render_template("register.html")



# Register user
@auth_bp.route('/register', methods=['POST'])
def register():

    fullname = request.form['fullname']
    gmail = request.form['gmail']
    phone_no = request.form['phone_no']
    username = request.form['user_name']

    password = request.form['password']
    confirm_password = request.form['confirm_password']

    role = request.form['role']


    if password != confirm_password:
        return "Password does not match"



    cursor = mysql.connection.cursor()


    # Check existing user

    cursor.execute(
        """
        SELECT * FROM users 
        WHERE user_name=%s OR gmail=%s
        """,
        (username, gmail)
    )


    existing_user = cursor.fetchone()


    if existing_user:

        cursor.close()

        return "Username or Gmail already exists"



    # Hash password

    hashed_password = generate_password_hash(password)



    cursor.execute(
        """
        INSERT INTO users
        (fullname,user_name,gmail,password,phone_no,role)
        VALUES(%s,%s,%s,%s,%s,%s)
        """,
        (
            fullname,
            username,
            gmail,
            hashed_password,
            phone_no,
            role
        )
    )


    mysql.connection.commit()

    cursor.close()


    return redirect('/')





# Login

@auth_bp.route('/login', methods=['POST'])
def login():

    username = request.form['username']

    password = request.form['password']

    role = request.form['role']



    cursor = mysql.connection.cursor()


    cursor.execute(
        "SELECT * FROM users WHERE user_name=%s",
        (username,)
    )


    user = cursor.fetchone()


    cursor.close()



    if user:


        # Authentication

        if check_password_hash(user["password"], password):


            # Authorization

            if user["role"] == role:


                session["u_id"] = user["u_id"]

                session["role"] = user["role"]



                if role == "supplier":

                    return redirect("/supplier")


                elif role == "admin":

                    return "Admin Dashboard"#(coming soon)


                elif role == "manager":

                    return "Manager Dashboard"#(coming soon)



    return "Invalid Username, Password or Role"