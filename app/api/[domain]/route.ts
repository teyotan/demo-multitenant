import { NextResponse } from 'next/server'
 
const availableDomain = ["moonlab", "munleb"]

export async function GET(request: Request, context: any) {
  if (!availableDomain.includes(context.params.domain)) {
    return NextResponse.json({ status: 'Allowed domains are only moonlab and munleb' }, { status: 401 })
  }

  return NextResponse.json({ status: 'OK' }, { status: 200 })
}