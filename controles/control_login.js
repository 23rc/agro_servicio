const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../Base_de_Datos/db')
const {promisify} = require('util')


// procedimiento pra registrarnos

exports.registrarse = async (req,res)=>{
    
    try{
        const name = req.body.name
        const user = req.body.user
        const rol = req.body.rol
        const pass = req.body.pass
       let passHash = await bcryptjs.hash(pass,8)
       //console.log(passHash)
       conexion.query('INSERT INTO users SET ?',{user:user, name: name,rol:rol, pass:passHash},(error, results)=>{
        if(error){console.loq(error)}
        res.redirect('/menu_principal')
       })

    }catch(error){
        console.log(error)
    }
   
}

exports.login = async(req, res)=>{
    
    try{
        const user = req.body.user
        const pass = req.body.pass
        
        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage:"Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))){
                    res.render('login',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage:"Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                
            })
        }else{
            //inicio de sesión Ok
            const id = results[0].id
            const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA
            })
            console.log("TOKEN: "+token+" para el USUARIO: "+user)

            const cookiesOptions = {
                expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)
            res.render('login',{
                alert:true,
                alertTitle: "Conexión exitosa",
                alertMessage:"¡LOGIN CORRECTO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 800,
                ruta: 'menu_principal'
        
            })
        }
        })
    }
    } catch (error){
        console.log(error)
    }
      
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt){
        try{
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users  WHERE id = ?',[decodificada.id],(error,results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        }catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
     
    }
}
exports.Administrador =(req,res,next)=>{
    if (req.user.rol === 'Administrador')next();
    else res.status(404).render("acceso_denegado")
  
}

exports.SoporteTecnico =(req,res,next)=>{
    if (req.user.rol === 'SoporteTecnico')next();
    else res.status(404).render("acceso_denegado")
  
}



exports.logout =(req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}
