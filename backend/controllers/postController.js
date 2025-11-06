// controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

// Create post
exports.createPost = async (req, res) => {
  const { content, type, mediaUrl } = req.body;
  if ((!content || content.trim() === '') && !mediaUrl) {
    return res.status(400).json({ message: 'Post content or media is required' });
  }
  const post = await Post.create({
    user: req.user._id,
    content,
    type: type || 'text',
    mediaUrl: mediaUrl || ''
  });
  const populated = await post.populate('user', 'name profileImage');
  res.status(201).json(populated);
};

// Get all posts (feed) - newest first
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('user', 'name profileImage')
    .populate('comments.user', 'name profileImage')
    .sort({ createdAt: -1 });
  res.json(posts);
};

// Get single post
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user', 'name profileImage')
    .populate('comments.user', 'name profileImage');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

// Edit post (only author)
exports.updatePost = async (req, res) => {
  const { content, mediaUrl } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

  post.content = content !== undefined ? content : post.content;
  post.mediaUrl = mediaUrl !== undefined ? mediaUrl : post.mediaUrl;
  await post.save();
  const populated = await post.populate('user', 'name profileImage');
  res.json(populated);
};

// Delete post (only author)
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

  await post.remove();
  res.json({ message: 'Post removed' });
};

// Toggle like/unlike
exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const userId = req.user._id.toString();
  const idx = post.likes.findIndex(id => id.toString() === userId);
  let action;
  if (idx === -1) {
    post.likes.push(userId);
    action = 'liked';
  } else {
    post.likes.splice(idx, 1);
    action = 'unliked';
  }
  await post.save();
  res.json({ likesCount: post.likes.length, action });
};

// Add comment
exports.addComment = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') return res.status(400).json({ message: 'Comment text is required' });

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const comment = { user: req.user._id, text };
  post.comments.unshift(comment); // show latest first
  await post.save();

  const populated = await Post.findById(post._id).populate('comments.user', 'name profileImage');
  res.status(201).json(populated.comments);
};

// Delete comment (author only)
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const post = await Post.findOne({ 'comments._id': commentId });
  if (!post) return res.status(404).json({ message: 'Post or comment not found' });

  const comment = post.comments.id(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

  comment.remove();
  await post.save();
  res.json({ message: 'Comment removed' });
};
