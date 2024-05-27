# backend/app/api/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..db.connection import get_db

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    db = get_db()
    users = db['Accounts']
    email = request.json['email']
    password = request.json['password']

    if users.find_one({'email': email}):
        return jsonify({"error": "Email exists"}), 409

    hashed_password = generate_password_hash(password)
    users.insert_one({'email': email, 'password': hashed_password})
    return jsonify({"message": "User created successfully"}), 201

@auth_blueprint.route('/signin', methods=['POST'])
def signin():
    db = get_db()
    users = db['Accounts']
    email = request.json['email']
    password = request.json['password']
    user = users.find_one({'email': email})

    if user and check_password_hash(user['password'], password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

