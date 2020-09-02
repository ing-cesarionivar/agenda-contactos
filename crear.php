<?php

    function peticion_ajax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        if (!empty($_POST['nombre'])) {
            $nombre = $_POST['nombre'];
            $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);

        }

        if(!empty($_POST['numero'])) {
            $telefono = $_POST['numero'];
        } 
    } else {
        header("Location: index.php");
    }

    try {
        require_once('functions/bd_conexion.php');

        $sql = "INSERT INTO `contactos`(`id`, `nombre`, `telefono`)";
        $sql .= "VALUES (null, '{$nombre}', '{$telefono}');";

        $resultado = $conn->query($sql);

        if(peticion_ajax()) {
            echo json_encode(array(
                'respuesta' => $resultado,
                'nombre' => $nombre
            ));
        } else {
            exit;
        }

        
        
    } catch (Exception $e) {

        $error = $e->getMessage();
        
    }

    $conn->close();

?>