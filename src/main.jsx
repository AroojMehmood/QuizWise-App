import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router' ;
import {Home} from "./pages/Home" ;
import {Quiz} from "./pages/Quiz" ;
import {Dashboard} from "./pages/Dashboard" ;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      { index: true, element: <Home/> },
      { path: "quiz", element: <Quiz/> },
      { path: "dashboard", element: <Dashboard/> },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
