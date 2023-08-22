from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from . import db
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from .models import Admin, Cook, Menu, Waiter, Table, Restaurant

user_requests = Blueprint('user_requests', __name__)

@user_requests.route('/get-restaurant/<restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(int(restaurant_id))
    
    data = restaurant.serialize_user()
    
    return {'message': 'sueccess', 'data': data}, 200
