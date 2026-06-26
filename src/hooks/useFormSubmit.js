import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

// Modo demo cuando no hay API configurada
function simulateSubmission(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 90% de probabilidad de éxito en modo demo
      if (Math.random() > 0.1) {
        resolve({ success: true })
      } else {
        resolve({ success: false, error: 'Error simulado de red' })
      }
    }, 1500)
  })
}

export function useFormSubmit() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const isDemo = !API_URL

  const submitLead = async (data) => {
    setStatus('submitting')

    if (isDemo) {
      // Modo demo — simula el envío
      const result = await simulateSubmission(data)
      setStatus(result.success ? 'success' : 'error')
      return result
    }

    // Modo real — envía a la API
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

  return { status, submitLead, reset, isDemo }
}
