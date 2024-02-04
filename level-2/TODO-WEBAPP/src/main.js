import { v4 as uuidv4 } from "../node_modules/uuid/dist/esm-browser/index.js";

const addBtn = document.querySelector("#add-btn");
const textinput = document.querySelector("#input-add");
const pendingCont = document.querySelector(".pending-todo-container");
const completedCont = document.querySelector(".completed-todo-container");

// window.localStorage.setItem("pending", JSON.stringify({}));
// window.localStorage.setItem("complete", JSON.stringify({}));

addBtn.addEventListener("click", () => {
  if (textinput.value === "") return;
  let data = textinput.value;
  let id = uuidv4();
  let obj = JSON.parse(window.localStorage.getItem("pending"));

  if (obj === null) {
    obj = {};
  }

  obj[id] = data;
  window.localStorage.setItem("pending", JSON.stringify(obj));
  location.reload();
});

function loadData() {
  let pendingTodoObj = JSON.parse(window.localStorage.getItem("pending"));
  let completedTodoObj = JSON.parse(window.localStorage.getItem("complete"));

  for (const todo in pendingTodoObj) {
    createListItem(pendingCont, pendingTodoObj[todo], todo, "pending");
  }

  for (const todo in completedTodoObj) {
    createListItem(completedCont, completedTodoObj[todo], todo, "complete");
  }
}

loadData();

attachEvent();

function attachEvent() {
  document.querySelectorAll("#check").forEach((checkInput) => {
    checkInput.addEventListener("change", (e) => {
      if (e.target.checked === true) {
        //add logic to moved the item to the completed list
        let id = e.target.parentElement.parentElement.id.slice(
          1,
          e.target.parentElement.parentElement.id.length - 2
        );
        let todoName = e.target.nextSibling.innerText;

        let pendingTodoObj = JSON.parse(window.localStorage.getItem("pending"));
        let completedTodoObj = JSON.parse(
          window.localStorage.getItem("complete")
        );

        if (completedTodoObj === null) {
          completedTodoObj = {};
        }

        completedTodoObj[id] = todoName;
        delete pendingTodoObj[id];

        window.localStorage.setItem("pending", JSON.stringify(pendingTodoObj));
        window.localStorage.setItem(
          "complete",
          JSON.stringify(completedTodoObj)
        );
        console.log(id);
        location.reload();
        // setTimeout(() => {
        //   createListItem(completedCont, todoName, id, "complete");
        // }, 200);
        // setTimeout(() => {
        //   e.target.parentElement.parentElement.remove();
        // }, 50);
      }
    });
  });
}

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

  deleteBtn.addEventListener("click", () => {
    deleteBtn.parentElement.remove();
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
