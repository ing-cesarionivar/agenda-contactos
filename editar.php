<?php

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
    }

    try {
        require_once('functions/bd_conexion.php');

        $sql = "SELECT * FROM contactos WHERE id = {$id}";

        $resultado =$conn->query($sql);
        
        
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
            <div id="crear_contacto" class="crear">
                <h2>Editar Contacto</h2>
                
                <form action="actualizar.php" method="GET" id="formulario_crear_usuario">
                    <?php while($registro = $resultado->fetch_assoc()): ?>
                        <div class="campo">
                            <label for="nombre">Nombre:</label>
                            <input type="text" name="nombre" id="nombre" placeholder="Nombre" value="<?php echo $registro['nombre'];?>">
                        </div>
                        <div class="campo">
                            <label for="numero">Teléfono:</label>      
                            <input type="text" name="numero" id="numero" placeholder="Número" value="<?php echo $registro['telefono'];?>">
                        </div>
                        <input type="hidden" name="id" value="<?php echo $registro['id'];?>">
                        <input type="submit" value="Modificar" class="boton">  
                    <?php endwhile; ?>
                    </form>
            </div><!--.crear_contacto-->
        </div> <!--.contenido-->


    </div>

    <?php $conn->close(); ?>
</body>
</html>