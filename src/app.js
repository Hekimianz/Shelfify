const newBookBtn = document.querySelector(".addBook");
const shelf = document.querySelector(".shelf");
const delBtns = document.querySelectorAll(".book--delete");

const lib = JSON.parse(localStorage.getItem("lib"));

const library = lib ? lib : [];

const Book = function (title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
};

// Show books
const renderLibrary = function () {
  shelf.innerHTML = "";
  library.forEach((book) => {
    const markup = `<div class="book--wrapper" data-id="${book.title}">
    <span class="book--status ${book.readStatus}"></span>
    <p class="book--title book--data">${book.title}</p>
    <p class="book--author book--data">${book.author}</p>
    <p class="book--pages book--data">${book.numPages} pages</p>
    <span class="material-icons book--delete" ">delete</span>
  </div>`;
    shelf.insertAdjacentHTML("beforeend", markup);
  });
};

// Show book form
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

  shelf.insertAdjacentHTML("beforeend", markup);
  const newBook = document.querySelector(".new");
  const confirmBook = newBook.querySelector(".confirmBook");
  confirmBook.addEventListener("click", addBookToLibrary);
};

// Add books
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

  if (newBookTitle === "" || newBookAuthor === "" || newBookPages <= 0) return;

  library.push(
    new Book(newBookTitle, newBookAuthor, newBookPages, newBookStatus)
  );

  renderLibrary();
  newBook.remove();
  localStorage.setItem("lib", JSON.stringify(library));
};

newBookBtn.addEventListener("click", showNewBookForm);

// Delete Books
shelf.addEventListener("click", function (e) {
  if (!e.target.classList.contains("book--delete")) return;
  library.forEach((book, i) => {
    if (book.title === e.target.parentElement.dataset.id) library.splice(i, 1);
  });
  e.target.parentElement.remove();
  localStorage.setItem("lib", JSON.stringify(library));
});

// Change Read Status
shelf.addEventListener("click", function (e) {
  let newStatus;
  if (!e.target.classList.contains("book--status")) return;
  if (e.target.classList.contains("read")) {
    e.target.classList.remove("read");
    e.target.classList.add("reading");
    newStatus = "reading";
  } else if (e.target.classList.contains("reading")) {
    e.target.classList.remove("reading");
    e.target.classList.add("notRead");
    newStatus = "notRead";
  } else {
    e.target.classList.remove("notRead");
    e.target.classList.add("read");
    newStatus = "read";
  }
  library.forEach((book, i) => {
    if (book.title === e.target.parentElement.dataset.id)
      book.readStatus = newStatus;
  });
  localStorage.setItem("lib", JSON.stringify(library));
});

renderLibrary();
