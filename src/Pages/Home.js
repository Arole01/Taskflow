import React, { useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { text: newTask, completed:false}]);
        setNewTask("");
    };
}