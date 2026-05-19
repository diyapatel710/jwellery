const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Review = require('../models/Review');
const Product = require('../models/Product');

router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name').sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});
router.post('/', auth, async (req, res) => {
  const { productId, rating, title, body } = req.body;
  const review = await Review.create({ product: productId, user: req.user.id, rating, title, body });
  const all = await Review.find({ product: productId });
  const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
  await Product.findByIdAndUpdate(productId, { 'ratings.average': avg.toFixed(1), 'ratings.count': all.length });
  res.status(201).json({ success: true, review });
});
router.delete('/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Not authorised' });
  await review.deleteOne();
  res.json({ success: true, message: 'Review deleted' });
});
module.exports = router;
