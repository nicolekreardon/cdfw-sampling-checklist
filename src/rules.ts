import type { EquipmentRule, GeneralItem } from './types'

export const equipmentRules: EquipmentRule[] = [
  { item: 'Item A', category: 'Smithroot', waterBodyType: 'river',     sampleType: 'smithroot', perSample: 1 },
  { item: 'Item B', category: 'Smithroot', waterBodyType: 'river',     sampleType: 'smithroot', perSample: 2 },
  { item: 'Item A', category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', perSample: 1 },
  { item: 'Item C', category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', perSample: 1 },
  { item: 'Item D', category: 'Plankton Tow', waterBodyType: 'river',     sampleType: 'plankton', perSample: 1 },
  { item: 'Item E', category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', perSample: 1 },
]

export const generalItems: GeneralItem[] = [
  { item: 'Cooler', quantity: 3 },
  { item: 'Sharpies', quantity: 2 },
  { item: 'Field notebook', quantity: 1 },
]