// Declare
const ul = document.querySelector(".collection");

const clearBtn = document.querySelector("#clear-btn");

const text = document.querySelector("#task");

const card = document.querySelector(".card-action");

const form = document.querySelector("#task-form");

loadEventListener();

function loadEventListener() {
  ul.addEventListener("click", deleteItem);

  clearBtn.addEventListener("click", clearItems);

  form.addEventListener("submit", addItems);

  document.addEventListener("DOMContentLoaded", getItemLocalStorage);
}

// Get item form local storage
function getItemLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks = tasks.filter(function (str) {
    return /\S/.test(str);
  });

  if (tasks.length > 0) {
    show();
    tasks.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(item));
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = `<i class = "fa fa-remove"></i>`;
      li.appendChild(link);
      document.querySelector("ul").appendChild(li);
    });
    text.value = "";
  } else {
    disAppear();
  }
}

function addItems(e) {
  e.preventDefault();
  if (text.value === "") {
    alert("Please type something!");
  } else {
    show();
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(text.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class = "fa fa-remove"></i>`;
    li.appendChild(link);
    document.querySelector("ul").appendChild(li);
  }
  storeLocalStorage(text.value);
  text.value = "";
}

// Delete form local storage
function deleteItemLocalStorage(taskElament) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (tasks.length > 0) {
    tasks.forEach(function (item, index) {
      if (taskElament.textContent === item) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (tasks.length === 0) {
      window.location.reload();
    }
  }
}

function deleteItem(e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  if (e.target.parentElement.classList.contains("delete-item")) {
    let msg = confirm("Are you sure?");
    if (msg === true) {
      e.target.parentElement.parentElement.remove();
      deleteItemLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Clear form local storage
function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}

function clearItems() {
  let msg1 = confirm("Are you sure to clear task?");
  if (msg1 === true) {
    ul.innerHTML = "";
    clearLocalStorage();
    disAppear();
    return true;
  }
}

// Local storage
function storeLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function whiteSpace(task) {
//   return task.replace(/\s/g, "_");
// }

// function
function show() {
  card.style.display = "block";
  document.querySelector("h4").style.display = "none";
}

function disAppear() {
  card.style.display = "none";
  document.querySelector("h4").style.display = "block";
}
