const library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numPages: 495,
    readStatus: true,
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    numPages: 695,
    readStatus: true,
  },
];

const Book = function (title, author, numPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = readStatus;
};

const addBookToLibrary = function () {
  const title = prompt("Title:");
  const author = prompt("Author:");
  const numPages = prompt("Number of Pages:");
  const readStatus = prompt("Read Status:");

  library.push(new Book(title, author, numPages, readStatus));
};

addBookToLibrary();
