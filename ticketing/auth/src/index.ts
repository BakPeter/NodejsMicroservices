import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

// app.get('/health', (req, res) => {
//   res.status(200).send('Helthy');
// });

app.get('/api/users/currentuser', (req, res) => {
  console.log('/api/users/currentuser');
  res.send('Hi there!!!!');
});

app.listen(3000, () => {
  console.log('Listenning on port 3000!!!!');
});
