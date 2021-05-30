import express from 'express';
import { Medicine } from '../entities/Medicine';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const medicine = await Medicine.find();
    return res.json(medicine);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ where: { id: req.params.id } });
    return res.json(medicine);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
