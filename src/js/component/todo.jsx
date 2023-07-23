import React, { useEffect, useState } from "react";

export const ToDo = () => {
    const [list, setList] = useState ([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const host= "https://jsonplaceholder.typicode.com";

    const fetchList = async  () => {
        const url = `${host}/todos/`;
        const request = {
            method: "GET",
            redirect: "follow"
        };
        
        const response = await fetch(url, request);
            if (response.ok) {
            const data = await response.json();
            setList(data);
            } else {
                console.log(response.status, response.statusText)
            }
    }; 
    const handleAddTask = async () => {
        if (newTaskTitle !== "") {
            const newTask = {
                id: list.length + 1,
                title: newTaskTitle,
                completed: false,
            };
            try{
                const response = await fetch(`${host}/todos`, {
                    method: 'POST',
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setList([...list, data]); // Agregar la nueva tarea a la lista actual
                    setNewTaskTitle(""); // Limpiar el campo del título de la nueva tarea
                    } else {
                        console.log("Error al agregar la tarea");
                    }
            } catch (error) {
                console.log("Error al agregar la tarea:", error.message);
            }
        };
    };
    const handleDeleteTask = async (taskId) => {
        try{
            const response = await fetch(`${host}/todos/${taskId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const updatedTasks = list.filter((task) => task.id !== taskId);
                setList(updatedTasks);
            } else {
                console.log("Error al eliminar la tarea");
            } 
        } catch (error) {
                console.log("Error al eliminar la tarea:", error.message);
            }
    };
    
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <h3>List with API </h3>
            <p>Fuente: {host}</p>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Escribir nueva tarea"
                />
                <button onClick={handleAddTask}>Agregar tarea</button>
            </div>
            <div className="listcontainer">
                <ul className="listul">
                    { !list ? "On load" :
                        list.map((todo, index) => (
                            <li key={index} className="tasklist">
                                {todo.title} - <div className="icon">
                                    {todo.completed ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                        </svg>
                                        ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-x" viewBox="0 0 16 16">
                                        <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    )}
                                    <button className="btneliminar" onClick= { () => handleDeleteTask(todo.id) } >
                                        Eliminar
                                    </button>
                                </div> 
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};
