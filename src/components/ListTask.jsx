import React, { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
function ListTask() {
  const [taskData, setTaskData] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  useEffect(() => {
    getListData();

  }, []);
  
  const getListData = async () => {
    let list = await fetch("https://todo-backend-zbej.onrender.com/tasks",{
      credentials:"include"
    });

    list = await list.json();
    // console.log(list);

    if (list.success) {
      setTaskData(list.result);
    }else{
      alert("Failed to fetch tasks")
    }
  };

  const deleteTask = async (id) => {
    let deleteItem = await fetch("https://todo-backend-zbej.onrender.com/delete/" + id, {
      method: "delete",
       credentials:"include",
    });

    deleteItem = await deleteItem.json();

    if (deleteItem.success) {
      await getListData();
    }else{
      alert("Failed to delete task")
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTasks(items);
    } else {
      setSelectedTasks([]);
    }
    console.log(selectedTasks);
  };

  const selectSingleItem = (id)=>{
  console.log(id);
  if(selectedTasks.includes(id)){
    let items = selectedTasks.filter((item)=> item !== id);
    setSelectedTasks(items);
  }else{
    setSelectedTasks([...selectedTasks,id])
  }
}

const deleteMultiple = async()=>{
  let deleteItem = await fetch("https://todo-backend-zbej.onrender.com/delete-multiple",{
    method:"delete",
    credentials:"include",
    body: JSON.stringify(selectedTasks),
    headers:{
      "Content-type":"application/json"
    }
  })

  deleteItem = await deleteItem.json();

  if(deleteItem.success){
    await getListData();
    setSelectedTasks([]);
  } else {
    alert("Failed to delete tasks")
  }
  
}


  return (
    <>
      <div>
        <h1>Todo App</h1>
        <button onClick={deleteMultiple} className="delete-btn delete-many" >Delete</button>
        <ul className="task-list">
          <li className="list-head">
            <input onChange={selectAll} type="checkbox" />
          </li>
          <li className="list-head">S.No</li>
          <li className="list-head">Title</li>
          <li className="list-head">Description</li>
          <li className="list-head">Action</li>
          {taskData &&
            taskData.map((item, index) => (
              <Fragment key={item._id}>
                <li className="list-item">
                  <input
                    onChange={() => selectSingleItem(item._id)}
                    checked={selectedTasks.includes(item._id)}
                    type="checkbox"
                  />
                </li>
                <li className="list-item">{index + 1}</li>
                <li className="list-item">{item.title}</li>
                <li className="list-item">{item.description}</li>
                <li className="list-item">
                  <button onClick={() => deleteTask(item._id)} className="delete-btn">
                    Delete
                  </button>
                  <Link id="update-btn" to={`/update/${item._id}`}>
                    Update
                  </Link>
                </li>
              </Fragment>
            ))}
        </ul>
      </div>
    </>
  );
}

export default ListTask;
