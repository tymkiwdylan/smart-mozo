from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from api import db
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from api.models import Admin, Cook, Menu, Waiter, Table, Restaurant
from flask_socketio import emit, send, join_room, leave_room
from api import socket_io

user_requests = Blueprint('user_requests', __name__)

@user_requests.route('/get-rest/<restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(int(restaurant_id))
    
    data = restaurant.serialize_user()
    
    return {'message': 'sueccess', 'data': data}, 200


@socket_io.on('join')
def on_join(data):
    if 'restaurant_name' in data:
        username = data['restaurant_name']
    else:
        username = data['name']
        
    role = data['role']
    room = data['restaurant_id']
    room = str(room) + role
    join_room(room)
    print(request.sid + ' has entered the room ' + room)
    
@socket_io.on('order')
def on_order(data):
    room = str(data['restaurant_id']) + 'cook'
    emit('order', data, room=room)
    print('order sent: ', data)
    
@socket_io.on('prepared-order')
def on_order_prepared(data):
    room = str(data['restaurant_id']) + 'waiter'
    emit('prepared-order', data, room=room)
    print('order prepared: ', data)
    
    
    