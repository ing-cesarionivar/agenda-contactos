<?php
    try {

        require_once('functions/bd_conexion.php');

        $sql = "SELECT * FROM contactos;";

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
            <div id="crear_contacto" class="crear">
                <h2>Nuevo Contacto</h2>
                <form action="crear.php" method="post" id="formulario_crear_usuario">
                        <div class="campo">
                            <label for="nombre">Nombre:</label>
                            <input type="text" name="nombre" id="nombre" placeholder="Nombre">
                        </div>
                        <div class="campo">
                            <label for="numero">Teléfono:</label>      
                            <input type="text" name="numero" id="numero" placeholder="Número">
                        </div>
                        <input type="submit" value="Agregar" id="agregar" class="boton">  
                </form>
            </div><!--.crear_contacto-->
        </div> <!--.contenido-->

        <div class="contenido existentes">
            <h2>Contactos Existentes</h2>
            <p>Número de Contactos: <?php echo $resultado->num_rows; ?></p>

            <table id="registrados">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Editar</th>
                        <th><button type="button" name="borrar" id="btn_borrar" class="borrar">Borrar</button></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($registros = $resultado->fetch_assoc()): ?>

                        <tr id="<?php echo $registros['id']; ?>">
                            <td><?php echo $registros['nombre']; ?></td>
                            <td><?php echo $registros['telefono']; ?></td>
                            <td><a href="editar.php?id=<?php echo $registros['id'];?>">Editar</a></td>
                            <td class="borrar">
                                <input class="borrar_contacto" type="checkbox" name="<?php echo $registros['id'];?>" id="<?php echo $registros['id'];?>">
                            </td>
                        </tr>

                    <?php endwhile; ?>
                        
                </tbody>
            </table>
        </div>

    </div>

    <?php $conn->close(); ?>

    <script src="js/app.js"></script>
</body>
</html>