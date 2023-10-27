// DOM ELEMENTS
const btnElement = document.getElementById("btn");
const appElement = document.getElementById("app");

// LOCAL STORAGE

// Save
function saveNote(notes) {
  // Local won't store arrays for safety
  localStorage.setItem("note-app", JSON.stringify(notes));
}

// Read
function getNotes() {
  // If nothing found, return empty array
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// Load existing notes from local storage
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  appElement.insertBefore(noteElement, btnElement);
});

// CRUD ACTIONS

// Create HTML element
function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;

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

// Delete
function deleteNote(id, element) {
  // Keep all notes except the note with this id
  const notes = getNotes().filter((note)=>note.id != id);

  // Update local storage
  saveNote(notes);

  // Save to DOM
  appElement.removeChild(element);
};

// Update
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

// Add note with unique id to application
function addNote(){
  const notes = getNotes();
  const noteObject = {
    // Math method creates id (rand no. between 0 and 1) and round to nearest int (.floor)
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  // Insert element inside the DOM
  appElement.insertBefore(noteElement, btnElement);

  // Push into notes array
  notes.push(noteObject);

  saveNote(notes);
}

// EVENT LISTENER
btnElement.addEventListener("click", addNote)
