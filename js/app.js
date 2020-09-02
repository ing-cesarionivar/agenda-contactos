let agregarContacto = document.getElementById('agregar');
let formulario = document.getElementById('formulario_crear_usuario');
let action = formulario.getAttribute('action');
let divCrear = document.getElementById('crear_contacto');

function registroExitoso(nombre) {

    // Crear div y agregar un id
    let divMensaje = document.createElement('div');
    divMensaje.setAttribute('id', 'mensaje');

    // Agregar texto
    let texto = document.createTextNode('Creado: ' + nombre);
    divMensaje.appendChild(texto);

    divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);
        
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
                
            }
        }
    }

    xhr.send(form_datos);

}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});