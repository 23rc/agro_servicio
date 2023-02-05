const conexion = require ('../Base_de_Datos/db');

exports.save2 = (req,res)=>{
    const arete = req.body.arete;
    const fechaIn = req.body.fechaIn;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const peso = req.body.peso;
    const fvacunacion = req.body.fvacunacion;
    const fmonta = req.body.fmonta;
    const cantmontas = req.body.cantmontas;
    conexion.query('INSERT INTO barracos SET ?',{arete:arete, fechaIn:fechaIn, nombre:nombre,edad:edad, peso:peso, fvacunacion:fvacunacion,fmonta:fmonta,cantmontas:cantmontas}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_barracos');
        }
    })
}

exports.update2 = (req,res)=>{
    const id = req.body.id;
    const arete = req.body.arete;
    const fechaIn = req.body.fechaIn;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const peso = req.body.peso;
    const fvacunacion = req.body.fvacunacion;
    const fmonta = req.body.fmonta;
    const cantmontas = req.body.cantmontas;
    conexion.query('UPDATE barracos SET ? WHERE id = ?',[{arete:arete, fechaIn:fechaIn, nombre:nombre,edad:edad, peso:peso,fvacunacion:fvacunacion,fmonta:fmonta,cantmontas:cantmontas}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_barracos');
        }
    })
}