import React, { useState,useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { text: newTask, completed:false}]);

        setNewTask("");
        
    };

    const toggleComplete = (index) => {
        const updated = tasks.map((task,i) =>
        i === index ? { ...task, completed: !task.completed } : task
        )
        setTasks(updated);
    }

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
        useEffect(()=>{
            const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(storedTasks)
        }, []);

        useEffect(()=> {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },[tasks]);
    return (
        <div className="home">
            <h1>TaskFlow Dashboard</h1>

            <input type="text"
                    value={newTask}
                    placeholder="Enter a new task"
                    onChange={(e) => setNewTask(e.target.value)}/>

                    <button onClick={addTask}>Add Task</button>

                    <ul>
                        {tasks.map((task, i) => (
                            <li key={i}>
                                <span onClick={() => toggleComplete(i)}>
                                    {task.text}
                                </span>
                                <button onClick={() => deleteTask(i)}>❌</button>
                            </li>
                        ))}
                    </ul>
        </div>
    )
}


export default Home