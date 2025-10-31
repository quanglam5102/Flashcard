from flask import jsonify, Blueprint
from app.models import Users

bp = Blueprint('main', __name__)

@bp.route('/')
def hello_world():
    return 'Hello World!'

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