from flask import Flask, send_file
from flask_cors import CORS
from flask import request

from generation import generate_music
import json
import os


app = Flask(__name__)

cors = CORS(app)

@app.route('/')
def home():
   return 'Hello World'


@app.route('/generate/', methods=['GET'])
def generate():
    music = generate_music()
    f = open("song.txt", "r")

    if f.mode == 'r':
        contents =f.read()
        if len(contents) > 1:
            return {
                'status': True,
                'message': 'File Generated'
            }
        else:
            return {
                'status': False,
                'message': 'File Empty'
            }
    else:
        return {
            'status': False,
            'message': 'File Not Generated'
        }

@app.route('/downloadFile/', methods=['GET'])
def downloadFile():
    filename = os.path.join(app.root_path, 'song.txt')
    return send_file(filename, as_attachment=True,  cache_timeout=0)


if __name__ == '__main__':
    app.run()