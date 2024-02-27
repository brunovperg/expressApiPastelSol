import express from 'express';
import Dish from '../db/dishes';
import Category from '../db/category';

const router = express.Router();

// Create a new dish
router.post('/', async (req, res) => {
	const category = await Category.findOne({ code: req.body.category });
	if (!category) {
		return res.status(400).send({ error: 'Category not found' });
	}

	const dish = new Dish({
		...req.body,
		category: category._id,
	});
	await dish.save();
	res.status(201).send(dish);
});

// Get all dishes
router.get('/', async (req, res) => {
	const dishes = await Dish.find();
	res.send(dishes);
});

// Update a dish
router.put('/:id', async (req, res) => {
	try {
		const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!dish) {
			return res.status(404).send();
		}
		res.send(dish);
	} catch (e) {
		res.status(400).send(e);
	}
});
// Delete a dish
router.delete('/:id', async (req, res) => {
	await Dish.findByIdAndDelete(req.params.id);
	res.status(204).send();
});

export default router;
