
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function RootLayout() {
  return (
    <div className='flex w-full'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}
