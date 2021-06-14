import express from 'express';
import { In, Like, Not } from 'typeorm';
import { Medicine } from '../entities/Medicine';
import { Symptom } from '../entities/Symptom';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find({ relations: ['symptom'] });
    return res.json(medicines);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get all medicines failed, something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      relations: ['symptom'],
      where: { id: req.params.id },
    });
    return res.json(medicine);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get medicines by ID failed, something went wrong.' });
  }
});

router.post('/check', async (req, res) => {
  const { first_symptom, second_symptom, third_symptom, indication } = req.body;

  try {
    const symptoms = await Symptom.find({
      where: { name: In([first_symptom, second_symptom, third_symptom]) },
    });

    if (symptoms) {
      const symptomsId = symptoms.map((item) => {
        return item.id;
      });
      const medicines = await Medicine.find({
        relations: ['symptom'],
        where: {
          symptom: { id: In(symptomsId) },
          indication: Not(Like(`%${indication}%`)),
        },
      });
      return res.status(201).json(medicines);
    } else {
      return res.json({ message: 'Not found' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Get medicines by symptoms failed, something went wrong.',
    });
  }
});

export default router;
