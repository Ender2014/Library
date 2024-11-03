// Global Variables
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const contentContainer = document.querySelector(".content");
const addBtn = document.querySelector(".add-btn");
const delBtn = document.querySelector(".del-btn");
const remBtn = document.querySelector(".rem-btn");
const status= document.querySelector(".status");

const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} read yet`;}
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


function displayBook(){
    for(const book of myLibrary){
        let card = document.createElement("div");
        card.classList.add("cards");

        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = `Title: ${book.title}`;
        card.appendChild(title);

        let pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        let author = document.createElement("div");
        author.classList.add("author");
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        contentContainer.appendChild(card);
    }
}
