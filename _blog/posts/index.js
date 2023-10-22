const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const settings = require('./app-settings.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title };

  posts[id] = post;

  try {
    await axios.post(`http://localhost:${settings.eventBusPort}/events`, {
      type: 'PostCreated',
      data: { ...post },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

app.post('/events', (req, res) => {
  console.log(`Event Received: ${JSON.stringify(req.body)}`);
  res.status(200).send({ status: 'OK' });
});

app.listen(settings.port, () => {
  console.log(`Listening on port ${settings.port}`);
});
