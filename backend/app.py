
from api import create_app
from api import db
from flask_migrate import Migrate

app, socket_io = create_app()

migrate = Migrate(app, db)

if __name__ == '__main__':
    socket_io.run(app, debug=True)