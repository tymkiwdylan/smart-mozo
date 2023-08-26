
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
import os
from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()


db = SQLAlchemy()
DB_NAME = "database.db"

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
    CORS(app)
    app.config['SECRET_KEY'] = 'secret'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    
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


    return app

def create_database(app):
    if not (os.path.exists('/instance/database.db')):
        with app.app_context():
            db.create_all()
        print('Created Database!')