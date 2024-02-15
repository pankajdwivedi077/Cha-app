import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  try{
   const { fullName, username, password, confirmPassword, gender } = req.body;

   if(password !== confirmPassword){
    return res.status(400).json({error: "Password and confirm password don't match"});
   }

   const user = await User.findOne({username})

   if(user){
    return res.status(400).json({error: "Username already exists"});
   }

//  hash password 

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
 
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
 
  const newUser = new User({
    fullName:fullName,
    username:username,
    password:hashedPassword,
    gender:gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic
  })

  if (newUser){

    // Generate jwt token

    await newUser.save();

    res.status(201).json({
      _id:newUser._id,
      fullName:newUser.fullName,
      username:newUser.username,
      password:newUser.password,
      gender:newUser.gender,
      profilePic:newUser.profilePic
    })
  }else{
    res.status(400).json({error: "Invalid user data"});
  }

  } catch(error){
    console.log("error in sign up controller",error.message)
    res.status(500).json({error: "Internal server error"})
  }
}

export const login = (req, res) => {
    res.send("loginuser");
}

export const logout = (req, res) => {
 res.send("logout")
}

