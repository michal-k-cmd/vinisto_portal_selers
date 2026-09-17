import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';

const useMenuAnalytics = () => {
	const { sendEvent } = useAnalytics();

	const handleOnClickMenuItem = (menuItemName: string) =>
		sendEvent(GA_EVENT.CLICK_MENU, {
			menu_item_name: menuItemName,
		});

	return { handleOnClickMenuItem };
};

export default useMenuAnalytics;
