import { NavbarContext } from 'Components/Navbar/context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BasketContext } from 'Services/BasketService';

import { useMainHeaderHeight } from './useMainHeaderHeight';

export const useHideHeaderOnScroll = <T extends HTMLElement>(
	ref: React.RefObject<T>,
	options: { enabled: boolean; threshold?: number } = {
		enabled: true,
		threshold: 0,
	}
) => {
	const navbar = useContext(NavbarContext);
	const headerHeight = useMainHeaderHeight();
	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const { setIsSideBasketVisible } = useContext(BasketContext);

	useEffect(() => {
		if (!options.enabled || !ref.current) return;

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			const shouldHideHeader = !entry.isIntersecting;

			if (shouldHideHeader !== isHeaderHidden) {
				setIsHeaderHidden(shouldHideHeader);
				shouldHideHeader ? navbar.hideHeader() : navbar.showHeader();
				setIsSideBasketVisible(!shouldHideHeader);
			}
		};

		observerRef.current = new IntersectionObserver(handleIntersect, {
			threshold: options.threshold,
			rootMargin: `-${headerHeight}px 0px 0px 0px`,
		});

		observerRef.current.observe(ref.current);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [
		ref,
		options.enabled,
		options.threshold,
		headerHeight,
		isHeaderHidden,
		navbar,
		setIsSideBasketVisible,
	]);

	useEffect(() => {
		return () => {
			navbar.showHeader();
			setIsSideBasketVisible(true);
		};
	}, []);

	return isHeaderHidden;
};
