'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ScrollToTop = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Search pagination controls scrolling via router.push to preserve the
		// position when loading more results.
		if (
			!pathname.startsWith('/vyhledavani/') &&
			!/\/kategorie|\/stitek|\/produkty/.test(pathname)
		) {
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		}
	}, [pathname, searchParams]);

	return null;
};

export default ScrollToTop;
