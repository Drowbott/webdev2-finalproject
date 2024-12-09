import React from 'react';

const Task = ({ task, onDeleteTask, onToggleComplete }) => {
    const handleDelete = () => {
        onDeleteTask(task.id);
    };

    const handleToggle = () => {
        onToggleComplete(task.id);
    };

    return (
        <li className="flex items-center justify-between w-96 ml-4 bg-gray-800 text-white rounded-md mb-2 p-2">
            <div className='flex items-center w-full'>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                    className="mr-2"
                />
                <span className={`text-xl font-medium ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                </span>
            </div>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                Delete
            </button>
        </li>
    );
};

export default Task;
