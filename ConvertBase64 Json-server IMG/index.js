const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}));
async function fetchData(url = "http://localhost:8888/Datas") {
    let temp = Array();
    let A = await fetch(url).then(x=>x.json()).then(x=> temp = x);
    return temp;
}
async function patchImageData (url,id,data) {
    let imgArr = {
        images: data
    }
    await fetch(url+id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imgArr)
        }
    );
}
async function Main() {
    let data = await fetchData();
    for (let i = 0; i<data.length;i++) {
        let picArr = Array();
        for (let q = 0; q<data[i]["images"].length;q++) {
            await toDataURL('http://127.0.0.1:5500/Web/Img/'+data[i]["category"]+"/"+data[i]["images"][q])
            .then(dataUrl => {
                picArr.push(dataUrl);
            })
        }
        await patchImageData("http://localhost:8888/Datas/",i+1,picArr);
    }
}
//func end
Main();