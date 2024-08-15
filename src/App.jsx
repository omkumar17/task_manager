import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true);




  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleFinished = (params) => {
    setShowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)

    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    

  }



  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    
  }



  const handleChange = (e) => {
    setTodo(e.target.value)
  }



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    
  }



  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    

  }


  return (
    <>
      <Navbar />
      <div className="  bg-blue-100 my-12 rounded-xl p-5 min-h-[80vh] lg:w-[60vw] lg:mx-auto md:w-[90%] w-[100%] md:mx-[5%] mx-[0%]  ">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <div className="search flex column">
            <input onChange={handleChange} value={todo} type="text" placeholder="e.g. Complete a project. " className='w-[90%] my-5 p-2 rounded-xl border-2 border-r-0 rounded-r-none border-blue-600 text-blue-600 placeholder:text-blue-600' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-blue-600 disabled:bg-transparent disabled:text-blue-900 disabled:cursor-not-allowed hover:bg-violet-950 border-2 font-bold border-blue-800  text-white rounded-md px-5 my-5 rounded-l-none">save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished Task
        <h1 className="text-xl my-3 font-bold">Your Tasks</h1>
        <div className="todos w-full ">
          {todos.length === 0 && <div className='m-5'>No Tasks to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center justify-between  my-3  p-4 bg-slate-50 shadow-md rounded-lg">

              <div className="flex gap-4 sm:w-[75%] w-[60%]">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through m-0 p-0" : "m-0 p-0"}>{item.todo}</div>
              </div>
              <div className="buttons  flex justify-end gap-2 h-full">
                <button name={item.id} onClick={(e) => { handleEdit(e, item.id) }} className="bg-blue-600 hover:bg-violet-950 p-3 py-1 text-white rounded-md h-[40px] w-[40px]"><img src="image\pencil.png" alt="" /></button>
                <button name={item.id} onClick={(e) => { handleDelete(e, item.id) }} className="bg-blue-600 hover:bg-violet-950 p-3 py-1 text-white rounded-md h-[40px] w-[40px]"><img src="image\trash-2.png" alt="" /></button>
              </div>

            </div>
          })}
        </div>

      </div>

    </>
  )
}

export default App
