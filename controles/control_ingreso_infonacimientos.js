const conexion = require ('../Base_de_Datos/db');

exports.save6 = (req,res)=>{
    const arete = req.body.arete;
    const nomcerda = req.body.nomcerda;
    const fechaparto = req.body.fechaparto;
    const noparto = req.body.noparto;
    const inicio = req.body.inicio;
    const final = req.body.final;
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
    const tratamiento1 = req.body.tratamiento1;
    const tratamiento2 = req.body.tratamiento2;
    const tratamiento3 = req.body.tratamiento3;
    const tratamiento4 = req.body.tratamiento4;
    const tratamiento5 = req.body.tratamiento5;
   
    conexion.query('INSERT INTO infonacimientos SET ?',{arete:arete,nomcerda:nomcerda,fechaparto:fechaparto,noparto:noparto,inicio:inicio,final:final,lechon1:lechon1,lechon2:lechon2,lechon3:lechon3,lechon4:lechon4,lechon5:lechon5,lechon6:lechon6,lechon7:lechon7,lechon8:lechon8,lechon9:lechon9,lechon10:lechon10,lechon11:lechon11,lechon12:lechon12,lechon13:lechon13,lechon14:lechon14,tratamiento1:tratamiento1,tratamiento2:tratamiento2,tratamiento3:tratamiento3,tratamiento4:tratamiento4,tratamiento5:tratamiento5 }, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_nacimientos');
        }
    })
}

exports.update6 = (req,res)=>{
    const id = req.body.id;
    const arete = req.body.arete;
    const nomcerda = req.body.nomcerda;
    const fechaparto = req.body.fechaparto;
    const noparto = req.body.noparto;
    const inicio = req.body.inicio;
    const final = req.body.final;
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
    const tratamiento1 = req.body.tratamiento1;
    const tratamiento2 = req.body.tratamiento2;
    const tratamiento3 = req.body.tratamiento3;
    const tratamiento4 = req.body.tratamiento4;
    const tratamiento5 = req.body.tratamiento5;
    conexion.query('UPDATE infonacimientos SET ? WHERE id = ?',[{arete:arete,nomcerda:nomcerda,fechaparto:fechaparto,noparto:noparto,inicio:inicio,final:final,lechon1:lechon1,lechon2:lechon2,lechon3:lechon3,lechon4:lechon4,lechon5:lechon5,lechon6:lechon6,lechon7:lechon7,lechon8:lechon8,lechon9:lechon9,lechon10:lechon10,lechon11:lechon11,lechon12:lechon12,lechon13:lechon13,lechon14:lechon14,tratamiento1:tratamiento1,tratamiento2:tratamiento2,tratamiento3:tratamiento3,tratamiento4:tratamiento4,tratamiento5:tratamiento5}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_informacion_nacimientos');
        }
    })
}

