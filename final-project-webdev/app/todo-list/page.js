"use client";
import { useUserAuth } from "../ToDoloo/_utils/auth-context";
import { useState, useEffect } from 'react';
import NewTask from '../ToDoloo/NewTask.js';
import TaskList from '../ToDoloo/TaskList.js';
import { useRouter } from 'next/navigation';
import { getTasks, addTask, deleteTask, updateTask } from '../ToDoloo/_services/task-service';
import { signOut } from 'firebase/auth';
import { auth } from '../ToDoloo/_utils/firebase';

const ToDoListPage = () => {
    const { user, loading } = useUserAuth() || {};
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadTasks = async () => {
            if (user && isMounted) {
                try {
                    setLoadingTasks(true);
                    const userTasks = await getTasks(user.uid);
                    if (isMounted) {
                        setTasks(userTasks);
                    }
                } catch (error) {
                    console.error("Error loading tasks:", error);
                } finally {
                    if (isMounted) {
                        setLoadingTasks(false);
                    }
                }
            }
        };

        if (!user && !loading) {
            router.push('/');
        } else if (user) {
            loadTasks();
        }

        return () => {
            isMounted = false;
        };
    }, [user, loading, router]);

    const handleAddTask = async (newTask) => {
        if (user) {
            try {
                const taskWithUserId = { ...newTask, userId: user.uid };
                const newTaskId = await addTask(user.uid, taskWithUserId);
                setTasks([...tasks, { ...taskWithUserId, id: newTaskId }]);
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (user) {
            try {
                await deleteTask(user.uid, taskId);
                setTasks(tasks.filter((task) => task.id !== taskId));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleToggleComplete = async (taskId) => {
        if (user) {
            try {
                const taskToUpdate = tasks.find((task) => task.id === taskId);
                if (taskToUpdate) {
                    await updateTask(user.uid, taskId, { ...taskToUpdate, completed: !taskToUpdate.completed });
                    loadTasks();
                }
            } catch (error) {
                console.error("Error toggling task completion:", error);
            }
        }
    };

    const handleSort = (field) => {
        setSortBy(field);
        const sortedTasks = [...tasks].sort((a, b) => {
            if (field === 'priority') {
                return b.priority - a.priority;
            } else if (field === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else {
                return 0;
            }
        });
        setTasks(sortedTasks);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return <div>Authenticating...</div>;
    }

    if (!user) {
        return <p>Please sign in to view your tasks.</p>;
    }

    if (loadingTasks) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className="p-4 bg-navy-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-amber-500">ToDoloo</h1>
            <NewTask onAddItem={handleAddTask} />
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => handleSort('priority')}
                    className={`py-2 px-4 rounded font-bold ${sortBy === 'priority' ? 'bg-amber-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    Priority
                </button>
                <button
                    onClick={() => handleSort('dueDate')}
                    className={`py-2 px-4 rounded font-bold ${sortBy === 'dueDate' ? 'bg-amber-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    Due Date
                </button>
            </div>

            <button onClick={handleSignOut} className="py-2 px-4 rounded font-bold bg-red-500 hover:bg-red-700">
                Sign Out
            </button>

            <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
};

export default ToDoListPage;
