import { useState } from 'react'

function App() {

  const [tasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState('');



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
  
  return (
    <div>

    </div>
  )
}

export default App
