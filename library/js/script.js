/*
Things done so far :
    Input is taken from form already, and new book is added to the library

TODO:
    Show all books in library on the grid

    When a new book is added, add it before the new book div

    Show option to remove book from library on UI

    //something like this
    removeButton.addEventListener('click', () => {
        library.removeBook(removeButton.id) 
    })

    Add sorting functionality

    Improve design of the SideBar

    Implement save to cloud or save to local or dummy(if neither options are selected)

    Improve design
*/
class Book {
    constructor(id, name, author, pages, read) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor(){
        this.shelf = [];
        this.bookCount = this.shelf.length;
        this.id = 0;
    }

    addBook (name, author, pages, read) {
        // console.log(this.bookCount);
        let book = new Book(this.id, name, author, pages, read);
        //console.log(book.author); 
        this.shelf.push(book);
        this.bookCount = this.shelf.length; //need to update book count after 
        // console.log(this.bookCount);
        this.id += 1;      
    }

    removeBook(id){
        this.shelf.splice(id, 1); //removing book with particular id
        this.bookCount = this.shelf.length; //updating bookCount
        //changing id of every book after id = N, where N is the id of the book that was deleted
        for (let i = id; i<this.bookCount; i++){
            this.shelf[i].id = i;
        }
        //updating id, so that we do not end up skipping an id
        this.id -= 1;
    }

    showBookDetails () {
        for (let book of this.shelf){
            console.log(book.id, book.name);
        }
    }
}
function showForm(addButton){
    addButton.addEventListener('click', () => {
        form.reset();
        popup.classList.add('popupContainerActivated');
        overlay.classList.add("overlay--active");
    })
}

function closePopup() {
    popup.classList.remove("popupContainerActivated");
    overlay.classList.remove("overlay--active");
}
   
function createBook (event){
    event.preventDefault();
    //console.log(event)
    let bookName = authorName = pageNumber = '';
    let bookRead = false;

    for (let i = 0; i< form.length-1; i++){ //form.length-1 because the final element in the form is the submit button which will have an undefined value
        // console.log(form.elements[i], form.elements[i].value);
        if(form.elements[i].id == 'bookName'){
            bookName = form.elements[i].value;
        }
        else if (form.elements[i].id == 'authorName'){
            authorName = form.elements[i].value;
        }
        else if (form.elements[i].id == 'pageNumber'){
            pageNumber = form.elements[i].value;
        }

        if (document.getElementById('isRead').checked == true){
            bookRead = true;
        }
    }

    library.addBook(bookName, authorName, pageNumber, bookRead);
    library.showBookDetails()
    closePopup();
}

function addButtonFunctionality(){
    addButtons.forEach(showForm); //clicking on these buttons will show the form

    //clicking on the overlay or escape button will hide the form
    overlay.addEventListener("click", closePopup);
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closePopup();
    });

    form.addEventListener("submit", createBook); //if user presses the submit button
    /*
    functionality which lets user press the enter button to submit the form. TODO
    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && popup.classList.contains('popupContainerActivated')){
            doSomething()
        } 
    });
    */
}

const library = new Library();

const addButtons = document.querySelectorAll('.addBooksButton');
const popup = document.querySelector('.popupContainer');
const overlay = document.querySelector(".js-overlay");
const form = document.querySelector(".bookInfoForm");
const formSubmitButton = document.querySelector('#submitButton');

addButtonFunctionality();






