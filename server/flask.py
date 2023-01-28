from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2 as cv

app = Flask(__name__, static_folder='../client')
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
app.config['CORS_HEADERS'] = 'Content-Type'
face_cascade = cv.CascadeClassifier('haarcascade_frontalface_alt.xml')

def checkWebcam(webcam_data):
    grayscale_image = cv.cvtColor(webcam_data, cv.COLOR_BGR2GRAY)
    detected_faces = face_cascade.detectMultiScale(grayscale_image)
    return len(detected_faces) == 1

@app.route('/secret')
def secret(webcam_data):
    return verify(webcam_data, {"secret": "You are a verified human!"})

def verify(webcam_data, secret):
    if checkWebcam(webcam_data):
        return jsonify(secret)
    return jsonify({})

def verify_face(img):
  grayscale_image = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
  detected_faces = face_cascade.detectMultiScale(grayscale_image)
  return len(detected_faces) == 1

if __name__ == '__main__':
    app.run(debug=True, port=5000)