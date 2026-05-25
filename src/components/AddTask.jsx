import React, { useState } from "react";
import "../style/addTask.css";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [taskData, setTaskData] = useState({});

  let navigate = useNavigate()
  const handleAddTask = async () => {
    // console.log(taskData);
    let result = await fetch("https://todo-backend-zbej.onrender.com/add-task",{
  method:"POST",

  body:JSON.stringify(taskData),

  headers:{
    "Content-Type":"application/json",
    authorization: localStorage.getItem("token")
  }
})
  result = await result.json()
  if(result.success){
    navigate('/')
    // console.log("New Task Added");
    
  }else{
    alert("Failed to add task")
  }

  };

  return (
    <>
      <div className="container">
        <h1>Add New Task</h1>

        <label htmlFor="">Title</label>
        <input
          onChange={(event) =>
            setTaskData({ ...taskData, title: event.target.value })
          }
          type="text"
          name="title"
          placeholder="Enter task title "
        />
        <label htmlFor="">Description</label>
        <textarea
          onChange={(event) =>
            setTaskData({ ...taskData, description: event.target.value })
          }
          rows={4}
          name="description"
          id=""
          placeholder="Enter task description"
        ></textarea>
        <button onClick={handleAddTask} id="btn">
          Add Task
        </button>
      </div>
    </>
  );
}

export default AddTask;
