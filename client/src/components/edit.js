import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const MySwal = withReactContent(Swal)
const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const [getuserdata, setUserdata] = useState([]);
    console.log("tenemos data",getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useNavigate("");

    const [inpval, setINP] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        direccion: "",
        telefono: ""
      
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:4000/emp/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);
     
        if (res.status === 422 || !data) {
            console.log("error ");

         } else {
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const { nombre, apellido, cedula, direccion, telefono } = inpval;

        const res2 = await fetch(`http://localhost:4000/updateEmp/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                nombre, apellido, cedula, direccion, telefono
            })
        });
       
        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("Update empleado");
            
        }else{
            MySwal.fire({
                title: <strong>Empleado Actualizado</strong>,
                html: <i></i>,
                icon: 'success'
              })
            history("/")
            setUPdata(data2);
            alert("Update empleado");
        }

    }

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
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
                   
                

                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}


// const Details = () => {

//     const [getuserdata, setUserdata] = useState([]);
//     console.log(getuserdata);

//     const { id } = useParams("");
//     console.log(id);

//     const history = useNavigate();


//     const getdata = async () => {

//         const res = await fetch(`http://localhost:4000/emp/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         const data = await res.json();
//         console.log("esto s",data);

//         if (res.status === 422 || !data) {
//             console.log("error ");

//         } else {
//             setUserdata(data[0])
//             console.log("get data");
//         }
//     }

//     useEffect(() => {
//         getdata();
//     }, [])

   

//     // return (
//     //     // <div className="container mt-3">
//     //     //     <h1 style={{ fontWeight: 100 }}>Registros de nombre: {getuserdata.nombre}</h1>

//     //     //     <Card sx={{ maxWidth: 600 }}>
//     //     //         <CardContent>
//     //     //             <div className="add_btn">
//     //     //                 <NavLink to={`/edit/${getuserdata.id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
//     //     //                 <button className="btn btn-danger" onClick={() => deleteuser(getuserdata.id)}><DeleteOutlineIcon /></button>
//     //     //             </div>
//     //     //             <div className="row">
//     //     //                 <div className="left_view col-lg-6 col-md-6 col-12">
//     //     //                     {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
//     //     //                     <h3 className="mt-3">nombre: <span >{getuserdata.nombre}</span></h3>
//     //     //                     <h3 className="mt-3">Apellido: <span >{getuserdata.apellido}</span></h3>
//     //     //                     <p className="mt-3">direccion: <span>{getuserdata.direccion}</span></p>
//     //     //                     <p className="mt-3">telefono: <span>{getuserdata.telefono}</span></p>
//     //     //                 </div>
//     //     //                 <div className="right_view  col-lg-6 col-md-6 col-12">

//     //     //                     <p className="mt-5"><PhoneAndroidIcon />mobile: <span>+91 {getuserdata.telefono}</span></p>
//     //     //                     <p className="mt-3"><LocationOnIcon />location: <span>{getuserdata.direccion}</span></p>
//     //     //                     {/* <p className="mt-3">Description: <span>{getuserdata.desc}</span></p> */}
//     //     //                 </div>
//     //     //             </div>

//     //     //         </CardContent>
//     //     //     </Card>
//     //     // </div>
//     // )
// }

export default Edit;