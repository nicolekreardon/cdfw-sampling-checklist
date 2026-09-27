import type { Trip, ChecklistItem, EquipmentRule } from './types'
import { equipmentRules, alwaysBringItems, smithrootConditionalItems, planktonConditionalItems } from './rules'

function sampleRuleQuantity(rule: EquipmentRule, samples: number): number {
  if (samples <= 0) return 0
  return rule.firstSampleQty + rule.perAdditionalSampleQty * (samples - 1)
}

export function calculateChecklist(trip: Trip): ChecklistItem[] {
  const totals = new Map<string, ChecklistItem>()

  function addItem(category: string, item: string, quantity: number) {
    if (quantity <= 0) return
    const key = `${category}|${item}`
    const existing = totals.get(key)
    if (existing) {
      existing.quantity += quantity
    } else {
      totals.set(key, { category, item, quantity })
    }
  }

  let needsSmithroot = false
  let needsPlankton = false
  let waterBodiesWithPlankton = 0

  for (const wb of trip.waterBodies) {
    if (wb.smithroot > 0) needsSmithroot = true
    if (wb.plankton > 0) {
      needsPlankton = true
      waterBodiesWithPlankton += 1
    }

    for (const rule of equipmentRules) {
      if (rule.waterBodyType !== wb.type) continue
      const samples = wb[rule.sampleType]
      addItem(rule.category, rule.item, sampleRuleQuantity(rule, samples))
    }
  }

  for (const g of alwaysBringItems) addItem('General Equipment', g.item, g.quantity)
  if (needsSmithroot) {
    for (const g of smithrootConditionalItems) addItem('General Equipment', g.item, g.quantity)
  }
  if (needsPlankton) {
    for (const g of planktonConditionalItems) addItem('General Equipment', g.item, g.quantity)
    addItem('General Equipment', 'Plankton net', waterBodiesWithPlankton)
  }

  return [...totals.values()]
}

export function calculateByWaterBody(
  trip: Trip,
): { waterBodyId: string; items: ChecklistItem[] }[] {
  return trip.waterBodies.map((wb) => {
    const items: ChecklistItem[] = []

    for (const rule of equipmentRules) {
      if (rule.waterBodyType !== wb.type) continue
      const samples = wb[rule.sampleType]
      const quantity = sampleRuleQuantity(rule, samples)
      if (quantity === 0) continue
      items.push({ category: rule.category, item: rule.item, quantity })
    }

    return { waterBodyId: wb.id, items }
  })
}