from flask import Blueprint, request, send_file
from api.models import Menu, Ingridient
from api import db
from .utils import save_file, isValidToken
import pandas as pd
import io
from flask_jwt_extended import jwt_required

menu_routes = Blueprint('menu_routes', __name__)

def update_menu(items, restaurant_id):
    """
    Update menu items in the database.

    Args:
        items (list): List of menu items to update.
        restaurant_id (int): ID of the restaurant.

    Returns:
        None
    """
    
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
    

@menu_routes.route('/edit-menu-item', methods=['POST'])
@jwt_required()
def edit_menu_item():
    """
    Edit or create a menu item.

    Returns:
        dict: JSON response with success message and data.
    """
    
    
    data = request.form
    
    plate_name = data['plate']
    description = data['description']
    price = data['price']
    id = data['id']
    restaurant_id = data['restaurant_id']
    category = data['category'] #TODO: Add category to the menu items
    
    
    plate = Menu.query.get(int(id))

    img = '' #TODO: Link this to a dummy image
    # Check if a file was included in the request
    if 'file' in request.files:
        file = request.files['file']
        img = save_file(file, request.url_root)
    
    if not plate:
        plate = Menu(plate=plate_name, description=description,
                         price=price, restaurant_id=restaurant_id,
                         img=img, category=category)
        db.session.add(plate)
    else:
        plate.plate = plate_name
        plate.description = description
        plate.price = price
        plate.img = img
        plate.category = category
    
    db.session.commit()
    
    return {'message': 'success', 'data': plate.serialize()}, 201
    

@menu_routes.route('/create-menu', methods=['POST'])
@jwt_required()
def create_menu():
    """
    Create or update menu items from an Excel or CSV file.

    Returns:
        dict: JSON response with success message.
    """
    
    file = request.files['file'] #TODO: FIX THE BUG
    restaurant_id = request.form['restaurant_id']
    
    if file and file.filename.endswith('.xlsx'):
        df = pd.read_excel(file)
        data = df.to_dict(orient='records') #TODO: THink about how to handle images when using excel
        data['restaurant_id'] = [restaurant_id] * len(data)
        data['img'] = ['https://www.eatthis.com/wp-content/uploads/sites/4/2021/11/thanksgiving-dinner-plate.jpg?quality=82&strip=1&w=1400'] * len(data)
        
        update_menu(data, restaurant_id)
    
    if file and file.filename.endswith('.csv'):
        df = pd.read_csv(file)
        data = df.to_dict(orient='records')
        data['restaurant_id'] = [restaurant_id] * len(data)
        data['img'] = ['https://www.eatthis.com/wp-content/uploads/sites/4/2021/11/thanksgiving-dinner-plate.jpg?quality=82&strip=1&w=1400'] * len(data)
        update_menu(data, restaurant_id)
    
    return {'message': 'success'}, 201
    
@menu_routes.route('/delete-menu-item', methods=['POST'])
@jwt_required()
def delete_menu_item():
    """
    Delete a menu item.

    Returns:
        dict: JSON response with success message and data.
    """
    
    data = request.get_json(force=True)
    
    id = data['id']
    
    plate = Menu.query.get(int(id))
    
    if plate:
        db.session.delete(plate)
        db.session.commit()
    
    return {'message': 'success', 'data': {'id': id}}, 201

@menu_routes.route('/add-ingridient', methods=['POST'])
@jwt_required()
def add_ingridient():
    data = request.get_json(force=True)
    restaurant_id = data['restaurant_id']
    ingridient = data['ingridient']
    
    ingridient = Ingridient.query.filter_by(ingridient=ingridient, restaurant_id=restaurant_id).first()
    
    if ingridient:
        return {'message': 'Ingridient already exists'}, 405
    
    
    new_ingridient = Ingridient(ingridient=ingridient, restaurant_id=restaurant_id, amount=1)
    db.session.add(new_ingridient)
    
    db.session.commit()
    
    return {'message': 'success'}, 201

@menu_routes.route('/delete-ingridient', methods=['POST'])
@jwt_required()
def delete_ingridient():
    data = request.get_json(force=True)
    restaurant_id = data['restaurant_id']
    ingridient = data['ingridient']
    
    ingridient = Ingridient.query.filter_by(ingridient=ingridient, restaurant_id=restaurant_id).first()
    
    if ingridient:
        db.session.delete(ingridient)
        db.session.commit()
    
    return {'message': 'success'}, 201
    
@menu_routes.route('/get-ingridients', methods=['POST'])
@jwt_required()
def get_ingridients():
    data = request.get_json(force=True)
    restaurant_id = data['restaurant_id']
    
    ingridients = Ingridient.query.filter_by(restaurant_id=restaurant_id).all()
    
    ingridients = [ingridient.serialize() for ingridient in ingridients]
    
    return {'message': 'success', 'data': ingridients}, 201

@menu_routes.route('/edit-ingridient', methods=['POST'])
@jwt_required()
def edit_ingridient():
    data = request.get_json(force=True)
    restaurant_id = data['restaurant_id']
    ingridient = data['ingridient']
    amount = data['amount']
    
    ingridient = Ingridient.query.filter_by(ingridient=ingridient, restaurant_id=restaurant_id).first()
    
    if ingridient:
        ingridient.amount = amount
        db.session.commit()
    
    return {'message': 'success'}, 201

@menu_routes.route('/get-menu-template/<id>', methods=['GET'])
def get_menu_template(id): #TODO: Maybe just keep a template in the frontend?
    """
    Generate a menu template Excel file for download.

    Args:
        id (str): ID of the restaurant.

    Returns:
        send_file: Excel file for download.
    """
    
    data = {
    "plate": ["plato1", "plato2", "plato3"],
    "description": ["Description1", "Description2", "Description3"],
    "price": [1500, 2000, 4000],
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
    
    