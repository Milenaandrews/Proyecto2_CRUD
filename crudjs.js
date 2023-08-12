//Validate form inputs before submiting data
function validateForm(){
    let producto = document.getElementById("producto").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let email = document.getElementById("email").value;
    
    if(producto == ""){
        alert("Ingresa el producto");
        return false;
    }

    if(precio == ""){
        alert("Ingresa Precio");
        return false;
    }
    else if(precio < 1){
        alert("Precio debe ser un numero positivo");
        return false;
    }
    if(stock == ""){
        alert("Ingrese Stock");
        return false;
    }
    else if(stock < 1){
        alert("El stock no puede ser un numero negativo");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }
    else if(email<1){
        alert("Invalid email");
        return false;
    }
    return true;
}

    

        // function to show data from local storage
function showData(){
    let peopleList ;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    let html = "";

    peopleList.forEach(function(element, index){
        html +="<tr>";
        html +="<td>" + element.producto + "</td>";
        html +="<td>" + element.precio + "</td>";
        html +="<td>" + element.stock + "</td>";
        html +="<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Borrar</button><button onclick = "updateData('+index+')" class="btn btn-warning m-2">Editar</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

}

//Loads all data from local storage when document or page load

document.onload = showData();

//funcion para agregar data

function AddData(){
    if(validateForm() == true){
        let producto = document.getElementById("producto").value;
        let precio = document.getElementById("precio").value;
        let stock = document.getElementById("stock").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if(localStorage.getItem("peopleList") == null){
        peopleList = [];
        } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }

        peopleList.push({
            producto: producto,
            precio: precio,
            stock: stock,
            email: email,
        })

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("producto").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("email").value = "";
    }
}

//funcion para borrar datos

function deleteData(index){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
    peopleList = [];
    } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.splice(index, 1)
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// funcion para editar informacion en el local storage
function updateData(index){
    //el boton de Agregar se esconde y aparace el boton de update, para actualizar la info que esta en el local storage

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if(localStorage.getItem("peopleList") == null){
    peopleList = [];
    } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    console.log(peopleList)
    console.log(index)
    document.getElementById("prodcuto").value = peopleList[index].producto;
    document.getElementById("precio").value = peopleList[index].precio;
    document.getElementById("stock").value = peopleList[index].stock;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true) {
            peopleList[index].producto = document.getElementById("producto").value;
            peopleList[index].precio = document.getElementById("precio").value;
            peopleList[index].stock = document.getElementById("stock").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("producto").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("stock").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";


        }

    }

}