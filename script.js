/* immediately-invoked function expression (IIFE) */
Book.generateUniqueId = (function() {
  let id = 1;
  return function() {
    return id++;
  };
})();


function Book(title, author, summary, pages, readStatus, imagePath, imageAlt) {
  this.id         = Book.generateUniqueId();
  this.title      = title;
  this.author     = author;
  this.summary    = summary;
  this.pages      = pages;
  this.readStatus = readStatus;
  this.imagePath  = imagePath;
  this.imageAlt   = imageAlt;
}

Book.prototype.toggleReadStatus = function() {
  this.readStatus = !this.readStatus;
};

const myLibrary = [
  new Book('The Silent Stars Go By',        'Dan Abnett',       'Summary for The Silent Stars Go By',        256, true,  './images/Silent_Stars_Go_By.jpg', 'Book cover for: The Silent Stars Go By'),
  new Book('Shada',                         'Gareth Roberts',   'Summary for Shada',                         416, false, './images/Shada.jpg', 'Book cover for: Shada'),
  new Book('Touched by an Angel',           'Jonathan Morris',  'Summary for Touched by an Angel',           256, true,  './images/Touched-by-an-Angel.jpg', 'Book cover for: Touched by an Angel'),
  new Book('The Day of the Doctor',         'Steven Moffat',    'Summary for The Day of the Doctor',         384, true,  './images/Day_of_the_Doctor.jpg', 'Book cover for: The Day of the Doctor'),
  new Book('The Time Traveler\'s Almanac',  'Steve Tribe',      'Summary for The Time Traveler\'s Almanac',  320, false, './images/Time_Travelers_Almanac.jpg', 'Book cover for: The Time Traveler\'s Almanac'),
  new Book('The Dalek Handbook',            'Steve Tribe',      'Summary for The Dalek Handbook',            160, true,  './images/Dalek_Handbook.jpg', 'Book cover for: The Dalek Handbook'),
  new Book('The Writer\'s Tale',            'Russell T Davies', 'Summary for The Writer\'s Tale',            736, true,  './images/Writers_Tale.jpg', 'Book cover for: The Writer\'s Tale'),
  new Book('The Doctor\'s Lives and Times', 'James Goss',       'Summary for The Doctor\'s Lives and Times', 256, false, './images/Doctors_Lives_and_Times.jpg', 'Book cover for: The Doctor\'s Lives and Times'),
  new Book('The Legends of River Song',     'Jenny T. Colgan',  'Summary for The Legends of River Song',     224, true,  './images/River-Song.jpg', 'Book cover for: The Legends of River Song'),
  new Book('The Secret Lives of Monsters',  'Justin Richards',  'Summary for The Secret Lives of Monsters',  224, true,  './images/Secret_Lives_of_Monsters.jpg', 'Book cover for: The Secret Lives of Monsters'),
  new Book('The Official Cookbook',         'Joanna Farrow',    'Summary for The Official Cookbook',         160, false, './images/Official_Cookbook.jpg', 'Book cover for: The Official Cookbook'),
  new Book('The Writer\'s Guide',           'Graeme Burk',      'Summary for The Writer\'s Guide',           256, true,  './images/Writers_Guide.jpg', 'Book cover for: The Writer\'s Guide')
];

function displayBooks(library) {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';

  library.forEach((book, index) => {
    const listItem = createBookCard(book, index);
    bookList.appendChild(listItem);
    /* console.log(book); */
  });
}
displayBooks(myLibrary);
/* console.log(myLibrary); */

function createBookCard(book) {
  /* console.log(book); */
  function createImage(book) {
    const image = document.createElement('img');
    image.classList.add('card__image');
    image.src = book.imagePath;
    image.alt = book.imageAlt;
    
    image.onerror = function() {
      this.src = './images/NOT_AVAILABLE.png';
    };
    return image;
  };

  function createTitle(book) {
    const title = document.createElement('h4');
    title.classList.add('card__title');
    title.textContent = book.title;
    return title;
  };

  function createAuthor(book) {
    const author = document.createElement('p');
    author.classList.add('card__author');
    author.textContent = book.author;
    return author;
  }

  function createSummary(book) {
    const summary = document.createElement('p');
    summary.classList.add('card__summary');
    summary.textcontent = book.summary;
    return summary;
  }

  function createPages(book) {
    const pages = document.createElement('p');
    pages.classList.add('card__pages');
  }

  function createDeleteButton(book) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');
    deleteButton.textContent = 'Delete';
  
    deleteButton.addEventListener('click', () => {
      const index = myLibrary.findIndex(bookItem => {
        return bookItem.id === book.id;
      });
  
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
      }
    });
  
    return deleteButton;
  }

  function createToggleButton(book) {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('card__toggle-button');
    toggleButton.textContent = book.readStatus ? 'Read' : 'Unread';
  
    toggleButton.addEventListener('click', () => {
      book.toggleReadStatus();
      toggleButton.textContent = book.readStatus ? 'Read' : 'Unread';
    });
    return toggleButton;
  };

  const listItem = document.createElement('li');
  listItem.classList.add('book-list__card');

  const image = createImage(book);
  listItem.appendChild(image);

  const title = createTitle(book);
  listItem.appendChild(title);

  const author = createAuthor(book);
  listItem.appendChild(author);

  const summary = createSummary(book);
  listItem.appendChild(summary);

  /* const description = createDescription(book);
  listItem.appendChild(description); */

  const deleteButton = createDeleteButton(book);
  listItem.appendChild(deleteButton);

  const toggleButton = createToggleButton(book);
  listItem.appendChild(toggleButton);

  return listItem;
}

/* Add Book */
function initializeDialog() {
  const modal        = document.querySelector('.modal');
  const titleInput   = document.getElementById('title');
  const addButton    = document.querySelector('.nav__add-book');
  const cancelButton = document.querySelector('.modal__cancel-button');
  const submitButton = document.querySelector('.modal__submit-button');

  addButton.addEventListener('click', () => {
    modal.classList.add('modal--visible');
    titleInput.focus();
  });

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('modal--visible');
  });

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const titleInput     = document.getElementById('title');
    const authorInput    = document.getElementById('author');
    const pagesInput     = document.getElementById('pages');
    const readInput      = document.getElementById('read');
    const imageInput     = document.getElementById('img');
    const imageName      = document.getElementById('img-name');
  
    const title          = titleInput.value;
    const author         = authorInput.value;
    const pages          = pagesInput.value;
    const read           = readInput.checked;
    const image          = imageInput.value;
    const imageAlt       = imageName.value;
  
    /* console.log(`Title: ${title}`);
    console.log(`Author: ${author}`);
    console.log(`Pages: ${pages}`);
    console.log(`Read: ${read}`);
    console.log(`Image: ${image}`);
    console.log(`Image Alt: ${imageAlt}`); */

    const newBook = new Book(title, author, pages, read, image, imageAlt);
    console.log(newBook);
    myLibrary.unshift(newBook);

    document.querySelector('.modal__form').reset();
    modal.classList.remove('modal--visible');

    const bookList     = document.querySelector('.book-list');
    bookList.innerHTML = '';

    displayBooks(myLibrary);
  });
}
initializeDialog();

function validateNumericInput(event) {
  const input = event.target;
  const value = input.value;
  const numericValue = parseInt(value);

  if (isNaN(numericValue)) {
    input.value = '';
  } else {
    input.value = numericValue;
  }
}