import SearchResultBundleItem from 'Components/Navbar/Components/Search/SearchResultBundleItem';
import useGetBundleInSets from 'Hooks/Queries/useGetBundleInSets';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const BundleInSetsBottom = ({ bundleId }: { bundleId?: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const { data: bundlesInSets } = useGetBundleInSets({ bundleId });
	return bundlesInSets?.length ? (
		<section className={styles.component}>
			<h2 className={styles.title}>
				{t({ id: 'bundle.buyInASet' }, { count: undefined })}
			</h2>
			<div className={styles.items}>
				{bundlesInSets.map((bundle) => (
					<SearchResultBundleItem
						className={styles.item}
						bundle={bundle}
						key={bundle.id}
						displayCta={true}
					/>
				))}
			</div>
		</section>
	) : null;
};

export default BundleInSetsBottom;
