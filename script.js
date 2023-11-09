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

function createAndAppend(parent, elementType, className, textContent) {
  const element = document.createElement(elementType);
  if (className) {
    element.classList.add(className);
  }
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

function createAndAppendImage(parent, className, src, alt, onError) {
  const element = document.createElement('img');
  if (className) {
    element.classList.add(className);
  }
  if (src) {
    element.src = src;
  }
  if (alt) {
    element.alt = alt;
  }
  if (onError) {
    element.onerror = function() {
      this.src = onError;
    };
  }
  parent.appendChild(element);
  return element;
}

function createAndAppendButton(parent, className, textContent, onClick) {
  const button = document.createElement('button');
  if (className) {
    button.classList.add(className);
  }
  if (textContent) {
    button.textContent = textContent;
  }
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  parent.appendChild(button);
  return button;
}

function displayBooks(library) {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';

  library.forEach((book, index) => {
    const listItem = createBookCard(book, index);
    bookList.appendChild(listItem);
  });
}

function createBookCard(book) {
  const listItem = document.createElement('li');
  listItem.classList.add('book-list__card');

  createAndAppendImage(listItem, 'card__image',        book.imagePath, book.alt, './images/NOT_AVAILABLE.png');
  createAndAppend     (listItem, 'h4', 'card__title',  book.title);
  createAndAppend     (listItem, 'p', 'card__element', book.author);
  createAndAppend     (listItem, 'p', 'card__element', book.summary);

  createAndAppendButton(listItem, 'card__delete-button', 'Delete', () => {
    const index = myLibrary.findIndex(bookItem => bookItem.id === book.id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks(myLibrary);
    }
  });

  const toggleButton = createAndAppendButton(listItem, 'card__toggle-button', book.readStatus ? 'Read' : 'Unread', () => {
    book.toggleReadStatus();
    toggleButton.textContent = book.readStatus ? 'Read' : 'Unread';
  });

  return listItem;
}

displayBooks(myLibrary);

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