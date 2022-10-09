import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Register = () => {

   

    const { udata, setUdata } = useContext(adddata);

    const history = useNavigate();


    const [inpval, setINP] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        direccion: "",
        telefono: ""
      
    })

    const setdata = (e) => {
        //console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { nombre, apellido, cedula, direccion, telefono } = inpval;


        if (nombre == "") {
            alert("nombre is required")
        } else if (apellido == "") {
            alert("apellido is required")
        }  else if (cedula == "") {
            alert("cedula is required")
        } else if (direccion == "") {
            alert("direccion is required")
        } else if (telefono == "") {
            alert("telefono is required")
        }  else {

            const res = await fetch("http://localhost:4000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre, apellido, cedula, direccion, telefono
                })
            });

            const data = await res.json();
            //console.log(data);

            if (res.status === 422 || !data) {
                //console.log("error ");
                alert("error");

            } else {
                MySwal.fire({
                    title: <strong>Empleado Registrado</strong>,
                    html: <i></i>,
                    icon: 'success'
                  })
                history("/")
                //alert("Empleado ingresado");
                setUdata(data)
                //console.log("data added");

            }
        }

    }

    return (
        <div className="container">
            {/* <NavLink to="/">home</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputapellido1" class="form-label">Nombre</label>
                        <input type="text" value={inpval.nombre} onChange={setdata} name="nombre" class="form-control" id="exampleInputapellido1" aria-describedby="apellidoHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">apellido</label>
                        <input type="apellido" value={inpval.apellido} onChange={setdata} name="apellido" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">cedula</label>
                        <input type="text" value={inpval.cedula} onChange={setdata} name="cedula" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">direccion</label>
                        <input type="text" value={inpval.direccion} onChange={setdata} name="direccion" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">telefono</label>
                        <input type="text" value={inpval.telefono} onChange={setdata} name="telefono" class="form-control" id="exampleInputPassword1" />
                    </div>
                   
                

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
            
        </div>
    )
}
export default Register;