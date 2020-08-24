<?php

    if($_SERVER['REQUEST_METHOD'] == 'GET') {

        if (!empty($_GET['nombre'])) {
            $nombre = $_GET['nombre'];
            $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);

        }

        if(!empty($_GET['numero'])) {
            $telefono = $_GET['numero'];
        } 

        if(!empty($_GET['id'])) {
            $id = $_GET['id'];
        } 
    } else {
        header("Location: index.php");
    }

    try {
        require_once('functions/bd_conexion.php');

        $sql = "UPDATE contactos SET nombre = '{$nombre}', telefono = '{$telefono}' WHERE id = '{$id}';";

        $resultado = $conn->query($sql);

        
        
    } catch (Exception $e) {

        $error = $e->getMessage();
        
    }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda PHP</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    
    <div class="contenedor">
      <h1>Agenda de Contactos</h1>

        <div class="contenido">
            <?php 
                if($resultado) {
                    echo "Contacto actualizado";
                } else {
                    echo "Error " . $conn->error;
                }
            ?>
            <br>
            <a class="volver" href="index.php">Volver a inicio</a>    
        </div>

    </div>

    <?php
        $conn->close();
    ?>

</body>
</html>