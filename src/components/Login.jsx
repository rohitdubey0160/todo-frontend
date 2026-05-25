import React from 'react'
import { useState ,useEffect} from 'react'
import "../style/addTask.css";
import {Link} from "react-router-dom"
import "../style/App.css"
import {useNavigate} from "react-router-dom"

function Login() {
const [userData, setUserData] = useState()
const navigate =  useNavigate()

useEffect(()=>{
  if(localStorage.getItem("login")){
    navigate("/")
  }
},[])

const handleLogin =async () => {
    console.log(userData);
    let result = await fetch("https://todo-backend-zbej.onrender.com/login",{
      method:"post",
      body:JSON.stringify(userData),
      headers:{
        "Content-Type":"Application/Json"
      }
    })
  result = await result.json()
    if(result.success){
        
        document.cookie =`token= ${result.token}`
        localStorage.setItem('login',userData.email)
        window.dispatchEvent(new Event("localStorage-changed"))
        navigate("/")
     }else{
        alert("Try after some time")
     }

  };

    return (
        <div className="container">
            <h1>Login</h1>

            <label htmlFor="">Email</label>
            <input 
             onChange={(event)=> setUserData({...userData, email: event.target.value})}
             type="email" id="email" name="email" />
            <br />
            <label htmlFor="">Password</label>
            <input 
             onChange={(event)=> setUserData({...userData, password: event.target.value})}
             type="password" id="password" name="password" />
            <br />
            <button id="btn" onClick={handleLogin}>Login</button>
               <Link  className="link" to="/signup">Sign Up</Link>
        </div>

    )
}

export default Login

