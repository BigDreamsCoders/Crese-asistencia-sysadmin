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
    const fullURL = "https://crese-asistencia.herokuapp.com/API/v1/manual?search="+search+"&category="+category
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

let searchv = ".*"
let categoryv = "cctv"
const actionV = "video"
//CAMBIAR
const URLv = (searchv, categoryv) =>{
    const fullURL = "https://crese-asistencia.herokuapp.com/API/v1/video?search="+searchv+"&category="+categoryv
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


const tableThree = document.querySelector("#tablaQ");
const actionQ = "faq"
//CAMBIAR
const requestFaqs = () => {fetch("https://crese-asistencia.herokuapp.com/API/v1/faq", otherParam).then(data=>{
    return data.json();
}).then(res=>{
    tableThree.innerHTML = "";
    if(res.faqs.length==0){
        const row = document.createElement("tr");
        const col = document.createElement("td");
        col.setAttribute("colspan", "4");
        row.setAttribute("class", "clickableTable");
        col.textContent = "It's empty"
        row.appendChild(col);
        row.onclick = function (){
            sessionStorage.info =  JSON.stringify({})
            window.location.replace("manageFaq.html")
        }

        tableThree.appendChild(row);
    }
    else{
        res.faqs.forEach(element => {
            const row = document.createElement("tr");
            
            let arreglo = [6]
            for(i=0; i<=1;i++){
                arreglo[i] = document.createElement("td");
            }

            row.setAttribute("class", "clickableTable");
            row.onclick = function (){
                sessionStorage.info =  JSON.stringify(element)
                sessionStorage.action = actionQ
                window.location.replace("manageFaq.html")
            }

            arreglo[0].textContent = element.question;
            arreglo[1].textContent = element.answer;

            for(i=0; i<=1;i++){
                row.appendChild(arreglo[i]);
            }
            tableThree.appendChild(row);
        });
    }
}).catch(error=>{
    console.log(error);
});}


const tableFour = document.querySelector("#tablaA");
const actionA = "user"
//CAMBIAR
const requestAdmins = () => {fetch("https://crese-asistencia.herokuapp.com/API/v1/user", otherParam).then(data=>{
    return data.json();
}).then(res=>{
    tableFour.innerHTML = "";
    if(res.users.length==0){
        const row = document.createElement("tr");
        const col = document.createElement("td");
        col.setAttribute("colspan", "4");
        row.setAttribute("class", "clickableTable");
        col.textContent = "It's empty, create a new user in the mobile"
        row.appendChild(col);
        tableFour.appendChild(row);
    }
    else{
        res.users.forEach(element => {
            const row = document.createElement("tr");
        
            let arreglo = [6]
            for(i=0; i<=3;i++){
                arreglo[i] = document.createElement("td");
            }

            row.setAttribute("class", "clickableTable");
            row.onclick = function (){
                sessionStorage.info =  JSON.stringify(element)
                sessionStorage.action = actionA
                window.location.replace("manageUser.html")
            }

            arreglo[0].textContent = element.email;
            arreglo[1].textContent = element.roles;
            arreglo[2].textContent = element.dateCreated;
            arreglo[3].textContent = element.status;


            for(i=0; i<=3;i++){
                row.appendChild(arreglo[i]);
            }
            tableFour.appendChild(row);
        });
    }
}).catch(error=>{
    console.log(error);
});}

function logOut(){
    sessionStorage.clear();
    window.location.replace("index.html");
}

window.onload = ()=>{
    requestManuals();
    requestVideos();
    requestFaqs();
    requestAdmins();
}
