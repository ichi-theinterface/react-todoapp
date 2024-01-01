import React, { useState } from 'react';
import './CreateTaskModal.css'

const CreateTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleCreate = () => {
        if (!title.trim()) {
          alert("Error: Title cannot be empty.");
          return; // Stop the function execution if title is empty
        } else if (!description.trim()) {
          alert("Error: Description cannot be empty.");
          return; // Stop the function execution if description is empty
        }

        // Prepare the task data
        const taskData = {
            title: title,
            description: description,
        };

        console.log("Creating task with Title:", title, "Description:", description);

        // Post the task to Django
        fetch('http://localhost/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // authorization information can be added here.
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) {
                // Handle response errors
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created successfully:', data);
            // Reset the form fields
            setTitle('');
            setDescription('');
            onClose(); // Close modal after task creation
        })
        .catch(error => {
            console.error('Error creating task:', error);
        }); 

        setTitle('');
        setDescription('');
        onClose(); // Close modal after task creation
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
