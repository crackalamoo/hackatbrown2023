from flask import Flask, request, jsonify, render_template
import cv2 as cv

app = Flask(__name__)
face_cascade = cv.CascadeClassifier('haarcascade_frontalface_alt.xml')

def checkWebcam(webcam_data):
    grayscale_image = cv.cvtColor(webcam_data, cv.COLOR_BGR2GRAY)
    detected_faces = face_cascade.detectMultiScale(grayscale_image)
    return len(detected_faces) == 1

@app.route('/hello')
def hello():
    response = jsonify({'message': 'Hello, World!'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

@app.route('/secret')
#@cross_origin(**api_cors_config)
def secret(webcam_data):
    response = verify(webcam_data, {"secret": "You are a verified human!"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def verify(webcam_data, secret):
    if checkWebcam(webcam_data):
        return jsonify(secret)
    return jsonify({})

def verify_face(img):
  grayscale_image = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
  detected_faces = face_cascade.detectMultiScale(grayscale_image)
  return len(detected_faces) == 1

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)