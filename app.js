
let reset = document.getElementById("reset")// Reset Button
// Intializing neccesity variable
let nfString
let message
// reset function 
reset.addEventListener("click", function () {
    let userAnswer = confirm("Are you sure you want to clear Notes")
    if (userAnswer == true) {

        localStorage.clear()
        showNotes()
    }
})
// If user add a note to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = "";
    showNotes()
})

// functiion to show notes

function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
           <div class="my-2 mx-2 card noteCard">
           <div class="card-body">
               <h5 class="card-title">Note ${index + 1}</h5>
               <p class="card-text">${element}</p>
               <button id="${index}"onclick="deleteNotes(this.id)" class="btn btn-danger">Delete Note</button>
           </div>
       </div>
           `

    });

    let notesElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! "Use add a note button" to a note`
    }
}
showNotes()

// function to delete notes
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }


    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()

}

// Searching  Text

// Search Text

let search = document.getElementById('search')
// Searching Button

let searchBtn = document.getElementById("searchBtn")
// Searching With Btn

searchBtn.addEventListener("click", searchTxt)
// Searching With Text

search.addEventListener("input", searchTxt)
// SearchTxt Function To Search

function searchTxt() {

    let inputValue = search.value.toLowerCase()
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerHTML
        cardTxt = cardTxt.toLowerCase()
        if (inputValue != null) {
            if (cardTxt.includes(inputValue)) {
                element.style.display = "block";
                nfString = `Search Result Found For ${search.value}`
                message = document.getElementById("message")
                message.innerHTML = nfString

            } else {
                element.style.display = "none";
                message = document.getElementById("message")
                nfString = `No Search Result Found  For ${search.value}`
                message.innerHTML = nfString

            }

        }

    })



}
