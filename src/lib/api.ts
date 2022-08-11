import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import { NftInfo, Collection, ArNftInfo, ArCollectionNfts } from '@/store/state'
const isProd = window.location.host.includes('permaswap.network') && !window.location.host.includes('dev')
const apiHost = `https://nft${isProd ? '' : '-dev'}.permaswap.network`

// `validateStatus` defines whether to resolve or reject the promise for a given
// HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
// or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
const validateStatus = function (status: number): boolean {
  return status >= 200 && status < 300 // default
}

const rConfig = {
  timeout: 5000,
  validateStatus,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const sendRequest = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await new Promise((resolve, reject) => {
    axios({
      ...rConfig,
      ...config
    }).then((res: AxiosResponse) => {
      if (res.data !== undefined) {
        resolve(res)
      } else {
        reject(new Error(`${config.url ?? ''}: null response`))
      }
    }).catch(error => {
      if (isString(error)) {
        reject(new Error(error))
      } else if (isObject(error.response) && isObject(error.response.data)) {
        // like { error: 'err_invalid_signature' }
        reject(new Error(error.response.data.error))
      } else {
        reject(new Error(error))
      }
    })
  })
}
export const getEthNfts = async (): Promise<NftInfo[]> => {
  const url = `${apiHost}/info`
  const result = await sendRequest({
    url,
    method: 'GET'
  })

  return result.data
}
export const getArNfts = async (): Promise<ArNftInfo[]> => {
  const url = `${apiHost}/ar/info`
  const result = await sendRequest({
    url,
    method: 'GET'
  })

  return result.data
}
export const getHotNfts = async (): Promise<NftInfo[]> => {
  const url = `${apiHost}/hot`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}

export const getEthCollections = async (): Promise<Collection[]> => {
  const url = `${apiHost}/collections`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}

export const getEthCollectionNFTs = async (collectionName: string): Promise<NftInfo[]> => {
  const url = `${apiHost}/collection/${collectionName}/nft`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}
export const getSearchEthNFTs = async (query: string): Promise<NftInfo[]> => {
  const url = `${apiHost}/query/${query}`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}
export const getArCollections = async (): Promise<ArCollectionNfts[]> => {
  const url = `${apiHost}/ar/collections`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}
export const getArCollectionNFTs = async (collectionName: string): Promise<ArNftInfo[]> => {
  const url = `${apiHost}/ar/collection/${collectionName}/nft`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}
export const getSearchArNFTs = async (query: string): Promise<ArNftInfo[]> => {
  const url = `${apiHost}/ar/query/${query}`
  const result = await sendRequest({
    url,
    method: 'GET'
  })
  return result.data
}
