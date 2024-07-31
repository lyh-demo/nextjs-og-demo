import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/api/og') {
        return NextResponse.rewrite(request.nextUrl, {
            headers: new Headers([
                [
                    'cache-control',
                    'max-age=3600, s-maxage=3600, stale-while-revalidate=600',
                ],
                ['cdn-cache-control', 'max-age=3600, stale-while-revalidate=600'],
            ])
        });
    }
    return NextResponse.next();
}