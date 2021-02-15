/*
Things done so far :
    Input is taken from form already, and new book is added to the library
    Add and Remove from library is done
    When user clicks on the book, show pop up screen with all the info about the book and let user change read status
    Added sorting functionality

TODO:
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
        this.countSortedShelf = [];
        this.nameSortedShelf = [];
        this.bookCount = this.shelf.length;
        this.id = 0;
        this.reverse = false;//used for sorting by date
        this.nameReverse = false;//used for sorting by name
        this.pageReverse = false;//used for sorting by page

    }
  
    addBook (name, author, pages, read) {
        // console.log(this.bookCount);
        let book = new Book(this.id, name, author, pages, read);
        //console.log(book.author); 
        this.shelf.push(book);
        this.bookCount = this.shelf.length; //need to update book count after 
        // console.log(this.bookCount);
        this.id += 1; 
        this.setSortedShelf(book);     
    }
  
    setSortedShelf(book){
        //the or condition is redundant, cuz both the shelfs will be updated at the same time
        if (this.countSortedShelf.length == 0 || this.nameSortedShelf.length == 0){
            this.countSortedShelf.push(book);
            this.nameSortedShelf.push(book);
            //console.log(JSON.parse(JSON.stringify(this.nameSortedShelf)))
            return
        }   
        // console.log(`before book name = ${book.name}`)
        // console.log(JSON.parse(JSON.stringify(this.countSortedShelf)))
        let countIndex = this.getElIndex(this.countSortedShelf, book, 0, this.countSortedShelf.length, 0);
        let nameIndex = this.getElIndex (this.nameSortedShelf, book, 0, this.nameSortedShelf.length, 1);
        
        //console.log(`index for ${book.name} = ${countIndex+1} ${this.countSortedShelf[0].pages} ${book.pages}`);
        //this if and else is neccesary, dont know why
        if (countIndex == 0 && this.countSortedShelf[0].pages > book.pages){
            this.countSortedShelf.splice(countIndex, 0, book);
        }
        else {
            this.countSortedShelf.splice(countIndex+1, 0, book);
        }

        if (nameIndex == 0 && this.nameSortedShelf[0].name > book.name){
            this.nameSortedShelf.splice(nameIndex, 0, book);        
        }
        else {
            this.nameSortedShelf.splice(nameIndex+1, 0, book);
        }      
        
        // console.log(`after book name = ${book.name}`);
        // console.log(JSON.parse(JSON.stringify(this.countSortedShelf)));
        return
        
    }
  
    getElIndex (a, book, start, end, mode){
        //function to give index of where to put the new item in an already sorted list
        //mode == 0 means we are sorting by count
        //mode == 1 means we are sorting name
        let i = Math.floor(start+(end-start)/2);
        let iEl = 0;
        let bEl = 0;
        //console.log(a, i)
        if (mode == 0){
            iEl = a[i].pages;
            bEl = book.pages;
        }
        else if (mode == 1){
            iEl = a[i].name;
            bEl = book.name;
        }
        //console.log(iEl, bEl);
  
        if (end-start <= 1|| iEl == bEl){
            return i;
        }
        else if (iEl > bEl){
            return this.getElIndex(a, book, start, i, mode);
        }
        else if (iEl < bEl){
            return this.getElIndex(a, book, i, end, mode);
        }
    }
  
    removeBook(idNum){
        if (idNum > this.id){
            console.log("Element doesnt exist in Library");
            return "Element doesnt exist in Library";
        }
        this.shelf.splice(idNum, 1); //removing book with particular id
        this.bookCount = this.shelf.length; //updating bookCount
        //changing id of every book after id = N, where N is the id of the book that was deleted
        for (let i = idNum; i<this.bookCount; i++){
            this.shelf[i].id = i;
        }
        //updating id, so that we do not end up skipping an id
        this.id -= 1;
  
        //deleting book from the sortedCount and sortedName shelf
        let countDeleteId = 0;
        let nameDeleteId = 0;
        //getting index of element to be deleted in each shelf
        for (let i = 0; i<this.countSortedShelf.length; i++){
            if (this.countSortedShelf[i].id == idNum){
                countDeleteId = i;
            }
            if (this.nameSortedShelf[i].id == idNum){
                nameDeleteId = i;
            }
        }
  
        this.countSortedShelf.splice(countDeleteId, 1);
        this.nameSortedShelf.splice(nameDeleteId, 1);
    }
  
    showBookDetails (idNum) {
        //func takes in an id number and returns and array of the book details
  
        //todo : find better way to loop over all properties of the book class
        let bookTBDisplay = this.shelf[idNum];
        let bookDetails = {
            name : bookTBDisplay.name,
            author : bookTBDisplay.author,
            page : bookTBDisplay.pages,
            read : bookTBDisplay.read,
        }
        return bookDetails;
    }
  
    getShelf(){
        return this.shelf;
    }
  
    getLastBook (){
        //function that returns that last book in the shelf
        //since id is created in the library class, to get access to the id we need this to get the id of the last added book
        return this.shelf[this.shelf.length - 1];
    }
  
    reverseShelf(mode){
        //mode 0 = sort by date
        //mode 1 = sort by name
        //mode 2 = sort by pages
        if (mode == 0){
            if (this.reverse == false){
                let reversedShelf = []
                for (let i = this.shelf.length-1; i>-1; i--){
                    reversedShelf.push(this.shelf[i]);
                }
                this.reverse = !this.reverse;
                return reversedShelf;
            }
            this.reverse = !this.reverse;
            return this.shelf;
        }

        if (mode == 1){
            if (this.nameReverse == false){
                let reversedShelf = []
                for (let i = this.nameSortedShelf.length-1; i>-1; i--){
                    reversedShelf.push(this.nameSortedShelf[i]);
                }
                this.nameReverse = !this.nameReverse;
                return reversedShelf;
            }
            this.nameReverse = !this.nameReverse;
            return this.nameSortedShelf;
        }

        if (mode == 2){
            if (this.pageReverse == false){
                let reversedShelf = []
                for (let i = this.countSortedShelf.length-1; i>-1; i--){
                    reversedShelf.push(this.countSortedShelf[i]);
                }
                this.pageReverse = !this.pageReverse;
                return reversedShelf;
            }
            this.pageReverse = !this.pageReverse;
            return this.countSortedShelf;
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
    bookInfoContainer.classList.remove("bookInfoContainerActivated");
    bookInfoContainer.removeAttribute('id'); //have to do this, so that when the user clicks on a different book, id of that book can
                                             //be the id the div
}

function showBookInfo(book){
    book.addEventListener('click', () => {
        let bookId = book.parentNode.id.substring(1,);
        let bookInfoObject = library.showBookDetails(bookId);
        document.querySelector('.bookName').textContent = bookInfoObject['name'];
        document.querySelector('.insertAuthorName').textContent = bookInfoObject['author'];
        document.querySelector('.insertPageNumber').textContent = bookInfoObject['page'];
        document.querySelector('.insertReadStatus').textContent = bookInfoObject['read'];

        bookInfoContainer.id = 'r'+bookId; //this changes the id of the container to be the same as that of the book
                                           //whose read status we might change
        bookInfoContainer.classList.add('bookInfoContainerActivated');
        overlay.classList.add("overlay--active");
    })
}

function getBookContainer(id, name){
    let bookContainer = document.createElement('div');
    bookContainer.className = 'bookContainer';
    let bookId = 'b'+id;
    bookContainer.id = bookId;

    let deleteBookContainer = document.createElement('div');
    deleteBookContainer.className = 'deleteBookContainer';

    let infoText = document.createElement('h3');
    infoText.textContent = 'Click Book for Info';
    infoText.className = 'showBookInfo';
    deleteBookContainer.appendChild(infoText);

    let deleteButton = document.createElement('button');
    let delId = 'd'+id;
    deleteButton.className = 'deleteBookButton';
    deleteButton.id = delId;
    deleteButton.type = 'close';
    deleteButton.innerText = 'Del';
    deleteBook(deleteButton) //adding delete button functionality over here itself
    
    deleteBookContainer.appendChild(deleteButton);
    bookContainer.appendChild(deleteBookContainer);

    let book = document.createElement('div');
    book.className = 'book'
    book.innerText = name;
    
    bookContainer.appendChild(book);

    //we need to let the user be able to click on the book and be able to see the book info
    showBookInfo(book);//this func is down here, cuz we use the book.parentNode to get its id, so if the func came before 'book' wouldnt
                       //have a parent node

    return bookContainer;
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
    closePopup();

    library.addBook(bookName, authorName, pageNumber, bookRead);
    // library.showBookDetails()
    let book = library.getLastBook(); //the book that was just added in the library. Will be used to get the id of the book.

    let bookContainer = getBookContainer(book.id, bookName);

    let addBookContainer = document.querySelector('.addNewBookContainer');
    const shelf = document.querySelector('.shelf');
    shelf.insertBefore(bookContainer, addBookContainer);    

}

function deleteBook(button){
    button.addEventListener('click', () => {
        let bookId = button.id;
        bookId = Number(bookId.substring(1,)) //we need the number after the first character
        library.removeBook(bookId);
        // let shelf = library.getShelf(); //contains updated list all the book in the library
        let bookDivID = 'b'+bookId;
        //console.log(bookDivID)
        let elToBeDeleted = document.getElementById(bookDivID);
        bookShelf.removeChild(elToBeDeleted);

        //console.log(`bookId is ${bookId} and lib id is ${library.id}`);
        for (let i = bookId+1; i<library.id ; i++){
            let newIdNum = i-1;
            let bookIdToBeChanged = document.getElementById('b'+i);
            let delIdToBeChanged = document.getElementById('d'+i);
            bookIdToBeChanged.id = 'b'+newIdNum;
            delIdToBeChanged.id = 'd'+newIdNum;

        }
    })
}

function assignSortButtonFunctionality(filterButton){
    filterButton.addEventListener('click', () => {
        let bookContainer = document.querySelectorAll('.bookContainer');
        bookContainer.forEach(e => e.parentNode.removeChild(e));
        let addBookContainer = document.querySelector('.addNewBookContainer');

        if (filterButton.id == 'byDate'){
            let reverseShelf = library.reverseShelf(0);
            for (let i = 0; i<reverseShelf.length; i++){
                bookContainer = getBookContainer(reverseShelf[i].id, reverseShelf[i].name)
                bookShelf.insertBefore(bookContainer, addBookContainer);
            }
        }
        else if (filterButton.id == 'byPage'){
            let countSortedShelf = library.reverseShelf(2);
            for (let i = 0; i<countSortedShelf.length; i++){
                bookContainer = getBookContainer(countSortedShelf[i].id, countSortedShelf[i].name)
                bookShelf.insertBefore(bookContainer, addBookContainer);
            }

        }
        else if (filterButton.id == 'byName'){
            let nameSortedShelf = library.reverseShelf(1);
            for (let i = 0; i<nameSortedShelf.length; i++){
                bookContainer = getBookContainer(nameSortedShelf[i].id, nameSortedShelf[i].name)
                bookShelf.insertBefore(bookContainer, addBookContainer);
            }
        }
    })
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

    deleteButton.forEach(deleteBook) //this is just as to showcase an example, can remove if we remove all the pre inserted books

    //this button is only for when user is viewing the book info and wants to exit from that view
    let closeContainerButton = document.querySelector('.closeContainerButton');
    closeContainerButton.addEventListener("click", closePopup);
    
    let changeReadStatusButton = document.querySelector('.changeReadStatusButton');
    changeReadStatusButton.addEventListener('click', () => {
        let bookReadId = bookInfoContainer.id.substring(1,)
        library.shelf[bookReadId].read = !library.shelf[bookReadId].read;
        document.querySelector('.insertReadStatus').textContent = library.shelf[bookReadId].read;
    })

    let filterButtons = document.querySelectorAll('.filterButton')
    filterButtons.forEach(assignSortButtonFunctionality);
}


const library = new Library();
// library.addBook('Book 2',2,80,true);
// library.addBook('Book 1',8,32,true);
// library.addBook('Book 0',8,33,true);
// library.addBook('Book 3',5,96,true);
// console.log(library.countSortedShelf);
// console.log(library.nameSortedShelf);


const bookShelf = document.querySelector('.shelf')
const addButtons = document.querySelectorAll('.addBooksButton');
const popup = document.querySelector('.popupContainer');
const bookInfoContainer = document.querySelector('.bookInfoContainer')
const overlay = document.querySelector(".js-overlay");
const form = document.querySelector(".bookInfoForm");
const formSubmitButton = document.querySelector('#submitButton');

const deleteButton = document.querySelectorAll('.deleteBookButton');
const bookDivs = document.querySelectorAll('.book');

bookDivs.forEach(showBookInfo);

//console.log(delButton.parentNode.parentNode.id) //could have used this to get id of book, but instead will just assign each del its own id

//bookShelf.removeChild(document.getElementById('b200'))
addButtonFunctionality();








