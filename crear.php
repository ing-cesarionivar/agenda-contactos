<?php
    include_once("functions/peticion_ajax.php");

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
                'nombre' => $nombre,
                'telefono' => $telefono,
                'id' => $conn->insert_id
            ));
        } else {
            exit;
        }

        
        
    } catch (Exception $e) {

        $error = $e->getMessage();
        
    }

    $conn->close();

?>