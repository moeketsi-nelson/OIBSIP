import { v4 as uuidv4 } from "../node_modules/uuid/dist/esm-browser/index.js";

const addBtn = document.querySelector("#add-btn");
const textinput = document.querySelector("#input-add");
const pendingCont = document.querySelector(".pending-todo-container");
const completedCont = document.querySelector(".completed-todo-container");

addBtn.addEventListener("click", () => {
  if (textinput.value === "") return;
  let data = textinput.value;
  let id = uuidv4();
  let obj = {};
  if (!(localStorage.getItem("pending") === "empty")) {
    obj = JSON.parse(localStorage.getItem("pending"));
  }

  obj[id] = data;
  localStorage.setItem("pending", JSON.stringify(obj));

  loadData();
});

function loadData() {
  if (!(localStorage.getItem("pending") === "empty")) {
    let pendingTodoObj;

    if (localStorage.getItem("pending") === "empty") {
      pendingTodoObj = "empty";
    } else {
      pendingTodoObj = JSON.parse(localStorage.getItem("pending"));
    }

    while (pendingCont.hasChildNodes()) {
      pendingCont.removeChild(pendingCont.lastChild);
    }

    for (const todo in pendingTodoObj) {
      createListItem(pendingCont, pendingTodoObj[todo], todo, "pending");
    }
  }

  if (!(localStorage.getItem("complete") === "empty")) {
    let completedTodoObj;

    if (localStorage.getItem("complete") === "empty") {
      completedTodoObj = "empty";
    } else {
      completedTodoObj = JSON.parse(localStorage.getItem("complete"));
    }

    while (completedCont.hasChildNodes()) {
      completedCont.removeChild(completedCont.lastChild);
    }

    for (const todo in completedTodoObj) {
      createListItem(completedCont, completedTodoObj[todo], todo, "complete");
    }
  }
}

loadData();

function createListItem(cont, data, id, state) {
  let listItem = document.createElement("li");
  let div = document.createElement("div");
  let checkInput = document.createElement("input");
  let name = document.createElement("h3");
  let deleteBtn = document.createElement("div");

  listItem.classList = "todo";
  listItem.setAttribute("id", `m${id}`);
  div.className = "left-side";
  checkInput.type = "checkbox";
  deleteBtn.className = "delete-todo-btn";
  deleteBtn.innerText = "Delete";
  name.className = "todo-name";
  name.innerText = data;

  deleteBtn.addEventListener("click", async (e) => {
    let id = e.target.parentElement.id.slice(
      1,
      e.target.parentElement.id.length
    );

    let pendingTodoObj = JSON.parse(localStorage.getItem("pending"));
    if (pendingTodoObj.hasOwnProperty(id)) {
      delete pendingTodoObj[id];
    }

    let completedTodoObj = JSON.parse(localStorage.getItem("complete"));
    if (completedTodoObj.hasOwnProperty(id)) {
      delete completedTodoObj[id];
    }

    localStorage.setItem("pending", JSON.stringify(pendingTodoObj));
    localStorage.setItem("complete", JSON.stringify(completedTodoObj));

    loadData();
  });

  checkInput.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      let id = e.target.parentElement.parentElement.id.slice(
        1,
        e.target.parentElement.parentElement.id.length
      );
      let todoName = e.target.nextSibling.innerText;

      let pendingTodoObj = {};
      let completedTodoObj = {};

      if (localStorage.getItem("pending") === "empty") {
        pendingTodoObj = {};
      } else {
        pendingTodoObj = JSON.parse(localStorage.getItem("pending"));
      }

      if (localStorage.getItem("complete") === "empty") {
        completedTodoObj = {};
      } else {
        completedTodoObj = JSON.parse(localStorage.getItem("complete"));
      }

      completedTodoObj[id] = todoName;
      delete pendingTodoObj[id];

      localStorage.setItem("pending", JSON.stringify(pendingTodoObj));
      localStorage.setItem("complete", JSON.stringify(completedTodoObj));

      loadData();
    }
  });

  if (state === "pending") {
    checkInput.id = "check";
    div.append(checkInput, name);
  } else {
    div.append(name);
  }

  listItem.append(div, deleteBtn);
  cont.append(listItem);
}
