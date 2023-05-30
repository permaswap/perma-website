import BN from 'bignumber.js'
import { ArNftInfo, NftInfo } from '@/store/state'
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
export const formatNFTList = (nfts: NftInfo[] | ArNftInfo[], filterOptions: string, sortOptions: string, id: string): NftInfo[] | ArNftInfo[] => {
  if (id === 'ethnfts') {
    return ethereumFormatNFT(nfts as NftInfo[], filterOptions, sortOptions)
  } else {
    return arweaveFormatNft(nfts, filterOptions, sortOptions)
  }
}
export const ethereumFormatNFT = (nfts: NftInfo[], filterOptions: string, sortOptions: string): NftInfo[] => {
  const newFilterNfts = filterNfts(nfts, filterOptions)
  return sortNfts(newFilterNfts, sortOptions)
}
export const arweaveFormatNft = (nfts: ArNftInfo[], filterOptions: string, sortOptions: string): ArNftInfo[] => {
  if (sortOptions === 'listing') {
    return nfts.sort((a, b) => {
      return b.timestamp - a.timestamp
    })
  }
  return nfts
}
export const sessionScrollTop = (): void => {
  const scrollTop = document.documentElement.scrollTop
  sessionStorage.setItem('scrollTop', scrollTop.toString())
}
export const openLink = (link: string): void => {
  if (link.length > 0) {
    window.open(link)
  }
}

const mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i

const tabletRE = /android|ipad|playbook|silk/i

export const isMobileDevice = (opts?: any): boolean => {
  if (opts == null) opts = {}
  let ua = opts.ua
  if (ua == null && typeof navigator !== 'undefined') ua = navigator.userAgent
  if (ua?.headers != null && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent']
  }
  if (typeof ua !== 'string') return false

  let result = mobileRE.test(ua) || (opts?.tablet != null && tabletRE.test(ua))

  if (
    !result &&
    opts?.tablet != null &&
    opts?.featureDetect != null &&
    navigator?.maxTouchPoints > 1 &&
    ua.includes('Macintosh') &&
    ua.includes('Safari')
  ) {
    result = true
  }

  return result
}

export const isMobile = isMobileDevice()
