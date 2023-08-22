import requests

BASE_URL = 'http://127.0.0.1:5000/api'  # Change to your actual URL

# Test 'create-restaurant' route
def test_create_restaurant():
    data = {
        "restaurant_name": "New Restaurant"
    }
    response = requests.post(f'{BASE_URL}/create-restaurant', json=data)
    print(response.status_code)
    print(response.json())

# Test 'create-admin' route
def test_create_admin():
    data = {
        "email": "newadmin@example.com",
        "username": "newadmin",
        "password1": "password123",
        "permission": "0",
        "restaurant_id": 1
    }
    response = requests.post(f'{BASE_URL}/create-admin', json=data)
    print(response.status_code)
    print(response.json())

# Test 'login' route
def test_login():
    headers = {'Authorization': ''}
    data = {
        "username": "newadmin",
        "password": "password123"
    }
    response = requests.post(f'{BASE_URL}/login', json=data, headers=headers)
    print(response.status_code)
    print(response.json())
    
menu_item_data = {
    "items": [
        {
            "plate": "Spaghetti",
            "description": "Delicious pasta",
            "price": 10,
            "img": "spaghetti.jpg",
            "restaurant_id": 1
        },
        # Add more menu items as needed
    ]
}

# Test your 'create-menu-item' route
def test_create_menu_item():
    headers = {'Authorization': ''}
    response = requests.post(f'{BASE_URL}/admin/create-menu-item', json=menu_item_data)
    print(response.status_code)
    print(response.json())

# Test file upload
def test_create_menu_with_file():
    headers = {'Authorization': ''}
    files = {'file': ('menu.xlsx', open('menu.xlsx', 'rb'))}  # Change to your actual file
    response = requests.post(f'{BASE_URL}/admin/create-menu', files=files, headers=headers)
    print(response.status_code)
    print(response.json())
    
def test_create_waiter():
    headers = {'Authorization': ''}
    files = {'name': 'Carlos Juan', 'restaurant_id': 1}  # Change to your actual file
    response = requests.post(f'{BASE_URL}/admin/add-waiter', json=files, headers=headers)
    print(response.status_code)
    print(response.json())
    
def test_create_cook():
    headers = {'Authorization': ''}
    files = {'name': 'Juan Carlos', 'restaurant_id': 1}  # Change to your actual file
    response = requests.post(f'{BASE_URL}/admin/add-cook', json=files, headers=headers)
    print(response.status_code)
    print(response.json())
    
def test_get_user_rest():
    response = requests.get(f'{BASE_URL}/client/get-restaurant/1')
    
    print(response.status_code)
    print(response.json())
    
def test_get_rest():
    response = requests.get(f'{BASE_URL}/admin/get-restaurant/1')
    
    print(response.status_code)
    print(response.json())

# Uncomment and run the test you want to perform
if __name__ == '__main__':
    test_create_restaurant()
    test_create_admin()
    test_login()
    test_create_menu_item()
    test_create_menu_with_file()
    test_create_cook()
    test_create_waiter()
    test_get_rest()
    test_get_user_rest()
