# backend/app/api/questions.py
from flask import Blueprint, request, jsonify
from ..db.connection import get_db
from bson import ObjectId
import datetime

questions_blueprint = Blueprint('questions', __name__)

@questions_blueprint.route('/events/<event_id>/questions', methods=['POST'])
def submit_question(event_id):
    db = get_db()
    questions = db['Questions']
    question_data = {
        "event_id": ObjectId(event_id),
        "text": request.json['text'],
        "upvotes": 0,
        "timestamp": datetime.datetime.utcnow()
    }
    result = questions.insert_one(question_data)
    return jsonify({"message": "Question submitted successfully", "question_id": str(result.inserted_id)}), 201


@questions_blueprint.route('/questions/<question_id>/upvote', methods=['PUT'])
def upvote_question(question_id):
    db = get_db()
    questions = db['Questions']
    result = questions.update_one({"_id": ObjectId(question_id)}, {"$inc": {"upvotes": 1}})
    if result.modified_count:
        return jsonify({"message": "Question upvoted successfully"}), 200
    else:
        return jsonify({"error": "Question not found"}), 404

@questions_blueprint.route('/events/<event_id>/questions', methods=['GET'])
def get_event_questions(event_id):
    db = get_db()
    questions = db['Questions'].find({"event_id": ObjectId(event_id)}).sort([("upvotes", -1), ("timestamp", 1)])
    questions_list = list(questions)
    for question in questions_list:
        question["_id"] = str(question["_id"])
        question["event_id"] = str(question["event_id"])
    
    return jsonify(questions_list)
