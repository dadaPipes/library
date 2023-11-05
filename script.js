function Book(title, author, pages, read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
}

const myLibrary = [
  new Book('The Silent Stars Go By', 'Dan Abnett', 256, true, './images/Silent_Stars_Go_By.jpg'),
  new Book('Shada', 'Gareth Roberts', 416, false, './images/Shada.jpg'),
  new Book('Touched by an Angel', 'Jonathan Morris', 256, true, './images/Touched-by-an-Angel.jpg'),
  new Book('The Day of the Doctor', 'Steven Moffat', 384, true, './images/Day_of_the_Doctor.jpg'),
  new Book('The Time Traveler\'s Almanac', 'Steve Tribe', 320, false, './images/Time_Travelers_Almanac.jpg'),
  new Book('The Dalek Handbook', 'Steve Tribe', 160, true, './images/Dalek_Handbook.jpg'),
  new Book('The Writer\'s Tale', 'Russell T Davies', 736, true, './images/Writers_Tale.jpg'),
  new Book('The Doctor\'s Lives and Times', 'James Goss', 256, false, './images/Doctors_Lives_and_Times.jpg'),
  new Book('The Legends of River Song', 'Jenny T. Colgan', 224, true, './images/Legends_of_River_Song.jpg'),
  new Book('The Secret Lives of Monsters', 'Justin Richards', 224, true, './images/Secret_Lives_of_Monsters.jpg'),
  new Book('The Official Cookbook', 'Joanna Farrow', 160, false, './images/Official_Cookbook.jpg'),
  new Book('The Writer\'s Guide', 'Graeme Burk', 256, true, './images/Writers_Guide.jpg')
];

function initializeDialog() {
  const modal = document.querySelector('.modal');
  const addButton = document.querySelector('.nav__add-book');
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

function createBookCard(book) {
  const listItem = document.createElement('li');
  listItem.classList.add('book-list__card');

  const image = document.createElement('img');
  image.classList.add('card__image');
  image.src = book.image;
  image.onerror = function() {
    this.src = './images/NOT_AVAILABLE.png';
  };
  listItem.appendChild(image);

  const title = document.createElement('h4');
  title.classList.add('card__title');
  title.textContent = book.title;
  listItem.appendChild(title);

  const description = document.createElement('div');
  description.classList.add('card__description');
  description.textContent = `by author ${book.author}, pages ${book.pages}, ${book.read ? 'Read' : 'Not read'}`;
  listItem.appendChild(description);

  return listItem;
}

function displayBooks(library) {
  const bookList = document.querySelector('.book-list');
  let index = 0;

  library.forEach(book => {
    index ++;
    const listItem = createBookCard(book);
    listItem.setAttribute('data-index-number', index);
    bookList.appendChild(listItem);
  });
}
displayBooks(myLibrary);

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