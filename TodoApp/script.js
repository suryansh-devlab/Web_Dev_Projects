// Get references to DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const clear = document.getElementById("clear");

// Load saved todos from localStorage (if any), otherwise start with empty array
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save current todos array to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a single todo item (li element)
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  // Checkbox for marking todo as completed
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed; // ensure boolean value

  // Toggle completed state
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    // Update UI (strike-through if completed)
    textSpan.style.textDecoration = todo.completed ? "line-through" : "none";

    saveTodos(); // persist change
  });

  // Text content of todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";

  // Apply strike-through if already completed
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // Double click to edit todo text
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit Todo", todo.text);

    // Update only if user enters valid text
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // Delete button to remove todo
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", () => {
    todos.splice(index, 1); // remove from array
    render(); // update UI
    saveTodos(); // persist change
  });

  // Append all elements to li
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
}

// Add new todo
function addTodo() {
  const text = input.value.trim();

  // Prevent adding empty todos
  if (!text) return;

  // Add new todo object
  todos.push({ text, completed: false });

  input.value = ""; // clear input field

  render(); // update UI
  saveTodos(); // save to localStorage
}

// Add button click event
addBtn.addEventListener("click", addTodo);

// Allow adding todo using Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Render all todos to the UI
function render() {
  list.innerHTML = ""; // clear existing list

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

// Clear all todos
clear.addEventListener("click", () => {
  todos.length = 0; // empty array
  saveTodos(); // update storage
  render(); // refresh UI
});
