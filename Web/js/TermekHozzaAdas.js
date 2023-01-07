const url = "http://localhost:8888/";
async function fetchData(link = url + "Datas") {
  let temp = Array();
  let A = await fetch(link)
    .then((x) => x.json())
    .then((x) => (temp = x));
  return temp;
}
//#region Description
function DeleteUpdateDescription() {
  let selectAll = document.querySelector(".description-group");
  let divs = selectAll.querySelectorAll(".input-group");
  if (divs.length >= 2) {
    divs[divs.length - 2].querySelector(".btn").remove();
  }
}
function AddUpdateDescription() {
  let selectAll = document.querySelector(".description-group");
  let divs = selectAll.querySelectorAll(".input-group");
  let template = document.querySelector(".description-template");
  let lastDiv = divs[divs.length - 1];
  const firstClone = template.content.cloneNode(true);
  let button = firstClone.querySelector(".btn");
  if (divs.length != 0) {
    lastDiv.append(button);
  }
}
function AddDescription() {
  let descG = document.querySelector(".description-group");
  let template = document.querySelector(".description-template");
  const firstClone = template.content.cloneNode(true);
  descG.appendChild(firstClone);
  DeleteUpdateDescription();
}
function DeleteDescription() {
  let descG = document.querySelector(".description-group");
  let divs = descG.querySelectorAll(".input-group");
  divs[divs.length - 1].remove();
  AddUpdateDescription();
}
//#endregion
async function Main() {
  let selectGui = document.querySelector("select");
  let selectData = await fetchData(url + "Categories");
  const optionNone = document.createElement("option");
  optionNone.value = null;
  optionNone.selected;
  optionNone.textContent = "None";
  selectGui.append(optionNone);
  for (const i of selectData) {
    const temp = document.createElement("option");
    temp.value = i.name;
    temp.textContent = i.name;
    selectGui.append(temp);
  }
}
//func end
Main();
