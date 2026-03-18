import { useState, useEffect } from 'react';



export function useTasks() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('task');

        if (saved) {
            return JSON.parse(saved);
        }

        return []
    });

    const [userInput, setUserInput] = useState('');
    const [startAddingTasks, setStartAddingTasks] = useState(false);
    const [applyFilter, setFilter] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [editInput, setEditInput] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');
    const [sortBy, setSortBy] = useState('priority');

    useEffect(() => {

        localStorage.setItem('task', JSON.stringify(tasks));

    }, [tasks])

    function startEdit(id, title, priority, dueFor) {
        setEditingId(id);
        setEditInput(title);
        setPriority(priority);
        setDueDate(dueFor);

    }

    function saveEdit() {
        const updateTask = tasks.map(task =>

            task.id === editingId ? { ...task, title: editInput, priority: priority, due: dueDate } : task
        );

        setTasks(updateTask);
        setEditInput('');
        setPriority('Low');
        setDueDate('');
        setEditingId(null);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditInput('');
    }

    function convertDate(dueDate) {
        if (dueDate === '') {
            return '';
        }
        else {
            return new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }
    }

    function addTask() {

        if (userInput === '') return;


        const newTask = {
            id: Date.now(),
            title: userInput,
            priority: priority,
            completed: false,
            due: dueDate
        }

        setTasks([...tasks, newTask]);
        setUserInput('');
    }

    function toggleComplete(id) {
        setTasks(tasks.map((task) => {
            console.log('completed');
            if (task.id === id) {
                return { ...task, completed: !task.completed }
            }
            return task;
        }))
    }


    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return {
        tasks, setTasks,
        userInput, setUserInput,
        startAddingTasks, setStartAddingTasks,
        applyFilter, setFilter,
        editingId, setEditingId,
        editInput, setEditInput,
        priority, setPriority,
        dueDate, setDueDate,
        sortBy, setSortBy,

        startEdit,
        saveEdit,
        cancelEdit,
        addTask,
        toggleComplete,
        deleteTask,
        convertDate


    }

}
