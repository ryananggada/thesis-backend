import express from 'express';
import { Transaction } from '../entities/Transaction';
import { TransactionDetail } from '../entities/TransactionDetail';
import { ShoppingCart } from '../entities/ShoppingCart';
import { Medicine } from '../entities/Medicine';

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  try {
    const transaction = await Transaction.find({
      relations: ['user'],
      where: { user: { id: Number(req.params.id) } },
    });
    return res.json(transaction);
  } catch (error) {
    return res.status(404).json({
      error: 'Not found. Get transaction by user ID failed.',
    });
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const detail = await TransactionDetail.find({
      relations: ['medicine'],
      where: { transaction: { id: Number(req.params.id) } },
    });
    const transaction = await Transaction.findOne({
      where: { id: Number(req.params.id) },
    });
    return res.json({ transaction, detail });
  } catch (error) {
    return res.status(404).json({
      error: 'Not found. Get transaction detail by transaction ID failed.',
    });
  }
});

router.post('/user', async (req, res) => {
  const { user_id, total, date } = req.body;

  try {
    const transaction = await Transaction.insert({
      user: { id: user_id },
      total,
      date,
    });
    return res.status(201).json({
      message: 'Successfully added transaction by user ID.',
      transaction,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Failed to create transaction. Something went wrong.' });
  }
});

router.post('/detail', async (req, res) => {
  const { transaction_id, medicine_id, subtotal } = req.body;

  try {
    const detail = await TransactionDetail.insert({
      transaction: { id: Number(transaction_id) },
      medicine: { id: Number(medicine_id) },
      subtotal,
    });
    return res
      .status(201)
      .json({ message: 'Successfully add transaction detail.', detail });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to create transaction detail. Something went wrong.',
    });
  }
});

router.post('/submit', async (req, res) => {
  let { user_id, total, date, transaction_detail } = req.body;

  try {
    await Transaction.insert({
      user: { id: Number(user_id) },
      total,
      date,
    });

    const transactionFetch = await Transaction.findOne({
      where: { user: { id: Number(user_id) } },
      order: { id: 'DESC' },
    });
    const transaction_id = transactionFetch!.id;
    await ShoppingCart.delete({ user: { id: Number(user_id) } });
    await transaction_detail.forEach((el: { transaction: Number }) => {
      el.transaction = transaction_id;
    });
    await TransactionDetail.insert(transaction_detail);
    return res.status(201).json({
      message: 'Successfully finished the transaction.',
      transaction_id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Failed to finish transaction. Something went wrong.' });
  }
});

export default router;
