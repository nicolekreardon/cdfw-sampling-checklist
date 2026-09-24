import { useState } from 'react'
import type { ChecklistItem, Trip, WaterBody } from './types'
import WaterBodyForm from './components/WaterBodyForm'
import { calculateChecklist } from './calculate'

export default function App() {
  const [tripName, setTripName] = useState('')
  const [waterBodies, setWaterBodies] = useState<WaterBody[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [view, setView] = useState<'build' | 'checklist'>('build')

  const trip: Trip = {
    id: 'current',
    name: tripName.trim() || 'Untitled trip',
    createdAt: new Date().toISOString(),
    waterBodies,
  }

  function addWaterBody(data: Omit<WaterBody, 'id'>) {
    setWaterBodies((prev) => [...prev, { id: crypto.randomUUID(), ...data }])
  }

  function updateWaterBody(id: string, data: Omit<WaterBody, 'id'>) {
    setWaterBodies((prev) => prev.map((wb) => (wb.id === id ? { id, ...data } : wb)))
    setEditingId(null)
  }

  function deleteWaterBody(id: string) {
    setWaterBodies((prev) => prev.filter((wb) => wb.id !== id))
  }

  if (view === 'checklist') {
    const checklist = calculateChecklist(trip)
    const grouped = checklist.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
      ;(acc[item.category] ??= []).push(item)
      return acc
    }, {})

    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <h1 className="text-2xl font-bold text-blue-700">Equipment Checklist</h1>
        <p className="text-gray-600">Trip: {trip.name}</p>

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-2 text-lg font-semibold">{category}</h2>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.item}>
                  ☐ {item.item} × {item.quantity}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <button
          onClick={() => setView('build')}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          ← Back to trip
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-blue-700">Sampling Checklist</h1>

      <div>
        <label className="block text-sm font-medium">Trip name</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 p-2"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="e.g. Fall Sampling, September 2026"
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your trip</h2>
        {waterBodies.length === 0 && (
          <p className="text-gray-500">No water bodies yet. Add one below.</p>
        )}

        {waterBodies.map((wb) =>
          editingId === wb.id ? (
            <WaterBodyForm
              key={wb.id}
              initial={wb}
              onSave={(data) => updateWaterBody(wb.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={wb.id}
              className="flex items-start justify-between rounded-lg border border-gray-300 bg-white p-4"
            >
              <div>
                <p className="font-medium">{wb.name}</p>
                <p className="text-sm text-gray-600">
                  {wb.type === 'river' ? 'River' : 'Non-river'}
                </p>
                <p className="text-sm">Smithroot: {wb.smithroot}</p>
                <p className="text-sm">Plankton tow: {wb.plankton}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <button className="text-blue-700 hover:underline" onClick={() => setEditingId(wb.id)}>
                  Edit
                </button>
                <button className="text-red-600 hover:underline" onClick={() => deleteWaterBody(wb.id)}>
                  Delete
                </button>
              </div>
            </div>
          ),
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Add a water body</h2>
        <WaterBodyForm onSave={addWaterBody} />
      </section>

      <button
        onClick={() => setView('checklist')}
        disabled={waterBodies.length === 0}
        className="rounded bg-green-700 px-5 py-2 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Generate Checklist
      </button>
    </div>
  )
}