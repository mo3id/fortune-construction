import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Plus, Pencil, Trash2, X, Loader2, MapPin, Clock, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface Job { _id: string; title: string; location: string; type: string; description: string; requirements: string[]; isActive: boolean }
const EMPTY: Omit<Job, '_id'> = { title: '', location: '', type: 'Full-time', description: '', requirements: [], isActive: true }

export default function Jobs() {
  const qc = useQueryClient()
  const [modal, setModal] = useState<null | 'add' | Job>(null)
  const [form, setForm] = useState<Omit<Job, '_id'>>(EMPTY)
  const [reqInput, setReqInput] = useState('')

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['jobs-all'],
    queryFn: () => api.get('/jobs/all').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (d: Omit<Job, '_id'>) => modal === 'add' ? api.post('/jobs', d) : api.put(`/jobs/${(modal as Job)._id}`, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['jobs-all'] }); toast.success('Saved!'); setModal(null) },
    onError: () => toast.error('Failed to save'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/jobs/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['jobs-all'] }); toast.success('Deleted') },
  })

  const toggle = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => api.put(`/jobs/${id}`, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs-all'] }),
  })

  const openAdd = () => { setForm(EMPTY); setReqInput(''); setModal('add') }
  const openEdit = (j: Job) => { setForm({ ...j }); setReqInput(''); setModal(j) }
  const addReq = () => { if (reqInput.trim()) { setForm(f => ({ ...f, requirements: [...f.requirements, reqInput.trim()] })); setReqInput('') } }
  const removeReq = (i: number) => setForm(f => ({ ...f, requirements: f.requirements.filter((_, idx) => idx !== i) }))
  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Positions</h1>
          <p className="text-sm text-gray-500 mt-0.5">{jobs.filter(j => j.isActive).length} active · {jobs.length} total</p>
        </div>
        <button className="btn-primary" onClick={openAdd}><Plus className="w-4 h-4" /> Add Position</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map(j => (
          <div key={j._id} className={`card p-5 ${!j.isActive ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{j.title}</h3>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3 h-3" />{j.location}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{j.type}</span>
                </div>
              </div>
              <button
                onClick={() => toggle.mutate({ id: j._id, isActive: !j.isActive })}
                className={`flex-shrink-0 ${j.isActive ? 'text-green-500' : 'text-gray-400'} hover:scale-110 transition-transform`}
                title={j.isActive ? 'Deactivate' : 'Activate'}
              >
                {j.isActive ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{j.description}</p>
            {j.requirements.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {j.requirements.slice(0, 3).map((r, i) => (
                  <span key={i} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-0.5">{r}</span>
                ))}
                {j.requirements.length > 3 && <span className="text-xs text-gray-400">+{j.requirements.length - 3} more</span>}
              </div>
            )}
            <div className="flex gap-2 pt-3 border-t border-gray-50">
              <button onClick={() => openEdit(j)} className="btn-secondary flex-1 justify-center text-xs py-1.5"><Pencil className="w-3.5 h-3.5" /> Edit</button>
              <button onClick={() => { if (confirm('Delete?')) remove.mutate(j._id) }} className="btn-danger"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">{modal === 'add' ? 'Add Position' : 'Edit Position'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); save.mutate(form) }} className="p-6 space-y-4">
              <div>
                <label className="label">Job Title *</label>
                <input className="input" value={form.title} onChange={f('title')} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Location</label>
                  <input className="input" value={form.location} onChange={f('location')} />
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="input" value={form.type} onChange={f('type')}>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input h-24 resize-none" value={form.description} onChange={f('description')} />
              </div>
              <div>
                <label className="label">Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input className="input" value={reqInput} onChange={e => setReqInput(e.target.value)} placeholder="Add a requirement..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReq())} />
                  <button type="button" onClick={addReq} className="btn-secondary px-3"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.requirements.map((r, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-1">
                      {r}
                      <button type="button" onClick={() => removeReq(i)} className="hover:text-red-500 ml-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="label mb-0">Active</label>
                <button type="button" onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))} className={form.isActive ? 'text-green-500' : 'text-gray-400'}>
                  {form.isActive ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {save.isPending ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setModal(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
