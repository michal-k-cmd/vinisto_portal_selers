import { CSSProperties, PropsWithChildren } from 'react';

type Animation = 'fadeIn' | 'fadeInFromLeft' | 'fadeOutToLeft';

interface AnimatedProps extends PropsWithChildren {
	type: Animation;
	duration?: string;
	delay?: string;
	style?: CSSProperties;
}

const Animated = ({
	type,
	duration = '600ms',
	delay = '0ms',
	style,
	children,
}: AnimatedProps) => (
	<div
		className={`sidebar-animation sidebar-animation--${type}`}
		style={{ ...style, animationDuration: duration, animationDelay: delay }}
	>
		{children}
	</div>
);

export default Animated;
