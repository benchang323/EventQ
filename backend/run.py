# backend/run.py
from app import create_app
from flask import Flask, request, Response

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
