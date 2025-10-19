import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Accounts from './pages/Accounts.tsx'
import Reports from './pages/Reports.tsx'
import MyAccount from './pages/MyAccount.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'reports', element: <Reports /> },
      { path: 'my-account', element: <MyAccount /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
