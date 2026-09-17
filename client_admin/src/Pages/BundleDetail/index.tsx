import { useContext, useMemo } from 'react';
import { find } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TopBarButton, TopBarItem } from 'Components/TopBar/interfaces';
import { WAREHOUSE_QUANTITY_QUERY_KEY } from 'Services/WarehouseService/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import warehouseServiceInstance from 'Services/WarehouseService';
import TopBar from 'Components/TopBar';
import useGoBackInHistory from 'Hooks/useGoBackInHistory';

import { BundleDetailContext } from './context';
import { getTopBarBundlePriceForRegularBundle } from './helpers';
import BundleInfo from './Components/BundleInfo';
import Discounts from './Components/Discounts';
import Sell from './Components/Sell';
import FeeRules from './Components/FeeRules';
import './styles.css';
import BundleState from './Components/BundleState';

const BundleDetailPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { title: activeCurrencyTitle, currency },
	} = useContext(LocalizationContext);
	const { bundle } = useContext(BundleDetailContext);

	const t = localizationContext.useFormatMessage();

	const { id: bundleId } = useParams();

	const goBack = useGoBackInHistory();

	const { data: stockData, isLoading: isStockDataLoading } = useQuery(
		[WAREHOUSE_QUANTITY_QUERY_KEY, bundleId ?? ''],
		async () =>
			bundleId === undefined
				? {}
				: warehouseServiceInstance.getBundleQuantities([bundleId])
	);
	const topBarItems = useMemo((): TopBarItem[] => {
		const isSet = !!bundle?.isSet;
		const items = [
			{
				label: t({ id: 'bundleDetail.topbar.id' }),
				value: bundle?.warehouseId?.length
					? bundle.warehouseId.join(', ')
					: bundleId,
			},
			bundle !== null
				? {
						label: t({ id: 'bundleDetail.topbar.inStock' }),
						value: isStockDataLoading
							? t({ id: 'bundleList.inStock.loading' })
							: find(
									stockData,
									// @ts-expect-error types are chaotic, needs refactoring
									(bundleStockData) => bundleStockData.itemId === bundle.id
									// @ts-expect-error dtto
							  )?.quantity,
				  }
				: undefined,
			bundle !== null
				? getTopBarBundlePriceForRegularBundle(
						bundle,
						t,
						currency,
						activeCurrencyTitle,
						isSet
				  )
				: undefined,
		];

		return items.filter((item): item is TopBarItem => item !== undefined);
	}, [
		bundleId,
		bundle,
		isStockDataLoading,
		stockData,
		currency,
		activeCurrencyTitle,
		t,
	]);

	const topBarButtons = useMemo(
		(): TopBarButton[] => [
			{
				label: t({ id: 'bundleDetail.topbar.btnGoBack' }),
				onClick: goBack(),
			},
		],
		[goBack, t]
	);

	return (
		<>
			<TopBar
				items={topBarItems}
				buttons={topBarButtons}
			/>
			{!!bundle && <BundleState bundle={bundle} />}
			<Sell />
			{!bundle?.isSet && <Discounts />}
			{!!bundle && <FeeRules bundle={bundle} />}
			<BundleInfo />
		</>
	);
};

export default BundleDetailPage;
