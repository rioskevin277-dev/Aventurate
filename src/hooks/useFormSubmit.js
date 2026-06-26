import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useFormSubmit() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const submitLead = async (data) => {
    setStatus('submitting')

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'landing-la-ruta-de-la-lana',
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar')
      }

      setStatus('success')
      return { success: true }
    } catch (error) {
      setStatus('error')
      return { success: false, error: error.message }
    }
  }

  const reset = () => setStatus('idle')

  return { status, submitLead, reset }
}
