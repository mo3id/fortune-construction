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
  Card,
  MediaUploadField
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
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Our Services</h1>
        <p className="text-sm text-slate-500 mt-1">Manage the core service offerings and expertise displayed on the website.</p>
      </div>

      <div className="grid gap-6">
        {services.map(s => (
          <Card key={s._id} className="p-8 hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xl">{s.title}</h3>
                  {s.tagline && (
                    <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-teal-100 dark:border-teal-900/30">
                      {s.tagline}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-3xl">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-100 dark:border-slate-800">
                      <div className="w-1 h-1 rounded-full bg-teal-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" onClick={() => openEdit(s)} className="flex-shrink-0 h-10 px-5 text-xs font-bold uppercase tracking-wider">
                <Pencil className="w-4 h-4 mr-2" /> Edit Service
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
        className="max-w-2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <FormInput name="title" label="Service Title *" placeholder="e.g. Civil Engineering" />
            
            <MediaUploadField
              label="Service Icon"
              value={form.watch('icon')}
              onChange={(val) => form.setValue('icon', val)}
              onUpload={async (file) => {
                const { uploadImage } = await import('../lib/api')
                return uploadImage(file)
              }}
              accept="any"
              helperText="Choose a preset icon or upload a custom image (PNG/SVG preferred)"
            />

            <FormInput name="description" label="Description *" type="textarea" rows={4} placeholder="Detailed description..." />
            
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Key Features</label>
              <div className="flex gap-2">
                <input 
                  className="flex h-12 w-full rounded-xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all" 
                  value={featInput} 
                  onChange={e => setFeatInput(e.target.value)} 
                  placeholder="Add a core feature..." 
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeat())} 
                />
                <Button type="button" variant="secondary" onClick={addFeat} className="h-12 w-12 p-0 rounded-xl">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch('features')?.map((feat, i) => (
                  <span key={i} className="group flex items-center gap-2 text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100/50 dark:border-teal-900/30 rounded-full pl-4 pr-2 py-1.5 transition-all hover:border-teal-500/30">
                    {feat}
                    <button type="button" onClick={() => removeFeat(i)} className="w-5 h-5 rounded-full flex items-center justify-center bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300 hover:bg-rose-500 hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest text-xs">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-teal-500/20" disabled={save.isPending}>
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
