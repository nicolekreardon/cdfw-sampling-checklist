import { jsPDF } from 'jspdf'
import type { ChecklistItem } from './types'

export interface WaterBodySection {
  name: string
  typeLabel: string
  items: ChecklistItem[]
}

type RGB = [number, number, number]

const BLUE: RGB = [29, 78, 216]        // headings
const BLUE_LIGHT: RGB = [147, 197, 253] // block left border
const GRAY_BG: RGB = [243, 244, 246]    // block background
const GRAY_TEXT: RGB = [75, 85, 99]     // secondary text
const BLACK: RGB = [0, 0, 0]

function groupByCategory(items: ChecklistItem[]): [string, ChecklistItem[]][] {
  const groups: Record<string, ChecklistItem[]> = {}
  for (const item of items) {
    ;(groups[item.category] ??= []).push(item)
  }
  return Object.entries(groups)
}

export function buildChecklistPdf(
  tripName: string,
  checklist: ChecklistItem[],
  sections: WaterBodySection[],
): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const marginX = 48
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - marginX * 2
  const bottom = doc.internal.pageSize.getHeight() - 48
  let y = 56

  function ensureSpace(height: number) {
    if (y + height > bottom) {
      doc.addPage()
      y = 56
    }
  }

  function text(
    value: string,
    opts: { size: number; bold?: boolean; indent?: number; gap: number; color?: RGB },
  ) {
    ensureSpace(opts.size + opts.gap)
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal')
    doc.setFontSize(opts.size)
    doc.setTextColor(...(opts.color ?? BLACK))
    doc.text(value, marginX + (opts.indent ?? 0), y, {
      maxWidth: contentWidth - (opts.indent ?? 0),
    })
    y += opts.size + opts.gap
  }

  // Title
  text('Equipment Checklist', { size: 20, bold: true, gap: 8, color: BLUE })
  text(`Trip: ${tripName}`, { size: 12, gap: 8, color: GRAY_TEXT })
  doc.setDrawColor(...BLUE_LIGHT)
  doc.setLineWidth(1)
  doc.line(marginX, y, marginX + contentWidth, y)
  y += 20

  // Section 1: totals, with checkbox squares
  text('Total Quantities to Gather', { size: 15, bold: true, gap: 10, color: BLUE })
  for (const [category, items] of groupByCategory(checklist)) {
    text(category, { size: 12, bold: true, gap: 6, color: BLUE })
    for (const item of items) {
      ensureSpace(16)
      doc.setDrawColor(...GRAY_TEXT)
      doc.setLineWidth(0.75)
      doc.rect(marginX + 4, y - 9, 9, 9)
      const hideQty = category === 'General Equipment' && item.quantity === 1
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.setTextColor(...BLACK)
      doc.text(
        hideQty ? item.item : `${item.item} × ${item.quantity}`,
        marginX + 22,
        y,
      )
      y += 16
    }
    y += 8
  }

  // Section 2: breakdown by water body, split by sample type
  y += 6
  ensureSpace(90)
  text('Breakdown by Water Body', { size: 15, bold: true, gap: 10, color: BLUE })

  const lineH = 15
  const pad = 8
  const headerH = 16

  for (const section of sections) {
    ensureSpace(70) // keep the heading with at least its first block
    text(`${section.name} (${section.typeLabel})`, { size: 13, bold: true, gap: 6 })

    if (section.items.length === 0) {
      text('No equipment needed.', { size: 11, indent: 12, gap: 6, color: GRAY_TEXT })
    }

    for (const [category, items] of groupByCategory(section.items)) {
      const blockHeight = pad + headerH + items.length * lineH + pad - 4
      ensureSpace(blockHeight)

      const x = marginX + 12
      const w = contentWidth - 12

      // Light background, then the colored left border
      doc.setFillColor(...GRAY_BG)
      doc.rect(x, y, w, blockHeight, 'F')
      doc.setFillColor(...BLUE_LIGHT)
      doc.rect(x, y, 4, blockHeight, 'F')

      // Block heading
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...BLUE)
      doc.text(category.toUpperCase(), x + 14, y + pad + 9)

      // Items
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.setTextColor(...BLACK)
      items.forEach((item, i) => {
        doc.text(
          `${item.item} × ${item.quantity}`,
          x + 14,
          y + pad + headerH + 9 + i * lineH,
        )
      })

      y += blockHeight + 10
    }
    y += 8
  }

  return doc
}