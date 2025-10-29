import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Accounts from './pages/Accounts.tsx'
import Reports from './pages/Reports.tsx'
import MyAccount from './pages/MyAccount.tsx'
import UserOnboard from './pages/UserOnboard.tsx'
import Login from './pages/Login.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { store } from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'reports', element: <Reports /> },
      { path: 'user-onboard', element: <UserOnboard /> },
      { path: 'my-account', element: <MyAccount /> },
      { path: 'login', element: <Login /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
