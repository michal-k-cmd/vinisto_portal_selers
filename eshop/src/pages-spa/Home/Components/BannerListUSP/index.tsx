import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import BannerService from 'Services/Banner';
import { BANNER_POSITION } from 'Services/Banner/constants';
import { Banner } from 'Services/Banner/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import BannerUSP from './Components/Banner';
import { BANNERS_QUERY_KEY, LIMIT } from './constants';
import styles from './styles.module.css';

const BannerListUSP = () => {
	const getLocalizedValue = useLocalizedValue();

	const bannerService = useMemo(
		() => new BannerService(getLocalizedValue),
		[getLocalizedValue]
	);

	const { data, isLoading, error } = useQuery<Banner[]>(
		[BANNERS_QUERY_KEY],
		bannerService.fetch(BANNER_POSITION.HP_USP, LIMIT)
	);

	if (error) return null;

	const uspBannerData = isLoading ? new Array(8).fill({}) : data;

	return (
		<div className={cx('container mt-1', styles.container)}>
			{uspBannerData?.map((item, i, arr) => (
				<BannerUSP
					key={'banlistusp' + i}
					title={item.title}
					subtitle={item.subtitle}
					url={item.url}
					imageUrl={item.imageUrl}
					itemsCount={arr.length}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
};

export default BannerListUSP;
