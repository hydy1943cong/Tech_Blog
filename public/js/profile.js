document.addEventListener('DOMContentLoaded', () => {
  const newBlogForm = document.querySelector('.new-blog-form');
  
  if (newBlogForm) {
    newBlogForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.querySelector('#blog-title').value.trim();
      const content = document.querySelector('#blog-content').value.trim();

      if (title && content) {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          document.location.reload(); 
        } else {
          alert('Failed to create blog');
        }
      } else {
        alert('Please provide a title and content for your blog.');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.btn-update').forEach(button => {
    button.addEventListener('click', async (event) => {
      const id = event.target.getAttribute('data-id');
      window.location.href = `/api/blogs/update/${id}`; 
    });
  });


  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async (event) => {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile'); 
        alert('Failed to delete blog');
      }
    });
  });
});