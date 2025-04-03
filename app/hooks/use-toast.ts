"use client"

import { useState, useCallback } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, variant = "default" }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismiss(id)
    }, 5000)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toast, dismiss, toasts }
}

// Export the toast function for direct use
// export const { toast, dismiss, toasts } = useToast()

