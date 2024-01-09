import React, { useState, useEffect } from 'react';
import { listFolder } from '../utilities/apiService';
import './CreateTaskModal.css'

const CreateTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState('');
    

    const handleCreate = () => {
        if (!title.trim()) {
          alert("Error: Title cannot be empty.");
          return;
        } else if (!description.trim()) {
          alert("Error: Description cannot be empty.");
          return;
        }

        const taskData = {
            title: title,
            description: description,
            folder: selectedFolderId,
        };

        console.log("Creating task with Title:", title, "Description:", description);
        
        // make sure this functtion trigger the call back function to update the state of tasks upon execution.
        fetch('http://127.0.0.1/api/task/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) {
                // need to add more error handing.
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created successfully:', data);
            setTitle('');
            setDescription('');
            setSelectedFolderId('');
            onClose();
        })
        .catch(error => {
            console.error('Error creating task:', error);
        }); 

        setTitle('');
        setDescription('');
        setSelectedFolderId('');
        onClose();
    };
    
    // Folder related codes below
    useEffect(() => {
      const fetchFolders = async () => {
        try {
          const folderList = await listFolder();
          setFolders(folderList);
          if (folderList.length > 0) {
            setSelectedFolderId(folderList[0].id); // Set default folder ID
          }
        } catch (error) {
          console.error('Failed to fetch folders:', error);
        }
      };

      fetchFolders();
    }, []);

    const handleFolderChange = (e) => {
      setSelectedFolderId(e.target.value);
    };
    
    if (!isOpen) return null;
  
    return (
      <div className="modal-CreateTask-overlay">
        <div className="modal-CreateTask">
          <h2>Create Task</h2>
          <div className="content">
            <label>
              Title:
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <label>
              Folder:
              <select value={selectedFolderId} onChange={handleFolderChange}>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="actions">
            <button onClick={onClose}>Close</button>
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
    );
};

export default CreateTaskModal;
