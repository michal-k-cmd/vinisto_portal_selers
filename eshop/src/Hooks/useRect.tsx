import * as React from 'react';

type RectResult = {
	bottom: number;
	height: number;
	left: number;
	right: number;
	top: number;
	width: number;
};

export function getRect<T extends HTMLElement>(element?: T): RectResult {
	let rect: RectResult = {
		bottom: 0,
		height: 0,
		left: 0,
		right: 0,
		top: 0,
		width: 0,
	};
	if (element) rect = element.getBoundingClientRect();
	return rect;
}

export function useTopRect() {
	const ref = React.useRef(null);

	const [rect, setRect] = React.useState<any>({});

	React.useLayoutEffect(() => {
		if (ref?.current) {
			const rect = getRect(ref?.current);
			setRect(rect);
		}
	}, []);

	return [ref, rect.top];
}
