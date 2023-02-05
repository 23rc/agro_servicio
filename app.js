const express = require('express')
const dotenv = require('dotenv')
const { json } = require('express');
const cookieParser = require('cookie-parser');




const app = express()


const PORT = process.env.PORT || 5000
//seteamos el motor de plantillas
app.set('view engine','ejs')

//seteamos la carpeta public para archivos estaticos
app.use(express.static('publica'))



//para rocesar datos enviados desde fomas
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//seteamos las variables de entorno
dotenv.config({path: './variables_entorno/.env'})

// para poder trabajar con las cookies
app.use(cookieParser())//comentamos esto para demostraci{on de vista index


//llamar al router 
app.use('/', require('./rutas/rutas'))


/*app.get("*",(req,res) =>{
	res.render("error404E")
})*/
app.use(function(req,res,next){
	res.status(404).render("error404E")
})


/*app.listen(3000,()=>{
	console.log('CONECTADO A http://localhost:3000')///*******************************************************
})*/
/************************************************************************************************************** */
/************************************************************************************************************** */
/*****************************************INICIO DEAPP EXTERNA************************************************* */
/************************************************************************************************************** */
// crear clase de instancia


/************************************************************************************************************** */
/************************************************************************************************************** */
/*****************************************FIN DEAPP EXTERNA************************************************* */
/************************************************************************************************************** */
app.listen(PORT, ()=>{
    console.log('PUERTO A UTILIZAR http://localhost:5000')});
