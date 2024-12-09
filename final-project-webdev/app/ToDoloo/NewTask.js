import React, { useState } from 'react';

const NewTask = ({ onAddItem }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);

        if (!title.trim()) {
            setError(true);
            return;
        }

        const newTask = {
            title,
            description,
            dueDate,
            completed: false,
        };

        onAddItem(newTask);

        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <div className="mb-1 p-4">
            <form className="bg-gray-800 p-2 rounded w-fit" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mb-2">
                        Please fill out the Task Title field.
                    </div>
                )}

                <div className="mb-2 relative">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        className="w-80 bg-gray-700 text-white p-2 rounded"
                    />
                </div>

                <div className="mb-2">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description (Optional)"
                        className="w-80 bg-gray-700 text-white p-2 rounded"
                    />
                </div>

                <div className="mb-2">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-80 bg-gray-700 text-white p-2 rounded"
                    />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default NewTask;