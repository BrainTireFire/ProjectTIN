const express = require('express');
const userController = require('./../controllers/userController');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.use(accountController.protect);

router.get('/me', userController.getCurrentUser, userController.getUser)

router
    .patch('/updateCurrentUser', userController.updateCurrentUser);
router
    .delete('/deleteCurrentUser', userController.deleteCurrentUser);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;

