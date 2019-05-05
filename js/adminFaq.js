
const tableThree = document.querySelector("#tablaQ");
const actionQ = "faq"
//CAMBIAR
const requestFaqs = () => {fetch("http://localhost:5300/API/v1/faq", otherParam).then(data=>{
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
