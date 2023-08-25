import io
import os
from urllib.parse import urljoin
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, send_file
from . import db
from .models import Admin, Cook, Menu, Restaurant, Waiter, Table
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import pandas as pd

admin_requests = Blueprint('admin_requests', __name__)

def update_menu(items, restaurant_id):
    
    #TODO: Throw error when headers are incorrect
    
    for item in items:
        plate = Menu.query.filter_by(plate = item['plate'], restaurant_id = restaurant_id).first()
        if plate:
            plate.description = item['description']
            plate.price = item['price']
            plate.img = item['img']
        else:
            new_plate = Menu(plate=item['plate'], description= item['description'],
                             restaurant_id=restaurant_id, img=item['img'], price=item['price'])
            db.session.add(new_plate)
        
    db.session.commit()
    
def save_file(file):
    
    filename = file.filename
    data = file.read()

    path = os.path.join('api/static/restaurantImages', filename)
    with open(path, 'wb') as f:
        f.write(data)

    url = urljoin(request.url_root, 'static/restaurantImages/' + filename)

    return url
    
def isValidToken(token):
    if len(token) == 0:
        return False
    user = Admin.query.filter_by(api_key=token).first()
    if user:
        return True
    return False


@admin_requests.route('/edit-menu-item', methods=['POST'])
def edit_menu_item():
    # token = request.headers['Authorization']
    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.form
    
    plate_name = data['plate']
    description = data['description']
    price = data['price']
    id = data['id']
    restaurant_id = data['restaurant_id']
    
    plate = Menu.query.get(int(id))

    img = '' #TODO: Link this to a dummy image
    # Check if a file was included in the request
    if 'file' in request.files:
        file = request.files['file']
        img = save_file(file)
    
    if not plate:
        plate = Menu(plate=plate_name, description=description,
                         price=price, restaurant_id=restaurant_id,
                         img=img)
        db.session.add(plate)
    else:
        plate.plate = plate_name
        plate.description = description
        plate.price = price
        plate.img = img
    
    db.session.commit()
    
    return {'message': 'success', 'data': plate.serialize()}, 201

    
    
    

@admin_requests.route('/create-menu', methods=['POST'])
def create_menu():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    file = request.files['file']
    restaurant_id = request.form['restaurant_id']
    
    if file and file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
        data = df.to_dict(orient='records') #TODO: THink about how to handle images when using excel
        update_menu(data, restaurant_id)
    
    if file and file.filename.endswith('.csv'):
        df = pd.read_csv(file)
        data = df.to_dict(orient='records')
        update_menu(data, restaurant_id)
    
    return {'message': 'success'}, 201
    
@admin_requests.route('/delete-menu-item', methods=['POST'])
def delete_menu_item():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    id = data['id']
    
    plate = Menu.query.get(int(id))
    
    if plate:
        db.session.delete(plate)
        db.session.commit()
    
    return {'message': 'success', 'data': {'id': id}}, 201

@admin_requests.route('/delete-waiter', methods=['POST'])
def delete_waiter():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    id = data['id']
    
    waiter = Waiter.query.get(int(id))
    
    if waiter:
        db.session.delete(waiter)
        db.session.commit()
    
    return {'message': 'success', 'data': {'id': id}}, 201

@admin_requests.route('/delete-cook', methods=['POST'])
def delete_cook():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    id = data['id']
    
    cook = Cook.query.get(int(id))
    
    if cook:
        db.session.delete(cook)
        db.session.commit()
    
    return {'message': 'success', 'data': {'id': id}}, 201
    
@admin_requests.route('/add-waiter', methods=['POST'])
def add_waiter():
     # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    restaurant_id = data['restaurant_id']
    id = data['id']
    name = data['name']
    email = data['email']
    
    waiter = Waiter.query.get(int(id))
    
    if not waiter:
        waiter = Waiter(name=name, restaurant_id=restaurant_id, email=email)
        db.session.add(waiter)
    else:
        waiter.name = name
        waiter.email = email
        
    db.session.commit()
    
    return {'message': 'success', 'data': waiter.serialize()}, 201

@admin_requests.route('/add-cook', methods=['POST'])
def add_cook():
    # token = request.headers['Authorization']

    # if (not isValidToken(token)):
    #     return {'message': 'NOT AUTHORIZED'}, 401
    
    data = request.get_json(force=True)
    
    restaurant_id = data['restaurant_id']
    id = data['id']
    name = data['name']
    
    cook = Cook.query.get(int(id))
    
    if not cook:
         cook = Cook(name=name, restaurant_id=restaurant_id)
         db.session.add(cook)
    
    else:
        cook.name = name
    
    db.session.commit()
    
    return {'message': 'success', 'data': cook.serialize()}, 201

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
    
    