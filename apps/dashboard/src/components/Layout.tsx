import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Bell, User } from 'lucide-react'
import { authStorage } from '../lib/auth'
import Sidebar from './Sidebar'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export default function Layout() {
  const navigate = useNavigate()
  const user = authStorage.getUser()

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.get('/stats').then(r => r.data),
    refetchInterval: 60_000,
  })

  const notifCount = (stats?.unreadMessages || 0) + (stats?.newApplications || 0)

  const handleLogout = () => {
    authStorage.clear()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Fortune Construction</p>
            <h1 className="text-sm font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              {notifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </button>
            {/* User */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-800 capitalize">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors ml-1" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
