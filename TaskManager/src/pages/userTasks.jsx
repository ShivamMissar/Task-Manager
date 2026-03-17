


function UserAddTasks({ userValue, onChange }) {
  return (
    <input
      value={userValue}
      onChange={onChange}
      placeholder="Add a new task + "
     className="px-6 py-4 w-full"
    />
  )
}


export default UserAddTasks;