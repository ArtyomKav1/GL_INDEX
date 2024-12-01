import React from 'react'
import { createRef } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./app/store"
import App from './App'
import Users from './component/Users/Users'
import Profile from './component/Profile/Profile'
import Dialogs from './component/Dialogs/Dialogs'
import { LoginApp } from './component/login/login'
import { MainPage } from './component/main/main'
import MainTodo from './component/Todo/MainTodo'







export const routes = [
  {
    path: '/profile',
    name: 'profile',
    element: <Profile />,
    nodeRef: createRef()
  },

  {
    path: '/profile/:userId',
    name: 'profile',
    element: <Profile />,
    nodeRef: createRef()
  },

  {
    path: '/users',
    name: 'users',
    element: <Users />,
    nodeRef: createRef()
  },

  {
    path: '/dialogs',
    name: 'dialogs',
    element: <Dialogs />,
    nodeRef: createRef()
  },
  {
    path: "/login",
    name: 'Login',
    element: <LoginApp />,
    nodeRef: createRef()
  },
  {
    path: "/todo",
    name: 'todo',
    element: <MainTodo />,
    nodeRef: createRef()
  },

  {
    path: "/",
    name: 'main',
    element: <MainPage />,
    nodeRef: createRef()
  },


]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}















// import React from "react"
// import { BrowserRouter } from "react-router-dom"
// import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
// import App from "./App"
// import { store } from "./app/store"
// import "./index.css"


// const container = document.getElementById("root")

// if (container) {
//   const root = createRoot(container)

//   root.render(
//     <React.StrictMode>
//       <BrowserRouter >
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </React.StrictMode>,
//   )
// } else {
//   throw new Error(
//     "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
//   )
// }





//=================================================================================
