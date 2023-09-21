import io
import os
from urllib.parse import urljoin
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, send_file
from api import db
from api.models import Admin, Cook, Menu, Restaurant, Waiter, Table
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import pandas as pd
from api.admin_requests.utils import isValidToken
from flask_jwt_extended import jwt_required

restaurant_routes = Blueprint('restaurant_routes', __name__)


@restaurant_routes.route('/add-table', methods=['POST'])
@jwt_required()
def add_table():
    """
    Add a table.

    Returns:
        dict: JSON response with success message.
    """
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    number = data['number']
    restaurant_id = data['restaurant_id']
    
    new_table = Table(number=number, restaurant_id=restaurant_id)
    
    db.session.add(new_table)
        
    db.session.commit()
    
    return {'message': 'success', 'data': new_table.serialize()}, 201

@restaurant_routes.route('/assign-tables', methods=['POST'])
@jwt_required()
def assign_tables():
    """
    Assign a table to a waiter.

    Returns:
        dict: JSON response with success message.
    """
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    waiter_id = data['waiter_id']
    tables = data['tables']
    
    print(tables)
    
    waiter = Waiter.query.get(int(waiter_id))
    
    for table in waiter.tables:
        if table:
            table.waiter_id = None
    
    for table in tables:
        table = Table.query.get(int(table['id']))
        if table:
            table.waiter_id = int(waiter_id)
    
    db.session.commit()
    
    waiter = Waiter.query.get(int(waiter_id))
    
    return {'message': 'success', 'data': waiter.serialize()}, 201

@restaurant_routes.route('delete-table', methods=['POST'])
@jwt_required()
def delete_table():
    """
    Delete a table.

    Returns:
        dict: JSON response with success message.
    """
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    table_id = data['table_id']
    
    table = Table.query.get(int(table_id))
    db.session.delete(table)
    
    db.session.commit()
    
    return {'message': 'success'}, 201


@restaurant_routes.route('/get-restaurant/<restaurant_id>', methods=['GET']) #Maybe change this to menu (id is given by frontend anyways)
@jwt_required()
def get_restaurant(restaurant_id):
    """
    Get restaurant details.

    Args:
        restaurant_id (str): ID of the restaurant.

    Returns:
        dict: JSON response with restaurant data.
    """
    
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    print(restaurant_id)
    
    restaurant = Restaurant.query.get(int(restaurant_id))
    
    data = restaurant.serialize()
    
    return {'message': 'success', 'data': data}, 200

