import { DeviceServiceContext } from 'Services/DeviceService';
import { useContext, useEffect, useLayoutEffect } from 'react';

const usePreventScroll = ({
	isScrollDisabled,
}: {
	isScrollDisabled: boolean;
}) => {
	const { layoutWidth } = useContext(DeviceServiceContext);

	useLayoutEffect(() => {
		document.documentElement.style.setProperty(
			'--scrollbar-width',
			window.innerWidth - document.documentElement.offsetWidth + 'px'
		);

		return () => {
			document.documentElement.style.removeProperty('--scrollbar-width');
		};
	}, [layoutWidth]);

	useEffect(() => {
		if (isScrollDisabled) {
			document.body.classList.add('noScroll');
		} else {
			document.body.classList.remove('noScroll');
		}
		return () => {
			document.body.classList.remove('noScroll');
		};
	}, [isScrollDisabled]);
};

export default usePreventScroll;
