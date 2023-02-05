const conexion = require ('../Base_de_Datos/db');

exports.save = (req,res)=>{
    const arete = req.body.arete;
    const fecha = req.body.fecha;
    const nombre = req.body.nombre;
    const tetas = req.body.tetas;
    const peso = req.body.peso;
    const fmonta = req.body.fmonta;
    const nbarraco = req.body.nbarraco;
    const confircarga = req.body.confircarga;
    const fconfirmacion = req.body.fconfirmacion;
    const fparto = req.body.fparto;
    const observaciones = req.body.observaciones;
    conexion.query('INSERT INTO cerdas SET ?',{arete:arete, fecha:fecha, nombre:nombre,tetas:tetas, peso:peso, fmonta:fmonta,nbarraco:nbarraco,confircarga:confircarga,fconfirmacion:fconfirmacion,fparto:fparto, observaciones:observaciones}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_cerda');
        }
    })
}

exports.update = (req,res)=>{
    const id = req.body.id;
    const arete = req.body.arete;
    const fecha = req.body.fecha;
    const nombre = req.body.nombre;
    const tetas = req.body.tetas;
    const peso = req.body.peso;
    const fmonta = req.body.fmonta;
    const nbarraco = req.body.nbarraco;
    const confircarga = req.body.confircarga;
    const fconfirmacion = req.body.fconfirmacion;
    const fparto = req.body.fparto;
    const observaciones = req.body.observaciones;
    conexion.query('UPDATE cerdas SET ? WHERE id = ?',[{arete:arete, fecha:fecha, nombre:nombre,tetas:tetas, peso:peso,fmonta:fmonta,nbarraco:nbarraco,confircarga:confircarga,fconfirmacion:fconfirmacion,fparto:fparto, observaciones:observaciones}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_cerda');
        }
    })
}

