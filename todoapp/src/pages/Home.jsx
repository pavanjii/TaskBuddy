import React, { useState } from 'react';
import '../style.css';

function Home() {
  // State and functions remain the same
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => setTask(e.target.value);
  const addTask = () => {
    if (task) {
      setTasks((prevTasks) => ({ ...prevTasks, todo: [...prevTasks.todo, task] }));
      setTask('');
    }
  };

  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToMove);
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  const clearAllTasks = (category) => {
    setTasks((prevTasks) => ({ ...prevTasks, [category]: [] }));
  };

  return (
    <div className="home-container">
      <h1 className="main-heading">Task Manager</h1>
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {['todo', 'ongoing', 'completed'].map((category) => (
          <div className={`task-section ${category}`} key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Tasks</h2>
            <ul>
              {tasks[category].map((t, index) => (
                <li key={index} className="task-item">
                  {t}
                  <div className="dropdown">
                    <button className="dropdown-button">Options</button>
                    <div className="dropdown-menu">
                      {category !== 'todo' && (
                        <button onClick={() => moveTask(category, 'todo', t)}>Move to To-Do</button>
                      )}
                      {category !== 'ongoing' && (
                        <button onClick={() => moveTask(category, 'ongoing', t)}>
                          Move to Ongoing
                        </button>
                      )}
                      {category !== 'completed' && (
                        <button onClick={() => moveTask(category, 'completed', t)}>
                          Move to Completed
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="clear-all-button" onClick={() => clearAllTasks(category)}>
              Clear All
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
