import { useAppStore } from '../store/useAppStore'

export default function Home() {
  const { count, increment, decrement } = useAppStore()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
      <p className="text-gray-500">React + Vite + React Router + Zustand + Tailwind</p>

      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300 transition-colors"
        >
          -
        </button>
        <span className="text-2xl font-mono w-10 text-center">{count}</span>
        <button
          onClick={increment}
          className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
        >
          +
        </button>
      </div>
    </main>
  )
}
