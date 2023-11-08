/* immediately-invoked function expression (IIFE) */
Book.generateUniqueId = (function() {
  let id = 1;
  return function() {
    return id++;
  };
})();


function Book(title, author, pages, read, imagePath, imageAlt) {
  this.id = Book.generateUniqueId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.imagePath = imagePath;
  this.imageAlt = imageAlt;
}

const myLibrary = [
  new Book('The Silent Stars Go By',        'Dan Abnett',       256, true,  './images/Silent_Stars_Go_By.jpg', 'Book cover for: The Silent Stars Go By'),
  new Book('Shada',                         'Gareth Roberts',   416, false, './images/Shada.jpg', 'Book cover for: Shada'),
  new Book('Touched by an Angel',           'Jonathan Morris',  256, true,  './images/Touched-by-an-Angel.jpg', 'Book cover for: Touched by an Angel'),
  new Book('The Day of the Doctor',         'Steven Moffat',    384, true,  './images/Day_of_the_Doctor.jpg', 'Book cover for: The Day of the Doctor'),
  new Book('The Time Traveler\'s Almanac',  'Steve Tribe',      320, false, './images/Time_Travelers_Almanac.jpg', 'Book cover for: The Time Traveler\'s Almanac'),
  new Book('The Dalek Handbook',            'Steve Tribe',      160, true,  './images/Dalek_Handbook.jpg', 'Book cover for: The Dalek Handbook'),
  new Book('The Writer\'s Tale',            'Russell T Davies', 736, true,  './images/Writers_Tale.jpg', 'Book cover for: The Writer\'s Tale'),
  new Book('The Doctor\'s Lives and Times', 'James Goss',       256, false, './images/Doctors_Lives_and_Times.jpg', 'Book cover for: The Doctor\'s Lives and Times'),
  new Book('The Legends of River Song',     'Jenny T. Colgan',  224, true,  './images/River-Song.jpg', 'Book cover for: The Legends of River Song'),
  new Book('The Secret Lives of Monsters',  'Justin Richards',  224, true,  './images/Secret_Lives_of_Monsters.jpg', 'Book cover for: The Secret Lives of Monsters'),
  new Book('The Official Cookbook',         'Joanna Farrow',    160, false, './images/Official_Cookbook.jpg', 'Book cover for: The Official Cookbook'),
  new Book('The Writer\'s Guide',           'Graeme Burk',      256, true,  './images/Writers_Guide.jpg', 'Book cover for: The Writer\'s Guide')
  ];

function displayBooks(library) {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';

  library.forEach((book, index) => {
    const listItem = createBookCard(book, index);
    bookList.appendChild(listItem);
  });
}
displayBooks(myLibrary);

function createBookCard(book) {

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

  function createDescription(book) {
    const description = document.createElement('div');
    description.classList.add('card__description');
    description.textContent = `by author ${book.author}, pages ${book.pages}, ${book.read ? 'Read' : 'Not read'}`;
    return description;
  };

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

  /* function createToggleRead(read) {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('card__toogle-button');
    toggleButton.
  }; */

  const listItem = document.createElement('li');
  listItem.classList.add('book-list__card');

  const image = createImage(book);
  listItem.appendChild(image);

  const title = createTitle(book);
  listItem.appendChild(title);

  const description = createDescription(book);
  listItem.appendChild(description);

  const deleteButton = createDeleteButton(book);
  listItem.appendChild(deleteButton);

  return listItem;
}

/* Add Book */
function initializeDialog() {
  const modal = document.querySelector('.modal');
  const addButton = document.querySelector('.nav__add-book');
  const titleInput = document.getElementById('title');
  const cancelButton = document.querySelector('.modal__cancel-button');
  const submitButton = document.querySelector('.modal__submit-button');

  addButton.addEventListener('click', () => {
    modal.classList.add('modal--visible');
    titleInput.focus();
  });

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('modal--visible');
  });

  submitButton.addEventListener('click', () => {

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');
    const imageInput = document.getElementById('gallery-img');
  
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    const image = imageInput.value;
  
    const newBook = new Book(title, author, pages, read, image);
    myLibrary.unshift(newBook);

    document.querySelector('.modal__form').reset();
    modal.classList.remove('modal--visible');

    const bookList = document.querySelector('.book-list');
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