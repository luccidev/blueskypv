export type UnitStatus = 'available' | 'sold' | 'amenity'

export interface Unit {
  id: string
  name: string
  beds: string
  sqft: string
  feat: string
  finish?: string
  status: UnitStatus
  top: number    // % from top of image
  left: number   // % from left of image
  w: number      // % width
  h: number      // % height
}

export const UNITS: Unit[] = [
  {
    id: 'Roof', name: 'Rooftop Terrace',
    beds: 'Infinity Pool · Lounge · Bar', sqft: 'Shared amenity — all residents',
    feat: '360° views of Banderas Bay & the jungle',
    status: 'amenity', top: 17, left: 23, w: 53, h: 10,
  },
  {
    id: 'PH-1', name: 'Loft Penthouse',
    beds: '2 Beds · 2 Baths', sqft: '141 m² · 1,518 sq ft',
    feat: 'North wing · Private rooftop terrace',
    status: 'sold', top: 27, left: 23, w: 24, h: 10,
  },
  {
    id: 'PH-2', name: 'Loft Penthouse',
    beds: '2 Beds · 2.5 Baths', sqft: '125 m² + Loft',
    feat: '2nd Floor loft / wraparound balcony',
    finish: 'Pending · est. April/May 2026',
    status: 'available', top: 27, left: 54, w: 22, h: 10,
  },
  {
    id: '501', name: 'Residence',
    beds: '2 Beds · 2 Baths', sqft: '141 m² · 1,518 sq ft',
    feat: 'North-facing · Panoramic ocean & jungle views',
    status: 'sold', top: 37, left: 23, w: 24, h: 10,
  },
  {
    id: '502', name: 'Residence',
    beds: '2 Beds · 2 Baths', sqft: '102 m² · 1,098 sq ft',
    feat: 'South-facing · Rooftop access',
    status: 'sold', top: 37, left: 54, w: 22, h: 10,
  },
  {
    id: '401', name: 'Residence',
    beds: '2 Beds · 2 Baths', sqft: '161 m² · 1,733 sq ft',
    feat: 'North-facing · Ocean view terrace',
    status: 'sold', top: 47, left: 23, w: 24, h: 10,
  },
  {
    id: '402', name: 'Residence',
    beds: '1 Bed · 1 Bath', sqft: '102 m² · 1,098 sq ft',
    feat: 'South-facing · Corner terrace',
    status: 'sold', top: 47, left: 54, w: 22, h: 10,
  },
  {
    id: '301', name: 'Residence',
    beds: '2 Beds · 2 Baths', sqft: '161 m² · 1,733 sq ft',
    feat: 'North-facing · Wraparound terrace',
    status: 'sold', top: 57, left: 23, w: 24, h: 9,
  },
  {
    id: '302', name: 'The Residence with Back Yard / Private Pool',
    beds: '2 Beds · 2.5 Baths', sqft: '118.73 m² · not incl. backyard / pool',
    feat: 'Backyard / private pool & full ocean view',
    status: 'available', top: 57, left: 54, w: 22, h: 9,
  },
  {
    id: '201', name: 'Residence',
    beds: '2 Beds · 2.5 Baths', sqft: '161 m² · 1,733 sq ft',
    feat: 'North-facing · Ocean view balcony',
    status: 'sold', top: 66, left: 23, w: 24, h: 10,
  },
  {
    id: '202', name: 'The Residence with a Private Pool',
    beds: '2 Beds · 2.5 Baths', sqft: '120 m² · 1,291 sq ft',
    feat: 'Private Swimming Pool',
    status: 'available', top: 66, left: 54, w: 22, h: 10,
  },
  {
    id: '101', name: 'The Mexican Penthouse',
    beds: '3 Beds · 2.5 Baths', sqft: '274 m² · 2,949 sq ft',
    feat: 'Full floor · Private yard & pool',
    status: 'sold', top: 76, left: 23, w: 53, h: 10,
  },
]

export const AVAILABLE_UNITS = UNITS.filter(u => u.status === 'available')
