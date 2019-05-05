if(!sessionStorage.token){
    window.location.replace("index.html");
}
if(!sessionStorage.action || !sessionStorage.info){
    window.location.replace("admin.html");
}


//CAMBIAR
const URLuser = "http://localhost:5300/API/v1/user"

const account = document.querySelector("#account");
const email = document.querySelector("#email");
const status = document.querySelector("#status");
const actionB = document.querySelector("#action");

//Selects
const selectSearchv = document.querySelector("#selectSearchv");
const userType = document.querySelector("#userType");

const info = JSON.parse(window.sessionStorage.info);
let methodText = "/"+info._id
let method = "PUT"



const prepareForm = ()=>{
    if(!info._id){
        selectSearchv.selectedIndex  = 2;
        selectSearchv.options[0].disabled = true;
        selectSearchv.options[1].disabled = true;
    }
    else{
        email.value = info.email
        account.value = info.account
        status.checked = info.status
        if(userType.value != info.roles){
            userType.selectedIndex  = 1;
        }
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
        email.value = info.email
        account.value = info.account
        status.checked = info.status
        break;
    case 1:
        method = "DELETE"
        methodText = "/"+info._id
        actionB.innerHTML = "Delete"
        email.value = info.email
        account.value = info.account
        status.checked = info.status
        break;
    }
}

function endPoint(){
    let contextBody = {}
    const rolesC = userType.options[userType.selectedIndex].value;
    let checkdeStatus = 0;
    if(status.checked){
        checkdeStatus = 1;
    }
    switch (method) {
    case "PUT":
        contextBody.updateContent = [{change: "account", value: account.value},
            {change: "email", value: email.value},
            {change: "status", value: checkdeStatus},
            {change: "roles", value: rolesC}]
        break;
    case "DELETE":
        contextBody = {};
        break;
    }
    const param = {headers:{
        "content-type":"application/json; charset=UTF-8",
        "Authorization": "Bearer "+ sessionStorage.token
    },
    method: method,
    body : JSON.stringify(contextBody)
    }
    fetch(URLuser+methodText, param).then(data=>{
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