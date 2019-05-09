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


const URL = () =>{
    const fullURL = "https://crese-asistencia.herokuapp.com/API/v1/user/reset-password?newPassword="+password.value+"&verifyPassword="+repassword.value
    return fullURL
}
const setParam = () =>{
    const token = getUrlParameter("token");
    if(token){
        return {
            headers:{
                "content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer "+ token
            },
            method:"GET"
        }
    }
    else{return null}
}

const resetPassword = () => {
    const parameters = setParam();
    if(parameters){
        fetch(URL(), parameters).then(data=>{
            console.log(data.json);
            return data.status;
        }).then(res=>{
            if(res==200){
                window.location.replace("passwordSet.html")
            }
            else{
                errorDisplay.innerHTML = "Check your password"
            }
        }).catch(error=>{
            errorDisplay.innerHTML = error.message
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
