const conexion = require('../Base_de_Datos/db')

conexion.query("SELECT * FROM cerdas WHERE nombre LIKE"+"'%"+nombuscar+"%'");
