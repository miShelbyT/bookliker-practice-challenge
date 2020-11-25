document.addEventListener("DOMContentLoaded", function () {

  // DOM ELEMENTS
  const ul = document.querySelector("div #list")
  const showPanel = document.querySelector("#show-panel")
  const button = document.createElement("button")
  button.style.background = "orange"
  button.style.fontFamily = "Comic Sans MS"
  button.textContent = "i like this book"

  // RENDERS

  const renderBookTitle = (bookObj) => {
    const li = document.createElement("li")
    li.textContent = bookObj.title
    li.dataset.id = bookObj.id
    ul.append(li)
  }

  const renderOneBook = (bookObj) => {
    showPanel.innerHTML = ""
    const image = document.createElement("img")
    image.src = bookObj['img_url']
    const title = document.createElement("h3")

    title.textContent = bookObj.title
    title.dataset.id = bookObj.id
    const subtitle = document.createElement("h4")
    subtitle.textContent = bookObj.subtitle
    const author = document.createElement("h4")
    author.textContent = bookObj.author
    const desc = document.createElement("p")
    desc.textContent = bookObj.description
    const ul = document.createElement("ul")
    ul.classList.add("userLikes")

    bookObj.users.forEach((user) => {
      const li = document.createElement("li")
      li.textContent = user.username
      li.dataset.id = user.id
      ul.append(li)

    })
    showPanel.append(image, title, subtitle, author, desc, ul)
    ul.append(button)
  }



  // EVENT HANDLERS
  const selectBook = (event) => {
    if (event.target.matches("li")) {
      const id = event.target.dataset.id
      // console.log(id)
      fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json())
        .then(bookObj => renderOneBook(bookObj))
    }

  }
  let myUserId;
  let newUsers;

  const addALike = () => {
    const title = showPanel.querySelector("h3")
    const id = title.dataset.id
    const ul = document.querySelector(".userLikes")

    myUserId = {
      id: 1,
      username: "pouros"
    }

    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(bookObj => {
        bookObj.users.push(myUserId);
        console.log(bookObj.users)
        newUsers = { users: bookObj.users }
        console.log(newUsers)
      })

    fetch(`http://localhost:3000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newUsers)
      
    })
      .then(response => response.json())
      .then(updatedBook => {
        console.log(updatedBook)
        const li = document.createElement("li")
        li.textContent = myUserId.username
        ul.append(li)
      });
  }

  // EVENT LISTENERS

  ul.addEventListener("mousedown", selectBook)
  button.addEventListener("click", addALike)


  // INITIALIZE
  const initialize = () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(booksArray => {
        booksArray.forEach(bookObj => {
          renderBookTitle(bookObj)
        })
      })
  }

  initialize()


});
