const conexion = require ('../Base_de_Datos/db');

exports.save9 = (req,res)=>{
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const noparto = req.body.noparto;
    const fechaparto = req.body.fechaparto;
    const lechon1 = req.body.lechon1;
    const lechon2 = req.body.lechon2;
    const lechon3 = req.body.lechon3;
    const lechon4 = req.body.lechon4;
    const lechon5 = req.body.lechon5;
    const lechon6 = req.body.lechon6;
    const lechon7 = req.body.lechon7;
    const lechon8 = req.body.lechon8;
    const lechon9 = req.body.lechon9;
    const lechon10 = req.body.lechon10;
    const lechon11 = req.body.lechon11;
    const lechon12 = req.body.lechon12;
    const lechon13 = req.body.lechon13;
    const lechon14 = req.body.lechon14;
    const totalpeso = req.body.totalpeso;
    const encargado = req.body.encargado;

   
    conexion.query('INSERT INTO destete SET ?',{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,lechon1:lechon1,lechon2:lechon2,lechon3:lechon3,lechon4:lechon4,
        lechon5:lechon5,lechon6:lechon6,lechon7:lechon7,lechon8:lechon8,lechon9:lechon9,lechon10:lechon10,
        lechon11:lechon11,lechon12:lechon12,lechon13:lechon13,lechon14:lechon14,totalpeso:totalpeso,encargado:encargado}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_nacimientos');
        }
    })
}

exports.update9 = (req,res)=>{
    const id = req.body.id;
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const noparto = req.body.noparto;
    const fechaparto = req.body.fechaparto;
    const lechon1 = req.body.lechon1;
    const lechon2 = req.body.lechon2;
    const lechon3 = req.body.lechon3;
    const lechon4 = req.body.lechon4;
    const lechon5 = req.body.lechon5;
    const lechon6 = req.body.lechon6;
    const lechon7 = req.body.lechon7;
    const lechon8 = req.body.lechon8;
    const lechon9 = req.body.lechon9;
    const lechon10 = req.body.lechon10;
    const lechon11 = req.body.lechon11;
    const lechon12 = req.body.lechon12;
    const lechon13 = req.body.lechon13;
    const lechon14 = req.body.lechon14;
    const totalpeso = req.body.totalpeso;
    const encargado = req.body.encargado;
    conexion.query('UPDATE destete SET ? WHERE id = ?',[{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,lechon1:lechon1,lechon2:lechon2,lechon3:lechon3,lechon4:lechon4,
        lechon5:lechon5,lechon6:lechon6,lechon7:lechon7,lechon8:lechon8,lechon9:lechon9,lechon10:lechon10,
        lechon11:lechon11,lechon12:lechon12,lechon13:lechon13,lechon14:lechon14,totalpeso:totalpeso,encargado:encargado}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_destete');
        }
    })
}

