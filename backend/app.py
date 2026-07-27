from flask import Flask
from flask_cors import CORS

from config import Config
from database import mysql

from routes.admin import admin_bp
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.inventory import inventory_bp
from routes.stock import stock_bp
from routes.supplier import supplier_bp
from routes.conditions import conditions_bp
from routes.notifications import notifications_bp
from routes.transactions import transactions_bp


# Create Flask App
app = Flask(__name__)


# Enable React Frontend Connection
CORS(app)


# Load Configuration
app.config.from_object(Config)


# Initialize MySQL
mysql.init_app(app)


# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(admin_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")
app.register_blueprint(inventory_bp, url_prefix="/api")
app.register_blueprint(stock_bp, url_prefix="/api")
app.register_blueprint(supplier_bp, url_prefix="/api")
app.register_blueprint(conditions_bp, url_prefix="/api")
app.register_blueprint(notifications_bp, url_prefix="/api")
app.register_blueprint(transactions_bp, url_prefix="/api")


# Run Flask Application
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )