const btnElement = document.getElementById("btn");
const appElement = document.getElementById("app");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  appElement.insertBefore(noteElement, btnElement);
});

function createNoteElement(id, content) {
  // console.log(id, content);
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;

  // Delete note on double click with warning
  element.addEventListener("dblclick", ()=>{
    const warning = confirm("Are you sure you want to delete this note?");
    if(warning){
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", ()=>{
    updateNote(id, element.value);
  });

  // Return the output of the function
  return element;
};

function deleteNote(id, element) {
  // Keep all notes except the note with this id
  const notes = getNotes().filter((note)=>note.id != id);

  // Update local storage
  saveNote(notes);

  // Save to DOM
  appElement.removeChild(element);
};

function updateNote(id, content){
  // Get the array of notes from local storage
  const notes = getNotes();

  // Find the note in the array with the matching ID
  const target = notes.filter((note)=>note.id == id)[0];

  // Update the content of the matched note
  target.content = content;

  // Save the updated notes array back to local storage
  saveNote(notes);
};

function addNote(){
  const notes = getNotes();

  // console.log("clicked");

  const noteObject = {
    // Math method creates id (rand no. between 0 and 1) and round to nearest int (.floor)
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  // createNoteEl passes noteObject and content
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  // Insert element inside the DOM (what to insert, what to insert before)
  appElement.insertBefore(noteElement, btnElement);

  notes.push(noteObject);

  saveNote(notes);
}

function saveNote(notes) {
  // Local storage won't store arrays for safety reasons
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  // If nothing found, return empty array
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// Click event calls the 'add note' fx
btnElement.addEventListener("click", addNote)
