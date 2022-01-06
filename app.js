let reset = document.getElementById("reset"); // Reset Button
// Intializing neccesity variable
let nfString;
let message;
// reset function
reset.addEventListener("click", function () {
  let userAnswer = confirm("Are you sure you want to clear Notes");
  if (userAnswer == true) {
    localStorage.clear();
    showNotes();
  }
});
// If user add a note to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
      title:addTitle.value,
      text:addTxt.value
    }
  notesObj.push(myObj)
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
  showNotes();
});

// functiion to show notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
<div class="my-2 mx-2 card noteCard">
    <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <h4 id="imp-${index + 1}"></h4>
        <button onlick="important('imp-${index + 1}');console.log('imp-${
      index + 1
    }')" class="btn btn-outline-danger"> Mark as important</button>
        <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-outline-danger">Delete Note</button>
    </div>
</div>
`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! "Use add a note button" to a note`;
  }
}
showNotes();

// function to delete notes
function deleteNotes(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


// Search Text
let search = document.getElementById("search");
// Searching Button

let searchBtn = document.getElementById("searchBtn");
// Searching With Btn

searchBtn.addEventListener("click", searchTxt);
// Searching With Text

search.addEventListener("input", searchTxt);
// SearchTxt Function To Search

function searchTxt() {
  let inputValue = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
    cardTxt = cardTxt.toLowerCase();
    if (inputValue != null) {
      if (cardTxt.includes(inputValue)) {
        element.style.display = "block";
        nfString = `Search Result Found For ${search.value}`;
        message = document.getElementById("message");
        message.innerHTML = nfString;
      } else {
        element.style.display = "none";
        message = document.getElementById("message");
        nfString = `No Search Result Found For ${search.value}`;
        message.innerHTML = nfString;
      }
    }
  });
}
function important(elmname) {
  document.getElementById(elmname).innerHTML = "Important";
  return "Mark As Important";
}
