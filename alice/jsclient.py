from flask import Flask

app = Flask(__name__)

from flask import jsonify, request, render_template

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port='8000')
