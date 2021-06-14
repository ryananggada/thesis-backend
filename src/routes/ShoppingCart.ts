import express from 'express';
import { ShoppingCart } from '../entities/ShoppingCart';

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  try {
    const shoppingcart = await ShoppingCart.find({
      relations: ['medicine'],
      where: { user: { id: req.params.id } },
    });
    return res.json(shoppingcart);
  } catch (error) {
    return res.status(500).json({
      error: 'Get shopping cart by user ID failed, something went wrong.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const shoppingcart = await ShoppingCart.delete({
      id: Number(req.params.id),
    });
    return res.json(shoppingcart);
  } catch (error) {
    return res.status(500).json({
      error: 'Delete shopping cart by ID failed, something went wrong.',
    });
  }
});

router.post('/add', async (req, res) => {
  const { user_id, medicine_id } = req.body;

  try {
    const shoppingcart = await ShoppingCart.insert({
      user: { id: user_id },
      medicine: { id: medicine_id },
    });
    return res.json(shoppingcart);
  } catch (error) {
    return res.status(500).json({
      error:
        'Add shopping cart by user ID and medicine failed, something went wrong.',
    });
  }
});

export default router;
