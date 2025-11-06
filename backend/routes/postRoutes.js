// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");
const { uploadPost } = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Protected CRUD routes
router.post("/", protect, postController.createPost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);
router.post("/:id/like", protect, postController.toggleLike);
router.post("/:id/comment", protect, postController.addComment);
router.delete("/comment/:commentId", protect, postController.deleteComment);

// ✅ Upload media for posts (Cloudinary)
router.post("/upload", protect, uploadPost.single("media"), async (req, res) => {
  try {
    const mediaUrl = req.file.path; // Cloudinary auto-provides .path (URL)
    res.status(200).json({ mediaUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;
