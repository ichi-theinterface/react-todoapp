import React, { useState, useEffect } from 'react';
import "./DashBoard.css";
import Header from "../components/Header";
import ToDoList from '../components/ToDoList';
import CreateTaskModal from '../components/CreateTaskModal';

function DashBoard() {
  // Tasks are stored as an array of objects
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // make sure this functtion trigger the call back function to update the state of tasks upon execution.
  const fetchTasks = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
    };
  
    try {
      const response = await fetch('http://127.0.0.1/api/tasks/?format=json', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
      };
  
      try {
        const response = await fetch('http://127.0.0.1/api/user-groups/', requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
  
    fetchGroups();
  }, []);
  

  const toggleModal = () => {
    const isClosingModal = isModalOpen; // Check if modal is currently open
    setModalOpen(!isModalOpen); // Toggle the modal state

    if (isClosingModal) {
      fetchTasks(); // Fetch tasks only if the modal is being closed
    }
  };

  const handleGroupButtonClick = async (group) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    };
  
    const url = new URL('http://127.0.0.1/api/groups-tasks/');
    url.searchParams.append('group', group);
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="dashboard-frame">
          <div className="login-prompt">
            <h2>You need to be logged in to use the dashboard</h2>
            <p>Please <a href="/signin">sign in</a> to continue.</p>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Header />
        <div className="dashboard-frame">
          <div className="taskgroup-container">
            <h2>Groups UI</h2>
            <ul>
              {groups.map((group, index) => (
                <li key={index}>
                  <button onClick={() => handleGroupButtonClick(group)}>
                    {group}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='todolist-container'>
            <h1 className='dashboard-heaer-date'>Today's Date: {new Date().toLocaleDateString()}</h1>
            <h1 className="todolist-header">List of To-Do</h1>
            <h1 className="todolist-header">Create and Edit Task.</h1>
            <button className='dashboard-heaer-add-task-button' onClick={toggleModal}>Create Task</button>
            <CreateTaskModal isOpen={isModalOpen} onClose={toggleModal} />
            <ToDoList tasks={tasks} onModalClose={fetchTasks} updateTasks={fetchTasks} />
          </div>
        </div>
    </div>
  );
}

export default DashBoard;
