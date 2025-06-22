import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import GeneralLayout from './layout/GeneralLayout';
import Home from './pages/Home';
import Setup from './pages/Setup';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SimulationWrapper from './pages/SimulationWrapper';

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
          element: <SimulationWrapper  />
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
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/signup',
      element: <SignUp />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
