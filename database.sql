# Overview of steps as they are run in terminal

sqlite3 volunteer_app.db -- creates new database(file-type?) for the App

-- Create table for volunteering activities/opportunities

CREATE TABLE volunteer_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activity_name TEXT NOT NULL,
    description TEXT,
    date DATE,
    hours INTEGER,
    student_id INTEGER -- gonna work and see how that's going to play out if at all it's necessary
);

-- Create a table for storing queries, yippee!
CREATE TABLE queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query_text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Now, to insert the volunteer ops+acts (can't do manually each time, have to ensure I can automate it somehow, using python perhaps): 
INSERT INTO volunteer_activities (activity_name, description, date, hours, student_id)
VALUES ('Beach Cleanup', 'Cleaning up the local beach', '2024-09-01', 4, 1);

-- Insert query
INSERT INTO queries (query_text)
VALUES ('SELECT * FROM volunteer_activities WHERE student_id = 1');

-- Select all the volunteer activities (done by) for a specific person
SELECT * FROM volunteer_activities WHERE student_id = 1;

-- Select all stored queries
SELECT * FROM queries;

-- ^^^ Essentially basics from what I know, will use these basic 'commands' to implement functionality and keep everything going... 
-- Also, gotta integrate this db w/React Application, so from what I've heard, we need a backend server... handles db operations and communicates w/React frontend. 

