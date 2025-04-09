let books = [
    {id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", available: true},
    {id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true},
    {id: 3, title: "1984", author: "George Orwell", available: true},
    {id: 4, title: "Pride and Prejudice", author: "Jane Austen", available: false},
    {id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", available: true},
    {id: 6, title: "Lord of the Rings", author: "J.R.R. Tolkien", available: true},
    {id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", available: false},
    {id: 8, title: "Brave New World", author: "Aldous Huxley", available: true},
    {id: 9, title: "The Odyssey", author: "Homer", available: true},
    {id: 10, title: "Fahrenheit 451", author: "Ray Bradbury", available: false},
    {id: 11, title: "Jane Eyre", author: "Charlotte Brontë", available: true},
    {id: 12, title: "Wuthering Heights", author: "Emily Brontë", available: true},
    {id: 13, title: "The Alchemist", author: "Paulo Coelho", available: true},
    {id: 14, title: "Animal Farm", author: "George Orwell", available: false},
    {id: 15, title: "The Outsiders", author: "S.E. Hinton", available: true},
    {id: 16, title: "Catch-22", author: "Joseph Heller", available: true},
    {id: 17, title: "Moby-Dick", author: "Herman Melville", available: false},
    {id: 18, title: "Dune", author: "Frank Herbert", available: true},
    {id: 19, title: "The Giver", author: "Lois Lowry", available: true},
    {id: 20, title: "Ender's Game", author: "Orson Scott Card", available: true},
    {id: 21, title: "Frankenstein", author: "Mary Shelley", available: false},
    {id: 22, title: "Dracula", author: "Bram Stoker", available: true},
    {id: 23, title: "The Shining", author: "Stephen King", available: true},
    {id: 24, title: "A Tale of Two Cities", author: "Charles Dickens", available: true},
    {id: 25, title: "The Road", author: "Cormac McCarthy", available: false}
];

function displayBooks() {
    const bookList = document.getElementById("book-list").getElementsByTagName('tbody')[0];
    bookList.innerHTML = ''; 

    books.forEach(book => {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.available ? 'Available' : 'Checked Out'}</td>
            <td><button ${book.available ? '' : 'disabled'} onclick="checkOutBook(${book.id})">Check Out</button></td>
        `;
    });
}

function checkOutBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
        book.available = false;
        alert(`You have checked out "${book.title}"`);
        displayBooks();
    } else {
        alert("This book is already checked out.");
    }
}

function processCheckout() {
    const bookId = document.getElementById("book-id").value;
    const userName = document.getElementById("user-name").value;

    if (bookId && userName) {
        checkOutBook(Number(bookId));
    } else {
        alert("Please fill out both fields.");
    }
}

function processReturn() {
    const returnBookId = document.getElementById("return-book-id").value;
    const returnUserName = document.getElementById("return-user-name").value;

    if (returnBookId && returnUserName) {
        const book = books.find(b => b.id === Number(returnBookId));
        if (book && !book.available) {
            book.available = true;
            alert(`Thank you, ${returnUserName}. You have successfully returned "${book.title}"`);
            displayBooks();
        } else {
            alert("This book wasn't checked out or doesn't exist.");
        }
    } else {
        alert("Please fill out both fields.");
    }
}

function searchBook() {
    const query = document.getElementById("search-query").value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    const bookList = document.getElementById("book-list").getElementsByTagName('tbody')[0];
    bookList.innerHTML = '';  

    filteredBooks.forEach(book => {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.available ? 'Available' : 'Checked Out'}</td>
            <td><button ${book.available ? '' : 'disabled'} onclick="checkOutBook(${book.id})">Check Out</button></td>
        `;
    });
}

displayBooks();
