const conexion = require ('../Base_de_Datos/db');

exports.save8 = (req,res)=>{
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const noparto = req.body.noparto;
    const fechaparto = req.body.fechaparto;
    const causa1 = req.body.causa1;
    const causa2 = req.body.causa2;
    const causa3 = req.body.causa3;
    const causa4 = req.body.causa4;
    
   
   
    conexion.query('INSERT INTO muertelechones SET ?',{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,causa1:causa1,causa2:causa2,causa3:causa3,causa4:causa4}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_ingreso_nacimientos');
        }
    })
}

exports.update8 = (req,res)=>{
    const id = req.body.id;
    const aretecerda = req.body.aretecerda;
    const nomcerda = req.body.nomcerda;
    const noparto = req.body.noparto;
    const fechaparto = req.body.fechaparto;
    const causa1 = req.body.causa1;
    const causa2 = req.body.causa2;
    const causa3 = req.body.causa3;
    const causa4 = req.body.causa4;
    conexion.query('UPDATE muertelechones SET ? WHERE id = ?',[{aretecerda:aretecerda,nomcerda:nomcerda,fechaparto:fechaparto,
        noparto:noparto,causa1:causa1,causa2:causa2,causa3:causa3,causa4:causa4}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('menu_muertes_lechones');
        }
    })
}

