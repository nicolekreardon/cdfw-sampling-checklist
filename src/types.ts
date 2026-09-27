export type WaterBodyType = 'river' | 'non-river'
export type SampleType = 'smithroot' | 'plankton'

export interface WaterBody {
  id: string
  name: string
  type: WaterBodyType
  smithroot: number
  plankton: number
}

export interface Trip {
  id: string
  name: string
  createdAt: string
  waterBodies: WaterBody[]
}

export interface EquipmentRule {
  item: string
  category: 'Smithroot' | 'Plankton Tow'
  waterBodyType: WaterBodyType
  sampleType: SampleType
  firstSampleQty: number       // included once, for the first sample
  perAdditionalSampleQty: number // included for each sample after the first
}

export interface GeneralItem {
  item: string
  quantity: number
}

export interface ChecklistItem {
  category: string
  item: string
  quantity: number
}