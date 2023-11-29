//Immediately invoked function (IIFE) run the function showBook as soon as page is loaded 
(function () {
    console.log("immediately invoked")
    if(!localStorage.getItem('books')){
        localStorage.setItem('books', JSON.stringify([]))
    }
    showBook();
  })();
//Book constructor for creating objects of a book
function Book(name, author, nPages, isRead){
    this.name = name
    this.author = author
    this.nPages = nPages
    this.isRead = isRead
}

let books = []; //array to store all books
const addBtn = document.querySelector('#addBook');
addBtn.addEventListener('click', () =>{
    const name = document.querySelector('#name').value
    const author = document.querySelector('#author').value
    const nPages = document.querySelector('#nPages').value
   const select = document.querySelector('#inputGroupSelect01')
    let readStatus = select.options[select.selectedIndex].text //returns the text i.e. Yes, No, Choose...
    const success = document.querySelector('#success')
    const error = document.querySelector('#error')

    //All fields are filled or not validation of form
    if(name === "" || author === "" || nPages === undefined || readStatus === "Choose..."){
      error.style.display = 'block'
      setTimeout(()=>{
        error.style.display = 'none'
      }, 2000) //remove the alert after 3seconds
    }else{ //if everything is filled then create an obj and push it to books array
      success.style.display = 'block'
      setTimeout(()=>{
        success.style.display = 'none'
      }, 2000)
        let obj = new Book(name, author, nPages, readStatus)
        books = JSON.parse(localStorage.getItem('books')) //get the array stored in local storage 
        books.push(obj) //push the object created
        localStorage.setItem('books', JSON.stringify(books)) //and then update the books in localstorage
        showBook() //run the showBook function
    }
    
    document.querySelector('#name').value = ""
    document.querySelector('#author').value = ""
    document.querySelector('#nPages').value = null
    select.options.selectedIndex = 0
})

//function to removeBook-->  takes the index and then splices the books array to remove the object at that index and then again update the localstorage
function removeBook(index){
  books = JSON.parse(localStorage.getItem('books'))
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books))
  showBook() //run the showBook function again to show the removing of the book
}

//function to change status of a book
function changeStatus(index){ //takes the index of the book whose status is to be changes
  books = JSON.parse(localStorage.getItem('books'))
  //toggles the isRead property of the object at that index of books array
  if(books[index].isRead === "Yes"){
    books[index].isRead = "No";
  }else{
    books[index].isRead = "Yes";
  }
  //updates the localStorge
  localStorage.setItem('books', JSON.stringify(books))
  showBook()//runs the showBook function again
}
function showBook(){
    let books = JSON.parse(localStorage.getItem('books')) //takes the books array from local storage
    const display = document.querySelector('#display') //selecting the div to display books
    if(books.length > 0){ //if the array has any book then
        display.innerHTML = ` `; //to prevent repetition
        books.forEach((book, i) => {
            display.innerHTML+= `<div class="card my-10">
            <div class="card-header">
              Book
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <h4> Title: </h4>
                <p>${book.name}</p>
                <h4> No. of pages: </h4>
                <p>${book.nPages}</p>
                <h4> Read Status:  </h4>
                <p class = "readStatus" style = " background-color: ${book.isRead==="Yes" ? "green" : "red"}">${book.isRead === "Yes" ? "Read" : book.isRead ==="No" ? "Not read": "Not Specified"}</p>
                <footer class="blockquote-footer">By:-  <cite title="Source Title">${book.author}</cite></footer>
              </blockquote>
              <button class="btn btn-danger my-3" onclick ="removeBook(${i})" >Remove</button>
              <button class="btn btn-primary my-3" onclick ="changeStatus(${i})" >Change Status</button>

            </div>
          </div>`
          
        });
      }else{
        //if no books then display this
        display.innerHTML = ` Nothing to show here... (Add some books to display)`
      }
   
}