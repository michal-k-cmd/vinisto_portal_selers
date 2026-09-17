'use client';

import { useContext, useEffect, useRef } from 'react';
import {
	FILTERS_PADDING,
	FILTERS_WIDTH,
	FOOTER_HEIGHT,
	HEADER_HEIGHT,
	HEADER_PADDING,
} from 'Hooks/useScrollFixedFilters/constants';
import { UseScrollFixedReturn } from 'Hooks/useScrollFixedFilters/interfaces';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceAction } from 'Services/DeviceService/constants';
import { throttle } from 'lodash-es';
import { usePathname } from 'next/navigation';

const useScrollFixedFilters = (): UseScrollFixedReturn => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const deviceContext = useContext(DeviceServiceContext);
	const filtersContainerRef = useRef<HTMLDivElement>(null);
	const filtersRef = useRef<HTMLFormElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const currentPath = usePathname();
	const pathsWithFilters = Boolean(
		currentPath.includes(`/${t({ id: 'routes.category.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.offers.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.products.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.news.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.tag.route' })}`)
	);

	useEffect(() => {
		if (
			!deviceContext.isMobile &&
			!deviceContext.isTablet &&
			pathsWithFilters
		) {
			const checkIfFilterColumnNeedsUpdate = throttle(() => {
				const { height: filtersHeight } =
					filtersRef.current instanceof HTMLFormElement
						? filtersRef.current.getBoundingClientRect()
						: { height: 0 };

				const { height: contentHeight } =
					contentRef.current instanceof HTMLDivElement
						? contentRef.current.getBoundingClientRect()
						: { height: 0 };

				const content =
					window.scrollY >=
					filtersHeight - window.innerHeight + HEADER_HEIGHT + HEADER_PADDING;

				const filtersAvailable =
					filtersRef.current && filtersContainerRef.current;

				const isFiltersFooterExceedsViewport =
					filtersHeight + FOOTER_HEIGHT > window.innerHeight - HEADER_HEIGHT;

				if (
					content &&
					!deviceContext.isFooterInViewPort &&
					contentHeight > filtersHeight &&
					filtersAvailable
				) {
					filtersRef.current.style.position = 'fixed';
					filtersRef.current.style.bottom =
						filtersHeight + FILTERS_PADDING >=
						window.innerHeight - HEADER_HEIGHT - HEADER_PADDING
							? `${FILTERS_PADDING}px`
							: '';
					filtersRef.current.style.top =
						filtersHeight + FILTERS_PADDING <
						window.innerHeight - HEADER_HEIGHT - HEADER_PADDING
							? `${HEADER_HEIGHT + HEADER_PADDING}px`
							: '';
					filtersRef.current.style.width = `${FILTERS_WIDTH}px`;
					filtersContainerRef.current.style.alignSelf = '';
				}
				if (deviceContext.isFooterInViewPort && filtersAvailable) {
					if (isFiltersFooterExceedsViewport) {
						filtersRef.current.style.position = '';
						filtersRef.current.style.bottom = '';
						filtersRef.current.style.width = '';
						filtersContainerRef.current.style.alignSelf = 'flex-end';
					}
				}
				if (!content && !deviceContext.isFooterInViewPort && filtersAvailable) {
					filtersRef.current.style.position = '';
					filtersRef.current.style.bottom = '';
					filtersRef.current.style.width = '';
					filtersContainerRef.current.style.alignSelf = '';
				}
			}, 16);

			checkIfFilterColumnNeedsUpdate();

			window.addEventListener('scroll', checkIfFilterColumnNeedsUpdate);

			return () => {
				window.removeEventListener('scroll', checkIfFilterColumnNeedsUpdate);
			};
		}
	}, [
		pathsWithFilters,
		deviceContext.isFooterInViewPort,
		deviceContext.isMobile,
		deviceContext.isTablet,
	]);

	return {
		filtersContainerRef,
		filtersRef,
		contentRef,
	};
};

const useIsFooterInViewPort = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { dispatch } = useContext(DeviceServiceContext);
	const footerRef = useRef<HTMLElement>(null);

	const currentPath = usePathname();

	const pathsWithFilters = Boolean(
		currentPath.includes(`/${t({ id: 'routes.category.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.offers.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.products.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.news.route' })}`) ||
			currentPath.includes(`/${t({ id: 'routes.tag.route' })}`)
	);

	useEffect(() => {
		if (pathsWithFilters) {
			const elementRefCurrent = footerRef.current;
			const observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					dispatch([
						DeviceServiceAction.setIsFooterInViewPort,
						entry.isIntersecting,
					]);
				},
				{ threshold: 0 }
			);

			if (elementRefCurrent) {
				observer.observe(elementRefCurrent);
			}

			return () => {
				if (elementRefCurrent) {
					observer.unobserve(elementRefCurrent);
				}
			};
		}
	}, [dispatch, pathsWithFilters]);

	return footerRef;
};
export { useScrollFixedFilters, useIsFooterInViewPort };
