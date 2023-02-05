const conexion = require ('../Base_de_Datos/db');

exports.save3 = (req,res)=>{
    const codigo = req.body.codigo;
    const fechaIn = req.body.fechaIn;
    const fvencimiento = req.body.fvencimiento;
    const responsable = req.body.responsable;
    const observaciones = req.body.observaciones;
    conexion.query('INSERT INTO pachas SET ?',{codigo:codigo, fechaIn:fechaIn, fvencimiento:fvencimiento,responsable:responsable,observaciones:observaciones}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_pachas');
        }
    })
}

exports.update3 = (req,res)=>{
    const id = req.body.id;
    const codigo = req.body.codigo;
    const fechaIn = req.body.fechaIn;
    const fvencimiento = req.body.fvencimiento;
    const responsable = req.body.responsable;
    const observaciones = req.body.observaciones;
    conexion.query('UPDATE pachas SET ? WHERE id = ?',[{codigo:codigo, fechaIn:fechaIn, fvencimiento:fvencimiento,responsable:responsable,observaciones:observaciones}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_pachas');
        }
    })
}