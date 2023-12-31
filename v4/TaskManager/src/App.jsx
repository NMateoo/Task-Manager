function App() { 

  return (
    <main className="flex justify-center items-center h-screen bg-slate-200 flex-col">
      <h1 className="font-bold text-4xl text-zinc-900 mb-9">Task Manager</h1>
      <section className="flex justify-center items-center border-solid border-black border-2 p-5">
        <input type="text" placeholder="Enter a task name" 
        className="border border-white rounded p-2 w-full" />
        <button type="button" className=" bg-sky-700 p-3 rounded ml-2 text-center w-24 text-white">Add task</button>
      </section>
    </main>
  )
}

export default App
