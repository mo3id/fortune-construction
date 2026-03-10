import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, uploadImage } from '../lib/api'
import { Plus, Pencil, Trash2, X, Loader2, MapPin, DollarSign, Clock, ImagePlus } from 'lucide-react'
import toast from 'react-hot-toast'

interface Project {
  _id: string; title: string; category: string; location: string;
  duration: string; budget: string; coverImage: string; completionDate: string;
  challenge: string; solution: string; result: string; galleryImages: string[];
}

const EMPTY: Omit<Project, '_id'> = {
  title: '', category: 'Infrastructure', location: '', duration: '', budget: '',
  coverImage: '', completionDate: '', challenge: '', solution: '', result: '', galleryImages: [],
}

export default function Projects() {
  const qc = useQueryClient()
  const [modal, setModal] = useState<null | 'add' | Project>(null)
  const [form, setForm] = useState<Omit<Project, '_id'>>(EMPTY)
  const [uploading, setUploading] = useState(false)

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (data: Omit<Project, '_id'>) =>
      modal === 'add'
        ? api.post('/projects', data)
        : api.put(`/projects/${(modal as Project)._id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); toast.success('Saved!'); setModal(null) },
    onError: () => toast.error('Failed to save'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); toast.success('Deleted') },
    onError: () => toast.error('Failed to delete'),
  })

  const openAdd = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (p: Project) => { setForm({ ...p }); setModal(p) }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    try { const url = await uploadImage(file); setForm(f => ({ ...f, coverImage: url })) }
    catch { toast.error('Image upload failed') }
    finally { setUploading(false) }
  }

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} projects total</p>
        </div>
        <button className="btn-primary" onClick={openAdd}><Plus className="w-4 h-4" /> Add Project</button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map(p => (
          <div key={p._id} className="card overflow-hidden group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {p.coverImage
                ? <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImagePlus className="w-10 h-10" /></div>}
              <span className="absolute top-3 left-3 text-xs font-bold bg-sky-500 text-white px-2.5 py-1 rounded-lg">{p.category}</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-1">{p.title}</h3>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5 text-sky-500" />{p.location}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><DollarSign className="w-3.5 h-3.5 text-sky-500" />{p.budget}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><Clock className="w-3.5 h-3.5 text-sky-500" />{p.duration}</div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-50">
                <button onClick={() => openEdit(p)} className="btn-secondary flex-1 justify-center text-xs py-1.5"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                <button onClick={() => { if (confirm('Delete this project?')) remove.mutate(p._id) }} className="btn-danger"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add Project' : 'Edit Project'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); save.mutate(form) }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Project Title *</label>
                  <input className="input" value={form.title} onChange={f('title')} required placeholder="e.g. Lilongwe Grand Bridge" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select className="input" value={form.category} onChange={f('category')}>
                    <option>Infrastructure</option><option>Commercial</option><option>Residential</option><option>Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="label">Location *</label>
                  <input className="input" value={form.location} onChange={f('location')} required placeholder="Lilongwe, Malawi" />
                </div>
                <div>
                  <label className="label">Duration</label>
                  <input className="input" value={form.duration} onChange={f('duration')} placeholder="24 Months" />
                </div>
                <div>
                  <label className="label">Budget</label>
                  <input className="input" value={form.budget} onChange={f('budget')} placeholder="$15M USD" />
                </div>
                <div>
                  <label className="label">Completion Date</label>
                  <input className="input" value={form.completionDate} onChange={f('completionDate')} placeholder="October 2024" />
                </div>
                <div>
                  <label className="label">Cover Image URL</label>
                  <input className="input" value={form.coverImage} onChange={f('coverImage')} placeholder="https://..." />
                </div>
                <div className="flex items-end">
                  <label className="btn-secondary w-full justify-center cursor-pointer">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {form.coverImage && <div className="col-span-2"><img src={form.coverImage} className="h-32 w-full object-cover rounded-lg border border-gray-200" alt="preview" /></div>}
                <div className="col-span-2">
                  <label className="label">The Challenge</label>
                  <textarea className="input h-20 resize-none" value={form.challenge} onChange={f('challenge')} placeholder="Describe the main challenge..." />
                </div>
                <div className="col-span-2">
                  <label className="label">The Solution</label>
                  <textarea className="input h-20 resize-none" value={form.solution} onChange={f('solution')} placeholder="Describe the solution approach..." />
                </div>
                <div className="col-span-2">
                  <label className="label">The Result</label>
                  <textarea className="input h-20 resize-none" value={form.result} onChange={f('result')} placeholder="Describe the outcome..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {save.isPending ? 'Saving...' : 'Save Project'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
