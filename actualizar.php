<?php

    include_once("functions/peticion_ajax.php");

    $datos = $_GET['datos'];
    $datos = json_decode($datos, true);

    $nombre = $datos['nombre'];
    $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);
    $telefono = $datos['telefono'];
    $id = $datos['id'];

    if(peticion_ajax()) {
        try {
            require_once('functions/bd_conexion.php');
    
            $sql = "UPDATE contactos SET nombre = '{$nombre}', telefono = '{$telefono}' WHERE id = '{$id}';";
    
            $resultado = $conn->query($sql);
    
            echo json_encode(array(
                'respuesta' => $resultado,
                'nombre' => $nombre,
                'id' => $id,
                'telefono' => $telefono
            ));
            
        } catch (Exception $e) {
    
            $error = $e->getMessage();
            
        }
        $conn->close();

    } else {

        exit;
    }
    
?>