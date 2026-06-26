import React, { Suspense, lazy } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import './i18n'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import { ArrowLeft } from 'lucide-react'

const ContactPage = lazy(() => import('./pages/ContactPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))

function ScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl sm:text-5xl text-bark mb-4">
        Página no encontrada
      </h1>
      <p className="text-bark-light text-lg mb-8 max-w-md">
        La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-white rounded-lg font-medium hover:bg-moss-dark transition-colors"
      >
        <ArrowLeft size={18} />
        Volver al inicio
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-moss border-t-transparent rounded-full animate-spin" /></div>}>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/experiencia/:id" element={<ExperiencePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
}
