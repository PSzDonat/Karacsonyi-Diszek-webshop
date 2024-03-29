//GLOBAL VARIABLES
let json_server = "http://localhost:8888/";
let datas = [];
const size = 12; //<- how many items/page
const params = new URLSearchParams(location.search);
const currentPage = params.has("page") ? params.get("page") : 1;
//End
function createCard(id, category, image, h5, price) {
  const col = document.createElement("div");
  col.classList.add("col-xl-3", "col-md-4", "col-sm-6", "mb-4");
  const a = document.createElement("a");
  a.href = `./Termek.html?id=` + id;
  const card = document.createElement("div");
  card.classList.add("card", "h-100");
  const img = document.createElement("img");
  img.src = image;
  const card_body = document.createElement("div");
  card_body.classList.add("card-body","d-flex","flex-column","justify-content-between");
  const card_title = document.createElement("h5");
  card_title.classList.add("card-title");
  card_title.textContent = h5;
  card.append(img);
  card_body.append(card_title);
  const hh4 = document.createElement("h4");
  const span = document.createElement("span");
  span.classList.add("badge", "bg-info");
  span.textContent = price + " FT";
  hh4.append(span);
  card_body.append(hh4);
  card.append(card_body);
  a.append(card);
  col.append(a);
  return col;
}
async function showCards(datas) {
  for (const item of datas) {
    let row = document.querySelector(".container>.row");
    row.append(
      createCard(item.id, item.category, item.images[0], item.name, item.price)
    );
  }
}
async function makeNavigation() {
  const calcPageSize = Math.ceil(datas.length / size);
  const calcA = Math.max(currentPage - 1, 1);
  const calcB = Math.min(currentPage - -1, calcPageSize);
  const navig = document.querySelector(".navig");
  const previous = document.createElement("li");
  previous.classList.add("page-item");
  if (currentPage == 1) previous.classList.add("disabled");
  const previousA = document.createElement("a");
  previousA.classList.add("page-link");
  previousA.textContent = "Previous";
  previousA.href = "Shop.html?page=" + (currentPage - 1);
  previous.append(previousA);
  navig.append(previous);
  for (let i = calcA; i <= calcB; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "Shop.html?page=" + i;
    a.textContent = i;
    li.append(a);
    navig.append(li);
  }
  const next = document.createElement("li");
  next.classList.add("page-item");
  if (currentPage == calcPageSize) next.classList.add("disabled");
  const nextA = document.createElement("a");
  nextA.classList.add("page-link");
  nextA.textContent = "Next";
  nextA.href = "Shop.html?page=" + (currentPage - -1);
  next.append(nextA);
  navig.append(next);
}
async function showError(url) {
  const err = document.querySelector("div#error");
  const myerror = document.createElement("div");
  myerror.textContent = `A szervert nem találtuk ${
    json_server + url
  } webhelyen!`;
  myerror.classList.add("alert", "alert-danger");
  myerror.role = "alert";
  err.prepend(myerror);
}
async function makeWeb() {
  try {
    await fetch(json_server + "Datas")
      .then((x) => x.json())
      .then((x) => (datas = x));
  } catch (err) {
    showError("Datas");
    document.querySelector("h1").textContent = "";
    return;
  }
  makeNavigation();
  showCards(datas.slice((currentPage - 1) * size, currentPage * size));
}
//func end
makeWeb();
