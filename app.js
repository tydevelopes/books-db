// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
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

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Error Alert
UI.prototype.showAlert = function (message, className) {
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

// Delete Book
UI.prototype.deleteBook = target => {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
} 

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
  ui.showAlert('Book Removed', 'success');
});