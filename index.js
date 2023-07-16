const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Get the authenticated user's username or user ID
const user = JSON.parse(localStorage.getItem("user"));
const username = user.username;

// Retrieve user-specific todos from localStorage
const todos = JSON.parse(localStorage.getItem(`todos_${username}`)) || [];

// Display user-specific todos
todos.forEach((todo) => {
  addTodoElement(todo);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let todoText = input.value.trim();

  if (todoText) {
    const todo = {
      text: todoText,
      completed: false,
    };

    todos.push(todo);

    addTodoElement(todo);

    input.value = "";
    updateLocalStorage();
  }
}

function addTodoElement(todo) {
  const todoEl = document.createElement("li");
  if (todo.completed) {
    todoEl.classList.add("completed");
  }

  todoEl.innerText = todo.text;

  todoEl.addEventListener("click", () => {
    todo.completed = !todo.completed;
    todoEl.classList.toggle("completed");
    updateLocalStorage();
  });

  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todoEl.remove();
    todos.splice(todos.indexOf(todo), 1);
    updateLocalStorage();
  });

  todosUL.appendChild(todoEl);
}

function updateLocalStorage() {
  localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
}