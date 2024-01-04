import React, { useState } from 'react';
import './CreateTaskModal.css'

const CreateTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState('');
    
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
            group: group,
        };

        console.log("Creating task with Title:", title, "Description:", description);
        
        // make sure this functtion trigger the call back function to update the state of tasks upon execution.
        fetch('http://localhost/api/tasks/', {
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
            setGroup('');
            onClose();
        })
        .catch(error => {
            console.error('Error creating task:', error);
        }); 

        setTitle('');
        setDescription('');
        setGroup('');
        onClose();
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
              Task Group:
              <input type="text" value={group} onChange={e => setGroup(e.target.value)} />
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
