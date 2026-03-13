import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, uploadImage } from '../lib/api'
import { Plus, Pencil, Trash2, Loader2, ImagePlus } from 'lucide-react'
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

const EMPTY_FORM: PartnerFormData = { name: '', abbr: '', logo: '', website: '', description: '', order: 0 }

export default function Partners() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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

  const handleLogoUpload = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      form.setValue('logo', url)
    } catch { toast.error('Upload failed') }
    finally { setUploading(false) }
  }

  const openAdd = () => { 
    setEditingId(null)
    form.reset(EMPTY_FORM)
    setModalOpen(true)
  }
  
  const openEdit = (p: Partner) => { 
    setEditingId(p._id)
    form.reset({
      name: p.name,
      abbr: p.abbr || '',
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
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Business Partners</h1>
          <p className="text-sm text-slate-500 mt-1">Manage corporate partners and client logos displayed on the site.</p>
        </div>
        <Button onClick={openAdd} className="shadow-lg shadow-teal-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Partner
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.map(p => (
          <Card key={p._id} className="p-6 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 group">
            <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-50 dark:border-slate-800 group-hover:border-teal-500/20 transition-colors">
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-900/40 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-2xl shadow-inner">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1 w-full">
              <p className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">{p.name}</p>
              {p.website ? (
                <a href={p.website} target="_blank" rel="noreferrer" className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1.5 hover:underline block truncate uppercase tracking-wider">{p.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
              ) : (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">No Website Linked</p>
              )}
            </div>

            <div className="flex gap-2 w-full mt-2 pt-4 border-t border-slate-50 dark:border-slate-800">
              <Button variant="outline" onClick={() => openEdit(p)} className="flex-1 h-9 text-[10px] font-bold uppercase tracking-wider">
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => setDeleteId(p._id)} className="h-9 px-3">
                <Trash2 className="w-3.5 h-3.5" />
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
            <div className="grid grid-cols-2 gap-4">
              <FormInput name="name" label="Partner Name *" placeholder="e.g. African Development Bank" />
              <FormInput name="abbr" label="Abbreviation *" placeholder="e.g. AfDB" />
            </div>
            <FormInput name="logo" label="Logo (URL or Upload)" placeholder="https://..." />
            <div className="flex items-end">
              <Button type="button" variant="outline" className="w-full relative overflow-hidden" disabled={uploading}>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleLogoUpload(e.target.files?.[0] || null)} />
                {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Upload Logo'}
              </Button>
            </div>
            {form.watch('logo') && (
              <div className="flex justify-center">
                <img src={form.watch('logo')} alt="Logo preview" className="h-16 object-contain rounded border border-slate-200 p-1" />
              </div>
            )}
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
