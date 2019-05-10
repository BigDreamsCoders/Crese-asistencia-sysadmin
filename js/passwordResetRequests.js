const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");
const button = document.querySelector("#resetButton");
const errorDisplay = document.querySelector("#errorDisplay");

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



const setParam = (bodyString) =>{
    return {
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"POST",
        body: JSON.stringify(bodyString)
    }
}

const resetPassword = () => {
    const token = getUrlParameter("token");
    const bodyInfo = {};
    bodyInfo.newPassword = password.value;
    bodyInfo.verifyPassword = repassword.value;
    bodyInfo.token = token;
    const parameters = setParam(bodyInfo);
    if(parameters){
        fetch("https://crese-asistencia.herokuapp.com/API/v1/user/reset-password", parameters)
        .then(data=>{
            return data.json();
        }).then(res=>{
            if(res.message=="Password reset"){
                window.location.replace("passwordSet.html")
            }
            else{
                errorDisplay.innerHTML = res.message;
            }
        }).catch(error=>{
            errorDisplay.innerHTML = error.message;
        });
    }
    else{
        errorDisplay.innerHTML = "No token provided"
    }
}

window.onload = () =>{
    button.addEventListener("click", ()=>{
        resetPassword();
    });
}
