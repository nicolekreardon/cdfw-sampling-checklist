import { useState } from 'react'
import type { ChecklistItem, Trip, WaterBody } from './types'
import WaterBodyForm from './components/WaterBodyForm'
import { calculateByWaterBody, calculateChecklist } from './calculate'

function displayName(wb: WaterBody, index: number): string {
  return wb.name.trim() || `Water Body ${index + 1}`
}

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

    const byWaterBody = calculateByWaterBody(trip)

    return (
      <div className="mx-auto max-w-2xl space-y-8 p-6">
        <h1 className="text-2xl font-bold text-blue-700">Equipment Checklist</h1>
        <p className="text-gray-600">Trip: {trip.name}</p>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Total Quantities to Gather</h2>
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category} className="mb-4">
              <h3 className="mb-2 text-lg font-medium">{category}</h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.item}>
                    ☐ {item.item}
                    {!(category === 'General Equipment' && item.quantity === 1) &&
                      ` × ${item.quantity}`}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Breakdown by Water Body</h2>
          {byWaterBody.map(({ waterBodyId, items }, index) => {
            const wb = waterBodies.find((w) => w.id === waterBodyId)
            if (!wb) return null
            return (
              <section key={waterBodyId} className="mb-4 rounded-lg border border-gray-300 bg-white p-4">
                <h3 className="mb-2 text-lg font-medium">
                  {displayName(wb, index)} <span className="text-sm font-normal text-gray-500">
                    ({wb.type === 'river' ? 'River' : 'Non-river'})
                  </span>
                </h3>
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500">No equipment needed.</p>
                ) : (
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item.item}>
                        {item.item} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>

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

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Add a water body</h2>
        <WaterBodyForm onSave={addWaterBody} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your trip</h2>
        {waterBodies.length === 0 && (
          <p className="text-gray-500">No water bodies yet. Add one above.</p>
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
                <p className="font-medium">{displayName(wb, waterBodies.indexOf(wb))}</p>
                <p className="text-sm text-gray-600">
                  {wb.type === 'river' ? 'River' : 'Non-river'}
                </p>
                <p className="text-sm">Smith-Root: {wb.smithroot}</p>
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