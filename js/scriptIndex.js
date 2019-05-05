var request = new XMLHttpRequest()
//CAMBIAR
const baseURL = "http://localhost:5300/API/v1"
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const error = document.querySelector("#errorDisplay");
const loginJSON = {};


function login(){
    request.open("POST", baseURL+"/user/login", true)
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            sessionStorage.token = data.token
            window.location.replace("admin.html")
        } else {
            error.innerHTML = data.message
        }
    }
    loginJSON.account = username.value;
    loginJSON.email = username.value;
    loginJSON.password = password.value;
    var data = JSON.stringify(loginJSON);
    request.send(data);
}

var app = angular.module("mainModule", []);

app.controller("mainController", function($scope, $http){ //o scope liga o js e o template
    $scope.nome = "Valor Inicial";
    //$http.get().success();
    $scope.reset = function()
    {
        $scope.nome = "";
    }
});
