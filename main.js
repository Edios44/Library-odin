class Book {
  constructor(title,author,year){
    this.title = title;
    this.author = author;
    this.year = year;
    this.stat = "not read";
  }

  statusChange () {
     if (this.stat == "not read"){
       this.stat = "read"
     }
     else {
       this.stat = "not read"
     }
  }

}


class Library {
  myLibrary = [];
  addBookToLibrary(title,author,year) {
    let book = new Book(title,author,year);
    this.myLibrary.push(book);
  }

}


const mainLibrary = new Library();

class Display {


  button = document.querySelector("#add")

  sortId(){
     const selectbtns = document.querySelectorAll(".remove-btn")

       
     selectbtns.forEach((removebtn, i)=>{
       removebtn.id = i
  })
  }

  print = () => {
    event.preventDefault()
    const bookcard = document.querySelector("#bookcard")
    const titleField = document.querySelector("#title")
    const authorField = document.querySelector("#author")
    const yearField = document.querySelector("#year")
    let title = titleField.value
    let author = authorField.value
    let year = yearField.value

    mainLibrary.addBookToLibrary(title,author,year)


    const param = ["author","year"]
    while (bookcard.lastElementChild){
      bookcard.removeChild(bookcard.lastElementChild)
    }

    let indx = 0
    for (let book of mainLibrary.myLibrary) {
      const div = document.createElement("div")
      

      const title = document.createElement("h3")
      title.textContent = book.title
      div.appendChild(title)

      const ul = document.createElement("ul")
      for (let i=0 ; i< param.length ;i++){
        const li = document.createElement("li")
        li.textContent = `${param[i]}: ${book[param[i]]}`
        ul.appendChild(li)
      }
      div.appendChild(ul)

      const stat = document.createElement("p")
      stat.textContent = book.stat
      div.appendChild(stat)

      const btn = document.createElement("button")
      btn.textContent = "remove"
      btn.classList.add("remove-btn")
      btn.id = indx
      div.appendChild(btn)

      btn.addEventListener("click", () =>{ 
        mainLibrary.myLibrary.splice(Number(btn.id),1);
        div.remove()
        this.sortId()
        console.log(mainLibrary.myLibrary)
      })


      const btnstat = document.createElement("button")
      btnstat.textContent = "read"
      div.appendChild(btnstat)
      
      btnstat.addEventListener("click", () =>{
        book.statusChange()
        stat.textContent = book.stat
      })

    
      bookcard.appendChild(div)

      indx++
    }
  }

}

const displayController = new Display();

displayController.button.addEventListener("click", displayController.print)
