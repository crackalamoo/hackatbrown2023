from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='../client')
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/verify_webcam')
def verify(webcam_data):
    pass