import express from 'express';
import { Symptom } from '../entities/Symptom';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const symptom = await Symptom.find();
    return res.json(symptom);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get all symptoms failed, something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ where: { id: req.params.id } });
    return res.json(symptom);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get symptoms by ID failed, something went wrong.' });
  }
});

export default router;
