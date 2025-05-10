import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import GeneralLayout from './layout/GeneralLayout';
import Home from './pages/Home';

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
