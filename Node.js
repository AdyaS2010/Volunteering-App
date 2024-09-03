// In order to integrate SQLite3 Database along with all other components of the Project and Web App using React, need to utilize a backend server, perhaps Node.js (with Express, I believe) for this purpose ... 
// To set up the Node.js Project:
/* Just putting it down here in case I need to refer to it later on ... 
mkdir volunteer_app_backend
cd volunteer_app_backend
npm init -y
npm install express sqlite3
*/

// Alrighty then! Now, onto creating a relatively simple (from what I've heard) rendition of an Express server:

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connect to SQLite database! 
const db = new sqlite3.Database('./volunteer_app.db');

// Middleware to parse JSON (seriously, whew!)
app.use(express.json());

// Endpoint to get all volunteer opportunities
app.get('/volunteer_opportunities', (req, res) => {
    db.all('SELECT * FROM volunteer_opportunities', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Ooh la la! Start server, let' get up and running!!! 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Of course, to run server: node index.js -> standard

/* Extra: 
To connect React to backend for App (fetch / axios -> make/direct requests to backend server): 
// Reference example - fetch in react component!!! 
useEffect(() => {
    fetch('http://localhost:3000/volunteer_opportunities')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Do something with the data
        });
}, []);

// There we go! Let's go, we got everything integrated! Woohooooooooooooooooooooooo!!! 
