import React, { useState, useEffect } from 'react';
import "./DashBoard.css";
import Header from "../components/Header"

function DashBoard() {
  // Assuming tasks are stored as an array of objects
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend API
    // setTasks(fetchedTasks);
  }, []);

  return (
    <div>
        <Header />
        <div className="dashboard-frame">
          <div className='todolist-container'>
              <h1 className="todolist-header">List of To-Do</h1>
              <div className="todolist-content">
                {tasks.length === 0 ? (
                  <p>No tasks to show</p>
                ) : (
                  tasks.map((task, index) => (
                    <div key={index} className="task">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      {/* add more task details here */}
                    </div>
                  ))
                )}
              </div>
          </div>
        </div>
    </div>
  );
}

export default DashBoard;
