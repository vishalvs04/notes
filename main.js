//if user adds a note, add it to the local storage
shownotes();

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notes_obj = [];
  } else {
    notes_obj = JSON.parse(notes);
  }
  let addtitle = document.getElementById("addtitle");
  if (addtitle.value != "" && addTxt.value != "") {
    notes_obj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notes_obj));
    addTxt.value = "";
    let titles = localStorage.getItem("titles");
    if (titles == null) {
      titles_obj = [];
    } else {
      titles_obj = JSON.parse(titles);
    }
    titles_obj.push(addtitle.value);
    localStorage.setItem("titles", JSON.stringify(titles_obj));
    addtitle.value = "";

    shownotes();
  } else {
    if (addtitle.value == "") {
      alert("Enter a title");
    } else if (addTxt.value == "") {
      alert("Enter a note");
    }
  }
});
//function to read notes
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notes_obj = [];
  } else {
    notes_obj = JSON.parse(notes);
  }
  let titles = localStorage.getItem("titles");
  if (titles == null) {
    titles_obj = [];
  } else {
    titles_obj = JSON.parse(titles);
  }

  let html = "";
  notes_obj.forEach(function (element, index) {
    html += `
            <div class="notecard my-2 mx-2 card" style="width: 18rem" id="context_${index}">
            <div class="card-body" style="border:solid; border-width:50px">
                <h5 class="card-title">${titles_obj[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="delete_note(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div>
        `;
  });
  let notes_elem = document.getElementById("notes");
  if (notes_obj.length != 0) {
    notes_elem.innerHTML = html;
  } else {
    notes_elem.innerHTML = `Nothing to show! Get Started by adding a note.`;
  }
}
//function to delete a note

function delete_note(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notes_obj = [];
  } else {
    notes_obj = JSON.parse(notes);
  }
  notes_obj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes_obj));
  shownotes();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  let input_val = search.value.toLowerCase();
  let notecards = document.getElementsByClassName("notecard");
  Array.from(notecards).forEach(function (element) {
    let card_txt = element.getElementsByTagName("p")[0].innerText;
    // console.log(card_txt);
    if (card_txt.includes(input_val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
