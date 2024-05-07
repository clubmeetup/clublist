const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Initialize the Database
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS ratings (club_id TEXT PRIMARY KEY, rating INTEGER)');
});

// Endpoint to post a rating
app.post('/rate', (req, res) => {
  const { club_id, rating } = req.body;
  db.run(`INSERT INTO ratings(club_id, rating) VALUES(?, ?) ON CONFLICT(club_id) DO UPDATE SET rating = excluded.rating`, [club_id, rating], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.send({ message: 'Rating updated successfully', club_id, rating });
  });
});

// Endpoint to get ratings
app.get('/ratings', (req, res) => {
  db.all("SELECT club_id, rating FROM ratings", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
