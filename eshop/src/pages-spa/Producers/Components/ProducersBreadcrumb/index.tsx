import { lazy, Suspense } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import useFormatMessage from 'Hooks/useFormatMessage';
import Loader from 'Components/View/Loader';

const BreadcrumbHomeIcon = lazy(
	() => import('Components/Icons/BreadcrumbHome')
);

const ProducersBreadcrumb = () => {
	const t = useFormatMessage();

	return (
		<div className="container p-0">
			<Breadcrumb>
				<Breadcrumb.Item href="/">
					<Suspense fallback={<Loader blank />}>
						<BreadcrumbHomeIcon
							id="breadcrumbs-ico"
							alt={t({ id: 'alt.breadcrumb.home' })}
							title={t({ id: 'alt.breadcrumb.home' })}
							className="BreadcrumbHomeIcon"
						/>
					</Suspense>
				</Breadcrumb.Item>
				<Breadcrumb.Item active>
					{t({ id: 'routes.producers.name' })}
				</Breadcrumb.Item>
			</Breadcrumb>
		</div>
	);
};

export default ProducersBreadcrumb;
