// app/api/proxy/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface ProxyBody {
    id?: string;
    query: string
}

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body
        const body = (await request.json()) as ProxyBody

        // Forward the data to your insecure backend
        const response = await fetch('http://54.246.247.31:5001/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'Error in proxy request' }, { status: 500 })
        }

        // Relay the response from your upstream server
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Proxy request failed:', error)
        return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 })
    }
}
