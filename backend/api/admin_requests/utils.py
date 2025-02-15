import os
from urllib.parse import urljoin
from api.models import Admin

def save_file(file, url_root):
    
    filename = file.filename
    data = file.read()

    path = os.path.join('api/static/restaurantImages', filename)
    with open(path, 'wb') as f:
        f.write(data)

    url = urljoin(url_root, 'static/restaurantImages/' + filename)

    return url
    
def isValidToken(token):
    if len(token) == 0:
        return False
    user = Admin.query.filter_by(api_key=token).first()
    if user:
        return True
    return False