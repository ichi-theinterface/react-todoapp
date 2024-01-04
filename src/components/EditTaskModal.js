import React, { useState } from 'react';
import './EditTaskModal.css'

const EditTaskModal = ({ isOpen, onClose, task }) => {
    const [editingtitle, setEditingtitle] = useState(task.title);
    const [editingdescription, setEditingDescription] = useState(task.description);
    
    const handleEdit = () => {
        if (!editingtitle.trim()) {
          alert("Error: Title cannot be empty.");
          return;
        } else if (!editingdescription.trim()) {
          alert("Error: Description cannot be empty.");
          return;
        }

        const taskData = {
            id: task.id,
            title: editingtitle,
            description: editingdescription,
        };

        // Update the selected task to Django
        fetch(`http://localhost/api/tasks/${task.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // authorization information can be added here.
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created successfully:', data);
            // Reset the form fields
            setEditingtitle('');
            setEditingDescription('');
            onClose(); // Close modal after task creation
        })
        .catch(error => {
            console.error('Error creating task:', error);
        }); 

        setEditingtitle('');
        setEditingDescription('');
        onClose(); // Close modal after task creation
    };
    
    if (!isOpen) return null;
  
    return (
      <div className="modal-CreateTask-overlay">
        <div className="modal-CreateTask">
          <h2>Edit Task</h2>
          <div className="content">
            <label>
              Title:
              <input type="text" value={editingtitle} onChange={e => setEditingtitle(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={editingdescription} onChange={e => setEditingDescription(e.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={onClose}>Close</button>
            <button onClick={handleEdit}>Update</button>
          </div>
        </div>
      </div>
    );
};

export default EditTaskModal;
