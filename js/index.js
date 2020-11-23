document.addEventListener("DOMContentLoaded", function () {

  // DOM ELEMENTS
  const ul = document.querySelector("div #list")
  const showPanel = document.querySelector("#show-panel")
  const button = document.createElement("button")
  button.style.background = "orange"
  button.style.fontFamily = "Comic Sans MS"
  button.textContent = "i like this"
  



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
    const subtitle = document.createElement("h4")
    subtitle.textContent = bookObj.subtitle
    const author = document.createElement("h4")
    author.textContent = bookObj.author
    const desc = document.createElement("p")
    desc.textContent = bookObj.description
    const ul = document.createElement("ul")
    
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


  // EVENT LISTENERS

  ul.addEventListener("mousedown", selectBook)





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
