import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Loader2, Save, Plus, Trash2, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Card, Input, Textarea } from '@fortune/shared-ui'

const PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'hse', label: 'HSE & Quality' },
  { key: 'careers', label: 'Careers' },
] as const

type PageKey = typeof PAGES[number]['key']

// Section config: defines what sections exist per page and how to edit them
const SECTION_CONFIG: Record<string, { label: string; fields: FieldConfig[] }[]> = {
  home: [
    {
      label: 'Hero',
      fields: [
        { key: 'badge', label: 'Badge Text', type: 'text' },
        { key: 'title', label: 'Hero Title', type: 'text' },
        { key: 'subtitle', label: 'Hero Subtitle', type: 'textarea' },
        { key: 'videos', label: 'Background Videos', type: 'array', itemFields: [
          { key: 'url', label: 'Video URL (path or link)', type: 'text' },
        ]},
      ],
    },
    {
      label: 'Impact Metrics',
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'items', label: 'Metrics', type: 'array', itemFields: [
          { key: 'target', label: 'Target Number', type: 'number' },
          { key: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'icon', label: 'Icon (name or image URL)', type: 'text' },
        ]},
      ],
    },
  ],
  about: [
    {
      label: 'Vision',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    {
      label: 'Mission',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    {
      label: 'Timeline',
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'items', label: 'Milestones', type: 'array', itemFields: [
          { key: 'year', label: 'Year', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'text' },
        ]},
      ],
    },
    {
      label: 'Core Values',
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'items', label: 'Values', type: 'array', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'text' },
          { key: 'icon', label: 'Icon (name or image URL)', type: 'text' },
        ]},
      ],
    },
  ],
  hse: [
    {
      label: 'Policies',
      fields: [
        { key: 'items', label: 'Policy Cards', type: 'array', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'icon', label: 'Icon Name', type: 'text' },
        ]},
      ],
    },
    {
      label: 'Safety Stats',
      fields: [
        { key: 'items', label: 'Statistics', type: 'array', itemFields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
        ]},
      ],
    },
    {
      label: 'Certifications',
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'items', label: 'Certifications', type: 'array', itemFields: [
          { key: 'title', label: 'Certificate Name', type: 'text' },
          { key: 'image', label: 'Certificate Image (URL or link)', type: 'text' },
        ]},
      ],
    },
  ],
  careers: [
    {
      label: 'Benefits',
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'items', label: 'Benefits', type: 'array', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'text' },
          { key: 'icon', label: 'Icon (name or image URL)', type: 'text' },
        ]},
      ],
    },
  ],
}

interface FieldConfig {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'array'
  itemFields?: FieldConfig[]
}

// Map section labels to API section keys
function sectionKey(label: string): string {
  const map: Record<string, string> = {
    'Hero': 'hero',
    'Impact Metrics': 'impactMetrics',
    'Vision': 'vision',
    'Mission': 'mission',
    'Timeline': 'timeline',
    'Core Values': 'coreValues',
    'Policies': 'policies',
    'Safety Stats': 'safetyStats',
    'Certifications': 'certifications',
    'Benefits': 'benefits',
  }
  return map[label] || label.toLowerCase().replace(/\s+/g, '')
}

export default function PageContentEditor() {
  const [activePage, setActivePage] = useState<PageKey>('home')
  const qc = useQueryClient()

  const { data: pageData, isLoading } = useQuery<Record<string, Record<string, unknown>>>({
    queryKey: ['pageContent', activePage],
    queryFn: () => api.get(`/content/${activePage}`).then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>

  const sections = SECTION_CONFIG[activePage] || []

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
          <p className="text-sm text-gray-500 mt-0.5">Edit content for all website pages</p>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {PAGES.map(p => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-[1px] ${
              activePage === p.key
                ? 'text-sky-600 border-sky-500 bg-sky-50'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map(section => (
          <SectionEditor
            key={section.label}
            page={activePage}
            sectionLabel={section.label}
            fields={section.fields}
            initialData={(pageData?.[sectionKey(section.label)] || {}) as Record<string, unknown>}
            onSaved={() => qc.invalidateQueries({ queryKey: ['pageContent', activePage] })}
          />
        ))}
      </div>
    </div>
  )
}

function SectionEditor({
  page,
  sectionLabel,
  fields,
  initialData,
  onSaved,
}: {
  page: string
  sectionLabel: string
  fields: FieldConfig[]
  initialData: Record<string, unknown>
  onSaved: () => void
}) {
  const [data, setData] = useState<Record<string, unknown>>(initialData)
  const [expanded, setExpanded] = useState(false)

  const save = useMutation({
    mutationFn: () => api.put(`/content/${page}/${sectionKey(sectionLabel)}`, data),
    onSuccess: () => {
      toast.success(`${sectionLabel} saved!`)
      onSaved()
    },
    onError: () => toast.error('Failed to save'),
  })

  const updateField = (key: string, value: unknown) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-sky-500" />
          <h3 className="font-bold text-gray-900">{sectionLabel}</h3>
        </div>
        <span className={`text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="p-5 pt-0 space-y-4 border-t border-gray-100">
          {fields.map(field => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={data[field.key]}
              onChange={(val) => updateField(field.key, val)}
            />
          ))}

          <div className="pt-4 flex justify-end">
            <Button onClick={() => save.mutate()} disabled={save.isPending} className="min-w-[120px]">
              {save.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {save.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldConfig
  value: unknown
  onChange: (val: unknown) => void
}) {
  if (field.type === 'array' && field.itemFields) {
    const items = (Array.isArray(value) ? value : []) as Record<string, unknown>[]

    const addItem = () => {
      const empty: Record<string, unknown> = {}
      field.itemFields!.forEach(f => { empty[f.key] = f.type === 'number' ? 0 : '' })
      onChange([...items, empty])
    }

    const removeItem = (idx: number) => {
      onChange(items.filter((_, i) => i !== idx))
    }

    const updateItem = (idx: number, key: string, val: unknown) => {
      const updated = [...items]
      updated[idx] = { ...updated[idx], [key]: val }
      onChange(updated)
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4 space-y-3 relative border border-gray-200">
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-400 uppercase">#{idx + 1}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field.itemFields!.map(sub => (
                <div key={sub.key} className={sub.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">{sub.label}</label>
                  {sub.type === 'textarea' ? (
                    <Textarea
                      value={(item[sub.key] as string) || ''}
                      onChange={(e) => updateItem(idx, sub.key, e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  ) : (
                    <Input
                      type={sub.type === 'number' ? 'number' : 'text'}
                      value={item[sub.key] as string || ''}
                      onChange={(e) => updateItem(idx, sub.key, sub.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
        <Textarea
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="text-sm"
        />
      </div>
    )
  }

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
      <Input
        type={field.type === 'number' ? 'number' : 'text'}
        value={(value as string) || ''}
        onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
        className="text-sm"
      />
    </div>
  )
}
