import React, { useState,useEffect } from "react";
import "./Home.css"

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [category, setCategory] = useState("")
    const [dueDate, setDueDate] = useState("")

        useEffect(()=>{
            const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(storedTasks)
        }, []);

        useEffect(()=> {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },[tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim() === "" || category.trim() === "" || dueDate.trim() === "") 
            return alert("Please fill all fields!");

        const newTaskItem = {
            index: Date.now(),
            text: newTask,
            category,
            dueDate,
            completed: false,
        }
        setTasks([...tasks, newTaskItem]);
        setNewTask("");
        setCategory("")
        setDueDate("")
        
    };

    const toggleTask = (index) => {
        const updatedTasks = tasks.map((task) =>
        task.index === index ? { ...task, completed: !task.completed } : task
        )
        setTasks(updatedTasks);
    }

    const deleteTask = (index) => {
        const filteredTasks = tasks.filter((task) => task.index !== index )
        setTasks(filteredTasks);
    };

    const clearAll = () => {
        if (window.confirm("Are you sure you want to clear all tasks?")) {
            setTasks([]);
        }
    }

    return (
        <div className="home-container">
            <h1>TaskFlow Dashboard</h1>

                <form className="input-section" onSubmit={addTask}>
            <input type="text"
                    value={newTask}
                    placeholder="Enter a new task"
                    onChange={(e) => setNewTask(e.target.value)}/>

                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>

                            <option value="">Select category</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Study">Select category</option>
                            <option value="Other">Other</option>

                            </select>

                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>

                    <button type="submit">Add Task</button>

                    </form>

                    {tasks.length > 0 && (
                        <button className="clear-all" onClick={clearAll}>
                            Clear All Tasks
                        </button>
                    )}

                    <div className="task-list">
                        {tasks.length === 0 ? (
                            <p>No tasks yet. Add your first task above!</p>
                        ) : (
                            tasks.map((task) => (
                                <div key={task.index} className={`task-item ${task.completed ? 
                                            "completed" : ""}`}>

                                <div className="task-info">
                                    <h3>{task.text}</h3>
                                    <p>
                                        <strong>Category:</strong> {task.category}
                                    </p>
                                    <p>
                                        <strong>Due:</strong> {task.dueDate}
                                    </p>
                                </div>
                                            
                                        

                                <div className="task-buttons">
                                    <button
                                    className="complete-btn"
                                    type="button"
                                    onClick={() => toggleTask(task.index)}>
                                        {task.completed ? "undo" : "complete"}
                                    </button>
                                    <button
                                    className="delete-btn"
                                    type="button"
                                    onClick={() => deleteTask(task.index)}>Delete</button>
                                </div>
                                </div>
                            ))
                        )}
                            </div>
                    </div>
    )
}


export default Home