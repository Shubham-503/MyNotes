showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("title");

  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (title == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(title);
  }
  notesObj.push(addTxt.value);
  titleObj.push(addTitle.value);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  addTxt.value = "";
  addTitle.value = "";
  // console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (title == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(title);
  }
  console.log(titleObj);
  let noteCard = document.getElementById("notes");
  let html = "";
  notesObj.forEach((element, index) => {
    html += `<div class="card mx-2 my-2 noteCard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${titleObj[index]}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-primary " id="${index}" onclick="deletenote(this.id)">Delete</button>
        </div>
      </div>`;
  });
  // titleObj.forEach(element)

  if (notesObj.length != 0) {
    noteCard.innerHTML = html;
  } else {
    noteCard.innerHTML = `Added notes will be shown here`;
  }
}

function deletenote(index) {
  console.log(`deleting notes${index}`);
  notes = localStorage.getItem("notes");
  title = localStorage.getItem("title");
  notesObj = JSON.parse(notes);
  titleObj = JSON.parse(title);
  notesObj.splice(index, 1);
  titleObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  console.log("Input event fired!!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
