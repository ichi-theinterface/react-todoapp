import React, { useState, useEffect } from 'react';
import "./DashBoard.css";
import Header from "../components/Header";
import ToDoList from '../components/ToDoList';
import CreateTaskModal from '../components/CreateTaskModal';

function DashBoard() {
  // Tasks are stored as an array of objects
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1/api/tasks/?format=json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data); // Update tasks state with fetched data
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleModal = () => {
    const isClosingModal = isModalOpen; // Check if modal is currently open
    setModalOpen(!isModalOpen); // Toggle the modal state

    if (isClosingModal) {
      fetchTasks(); // Fetch tasks only if the modal is being closed
    }
  };


  return (
    <div>
        <Header />
        <div className="dashboard-frame">
          <div className='dashboard-heaer-frame'>
            <h1 className='dashboard-heaer-date'>Today's Date: {new Date().toLocaleDateString()}</h1>
            <button className='dashboard-heaer-add-task-button' onClick={toggleModal}>Create Task</button>
            <CreateTaskModal isOpen={isModalOpen} onClose={toggleModal} />
          </div>
          <div className='todolist-container'>
            <h1 className="todolist-header">List of To-Do</h1>
            <ToDoList tasks={tasks} onModalClose={fetchTasks} />
          </div>
        </div>
    </div>
  );
}

export default DashBoard;
