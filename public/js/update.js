document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.querySelector('#update-form');
    if (updateForm) {
      updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const id = document.querySelector('#blog-id').value;
        const title = document.querySelector('#blog-title').value.trim();
        const content = document.querySelector('#blog-content').value.trim();
  
        if (title && content) {
          const response = await fetch(`/api/blogs/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            document.location.replace('/profile'); 
          } else {
            alert('Failed to update blog');
          }
        }
      });
    }
  });