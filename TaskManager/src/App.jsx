import { useState } from 'react'
import WelcomePage from './pages/welcomePage';




function App() {

  const [tasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState('');


  const [startAddingTasks, setSetStartAddingTasks] = useState(false); 

  
  if(!startAddingTasks){
    <WelcomePage onStartAdding={() => setSetStartAddingTasks(true)}/>
  }


  
  return (
    <div>
    </div>
  )
}

export default App
