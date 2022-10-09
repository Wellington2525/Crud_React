import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink,useNavigate } from 'react-router-dom'

import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'


//const history = useNavigate();



const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    //console.log(getuserdata);
    const history = useNavigate("");
    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);
    //console.log(updata);
    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {
        
        const res = await fetch("http://localhost:4000/emp", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        //console.log("Este el ",res)
        const data = await res.json();
        //console.log(data);

        if (res.status === 422 || !data) {
            //console.log("error ");

        } else {
            setUserdata(data)
            //console.log("get data");

        }
    }

   

    const deleteemp = async (id) => {

        const res2 = await fetch(`http://localhost:4000/deleteEmp/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        //console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            //console.log("error");
        } else {
            history("/")
            alert("Empleado eliminado");
            
            //console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
            //history("/")
           
        }

    }
    useEffect(() => {
        getdata();
    }, [])

    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Cedula</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Direccion</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.nombre}</td>
                                                <td>{element.apellido}</td>
                                                <td>{element.cedula}</td>
                                                <td>{element.direccion}</td>
                                                <td>{element.telefono}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element.id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element.id}`}><button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    {/* <button className="btn btn-danger" onClick={() => deleteemp(element.id)}><DeleteOutlineIcon /></button> */}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home
