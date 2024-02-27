import express from 'express';
import Category from '../db/category';

const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
	const category = new Category(req.body);
	await category.save();
	res.status(201).send(category);
});

// Get all categoryes
router.get('/', async (req, res) => {
	const categoryes = await Category.find();
	res.send(categoryes);
});

// Update a category
router.put('/:id', async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!category) {
			return res.status(404).send();
		}
		res.send(category);
	} catch (e) {
		res.status(400).send(e);
	}
});
// Delete a category
router.delete('/:id', async (req, res) => {
	await Category.findByIdAndDelete(req.params.id);
	res.status(204).send();
});

export default router;
