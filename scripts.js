// Global Variables
const myLibrary = []; // Array to store book objects
const container = document.querySelector(".container"); // Main container for the application
const header = document.querySelector(".header"); // Header element
const contentContainer = document.querySelector(".content"); // Container for displaying books
const modBtn = document.querySelector(".modal-btn"); // Modal Trigger Button (not yet implemented)
const delBtn = document.querySelector(".del-btn"); // Delete button (not yet implemented)
const modal = document.querySelector(".modal"); // Modal element
const addBtn = document.querySelector(".add-btn"); // Add book modal button (not yet implemented)
const closeBtn = document.querySelector(".close-btn"); // Close modal button (not yet implemented)
const statusMap = {
    true: { text: 'Read', color: '#4CAF50' },        // Status for books marked as read
    false: { text: 'Not read', color: '#F44336' },   // Status for books marked as not read
    'in-progress': { text: 'In Progress', color: '#FF9800' } // Status for books currently being read
};

// Book Constructor
function Book(title, author, pages, readStatus) {
    this.title = title;         // Title of the book
    this.author = author;       // Author of the book
    this.pages = pages;         // Number of pages in the book
    this.readStatus = readStatus; // Read status of the book
    this.getInfo = function() {
        // Returns a string with book information
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus} read yet`;
    };
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus); // Create a new book instance
    myLibrary.push(book); // Add the book to the library array
}

// Function to display all books in the library
function displayBooks() {
    // Clear existing content in the contentContainer
    contentContainer.innerHTML = '';

    // Iterate through each book in the library
    for (const book of myLibrary) {
        // Create card element for each book
        let card = document.createElement("div");
        card.classList.add("cards");

        // Create title element and add it to the card
        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = `Title: ${book.title}`;
        card.appendChild(title);

        // Create pages element and add it to the card
        let pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        // Create author element and add it to the card
        let author = document.createElement("div");
        author.classList.add("author");
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        // Create a container for the card buttons
        let cardBtns = document.createElement("div");
        cardBtns.classList.add("card-btns");

        // Create status button and determine its text and color based on readStatus
        let status = document.createElement("button");
        status.classList.add("status");

        const statusKey =   book.readStatus === 'Read' ? 'true' : 
                            book.readStatus === 'Not Read' ? 'false' : 
                            'in-progress'; // Determine status key for mapping
                            
        const { text, color } = statusMap[statusKey]; // Get text and color from statusMap
        status.textContent = text; // Set button text
        status.style.backgroundColor = color; // Set button color

        // Create remove button
        let remBtn = document.createElement("button");
        remBtn.classList.add("rem-btn");
        remBtn.textContent = `Remove`; // Set remove button text
        
        // Append status and remove buttons to card button container
        cardBtns.appendChild(status);
        cardBtns.appendChild(remBtn);

        // Append button container to the card
        card.appendChild(cardBtns);

        // Finally, append the card to the content container
        contentContainer.appendChild(card);
    }
}

// Show modal
let showFlag = 0;
modBtn.addEventListener("click", () => {
    modal.showModal();
});

// Add example books to the library and display them
addBookToLibrary("Harry Potter", "J.K. Rowling", 123, "Not Read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Read");
addBookToLibrary("1984", "George Orwell", 328, "In Progress");
displayBooks(); // Call function to render the books on the page

modal.showModal();