const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const users = require('./data/users.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

function sleep(delay) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}

app.get('/users', async (req, res) => {
  await sleep(300);
  res.json(users);
});

app.post('/submit', async (req, res) => {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  res.end(
    '<html><body><h1>Thanks for registering, ' +
      name +
      ".</h1><p>We'll contact you at " +
      email +
      '</p></body></html>'
  );
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
