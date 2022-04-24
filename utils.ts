export const fetchApi = async (path: string, params?: { [key: string]: string }): Promise<any> => {
  const url = new URL(`https://api.giphy.com/v1${path}`)

  url.searchParams.set('api_key', process.env.NEXT_PUBLIC_GIPHY_TOKEN as string)

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value as string))
  }

  return await fetch(url.toString()).then(res => res.json())
}
