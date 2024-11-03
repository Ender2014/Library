const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} read yet`;}
}


function addBookToLibrary(title, author, pages, read) {
    // do stuff here
}