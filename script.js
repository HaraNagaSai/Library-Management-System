let token = null;

function showLogin() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('library-section').style.display = 'none';
}

function showSignup() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
    document.getElementById('library-section').style.display = 'none';
}

function showLibrary() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('library-section').style.display = 'block';
    fetchBooks();
}

async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (!username || !password) return alert('Please fill out all fields');

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        alert('Sign up successful! Please login.');
        showLogin();
    } else {
        alert(data.error);
    }
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (!username || !password) return alert('Please fill out all fields');

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        token = data.token;
        showLibrary();
    } else {
        alert(data.error);
    }
}

function logout() {
    token = null;
    showLogin();
}

async function fetchBooks(query = '') {
    const url = query ? `/api/books/search?q=${encodeURIComponent(query)}` : '/api/books';
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const books = await response.json();
    displayBooks(books);
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list').getElementsByTagName('tbody')[0];
    bookList.innerHTML = '';
    books.forEach(book => {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.available ? 'Available' : 'Checked Out'}</td>
            <td>${book.dueDate ? new Date(book.dueDate).toLocaleDateString() : '-'}</td>
            <td>${book.fine}</td>
            <td><button ${book.available ? '' : 'disabled'} onclick="checkOutBook(${book.id})">Check Out</button></td>
        `;
    });
}

async function checkOutBook(bookId) {
    const response = await fetch('/api/books/checkout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ bookId })
    });
    const data = await response.json();
    if (response.ok) {
        alert(`${data.message}. Due Date: ${new Date(data.dueDate).toLocaleDateString()}`);
        fetchBooks();
    } else {
        alert(data.error);
    }
}

async function processCheckout() {
    const bookId = parseInt(document.getElementById('book-id').value);
    if (!bookId) return alert('Please enter a Book ID');
    checkOutBook(bookId);
}

async function processReturn() {
    const bookId = parseInt(document.getElementById('return-book-id').value);
    if (!bookId) return alert('Please enter a Book ID');
    const response = await fetch('/api/books/return', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ bookId })
    });
    const data = await response.json();
    if (response.ok) {
        alert(`${data.message}. Fine: ₹${data.fine}`);
        fetchBooks();
    } else {
        alert(data.error);
    }
}

async function searchBook() {
    const query = document.getElementById('search-query').value.trim();
    fetchBooks(query);
}

// Initial state
showLogin();