const express = require('express');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(require('./routes'));

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
