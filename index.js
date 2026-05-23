const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./queries');

const app = express();
const PORT = process.env.PORT || 8000;
const clientDist = path.join(__dirname, 'client', 'dist');

app.use(cors());
app.use(express.json());


app.get('/links', db.getLinks);
app.post('/links', db.createLink);
app.delete('/links/:id', db.deleteLink);


app.use(express.static(clientDist));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});