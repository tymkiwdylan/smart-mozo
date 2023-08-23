import io
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, send_file
from . import db
from .models import Admin, Cook, Menu, Restaurant, Waiter, Table
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import pandas as pd

admin_requests = Blueprint('admin_requests', __name__)

def update_menu(items):
    
    #TODO: Throw error when headers are incorrect
    
    for item in items:
        plate = Menu.query.filter_by(plate = item['plate'], restaurant_id= item['restaurant_id']).first()
        if plate:
            plate.description = item['description']
            plate.price = item['price']
            plate.img = item['img']
        else:
            new_plate = Menu(plate=item['plate'], description= item['description'],
                             restaurant_id=item['restaurant_id'], img=item['img'], price=item['price'])
            db.session.add(new_plate)
        
    db.session.commit()
    
def isValidToken(token):
    if len(token) == 0:
        return False
    user = Admin.query.filter_by(api_key=token).first()
    if user:
        return True
    return False

    

@admin_requests.route('/create-menu-item', methods=['POST'])
def create_menu_item():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    print(data)
    
    items = data['items']
    
    if len(items) != 0:
        update_menu(items)
    
    return {'message': 'success'}, 201

@admin_requests.route('/create-menu', methods=['POST'])
def create_menu():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    file = request.files['file']
    
    if file and file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
        data = df.to_dict(orient='records')
        update_menu(data)
    
    if file and file.filename.endswith('.csv'):
        df = pd.read_csv(file)
        data = df.to_dict(orient='records')
        update_menu(data)
    
    return {'message': 'success'}, 201
    
    
    
@admin_requests.route('/add-waiter', methods=['POST'])
def add_waiter():
     # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    restaurant_id = data['restaurant_id']
    name = data['name']
    
    waiter = Waiter.query.filter_by(name=name, restaurant_id=restaurant_id).first()
    
    if waiter:
        return {'message': 'Waiter already exists'}, 405
    
    new_waiter = Waiter(name=name, restaurant_id=restaurant_id)
    
    db.session.add(new_waiter)
    db.session.commit()
    
    return {'message': 'success'}, 201

@admin_requests.route('/add-cook', methods=['POST'])
def add_cook():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    restaurant_id = data['restaurant_id']
    name = data['name']
    
    cook = Cook.query.filter_by(name=name, restaurant_id=restaurant_id).first()
    
    if cook:
        return {'message': 'Waiter already exists'}, 405
    
    new_cook = Cook(name=name, restaurant_id=restaurant_id)
    
    db.session.add(new_cook)
    db.session.commit()
    
    return {'message': 'success'}, 201

@admin_requests.route('/add-table', methods=['POST'])
def add_table():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    num_tables = data['num_tables']
    restaurant_id = data['restaurant_id']
    
    for i in range(int(num_tables)):
        new_table = Table(restaurant_id=restaurant_id)
        
        db.seesion.add(new_table)
        
    db.session.commit()
    
    return {'message': 'success'}, 201


@admin_requests.route('/get-restaurant/<restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    restaurant = Restaurant.query.get(int(restaurant_id))
    
    data = restaurant.serialize()
    
    return {'message': 'sueccess', 'data': data}, 200

@admin_requests.route('/get-menu-template/<id>', methods=['GET'])
def get_menu_template(id):
    
    data = {
    "plate": ["plato1", "plato2", "plato3"],
    "description": ["Description1", "Description2", "Description3"],
    "price": [1500, 2000, 4000],
    "restaurant_id": [id] * 3,
    "img": ['Dummy'] * 3
    }
    
    df = pd.DataFrame(data)
    
    excel_output = io.BytesIO()
    df.to_excel(excel_output, engine='xlsxwriter', sheet_name='Dishes', index=False)

    excel_output.seek(0)

    return send_file(
        excel_output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='ejemplo.xlsx'
    )
    
    