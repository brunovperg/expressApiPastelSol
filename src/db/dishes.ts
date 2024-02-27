import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	size: [
		{
			sizeName: { type: String, required: false, default: 'small' },
			price: { type: String, required: false, default: '0' },
		},
	],
});

export default mongoose.model('Dish', dishSchema);
