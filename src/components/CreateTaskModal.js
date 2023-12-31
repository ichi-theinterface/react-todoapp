import React, { useState } from 'react';

import './CreateTaskModal.css'

const CreateTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleCreate = () => {
        if (!title.trim()) {
            alert("Error: Title cannot be empty.");
            return;
        }
        console.log("Creating task with Title:", title, "Description:", description);
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
