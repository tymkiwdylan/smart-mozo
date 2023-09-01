from flask import Blueprint, request
from api.models import Cook
from api import db
from api.admin_requests.utils import isValidToken
from flask_jwt_extended import jwt_required

cook_routes = Blueprint('cook_routes', __name__)

@cook_routes.route('/delete-cook', methods=['POST'])
@jwt_required()
def delete_cook():
    """
    Delete a cook.

    Returns:
        dict: JSON response with success message and data.
    """
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
    

@cook_routes.route('/add-cook', methods=['POST'])
@jwt_required()
def add_cook():
    """
    Add a cook.

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
    
    cook = Cook.query.get(int(id))
    
    if not cook:
         cook = Cook(name=name, restaurant_id=restaurant_id)
         db.session.add(cook)
    
    else:
        cook.name = name
    
    db.session.commit()
    
    return {'message': 'success', 'data': cook.serialize()}, 201