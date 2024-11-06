// Global Variables
const myLibrary = []; // Array to store book objects
const container = document.querySelector(".container"); // Main container for the application
const header = document.querySelector(".header"); // Header element
const contentContainer = document.querySelector(".content"); // Container for displaying books
const modBtn = document.querySelector(".modal-btn"); // Modal Show Button
const delBtn = document.querySelector(".del-btn"); // Delete button (not yet implemented)
const modal = document.querySelector(".modal"); // Modal element
const form = document.querySelector("form");  // Form element
const addBtn = document.querySelector(".add-btn"); // Add book modal button (not yet implemented)
const closeBtn = document.querySelector(".close-btn"); // Close modal button 
const statusMap = {
    'select': { text: 'Select Option'},
    true: { text: 'Read', color: '#4CAF50' },        // Status for books marked as read
    false: { text: 'Not Read', color: '#F44336' },   // Status for books marked as not read
    'in-progress': { text: 'In Progress', color: '#FF9800' } // Status for books currently being read
};
let idCounter = 0; // Global id counter for books;

// Book Constructor
class Book{
    constructor(title, author, pages, readStatus) {
        this.title = title;         // Title of the book
        this.author = author;       // Author of the book
        this.pages = pages;         // Number of pages in the book
        this.readStatus = readStatus; // Read status of the book
        this.id = idCounter++;
    }
  
    getInfo() {
        // Returns a string with book information
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus} read yet`;
    };
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus); // Create a new book instance
    myLibrary.push(book); // Add the book to the library array
    console.log(book.id);
}

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

        // Determine status key for mapping
        const statusKey = book.readStatus === 'Read' ? 'true' : 
                          book.readStatus === 'Not Read' ? 'false' : 
                          'in-progress';

        // Create a selector
        let statusChange = document.createElement("form");
        statusChange.classList.add("status-change");
      
        let statusLabel = document.createElement("label");
        statusLabel.setAttribute("for", "status-label");
        statusLabel.textContent = "Status: "
        statusChange.appendChild(statusLabel);
        
        let statusSelect = document.createElement("select");
        statusSelect.classList.add("status-select");

        // Create options based on name of status
        Object.keys(statusMap).forEach((statuskey) => {
            const statusText = getStatusText(statuskey);
            const option = document.createElement('option');
            option.setAttribute("value", statuskey); // Set value to status key
            option.textContent = statusText;
            statusSelect.appendChild(option);
        });

        statusChange.appendChild(statusSelect);
        card.appendChild(statusChange);

        // Create a container for the card buttons
        let cardBtns = document.createElement("div");
        cardBtns.classList.add("card-btns");

        let statusButton = document.createElement("button");
        statusButton.classList.add("status");
        
        const { text, color } = statusMap[statusKey]; // Get text and color from statusMap
        statusButton.textContent = text; // Set button text
        statusButton.style.backgroundColor = color; // Set button color

        // Update button when selection changes
        statusSelect.addEventListener('change', function() {
            const selectedValue = statusSelect.value; // Get the selected option's value
            const selectedStatus = statusMap[selectedValue]; // Get the status details from the map
            
            // Update button text and color based on selection
            if (selectedStatus) {
                statusButton.textContent = selectedStatus.text;
                statusButton.style.backgroundColor = selectedStatus.color;
            }
        });

        // Create remove button
        let remBtn = document.createElement("button");
        remBtn.classList.add("rem-btn");
        remBtn.textContent = `Remove`; // Set remove button text
        remBtn.addEventListener("click", () => { // Add event to remove item based on ID.
            deleteBook(book.id);
        });
        
        // Append status and remove buttons to card button container
        cardBtns.appendChild(statusButton);
        cardBtns.appendChild(remBtn);

        // Append button container to the card
        card.appendChild(cardBtns);

        // Finally, append the card to the content container
        contentContainer.appendChild(card);
    }
}

// Function to get the text value from the statusMap
function getStatusText(status) {
    if (statusMap.hasOwnProperty(status)) {
        return statusMap[status].text;
    } else {
        return 'Status not found';
    }
}

// Funciton to delete a book entry;
function deleteBook(bookId){
    // Find the book
    let bookIndex = myLibrary.findIndex((book) => book.id === bookId);
    // Remove it from array
    myLibrary.splice(bookIndex, 1);
    // Show books again
    displayBooks();
    // If empty, show message
    displayEmptyMessage();
}

function displayEmptyMessage(){
    if (myLibrary.length === 0){
        const defaultContainer = document.createElement("div");
        defaultContainer.classList.add("default-msg");

        const defaultHeader = document.createElement("h2");
        defaultHeader.textContent = "No Books Yet";

        const defaultMessage = document.createElement("p");
        defaultMessage.textContent = "Your library is currently empty. Start adding books to create your collection!"

        defaultContainer.appendChild(defaultHeader);
        defaultContainer.appendChild(defaultMessage);

        contentContainer.appendChild(defaultContainer);
    }
}

// Function to reset form inputs;
function resetForm(){
    form.reset();
    modal.close();
}

// Prevent default behaviour of forms
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
});

// Show modal
let showFlag = 0;
modBtn.addEventListener("click", () => {
    modal.showModal();
});

// Display and add books
addBtn.addEventListener("click", () => {
    const title = form.elements['title'].value; 
    const author = form.elements['author'].value;
    const pages = form.elements['pages'].value;
    const readStatus = form.elements['status'].value;
    addBookToLibrary(title, author, pages, readStatus);
    displayBooks();
    resetForm();
});

// Close modal
closeBtn.addEventListener("click", () => {
    resetForm();
});

// Delete all buttons
delBtn.addEventListener("click", () => {
    while (myLibrary.length > 0) {
        myLibrary.pop();
    }
    displayBooks();
    displayEmptyMessage();
});

// Add example books to the library and display them
addBookToLibrary("Harry Potter", "J.K. Rowling", 123, "Not Read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Read");
addBookToLibrary("1984", "George Orwell", 328, "In Progress");
displayBooks(); // Call function to render the books on the page
