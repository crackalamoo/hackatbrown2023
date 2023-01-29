from flask import Flask, request, jsonify, render_template
import cv2 as cv
from skimage.metrics import structural_similarity
from PIL import Image
import base64
import numpy as np
import json
import io
import time


app = Flask(__name__)
face_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')
smile_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_smile.xml')

def stringToImage(base64_string):
    data = base64.b64decode(str(base64_string))
    return Image.open(io.BytesIO(data))

def checkWebcam(webcam_data):
    original_image = stringToImage(webcam_data)
    grayscale_image = cv.cvtColor(np.array(original_image), cv.COLOR_BGR2GRAY)
    detected_faces = face_cascade.detectMultiScale(grayscale_image)
    for (x, y, w, h) in detected_faces:
        cv.rectangle(original_image, (x, y), ((x + w), (y + h)), (255, 0, 0), 2)
        roi_gray = grayscale_image[y:y + h, x:x + w]
        detected_smiles = smile_cascade.detectMultiScale(roi_gray, 1.8, 20)
    
    return len(detected_faces) == 1 and len(detected_smiles) == 1

def checkDatabase(webcam_data):
    with open("images.txt", "r") as file:
        text = file.read().split('\n')
    for i in range(len(text)):
        if webcam_data == text[i].split(' ')[0]:
            return False
    return True

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
    json_string = '['+str(request.data)[2:-1]+']'
    json_data = json.loads(json_string)[0]
    webcam_data = json_data['image0']
    try:
        response = verify(webcam_data,
            {   "title": "Congratulations! You Are Not a Robot!",
                "message": "You are a verified human! Now you get to see the secret message. Here it is: \"I love Hack at Brown!\""},
            {   "title": "Oh no! You are not a verified human!",
                "message": "Since you are not verified, you can't see the secret message."},
            saveValidImage=True)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    except Exception as e:
        response = jsonify({
            "title": "Error",
            "message": "Server error: " + repr(e)})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response = response, 500
        print(e)
    return response

def saveImage(webcam_data):
    with open("images.txt", "r") as file:
        text = file.read().split('\n')
    with open("images.txt", "w") as file:
        for i in range(len(text)-1, -1, -1):
            img_time = text[i].split(' ')
            if len(img_time) != 2 or time.time() - float(text[i].split(' ')[1]) > 15:
                text.pop(i)
        file.write('\n'.join(text))
        file.write(webcam_data + ' ' + str(time.time()) + '\n')

def verify(webcam_data, secret, onRobot={}, saveValidImage=False):
    webcam_data = webcam_data[webcam_data.rfind(',')+1:]
    webcam_data = webcam_data.replace(' ', '+')
    if checkWebcam(webcam_data):
        if not checkDatabase(webcam_data):
            print("Not verified!!!")
            if saveValidImage:
                saveImage(webcam_data)
            return jsonify(onRobot)
        if saveValidImage:
            saveImage(webcam_data)
        return jsonify(secret)
    else:
        return jsonify(onRobot)

def verify_face(img):
  grayscale_image = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
  detected_faces = face_cascade.detectMultiScale(grayscale_image)
  return len(detected_faces) == 1

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)