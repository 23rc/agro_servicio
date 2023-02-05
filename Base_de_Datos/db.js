const mysql = require('mysql2')

const conexion = mysql.createConnection({
	host : process.env.DB_HOST ||"us-cdbr-east-06.cleardb.net",
	user : process.env.DB_USER || "badb6107d43807",
	password : process.env.DB_PASS || "42f63d49",
	database : process.env.DB_DATABASE || "heroku_fbfdda651829ba7", 
	port: process.env.DE_PORT || "6150",
	ssl: {
		rejectUnauthorized:false
	},
})


conexion.connect((error)=>{
	if(error){
		console.log('El error de conexion es: '+error)
			return
	}
	console.log('¡Conectado a la base de datos MySQL!')
})

/*conexion.connect().then(() =>{
    console.log("Conectado a la base de datos");
}).catch(()=>{
    console.log("Error de conexion");
})
*/

module.exports = conexion;