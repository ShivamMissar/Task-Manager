  export default function addTask()
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

  export default function toggleComplete(id)
  {
    setTasks(tasks.map((task) => {
      if(task.id === id)
      {
        return{...task, completed: !task.completed}
      }
      return task;
    }))
  }

  export default function deleteTask(id)
  {
    setTasks(tasks.filter((task) => task.id !== id));
  }