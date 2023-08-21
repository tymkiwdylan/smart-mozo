
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
    
    from .models import Client, Restaurant,Table, Menu, Transaction, Cook, Waiter
    create_database(app)

    from .user_requests import user_requests
    from .admin_requests import admin_requests
    app.register_blueprint(user_requests, url_prefix='/api/')
    app.register_blueprint(admin_requests, url_prefix='/api/')


    return app

def create_database(app):
    with app.app_context():
        db.create_all()
    print('Created Database!')