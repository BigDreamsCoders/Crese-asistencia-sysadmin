if(!sessionStorage.token){
    window.location.replace("index.html");
}
if(!sessionStorage.action || !sessionStorage.info){
    window.location.replace("admin.html");
}

//CAMBIAR
const URLmanual = "https://crese-asistencia.herokuapp.com/API/v1/video"

const name = document.querySelector("#name");
const URL = document.querySelector("#URL");
const sourceType = document.querySelector("#sourceType");
const keywords = document.querySelector("#keywords");

const actionB = document.querySelector("#action");

const info = JSON.parse(window.sessionStorage.info);
let methodText = "/"+info._id
let method = "PUT"
const optionType = ["cctv", "cámara wifi",  "gps", "control de acceso"];

const prepareForm = ()=>{
    
    if(!info._id){
        selectSearchv.selectedIndex  = 2;
        selectSearchv.options[0].disabled = true;
        selectSearchv.options[1].disabled = true;
        methodText = ""
        method = "POST"
        actionB.innerHTML = "Create"
    }
    else{
        name.value = info.name
        URL.value = info.URL
        sourceType.value = info.sourceType
        keywords.value = info.keywords
    }
    $("select").material_select();
}

function modifyRequest(){
    const strUser = selectSearchv.options[selectSearchv.selectedIndex].value;
    switch (parseInt(strUser)) {
    case 0:
        method = "PUT"
        methodText = "/"+info._id
        actionB.innerHTML = "Update"
        name.value = info.name
        URL.value = info.URL
        sourceType.value = info.sourceType
        keywords.value = info.keywords
        break;
    case 1:
        method = "DELETE"
        methodText = "/"+info._id
        actionB.innerHTML = "Delete"
        name.value = info.name
        URL.value = info.URL
        sourceType.value = info.sourceType
        keywords.value = info.keywords
        break;
    case 2:
        method = "POST"
        methodText = ""
        name.value = ""
        URL.value = ""
        sourceType.value = ""
        keywords.value = ""
        actionB.innerHTML = "Create"
        break;
    }
}

function endPoint(){
    let contextBody = {}
    switch (method) {
    case "PUT":
        contextBody.updateContent = [
            {change: "name", value: name.value},
            {change: "URL", value: URL.value},
            {change: "sourceType", value: sourceType.value},
            {change: "keywords", value: keywords.value.replace(/^\s*|\s*$/g,"").split(/\s*,\s*/)},
        ]
        break;
    case "DELETE":
        contextBody = {};
        break;
    case "POST":
        contextBody = {
            name: name.value,
            URL: URL.value,
            sourceType: sourceType.value,
            keywords: keywords.value.replace(/^\s*|\s*$/g,"").split(/\s*,\s*/),
            category: window.sessionStorage.category
        }
        break;
    }
    const param = {headers:{
        "content-type":"application/json; charset=UTF-8",
        "Authorization": "Bearer "+ sessionStorage.token
    },
    method: method,
    body : JSON.stringify(contextBody)
    }
    fetch(URLmanual+methodText, param).then(data=>{
        return data.json();
    }).then(res =>{
        alert(res.message);
        window.location.replace("admin.html");
    }).catch(error=>{
        console.log(error);
    });
    
}

window.onload = () =>{
    prepareForm();
}