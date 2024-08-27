const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (name && comment) {
    const timestamp = new Date().toLocaleString();
    comments.push({ name, comment, timestamp });
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(400).json({ message: 'Name and comment are required' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
