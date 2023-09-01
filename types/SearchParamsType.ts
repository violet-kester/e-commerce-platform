export type Params = {
  id: string,
}

export type SearchParams ={
  id: string,
  name: string,
  image: string,
  description: string | null,
  unit_amount: number | null,
  features: string,
}

export type SearchParamsType = {
  params: Params,
  searchParams: SearchParams,
}