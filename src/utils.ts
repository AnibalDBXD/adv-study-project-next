import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + (options?.maxAge || 0))
    options.maxAge = (options?.maxAge || 0) / 1000
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export const fetchApi = async (path: string, params?: { [key: string]: string }): Promise<any> => {
  const url = new URL(`https://api.giphy.com/v1${path}`)

  url.searchParams.set('api_key', process.env.NEXT_PUBLIC_GIPHY_TOKEN as string)

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value as string))
  }

  return await fetch(url.toString()).then(res => res.json())
}
