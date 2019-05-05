if(!sessionStorage.token){
    window.location.replace("index.html");
}
if(!sessionStorage.action || !sessionStorage.info){
    window.location.replace("admin.html");
}


//CAMBIAR
const URLfaq = "http://localhost:5300/API/v1/faq"

const answer = document.querySelector("#answer");
const question = document.querySelector("#question");

//Selects
const selectSearchv = document.querySelector("#selectSearchv");
//Butoon
const actionB = document.querySelector("#action");


const info = JSON.parse(window.sessionStorage.info);
let methodText = "/"+info._id
let method = "PUT"

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
        answer.value = info.answer
        question.value = info.question
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
        answer.value = info.answer
        question.value = info.question
        break;
    case 1:
        method = "DELETE"
        methodText = "/"+info._id
        actionB.innerHTML = "Delete"
        answer.value = info.answer
        question.value = info.question
        break;
    case 2:
        method = "POST"
        methodText = ""
        answer.value = ""
        question.value = ""
        actionB.innerHTML = "Create"
        break;
    }
}

function endPoint(){
    let contextBody = {}
    switch (method) {
    case "PUT":
        contextBody.updateContent = [{change: "question", value: question.value},{change: "answer", value: answer.value}]
        break;
    case "DELETE":
        contextBody = {};
        break;
    case "POST":
        contextBody = {question: question.value, answer: answer.value}
        break;
    }
    const param = {headers:{
        "content-type":"application/json; charset=UTF-8",
        "Authorization": "Bearer "+ sessionStorage.token
    },
    method: method,
    body : JSON.stringify(contextBody)
    }
    fetch(URLfaq+methodText, param).then(data=>{
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