import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import GeneralLayout from './layout/GeneralLayout';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Setup from './pages/Setup';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <GeneralLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/setup',
          element: <Setup />
        },
        {
          path: '/simulation/:time',
          element: <Simulation />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
