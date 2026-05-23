const express = require('express');
const cors = require('cors');
const db = require('./queries');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); // Crucial: Allows Express to parse JSON body data

// Routes
app.get('/links', db.getLinks);
app.post('/links', db.createLink);
app.delete('/links/:id', db.deleteLink);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});