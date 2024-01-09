import React, { useState } from 'react';
import './AddFolderModal.css'

const AddFolderModal = ({ isOpen, onClose, onFetchFolders }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleCreate = () => {
        if (!name.trim()) {
          alert("Error: Name cannot be empty.");
          return;
        } else if (!description.trim()) {
          alert("Error: Description cannot be empty.");
          return;
        }

        const folderData = {
            name: name,
            description: description,
        };

        console.log("Creating task with Name:", name, "Description:", description);
        
        // make sure this functtion trigger the call back function to update the state of tasks upon execution.
        fetch('http://127.0.0.1/api/folder/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(folderData),
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
            setName('');
            setDescription('');
            onClose();
            onFetchFolders();
        })
        .catch(error => {
            console.error('Error creating task:', error);
        }); 

        setName('');
        setDescription('');
        onClose();
        onFetchFolders();
    };
    
    if (!isOpen) return null;
  
    return (
      <div className="modal-CreateTask-overlay">
        <div className="modal-CreateTask">
          <h2>Create Folder</h2>
          <div className="content">
            <label>
              Name of Folder:
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={onClose}>Close</button>
            <button onClick={handleCreate}>Create Folder</button>
          </div>
        </div>
      </div>
    );
};

export default AddFolderModal;
