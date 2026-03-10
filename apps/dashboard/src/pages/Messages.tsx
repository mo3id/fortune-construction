import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Trash2, Mail, MailOpen, Search, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  _id: string; name: string; email: string; phone?: string;
  message: string; isRead: boolean; createdAt: string;
}

export default function Messages() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['messages', filter],
    queryFn: () => api.get('/messages', { params: filter !== '' ? { isRead: filter } : {} }).then(r => r.data),
  })

  const markRead = useMutation({
    mutationFn: (id: string) => api.patch(`/messages/${id}/read`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['messages'] }); qc.invalidateQueries({ queryKey: ['stats'] }) },
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/messages/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['messages'] }); qc.invalidateQueries({ queryKey: ['stats'] }); toast.success('Deleted') },
  })

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  )

  const unread = messages.filter(m => !m.isRead).length

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">{messages.length} total · {unread} unread</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input pl-9" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Messages</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>

      {/* Messages list */}
      <div className="card divide-y divide-gray-50 overflow-hidden">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No messages found</div>
        )}
        {filtered.map(m => (
          <div
            key={m._id}
            className={`p-5 hover:bg-gray-50/50 transition-colors ${!m.isRead ? 'border-l-2 border-l-sky-500' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${m.isRead ? 'bg-gray-100 text-gray-500' : 'bg-teal-100 text-teal-600'}`}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-semibold ${m.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{m.name}</p>
                    {!m.isRead && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />}
                    <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <a href={`mailto:${m.email}`} className="text-xs text-sky-600 hover:underline flex items-center gap-1"><Mail className="w-3 h-3" />{m.email}</a>
                    {m.phone && <span className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{m.phone}</span>}
                  </div>
                  <p
                    className={`text-sm text-gray-600 mt-2 leading-relaxed ${expanded !== m._id ? 'line-clamp-2 cursor-pointer' : 'whitespace-pre-wrap'}`}
                    onClick={() => { setExpanded(expanded === m._id ? null : m._id); if (!m.isRead) markRead.mutate(m._id) }}
                  >
                    {m.message}
                  </p>
                  {expanded !== m._id && m.message.length > 120 && (
                    <button className="text-xs text-sky-600 mt-1" onClick={() => { setExpanded(m._id); if (!m.isRead) markRead.mutate(m._id) }}>Read more</button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!m.isRead && (
                  <button onClick={() => markRead.mutate(m._id)} className="btn-secondary text-xs py-1 px-2.5" title="Mark as read">
                    <MailOpen className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => { if (confirm('Delete this message?')) remove.mutate(m._id) }} className="btn-danger py-1 px-2.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
