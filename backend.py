# Obviously, after running "pip install Flask" in terminal, which we are going to be using (Flask) here, just incorporating, ... 

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///volunteers.db'
db = SQLAlchemy(app)

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    hours = db.Column(db.Integer, default=0)

class Opportunity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)

db.create_all()

@app.route('/volunteers', methods=['GET', 'POST'])
def manage_volunteers():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not 'name' in data:
            raise BadRequest('Name is required')
        volunteer = Volunteer(name=data['name'])
        db.session.add(volunteer)
        db.session.commit()
        return jsonify(volunteer), 201
    volunteers = Volunteer.query.all()
    return jsonify([v.to_dict() for v in volunteers])

@app.route('/opportunities', methods=['GET', 'POST'])
def manage_opportunities():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not 'title' in data:
            raise BadRequest('Title is required')
        opportunity = Opportunity(title=data['title'])
        db.session.add(opportunity)
        db.session.commit()
        return jsonify(opportunity), 201
    opportunities = Opportunity.query.all()
    return jsonify([o.to_dict() for o in opportunities])

@app.route('/volunteers/<int:volunteer_id>/hours', methods=['POST'])
def track_hours(volunteer_id):
    data = request.get_json()
    if not data or not 'hours' in data:
        raise BadRequest('Hours are required')
    volunteer = Volunteer.query.get(volunteer_id)
    if not volunteer:
        return jsonify({'error': 'Volunteer not found'}), 404
    volunteer.hours += data['hours']
    db.session.commit()
    return jsonify(volunteer)

if __name__ == '__main__':
    app.run(debug=True)

# Test API endpoints, I believe we may use the following commands (part of 'curl'): 
"""
Adding a volunteer: curl -X POST -H "Content-Type: application/json" -d '{"name": "Tota Lee Reel"}' http://127.0.0.1:5000/volunteers
For adding opportunities: curl -X POST -H "Content-Type: application/json" -d '{"title": "Beach Cleanup"}' http://127.0.0.1:5000/opportunities
Track hours volunteered: curl -X POST -H "Content-Type: application/json" -d '{"hours": 5}' http://127.0.0.1:5000/volunteers/1/hours
"""
