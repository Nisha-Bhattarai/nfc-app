const express = require('express');
const { signup, login, verifyOtp, generateNewOtp } = require('../../controllers/authController');
const verifyToken = require('../../middleware/authMiddleWare');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verifyOtp', verifyOtp);
router.post('/generateNewOtp', generateNewOtp);


// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your profile', userId: req.user.userId });
});

module.exports = router;
