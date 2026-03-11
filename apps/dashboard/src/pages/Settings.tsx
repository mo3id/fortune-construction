import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Save, Loader2, Globe, Phone, Mail, MapPin, Calendar, Share2, Type } from 'lucide-react'
import { toast } from 'sonner'
import { 
  useFormSchema, 
  settingsSchema, 
  SettingsFormData, 
  FormInput, 
  Form, 
  Button,
  Card
} from '@fortune/shared-ui'

export default function Settings() {
  const qc = useQueryClient()

  const form = useFormSchema({
    schema: settingsSchema,
    defaultValues: {
      companyName: '', tagline: '', phone: '', email: '',
      address: '', foundedYear: new Date().getFullYear(), 
      heroTitle: '', heroBadge: '', heroSubtitle: '', 
      socialFacebook: '', socialTwitter: '', socialLinkedin: '', socialYoutube: ''
    }
  })

  const { data, isLoading } = useQuery<SettingsFormData>({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then(r => r.data),
  })

  useEffect(() => { 
    if (data) form.reset(data) 
  }, [data, form])

  const save = useMutation({
    mutationFn: (d: SettingsFormData) => api.put('/settings', d),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Settings saved successfully!') 
    },
    onError: () => toast.error('Failed to save settings'),
  })

  const onSubmit = (data: SettingsFormData) => {
    save.mutate(data)
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage company information and website content</p>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={save.isPending}>
          {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {save.isPending ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Info */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Globe className="w-5 h-5 text-sky-500" /> Company Information
            </h2>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <FormInput name="companyName" label="Company Name" />
              <FormInput name="foundedYear" label="Founded Year" type="number" />
              <div className="md:col-span-2">
                <FormInput name="tagline" label="Tagline" />
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Phone className="w-5 h-5 text-sky-500" /> Contact Details
            </h2>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
                <div className="[&_input]:pl-9"><FormInput name="phone" label="Phone Number" placeholder="+265 123 456 789" /></div>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
                <div className="[&_input]:pl-9"><FormInput name="email" label="Email Address" type="email" /></div>
              </div>
              <div className="md:col-span-2 relative">
                <MapPin className="absolute left-3 top-9 w-4 h-4 text-slate-400" />
                <div className="[&_input]:pl-9"><FormInput name="address" label="Office Address" /></div>
              </div>
            </div>
          </Card>

          {/* Hero Section */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Type className="w-5 h-5 text-sky-500" /> Website Hero Section
            </h2>
            <div className="space-y-4">
              <FormInput name="heroBadge" label="Badge Text" placeholder="e.g. 20 Years of Construction Excellence" />
              <FormInput name="heroTitle" label="Main Title" placeholder="e.g. Crafting Visionary Infrastructure." />
              <FormInput name="heroSubtitle" label="Subtitle / Description" type="textarea" rows={3} />
            </div>
          </Card>

          {/* Social Media */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Share2 className="w-5 h-5 text-sky-500" /> Social Media Links
            </h2>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <FormInput name="socialFacebook" label="Facebook URL" placeholder="https://facebook.com/..." />
              <FormInput name="socialTwitter" label="Twitter / X URL" placeholder="https://twitter.com/..." />
              <FormInput name="socialLinkedin" label="LinkedIn URL" placeholder="https://linkedin.com/in/..." />
              <FormInput name="socialYoutube" label="YouTube URL" placeholder="https://youtube.com/..." />
            </div>
          </Card>
        </form>
      </Form>
    </div>
  )
}
