export type ProductType = {
  id: string,
  name: string,
  image: string,
  description: string | null,
  unit_amount: number | null,
  quantity?: number | 1,
  metadata: MetadataType,
}

type MetadataType = {
  features: string,
}