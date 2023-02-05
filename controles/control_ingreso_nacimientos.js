const conexion = require ('../Base_de_Datos/db');

exports.save5 = (req,res)=>{
    const lotelechon = req.body.lotelechon;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const nparto = req.body.nparto;
    const nacvivos = req.body.nacvivos;
    const nacmuertos = req.body.nacmuertos;
    const momias = req.body.momias;
    const nactotal = req.body.nactotal;
    const atendido = req.body.atendido;
    const cerda = req.body.cerda;
    const aretecerda = req.body.aretecerda;
    const fechaparto = req.body.fechaparto;
    conexion.query('INSERT INTO nacimientos SET ?',{lotelechon:lotelechon,precio:precio,cantidad:cantidad,
        nparto:nparto,nacvivos:nacvivos,nacmuertos:nacmuertos,momias:momias,nactotal:nactotal,atendido:atendido,
        cerda:cerda,aretecerda:aretecerda,fechaparto:fechaparto}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_cerda');
        }
    })
}

exports.update5 = (req,res)=>{
    const id = req.body.id;
    const lotelechon = req.body.lotelechon;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const nparto = req.body.nparto;
    const nacvivos = req.body.nacvivos;
    const nacmuertos = req.body.nacmuertos;
    const momias = req.body.momias;
    const nactotal = req.body.nactotal;
    const atendido = req.body.atendido;
    const cerda = req.body.cerda;
    const aretecerda = req.body.aretecerda;
    const fechaparto = req.body.fechaparto;
    conexion.query('UPDATE nacimientos SET ? WHERE id = ?',[{lotelechon:lotelechon,precio:precio,
        cantidad:cantidad,nparto:nparto,nacvivos:nacvivos,nacmuertos:nacmuertos,momias:momias,
        nactotal:nactotal,atendido:atendido,cerda:cerda,aretecerda:aretecerda,fechaparto:fechaparto}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_nacimientos');
        }
    })
}