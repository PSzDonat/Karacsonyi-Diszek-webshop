let json_server = "http://192.168.1.83:8888/";
async function getFetch(name) {
    return await fetch(json_server+name);
}
function createCard(id) {
    const col = document.createElement('div');
    col.classList.add('col-xl-2','col-md-3','col-sm-6');
    const a = document.createElement('a');
    a.href = `Shop` 
}
let datas = [];
async function showCards() {
    await getFetch('Datas').then(x=>x.json()).then(x=>datas=x);
    for (const item of datas) {
        let row = document.querySelector(".container>.row");
        row.append(createCard(
            item.id
        ));
    }
}


