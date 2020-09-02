let agregarContacto = document.getElementById('agregar');
let formulario = document.getElementById('formulario_crear_usuario');
let action = formulario.getAttribute('action');
let divCrear = document.getElementById('crear_contacto');
let tablaRegistrados = document.getElementById('registrados');

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
    tdNombre.appendChild(textoNombre);

    // Crear telefono de contacto
    let tdTelefono = document.createElement('td');
    let textoTelefono = document.createTextNode(telefono);
    tdTelefono.appendChild(textoTelefono);

    // Crear enlace para editar
    let nodoBtn = document.createElement('a');
    textoEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textoEnlace);
    nodoBtn.href = 'editar.php?id=' + registro_id;

    // Agregar el boton al td
    let nodoTdEditar = document.createElement('td');
    nodoTdEditar.appendChild(nodoBtn);

    // Crear checkbox para borrar
    let checkBorrar = document.createElement('input');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');
    
    // Agregar td a checkbox
    let tdCheckbox = document.createElement('td');
    tdCheckbox.classList.add('borrar');
    tdCheckbox.appendChild(checkBorrar);

    // Agregar al TR
    let trContacto = document.createElement('tr');
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdTelefono);
    trContacto.appendChild(nodoTdEditar);
    trContacto.appendChild(tdCheckbox);

    tablaRegistrados.childNodes[3].appendChild(trContacto);
}

function crearUsuario() {

    let form_datos = new FormData(formulario);
    
    for([key, value] of form_datos.entries()) {
        console.log(key + ": " + value);
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

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});