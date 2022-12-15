import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const taskCopy = TASKS.map((task) => {
    return { ...task };
  });

  const [tasks, setTasks] = useState(taskCopy);

  const toggleComplete = (taskId) => {
    const updatedTasks = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        updatedTasks.push(task);
      } else {
        const newTask = { ...task, isComplete: !task.isComplete };
        updatedTasks.push(newTask);
      }
    }
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        updatedTasks.push(task);
      }
    }
    setTasks(updatedTasks);
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
