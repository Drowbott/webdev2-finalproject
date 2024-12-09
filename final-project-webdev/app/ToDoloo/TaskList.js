import React, { useState } from 'react';
import Task from './Task.js';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
    const [sortBy, setSortBy] = useState('title');

    let sortedTasks = [...tasks];

    switch (sortBy) {
        case 'title':
            sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'dueDate':
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
    }

    return (
        <div>
            <div className="flex space-x-4 mb-4 pl-8">
                <p>Sort by:</p>
                <button
                    onClick={() => setSortBy('title')}
                    className={`bg-${sortBy === 'title' ? 'blue-500' : 'gray-600'} text-white font-medium py-1 px-2 rounded hover:bg-blue-700`}
                >
                    Title
                </button>
                <button
                    onClick={() => setSortBy('dueDate')}
                    className={`bg-${sortBy === 'dueDate' ? 'blue-500' : 'gray-600'} text-white font-medium py-1 px-2 rounded hover:bg-blue-700`}
                >
                    Due Date
                </button>
            </div>
            <ul>
                {sortedTasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;