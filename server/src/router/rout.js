const express = require('express');
const router = express.Router();
const conn = require("../config/conexion");

// router.get('/',(req,res)=>{
//     res.send('Hello word');
// });
//get empleado 
router.get("/emp",(req,res)=>{

    conn.query("SELECT * FROM tblempleados",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});

///create empleado method Pos
router.post("/create",(req,res)=>{
    const {nombre, apellido,cedula,direccion,telefono} = req.body;
    if(!nombre || !apellido ||!cedula||!direccion||!telefono){
        res.status(422).json("Por favor llenar los espacios en blancos")
    }

    try {
        conn.query("SELECT * FROM tblempleados WHERE cedula = ?", cedula, (err, result) => {
            if (result.length) {
                res.status(422).json("Este empleado ya existe")
            } else {
                conn.query("INSERT INTO tblempleados SET ?", { nombre, apellido,cedula,direccion,telefono }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});


router.delete("/deleteEmp/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM tblempleados WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


router.get("/emp/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM tblempleados WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{ 
            res.status(201).json(result);
        }
    })
});

router.patch("/updateEmp/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE tblempleados SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});


module.exports = router;