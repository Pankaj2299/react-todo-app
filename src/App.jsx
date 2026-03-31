import { useEffect, useState } from 'react'
import { TodoProvider} from './context/Index'
import {TodoForm,TodoItems} from './components/Index'



function App() {
  const [todos,setTodos] =useState([])

   const addTodo = (todo) =>  {
    setTodos((prev) => [{id : Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((element) => (element.id === id ? todo : element)))

  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((element) => element.id !== id) ) 
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo))

  }

  // LocalStorage Start 

// getItem from localStorage 

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("keys"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])


  // setItem for localStorage

  useEffect(() => {

    localStorage.setItem("keys",JSON.stringify(todos))

  },[todos])


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      

    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                       <TodoForm/>
                    </div>

                    <div className="flex flex-wrap gap-y-3">

                      {todos.map((todo) => (
                        <div key={todo.id} className='w-full'>
                          <TodoItems todo={todo}/>


                        </div>
                      ))}
                        
                    </div>
                </div>
            </div>

     

     
    </TodoProvider>
  )
}

export default App
