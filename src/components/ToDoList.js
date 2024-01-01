import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import "./ToDoList.css";

const ToDoList = ({ tasks, onModalClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const toggleModal = (task = null) => {
    if (isModalOpen && onModalClose) {
      onModalClose(); // Call the callback when the modal is already open and is about to close
    }
    setSelectedTask(task); // Set the selected task
    setModalOpen(!isModalOpen); // Toggle the modal state
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
          </div>
        ))
      )}
      {selectedTask && (
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => toggleModal()}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default ToDoList;
