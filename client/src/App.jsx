import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Route,Routes,Outlet, useLocation} from "react-router-dom"
import Login from './Component/Login'
import Home from './Component/Home.jsx'
import AddTransaction from './Component/AddTransaction.jsx'
import TransactionList from './Component/TransactionList.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route exact path  = "/" element={<Home/>} />
          <Route exact path  = "/Add-Transaction" element={<AddTransaction/>} />
          <Route exact path  = "/Transaction-List" element={<TransactionList/>} />
          <Route exact path  = "/login" element={<Login/>} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
