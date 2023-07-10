async function commentForm(event) {
    event.preventDefault();

    const comment_body = document.querySelector("#comment").value.trim();

    const url = window.location.toString().split("/");
    const post_id = url[url.length - 1];

    if (comment_body) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
            blogPost_id,
            comment_body,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#comment-form").addEventListener("submit", commentForm);