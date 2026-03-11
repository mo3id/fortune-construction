import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Pencil, X, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { 
  useFormSchema, 
  serviceSchema, 
  ServiceFormData, 
  FormInput, 
  Form, 
  Button,
  GlobalModal,
  Card
} from '@fortune/shared-ui'

interface Service extends ServiceFormData {
  _id: string;
  tagline?: string;
  bgImage?: string;
  order?: number;
}

export default function Services() {
  const qc = useQueryClient()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [featInput, setFeatInput] = useState('')

  const form = useFormSchema({
    schema: serviceSchema,
    defaultValues: { title: '', description: '', features: [] }
  })

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (data: ServiceFormData) => api.put(`/services/${editingId}`, data),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service updated successfully!')
      setModalOpen(false)
    },
    onError: () => toast.error('Failed to save service'),
  })

  const openEdit = (s: Service) => { 
    setEditingId(s._id)
    form.reset({ 
      title: s.title, 
      description: s.description, 
      features: [...s.features],
      icon: s.icon || ''
    })
    setFeatInput('')
    setModalOpen(true)
  }

  const addFeat = () => { 
    if (featInput.trim()) { 
      const currentFeatures = form.getValues('features') || []
      form.setValue('features', [...currentFeatures, featInput.trim()])
      setFeatInput('') 
    } 
  }

  const removeFeat = (i: number) => {
    const currentFeatures = form.getValues('features') || []
    form.setValue('features', currentFeatures.filter((_, idx) => idx !== i))
  }

  const onSubmit = (data: ServiceFormData) => {
    save.mutate(data)
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-sm text-gray-500 mt-0.5">Edit the main service offerings shown on the website</p>
      </div>

      <div className="space-y-4">
        {services.map(s => (
          <Card key={s._id} className="p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                {s.tagline && <p className="text-sky-600 text-sm font-medium mt-0.5">{s.tagline}</p>}
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{s.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.features.map((f, i) => (
                    <span key={i} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-0.5">{f}</span>
                  ))}
                </div>
              </div>
              <Button variant="outline" onClick={() => openEdit(s)} className="flex-shrink-0">
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <GlobalModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Edit Service"
        type="custom"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            <FormInput name="title" label="Service Title *" placeholder="e.g. Civil Engineering" />
            <FormInput name="description" label="Description *" type="textarea" rows={4} placeholder="Detailed description..." />
            
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Features</label>
              <div className="flex gap-2 mb-2">
                <input 
                  className="flex h-10 w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  value={featInput} 
                  onChange={e => setFeatInput(e.target.value)} 
                  placeholder="Add feature..." 
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeat())} 
                />
                <Button type="button" variant="secondary" onClick={addFeat} className="px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch('features')?.map((feat, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-2 py-1">
                    {feat}
                    <button type="button" onClick={() => removeFeat(i)} className="hover:text-red-500 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 pb-2 sticky bottom-0 bg-white">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={save.isPending}>
                {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {save.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </GlobalModal>
    </div>
  )
}
