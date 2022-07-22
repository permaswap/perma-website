export interface Stats {
  count: number
  floor_price: number
  num_owners: number
}
export interface Collection {
  created_date: string
  image_url: string
  name: string
  slug: string
  stats: Stats
}
export interface NftInfo {
  auctionType: string
  collection: Collection
  collectionName: string
  collectionNameDes: string
  imageUrl: string
  minOffer: string
  minOfferSymbol: string
  name: string
  nameDes: string
  owner: string
  ownerLink: string
  permaLink: string
  price: string
  priceSymbol: string
  topOffer: string
  topOfferSymbol: string
  timestamp: number
}
export interface State {
  allNfts: NftInfo[]
  hotNfts: NftInfo[]
  collectionBatchNfts: Collection[]
}
export const defaultState: State = {
  allNfts: [],
  hotNfts: [],
  collectionBatchNfts: []
}
