import logo from './logo.svg';
import './App.css';
import Table from './Table';
import './assets/css/bootstrap.min.css'
import { useState } from 'react';

function App() {
  const [login,setLogin]=useState('');
  const [pass,setPass]=useState('');
  const [flag,setFlag]=useState(0);
  const handleLogin=()=>{
      if(login=="admin"&&pass=="admin1234"){
        console.log("Hocche vaiya")
          setFlag(1);
         
      }
  }
   

  const handleLogout=()=>{
    setFlag(0);
}
  return (
 <div>
  
  {!flag && <div className='container align-items-center'>
        <h3>Log in</h3>

        <input type="text" placeholeder='Login' onChange={e=>setLogin(e.target.value)}/>
        <input type="password" placeholeder='password' onChange={e=>setPass(e.target.value)}/>
        <button className='btn btn-primary' onClick={handleLogin}>LOGIN</button>
        

    </div>

}
    
  <Table statusValue={flag}/>

  <div class="d-flex justify-content-between align-items-center border p-3">
      <div class="left-corner">
      
      </div>
      <div class="right-corner ml-auto">
      {flag && <button className='btn btn-danger' onClick={handleLogout}>LOGOUT</button>}
      </div>
    </div>
 </div>

  );
}

export default App;
