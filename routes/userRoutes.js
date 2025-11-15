const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, Controller.getUsers);
router.get('/:id', auth, Controller.getUserById);
router.post('/', auth, Controller.createUser);
router.put('/:id', auth, Controller.updateUser);
router.delete('/:id', auth, Controller.deleteUser);
module.exports = router;