const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const noteRoutes = require('./note.routes');
const userRoutes = require('./user.routes');

router.use('/note', auth, noteRoutes);
router.use('/user', userRoutes);

module.exports = router;
