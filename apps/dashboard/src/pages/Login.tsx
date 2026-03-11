import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HardHat, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { authStorage } from '../lib/auth'
import toast from 'react-hot-toast'
import { useFormSchema, loginSchema, LoginFormData, FormInput, Form, Button } from '@fortune/shared-ui'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useFormSchema({
    schema: loginSchema,
    defaultValues: { username: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', data)
      authStorage.setToken(res.data.token)
      authStorage.setUser({ username: res.data.username })
      toast.success('Welcome back!')
      navigate('/')
    } catch {
      toast.error('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 rounded-2xl shadow-2xl shadow-sky-500/40 mb-4">
            <HardHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Fortune Construction</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormInput 
                name="username" 
                label="Username" 
                placeholder="admin" 
                disabled={loading}
              />
              <FormInput 
                name="password" 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                disabled={loading}
              />
              
              <Button type="submit" className="w-full h-11 text-base mt-2" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-slate-500 mt-8">
            Default: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">admin</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
