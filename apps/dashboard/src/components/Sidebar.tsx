import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Briefcase, MessageSquare,
  Users, Handshake, Settings, Wrench, HardHat, ChevronRight, FileText,
} from 'lucide-react'
import { cn } from '@fortune/shared-ui'

const NAV = [
  { label: 'Overview', icon: LayoutDashboard, to: '/' },
  { label: 'Projects', icon: FolderKanban, to: '/projects' },
  { label: 'Services', icon: Wrench, to: '/services' },
  { label: 'Team', icon: Users, to: '/team' },
  { label: 'Partners', icon: Handshake, to: '/partners' },
  { label: 'Job Positions', icon: HardHat, to: '/jobs' },
  { label: 'Applications', icon: Briefcase, to: '/applications' },
  { label: 'Messages', icon: MessageSquare, to: '/messages' },
  { label: 'Page Content', icon: FileText, to: '/content' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 text-white flex flex-col h-full shadow-xl">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/30">
            <HardHat className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Fortune</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Construction</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('w-4 h-4 flex-shrink-0 transition-transform', !isActive && 'group-hover:scale-110')} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3 h-3 opacity-70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-sky-400 hover:bg-slate-800 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          View Live Website
        </a>
      </div>
    </aside>
  )
}
