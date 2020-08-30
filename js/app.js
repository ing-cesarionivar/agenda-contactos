let agregarContacto = document.getElementById('agregar');
let formulario = document.getElementById('formulario_crear_usuario');
let action = formulario.getAttribute('action');

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
            console.log("Resultado: " + resultado);
            let json = JSON.parse(resultado);
        }
    }

    xhr.send(form_datos);

}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});