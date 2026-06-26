import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-bark mb-4">
            Algo salió mal
          </h1>
          <p className="text-bark-light text-lg mb-8 max-w-md">
            Intenta de nuevo
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-white rounded-lg font-medium hover:bg-moss-dark transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      )
    }

    return this.props.children
  }
}
