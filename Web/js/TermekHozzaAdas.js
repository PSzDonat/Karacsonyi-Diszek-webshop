const url = "http://localhost:8888/";
async function fetchData(link = url + "Datas") {
  let temp = Array();
  let A = await fetch(link)
    .then((x) => x.json())
    .then((x) => (temp = x));
  return temp;
}
//#region Description
function DeleteUpdateForm(div_group) {
  let selectAll = document.querySelector(div_group);
  let divs = selectAll.querySelectorAll(".input-group");
  if (divs.length >= 2) {
    divs[divs.length - 2].querySelector(".btn").remove();
  }
}
function AddUpdateForm(div_group,template) {
  let selectAll = document.querySelector(div_group);
  let divs = selectAll.querySelectorAll(".input-group");
  let templa = document.querySelector(template);
  let lastDiv = divs[divs.length - 1];
  const firstClone = templa.content.cloneNode(true);
  let button = firstClone.querySelector(".btn");
  if (divs.length != 0) {
    lastDiv.append(button);
  }
}
function AddForm(div_group,template) {
  let descG = document.querySelector(div_group);
  let templa = document.querySelector(template);
  const firstClone = templa.content.cloneNode(true);
  descG.appendChild(firstClone);
  DeleteUpdateForm(div_group);
}
function DeleteForm(div_group,template) {
  let descG = document.querySelector(div_group);
  let divs = descG.querySelectorAll(".input-group");
  divs[divs.length - 1].remove();
  AddUpdateForm(div_group,template);
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
