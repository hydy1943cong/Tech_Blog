document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.querySelector('#update-form');
  
  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.querySelector('#blog-id').value;
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    
    console.log(`Form data: ID=${id}, Title=${title}, Content=${content}`); // Check if this is logged
    
    if (title && content) {
      try {
        const response = await fetch(`/api/blogs/update/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/profile'); 
        } else {
          alert('Failed to update blog');
        }
      } catch (error) {
        console.error('Error occurred while updating:', error);
        alert('Error occurred while updating');
      }
    }
  });
});