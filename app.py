from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)


@app.route('/')
def index():
    return 'Hello World'


@app.route('/api/tasks-postgres')
def tasksPostGres():
    tasks = db.session.query(Task)
    data = []

    for task in tasks:
        item = {
            'id': task.id,
            'description' : task.description
        }
        data.append(item)

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
