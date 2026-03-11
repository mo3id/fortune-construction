import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { 
  useFormSchema, 
  partnerSchema, 
  PartnerFormData, 
  FormInput, 
  Form, 
  Button,
  GlobalModal,
  Card
} from '@fortune/shared-ui'

interface Partner extends PartnerFormData {
  _id: string;
}

const EMPTY_FORM: PartnerFormData = { name: '', logo: '', website: '', description: '', order: 0 }

export default function Partners() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const form = useFormSchema({
    schema: partnerSchema,
    defaultValues: EMPTY_FORM
  })

  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: () => api.get('/partners').then(r => r.data),
  })

  const save = useMutation({
    mutationFn: (data: PartnerFormData) => 
      editingId ? api.put(`/partners/${editingId}`, data) : api.post('/partners', data),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['partners'] })
      toast.success('Partner saved successfully!')
      setModalOpen(false) 
    },
    onError: () => toast.error('Failed to save partner'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/partners/${id}`),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['partners'] })
      toast.success('Partner deleted') 
    },
  })

  const openAdd = () => { 
    setEditingId(null)
    form.reset(EMPTY_FORM)
    setModalOpen(true)
  }
  
  const openEdit = (p: Partner) => { 
    setEditingId(p._id)
    form.reset({
      name: p.name,
      logo: p.logo || '',
      website: p.website || '',
      description: p.description || '',
      order: p.order || 0
    })
    setModalOpen(true)
  }

  const onSubmit = (data: PartnerFormData) => {
    save.mutate(data)
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-sm text-gray-500 mt-0.5">{partners.length} partners total</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" /> Add Partner
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {partners.map(p => (
          <Card key={p._id} className="p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all duration-300">
            {p.logo ? (
              <img src={p.logo} alt={p.name} className="h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl shadow-sm border border-slate-200">
                {p.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            
            <div className="flex-1 mt-2">
              <p className="font-bold text-gray-900 text-sm">{p.name}</p>
              {p.website && <p className="text-xs text-sky-500 mt-1 line-clamp-1">{p.website}</p>}
            </div>

            <div className="flex gap-2 w-full mt-3">
              <Button variant="outline" onClick={() => openEdit(p)} className="flex-1 h-8 text-xs">
                <Pencil className="w-3 h-3 mr-2" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => setDeleteId(p._id)} className="h-8 px-3">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <GlobalModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Partner"
        description="Are you sure you want to delete this partner?"
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
        title={editingId ? 'Edit Partner' : 'Add Partner'}
        type="custom"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
            <FormInput name="name" label="Partner Name *" placeholder="e.g. African Development Bank" />
            <FormInput name="logo" label="Logo URL" placeholder="https://..." />
            <FormInput name="website" label="Website URL" placeholder="https://..." />
            <FormInput name="description" label="Short Description" type="textarea" rows={2} />
            <FormInput name="order" label="Display Order" type="number" />
            
            <div className="flex gap-3 pt-4 pb-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={save.isPending}>
                {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {save.isPending ? 'Saving...' : 'Save Partner'}
              </Button>
            </div>
          </form>
        </Form>
      </GlobalModal>
    </div>
  )
}
