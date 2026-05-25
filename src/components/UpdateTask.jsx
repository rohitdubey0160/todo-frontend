import React, { useEffect, useState } from "react";
import "../style/addTask.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
  const [taskData, setTaskData] = useState({});
const navigate = useNavigate();
const {id} = useParams();  
 useEffect(()=>{
getTask(id);

 },[]);

 const getTask = async(id)=>{
  let task = await fetch("https://todo-backend-zbej.onrender.com/task/" + id,{
      credentials:"include"
  });
   task = await task.json();
   if(task.result){
    setTaskData(task.result)
   }
 }

 const updateTask = async()=>{
  console.log("data fetched ",taskData);
  let task = await fetch("https://todo-backend-zbej.onrender.com/update-task",{
    method:"put",
    body:JSON.stringify(taskData),
     credentials:"include",
    headers:{
      "Content-Type":"application/json"
    }
  });

 task = await task.json();

  if(task){
    navigate("/");
  }
 }
  

  return (
    <>
      <div className="container">
        <h1> Update  Task</h1>

        <label htmlFor="">Title</label>
        <input value={taskData?.title}
          onChange={(event) =>
            setTaskData({ ...taskData, title: event.target.value })
          }
          type="text"
          name="title"
          placeholder="Enter task title "
        />
        <label htmlFor="">Description</label>
        <textarea value={taskData?.description}
          onChange={(event) =>
            setTaskData({ ...taskData, description: event.target.value })
          }
          rows={4}
          name="description"
          id=""
          placeholder="Enter task description"
        ></textarea>
        <button id="btn" onClick={updateTask}>
          Update Task
        </button>
        
      </div>
    </>
  );
}

export default UpdateTask;
