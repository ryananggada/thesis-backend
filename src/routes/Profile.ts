import express from 'express';
import { Profile } from '../entities/Profile';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { id: req.params.id } });
    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.put('/:id', async (req, res) => {
  const { email, first_name, last_name, gender, date_of_birth, address } =
    req.body;

  try {
    const profile = await Profile.update(
      { id: Number(req.params.id) },
      { email, first_name, last_name, gender, date_of_birth, address }
    );

    return res.json(profile);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
