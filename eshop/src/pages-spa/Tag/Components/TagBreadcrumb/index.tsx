import cx from 'classnames';
import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import breadcrumbStyles from 'pages-spa/Category/Components/CategoryBreadcrumb/styles.module.css';
import BreadcrumbHomeIcon from 'Components/Icons/BreadcrumbHome';

import { VinistoProductDllModelsApiTagTag } from '@/api-types/product-api';

const TagBreadcrumb = ({
	tag,
}: {
	tag: VinistoProductDllModelsApiTagTag | null | undefined;
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const tagName = tag?.name === 'Novinka' ? 'Novinky' : tag?.name;

	return (
		<ContainerFullWidth
			className={breadcrumbStyles.container}
			containerClassName={breadcrumbStyles.breadcrumbsWrap}
		>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link href="/">
						<BreadcrumbHomeIcon
							id="bundle-detail-breadcrumbs-homepage-ico"
							alt={t({ id: 'alt.breadcrumb.home' })}
							title=""
							className={`BreadcrumbHomeIcon`}
						/>
					</Link>
				</li>
				<li
					className={cx('breadcrumb-item active', breadcrumbStyles.breadcrumb)}
					aria-current="page"
				>
					{tagName}
				</li>
			</ol>
		</ContainerFullWidth>
	);
};

export default TagBreadcrumb;
