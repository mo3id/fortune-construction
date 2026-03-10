import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Partner { _id: string; name: string; abbr: string; logo?: string; order: number }
const EMPTY: Omit<Partner, '_id'> = { name: '', abbr: '', logo: '', order: 0 }

export default function Partners() {
  const qc = useQueryClient()
  const [modal, setModal] = useState<null | 'add' | Partner>(null)
  const [form, setForm] = useState<Omit<Partner, '_id'>>(EMPTY)

  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: () => api.get('/partners').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (d: Omit<Partner, '_id'>) => modal === 'add' ? api.post('/partners', d) : api.put(`/partners/${(modal as Partner)._id}`, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['partners'] }); toast.success('Saved!'); setModal(null) },
    onError: () => toast.error('Failed to save'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/partners/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['partners'] }); toast.success('Deleted') },
  })

  const openAdd = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (p: Partner) => { setForm({ ...p }); setModal(p) }
  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-sm text-gray-500 mt-0.5">{partners.length} partners</p>
        </div>
        <button className="btn-primary" onClick={openAdd}><Plus className="w-4 h-4" /> Add Partner</button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {partners.map(p => (
          <div key={p._id} className="card p-5 flex flex-col items-center text-center gap-3">
            {p.logo
              ? <img src={p.logo} alt={p.name} className="h-12 object-contain" />
              : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-200">
                  {p.abbr.slice(0, 3)}
                </div>
              )
            }
            <div>
              <p className="font-bold text-gray-900 text-sm">{p.name}</p>
              <p className="text-xs text-gray-400">{p.abbr}</p>
            </div>
            <div className="flex gap-2 w-full mt-1">
              <button onClick={() => openEdit(p)} className="btn-secondary flex-1 justify-center text-xs py-1.5"><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => { if (confirm('Delete?')) remove.mutate(p._id) }} className="btn-danger"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">{modal === 'add' ? 'Add Partner' : 'Edit Partner'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); save.mutate(form) }} className="p-6 space-y-4">
              <div>
                <label className="label">Organization Name *</label>
                <input className="input" value={form.name} onChange={f('name')} required placeholder="African Development Bank" />
              </div>
              <div>
                <label className="label">Abbreviation *</label>
                <input className="input" value={form.abbr} onChange={f('abbr')} required placeholder="AfDB" maxLength={8} />
              </div>
              <div>
                <label className="label">Logo URL (optional)</label>
                <input className="input" value={form.logo || ''} onChange={f('logo')} placeholder="https://..." />
              </div>
              <div>
                <label className="label">Display Order</label>
                <input type="number" className="input" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {save.isPending ? 'Saving...' : 'Save Partner'}
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
