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
    const p1 = password.value;
    const p2 = repassword.value;
    if(parameters){
        fetch(`https://crese-asistencia.herokuapp.com/API/v1/user/reset-password?newPassword=${p1}+"&verifyPassword=${p2}`, 
        parameters).then(data=>{
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
