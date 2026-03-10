import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Trash2, ChevronDown, Search, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

interface Application {
  _id: string; fullName: string; email: string; phone: string;
  position: string; coverLetter: string; cvFile?: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected'; createdAt: string;
}

const STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected'] as const

export default function Applications() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data: apps = [], isLoading } = useQuery<Application[]>({
    queryKey: ['applications', filterStatus],
    queryFn: () => api.get('/applications', { params: filterStatus ? { status: filterStatus } : {} }).then(r => r.data),
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.patch(`/applications/${id}/status`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['applications'] }); qc.invalidateQueries({ queryKey: ['stats'] }); toast.success('Status updated') },
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/applications/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['applications'] }); qc.invalidateQueries({ queryKey: ['stats'] }); toast.success('Deleted') },
  })

  const filtered = apps.filter(a =>
    a.fullName.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.position.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">{apps.length} total applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input pl-9" placeholder="Search by name, email, position..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No applications found</td></tr>
              )}
              {filtered.map(a => (
                <>
                  <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-xs flex-shrink-0">
                          {a.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{a.fullName}</p>
                          <p className="text-xs text-gray-400">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{a.position}</td>
                    <td className="px-5 py-4">
                      <select
                        className={`text-xs font-medium rounded-lg border px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-500
                          ${a.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                          ${a.status === 'reviewed' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : ''}
                          ${a.status === 'shortlisted' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                          ${a.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                        `}
                        value={a.status}
                        onChange={e => updateStatus.mutate({ id: a._id, status: e.target.value })}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 justify-end">
                        {a.cvFile && (
                          <a href={`http://localhost:3001${a.cvFile}`} target="_blank" rel="noreferrer" className="btn-secondary text-xs py-1 px-2.5">
                            <FileText className="w-3.5 h-3.5" /> CV
                          </a>
                        )}
                        <button onClick={() => setExpanded(expanded === a._id ? null : a._id)} className="btn-secondary text-xs py-1 px-2.5">
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded === a._id ? 'rotate-180' : ''}`} />
                        </button>
                        <button onClick={() => { if (confirm('Delete?')) remove.mutate(a._id) }} className="btn-danger py-1 px-2.5">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expanded === a._id && (
                    <tr key={`${a._id}-exp`} className="bg-slate-50">
                      <td colSpan={5} className="px-5 py-4">
                        <div className="text-sm text-gray-700 space-y-1">
                          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-2">Cover Letter</p>
                          <p className="leading-relaxed whitespace-pre-wrap text-gray-600">{a.coverLetter || 'No cover letter provided'}</p>
                          <p className="text-xs text-gray-400 mt-3">Phone: {a.phone}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
