import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next()
  return res

  // console.log('>>> req', req.cookies)
  // const isLoged = Boolean(req.cookies.logedUser)

  // if (isLoged) {
  //   return res
  // }

  // const url = req.nextUrl.clone()

  // if (url.pathname === '/login') return res
  // url.pathname = '/login'

  // return NextResponse.redirect(url)
}
