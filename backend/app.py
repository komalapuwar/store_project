from flask import Flask
from config import Config
from database import mysql
from routes.supplier import supplier_bp

app = Flask(__name__)
app.config.from_object(Config)

mysql.init_app(app)

app.register_blueprint(supplier_bp)

@app.route('/')
def home():
    return "Store Management System Backend is Running!"

if __name__ == "__main__":
    app.run(debug=True)