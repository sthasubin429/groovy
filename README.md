# Groovy

## A Music Sharing Patform

## How to Run?

    You need to run two servers one for backend and one for front end and one for music generation.

### Backend

    Make sure you have python installed.
    Install virtualenv.

    $pip install virtualenv
    [installing virtualenv]

    $cd backend

    $virtualenv env
    [creating a virtual environment]

    $source backend/env/Scripts/activate
    [activating virtual environment]

    $pip install -r requirements.txt
    [installing requirements]

    $cd groovy

    $python manage.py runserver
    [running server]

    Your backend server should be running.

### Frontend

    Open another terminal.
    Make sure you have npm or yarn installed.

    $cd frontend/gui

    $npm install
    Or,
    $yarn install
    [installing packages]

    $npm start
    Or,
    $yarn start
    [running server]

    Go to http://localhost:3000/

    Your frontend server should be running.
    Open and use.

### Generation

    Make sure you have python installed.
    Install virtualenv.

    $pip install virtualenv
    [installing virtualenv]

    $cd generation

    $virtualenv env
    [creating a virtual environment]

    $source env/Scripts/activate
    [activating virtual environment]

    $pip install -r requirements.txt
    [installing requirements]

    $python server.py
    [running server]

    Flask is deploying generation system.

# Final Year Project
