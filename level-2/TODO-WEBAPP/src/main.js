import { v4 as uuidv4 } from "../node_modules/uuid/dist/esm-browser/index.js";

const addBtn = document.querySelector("#add-btn");
const textinput = document.querySelector("#input-add");

addBtn.addEventListener("click", () => {
  if (textinput.value === "") return;
  let data = textinput.value;
  const pendingCont = document.querySelector(".pending-todo-container");
  createListItem(pendingCont, data);
});

function createListItem(cont, data) {
  let listItem = document.createElement("li");

  let div = document.createElement("div");
  let checkInput = document.createElement("input");
  let name = document.createElement("h3");
  let deleteBtn = document.createElement("div");

  listItem.classList = "todo";
  listItem.setAttribute("id", `m${uuidv4()}`);
  div.className = "left-side";
  checkInput.type = "checkbox";
  deleteBtn.className = "delete-todo-btn";
  deleteBtn.innerText = "Delete";
  name.className = "todo-name";
  name.innerText = data;

  deleteBtn.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  div.append(checkInput, name);
  listItem.append(div, deleteBtn);
  cont.append(listItem);
}
