import React, { useState,useEffect } from "react";
import "./Home.css"

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

        useEffect(()=>{
            const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(storedTasks)
        }, []);

        useEffect(()=> {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },[tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim() === "") return;

        const newTaskItem = {
            index: Date.now(),
            text: newTask,
            completed: false,
        }
        setTasks([...tasks, newTaskItem]);

        setNewTask("");
        
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

    return (
        <div className="home-container">
            <h1>TaskFlow Dashboard</h1>

                <form className="input-section" onSubmit={addTask}>
            <input type="text"
                    value={newTask}
                    placeholder="Enter a new task"
                    onChange={(e) => setNewTask(e.target.value)}/>

                    <button type="submit">Add Task</button>

                    </form>

                    <div className="task-list">
                        {tasks.length === 0 ? (
                            <p>No tasks yet. Add your first task above!</p>
                        ) : (
                            tasks.map((task) => (
                                <div key={task.index} className="task-item">
                                    <span
                                        style={{
                                            textDecoration:task.completed ? "line-through" : "none",
                                            color: task.completed ? "gray" : "black",
                                        }}>
                                            {task.text}
                                        </span>

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