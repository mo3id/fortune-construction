import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Pencil, X, Loader2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface Service { _id: string; title: string; tagline: string; description: string; features: string[]; bgImage: string; order: number }

export default function Services() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<Omit<Service, '_id'> | null>(null)
  const [featInput, setFeatInput] = useState('')

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (d: Omit<Service, '_id'>) => api.put(`/services/${editing!._id}`, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['services'] }); toast.success('Service updated!'); setEditing(null); setForm(null) },
    onError: () => toast.error('Failed to save'),
  })

  const openEdit = (s: Service) => { setEditing(s); setForm({ title: s.title, tagline: s.tagline, description: s.description, features: [...s.features], bgImage: s.bgImage, order: s.order }); setFeatInput('') }
  const addFeat = () => { if (featInput.trim() && form) { setForm(f => f ? { ...f, features: [...f.features, featInput.trim()] } : f); setFeatInput('') } }
  const removeFeat = (i: number) => setForm(f => f ? { ...f, features: f.features.filter((_, idx) => idx !== i) } : f)

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-sm text-gray-500 mt-0.5">Edit the main service offerings shown on the website</p>
      </div>

      <div className="space-y-4">
        {services.map(s => (
          <div key={s._id} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                <p className="text-sky-600 text-sm font-medium mt-0.5">{s.tagline}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{s.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.features.map((f, i) => (
                    <span key={i} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-0.5">{f}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => openEdit(s)} className="btn-secondary flex-shrink-0"><Pencil className="w-4 h-4" /> Edit</button>
            </div>
          </div>
        ))}
      </div>

      {editing && form && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && (setEditing(null), setForm(null))}>
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">Edit Service</h2>
              <button onClick={() => { setEditing(null); setForm(null) }} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); if (form) save.mutate(form) }} className="p-6 space-y-4">
              <div>
                <label className="label">Service Title</label>
                <input className="input" value={form.title} onChange={e => setForm(f => f ? { ...f, title: e.target.value } : f)} required />
              </div>
              <div>
                <label className="label">Tagline</label>
                <input className="input" value={form.tagline} onChange={e => setForm(f => f ? { ...f, tagline: e.target.value } : f)} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input h-28 resize-none" value={form.description} onChange={e => setForm(f => f ? { ...f, description: e.target.value } : f)} />
              </div>
              <div>
                <label className="label">Background Image URL</label>
                <input className="input" value={form.bgImage} onChange={e => setForm(f => f ? { ...f, bgImage: e.target.value } : f)} placeholder="https://..." />
              </div>
              <div>
                <label className="label">Features</label>
                <div className="flex gap-2 mb-2">
                  <input className="input" value={featInput} onChange={e => setFeatInput(e.target.value)} placeholder="Add feature..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeat())} />
                  <button type="button" onClick={addFeat} className="btn-secondary px-3"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.features.map((feat, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-1">
                      {feat}
                      <button type="button" onClick={() => removeFeat(i)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {save.isPending ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => { setEditing(null); setForm(null) }} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
