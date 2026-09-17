export interface BasketTabsProps {
	selectedTabId: string | null;
	setSelectedTabId: (tab: string | null) => void;
	isSummaryDisplayed: boolean;
}
