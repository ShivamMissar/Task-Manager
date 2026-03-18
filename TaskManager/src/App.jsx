
import WelcomePage from './pages/welcomePage';
import UserAddTasks from './pages/userTasks';
import { useTasks } from './hooks/useTasks';
import { getFilterClass, getPriorityClass,getTaskClass } from './utils/helpers';



function App() {

  const {
    tasks, userInput, setUserInput,
    startAddingTasks, setStartAddingTasks,
    applyFilter, setFilter,
    editingId, editInput, setEditInput,
    priority, setPriority,
    dueDate, setDueDate,
    sortBy, setSortBy,
    startEdit, saveEdit, cancelEdit,
    addTask, toggleComplete, deleteTask,
    convertDate
  } = useTasks();

  if (!startAddingTasks) {
    return <WelcomePage onStartAdding={() => setStartAddingTasks(true)} />
  }

  let filteredTask = tasks;

  let completedCount = tasks.filter((task) => task.completed == true).length;
  let totalCount = tasks.length;
  let percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  if (applyFilter === 'Active') {
    filteredTask = tasks.filter((task) => task.completed === false)

  }

  if (applyFilter === 'Completed') {
    filteredTask = tasks.filter((task) => task.completed === true);
  }

const priorityOrder = { High: 0, Medium: 1, Low: 2 };


if(sortBy === 'priority')
{
filteredTask = filteredTask.sort((a, b) => 
  priorityOrder[a.priority] - priorityOrder[b.priority]
);
}

if(sortBy === 'due')
{
  filteredTask = filteredTask.sort((a,b) => 
  a.due.localeCompare(b.due));
}
if(sortBy === 'added')
{
  filteredTask = filteredTask.sort((a,b) =>
    a.id - b.id); 
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
            <button key={filter} onClick={() => setFilter(filter)} className={getFilterClass(filter,applyFilter)}>{filter}</button>
          ))}

          {/* Select for Priority*/}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white text-gray-800 px-4 py-3 rounded-full"
                  >
                    <option value="priority">Priority</option>
                    <option value="due">Due For</option>
                    <option value="added">Added</option>
                  </select>
                </div>
        </div>


        {/* Task list */}
        <div className="flex flex-col gap-3">
          
          <div className='bg-gray-200 rounded-full h-2 m-6'>
           <div style={{ width: `${percentage}%` }} className="bg-purple-500 rounded-full h-2">
            </div>
            <p className="text-sm text-white mt-1"> {completedCount} of {totalCount} tasks completed</p>
          </div>

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
                  <p className='text-sm text-gray-400'>Due Date: {convertDate(task.due)}</p>
                </div>
              )}


              <div className="flex py-4 gap-5">
                <button onClick={() => toggleComplete(task.id)} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded-full">Complete</button>
                {editingId === task.id ? (
                  <>

                    <button onClick={saveEdit} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full" >Save</button>
                    <button onClick={cancelEdit} className="text-xs bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full">Cancel Save</button>

                  </>


                ) : <button onClick={() => startEdit(task.id, task.title, task.priority, task.due)} className="text-xs bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-full">Edit Task</button>
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
