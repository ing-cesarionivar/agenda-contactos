let agregarContacto = document.getElementById('agregar');
let formulario = document.getElementById('formulario_crear_usuario');
let action = formulario.getAttribute('action');
let divCrear = document.getElementById('crear_contacto');
let tablaRegistrados = document.getElementById('registrados');
let checkboxes = document.getElementsByClassName('borrar_contacto');
let btn_borrar = document.getElementById('btn_borrar');
let tableBody = document.getElementsByTagName('tbody');
let divExistentes = document.getElementsByClassName('existentes');
let inputBuscador =  document.getElementById('buscador');
let totalRegistros = document.getElementById('total');
let checkTodos = document.getElementById('borrar_todos');

function registroExitoso(nombre) {

    // Crear div y agregar un id
    let divMensaje = document.createElement('div');
    divMensaje.setAttribute('id', 'mensaje');

    // Agregar texto
    let texto = document.createTextNode('Creado: ' + nombre);
    divMensaje.appendChild(texto);

    divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);

    // Agregar clase mostrar animacion al mensaje
    divMensaje.classList.add('mostrar');
        
    // Ocultar el mensaje de creación
    setTimeout(function () {  
        divMensaje.classList.add('ocultar');
        setTimeout(function() {
            let divPadreMensaje = divMensaje.parentNode;
            divPadreMensaje.removeChild(divMensaje);
        }, 500);
    }, 3000);
}

// Construir template para insertar datos dinamicamente
function construirTemplate(nombre, telefono, registro_id) { 
    // Crear nombre de contacto
    let tdNombre = document.createElement('td');
    let textoNombre = document.createTextNode(nombre);
    let parrafoNombre = document.createElement('P');
    parrafoNombre.appendChild(textoNombre)
    tdNombre.appendChild(parrafoNombre);

    // Crear input con el nombre
    let inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.name = 'contacto_' + registro_id;
    inputNombre.value = nombre;
    inputNombre.classList.add('nombre_contacto');

    // Crear telefono de contacto
    let tdTelefono = document.createElement('td');
    let textoTelefono = document.createTextNode(telefono);
    let parrafoTelefono = document.createElement('P');
    parrafoTelefono.appendChild(textoTelefono);
    tdTelefono.appendChild(parrafoTelefono);

    // Crear input con el telefono
    let inputTelefono = document.createElement('input');
    inputTelefono.type = 'text';
    inputTelefono.name = 'telefono_' + registro_id;
    inputTelefono.value = telefono;
    inputTelefono.classList.add('telefono_contacto');

    // Crear enlace para editar
    let nodoBtn = document.createElement('a');
    textoEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textoEnlace);
    nodoBtn.href = '#';
    nodoBtn.classList.add('editarBtn');

    // Crear boton para guardar
    let btnGuardar = document.createElement('a');
    textoGuardar = document.createTextNode('Guardar');
    btnGuardar.appendChild(textoGuardar);
    btnGuardar.href = '#';
    btnGuardar.classList.add('guardarBtn');

    // Agregar el boton al td
    let nodoTdEditar = document.createElement('td');
    nodoTdEditar.appendChild(nodoBtn);
    nodoTdEditar.appendChild(btnGuardar);

    // Crear checkbox para borrar
    let checkBorrar = document.createElement('input');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');
    
    // Agregar td a checkbox
    let tdCheckbox = document.createElement('td');
    tdCheckbox.classList.add('borrar');
    tdCheckbox.appendChild(checkBorrar);

    // Agregar nombre y telefono para editar
    tdNombre.appendChild(inputNombre);
    tdTelefono.appendChild(inputTelefono);

    // Agregar al TR
    let trContacto = document.createElement('tr');
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdTelefono);
    trContacto.appendChild(nodoTdEditar);
    trContacto.appendChild(tdCheckbox);

    tablaRegistrados.childNodes[3].appendChild(trContacto);

    actualizarNumero();
    recorrerBotonesEditar();
    recorrerBotonesGuardar(registro_id);
}

function crearUsuario() {

    let form_datos = new FormData(formulario);
    
    for([key, value] of form_datos.entries()) {
        // console.log(key + ": " + value);
    }
     
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let resultado = xhr.responseText;
            // console.log(resultado);
            let json = JSON.parse(resultado);
            if(json.respuesta == true) {
                registroExitoso(json.nombre);
                construirTemplate(json.nombre, json.telefono, json.id);
            }
        }
    }

    xhr.send(form_datos);

}

function mostrarEliminado() {
    // Crear div y agregar id
    let divEliminado = document.createElement('DIV');
    divEliminado.setAttribute('id', 'borrado');

    // Agregar texto 
    let texto = document.createTextNode('Eliminado de la lista de contactos');
    divEliminado.appendChild(texto);

    // Agregar al HTML
    divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);

    // Agregar clase de CSS
    divEliminado.classList.add('mostrar');

    // Ocultar el mensaje de eliminacion
    setTimeout(function () {  
        divEliminado.classList.add('ocultar');
        setTimeout(function() {
            let divPadreMensaje = divEliminado.parentNode;
            divPadreMensaje.removeChild(divEliminado);
        }, 500);
    }, 3000);
}

function eliminarHTML(ids_borrados) {
    // console.log(ids_borrados);
    for(i = 0; i < ids_borrados.length; i++) {
        let elementoBorrar = document.getElementById(ids_borrados[i]);
        tableBody[0].removeChild(elementoBorrar);
    }
}


function contactosEliminar(contactos) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'borrar.php?id=' + contactos, true);
    // console.log('borrar.php?id=' + contactos);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let resultadoBorrar = xhr.responseText;
            let json = JSON.parse(resultadoBorrar);
            if(json.respuesta == false) {
                alert("Selecciona un elemento");
            } else {
                // console.log("Resultado: " + resultadoBorrar);
                eliminarHTML(contactos);
                mostrarEliminado();
            }
        }
    }
    xhr.send();
}

function checkboxSeleccionado() {
    let contactos = [];
    for(i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked == true) {
            contactos.push(checkboxes[i].name);
        }
    }
    
    contactosEliminar(contactos);
}



for(let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
        if(this.checked) {
            this.parentNode.parentNode.classList.add('activo');
            
        } else {
            this.parentNode.parentNode.classList.remove('activo');
        }
    });
}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});

btn_borrar.addEventListener('click', function(){
    checkboxSeleccionado();
});

function actualizarNumero() {
    let registros = tableBody[0].getElementsByTagName('tr');

    let cantidad = 0;
    let ocultos = 0;

    for (let i = 0; i < registros.length; i++) {
        let elementos = registros[i];

        if(elementos.style.display == 'table-row') {
            cantidad++;
            totalRegistros.innerHTML = cantidad;

        } else {
            if(elementos.style.display == 'none') {
                ocultos++;
                if(ocultos == registros.length) {
                    ocultos -= registros.length;
                    totalRegistros.innerHTML = ocultos;
                }
            }
        }
                
    }

}

function ocultarRegistro(nombre_buscar) {
    // Varaible para todos los registros
    let registros = tableBody[0].getElementsByTagName('tr');

    // Expression regular que busca el nobre con case insensitive
    let expresion = new RegExp(nombre_buscar, 'i');

    for (let i = 0; i < registros.length; i++) {
        registros[i].classList.add('ocultar');
        registros[i].style.display = 'none';
        
        if(registros[i].childNodes[1].textContent.search(expresion) != -1 || nombre_buscar == '') {
            registros[i].classList.add('mostrar');
            registros[i].classList.remove('ocultar');
            registros[i].style.display = 'table-row';
            
        }
    }

    actualizarNumero();
}

inputBuscador.addEventListener('input', function() {
    ocultarRegistro(this.value);
});

// Seleccionar todos para eliminar 
checkTodos.addEventListener('click', function(){
    
    if(this.checked) {

        let todosRegistros = tableBody[0].getElementsByTagName('tr');
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            todosRegistros[i].classList.add('activo');
        }

    } else {

        let todosRegistros = tableBody[0].getElementsByTagName('tr');
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            todosRegistros[i].classList.remove('activo');
        }

    }

});

/* Recorrer botones de guardar */
function recorrerBotonesGuardar(id) {
    let btn_guardar = document.querySelectorAll('.guardarBtn');
    for(let i = 0; i < btn_guardar.length; i++) {
        btn_guardar[i].addEventListener('click', function(){
            actualizarRegistro(id);
        });
    }
}

/* Editar registros */

function recorrerBotonesEditar() {
    let btn_editar =  tableBody[0].querySelectorAll('.editarBtn');
    
    for(let i = 0; i < btn_editar.length; i++) {
        btn_editar[i].addEventListener('click', function(event){
            event.preventDefault();
            deshabilitarEdicion();
            let registroActivo = this.parentNode.parentNode;
            registroActivo.classList.add('modo-edicion');
            registroActivo.classList.remove('desactivado');

            // Actualizamos el registro en especifico
            actualizarRegistro(registroActivo.id);
        });
    }
}

function deshabilitarEdicion() {
    let registrosTr = document.querySelectorAll('#registrados tbody tr');
    for(let i = 0; i < registrosTr.length; i++) {
        registrosTr[i].classList.add('desactivado');
    }
}

function actualizarRegistro(idRegistro) {
    
    // Seleccionar boton de guardar del registro especifico (Se pasa el id)
    let btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn');

    btnGuardar[0].addEventListener('click', function(e){
        e.preventDefault();

        // Obtiene el valor del campo nombre
        let inputNombreNuevo = document.getElementById(idRegistro).getElementsByClassName('nombre_contacto');
        let nombreNuevo = inputNombreNuevo[0].value;
        
        // Obtiene el valor del campo telefono
        let inputTelefonoNuevo = document.getElementById(idRegistro).getElementsByClassName('telefono_contacto');
        let telefonoNuevo =  inputTelefonoNuevo[0].value;
        
        // Objeto con todos los datos
        let contacto = {
            nombre: nombreNuevo,
            telefono: telefonoNuevo,
            id: idRegistro
        };

        actualizarAjax(contacto);

    });

}

function actualizarAjax(datosContacto) {
    
    // Convierte objeto a Json
    let jsonContacto = JSON.stringify(datosContacto);

    // Crear la conexión
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'actualizar.php?datos=' + jsonContacto, true);
    // console.log('borrar.php?id=' + contactos);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let resultadoActualizar = xhr.responseText;
            let resultadoJson = JSON.parse(resultadoActualizar);
            if(resultadoJson.respuesta == true) {
                let registroActivo =  document.getElementById(datosContacto.id);
                
                // Inserta dinamicamente el nombre al html
                registroActivo.getElementsByTagNam('td')[0].getElementsByTagName('p')[0].innerHTML = resultadoJson.nombre;

                // Inserta dinamicamente el telefono al html
                registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = resultadoJson.telefono;

                // Borrar modo edicion
                registroActivo.classList.remove('modo-edicion');
                // habilitarEdicion();
                
            } else {
                console.log("Hubo en error!");
            }
            
        }
    }
    xhr.send();  
}

document.addEventListener('DOMContentLoaded', function(event){
    recorrerBotonesEditar();
});