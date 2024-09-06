const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const blogObject = blog.toJSON();
    res.render('update', { blog: blogObject });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    console.log(`Updating blog with ID: ${id}, Title: ${title}, Content: ${content}`);

    const [updatedRowsCount] = await Blog.update(
      { title, content },
      { where: { id: id } }
    );

    if (updatedRowsCount > 0) {
      res.status(200).json({ message: 'Blog updated successfully' });
    } else {
      res.status(404).json({ message: 'No blog found with this id' });
    }
  } catch (err) {
    console.error('Error in PUT route:', err); // Improved logging
    res.status(500).json({ error: 'Failed to update blog', details: err });
  }
});


module.exports = router;
