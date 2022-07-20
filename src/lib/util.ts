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
export const goHTMLPosition = (id: string): void => {
  // 平滑前往 id 元素位置
  (document.getElementById('html') as HTMLElement).setAttribute('style', 'scroll-behavior: smooth')
  document.documentElement.scrollTop = (document.getElementById(id) as HTMLElement).offsetTop - 50;
  (document.getElementById('html') as HTMLElement).setAttribute('style', 'scroll-behavior: auto')
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
      if (+a.price === +b.price) {
        return b.timestamp - a.timestamp
      } else {
        if (value === 'descending') {
          return +b.price - +a.price
        } else {
          return +a.price - +b.price
        }
      }
    })
  }
}
export const formatNFTList = (nfts: NftInfo[], filterOptions: string, sortOptions: string): NftInfo[] => {
  const newFilterNfts = filterNfts(nfts, filterOptions)
  return sortNfts(newFilterNfts, sortOptions)
}

export const sessionScrollTop = (): void => {
  const scrollTop = document.documentElement.scrollTop
  sessionStorage.setItem('scrollTop', scrollTop.toString())
}
