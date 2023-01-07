const url = "http://localhost:8888/";
async function fetchData(link = url+"Datas") {
  let temp = Array();
  let A = await fetch(link)
    .then((x) => x.json())
    .then((x) => (temp = x));
  return temp;
}
async function Main() {
    let selectGui = document.querySelector('select');
    let selectData = await fetchData(url+"Categories");
    const optionNone = document.createElement('option');
    optionNone.value = null;
    optionNone.selected;
    optionNone.textContent = "None";
    selectGui.append(optionNone);
    for (const i of selectData) {
        const temp = document.createElement('option'); 
        temp.value = i.name;
        temp.textContent = i.name;
        selectGui.append(temp);
    }
}
//func end
Main();