from api import db

class SuperAdmin(db.Model): #This is for later
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(100))
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))
    

class Client(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    name = db.Column(db.String(100))
    table = db.Column(db.Integer)
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'table': self.table,
        }
        
        return data
        
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    permission = db.Column(db.Integer) #0: Full permission, 1: View and change, 2: View Only
    api_token = db.Column(db.String(16))
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'username': self.username,
            'email': self.email,
            'permission': self.permission,
            'api_token': self.api_token
        }
        
        return data
    

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_name = db.Column(db.String(100))
    menu = db.relationship('Menu')
    transactions = db.relationship('Transaction') #TODO: Think about changing this to be Orders instead of transactions
    waiters = db.relationship('Waiter')
    cooks  = db.relationship('Cook')
    tables = db.relationship('Table')
    admins = db.relationship('Admin')
    account_id = db.Column(db.String(20))
    
    def get_menu(self):
        menu = []
        
        for plate in self.menu:
            menu.append(plate.serialize());
            
        return menu
    
    def get_admins(self):
        admins = []
        
        for admin in self.admins:
            admins.append(admin.serialize())
        
        return admins
    
    def get_transactions(self):
        transactions = []
        
        for transaction in self.transactions:
            transactions.append(transaction.serialize());
            
        return transactions
    
    def get_waiters(self):
        waiters = []
        
        for waiter in self.waiters:
            waiters.append(waiter.serialize());
            
        return waiters
    
    def get_cooks(self):
        cooks = []
        
        for cook in self.cooks:
            cooks.append(cook.serialize());
            
        return cooks
    
    def get_tables(self):
        tables = []
        
        for table in self.tables:
            tables.append(table.serialize());
            
        return tables
    
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_name': self.restaurant_name,
            'menu': self.get_menu(),
            'transactions': self.get_transactions(),
            'waiters': self.get_waiters(),
            'cooks': self.get_cooks(),
            'tables': self.get_tables(),
            'admins': self.get_admins()      
        }
        return data
    
    def serialize_user(self):
        data = {
            'id': self.id,
            'restaurant_name': self.restaurant_name,
            'menu': self.get_menu(),
            'tables': self.get_tables(),
        }
        return data
        
class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    plate = db.Column(db.String(100))
    description = db.Column(db.String(250))
    price = db.Column(db.Integer)
    img = db.Column(db.String(100))
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'plate': self.plate,
            'description': self.description,
            'price': self.price,
            'img': self.img
        }

        return data
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    product_id = db.Column(db.Integer) #TODO: change into a String and call description
    amount = db.Column(db.Integer)
    payment_method = db.Column(db.String(100))
    receipt = db.Column(db.String(100))
    waiter = db.Column(db.Integer, db.ForeignKey('waiter.id'))
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'product_id': self.product_id,
            'amount': self.amount,
            'payment_method': self.payment_method,
            'receipt': self.receipt,
            'waiter': self.waiter
        }
        return data

class Waiter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    name = db.Column(db.String(50))
    email = db.Column(db.String(100))
    password = db.Column(db.String(50))
    transactions = db.relationship('Transaction')
    account_id = db.Column(db.String(30))
    
    def get_transactions(self):
        transactions = []
        
        for transaction in self.transactions:
            transactions.append(transaction.serialize());
            
        return transactions
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'email': self.email,
            'name': self.name,
            'transactions': self.get_transactions(),
        }
        return data
    
class Cook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    name = db.Column(db.String(50))
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
        }
        return data

class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    
    def serialize(self):
        data = {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
        }
        return data
    
    
    
_all__ = [
    "SuperAdmin",
    "Client",
    "Admin",
    "Restaurant",
    "Menu",
    "Transaction",
    "Waiter",
    "Cook",
    "Table",
]