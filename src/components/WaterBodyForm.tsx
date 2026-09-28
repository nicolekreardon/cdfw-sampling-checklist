import { useState } from 'react'
import type { WaterBody, WaterBodyType } from '../types'

interface Props {
  initial?: WaterBody
  onSave: (data: Omit<WaterBody, 'id'>) => void
  onCancel?: () => void
}

const SAMPLE_OPTIONS = Array.from({ length: 11 }, (_, i) => i) // 0 through 10

export default function WaterBodyForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [type, setType] = useState<WaterBodyType>(initial?.type ?? 'river')
  const [smithroot, setSmithroot] = useState(initial?.smithroot ?? 0)
  const [plankton, setPlankton] = useState(initial?.plankton ?? 0)
  const [error, setError] = useState('')

  function handleSave() {
    if (smithroot + plankton === 0) {
      setError('Enter at least one sample.')
      return
    }
    onSave({ name: name.trim(), type, smithroot, plankton })
    if (!initial) {
      setName('')
      setType('river')
      setSmithroot(0)
      setPlankton(0)
    }
    setError('')
  }

  return (
    <div className="space-y-3 rounded-lg border border-gray-300 bg-white p-4">
      <div>
        <label className="block text-sm font-medium">
          Water body name <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sacramento River"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={type === 'river'}
            onChange={() => setType('river')}
          />
          River
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={type === 'non-river'}
            onChange={() => setType('non-river')}
          />
          Non-river
        </label>
      </div>

            <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Smith-Root samples</label>
          <div className="mt-1 flex gap-2">
            <select
              className="w-full rounded border border-gray-300 p-2"
              value={smithroot}
              onChange={(e) => setSmithroot(Number(e.target.value))}
            >
              {SAMPLE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {smithroot > 0 && (
              <button
                type="button"
                onClick={() => setSmithroot(0)}
                className="whitespace-nowrap rounded border border-gray-300 px-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Plankton tow samples</label>
          <div className="mt-1 flex gap-2">
            <select
              className="w-full rounded border border-gray-300 p-2"
              value={plankton}
              onChange={(e) => setPlankton(Number(e.target.value))}
            >
              {SAMPLE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {plankton > 0 && (
              <button
                type="button"
                onClick={() => setPlankton(0)}
                className="whitespace-nowrap rounded border border-gray-300 px-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          {initial ? 'Save changes' : 'Add water body'}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}