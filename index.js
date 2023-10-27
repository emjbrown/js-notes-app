const btnElement = document.getElementById("btn");

function createNoteElement(id, content) {
  // console.log(id, content);
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;

  // delete note on double click with warning
  element.addEventListener("dblclick", ()=>{
    const warning = confirm("Are you sure you want to delete this note?");
    if(warning){
      deleteNote(id, element);
    }
  })

  element.addEventListener("input", ()=>{
    updateNote(id, element.value);
  })
}

function deleteNote() {

}

function updateNote(){

}

function addNote(){
  // console.log("clicked");
  const noteObject = {
    // math method creates id (rand no. between 0 and 1)
    // .floor method rounds to nearest integer
    id: Math.floor(Math.random() * 100000),
    content: "",
  }
  // console.log(noteObject);
  // createNoteEl passes noteObject and content
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  // insert element inside the DOM

}

// click event calls the 'add note' fx
btnElement.addEventListener("click", addNote)
