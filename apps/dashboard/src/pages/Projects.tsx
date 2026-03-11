import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, uploadImage } from '../lib/api'
import { Plus, Pencil, Trash2, Loader2, MapPin, DollarSign, Clock, ImagePlus } from 'lucide-react'
import { toast } from 'sonner'
import { 
  useFormSchema, 
  projectSchema, 
  ProjectFormData, 
  FormInput, 
  Form, 
  Button,
  GlobalModal,
  Card
} from '@fortune/shared-ui'

interface Project extends ProjectFormData {
  _id: string;
}

const EMPTY_FORM: ProjectFormData = {
  title: '', category: 'Infrastructure', location: '', duration: '', budget: '',
  coverImage: '', completionDate: '', challenge: '', solution: '', result: '', galleryImages: [],
}

export default function Projects() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const form = useFormSchema({
    schema: projectSchema,
    defaultValues: EMPTY_FORM
  })

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (data: ProjectFormData) =>
      editingId ? api.put(`/projects/${editingId}`, data) : api.post('/projects', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project saved successfully!')
      setModalOpen(false)
    },
    onError: () => toast.error('Failed to save project'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project deleted successfully')
    },
  })

  const openAdd = () => {
    setEditingId(null)
    form.reset(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditingId(p._id)
    form.reset(p)
    setModalOpen(true)
  }

  const handleImageUpload = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      form.setValue('coverImage', url)
    } catch {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = (data: ProjectFormData) => {
    save.mutate(data)
  }

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} projects total</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map(p => (
          <Card key={p._id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              {p.coverImage
                ? <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImagePlus className="w-10 h-10" /></div>}
              <span className="absolute top-3 left-3 text-xs font-bold bg-sky-500 text-white px-2.5 py-1 rounded-lg shadow-sm">
                {p.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-1">{p.title}</h3>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5 text-sky-500" />{p.location}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><DollarSign className="w-3.5 h-3.5 text-sky-500" />{p.budget}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><Clock className="w-3.5 h-3.5 text-sky-500" />{p.duration}</div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={() => openEdit(p)} className="flex-1 h-8 text-xs">
                  <Pencil className="w-3.5 h-3.5 mr-2" /> Edit
                </Button>
                <Button variant="destructive" onClick={() => setDeleteId(p._id)} className="h-8 px-3">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <GlobalModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        type="destructive"
        actionText="Delete"
        onAction={() => {
          if (deleteId) remove.mutate(deleteId)
          setDeleteId(null)
        }}
      />

      <GlobalModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'Edit Project' : 'Add Project'}
        type="custom"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            <FormInput name="title" label="Project Title *" placeholder="e.g. Lilongwe Grand Bridge" />
            
            <div className="grid grid-cols-2 gap-4">
              <FormInput 
                name="category" 
                label="Category" 
                type="select" 
                options={[
                  { label: 'Infrastructure', value: 'Infrastructure' },
                  { label: 'Commercial', value: 'Commercial' },
                  { label: 'Residential', value: 'Residential' },
                  { label: 'Industrial', value: 'Industrial' }
                ]} 
              />
              <FormInput name="location" label="Location *" placeholder="Lilongwe, Malawi" />
              <FormInput name="duration" label="Duration" placeholder="24 Months" />
              <FormInput name="budget" label="Budget" placeholder="$15M USD" />
              <FormInput name="completionDate" label="Completion Date" placeholder="October 2024" />
              <FormInput name="coverImage" label="Cover Image URL" placeholder="https://..." />
            </div>

            <div className="flex items-end">
              <Button type="button" variant="outline" className="w-full relative overflow-hidden" disabled={uploading}>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e.target.files?.[0] || null)} />
                {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Upload Cover Image'}
              </Button>
            </div>
            
            {form.watch('coverImage') && (
              <div className="mt-2">
                <img src={form.watch('coverImage')} className="h-32 w-full object-cover rounded-lg border border-slate-200" alt="preview" />
              </div>
            )}

            <FormInput name="challenge" label="The Challenge" type="textarea" placeholder="Describe the main challenge..." rows={3} />
            <FormInput name="solution" label="The Solution" type="textarea" placeholder="Describe the solution approach..." rows={3} />
            <FormInput name="result" label="The Result" type="textarea" placeholder="Describe the outcome..." rows={3} />

            <div className="flex gap-3 pt-4 pb-2 sticky bottom-0 bg-white">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="flex-1" disabled={save.isPending}>
                {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {save.isPending ? 'Saving...' : 'Save Project'}
              </Button>
            </div>
          </form>
        </Form>
      </GlobalModal>
    </div>
  )
}
