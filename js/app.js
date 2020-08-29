let agregarContacto = document.getElementById('agregar');
let formulario = document.getElementById('formulario_crear_usuario');
let action = formulario.getAttribute('action');

let xhr = new XMLHttpRequest();

function crearUsuario() {

    let form_datos = new FormData(formulario);

    for([key, value] of form_datos.entries()) {
        console.log(key + ": " + value);
    }

    xhr.open("POST", action, true);
    xhr.setRequestHeader('X-Request-Width', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let resultado = xhr.responseText;
            let json = JSON.parse(resultado);
        }
    }

    xhr.send(form_datos);

}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});