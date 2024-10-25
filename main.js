let notes = [
  {title: "test", content: "hello!", metadata: {id: 1}},
  {title: "test", content: "hello world!", metadata: {id: 2, color: "green"}},
  {title: "test", content: "hello!", metadata: {id: 3}}
]
let selectedNote = undefined


const list = document.getElementById("list")

const main = document.getElementById("main")
const title = document.getElementsByClassName("title")[0]
const content = document.getElementsByClassName("content")[0]



function addNote(data) {
  let item = document.createElement("div")
  item.id = data.metadata.id
  item.classList = "listItem"
  item.innerText = data.title

  if(data.metadata?.color)
    item.style.backgroundColor = data.metadata.color

  item.addEventListener("click",
    function (event) {
      selectedNote = event.target
      const listNote = notes.find(function (note) {return note.metadata.id == selectedNote.id})
      title.innerText   = listNote.title
      content.innerText = listNote.content
      main.style.backgroundColor = listNote.metadata?.color ?? "white"
    })
  list.appendChild(item)
}



function removeNote() {
  const noteIndex = notes.findIndex(function (note) {return note.metadata.id === selectedNote.id})
  notes.splice(noteIndex, noteIndex)
  selectedNote.remove()
  title.innerText   = ""
  content.innerText = ""
}



for(const note of notes) {
  addNote(note)
}

const dialog       = document.getElementById("dialog")
const dialogButton = document.getElementById("dialogSubmit")

dialogButton.onclick = function () {
  switch(action) {
    case "add":
          let newNote = {}
          newNote.title   = dialog.children[0].value
          newNote.content = dialog.children[1].value
          newNote.metadata = {id: performance.now()}
          
          notes.push(newNote)
          addNote(newNote)
          dialog.close()
          break;
    case "edit":
          selectedNote.innerText = dialog.children[0].value
          title.innerText        = dialog.children[0].value
          content.innerText      = dialog.children[1].value
          const listNote = notes.find(function (note) {return note.metadata.id == selectedNote.id})
          listNote.title         = dialog.children[0].value
          listNote.content       = dialog.children[1].value
          dialog.close()
          break;
    default:
          alert("I do not know what to do!")
          dialog.close()
  }
}



const [buttonAdd, buttonRemove, buttonEdit] = document.getElementsByClassName("action")
let action


buttonAdd.onclick = function () {
  action = "add"
  dialog.children[0].value = ""
  dialog.children[1].value = ""
  dialogButton.innerText = "הוספה"
  dialog.showModal()
}

buttonRemove.onclick = function () {
  removeNote()
}

buttonEdit.onclick = function () {
  action = "edit"
  dialog.children[0].value = title.innerText
  dialog.children[1].value = content.innerText
  dialogButton.innerText = "עדכון"
  dialog.showModal()
}