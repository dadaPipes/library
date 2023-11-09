/* immediately-invoked function expression (IIFE) */
Book.generateUniqueId = (function() {
  let id = 1;
  return function() {
    return id++;
  };
})()


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
}

const bookArray = [
  new Book('The Silent Stars Go By',        'Dan Abnett',       'Summary for The Silent Stars Go By',        256, true,  './images/Silent_Stars_Go_By.jpg'      , 'Book cover for: The Silent Stars Go By'),
  new Book('Shada',                         'Gareth Roberts',   'Summary for Shada',                         416, false, './images/Shada.jpg'                   , 'Book cover for: Shada'),
  new Book('Touched by an Angel',           'Jonathan Morris',  'Summary for Touched by an Angel',           256, true,  './images/Touched-by-an-Angel.jpg'     , 'Book cover for: Touched by an Angel'),
  new Book('The Day of the Doctor',         'Steven Moffat',    'Summary for The Day of the Doctor',         384, true,  'https://img00.deviantart.net/64e2/i/2013/315/c/a/the_day_of_the_doctor___promo_poster_portrait_by_gtccreations-d6tuwjc.jpg'                                 , 'Book cover for: The Day of the Doctor'),
  new Book('The Time Traveler\'s Almanac',  'Steve Tribe',      'Summary for The Time Traveler\'s Almanac',  320, false, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1360096370l/3326558.jpg'  , 'Book cover for: The Time Traveler\'s Almanac'),
  new Book('The Dalek Handbook',            'Steve Tribe',      'Summary for The Dalek Handbook',            160, true,  'https://th.bing.com/th/id/R.3cda6dd26e01c5372c83e1d2341e1301?rik=Y7zKXo3MkI3PGg&riu=http%3a%2f%2fprodimage.images-bn.com%2fpimages%2f9781849902328_p0_v2_s550x406.jpg&ehk=vfvnsQgjGGqZ27vSClAN3lW5fp8W%2ftSJYZlZqipHXec%3d&risl=&pid=ImgRaw&r=0'          , 'Book cover for: The Dalek Handbook'),
  new Book('The Writer\'s Tale',            'Russell T Davies', 'Summary for The Writer\'s Tale',            736, true,  'https://cdn2.penguin.com.au/covers/original/9781846078613.jpg'            , 'Book cover for: The Writer\'s Tale'),
  new Book('The Doctor\'s Lives and Times', 'James Goss',       'Summary for The Doctor\'s Lives and Times', 256, false, 'https://th.bing.com/th/id/R.2002290716be28518c8165c8c03b0b0d?rik=%2bAurEvHDIrhCEQ&riu=http%3a%2f%2fprodimage.images-bn.com%2fpimages%2f9780062293107_p0_v4_s1200x630.jpg&ehk=q6D2nu%2bDaehcaP5eZvBTlJGG5TEbWOEPOEhu%2bkUG7MY%3d&risl=&pid=ImgRaw&r=0' , 'Book cover for: The Doctor\'s Lives and Times'),
  new Book('The Legends of River Song',     'Jenny T. Colgan',  'Summary for The Legends of River Song',     224, true,  './images/River-Song.jpg'              , 'Book cover for: The Legends of River Song'),
  new Book('The Secret Lives of Monsters',  'Justin Richards',  'Summary for The Secret Lives of Monsters',  224, true,  'https://merchandise.thedoctorwhosite.co.uk/wp-content/uploads/monsetrs-secret.jpg', 'Book cover for: The Secret Lives of Monsters'),
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
  } else {
    element.src = onError;
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

function displayBookCards(library) {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';

  library.forEach((book, index) => {
    const listItem = createBookCard(book, index);
    bookList.appendChild(listItem);
  })
}

function createBookCard(book) {

  const listItem = document.createElement('li');
  listItem.classList.add('card');

  createAndAppendImage (listItem, 'card__image', book.imagePath, book.alt, './images/NOT_AVAILABLE.png');
  
  const cardContent = createAndAppend      (listItem, 'div', 'card__content');
  
  createAndAppend(cardContent, 'h2',  'card__title',   book.title);
  createAndAppend(cardContent, 'p',   'card__element', book.author);
  createAndAppend(cardContent, 'p',   'card__element', 'pages: ' + book.pages);
  createAndAppend(cardContent, 'p',   'card__element', book.summary);
  
  const cardButtons = createAndAppend(cardContent, 'div', 'card__buttons');

  const toggleButton = createAndAppendButton(cardButtons, 'card__toggle-button', book.readStatus ? 'Read' : 'Unread', () => {
    book.toggleReadStatus()
    toggleButton.textContent = book.readStatus ? 'Read' : 'Unread';
  })
  console.log(book);

  createAndAppendButton(cardButtons, 'card__delete-button', 'Delete', () => {
    const index = bookArray.findIndex(bookItem => bookItem.id === book.id);
    if (index !== -1) {
      bookArray.splice(index, 1);
      displayBookCards(bookArray);
    }
  })

  return listItem;
}

displayBookCards(bookArray)

function initializeDialog() {
  const addButton = document.querySelector('.nav__add-book');

  const modal = document.querySelector('.modal');
  const submitButton = document.querySelector('.modal__submit-button');
  const cancelButton = document.querySelector('.modal__cancel-button');

  addButton.addEventListener('click', openModal);
  cancelButton.addEventListener('click', closeModal);
  submitButton.addEventListener('click', handleSubmit);

  function openModal() {
    modal.classList.add('modal--visible');
    const titleInput = document.getElementById('title');
    titleInput.focus();
  }

  function closeModal() {
    modal.classList.remove('modal--visible');
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const summaryInput = document.getElementById('summary');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');
    const imageInput = document.getElementById('img');
    const imageName = document.getElementById('img-name');

    const title = titleInput.value;
    const author = authorInput.value;
    const summary = summaryInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    const image = imageInput.value;
    const imageAlt = imageName.value;

    const newBook = new Book(title, author, summary, pages, read, image, imageAlt);
    bookArray.unshift(newBook);

    document.querySelector('.modal__form').reset();
    closeModal();
    displayBookCards(bookArray);
  }
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