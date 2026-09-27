import type { EquipmentRule, GeneralItem } from './types'

export const equipmentRules: EquipmentRule[] = [
  // Non-river Smithroot
  { item: 'Ziploc bag',        category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Gloves',            category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Sharpie',           category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Blank filter',      category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 0 },
  { item: 'Real filter',       category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Tap water bottle',  category: 'Smithroot', waterBodyType: 'non-river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 0 },

  // River Smithroot
  { item: 'Ziploc bag',        category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Gloves',            category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Sharpie',           category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Blank filter',      category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Real filter',       category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Tap water bottle',  category: 'Smithroot', waterBodyType: 'river', sampleType: 'smithroot', firstSampleQty: 1, perAdditionalSampleQty: 1 },

  // Non-river Plankton Tow
  { item: 'Ziploc bag',                 category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Gloves',                     category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Sharpie',                    category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Tap water bottle',           category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 2, perAdditionalSampleQty: 0 },
  { item: 'Cooler blank falcon tube',   category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 0 },
  { item: 'PT blank falcon tube',       category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 0 },
  { item: 'Real sample falcon tube',    category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Whirl pack',                 category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 2, perAdditionalSampleQty: 1 },
  { item: 'Plankton sample bottle',     category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Extra ziploc (for plankton sample bottles)', category: 'Plankton Tow', waterBodyType: 'non-river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 0 },

  // River Plankton Tow
  { item: 'Ziploc bag',                 category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Gloves',                     category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Sharpie',                    category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Tap water bottle',           category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 2, perAdditionalSampleQty: 2 },
  { item: 'Cooler blank falcon tube',   category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 0 },
  { item: 'PT blank falcon tube',       category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Real sample falcon tube',    category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Whirl pack',                 category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 2, perAdditionalSampleQty: 2 },
  { item: 'Plankton sample bottle',     category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 1 },
  { item: 'Extra ziploc (for plankton sample bottles)', category: 'Plankton Tow', waterBodyType: 'river', sampleType: 'plankton', firstSampleQty: 1, perAdditionalSampleQty: 0 },
]

// Brought on every trip, regardless of what's being sampled
export const alwaysBringItems: GeneralItem[] = [
  { item: 'Cooler', quantity: 1 },
  { item: 'Ice packs', quantity: 1 }, // TODO: confirm quantity with your sister
  { item: 'Clean tote with ziplocs', quantity: 1 },
  { item: 'Spare ziploc bag (emergency kit)', quantity: 1 }, // TODO: confirm quantity
  { item: 'Spare gloves (emergency kit)', quantity: 1 },
  { item: 'Spare sharpie (emergency kit)', quantity: 1 },
]

// Brought once per trip, only if Smithroot sampling happens anywhere on the trip
export const smithrootConditionalItems: GeneralItem[] = [
  { item: 'Smithroot machine', quantity: 1 },
  { item: 'Smithroot charger', quantity: 1 },
]

// Brought once per trip, only if plankton tow sampling happens anywhere on the trip
// (Plankton net is handled separately, since it's counted per water body)
export const planktonConditionalItems: GeneralItem[] = [
  { item: 'Ethanol', quantity: 1 },
  { item: 'pH buffer', quantity: 1 },
  { item: 'Ruler', quantity: 1 },
]