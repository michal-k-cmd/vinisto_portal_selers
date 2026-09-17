import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { isFunction } from 'lodash-es';

import { convertParamsToQuery, convertQueryToUrl } from './helpers';

/**
 * Configuration options for useNextURLParams hook
 */
interface UseNextURLParamsOptions {
	/**
	 * Whether the URL has a specific path segment
	 * - true for /kategorie/[slug] and /stitek/[slug]
	 * - false for /produkty
	 * @default true
	 */
	hasSpecificPath?: boolean;
}

/**
 * A hook for managing URL parameters in Next.js that properly handles browser history
 * @param options - Configuration options for the hook
 * @returns [query, setQuery] - Current query object and function to update it
 */
const useNextURLParams = (
	options?: UseNextURLParamsOptions
): [
	Record<string, any>,
	(_: Record<string, any> | ((query: any) => Record<string, any>)) => void
] => {
	const pathname = usePathname();
	const [, startTransition] = useTransition();

	// Extract hasSpecificPath from options with default value of true
	const hasSpecificPath = options?.hasSpecificPath !== false;

	// Extract category path and filters from the URL
	const pathParts = pathname.split('/').filter(Boolean);
	const basePath = pathParts[0] || ''; // 'kategorie' || 'stitek' || 'produkty'

	// Handle specific path based on the hasSpecificPath flag
	const specificPath = hasSpecificPath ? pathParts[1] || '' : '';

	// Parse filters from the URL path (everything after the category slug or basePath)
	const filterParams = hasSpecificPath
		? pathParts.slice(2).join('/')
		: pathParts.slice(1).join('/');

	// Refs for tracking component state and navigation
	const mounted = useRef(false);
	const lastNavigationPath = useRef<string | null>(null);
	const pendingNavigation = useRef<string | null>(null);

	// Query state from the URL
	const [query, setQueryInternal] = useState<Record<string, any>>(
		convertParamsToQuery(filterParams)
	);

	// Generate the new URL based on the query
	const generateNewUrl = useCallback(
		(updatedQuery: Record<string, any>) => {
			// Start with the base path and category (if applicable)
			let newPath = hasSpecificPath
				? `/${basePath}/${specificPath}`
				: `/${basePath}`;

			// Add filter parameters if they exist
			const filterPath = convertQueryToUrl(updatedQuery, '');
			if (filterPath) {
				newPath += filterPath;
			}

			return newPath;
		},
		[basePath, specificPath, hasSpecificPath]
	);

	// Handle navigation separately from state updates
	const navigateTo = useCallback((path: string) => {
		if (!mounted.current) return;

		// Skip if we're already on this path
		if (lastNavigationPath.current === path) return;

		// Update our reference to the latest navigation
		lastNavigationPath.current = path;

		// Use transition for smoother navigation (is this necessary?)
		startTransition(() => {
			window.history.pushState({}, '', path);
		});
	}, []);

	// Effect to handle pending navigation after render
	useEffect(() => {
		if (pendingNavigation.current) {
			const path = pendingNavigation.current;
			pendingNavigation.current = null;
			navigateTo(path);
		}
	});

	// Function to update URL with new filters
	const setQuery = useCallback(
		(
			newQueryOrFn: Record<string, any> | ((query: any) => Record<string, any>)
		) => {
			setQueryInternal((prevQuery) => {
				// Determine the new query object
				const updatedQuery = isFunction(newQueryOrFn)
					? newQueryOrFn(prevQuery)
					: { ...prevQuery, ...newQueryOrFn };

				// Generate new URL with updated filters
				const newPath = generateNewUrl(updatedQuery);

				// Store navigation request to process after render
				pendingNavigation.current = newPath;

				return updatedQuery;
			});
		},
		[generateNewUrl]
	);

	// Listen for popstate events (browser back/forward buttons)
	useEffect(() => {
		const handlePopState = () => {
			// When the user navigates with browser buttons, update our state
			const pathSegments = window.location.pathname.split('/').filter(Boolean);
			const newFilterParams = hasSpecificPath
				? pathSegments.slice(2).join('/')
				: pathSegments.slice(1).join('/');

			const newQuery = convertParamsToQuery(newFilterParams);
			lastNavigationPath.current = window.location.pathname;
			setQueryInternal(newQuery);
		};

		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [hasSpecificPath]);

	// Set mounted ref after initial render
	useEffect(() => {
		mounted.current = true;
		// Initialize the last navigation path
		lastNavigationPath.current = pathname;

		return () => {
			mounted.current = false;
		};
	}, [pathname]);

	return [query, setQuery];
};

export default useNextURLParams;
