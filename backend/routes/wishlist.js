const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist', 'name price images category metal');
  res.json({ success: true, wishlist: user?.wishlist || [] });
});
router.post('/add/:productId', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { wishlist: req.params.productId } });
  res.json({ success: true, message: 'Added to wishlist' });
});
router.delete('/remove/:productId', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { wishlist: req.params.productId } });
  res.json({ success: true, message: 'Removed from wishlist' });
});
module.exports = router;
