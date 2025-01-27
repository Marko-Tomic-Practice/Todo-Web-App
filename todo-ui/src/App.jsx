import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import TodoComponent from './components/TodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterComponent from './components/RegisterComponent'

function App() {


  return (
    <>
      <BrowserRouter>
              <HeaderComponent/>
              <Routes>
                // http://localhost:3000
                <Route path='/' element={<ListTodoComponent/>}></Route>
              
                // http://localhost:3000/todos
                <Route path='/todos' element={<ListTodoComponent/>}></Route>

                // http://localhost:3000/add-todo
                <Route path='/add-todo' element={<TodoComponent/>}></Route>

                // http://localhost:3000/edit-todo/id
                <Route path='/edit-todo/:id' element={<TodoComponent/>}></Route>
                
                // http://localhost:3000/register
                <Route path='/register' element={<RegisterComponent/>}></Route>
              </Routes>
              <FooterComponent/>
      </BrowserRouter>
        
    </>
  )
}

export default App
