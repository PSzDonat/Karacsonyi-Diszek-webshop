const json_server = "http://localhost:8888/";
async function fetchData(link = json_server + "Datas") {
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
function AddUpdateForm(div_group, template) {
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
function AddForm(div_group, template) {
  let descG = document.querySelector(div_group);
  let templa = document.querySelector(template);
  const firstClone = templa.content.cloneNode(true);
  descG.appendChild(firstClone);
  DeleteUpdateForm(div_group);
}
function DeleteForm(div_group, template) {
  let descG = document.querySelector(div_group);
  let divs = descG.querySelectorAll(".input-group");
  divs[divs.length - 1].remove();
  AddUpdateForm(div_group, template);
}
//#endregion
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
async function fetchPOST(url,data) {
  await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
async function Submit() {
  let jsonData = new Object();
  let category = document.getElementById('select');
  if (category.value != "null") {
    jsonData.category = category.value;
  }
  let itemName = document.getElementById('text');
  if (itemName.value != "") {
    jsonData.name = itemName.value;
  }
  let file = document.getElementById('formFileMultiple');
  if (file.files.length != 0) {
    let jsonFiles = Array();
    for (const i of file.files) {
      jsonFiles.push(await toBase64(i));
    }
    jsonData.images = jsonFiles;
  }
  let money = document.getElementById('money');
  if (money.value != "") {
    jsonData.price = money.value;
  }
  let desc = document.querySelectorAll('.description-group>.input-group');
  if (desc.length != 0) {
    let data = Array();
    for (const i of desc) {
      data.push(i.querySelector('input').value);
    }
    jsonData.description = data;
  }
  let boolAttribute = false;
  let attribute = Object();

  let category2 = document.querySelectorAll('.category-group>.input-group');
  if (category2.length != 0) {
    boolAttribute = true;
    let data = Array();
    for (const i of category2) {
      data.push(i.querySelector('input').value);
    }
    attribute.category = data;
  }
  let color = document.querySelectorAll('.color-group>.input-group');
  if (color.length != 0) {
    boolAttribute = true;
    let data = Array();
    for (const i of color) {
      data.push(i.querySelector('input').value);
    }
    attribute.color = data;
  }
  let modell = document.querySelectorAll('.modell-group>.input-group');
  if (modell.length != 0) {
    boolAttribute = true;
    let data = Array();
    for (const i of modell) {
      data.push(i.querySelector('input').value);
    }
    attribute.modell = data;
  }
  if (boolAttribute) jsonData.attribute = attribute;
  await fetchPOST(json_server+"Datas",jsonData);
} 
async function Main() {
  let selectGui = document.querySelector("select");
  let selectData = await fetchData(json_server + "Categories");
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