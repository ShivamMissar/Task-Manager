




function WelcomePage({onStartAdding})
{
    return(
        <div>
            <h1>Welcome to your Task Manager!</h1>
            <p>This site is about.....</p>


            <button onClick={onStartAdding}>
                Start managing your tasks!
            </button>
        </div>
    )
}


export default WelcomePage;