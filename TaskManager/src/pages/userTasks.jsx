


function UserAddTasks({ userValue, onChange }) {
  return (
    <input
      value={userValue}
      onChange={onChange}
      placeholder="Add a new task..."
    />
  )
}


export default UserAddTasks;