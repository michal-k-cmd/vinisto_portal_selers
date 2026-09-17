import { lazy, Suspense, useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import Loader from 'Components/View/Loader';
const BreadcrumbHomeIcon = lazy(
	() => import('Components/Icons/BreadcrumbHome')
);
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import breadcrumbStyles from 'pages-spa/Category/Components/CategoryBreadcrumb/styles.module.css';

const WinesBundlesBreadcrumb = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<ContainerFullWidth
			className={breadcrumbStyles.container}
			containerClassName={breadcrumbStyles.breadcrumbsWrap}
		>
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
				<Breadcrumb.Item active>
					{`${t({ id: 'products.title' })}`}
				</Breadcrumb.Item>
			</Breadcrumb>
		</ContainerFullWidth>
	);
};

export default WinesBundlesBreadcrumb;
