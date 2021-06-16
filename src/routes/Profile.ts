import express from 'express';
import bcrypt from 'bcrypt';
import { Profile } from '../entities/Profile';
import { User } from '../entities/User';

const router = express.Router();

router.post('/fetch', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      select: ['id', 'username', 'password'],
      where: { username: username },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const profile = await Profile.findOne({ where: { user: user.id } });
        return res.json(profile);
      } else {
        return res.json({
          message: 'Failed to fetch profile, wrong password!',
        });
      }
    } else {
      return res.json({ message: 'Failed to fetch profile, user not found!' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Fetch profile by user credentials failed, something went wrong.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      relations: ['user'],
      where: { id: req.params.id },
    });
    return res.json(profile);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get profile by ID failed, something went wrong.' });
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
    return res
      .status(500)
      .json({ error: 'Creating profile failed, something went wrong.' });
  }
});

export default router;
