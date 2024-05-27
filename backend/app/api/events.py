# backend/app/api/events.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..db.connection import get_db
import datetime
from bson import ObjectId
import random

events_blueprint = Blueprint('events', __name__)

def generate_unique_code(db):
    while True:
        unique_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        if db['Events'].find_one({"unique_code": unique_code}) is None:
            return unique_code


@events_blueprint.route('/create_event', methods=['POST'])
@jwt_required()
def create_event():
    db = get_db()
    event_data = request.json
    organizer_email = get_jwt_identity()
    
    unique_code = generate_unique_code(db)
    
    event_data['organizerEmail'] = organizer_email
    event_data['timestamp'] = datetime.datetime.utcnow()
    event_data['unique_code'] = unique_code
    
    result = db['Events'].insert_one(event_data)
    return jsonify({"message": "Event created successfully", "event_id": str(result.inserted_id), "unique_code": unique_code}), 201


@events_blueprint.route('/events', methods=['GET'])
@jwt_required()
def get_organizer_events():
    db = get_db()
    events = db['Events']
    organizer_email = get_jwt_identity()
    
    organizer_events = events.find({"organizerEmail": organizer_email})
    events_list = [event for event in organizer_events]
    
    for event in events_list:
        event['_id'] = str(event['_id'])
    
    return jsonify(events_list), 200

@events_blueprint.route('/events/<event_id>', methods=['GET'])
def get_event_details(event_id):
    db = get_db()
    events = db['Events']
    
    event = events.find_one({"_id": ObjectId(event_id)})
    if not event:
        return jsonify({"message": "Event not found or unauthorized access"}), 404
    
    event['_id'] = str(event['_id'])
    return jsonify(event), 200

@events_blueprint.route('/events/<event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    db = get_db()
    events = db['Events']
    organizer_email = get_jwt_identity()
    
    event_id_obj = ObjectId(event_id)
    
    event = events.find_one({"_id": event_id_obj, "organizerEmail": organizer_email})
    if not event:
        return jsonify({"message": "Event not found or unauthorized access"}), 404
    
    events.delete_one({"_id": event_id_obj})
    return jsonify({"message": "Event deleted successfully"}), 200

@events_blueprint.route('/events/join/<unique_code>', methods=['GET'])
def join_event(unique_code):
    db = get_db()
    event = db['Events'].find_one({"unique_code": unique_code})
    if event:
        event['_id'] = str(event['_id'])
        return jsonify(event), 200
    else:
        return jsonify({"error": "Event not found"}), 404
    
@events_blueprint.route('/events/<event_id>/feedback', methods=['POST'])
def submit_event_feedback(event_id):
    db = get_db()
    feedback_data = {
        "event_id": ObjectId(event_id),
        "feedback": request.json['feedback'],
        "timestamp": datetime.datetime.utcnow()
    }
    db['EventFeedback'].insert_one(feedback_data)
    return jsonify({"message": "Feedback submitted successfully"}), 201

@events_blueprint.route('/events/<event_id>/feedback', methods=['GET'])
def view_event_feedback(event_id):
    db = get_db()
    event = db['Events'].find_one({"_id": ObjectId(event_id)})

    if not event:
        return jsonify({"error": "Event not found or unauthorized access"}), 404

    feedback = db['EventFeedback'].find({"event_id": ObjectId(event_id)})
    feedback_list = []
    for fb in feedback:
        fb['_id'] = str(fb['_id']) 
        feedback_list.append(fb)

    for feedback_item in feedback_list:
        if 'event_id' in feedback_item:
            feedback_item['event_id'] = str(feedback_item['event_id'])

    return jsonify(feedback_list), 200

