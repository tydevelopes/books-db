class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    // Add to list
    list.appendChild(row);
  }
  showAlert(message, className) {
    // Create a div element
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(() => {
      document.querySelector('.alert').remove(); 
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) { // if no books stored, initialize a book array
      books = [];
    } else { // if there's books, get them
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();

  // Get input fields values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Create/Instantiate a Book object
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title.trim() === '' || author.trim() === '' || isbn.trim() === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Add to local storage
    Store.addBook(book);
    // Show success
    ui.showAlert('Book Added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', e => {
  e.preventDefault();
  
  const ui = new UI();
  ui.deleteBook(e.target);

  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book Removed', 'success');
});