import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, uploadImage } from '../lib/api'
import { Plus, Pencil, Trash2, Loader2, Quote } from 'lucide-react'
import { toast } from 'sonner'
import { 
  useFormSchema, 
  successStorySchema, 
  SuccessStoryFormData, 
  FormInput, 
  Form, 
  Button,
  GlobalModal,
  Card,
  MediaUploadField
} from '@fortune/shared-ui'

interface SuccessStory extends SuccessStoryFormData {
  _id: string;
}

const EMPTY_FORM: SuccessStoryFormData = { quote: '', author: '', org: '', initials: '', image: '', order: 0 }

export default function SuccessStories() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const form = useFormSchema({
    schema: successStorySchema,
    defaultValues: EMPTY_FORM
  })

  const { data: stories = [], isLoading } = useQuery<SuccessStory[]>({
    queryKey: ['success-stories'],
    queryFn: () => api.get('/success-stories').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (data: SuccessStoryFormData) => 
      editingId ? api.put(`/success-stories/${editingId}`, data) : api.post('/success-stories', data),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['success-stories'] })
      toast.success(editingId ? 'Story updated successfully!' : 'Story created successfully!')
      setModalOpen(false) 
    },
    onError: () => toast.error('Failed to save story'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/success-stories/${id}`),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['success-stories'] })
      toast.success('Story deleted') 
    },
  })

  const openAdd = () => { 
    setEditingId(null)
    form.reset(EMPTY_FORM)
    setModalOpen(true)
  }
  
  const openEdit = (s: SuccessStory) => { 
    setEditingId(s._id)
    form.reset({
      quote: s.quote,
      author: s.author,
      org: s.org,
      initials: s.initials,
      image: s.image || '',
      order: s.order || 0
    })
    setModalOpen(true)
  }

  const onSubmit = (data: SuccessStoryFormData) => {
    save.mutate(data)
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Success Stories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client testimonials and success stories displayed on the website.</p>
        </div>
        <Button onClick={openAdd} className="shadow-lg shadow-teal-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Story
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {stories.map(s => (
          <Card key={s._id} className="p-8 hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-teal-500 flex-shrink-0">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed line-clamp-4 flex-1">
                "{s.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-4">
                {s.image ? (
                  <img src={s.image} alt={s.author} className="w-12 h-12 rounded-2xl object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-slate-900 dark:bg-black rounded-2xl flex items-center justify-center text-white font-display font-black text-sm flex-shrink-0">
                    {s.initials}
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{s.author}</p>
                  <p className="text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-widest">{s.org}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" onClick={() => openEdit(s)} className="h-9 px-3">
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" onClick={() => setDeleteId(s._id)} className="h-9 px-3">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {stories.length === 0 && (
        <Card className="p-16 text-center border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <Quote className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">No success stories yet. Add your first testimonial.</p>
        </Card>
      )}

      <GlobalModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Story"
        description="Are you sure you want to delete this success story?"
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
        title={editingId ? 'Edit Success Story' : 'Add Success Story'}
        type="custom"
        className="max-w-2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <FormInput name="quote" label="Quote / Testimonial *" type="textarea" rows={4} placeholder="What did the client say about your work?" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput name="author" label="Author Name *" placeholder="e.g. Principal Secretary" />
              <FormInput name="org" label="Organization *" placeholder="e.g. Ministry of Transport" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput name="initials" label="Initials *" placeholder="e.g. PS" />
              <FormInput name="order" label="Display Order" type="number" />
            </div>

            <MediaUploadField
              label="Author Photo (Optional)"
              value={form.watch('image')}
              onChange={(val) => form.setValue('image', val)}
              onUpload={uploadImage}
              accept="image"
              helperText="Upload a photo of the author (optional)"
            />
            
            <div className="flex gap-4 pt-6 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest text-xs">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-teal-500/20" disabled={save.isPending}>
                {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {save.isPending ? 'Saving...' : 'Save Story'}
              </Button>
            </div>
          </form>
        </Form>
      </GlobalModal>
    </div>
  )
}
