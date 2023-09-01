from flask import Blueprint, request
from api.models import Waiter
from api import db
from api.admin_requests.utils import isValidToken
from flask_jwt_extended import jwt_required

waiter_routes = Blueprint('waiter_routes', __name__)

@waiter_routes.route('/delete-waiter', methods=['POST'])
@jwt_required()
def delete_waiter():
    """
    Delete a waite.

    Returns:
        dict: JSON response with success message and data.
    """
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

@waiter_routes.route('/add-waiter', methods=['POST'])
@jwt_required()
def add_waiter():
    """
    Adds or edits a waiter.

    Returns:
        dict: JSON response with success message and data.
    """
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