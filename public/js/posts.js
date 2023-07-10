let blogPost = window.location.pathname.split("/");

const editPost = async (event) => {
  event.preventDefault();
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("bodyInput").value;

  if (title && description) {
    const response = await fetch(`/api/blogPost/${blogPost}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.assign("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const editButton = document.querySelectorAll("#editBtn");

for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}