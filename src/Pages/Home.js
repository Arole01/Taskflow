import React, { useState,useEffect } from "react";

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

    const addTask = () => {
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

                <div className="input-section">
            <input type="text"
                    value={newTask}
                    placeholder="Enter a new task"
                    onChange={(e) => setNewTask(e.target.value)}/>

                    <button onClick={addTask}>Add Task</button>

                    </div>

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

                                <div className="task-nuttons">
                                    <button onClick={() => toggleTask(task.id)}>
                                        {task.completed ? "undo" : "complete"}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                                </div>
                            ))
                        )}
                            </div>
                    </div>
    )
}


export default Home