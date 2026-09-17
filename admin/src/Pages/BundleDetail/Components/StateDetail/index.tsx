import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { SET_STATE_LOCALIZATION_MAP } from 'Pages/BundleHallwayList/constants';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsBundleBundleState } from '@/api-types/product-api';

interface StateDetailProps {
	state?: `${VinistoHelperDllEnumsBundleBundleState}`;
}

const StateDetail = ({ state }: StateDetailProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();

	if (!state) {
		return '-';
	}

	return (
		<div className={cx(styles.bundleState, state.toLowerCase())}>
			{t({
				id: SET_STATE_LOCALIZATION_MAP[
					state as VinistoHelperDllEnumsBundleBundleState
				],
			})}
		</div>
	);
};

export default StateDetail;
