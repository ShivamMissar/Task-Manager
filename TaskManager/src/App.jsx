import { useState,useEffect } from 'react'
import WelcomePage from './pages/welcomePage';
import UserAddTasks from './pages/userTasks';

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('task');

    if(saved)
    {
      return JSON.parse(saved); 
    }

    return []
  });
  const [userInput, setUserInput] = useState('');
  const [startAddingTasks, setStartAddingTasks] = useState(false); 

  useEffect(() => {

    localStorage.setItem('task', JSON.stringify(tasks));

  }, [tasks])

 function addTask()
  {
    
    if(userInput === '') return; 

      const newTask = {
        id: Date.now(),
        title: userInput, 
        completed: false
      }

      setTasks([...tasks, newTask]); 
      setUserInput('');
  }

  
  function toggleComplete(id)
  {
    setTasks(tasks.map((task) => {
      console.log('completed');
      if(task.id === id)
      {
        return{...task, completed: !task.completed}
      }
      return task;
    }))
  }


  function deleteTask(id)
  {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function getTaskClass(completed)
  {
    if(completed)
    {
       return 'line-through text-gray-400'
    }
    return ''
  }


  
  if(!startAddingTasks){
    return <WelcomePage onStartAdding={() => setStartAddingTasks(true)}/>
  }

  return (
    <div>
      <UserAddTasks
       userValue={userInput}
       onChange = {((e)=>setUserInput(e.target.value))}
       placeholder = "Add a new task"
      />
      <button onClick={addTask}>Add a new task</button>


      {tasks.map((task) => (

        <div key={task.id}>
          <p className={getTaskClass(task.completed)}>{task.title}</p>
          <button onClick={() => toggleComplete(task.id)}>Complete Task</button>
          <button onClick={() => deleteTask(task.id)}>Remove Task</button>
        </div>
      ))}
        
      
    </div>
  )
}

export default App
