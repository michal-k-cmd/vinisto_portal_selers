import { RiErrorWarningLine } from 'react-icons/ri';
import { Fragment, type ReactNode, useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	IS_GIFT,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';

import { VARIANTS } from './constants';
import { BundleFlagsWarningProps } from './interfaces';
import styles from './styles.module.css';

export type Flag =
	| typeof TEMPORARY_UNAVAILABLE
	| typeof IS_GIFT
	| typeof IS_DELETED
	| typeof IS_CLEARANCE_SALE;

// eslint-disable-next-line no-redeclare
const Flag = ({ translation }: { translation: ReactNode }) => (
	<span className={styles.warning}>{translation}</span>
);

const BundleFlagsWarning = ({
	className,
	flags,
	variant = 'DEFAULT',
}: BundleFlagsWarningProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const translationMap = {
		[TEMPORARY_UNAVAILABLE]: t({
			id: 'admin.bundleDetail.temporaryUnavailable.label',
		}),
		[IS_GIFT]: t({ id: 'admin.bundleDetail.isGift.label' }),
		[IS_DELETED]: t({ id: 'admin.bundleDetail.isDeleted.label' }),
		[IS_CLEARANCE_SALE]: t({
			id: 'admin.bundleDetail.isClearanceSale.label',
		}),
	};

	const nonEmptyFlags = (Object.keys(flags) as Flag[]).filter(
		(key) => flags[key]
	);

	if (nonEmptyFlags.length === 0) return null;

	if (variant === VARIANTS.TABLE_CELL) {
		return (
			<span className={cx(className, styles.wrapper, styles.table_cell)}>
				<RiErrorWarningLine />
				<span>
					{nonEmptyFlags.map((flag, i) => (
						<Fragment key={i}>
							{i > 0 && ', '}
							<Flag translation={translationMap[flag]} />
						</Fragment>
					))}
				</span>
			</span>
		);
	}

	return (
		<span className={cx(className, styles.wrapper)}>
			<RiErrorWarningLine />
			<span>{t({ id: 'bundleWarning.bundleHasFlag' })}</span>
			<span>
				{nonEmptyFlags.map((flag, i) => (
					<Fragment key={i}>
						{i > 0 && ', '}
						<Flag translation={translationMap[flag]} />
					</Fragment>
				))}
			</span>
		</span>
	);
};

export default BundleFlagsWarning;
