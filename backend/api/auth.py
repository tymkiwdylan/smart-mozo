from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from . import db
from .models import Admin, Restaurant
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

auth = Blueprint('auth', __name__)


@auth.route('/create-restaurant', methods=['POST'])
def create_restaurant():
    '''Creates a Restaurant
       @params: (restaurant_name)
    '''
    
    data = request.get_json(force=True)
    
    account_id = data['account_id']
    restaurant_name = data['restaurant_name']
    
    restaurant = Restaurant.query.filter_by(account_id=account_id).first()
    
    if restaurant:
        return {'message': 'Restaurant already exists'}, 400
    
    new_restaurant = Restaurant(restaurant_name=restaurant_name, account_id=account_id)
    
    db.session.add(new_restaurant)
    db.session.commit()
    
    return {'message': 'success', 'data': new_restaurant.serialize()}, 201

@auth.route('/create-admin', methods=['POST'])
def create_admin():
    '''Creates an admin
       @params: (email, username, password, permission, restaurant_id)
    '''
    data = request.get_json(force=True)
    
    email = data['email']
    username = data['username']
    password = data['password']
    permission = data['permission']
    restaurant_id = data['restaurant_id']
    
    admin = Admin.query.filter_by(email=email).first()
    
    if admin:
        return {'message': 'User already exists'}, 405
    
    admin = Admin.query.filter_by(permission=0).first()
    
    if admin:
        return {'message': 'SuperAdmin already exists. If you forgot your password please reset it.'}, 405
    
    new_admin = Admin(email=email, username=username, password = generate_password_hash(password, method='sha256'),
                      permission=permission, restaurant_id = restaurant_id)
    
    db.session.add(new_admin)
    db.session.commit()
    
    return {'message': 'success', 'data': new_admin.serialize()}, 201

@auth.route('/login', methods=['POST'])
def login():
    '''Checks if user exists and credentials are valid. If an authorization key is provided it checks to see if it is valid
       @params: (username, password)
    '''
    
    headers = request.headers['Authorization']
	
    if (not headers) or (len(headers) == 0):
        data = request.get_json(force = True)
        username = data['username']
        password = data['password']
        user = Admin.query.filter_by(username=username).first()
        print(user)
        if user:
            
            if check_password_hash(user.password, password):
                result = user.serialize()
                
            else:
                return {"message": "password is incorrect"}, 400
        else:
            return {"message": "user does not exist"}, 400

    else:
        user = Admin.query.filter_by(api_key=headers).first()
        if user:
            result = Admin.serialize(user)
        else:
            return {"message": "Must sign in again"}, 400

    return {"status": 'success', 'data': result}, 201