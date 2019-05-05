let searchv = ".*"
let categoryv = "cctv"
const actionV = "video"
//CAMBIAR
const URLv = (searchv, categoryv) =>{
    const fullURL = "http://localhost:5300/API/v1/video?search="+searchv+"&category="+categoryv
    return fullURL
}
const tableTwo = document.querySelector("#tablaV");
//const selectTwo = document.querySelector("#selectSearch");
const selectTwo = document.getElementById("selectSearchv");
const optionVideo = ["cctv", "cámara wifi",  "gps", "control de acceso"];

const requestVideos = () => {fetch(URLv(searchv,categoryv), otherParam).then(data=>{
    return data.json();
}).then(res=>{
    tableTwo.innerHTML = "";
    if(res.videos.length==0){
        const row = document.createElement("tr");
        const col = document.createElement("td");
        col.setAttribute("colspan", "6");
        row.setAttribute("class", "clickableTable");
        col.textContent = "It's empty"
        row.appendChild(col);
        row.onclick = function (){
            sessionStorage.info =  JSON.stringify({})
            sessionStorage.action = actionM
            sessionStorage.category = category
            window.location.replace("manageVideo.html")
        }

        tableTwo.appendChild(row);
    }
    else{
        res.videos.forEach(element => {
            const row = document.createElement("tr");
            
            let arreglo = [6]
            for(i=0; i<=5;i++){
                arreglo[i] = document.createElement("td");
            }

            row.setAttribute("class", "clickableTable");
            row.onclick = function (){
                sessionStorage.info =  JSON.stringify(element)
                sessionStorage.action = actionV
                sessionStorage.category = category
                window.location.replace("manageVideo.html")
            }

            arreglo[0].textContent = element.name;
            arreglo[1].textContent = element.sourceType;
            arreglo[2].textContent = element.dateCreated;
            arreglo[3].textContent = element.downloadFactor;
            arreglo[4].textContent = element.viewFactor;
            arreglo[5].textContent = element.shareFactor;

            for(i=0; i<=5;i++){
                row.appendChild(arreglo[i]);
            }
            tableTwo.appendChild(row);
        });
    }
}).catch(error=>{
    console.log(error);
});}

function searchVideo(){
    const strUser = selectTwo.options[selectTwo.selectedIndex].value;
    const categorySearch = {}
    switch (parseInt(strUser)) {
    case 0:
        categorySearch.result = optionVideo[0];
        break;
    case 1:
        categorySearch.result = optionVideo[1];
        break;
    case 2:
        categorySearch.result = optionVideo[2];
        break;
    case 3:
        categorySearch.result = optionVideo[3];
        break;
    }
    categoryv = categorySearch.result;
    requestVideos();
}

