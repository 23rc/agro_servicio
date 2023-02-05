const conexion = require ('../Base_de_Datos/db');

exports.save7 = (req,res)=>{
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const fechaparto = req.body.fechaparto;
    const noparto = req.body.noparto;
    const temperatura1 = req.body.temperatura1;
    const temperatura2 = req.body.temperatura2;
    const temperatura3 = req.body.temperatura3;
    const temperatura4 = req.body.temperatura4;
    const temperatura5= req.body.temperatura5;
    const temperatura6 = req.body.temperatura6;
    const temperatura7 = req.body.temperatura7;
    const temperatura8 = req.body.temperatura8;
    const temperatura9 = req.body.temperatura9;
    const temperatura10 = req.body.temperatura10;
    const temperatura11 = req.body.temperatura11;
    
    const tratamiento1 = req.body.tratamiento1;
    const tratamiento2 = req.body.tratamiento2;
   
   
    conexion.query('INSERT INTO temperaturacerda SET ?',{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,temperatura1:temperatura1,temperatura2:temperatura2,temperatura3:temperatura3,
        temperatura4:temperatura4,temperatura5:temperatura5,temperatura6:temperatura6,temperatura7:temperatura7,
        temperatura8:temperatura8,temperatura9:temperatura9,temperatura10:temperatura10,temperatura11:temperatura11,
        tratamiento1:tratamiento1,tratamiento2:tratamiento2}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_nacimientos');
        }
    })
}

exports.update7 = (req,res)=>{
    const id = req.body.id;
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const fechaparto = req.body.fechaparto;
    const noparto = req.body.noparto;
    const temperatura1 = req.body.temperatura1;
    const temperatura2 = req.body.temperatura2;
    const temperatura3 = req.body.temperatura3;
    const temperatura4 = req.body.temperatura4;
    const temperatura5= req.body.temperatura5;
    const temperatura6 = req.body.temperatura6;
    const temperatura7 = req.body.temperatura7;
    const temperatura8 = req.body.temperatura8;
    const temperatura9 = req.body.temperatura9;
    const temperatura10 = req.body.temperatura10;
    const temperatura11 = req.body.temperatura11;
    const tratamiento1 = req.body.tratamiento1;
    const tratamiento2 = req.body.tratamiento2;
    conexion.query('UPDATE temperaturacerda SET ? WHERE id = ?',[{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,temperatura1:temperatura1,temperatura2:temperatura2,temperatura3:temperatura3,
        temperatura4:temperatura4,temperatura5:temperatura5,temperatura6:temperatura6,temperatura7:temperatura7,
        temperatura8:temperatura8,temperatura9:temperatura9,temperatura10:temperatura10,temperatura11:temperatura11,
        tratamiento1:tratamiento1,tratamiento2:tratamiento2}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_temperatura_cerda');
        }
    })
}

