async function newPost(event) {
    event.preventDefault();

    const title = document.querySelector("#titleInput").value.trim();
    const description = document.querySelector("#bodyInput").value.trim();

    if (title && description) {
        const response = await fetch(`/api/post`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector("#create-post").addEventListener("submit", newPost);