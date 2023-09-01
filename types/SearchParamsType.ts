export type Params = {
  id: string,
}

export type SearchParams ={
  name: string,
  image: string,
  price: number | null,
  description: string | null,
  id: string,
}

export type SearchParamsType = {
  params: Params,
  searchParams: SearchParams,
}