export interface Region {
  name: string
  code: string
}

export interface RegionGroup {
  [key: string]: Region[]
}

export interface MultiRegionSelectorProps {
  regionGroups: RegionGroup
  selectedRegions: string[]
  onRegionsChange: (regions: string[]) => void
  placeholder?: string
  className?: string
  error?: boolean
}