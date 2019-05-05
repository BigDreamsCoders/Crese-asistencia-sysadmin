if(!sessionStorage.token){
    window.location.replace("index.html");
}

$(document).ready(function() {
    $("select").material_select();
});

let search = ".*"
let category = "cctv"
const actionM = "manual"


const otherParam = {
    headers:{
        "content-type":"application/json; charset=UTF-8",
        "Authorization": "Bearer "+ sessionStorage.token
    },
    method:"GET"
}
//CAMBIAR
const URL = (search, category) =>{
    const fullURL = "http://localhost:5300/API/v1/manual?search="+search+"&category="+category
    return fullURL
}
const tableOne = document.querySelector("#tablaM");
//const selectone = document.querySelector("#selectSearchm");
const selectOne = document.getElementById("selectSearchm");
const optionManual = ["cctv", "cámara wifi",  "gps", "control de acceso"];

const requestManuals = () => {fetch(URL(search,category), otherParam).then(data=>{
    return data.json();
}).then(res=>{
    tableOne.innerHTML = "";
    if(res.manuals.length==0){
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
            window.location.replace("manageManual.html")
        }

        tableOne.appendChild(row);
    }
    else{
        res.manuals.forEach(element => {
            const row = document.createElement("tr");
            
            let arreglo = [6]
            for(i=0; i<=5;i++){
                arreglo[i] = document.createElement("td");
            }

            row.setAttribute("class", "clickableTable");
            row.onclick = function (){
                sessionStorage.info =  JSON.stringify(element)
                sessionStorage.action = actionM
                sessionStorage.category = category
                window.location.replace("manageManual.html")
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
            tableOne.appendChild(row);
        });
    }
}).catch(error=>{
    console.log(error);
});}

function searchManual(){
    const strUser = selectOne.options[selectOne.selectedIndex].value;
    const categorySearch = {}
    switch (parseInt(strUser)) {
    case 0:
        categorySearch.result = optionManual[0];
        break;
    case 1:
        categorySearch.result = optionManual[1];
        break;
    case 2:
        categorySearch.result = optionManual[2];
        break;
    case 3:
        categorySearch.result = optionManual[3];
        break;
    }
    category = categorySearch.result;
    requestManuals();
}

