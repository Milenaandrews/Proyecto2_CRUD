//funcion para validar los datos
function validateForm(){
    let producto = document.getElementById("producto").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let fecha = document.getElementById("fecha").value;
    
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

    if(fecha == ""){
        alert("Ingresa fecha del ingreso del producto a bodega");
        return false;
    }
   
    return true;
}

    

//! Funcion para mostrar la informacion del local storage
function showData(){
    let peopleList ;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    let html = "";

//! esto es lo que se me va a mostrar en mi html

    peopleList.forEach(function(element, index){
        html +="<tr>";
        html +="<td>" + element.producto + "</td>";
        html +="<td>" + element.precio + "</td>";
        html +="<td>" + element.stock + "</td>";
        html +="<td>" + element.fecha + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Borrar</button><button onclick = "updateData('+index+')" class="btn btn-warning m-2">Editar</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

}


//! cuando cargue la pagina, esto me permite cargar lo q este guardado en mi local storage

document.onload = showData();

//!funcion para agregar data

function AddData(){
    if(validateForm() == true){
        let producto = document.getElementById("producto").value;
        let precio = document.getElementById("precio").value;
        let stock = document.getElementById("stock").value;
        let fecha = document.getElementById("fecha").value;

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
            fecha: fecha,
        })

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("producto").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("fecha").value = "";
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

//! funcion para editar informacion en el local storage
function updateData(index){

    //?el boton de Agregar se esconde y aparace el boton de update, para actualizar la info que esta en el local storage

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if(localStorage.getItem("peopleList") == null){
    peopleList = [];
    } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    //console.log para ver como estan organizados los objetos 
    // console.log(peopleList)
    // console.log(index)

    document.getElementById("producto").value = peopleList[index].producto;
    document.getElementById("precio").value = peopleList[index].precio;
    document.getElementById("stock").value = peopleList[index].stock;
    document.getElementById("fecha").value = peopleList[index].fecha;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true) {
            peopleList[index].producto = document.getElementById("producto").value;
            peopleList[index].precio = document.getElementById("precio").value;
            peopleList[index].stock = document.getElementById("stock").value;
            peopleList[index].fecha = document.getElementById("fecha").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("producto").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("stock").value = "";
            document.getElementById("fecha").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";


        }

    }

}