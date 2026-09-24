import type { Trip, ChecklistItem } from './types'
import { equipmentRules, generalItems } from './rules'

export function calculateChecklist(trip: Trip): ChecklistItem[] {
  const totals = new Map<string, ChecklistItem>()

  for (const wb of trip.waterBodies) {
    for (const rule of equipmentRules) {
      if (rule.waterBodyType !== wb.type) continue
      const quantity = wb[rule.sampleType] * rule.perSample
      if (quantity === 0) continue

      // Identical items combine across all water bodies
      const key = `${rule.category}|${rule.item}`
      const existing = totals.get(key)
      if (existing) {
        existing.quantity += quantity
      } else {
        totals.set(key, { category: rule.category, item: rule.item, quantity })
      }
    }
  }

  const general = generalItems.map((g) => ({ category: 'General Equipment', ...g }))
  return [...totals.values(), ...general]
}