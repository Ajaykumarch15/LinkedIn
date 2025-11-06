// backend/middleware/uploadMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Cloudinary storage for posts (auto compression)
const postStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "linkedin_clone/posts",
    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    transformation: [
      {
        width: 1080,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  }),
});

// ✅ Cloudinary storage for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "linkedin_clone/profiles",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: `${req.user?.id || "guest"}-${Date.now()}-profile`,
    transformation: [
      {
        width: 300,
        height: 300,
        crop: "fill",
        gravity: "face", // focus on faces if detected
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  }),
});

// ✅ Optional Cloudinary storage for banner images
const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "linkedin_clone/banners",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: `${req.user?.id || "guest"}-${Date.now()}-banner`,
    transformation: [
      {
        width: 1200,
        height: 400,
        crop: "fill",
        gravity: "auto",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  }),
});

// ✅ Multer uploaders
const uploadPost = multer({ storage: postStorage });
const uploadProfile = multer({ storage: profileStorage });
const uploadBanner = multer({ storage: bannerStorage });

module.exports = { uploadPost, uploadProfile, uploadBanner };
