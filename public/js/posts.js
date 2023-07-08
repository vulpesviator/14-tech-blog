let blogPost = window.location.pathname.split("/");

const editPost = async (event) => {
    event.preventDefault();

    const commentBody = document.getElementById("editBtn").value.trim();

    document.location.assign(`/create/${blogPost}`);
};

const deletePost = async (event) => {
    event.preventDefault();
    console.log(event.target);    

    const response = await fetch(`/api/post/${blogPost}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.assign('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#editBtn')
    .addEventListener('submit', editPost);

document
    .querySelector('#deleteBtn')
    .addEventListener('submit', deletePost);
