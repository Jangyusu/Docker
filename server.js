const express = require('express');

const PORT = 8080;

// APP
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World from Node.js!2');
});

app.listen(PORT);

console.log("Server is running")