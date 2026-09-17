'use client';

import Skeleton from 'react-loading-skeleton';
import { LinkTile } from 'vinisto_ui';
import cx from 'classnames';
import isExternalLink from 'Helpers/is-external-link';
import { Link_Widget_Types } from 'vinisto_api_client/src/domain/link-widget/enums';
import NextLink from 'next/link';
import { useContext } from 'react';
import { DeviceServiceContext } from 'Services/DeviceService';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { URL_PARAM_PAGE } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';

import styles from './styles.module.css';

interface LinkWidget {
	id: string | null | undefined;
	name: string | null | undefined;
	imageLocator: string | null | undefined;
	to: string | null | undefined;
	type?: Link_Widget_Types;
}

interface LinkWidgetListProps {
	isLoading: boolean;
	linkWidgets?: LinkWidget[];
	className?: string;
	itemClassName?: string;
	scrollToAnchor?: string;
}

const LinkWidgetList = ({
	isLoading,
	linkWidgets,
	className,
	itemClassName,
	scrollToAnchor,
}: LinkWidgetListProps) => {
	const { isDesktop } = useContext(DeviceServiceContext);
	const scrollToHash = !isDesktop && scrollToAnchor ? `#${scrollToAnchor}` : '';
	const { setQuery } = useContext(BundlesWithFiltersContext);

	if (!linkWidgets) return null;

	return (
		<div className={cx(styles.list, className)}>
			{isLoading ? (
				<Skeleton count={8} />
			) : (
				linkWidgets.map((linkWidget) => {
					const { id, name, imageLocator, type, to } = linkWidget;
					const url = getLinkUrl(linkWidget);

					switch (true) {
						case type === Link_Widget_Types.External || isExternalLink(url):
							return (
								<a
									key={'lwe' + id + className}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.link}
								>
									<LinkTile
										className={itemClassName}
										key={'lwlte' + id + itemClassName}
										title={name ?? ''}
										img={{
											src: imageLocator ?? '',
											alt: name ?? '',
										}}
									/>
								</a>
							);
						case type === Link_Widget_Types.Specification: {
							const [filterKey, filterValue] = (to ?? '')
								.split('/')
								.filter(Boolean);

							const basePath =
								typeof window !== 'undefined'
									? window.location.pathname.split(`/${filterKey}`)[0]
									: '';

							const isUrlFilter =
								typeof window !== 'undefined' && url
									? url.startsWith(basePath)
									: false;

							const filterKeyWithReplacedPlusSigns = filterKey.replace(
								/\+/g,
								' '
							);

							return (
								<NextLink
									href={`${url}${isUrlFilter ? scrollToHash : ''}`}
									key={'lwspe' + id + className}
									className={styles.link}
									onClick={(e) => {
										e.preventDefault();
										setQuery((current: Record<string, any>) => ({
											...current,
											[URL_PARAM_PAGE]: undefined,
											...(filterKeyWithReplacedPlusSigns
												? {
														[filterKeyWithReplacedPlusSigns]:
															filterValue || undefined,
												  }
												: {}),
										}));
									}}
								>
									<LinkTile
										className={itemClassName}
										key={'lwltspe' + id + itemClassName}
										title={name ?? ''}
										img={{
											src: imageLocator ?? '',
											alt: name ?? '',
										}}
									/>
								</NextLink>
							);
						}

						default: {
							const isUrlFilter =
								typeof window !== 'undefined' && to
									? to.startsWith(window.location.pathname)
									: false;

							return (
								<NextLink
									key={'lwdf' + id + className}
									href={`${to}${isUrlFilter ? scrollToHash : ''}`}
									onClick={() => {
										setQuery({});
									}}
									className={styles.link}
								>
									<LinkTile
										className={itemClassName}
										key={'lwltdf' + id + itemClassName}
										title={name ?? ''}
										img={{
											src: imageLocator ?? '',
											alt: name ?? '',
										}}
									/>
								</NextLink>
							);
						}
					}
				})
			)}
		</div>
	);
};
export default LinkWidgetList;

const getLinkUrl = (linkWidget: LinkWidget) => {
	const { to, type } = linkWidget;

	const cleanedPathname =
		typeof window === 'undefined'
			? ''
			: window.location.pathname.replace(/\/+$/, '');
	const cleanedTo = (to ?? '').replace(/^\/+/, '');

	// Check if there's nothing between cleanedPathname and cleanedTo
	// If there is, we insert 'produkty' between them. Then there shouldn't be an invalid url.
	const insertProdukty =
		cleanedPathname === '' ||
		cleanedTo === '' ||
		(!cleanedPathname.includes('/') && !cleanedTo.includes('/'));

	switch (type) {
		case Link_Widget_Types.External:
			return to ?? '/';
		case Link_Widget_Types.Category:
		case Link_Widget_Types.Blog:
			return `${to ?? ''}`;
		case Link_Widget_Types.Specification: {
			if (insertProdukty) {
				return `${cleanedPathname}/produkty/${cleanedTo}`;
			}

			const currentSegments = cleanedPathname.split('/').filter(Boolean);

			const basePathSegments = currentSegments.slice(0, 2);
			const filterSegments = currentSegments.slice(2);

			const filters: Record<string, string> = {};
			for (let i = 0; i < filterSegments.length; i += 2) {
				const key = filterSegments[i];
				const val = filterSegments[i + 1];
				if (key && val) {
					filters[key] = val;
				}
			}

			const newToSegments = cleanedTo.split('/').filter(Boolean);
			const newFilterKey = newToSegments[0];
			const newFilterValue = newToSegments.slice(1).join('/');

			if (newFilterKey && newFilterValue) {
				filters[newFilterKey] = newFilterValue;
			}

			const newFilterPath = Object.entries(filters)
				.map(([k, v]) => `${k}/${v}`)
				.join('/');

			return `/${basePathSegments.join('/')}${
				newFilterPath ? '/' + newFilterPath : ''
			}`;
		}
		default:
			return '/';
	}
};
