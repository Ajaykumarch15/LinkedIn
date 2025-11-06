const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const { uploadProfile } = require("../middleware/uploadMiddleware");


// Get logged-in user profile
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update user profile
router.put("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.headline = req.body.headline || user.headline;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload profile picture
router.post("/upload", protect, uploadProfile.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profileImage = req.file.path; // Cloudinary returns URL
    await user.save();
    res.json({ profileImage: req.file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
