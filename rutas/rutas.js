//PROCESOS DE REGISTRAR Y LOGIN ******************************************************************************************************************
const express = require('express')
const router = express.Router()
const conexion = require('../Base_de_Datos/db');

const authController = require('../controles/control_login')

router.get('/', (req,res)=>{
	res.render('inicio1',{alert:false})
    
})

router.get('/login', (req,res)=>{
	res.render('login',{alert:false})
})
router.get('/registrarse',authController.isAuthenticated,authController.Administrador,(req,res)=>{
	res.render('registrarse')
})
router.get('/menu_principal',authController.isAuthenticated,(req,res)=>{
	res.render('menu_principal', {user:req.user})
})

//graficas
router.get('/graficas', authController.isAuthenticated,(req,res)=>{
	res.render('graficas', {user:req.user})
})
router.get('/calculadora',authController.isAuthenticated,(req,res)=>{
	res.render('calculadora')
})
/******************************************************************************************************************* */
/***************************************INICIO DE VENTAS********************************************************** */
/******************************************************************************************************************* */
router.get('/buy', authController.isAuthenticated,authController.Administrador,(req,res)=>{
	res.render('buy', {user:req.user})
})
router.get('/todaySales', authController.isAuthenticated,(req,res)=>{
	res.render('todaySales', {user:req.user})
})

router.get('/totalSales', authController.isAuthenticated,(req,res)=>{
	res.render('totalSales', {user:req.user})
})


let instance = null;
class dbService{
    static getDbServiceInstance(){
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM nacimientos;';// datos del lechones o medicine
                conexion.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }

    // Show data with ID 
    async showDataWithID(id) {
        id = parseInt(id, 10);
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM nacimientos WHERE id = ?';// datos del lechon o medicine
                conexion.query(sql, [id], (err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
    // ExpireDate show Medicine



    // insert Customer and total amount
    
    async insertNewRowCustomer(name, medicine, date, total) {
        try{
            const insertId = await new Promise((resolve, reject) => {

                const sql = 'INSERT INTO ventas (clientes, lotelechones, ventadia, Total) VALUES (?,?,?, ?);';// de ventas o customer

                conexion.query(sql, [name, medicine, date, total],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId);
            //return response;
        }
        catch(e){
            console.log(e);
        }
    }
    // get customer data for today's Sales 
    async getTodaySales() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM ventas WHERE ventadia = CURRENT_DATE();';// de ventas o customers
            	conexion.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }

    

    // Get all the total sales in The Pharmacy
    async getAllTotalSales() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM ventas ;';//de ventas o customers
                conexion.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }


    

    // Update with
   
    async  updateWithId(id, available) {
        id = parseInt(id, 10);
        try{
            const updateRow = await new Promise((resolve, reject) => {
                console.log('Updating' + available);
                const sql = 'UPDATE nacimientos SET cantidad = ? WHERE id = ?;';// datos del lechon o medicine

                conexion.query(sql, [available, id],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            
            return updateRow === 1 ? true : false;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
 
};



router.post('/insert/customer', (req, res)=>{

    const {name, medicine, date, total} = req.body;

    //console.log(name + " " + medicine + " " + date + " " + total);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.insertNewRowCustomer(name, medicine, date, total);
  
    results
    .then((data)=> res.json({success: true}))
    .catch((err)=>console.error(err));
});
// read For customer todays data Sales 

router.get('/client/shop/todaySales', (req, res)=>{
    console.log(`MehediHasanHi`);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getTodaySales();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});

// Read data for Total Sales in The Pharmacy
router.get('/client/shop/totalSales', (req, res)=>{
    console.log(`MehediHasanHi`);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getAllTotalSales();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});


// read for Buy Available Medicine information Shop page Here
router.get('/client/shop/buy', (req, res)=>{
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getAllDataAvailabeAndNotExpire();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));

    
});

// Read data from databse with ID
router.get('/show/:id', (req, res)=>{
    const {id} = req.params;
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.showDataWithID(id);
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});



// update
router.patch('/update', function(req, res){
    
    const {id, available} = req.body;
    console.log(available);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB. updateWithId(id, available);
  
    results
    .then((data)=> res.json({success: data}))
    .catch((err)=>console.error(err));
});

/******************************************************************************************************************* */
/****************************************FIN DE VENTA************************************************************* */
/******************************************************************************************************************* */


//router para los métodos del controller
router.post('/registrarse',authController.registrarse,authController.isAuthenticated,authController.SoporteTecnico)
router.post('/login',authController.login, )
router.get('/logout',authController.logout, )



//CONSULTAR USUARIOS******************************************************************************************************************************


router.get('/usuario',authController.isAuthenticated,authController.Administrador, (req, res)=>{           
	conexion.query('SELECT * FROM users',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('usuario.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_usuario',authController.isAuthenticated,authController.Administrador, (req, res)=>{     
    conexion.query('SELECT * FROM users',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/deleteuser/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM users WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/usuario');
		}
	})
})
//PROCESOS DE INGRESO DE NACIMIENTOS*******************************************************************************************************************

router.get('/menu_ingreso_nacimientos',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM nacimientos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_nacimientos.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_nacimientos',authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM nacimientos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
//RUTA PARA CREAR REGISTROS

router.get('/nuevonac/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM cerdas WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('nuevo_nacimiento',{user:results[0]});
        }
    })
})
//RUTA PARA EDITAR REGISTROS
router.get('/edit5/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('editar_nacimiento',{user:results[0]});
		}
	})

})

//RUTA PARA ELIMINAR REGISTRO
router.get('/delete5/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM nacimientos WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/menu_ingreso_nacimientos');
		}
	})
})
//RUTA PARA IMPRIMIR REGISTROS
router.get('/imprimirNacimiento/:id',authController.isAuthenticated,(req, res)=>{
   const id = req.params.id;
   conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
	   if(error){
		   throw error;
	   }else{
		   res.render('imprimir_nacimiento',{user:results[0]});
	   }
   })
})
const crud5 = require('../controles/control_ingreso_nacimientos')
 router.post('/save5', crud5.save5,authController.isAuthenticated,)
 router.post('/update5', crud5.update5,authController.isAuthenticated,);

 router.get('/menu_informacion_nacimientos',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM infonacimientos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_informacion_nacimientos.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_inforacion_nacimientos',authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM infonacimientos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/infonac/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('nuevo_infonac',{user:results[0]});
        }
    })
})
router.get('/edit6/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM infonacimientos WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('editar_infonacimientos',{user:results[0]});
		}
	})

})
router.get('/delete6/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM infonacimientos WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/menu_informacion_nacimientos');
		}
	})
})
router.get('/imprimirInfonac/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM infonacimientos WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('imprimir_infonacimientos',{user:results[0]});
        }
    })
 })
const crud6 = require('../controles/control_ingreso_infonacimientos')
 router.post('/save6', crud6.save6,authController.isAuthenticated,)
 router.post('/update6', crud6.update6,authController.isAuthenticated,);

 router.get('/menu_temperatura_cerda',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM temperaturacerda',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_temperatura_cerda.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_temperatura_cerda',authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM temperaturacerda',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/temperaturaCerda/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('nueva_temperatura',{user:results[0]});
        }
    })
})
router.get('/edit7/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM temperaturacerda WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('editar_temperatura_cerda',{user:results[0]});
		}
	})

})
router.get('/delete7/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM temperaturacerda WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/menu_temperatura_cerda');
		}
	})
})
router.get('/imprimirTemperatura/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM temperaturacerda WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('imprimir_temperatura',{user:results[0]});
        }
    })
 })
const crud7 = require('../controles/control_ingreso_temperaturaCerda')
 router.post('/save7', crud7.save7,authController.isAuthenticated,)
 router.post('/update7', crud7.update7,authController.isAuthenticated,);

 router.get('/menu_muertes_lechones',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM muertelechones',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_muertes_lechones.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_muertes_lechones',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM muertelechones',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/muertelechones/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('nueva_muertelechon',{user:results[0]});
        }
    })
})
router.get('/edit8/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM muertelechones WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('editar_muerte_lechones',{user:results[0]});
		}
	})

})
router.get('/delete8/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM muertelechones WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/menu_muertes_lechones');
		}
	})
})
router.get('/imprimirMuerte/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM muertelechones WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('imprimir_muertelechones',{user:results[0]});
        }
    })
 })
const crud8 = require('../controles/control_ingreso_muertelechones')
 router.post('/save8', crud8.save8,authController.isAuthenticated,)
 router.post('/update8', crud8.update8,authController.isAuthenticated,);

 router.get('/menu_ingreso_destete',authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM destete',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_destete.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_destete',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM destete',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/nuevodestete/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM nacimientos WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('nuevo_destete',{user:results[0]});
        }
    })
})
router.get('/edit9/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM destete WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('editar_destete',{user:results[0]});
		}
	})

})
router.get('/delete9/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('DELETE  FROM destete WHERE id = ?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.redirect('/menu_ingreso_destete');
		}
	})
})
router.get('/imprimirDestete/:id',authController.isAuthenticated,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM destete WHERE id=?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('imprimir_destete',{user:results[0]});
        }
    })
 })
const crud9 = require('../controles/control_ingreso_destete')
 router.post('/save9', crud9.save9,authController.isAuthenticated,)
 router.post('/update9', crud9.update9,authController.isAuthenticated,);
//PROCESOS DE INGRESO DE CERDAS*******************************************************************************************************************

router.get('/menu_ingreso_cerda',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM cerdas',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_cerda', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_cerdas',authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM cerdas',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

 //RUTA PARA CREAR REGISTROS
 router.get('/nueva_cerda',authController.isAuthenticated,(req, res)=>{
	 res.render('nueva_cerda');
 })
 
 //RUTA PARA EDITAR REGISTROS
 router.get('/edit/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('SELECT * FROM cerdas WHERE id=?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('editar_cerda',{user:results[0]});
		 }
	 })
 })
 
 //RUTA PARA ELIMINAR REGISTRO
 router.get('/delete/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('DELETE  FROM cerdas WHERE id = ?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.redirect('/menu_ingreso_cerda');
		 }
	 })
 })
 //RUTA PARA IMPRIMIR REGISTROS
 router.get('/imprimirCerda/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM cerdas WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('imprimir_cerda',{user:results[0]});
		}
	})
})
 const crud = require('../controles/control_ingreso_cerdas')
 router.post('/save', crud.save,authController.isAuthenticated,)
 router.post('/update', crud.update,authController.isAuthenticated,);


 //PROCESOS DE INGRESO DE BARRACOS*******************************************************************************************************************
/*router.get('/menu_ingreso_barracos',authController.isAuthenticated,(req,res)=>{
	// res.render('index');
	 conexion.query('SELECT * FROM barracos',(error, results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('menu_ingreso_barracos',{results:results});
		 }
	 })
 })*/
 router.get('/menu_ingreso_barracos',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM barracos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_barracos.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_barracos',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM barracos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

 //RUTA PARA CREAR REGISTROS
 router.get('/nuevo_barraco',authController.isAuthenticated,(req, res)=>{
	 res.render('nuevo_barraco');
 })
 
 //RUTA PARA EDITAR REGISTROS
 router.get('/edit2/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('SELECT * FROM barracos WHERE id=?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('editar_barraco',{user:results[0]});
		 }
	 })
 })
 //RUTA PARA ELIMINAR REGISTRO
 router.get('/delete2/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('DELETE  FROM barracos WHERE id = ?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.redirect('/menu_ingreso_barracos');
		 }
	 })
 })
  //RUTA PARA IMPRIMIR REGISTROS
  router.get('/imprimirBarracos/:id',authController.isAuthenticated,(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM barracos WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('imprimir_barracos',{user:results[0]});
		}
	})
})
 
 
 const crud2 = require('../controles/control_ingreso_barracos')
 router.post('/save2', crud2.save2,authController.isAuthenticated,)
 router.post('/update2', crud2.update2,authController.isAuthenticated,);

 //PROCESOS DE INGRESO DE PACHAS*******************************************************************************************************************
 /*router.get('/menu_ingreso_pachas',(req,res)=>{
	// res.render('index');
	 conexion.query('SELECT * FROM pachas',(error, results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('menu_ingreso_pachas',{results:results});
		 }
	 })
 })*/

 router.get('/menu_ingreso_pachas',authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM pachas',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_pachas.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_pachas',authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM pachas',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

 //RUTA PARA CREAR REGISTROS
 router.get('/nueva_pacha',authController.isAuthenticated,(req, res)=>{
	 res.render('nueva_pacha');
 })
 
 //RUTA PARA EDITAR REGISTROS
 router.get('/edit3/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('SELECT * FROM pachas WHERE id=?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('editar_pacha',{user:results[0]});
		 }
	 })
 })
 //RUTA PARA ELIMINAR REGISTRO
 router.get('/delete3/:id',authController.isAuthenticated,(req, res)=>{
	 const id = req.params.id;
	 conexion.query('DELETE  FROM pachas WHERE id = ?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.redirect('/menu_ingreso_pachas');
		 }
	 })
 })
 
  //RUTA PARA IMPRIMIR REGISTROS
  router.get('/imprimirPachas/:id',(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM pachas WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('imprimir_pachas',{user:results[0]});
		}
	})
})
 
 const crud3 = require('../controles/control_ingreso_pachas')
 router.post('/save3', crud3.save3,authController.isAuthenticated,)
 router.post('/update3', crud3.update3,authController.isAuthenticated,);

 //PROCESOS DE INGRESO DE PRODUCTOS*************************************************************************************************************
 /*router.get('/menu_ingreso_producto',(req,res)=>{
	// res.render('index');
	 conexion.query('SELECT * FROM productos',(error, results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('menu_ingreso_producto',{results:results});
		 }
	 })
 })*/

 router.get('/menu_ingreso_producto', authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM productos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_producto.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_producto',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM productos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

 //RUTA PARA CREAR REGISTROS
 router.get('/nuevo_producto',authController.isAuthenticated,(req, res)=>{
	 res.render('nuevo_producto');
 })
 
 //RUTA PARA EDITAR REGISTROS
 router.get('/edit4/:id',(req, res)=>{
	 const id = req.params.id;
	 conexion.query('SELECT * FROM productos WHERE id=?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.render('editar_producto',{user:results[0]});
		 }
	 })
 })
 //RUTA PARA ELIMINAR REGISTRO
 router.get('/delete4/:id',(req, res)=>{
	 const id = req.params.id;
	 conexion.query('DELETE  FROM productos WHERE id = ?',[id], (error,results)=>{
		 if(error){
			 throw error;
		 }else{
			 res.redirect('/menu_ingreso_producto');
		 }
	 })
 })
 
  //RUTA PARA IMPRIMIR REGISTROS
  router.get('/imprimirProductos/:id',(req, res)=>{
	const id = req.params.id;
	conexion.query('SELECT * FROM productos WHERE id=?',[id], (error,results)=>{
		if(error){
			throw error;
		}else{
			res.render('imprimir_productos',{user:results[0]});
		}
	})
})
 
 const crud4 = require('../controles/control_ingreso_producto');
const { Router } = require('express');
 router.post('/save4', crud4.save4,authController.isAuthenticated,)
 router.post('/update4', crud4.update4,authController.isAuthenticated,);
 //INGRESAR VENTAS**************************************************************************************************************
 router.get('/menu_ingreso_ventas', authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM ventas',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('menu_ingreso_ventas', {data:results});                                               
	   }   
   })
})
router.get('/data_ingreso_ventas',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM ventas',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
router.get('/deleteVENTAS/:id',(req, res)=>{
    const id = req.params.id;
    conexion.query('DELETE  FROM ventas WHERE ID = ?',[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/menu_ingreso_ventas');
        }
    })
})

router.get('/codigos_venta', authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM nacimientos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('codigos_venta', {data:results});                                               
	   }   
   })
})
router.get('/data_codigos_venta',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM nacimientos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
 //CONSULTAS CERDAS *************************************************************************************************************
 router.get('/consultas_cerdas',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM cerdas',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('consultas_cerdas.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_consultas_cerdas', authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM cerdas',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
 //CONSULTAS BARRACOS *************************************************************************************************************
//Mostrar todos los artículos
router.get('/consultas_barracos', authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM barracos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('consultas_barracos.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_consultas_barracos', authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM barracos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
 //CONSULTAS PACHAS *************************************************************************************************************
//Mostrar todos los artículos
router.get('/consultas_pachas',authController.isAuthenticated, (req, res)=>{           
	conexion.query('SELECT * FROM pachas',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('consultas_pachas.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_consultas_pachas',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM pachas',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})
 //CONSULTAS PRODUCTOS *************************************************************************************************************
//Mostrar todos los artículos
router.get('/consultas_productos', authController.isAuthenticated,(req, res)=>{           
	conexion.query('SELECT * FROM productos',(error, results)=>{
	   if(error){
		   throw error;
	   } else {                                                                
		   res.render('consultas_productos.ejs', {data:results});                                               
	   }   
   })
})
router.get('/data_consultas_productos',authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM productos',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})


 module.exports = router