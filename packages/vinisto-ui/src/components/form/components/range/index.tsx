'use client';

import { forwardRef } from 'react';
import ReactSlider, { type SliderProps } from 'rc-slider';
import { SliderRef } from 'rc-slider/lib/Slider';

import styles from './styles.module.css';

const Range = forwardRef<SliderRef, SliderProps>((props, ref) => (
	<ReactSlider
		{...props}
		range
		ref={ref}
		className={styles.component}
	/>
));

Range.displayName = 'Range';

export default Range;
