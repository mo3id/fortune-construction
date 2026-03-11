import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { CheckCircle2, AlertTriangle, Info, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type ModalType = 'success' | 'error' | 'info' | 'destructive' | 'custom'

interface GlobalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  type?: ModalType
  children?: React.ReactNode
  trigger?: React.ReactNode
  actionText?: string
  cancelText?: string
  onAction?: () => void
  onCancel?: () => void
  isLoading?: boolean
}

export function GlobalModal({
  open,
  onOpenChange,
  title,
  description,
  type = 'info',
  children,
  trigger,
  actionText = 'Confirm',
  cancelText = 'Cancel',
  onAction,
  onCancel,
  isLoading = false,
}: GlobalModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
      case 'error':
        return <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      case 'destructive':
        return <Trash2 className="w-12 h-12 text-destructive mb-4" />
      case 'info':
        return <Info className="w-12 h-12 text-blue-500 mb-4" />
      default:
        return null
    }
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center text-center">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              {getIcon()}
              
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
                {description && (
                  <DialogDescription className="text-center text-base mt-2">
                    {description}
                  </DialogDescription>
                )}
              </DialogHeader>

              {children && <div className="w-full mt-6 text-left">{children}</div>}

              {type !== 'custom' && (
                <DialogFooter className="flex gap-3 w-full sm:justify-center mt-8">
                  <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="flex-1">
                    {cancelText}
                  </Button>
                  {onAction && (
                    <Button
                      variant={type === 'destructive' || type === 'error' ? 'destructive' : 'default'}
                      onClick={onAction}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? 'Loading...' : actionText}
                    </Button>
                  )}
                </DialogFooter>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
