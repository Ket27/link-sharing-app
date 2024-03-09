const express = require("express");
const { loginUser, postSignUp, getUser, UpdateUser, getUserById } = require("../controllers/userController");
const userRouter = express.Router();
const upload = require("../config/multer");

userRouter
    .route('/signup')
    .post(postSignUp)

userRouter
    .route('/login')
    .post(loginUser)

userRouter
    .route('/getUser')
    .get(getUser)

userRouter
    .route('/getUserById/:id')
    .get(getUserById)

userRouter
    .route('/updateUser/:id')
    .put(upload.single('photo'), UpdateUser)

module.exports = userRouter;