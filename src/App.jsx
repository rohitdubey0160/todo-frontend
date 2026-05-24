import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import ListTask from './components/ListTask'
import UpdateTask from './components/UpdateTask'
import SingUp from './components/SingUp'
import Login from "./components/Login"
import Protected from './components/Protected'
function App() {
  
  return (
    <>
    <Navbar/>
   
    <Routes>
      <Route path='/' element={<Protected><ListTask/></Protected>}/>

       <Route path='/add' element={<Protected><AddTask/></Protected>}/>
       <Route path='/update/:id' element ={<UpdateTask/>}/>
       <Route path='/signup' element={<SingUp/>}/>
       <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
