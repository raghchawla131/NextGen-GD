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
import About from './pages/About';
import Contact from './pages/Contact';

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
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
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
