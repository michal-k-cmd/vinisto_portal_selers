import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useGetUserById from 'Hooks/use-get-user-by-id';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';
import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

const CompanyInfo = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const { data } = useGetUserById();

	const user = data as VinistoAuthDllModelsApiUserCompany | undefined;

	const companyName = user?.validationData?.companyName;
	const ico = user?.ico;
	const name = user?.name;

	return (
		<div className={styles.companyInfo}>
			<img
				src="/assets/images/company.svg"
				alt=""
				height={16}
				width={16}
				style={{ filter: 'opacity(0.5)' }}
			/>
			<div>
				<div className={styles.companyName}>{companyName ?? name}</div>
				<div className="d-flex gap-2 align-items-center">
					<span className={styles.ico}>{`IČ ${ico}`}</span>{' '}
					<div className={styles.priceLevel}>
						<img
							src={`/assets/images/tag.svg`}
							alt=""
							width={12}
							height={12}
							className="me-1"
							style={{ filter: 'opacity(0.5)' }}
						/>
						{t({
							id: `VinistoB2b.${
								user?.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1
							}`,
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyInfo;
