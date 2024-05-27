# backend/app/__init__.py

from flask import Flask
from .config import Config
from .api.auth import auth_blueprint
from .api.events import events_blueprint
from flask_jwt_extended import JWTManager
from .db.connection import initialize_db
from .api.questions import questions_blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    jwt = JWTManager(app)
    initialize_db(app)
    
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(events_blueprint)
    app.register_blueprint(questions_blueprint)

    CORS(app)
    return app

    



