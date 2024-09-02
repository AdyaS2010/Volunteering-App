// Obviously, after running "pip install Flask" in terminal, which we are going to be using (Flask) here, just incorporating, ... 

from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory database for demonstration purposes
volunteers = []
opportunities = []

@app.route('/volunteers', methods=['GET', 'POST'])
def manage_volunteers():
    if request.method == 'POST':
        volunteer = request.json
        volunteers.append(volunteer)
        return jsonify(volunteer), 201
    return jsonify(volunteers)

@app.route('/opportunities', methods=['GET', 'POST'])
def manage_opportunities():
    if request.method == 'POST':
        opportunity = request.json
        opportunities.append(opportunity)
        return jsonify(opportunity), 201
    return jsonify(opportunities)

@app.route('/volunteers/<int:volunteer_id>/hours', methods=['POST'])
def track_hours(volunteer_id):
    hours = request.json.get('hours')
    for volunteer in volunteers:
        if volunteer['id'] == volunteer_id:
            volunteer['hours'] = volunteer.get('hours', 0) + hours
            return jsonify(volunteer)
    return jsonify({'error': 'Volunteer not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

#Testing - run python backend.py as needed to test
"""
Don't know much about this so test API endpoints?
curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "name": "John Doe"}' http://127.0.0.1:5000/volunteers

And to add opportunities: curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "title": "Beach Cleanup"}' http://127.0.0.1:5000/opportunities
Track hours volunteered: curl -X POST -H "Content-Type: application/json" -d '{"hours": 5}' http://127.0.0.1:5000/volunteers/1/hours

etc.
""" 

#Will add more features and functionality soon! 
