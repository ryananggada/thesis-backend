import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    return res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Get user by ID failed, something went wrong.' });
  }
});

router.post('/register', async (req, res) => {
  const {
    username,
    password,
    email,
    first_name,
    last_name,
    gender,
    date_of_birth,
    address,
  } = req.body;

  try {
    const user = User.create({ username, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    const profile = Profile.create({
      email,
      first_name,
      last_name,
      gender,
      date_of_birth,
      address,
    });
    profile.user = user;
    await profile.save();
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Registering user failed, something went wrong.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return res.json({ valid: true, message: 'Correct user credential.' });
      } else {
        return res.json({ valid: false, message: 'Wrong password!' });
      }
    } else {
      return res.json({ valid: false, messsage: 'User not found!' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Whole login function failed, something went wrong.' });
  }
});

export default router;
