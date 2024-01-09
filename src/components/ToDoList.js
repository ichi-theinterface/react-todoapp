import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import "./ToDoList.css";

const ToDoList = ({ tasks, updateTasks, onModalClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    updateTasks(updatedTasks); // Update the tasks in the parent component
  };

  const toggleModal = (task = null) => {
    if (isModalOpen && onModalClose) {
      onModalClose(); // Call the callback when the modal is already open and is about to close
    }

    setSelectedTask(task); // Set the selected task
    setModalOpen(!isModalOpen); // Toggle the modal state
  };

  const handleDelete = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    }

    fetch(`http://localhost/api/task/delete/${task.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Task deleted successfully');
        const updatedTasks = tasks.filter(task => task.id !== task.id);
        updateTasks(updatedTasks); // Pass the updated tasks array to the parent component
        // Update the tasks state to reflect the deletion
        // const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
        // updateTasks(updatedTasks); // Pass the updated tasks array to the parent component
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    }); 
  };

  return (
    <div className="todolist-content">
      {tasks.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="todolist-card">
            <h3>{task.title}</h3>
            <button onClick={() => toggleModal(task)}>Edit Task</button>
            <button onClick={() => handleDelete(task)}>Delete Task</button>
          </div>
        ))
      )}
      {selectedTask && (
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => toggleModal()}
          task={selectedTask}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ToDoList;

