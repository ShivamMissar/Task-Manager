import { useState, useEffect } from 'react'
import WelcomePage from './pages/welcomePage';
import UserAddTasks from './pages/userTasks';

function App() {

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

  useEffect(() => {

    localStorage.setItem('task', JSON.stringify(tasks));

  }, [tasks])


  function addTask() {

    if (userInput === '') return;

    const newTask = {
      id: Date.now(),
      title: userInput,
      completed: false
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

  function getTaskClass(completed) {
    if (completed) {
      return 'line-through text-gray-400'
    }
    return ''
  }


  function getFilterClass(filter) {
    const BASE = 'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 '
    if (applyFilter === filter) {
      return BASE + 'bg-white text-purple-600'
    }
    return BASE + 'bg-white/20 text-white hover:bg-white/30'
  }

  if (!startAddingTasks) {
    return <WelcomePage onStartAdding={() => setStartAddingTasks(true)} />
  }

  let filteredTask = tasks;

  if (applyFilter === 'Active') {
    filteredTask = tasks.filter((task) => task.completed === false)

  }

  if (applyFilter === 'Completed') {
    filteredTask = tasks.filter((task) => task.completed === true);
  }



  return (
    <div className="min-h-screen px-6 py-12"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)' }}
    >
      <div className="max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <h1 className="text-3xl font-extrabold text-white text-center">My Tasks</h1>

        {/* Input area */}
        <div className="flex gap-3">
          <UserAddTasks
            userValue={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-full outline-none text-gray-800"
          />
          <button
            onClick={addTask}
            className="bg-white text-purple-600 font-bold px-6 py-3 rounded-full hover:bg-purple-50 transition-colors"
          >
            Add
          </button>
        </div>


        <div className='flex gap-2 justify-center'>
          {['All', 'Active', 'Completed'].map((filter) => (
            <button key={filter} onClick={() => setFilter(filter)} className={getFilterClass(filter)}>{filter}</button>
          ))}
        </div>


        {/* Task list */}
        <div className="flex flex-col gap-3">


          {filteredTask.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-md">
              <p className={getTaskClass(task.completed)}>{task.title}</p>
              <div className="flex gap-2">
                <button onClick={() => toggleComplete(task.id)} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full">✓</button>
                <button onClick={() => deleteTask(task.id)} className="text-xs bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full">✕</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
