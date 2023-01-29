from flask import Flask, request, jsonify, render_template
import cv2 as cv
from skimage.metrics import structural_similarity
from PIL import Image
import base64
import numpy as np
import json
import io


app = Flask(__name__)
face_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')

def stringToImage(base64_string):
    data = base64.b64decode(str(base64_string))
    return Image.open(io.BytesIO(data))

def checkWebcam(webcam_data):
    original_image = stringToImage(webcam_data)
    grayscale_image = cv.cvtColor(np.array(original_image), cv.COLOR_BGR2GRAY)
    detected_faces = face_cascade.detectMultiScale(grayscale_image)
    return len(detected_faces) == 1

def verifySimilarity(images_lst):
    webcam_images = map(stringToImage, images_lst)
    grayscale_images = []
    for img in webcam_images:
        grayscale_images.append(cv.cvtColor(np.array(img), cv.COLOR_BGR2GRAY))
    pairs = [(a, b) for idx, a in enumerate(grayscale_images) for b in grayscale_images[idx + 1:]]
    for pair in pairs:
        score = structural_similarity(pair[0], pair[1])
        print(score)
        if score < 0.7: return False
    return True

@app.route('/hello')
def hello():
    response = jsonify({'message': 'Hello, World!'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

@app.route('/secret', methods=['POST', 'OPTIONS'])
def secret():
    print("hi")
    json_string = '['+str(request.data)[2:-1]+']'
    print(json_string)
    json_data = json.loads(json_string)[0]
    webcam_data = json_data['image0']
    print(webcam_data)
    #print(webcam_data)
    try:
        response = verify(webcam_data, {"secret": "You are a verified human!"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    except Exception as e:
        response = jsonify({"secret": "Server error: " + repr(e)})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response = response, 500
    return response

def verify(webcam_data, secret):
    webcam_data = webcam_data[webcam_data.rfind(',')+1:webcam_data.rfind('==')+2]
    webcam_data = webcam_data.replace(' ', '+')
    print(webcam_data)
    if checkWebcam(webcam_data):
        return jsonify(secret)
    else:
        return jsonify({})

def verify_face(img):
  grayscale_image = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
  detected_faces = face_cascade.detectMultiScale(grayscale_image)
  return len(detected_faces) == 1

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)