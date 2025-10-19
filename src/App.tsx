import { Outlet } from 'react-router-dom'
import SidebarLayout from './layouts/SidebarLayout'
import './App.css'

function App() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
}

export default App
