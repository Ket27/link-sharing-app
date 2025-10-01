const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.postSignUp = async (req, res) => {
  const { name, email, password, photo } = req.body;

  if (!name || !password || !email) {
    res.json({
      message: "All information not filled",
    });
  }

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.json({
      message: "userExist",
    });
  } else {
    const user = await userModel.create({ name, email, password, photo });

    if (user) {
      res.json({
        message: "User Signed Up",
        data: user,
      });
    } else {
      res.json({
        message: "Sign Up Failed",
      });
    }
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    if (password === user.password) {
      const accessToken = jwt.sign({
        user : {
          name : user.name,
          email : user.email,
          id : user._id,
        },
      }, process.env.SECRET_KEY)
      res.json({
        message: "User Logged in",
        data: user,
        accessToken
      });
    } else {
      res.json({
        message: "password not same",
      });
    }
  } else {
    res.json({
      message: "no user found",
    });
  }
};

module.exports.getUser = async (req, res) => {
  const { _id } = req.params;

  const user = await userModel.findOne({ _id });

  if (user) {
    res.json({
      message: "userFound",
      data: user,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

module.exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateData = { name, email };
    if (req.file) {
      updateData.photo = req.file.filename; 
    }

    const user = await userModel.findOneAndUpdate(
      { _id: id },
      { name: name, email: email, photo: updateData.newPhoto }
    );

    if (!user) {
      res.json({
        message: "No user found",
      });
    } else {
      res.json({
        message: "user Updated",
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports.getUserById = async (req, res) => {
  try{
    const {id} = req.params;

    const user = await userModel.findOne({_id : id});
    if(!user){
      res.json({
        message : "no such user",
      })
    }

    else {
      res.json({
        message : "Here are your links",
        data : user,
      })
    }
  }
  catch(err) {
    console.log(err);
  }
}