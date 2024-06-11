import axios from 'axios'

import React, { Component, useEffect, useState } from 'react'


export default function Table(props) {
    const [data,setData]=useState([])
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const[type,setType]=useState('')
    const [editId,setEditId]=useState(-1)
    let statusValue=props.statusValue;
    console.log(statusValue);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000').then(
            function(res){
                console.log(res.data);
                setData(res.data);
            }
        ).catch(er=>console.log(er))
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000',{name:name,age:type,city:price,country:"shakokako"})
        .then(
            axios.get('http://127.0.0.1:8000').then(
                function(res){
                    console.log(res.data);
                    setData(res.data);
                }
            ).catch(er=>console.log(er))

        )
        .catch(er=>console.log(er))
    }
    const handleEdit=(id)=>{
        console.log(id)
        setEditId(id)

    }

    const handleUpdate=()=>{

      axios.post(`http://127.0.0.1:8000/update/${editId}`,{name:name,age:type,city:price,country:"shakokako"}).
      then(res=>{
        axios.get('http://127.0.0.1:8000').then(
                function(res){
                    console.log(res.data);
                    setData(res.data);
                }
            ).catch(er=>console.log(er))
        
        setEditId(-1);
      }).catch(err=>console.log(err));
    }

    const handleDelete=(id)=>{
        axios.post(`http://127.0.0.1:8000/delete/${id}`).
        then(res=>{
            console.log(res);
            console.log("Deletation Complete");

            axios.get('http://127.0.0.1:8000').then(
                function(res){
                    console.log(res.data);
                    setData(res.data);
                }
            ).catch(er=>console.log(er))


        }).
        catch(er=>console.log(er));
    }
    if(statusValue===1){

        return (
   
            <div>
                <div className='container mt-2'>
                    <h4 >Add Medicine</h4>
                    <div className='form-div'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Enter Name'onChange={e=>setName(e.target.value)}/>
                            <input type="text" placeholder='Medicine Type' onChange={e=>setPrice(e.target.value)}/>
                            <input type="text" placeholder='Price' onChange={e=>setType(e.target.value)}/>
                            <button className='btn btn-primary'>Add</button>
        
                        </form>
                    </div>
        
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Medicine Type</th>
                            <th scope="col">Price</th>
            
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                             data.map((user,index)=>(
                                user.id===editId ?
                                <tr key={index}>
        
                                    <td><input type='text' placeholder={user.name} onChange={e=>setName(e.target.value)}/></td>
                                    <td><input type='text' placeholder={user.age} onChange={e=>setType(e.target.value)}/></td>
                                    <td><input type='text' placeholder={user.city} onChange={e=>setPrice(e.target.value)}/></td>
                                    <td>
                                        <button className='btn btn-primary'onClick={handleUpdate}>Update</button>
                                    </td>
        
                                </tr>
                                :
                                <tr key={index}>
        
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.city}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={()=>handleDelete(user.id)}>Delete</button>
                                        <button className='btn btn-primary'onClick={()=>handleEdit(user.id)}>Edit</button>
                                    </td>
        
                                </tr>
                             ))
            
        
                        }
        
                       
                    </tbody>
                </table>
        
        
            </div>
          )
      




    }
    else{

        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Medicine Type</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                             data.map((user,index)=>(
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.city}</td>
        
                                </tr>
                             ))
            
        
                        }
        
                       
                    </tbody>
                </table>
        
        
            </div>
          )

      



    }
 
}




