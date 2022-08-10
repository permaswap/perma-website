export interface Stats {
  count: number
  floor_price: number
  num_owners: number
}
export interface Collection {
  created_date?: string
  image_url?: string
  name: string
  slug?: string
  stats?: Stats
}
export interface NftInfo {
  tokenId: string
  contractAddr: string
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
export interface ArCollectionNfts {
  name: string
}
export interface ArNftInfo {
  contractAddr: string
  tokenId: string
  owner: string
  name: string
  collectionName: string
  imageUrl: string
  timestamp: number
}
export interface State {
  arNfts: ArNftInfo[]
  ethNfts: NftInfo[]
  hotNfts: NftInfo[]
  ethBatchNfts: Collection[]
  arBatchNfts: ArCollectionNfts[]
}
export const defaultState: State = {
  arNfts: [],
  ethNfts: [],
  hotNfts: [],
  ethBatchNfts: [],
  arBatchNfts: []
}
