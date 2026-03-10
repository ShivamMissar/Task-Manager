




function WelcomePage({ onStartAdding }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)' }}
    >
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center flex flex-col gap-6 shadow-2xl">
        <span className="text-6xl"></span>
        <h1 className="text-3xl font-extrabold text-gray-800">Welcome to your local task manager</h1>
        <p className="text-gray-500 text-sm leading-relaxed">Keep on top of your tasks by checking them off!</p>
        <button
          onClick={onStartAdding}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
        >
         Start your day with a smile
        </button>
      </div>
    </div>
  )
}


export default WelcomePage;