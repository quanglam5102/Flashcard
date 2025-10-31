from flask import jsonify, Blueprint, request
from app.models import Users, Cards
from . import db

bp = Blueprint('main', __name__)

@bp.route('/create-new-card', methods=['POST'])
def create_card():
    data = request.get_json()
    if not data or 'question' not in data or 'answer' not in data:
        return jsonify({'error': 'missing question and answer'}), 400
    new_card = Cards(
        question=data['question'],
        answer=data['answer'],
        status=data['status'],
        options=data.get('options',[]) # default empty array
    )
    db.session.add(new_card)
    db.session.commit()
    return jsonify({'message': 'Card created successfully', 'card_id': new_card.id}), 201 # return status 201 because new resource is created

@bp.route('/all-cards', methods=['GET'])
def all_cards():
    all_cards = Cards.query.all()
    results = []
    for card in all_cards:
        results.append({
            'id': card.id,
            'question': card.question,
            'answer': card.answer,
            'status': card.status,
            'options': card.options
        })
    return jsonify(results)

@bp.route('/users')
def users():
    users = Users.query.all()

    results = []
    for user in users:
        results.append({
            'id': user.id,
            'username': user.username,
            'password': user.password
        })
    return jsonify(results)