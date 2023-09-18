const newBookBtn = document.querySelector(".addBook");
const shelf = document.querySelector(".shelf");

const library = [];

const Book = function (title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
};

const renderLibrary = function () {
  shelf.innerHTML = "";
  library.forEach((book) => {
    const markup = `<div class="book--wrapper ">
    <span class="book--status ${book.readStatus}"></span>
    <p class="book--title book--data">${book.title}</p>
    <p class="book--author book--data">${book.author}</p>
    <p class="book--pages book--data">${book.numPages} pages</p>
    <span class="material-icons book--edit">edit</span>
    <span class="material-icons book--delete">delete</span>
  </div>`;
    shelf.insertAdjacentHTML("beforeend", markup);
  });
};

const showNewBookForm = function () {
  const books = document.querySelectorAll(".book--wrapper");
  if (document.querySelector(".new")) return;
  const markup = `<div class="book--wrapper new">
  <span class="book--status reading"></span>
  <input
    type="text"
    placeholder="Title"
    class="book--title book--data"
  />
  <input
    type="text"
    placeholder="Author"
    class="book--author book--data"
  />
  <input type="number" placeholder="0" class="book--pages book--data" />
  <span class="material-icons confirmBook">add</span>
  <span class="material-icons book--delete">delete</span>
</div>`;

  shelf.insertAdjacentHTML("afterend", markup);
  const newBook = document.querySelector(".new");
  const confirmBook = newBook.querySelector(".confirmBook");
  confirmBook.addEventListener("click", addBookToLibrary);
};

const addBookToLibrary = function () {
  const newBook = document.querySelector(".new");
  const newBookTitle = newBook.querySelector(".book--title").value;
  const newBookAuthor = newBook.querySelector(".book--author").value;
  const newBookPages = newBook.querySelector(".book--pages").value;
  let newBookStatus = newBook.querySelector(".book--status");
  if (newBookStatus.classList.contains("read")) {
    newBookStatus = "read";
  } else if (newBookStatus.classList.contains("notRead")) {
    newBookStatus = "notRead";
  } else {
    newBookStatus = "reading";
  }

  library.push(
    new Book(newBookTitle, newBookAuthor, newBookPages, newBookStatus)
  );
  console.log(library);
  renderLibrary();
  newBook.remove();
};

newBookBtn.addEventListener("click", showNewBookForm);
