import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useMemo, useState } from 'react';

import BundleInfoParams from '../BundleInfoParams';

import styles from './styles.module.css';

import { BundleSpecificationDetails } from '@/domain/bundle/specification-details';
import { PRODUCT_ATTRIBUTE_TABS } from '@/product-service/specification/constants';

type AttributeTabsProps = {
	data: BundleSpecificationDetails[];
};

type TabKey = (typeof PRODUCT_ATTRIBUTE_TABS)[number];

export type TabSpecifications = Record<TabKey, BundleSpecificationDetails[]>;

const AttributeTabs = ({ data }: AttributeTabsProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const tabData = useMemo(() => getSpecificationsByTab(data), [data]);
	const visibleTabs = useMemo(
		() =>
			PRODUCT_ATTRIBUTE_TABS.filter(
				(tab) => (tabData[tab]?.length ?? 0) > 0
			) as TabKey[],
		[tabData]
	);

	const [selectedTab, setSelectedTab] = useState<TabKey>(visibleTabs[0]);

	if (visibleTabs.length === 0) {
		return null;
	}

	const effectiveSelectedTab = visibleTabs.includes(selectedTab)
		? selectedTab
		: visibleTabs[0];

	return (
		<section className={styles.attributeTabsContainer}>
			<div className={styles.tabsWrap}>
				<div className={styles.tabs}>
					{visibleTabs.map((tab) => (
						<button
							key={tab}
							type="button"
							className={
								effectiveSelectedTab === tab
									? `${styles.tab} ${styles.active}`
									: styles.tab
							}
							onClick={() => setSelectedTab(tab)}
						>
							<div className={styles.name}>
								{t({ id: `productAttribute.tab.${tab}` })?.toString() ?? tab}
							</div>
						</button>
					))}
				</div>
			</div>

			<BundleInfoParams bundleParams={tabData[effectiveSelectedTab]} />
		</section>
	);
};

function getSpecificationsByTab(
	data: BundleSpecificationDetails[]
): TabSpecifications {
	const buckets = Object.fromEntries(
		PRODUCT_ATTRIBUTE_TABS.map((tab) => [
			tab,
			[] as BundleSpecificationDetails[],
		])
	) as TabSpecifications;

	for (const item of data) {
		const tabs = item.definition.productAttributeTabs ?? [];
		for (const tab of tabs) {
			if ((PRODUCT_ATTRIBUTE_TABS as readonly string[]).includes(tab)) {
				buckets[tab as TabKey].push(item);
			}
		}
	}
	return buckets;
}

export default AttributeTabs;
