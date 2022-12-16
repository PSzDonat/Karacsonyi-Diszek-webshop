let json_server = "http://192.168.1.83:8888/";
async function getFetch(name) {
    return await fetch(json_server+name);
}
function createCard(id,category,images,h5,price) {
    const col = document.createElement('div');
    col.classList.add('col-xl-3','col-md-4','col-sm-6');
    const a = document.createElement('a');
    a.href = `./Termek.html?id=`+id;
    const card = document.createElement('card');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = '../Img/'+category+'/'+images
    const card_body = document.createElement('card-body');
    card_body.classList.add('card-body');
    const card_title = document.createElement('h5');
    card_title.classList.add('card-title');
    card_title.textContent = h5;
    card.append(img);
    card_body.append(card_title);
    const hh4 = document.createElement('h4');
    const span = document.createElement('span');
    span.classList.add('badge','bg-info');
    span.textContent = price+" FT";
    hh4.append(span);
    card_body.append(hh4);
    card.append(card_body);
    a.append(card);
    col.append(a);
    return col;
}
async function showCards() {
    let datas = [];
    await getFetch('Datas').then(x=>x.json()).then(x=>datas=x);
    for (const item of datas) {
        let row = document.querySelector(".container>.row");
        row.append(createCard(
            item.id,item.category,item.images[0],item.name,item.price
        ));
    }
}
showCards();

