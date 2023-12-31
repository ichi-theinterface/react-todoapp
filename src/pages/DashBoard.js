import React, { useState, useEffect } from 'react';
import "./DashBoard.css";
import Header from "../components/Header"
import CreateTaskModal from '../components/CreateTaskModal';

function DashBoard() {
  // Assuming tasks are stored as an array of objects
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1/api/tasks/?format=json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data); // Assuming the response is the array of tasks
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);


  return (
    <div>
        <Header />
        <div className="dashboard-frame">
          <div className='dashboard-heaer-frame'>
            <h1 className='dashboard-heaer-date'>Today's Date: {new Date().toLocaleDateString()}</h1>
            <button className='dashboard-heaer-add-task-button' onClick={toggleModal}>Add Task</button>
            <CreateTaskModal isOpen={isModalOpen} onClose={toggleModal} />
          </div>
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
