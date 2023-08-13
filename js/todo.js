const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDosArray = [];

function deleteToDos(clickEvent) {
  const li = clickEvent.target.parentElement;
  toDosArray = toDosArray.filter((toDo) => toDo.id !== Number(li.id));
  li.remove(); //HTML에서 <li 요소를 제거. JS 상에서는 데이터 그대로 남음.
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDosArray));
}

function paintToDos(newTodoObject) {
  const li = document.createElement("li");
  li.id = newTodoObject.id;
  const span = document.createElement("span");
  span.innerText = newTodoObject.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDos);

  li.appendChild(span); //li(부모)-span(자식)
  li.appendChild(button); //li(부모)-button(자식)
  toDoList.appendChild(li); //ul(부모)-li(자식)
}

function handleToDoSubmit(submitEvent) {
  submitEvent.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObject = {
    id: Date.now(),
    text: newToDo,
  };
  toDosArray.push(newTodoObject);
  paintToDos(newTodoObject);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDosArray = parsedToDos;
  parsedToDos.forEach(paintToDos);
}
