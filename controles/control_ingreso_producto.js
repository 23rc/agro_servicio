const conexion = require ('../Base_de_Datos/db');

exports.save4 = (req,res)=>{
    const codigo = req.body.codigo;
    const cantidad = req.body.cantidad;
    const producto = req.body.producto;
    const precio = req.body.precio;
    const total = req.body.total;
    const observaciones = req.body.observaciones;
    conexion.query('INSERT INTO productos SET ?',{codigo:codigo, cantidad:cantidad, producto:producto,precio:precio,total:total,observaciones:observaciones}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_producto');
        }
    })
}

exports.update4 = (req,res)=>{
    const id = req.body.id;
    const codigo = req.body.codigo;
    const cantidad = req.body.cantidad;
    const producto = req.body.producto;
    const precio = req.body.precio;
    const total = req.body.total;
    const observaciones = req.body.observaciones;
    conexion.query('UPDATE productos SET ? WHERE id = ?',[{codigo:codigo, cantidad:cantidad, producto:producto,precio:precio,total:total,observaciones:observaciones}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_producto');
        }
    })
}