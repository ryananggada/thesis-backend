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
      .status(404)
      .json({ message: 'Not found. Get by user ID failed.' });
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

    return res.status(201).json({ user, status: 'User successfully created!' });
  } catch (error) {
    return res.status(400).json({
      message:
        'Registering user failed. Either some fields are not filled, or username or email was taken.',
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username: username },
  });

  const userPass = await User.findOne({
    select: ['password'],
    where: { username: username },
  });

  if (user && userPass) {
    const passwordMatch = await bcrypt.compare(password, userPass.password!);
    const profile = await Profile.findOne({ where: { user: user.id } });

    if (passwordMatch) {
      return res.json({
        valid: true,
        message: 'Correct user credential.',
        user,
        profile,
      });
    } else {
      return res.json({ valid: false, message: 'Wrong password!' });
    }
  } else {
    return res.status(404).json({ valid: false, messsage: 'User not found!' });
  }
});

export default router;
