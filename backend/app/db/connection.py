# backend/app/db/connection.py
from flask import g
from pymongo import MongoClient
from flask import current_app as app

def get_db():
    if 'db' not in g:
        client = MongoClient(app.config['MONGODB_URI'])
        g.db = client['Events']
    return g.db

def initialize_db(app):
    with app.app_context():
        get_db()
