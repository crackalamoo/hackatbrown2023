from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='../client')
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
app.config['CORS_HEADERS'] = 'Content-Type'

def checkWebcam(webcam_data):
    # TODO: Check if webcam data is valid
    return True

@app.route('/secret')
def secret(webcam_data):
    return verify(webcam_data, {"secret": "You are a verified human!"})

def verify(webcam_data, secret):
    if checkWebcam(webcam_data):
        return jsonify(secret)
    return jsonify({})

if __name__ == '__main__':
    app.run(debug=True, port=5000)