import BN from 'bignumber.js'
import { NftInfo } from './types'
BN.config({
  EXPONENTIAL_AT: 1000
})
export const checkParentsHas = (classname: string) => {
  return (node: HTMLElement | null) => {
    while (node != null) {
      if (node?.classList?.contains(classname)) {
        return true
      }
      node = node.parentNode as HTMLElement | null
    }
    return false
  }
}
export const goToNfts = (id: string): void => {
  ;(document.getElementById(id) as HTMLElement).scrollIntoView()
}

export const toBN = (x: number | string | BN): BN => {
  if (isNaN(Number(x))) return new BN(0)
  if (x instanceof BN) return x
  return new BN(x)
}

export const filterNfts = (nfts: NftInfo[], value: string): NftInfo[] => {
  if (value === 'all') {
    return nfts
  } else {
    return nfts.filter((item) => {
      return value === 'auction'
        ? item.minOffer.length > 0 && item.minOfferSymbol
        : item.price
    })
  }
}

export const sortNfts = (nfts: NftInfo[], value: string): NftInfo[] => {
  if (value === 'listing') {
    return nfts.sort((a, b) => {
      return b.timestamp - a.timestamp
    })
  } else {
    return nfts.sort((a, b) => {
      if (value === 'descending') {
        return +b.price - +a.price
      } else {
        return +a.price - +b.price
      }
    })
  }
}
export const formatNFTList = (nfts: NftInfo[], filterOptions: string, sortOptions: string): NftInfo[] => {
  const newFilterNfts = filterNfts(nfts, filterOptions)
  return sortNfts(newFilterNfts, sortOptions)
}
