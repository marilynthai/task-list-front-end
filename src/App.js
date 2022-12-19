import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

// const taskCopy = TASKS.map((task) => {
//   return { ...task };
// });

const App = () => {
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const tasklist = response.data.map((task) => {
          return {
            description: task.description,
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTasks(tasklist);
        console.log(tasklist);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [tasks, setTasks] = useState([]);

  const toggleComplete = (taskId) => {
    const updatedTasks = [];
    // axios.patch(`${URL}/${taskId}`);

    for (const task of tasks) {
      if (task.id !== taskId) {
        updatedTasks.push(task);
      } else {
        const completeStatus = task.isComplete;
        if (completeStatus === true) {
          axios.patch(`${URL}/${taskId}/mark_incomplete`).then(() => {
            const newTask = { ...task, isComplete: false };
            updatedTasks.push(newTask);
          });
        } else if (completeStatus === false) {
          axios.patch(`${URL}/${taskId}/mark_complete`).then(() => {
            const newTask = { ...task, isComplete: true };
            updatedTasks.push(newTask);
          });
        }
        // const newTask = { ...task, isComplete: !task.isComplete };
        // updatedTasks.push(newTask);
      }
    }
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const updatedTasks = [];
        for (const task of tasks) {
          if (task.id !== taskId) {
            updatedTasks.push(task);
          }
        }
        setTasks(updatedTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
