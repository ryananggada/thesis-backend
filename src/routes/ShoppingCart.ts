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
    return res.status(404).json({
      error: 'Not found. Get shopping cart by user ID failed.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const shoppingcart = await ShoppingCart.delete({
      id: Number(req.params.id),
    });
    return res.json({
      message: 'Shopping cart have been deleted by ID.',
      shoppingcart,
    });
  } catch (error) {
    return res.status(404).json({
      error: 'Not found. Delete shopping cart by ID failed.',
    });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    const shoppingcart = await ShoppingCart.delete({
      user: { id: Number(req.params.id) },
    });
    return res.json({
      message: 'Shopping cart have been deleted by user ID.',
      shoppingcart,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Delete shopping cart by user ID failed, something went wrong.',
    });
  }
});

router.post('/add', async (req, res) => {
  const { user_id, medicine_id } = req.body;

  try {
    const repeatItem = await ShoppingCart.findOne({
      where: { user: { id: user_id }, medicine: { id: medicine_id } },
    });

    if (!repeatItem) {
      const shoppingcart = await ShoppingCart.insert({
        user: { id: user_id },
        medicine: { id: medicine_id },
      });

      return res.status(201).json({
        message: 'Successfully added to shopping cart.',
        shoppingcart,
      });
    }

    return res.status(406).json({
      error: 'Same item is already available in the shopping cart.',
    });
  } catch (error) {
    return res.status(500).json({
      error:
        'Add shopping cart by user ID and medicine failed, something went wrong.',
    });
  }
});

export default router;
