import express from 'express';
import dishRouter from './router/dishRouter';
import categoryRouter from './router/categoryRouter';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.use('/dish', dishRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const MONGO_URL =
	'mongodb+srv://brunovp:5561@cluster0.ace6l0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
});
