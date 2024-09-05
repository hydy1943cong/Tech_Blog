const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;