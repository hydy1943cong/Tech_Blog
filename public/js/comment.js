document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.querySelector('#comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const content = document.querySelector('#comment-content').value.trim();
      const blogId = window.location.pathname.split('/').pop();

      console.log(`Submitting comment: ${content} for blog ID: ${blogId}`);

      if (content) {
        try {
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id: blogId }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(`Response status: ${response.status}`);
          if (response.ok) {
            console.log('Comment posted successfully');
            document.location.reload();
          } else {
            const errorData = await response.json();
            console.error('Failed to post comment:', errorData);
            alert('Failed to post comment');
          }
        } catch (error) {
          console.error('Error posting comment:', error);
          alert('Error posting comment');
        }
      }
    });
  }
});