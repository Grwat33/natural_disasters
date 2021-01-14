from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo
from os import environ

app = Flask(__name__)

#app.config['MONGO_URI'] = environ.get('MONGODB_URI', 'mongodb+srv://Grwat33:Oscarjoy0305!@cluster0.hhcym.mongodb.net/notepad?retryWrites=true&w=majority')
app.config['MONGO_URI'] = environ.get('MONGODB_URI', 'mongodb+srv://Grwat33:Oscarjoy0305!@cluster0.hhcym.mongodb.net/notepad?retryWrites=true&w=majority')


mongo = PyMongo(app)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///notepad.sqlite')

db = SQLAlchemy(app)



class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)


@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/dataset.html')
def dataset():
    return render_template('dataset.html')

@app.route('/drought.html')
def drought():
    return render_template('drought.html')

@app.route('/earthquake.html')
def earthquake():
    return render_template('earthquake.html')

@app.route('/fire.html')
def fire():
    return render_template('fire.html')

@app.route('/flood.html')
def flood():
    return render_template('flood.html')

@app.route('/graphs.html')
def graphs():
    return render_template('graphs.html')

@app.route('/hurricane.html')
def hurricane():
    return render_template('hurricane.html')

@app.route('/map.html')
def map():
    return render_template('map.html')

@app.route('/tornado.html')
def tornado():
    return render_template('tornado.html')

@app.route('/volcano.html')
def volcano():
    return render_template('volcano.html')    
    
if __name__ == '__main__':
    app.run(debug=True)
