import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import userRoute from './routes/User';
import profileRoute from './routes/Profile';
import medicineRoute from './routes/Medicine';
import symptomRoute from './routes/Symptom';
import shoppingCartRoute from './routes/ShoppingCart';
import transactionRoute from './routes/Transaction';

const PORT = 8989;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

app.use('/user', userRoute);
app.use('/profile', profileRoute);
app.use('/medicine', medicineRoute);
app.use('/symptom', symptomRoute);
app.use('/shoppingcart', shoppingCartRoute);
app.use('/transaction', transactionRoute);

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
