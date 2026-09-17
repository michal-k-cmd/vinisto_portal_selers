import { useCallback, useMemo, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import type { PromotionEvent } from 'Hooks/useAnalytics/types';

const viewedPromotions = new Set<string>();

const usePromotionAnalytics = <TElement extends HTMLElement = HTMLElement>(
	promotion: PromotionEvent
) => {
	const { sendEvent } = useAnalytics();
	const promotionRef = useRef<TElement | null>(null);
	const isViewSentRef = useRef(false);
	const { promotion_id, promotion_name, creative_name, creative_slot, items } =
		promotion;

	const promotionData = useMemo(
		() => ({
			promotion_id,
			promotion_name,
			creative_name,
			creative_slot,
			items,
		}),
		[promotion_id, promotion_name, creative_name, creative_slot, items]
	);

	useInViewport(
		promotionRef,
		{
			root: typeof document !== 'undefined' ? document.body : null,
			rootMargin: '0px',
		},
		undefined,
		{
			onEnterViewport: () => {
				if (isViewSentRef.current) return;
				if (viewedPromotions.has(promotionData.promotion_id)) return;

				isViewSentRef.current = true;
				viewedPromotions.add(promotionData.promotion_id);
				sendEvent(GA_EVENT.VIEW_PROMOTION, promotionData);
			},
		}
	);

	const handleSelectPromotion = useCallback(() => {
		sendEvent(GA_EVENT.SELECT_PROMOTION, promotionData);
	}, [promotionData, sendEvent]);

	return {
		promotionRef,
		handleSelectPromotion,
	};
};

export default usePromotionAnalytics;
