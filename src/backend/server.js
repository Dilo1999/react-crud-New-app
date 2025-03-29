const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/crudapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const Item = mongoose.model('Item', ItemSchema);

// File Upload Configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const newItem = new Item({ name, imageUrl });
  await newItem.save();
  res.json(newItem);
});

app.put('/items/:id', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, imageUrl }, { new: true });
  res.json(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.delete('/items', async (req, res) => {
  await Item.deleteMany();
  res.json({ message: 'All items deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
