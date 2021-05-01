from flask import Flask, send_file

from generation import generate_music
import json
import os


app = Flask(__name__)


@app.route('/')
def home():
   return 'Hello World'


@app.route('/generate/')
def generate():
    music =  generate_music()
    f=open("song.txt", "r")
    if f.mode == 'r':
        contents =f.read()
        if len(contents) > 1:
            return {"status": True, "message":"File Generated"}
        else:
            return {"status": True, "message":"File Empty"}
    else:
        return {"status": True, "message":"File Not Generated"}

@app.route('/download/')
def downloadFile ():
    filename = os.path.join(app.root_path, 'song.txt')
    return send_file(filename, mimetype='txt', as_attachment=True)

if __name__ == '__main__':
    app.run()