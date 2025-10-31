from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        raise RuntimeError('DATABASE_URL environment variable is not set!')

    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    # Import models AFTER initializing db so Alembic sees them
    from . import models

    #Import routes
    from .routes import bp
    app.register_blueprint(bp)

    return app