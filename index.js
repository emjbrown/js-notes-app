const btnElement = document.getElementById("btn");

function createNoteElement(id, content) {
  // console.log(id, content);
  const element = document.createElement("textarea");
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
  const noteElement = createNoteElement(noteObject.id, noteObject.content)
}

// click event calls the 'add note' fx
btnElement.addEventListener("click", addNote)
