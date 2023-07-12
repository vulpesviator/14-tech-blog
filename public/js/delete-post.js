const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log(event.target);
  
    const blogPost = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
    const response = await fetch(`/api/posts/${blogPost}`, {
      method: 'DELETE',
      body: JSON.stringify({
          post_id: id
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.assign(`/api/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler);