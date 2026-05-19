const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const cats = [
  { slug:'rings', name:'Rings', icon:'💍', count:240 },
  { slug:'necklaces', name:'Necklaces', icon:'📿', count:180 },
  { slug:'earrings', name:'Earrings', icon:'✨', count:320 },
  { slug:'bracelets', name:'Bracelets', icon:'⌚', count:150 },
  { slug:'bangles', name:'Bangles', icon:'⭕', count:90 },
  { slug:'pendants', name:'Pendants', icon:'🏅', count:110 },
];
router.get('/', (req, res) => res.json({ success: true, categories: cats }));
module.exports = router;
