
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.getInfo = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} read yet`;
}

function addBookToLibrary() {
    // do stuff here
}