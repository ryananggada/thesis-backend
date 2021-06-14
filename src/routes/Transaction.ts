import express from 'express';
import { Transaction } from '../entities/Transaction';
import { TransactionDetail } from '../entities/TransactionDetail';

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  try {
    const transaction = await Transaction.find({
      relations: ['user'],
      where: { user: { id: Number(req.params.id) } },
    });
    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({
      error: 'Get transaction by user ID failed, something went wrong.',
    });
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const detail = await TransactionDetail.find({
      relations: ['medicine'],
      where: { transaction: { id: Number(req.params.id) } },
    });
    return res.json(detail);
  } catch (error) {
    return res.status(500).json({
      error:
        'Get transaction detail by transaction ID failed, something went wrong.',
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
    return res.status(201).json(transaction);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Create transaction failed, smoething went wrong.' });
  }
});

router.post('/detail', async (req, res) => {
  const { transaction_id, medicine_id, subtotal } = req.body;

  try {
    const detail = TransactionDetail.insert({
      transaction: { id: transaction_id },
      medicine: { id: medicine_id },
      subtotal,
    });
    return res.status(201).json(detail);
  } catch (error) {
    return res.status(500).json({
      error: 'Create transaction detail failed, something went wrong.',
    });
  }
});

export default router;
