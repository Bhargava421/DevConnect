const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUserProfile = (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update user profile
const updateUserProfile = async(req,res) =>{
  try{
    
    const updatedUser = await User.findByIdAndUpdate(req.user._id,{name: req.body.name || req.user.name, email: req.body.email || req.user.email  }, {new: true, runValidators: true})
    .select("-password");
    if(!updatedUser){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  }
  catch(error){
    res.status(500).json({message: "Server error"});
  }
}

const updateUserPassword = async (req, res) => {
  try{
    const {currentPassword, newPassword} = req.body;
    const user = await User.findById(req.user._id);

    if(!currentPassword || !newPassword){
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  }
  catch(error){
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile, updateUserPassword };
