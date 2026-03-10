import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Save, Loader2, Globe, Phone, Mail, MapPin, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

interface Settings {
  companyName: string; tagline: string; phone: string; email: string;
  address: string; foundedYear: number; heroTitle: string; heroBadge: string;
  heroSubtitle: string; socialFacebook: string; socialTwitter: string;
  socialLinkedin: string; socialYoutube: string;
}

export default function Settings() {
  const qc = useQueryClient()
  const [form, setForm] = useState<Settings | null>(null)

  const { data, isLoading } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then(r => r.data),
  })

  useEffect(() => { if (data) setForm({ ...data }) }, [data])

  const save = useMutation({
    mutationFn: (d: Settings) => api.put('/settings', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['settings'] }); toast.success('Settings saved!') },
    onError: () => toast.error('Failed to save'),
  })

  const f = (k: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => p ? { ...p, [k]: e.target.value } : p)

  if (isLoading || !form) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage company information and website content</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => save.mutate(form)}
          disabled={save.isPending}
        >
          {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {save.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Company Info */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-500" /> Company Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Company Name</label>
            <input className="input" value={form.companyName} onChange={f('companyName')} />
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Founded Year</label>
            <input type="number" className="input" value={form.foundedYear} onChange={e => setForm(p => p ? { ...p, foundedYear: Number(e.target.value) } : p)} />
          </div>
          <div className="col-span-2">
            <label className="label">Tagline</label>
            <input className="input" value={form.tagline} onChange={f('tagline')} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-sky-500" /> Contact Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />Phone</label>
            <input className="input" value={form.phone} onChange={f('phone')} />
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email</label>
            <input type="email" className="input" value={form.email} onChange={f('email')} />
          </div>
          <div className="col-span-2">
            <label className="label flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Address</label>
            <input className="input" value={form.address} onChange={f('address')} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Hero Section</h2>
        <div>
          <label className="label">Badge Text</label>
          <input className="input" value={form.heroBadge} onChange={f('heroBadge')} placeholder="20 Years of Construction Excellence" />
        </div>
        <div>
          <label className="label">Main Title</label>
          <input className="input" value={form.heroTitle} onChange={f('heroTitle')} placeholder="Crafting Visionary Infrastructure." />
        </div>
        <div>
          <label className="label">Subtitle / Description</label>
          <textarea className="input h-24 resize-none" value={form.heroSubtitle} onChange={f('heroSubtitle')} />
        </div>
      </div>

      {/* Social Media */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Social Media Links</h2>
        <div className="grid grid-cols-2 gap-4">
          {([
            ['socialFacebook', 'Facebook URL'],
            ['socialTwitter', 'Twitter / X URL'],
            ['socialLinkedin', 'LinkedIn URL'],
            ['socialYoutube', 'YouTube URL'],
          ] as [keyof Settings, string][]).map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input className="input" value={form[key] as string} onChange={f(key)} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pb-6">
        <button
          className="btn-primary px-8"
          onClick={() => save.mutate(form)}
          disabled={save.isPending}
        >
          {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {save.isPending ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
