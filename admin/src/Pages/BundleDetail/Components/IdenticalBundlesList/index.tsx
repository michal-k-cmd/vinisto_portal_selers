import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import { FiPackage } from 'react-icons/fi';
import { BiLink } from 'react-icons/bi';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';

interface Props {
	identicalBundles: Bundle[];
	loaded: boolean;
}

const IdenticalBundlesList = ({ identicalBundles, loaded }: Props) => {
	const localizationContext = useContext(LocalizationContext);
	const navigate = useNavigate();

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const handleGoIdenticalBundle = useCallback(
		(identBundleId: string) => {
			navigate(`/bundle-detail/${identBundleId}`);
		},
		[navigate]
	);

	const handleOnClickRedirect = useCallback(
		(bundleId: string) => () => {
			navigate(`/bundle-detail/${bundleId}`);
		},
		[navigate]
	);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{t({ id: 'admin.bundleDetail.identicalBundles' })}
			</div>
			{loaded &&
				identicalBundles.map((identBundle, index) => (
					<div
						key={`product-category-${index}`}
						className={styles.category}
					>
						<FiPackage className={styles.icon} />
						<div className={styles.label}>
							<span
								className={styles.link}
								onClick={() => handleGoIdenticalBundle(identBundle.id ?? '')}
							>
								{getLocalizedValue(identBundle.name ?? [])}
							</span>
						</div>
						<BiLink
							onClick={handleOnClickRedirect(identBundle.id ?? '')}
							className={styles.iconLink}
						/>
					</div>
				))}
		</div>
	);
};

export default IdenticalBundlesList;
