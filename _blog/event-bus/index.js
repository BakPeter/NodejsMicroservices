const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const settings = require('./app-settings.json');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios
    .post(`http://localhost:${settings.postsPort}/events`, event)
    .then((res) => {
      console.log(
        JSON.stringify({
          origin: 'Posts',
          status: res.status,
          content: res.data,
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
    });

  axios
    .post(`http://localhost:${settings.commentsPort}/events`, event)
    .then((res) => {
      console.log(
        JSON.stringify({
          origin: 'Comments',
          status: res.status,
          content: res.data,
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
    });

  axios
    .post(`http://localhost:${settings.queryPort}/events`, event)
    .then((res) => {
      console.log(
        JSON.stringify({
          origin: 'Query',
          status: res.status,
          content: res.data,
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log(`Listening on port ${settings.port}`);
});
