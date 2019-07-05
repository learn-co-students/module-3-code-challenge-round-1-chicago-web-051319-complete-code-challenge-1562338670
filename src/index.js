document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2935 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => renderImage(data))

  function renderImage(data){
    const img = document.querySelector("img")
    const title = document.querySelector("#name")
    const likes = document.querySelector("#likes")
    const likeButton = document.querySelector("#like_button")

    img.src = data.url
    title.innerText = data.name
    likes.innerText = data.like_count

    const allComments = data.comments

    allComments.forEach((comment) =>{
      const commentsList = document.querySelector("#comments")
      const item = document.createElement("li")
      item.innerText = comment.content

      commentsList.append(item)
    })

    likeButton.addEventListener("click", () => {
      let currentLikes = parseInt(likes.innerText)
      let newLikes = currentLikes + 1
      likes.innerText = newLikes

      fetch(likeURL, {
        method: "POST",
        body: JSON.stringify({image_id: imageId, likes: newLikes}),
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
    })

  }

  const newCommentForm = document.querySelector("#comment_form")
  newCommentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const commentsList = document.querySelector("#comments")
    // const newComment = newCommentForm.querySelector("#comment-input")
    const newComment = e.target[0].nextElementSibling.form[1].parentElement.firstElementChild.value
    const newItem = document.createElement("li")
    newItem.innerText = newComment
    commentsList.append(newItem)

    fetch(commentsURL, {
      method: "POST",
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      }),
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

  })






})
