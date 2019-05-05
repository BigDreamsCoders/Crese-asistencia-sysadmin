
const tableFour = document.querySelector("#tablaA");
const actionA = "user"
//CAMBIAR
const requestAdmins = () => {fetch("http://localhost:5300/API/v1/user", otherParam).then(data=>{
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
