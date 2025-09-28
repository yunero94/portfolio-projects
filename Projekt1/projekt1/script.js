// Glavni elementi iz DOM-a
const addButton = document.querySelector(".addButton");
const todoInput = document.querySelector(".todoInput");
const todoList = document.querySelector(".todoList");

// Pomoćne funkcije
function getInputValue() {
  return todoInput.value.trim();
}

// Dodavanje zadatka
function handleAddTodo() {
  const text = getInputValue();
  if (!text) return;

  const todoItem = createTodoItem(text);
  todoList.appendChild(todoItem);
  clearInput();
}

// Kreiraj jedan <li> sa zadatkom
function createTodoItem(text) {
  const li = document.createElement("li");
  const checkbox = createCheckbox(li);
  const span = createText(text);
  const removeButton = createRemoveButton(li);

  appendTodoElements(li, checkbox, span, removeButton);

  return li;
}

// Funkcija koja dodaje sve elemente u <li>
function appendTodoElements(li, checkbox, span, removeButton) {
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeButton);
}

// Elementi pojedinačno
function createCheckbox(li) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
  });
  return checkbox;
}

function createText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function createRemoveButton(li) {
  const button = document.createElement("button");
  button.textContent = "×";
  button.classList.add("removeButton");
  button.addEventListener("click", () => {
    li.remove();
  });
  return button;
}

function clearInput() {
  todoInput.value = "";
  todoInput.focus();
}

// Event listeneri
addButton.addEventListener("click", handleAddTodo);
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") handleAddTodo();
});
