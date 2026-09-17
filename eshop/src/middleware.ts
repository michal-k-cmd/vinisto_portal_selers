import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const viewportWidth = request.headers.get('Sec-CH-Viewport-Width');

	if (viewportWidth) {
		const isDesktop = parseInt(viewportWidth, 10) >= 1200;
		const response = NextResponse.next();
		response.headers.set('x-device-type', isDesktop ? 'desktop' : 'mobile');

		return response;
	}

	const userAgent = request.headers.get('user-agent') || '';
	const isMobile = /Mobi|Android|iPhone/i.test(userAgent);

	const response = NextResponse.next();
	response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');

	return response;
}

export const config = {
	matcher: '/:path*',
};
