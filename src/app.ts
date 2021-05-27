import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import userRoute from './routes/User';
import profileRoute from './routes/Profile';

const PORT = 8989;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

app.use('/user', userRoute);
app.use('/profile', profileRoute);

createConnection()
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`Server up at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));

app.get('/', async function (_req, res) {
  res.send('Database working!');
});
