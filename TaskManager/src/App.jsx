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
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {

    localStorage.setItem('task', JSON.stringify(tasks));

  }, [tasks])


  function startEdit(id, title, priority, dueFor) {
    setEditingId(id);
    setEditInput(title);
    setPriority(priority);
    setDueDate(dueFor);

  }

  function saveEdit() {
    const updateTask = tasks.map(task =>

      task.id === editingId ? { ...task, title: editInput, priority: priority, due: dueDate } : task
    );

    setTasks(updateTask);
    setEditInput('');
    setPriority('Low');
    setDueDate('');
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditInput('');
  }


  function addTask() {

    if (userInput === '') return;


    const newTask = {
      id: Date.now(),
      title: userInput,
      priority: priority,
      completed: false,
      due: dueDate
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

  function getPriorityClass(priority) {
    const BASE = ''
    if (priority === "High") {
      return "bg-red-100 text-red-700"
    }
    else if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700"
    }
    else {
      return 'bg-blue-100 text-blue-700';
    }
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
            <div key={task.id} className="bg-white rounded-2xl px-6 py-4 flex-col shadow-md">
              {editingId === task.id ? (
                <>
                  <label>Task Name:</label>
                  <input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="border px-2 py-2 rounded w-full border-none"
                  />
                  <label>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-white text-gray-800 px-4 py-3 rounded-full"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <br />


                  <label className='py-1'>Due for?</label>

                  <input
                    type='Date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border px-2 py-2 rounded w-full border-none"
                  />
                </>

              ) : (
                <div>
                  <div className="flex justify-between items-center">
                    <p className={`${getTaskClass(task.completed)} text-lg font-semibold`}>Task Name: {task.title}</p>
                    <span className={`${getPriorityClass(task.priority)} text-xs font-semibold px-3 py-1 rounded-full`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className='text-sm text-gray-400'>Due Date: {task.due}</p>
                </div>
              )}


              <div className="flex py-4 gap-5">
                <button onClick={() => toggleComplete(task.id)} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded-full">Complete</button>
                {editingId === task.id ? (
                  <>

                    <button onClick={saveEdit} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full" >Save</button>
                    <button onClick={cancelEdit} className="text-xs bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full">Cancel Save</button>

                  </>


                ) : <button onClick={() => startEdit(task.id, task.title)} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full">Edit Task</button>
                }



                <button onClick={() => deleteTask(task.id)} className="text-xs bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
