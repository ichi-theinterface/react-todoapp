import React, { useState, useEffect } from 'react';
import "./DashBoard.css";
import Header from "../components/Header";
import ToDoList from '../components/ToDoList';
import CreateTaskModal from '../components/CreateTaskModal';
import AddFolderModal from '../components/AddFolderModal';

function DashBoard() {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFolderSelected, setIsFolderSelected] = useState(false);
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    fetchTasks();
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    };
    try {
      const response = await fetch('http://127.0.0.1/api/folder/list/', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

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
      const response = await fetch('http://127.0.0.1/api/task/list-all', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const fetchTasksFolder = async (folderId) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    };
  
    try {
      const response = await fetch(`http://127.0.0.1/api/task/list/${folderId}/`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteFolder = async (folderId) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) {
      return;
    }
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    };
    try {
      const response = await fetch(`http://127.0.0.1/api/folder/delete/${folderId}/`, requestOptions);
      if (response.ok) {
      } else {
        console.error('Failed to delete tasks');
      }
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }

    fetchFolders();
  };

  const toggleModal = () => {
    const isClosingModal = isModalOpen; // Check if modal is currently open
    setModalOpen(!isModalOpen); // Toggle the modal state

    if (isClosingModal) {
      fetchTasks(); // Fetch tasks only if the modal is being closed
    }
  };

  const toggleAddFolderModal = () => {
    setAddFolderModalOpen(!isAddFolderModalOpen);
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
            <h2>Folders</h2>
            <button className="taskgroup-addbutton" onClick={toggleAddFolderModal}>Add Folder</button>
            <AddFolderModal isOpen={isAddFolderModalOpen} onClose={toggleAddFolderModal} onFetchFolders={fetchFolders}/>
            <ul>
              {folders.map((folder, index) => (
                <li key={index}>
                  <div className='folder-button'>
                    <button 
                      className="taskgroup-folderbutton" 
                      onClick={() => {
                        setIsFolderSelected(true);
                        fetchTasksFolder(folder.id);
                      }}
                    >
                      {folder.name}
                    </button>
                    <button 
                      className='taskgroup-deletebutton'
                      onClick={() => {deleteFolder(folder.id)}}>
                      delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='todolist-container'>
            <h1 className='dashboard-heaer-date'>Today's Date: {new Date().toLocaleDateString()}</h1>
            <h1 className="todolist-header">What are you working on?</h1>
            <button className='dashboard-heaer-add-task-button' onClick={toggleModal}>Create Task</button>
            <CreateTaskModal isOpen={isModalOpen} onClose={toggleModal} />
            {isFolderSelected === false ?
              (<p>Please select a folder</p>) :
              (<ToDoList tasks={tasks} onModalClose={fetchTasks} updateTasks={fetchTasks} />)
            }
          </div>
        </div>
    </div>
  );
}

export default DashBoard;
