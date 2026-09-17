import { lazy, Suspense, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Breadcrumb } from 'react-bootstrap';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { CategoryService } from 'vinisto_api_client/src/product-service';
import { useQuery } from '@tanstack/react-query';

import { BundlesWithFiltersContext } from '../CategoryBundlesWithFilters/context';

const BreadcrumbHomeIcon = lazy(
	() => import('Components/Icons/BreadcrumbHome')
);

import styles from './styles.module.css';

import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';

const CategoryBreadcrumb = ({
	category,
}: {
	category: VinistoProductDllModelsApiCategoryCategory;
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { specificationsQuery } = useContext(BundlesWithFiltersContext);
	const isLoading = specificationsQuery?.isLoading;

	const categoryId = category.id ?? null;

	const { data: breadcrumbs } = useQuery(
		['breadcrumbs', categoryId],
		() => CategoryService.getBreadcrumbs({ categoryId: categoryId ?? '' }),
		{
			enabled: !!categoryId,
		}
	);

	return (
		<ContainerFullWidth
			className={styles.container}
			containerClassName={styles.breadcrumbsWrap}
		>
			{isLoading ? (
				<Skeleton
					width="300px"
					containerClassName={styles.breadcrumbSkeleton}
				/>
			) : (
				<Breadcrumb>
					<Breadcrumb.Item href="/">
						<Suspense fallback={<Loader blank />}>
							<BreadcrumbHomeIcon
								alt={t({ id: 'alt.breadcrumb.home' })}
								title={``}
								className={`BreadcrumbHomeIcon`}
							/>
						</Suspense>
					</Breadcrumb.Item>
					{breadcrumbs?.map((breadcrumb, index) => (
						<Breadcrumb.Item
							key={'catbci' + index}
							href={`/${t({ id: 'routes.category.route' })}/${getLocalizedValue(
								breadcrumb.url
							)}`}
							active={index === breadcrumbs.length - 1}
						>
							{getLocalizedValue(breadcrumb.name)}
						</Breadcrumb.Item>
					))}
				</Breadcrumb>
			)}
		</ContainerFullWidth>
	);
};

export default CategoryBreadcrumb;
