
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
import os
from dotenv import load_dotenv
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
import psycopg2
load_dotenv()


db = SQLAlchemy()
user_db = SQLAlchemy()
DB_NAME = "database.db"
socket_io = SocketIO()
def create_test_app():

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret'
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
    db.init_app(app)

    create_database(app)

    from .auth import auth
    from .user_requests import user_requests
    from .admin_requests import admin_requests
    app.register_blueprint(user_requests, url_prefix='/api/')
    app.register_blueprint(admin_requests, url_prefix='/api/')


    return app

def create_app():

    app = Flask(__name__)
    CORS(app, origins="*")
    CORS(app, methods=["GET", "POST", "PUT", "DELETE"])
    CORS(app, allow_headers=["Content-Type", "Authorization"])

    app.config['SECRET_KEY'] = 'secret'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:P1zM6TbIZGT0OAP@localhost:5432'
    # Configure JWT settings
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure key
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=48)  # Set token expiration
    jwt = JWTManager(app)
    
    db.init_app(app)
    
    socket_io.init_app(app, cors_allowed_origins="*")

    from .models import SuperAdmin, Client, Admin, Restaurant, Menu, Transaction, Waiter, Cook, Table
    create_database(app)

    from .user_requests.user_requests import user_requests
    from .auth.auth import auth
    from .admin_requests.restaurant_requests import restaurant_routes
    from .admin_requests.cook_route import cook_routes
    from .admin_requests.waiter_route import waiter_routes
    from .admin_requests.menu_routes import menu_routes
    app.register_blueprint(user_requests, url_prefix='/api/user/')
    app.register_blueprint(restaurant_routes, url_prefix='/api/restaurant/')
    app.register_blueprint(cook_routes, url_prefix='/api/cook/')
    app.register_blueprint(waiter_routes, url_prefix='/api/waiter/')
    app.register_blueprint(menu_routes, url_prefix='/api/menu/')
    app.register_blueprint(auth, url_prefix='/api/auth/')


    return app, socket_io

def create_database(app):
    if not (os.path.exists('/instance/database.db')):
        with app.app_context():
            db.create_all()
        print('Created Database!')
        