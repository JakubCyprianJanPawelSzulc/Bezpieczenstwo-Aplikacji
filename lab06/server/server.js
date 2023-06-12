const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('Received query params:', req.query);
  res.send('Query params received');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
