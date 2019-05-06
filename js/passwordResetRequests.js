const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");
const button = document.querySelector("#resetButton");

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//CAMBIAR
const URL = () =>{
    const fullURL = "https://crese-asistencia.herokuapp.com/API/v1/user/reset-password?password="+password.value+"&repassword="+repassword.value
    return fullURL
}
const setParam = () =>{
    const token = getUrlParameter("token");
    if(token){
        return otherParam = {
            headers:{
                "content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer "+ token
            },
            method:"GET"
        }
    }
    return null
}

const resetPassword = () => {
    const parameters = setParam();
    console.log(parameters);
    /*
    if(parameters){
        fetch(URL(search,category), parameters).then(data=>{
        return data.json();
        }).then(res=>{
            
        }).catch(error=>{
            error.innerHTML = error.message
        });
    }
    else{
        error.innerHTML = "No token provided"
    }*/
}

window.onload = () =>{
    button.addEventListener("click", ()=>{
        resetPassword();
    });
}
