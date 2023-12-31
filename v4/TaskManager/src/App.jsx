function App() { 

  const addTask = e => {
    e.preventDefault()
    console.log('Boton pulsado')
  }

  const errDisplay = (msg) => {
    msg = 'Pepe'
    return msg
  }

  return (
    <main className="flex justify-center items-center text-center bg-slate-200 flex-col w-4/12 p-12 rounded shadow-inner">
      <h1 className="font-bold text-4xl text-zinc-900 pb-5">Task Manager</h1>

      <section className="text-red-500 text-xl text-center font-medium">
        <span>Error</span>
      </section>

      <section className="flex justify-center items-center p-3">
        <input type="text" placeholder="Enter a task name" autoFocus spellCheck="false"
        className="border border-white rounded p-2 w-full focus:border-none" />
        <button onClick={addTask} type="button" 
        className=" bg-sky-700 p-3 rounded ml-2 text-center w-32 text-white font-medium
        transition-all cursor-pointer hover:translate-y-1 hover:opacity-60 hover:shadow-md">
          Add task
        </button>
      </section>
    </main>
  )
}

export default App
