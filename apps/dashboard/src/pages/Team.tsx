import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, uploadImage } from '../lib/api'
import { Plus, Pencil, Trash2, X, Loader2, ImagePlus, User } from 'lucide-react'
import toast from 'react-hot-toast'

interface Member { _id: string; name: string; role: string; image: string; order: number }
const EMPTY: Omit<Member, '_id'> = { name: '', role: '', image: '', order: 0 }

export default function Team() {
  const qc = useQueryClient()
  const [modal, setModal] = useState<null | 'add' | Member>(null)
  const [form, setForm] = useState<Omit<Member, '_id'>>(EMPTY)
  const [uploading, setUploading] = useState(false)

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ['team'],
    queryFn: () => api.get('/team').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (d: Omit<Member, '_id'>) => modal === 'add' ? api.post('/team', d) : api.put(`/team/${(modal as Member)._id}`, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Saved!'); setModal(null) },
    onError: () => toast.error('Failed to save'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/team/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Deleted') },
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    try { const url = await uploadImage(file); setForm(f => ({ ...f, image: url })) }
    catch { toast.error('Upload failed') }
    finally { setUploading(false) }
  }

  const openAdd = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (m: Member) => { setForm({ ...m }); setModal(m) }
  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">{members.length} members</p>
        </div>
        <button className="btn-primary" onClick={openAdd}><Plus className="w-4 h-4" /> Add Member</button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {members.map(m => (
          <div key={m._id} className="card p-5 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3 ring-2 ring-sky-100 ring-offset-2">
              {m.image
                ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300"><User className="w-8 h-8" /></div>}
            </div>
            <p className="font-bold text-gray-900">{m.name}</p>
            <p className="text-xs text-sky-600 font-medium mt-0.5">{m.role}</p>
            <div className="flex gap-2 mt-4 w-full">
              <button onClick={() => openEdit(m)} className="btn-secondary flex-1 justify-center text-xs py-1.5"><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => { if (confirm('Delete?')) remove.mutate(m._id) }} className="btn-danger"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">{modal === 'add' ? 'Add Member' : 'Edit Member'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); save.mutate(form) }} className="p-6 space-y-4">
              {/* Avatar preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 ring-2 ring-sky-100">
                  {form.image ? <img src={form.image} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><User className="w-8 h-8" /></div>}
                </div>
                <label className="btn-secondary text-xs cursor-pointer">
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <div>
                <label className="label">Full Name *</label>
                <input className="input" value={form.name} onChange={f('name')} required />
              </div>
              <div>
                <label className="label">Role / Title *</label>
                <input className="input" value={form.role} onChange={f('role')} required placeholder="e.g. Managing Director" />
              </div>
              <div>
                <label className="label">Image URL (optional)</label>
                <input className="input" value={form.image} onChange={f('image')} placeholder="https://..." />
              </div>
              <div>
                <label className="label">Display Order</label>
                <input type="number" className="input" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {save.isPending ? 'Saving...' : 'Save Member'}
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
