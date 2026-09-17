import * as React from 'react';
import ReactSlider from 'react-slider';
import { get } from 'lodash-es';

const Slider: React.FC = (props): JSX.Element => {
	return (
		<ReactSlider
			ariaLabel={get(props, 'ariaLabel', '')}
			ariaLabelledby={get(props, 'ariaLabelledby', '')}
			ariaValuetext={get(props, 'ariaValuetext', '')}
			className={get(props, 'className', '')}
			trackClassName={get(props, 'markClassName', '')}
			markClassName={get(props, 'markClassName', '')}
			defaultValue={get(props, 'defaultValue', 0)}
			disabled={get(props, 'disabled', false)}
			invert={get(props, 'invert', false)}
			marks={get(props, 'marks', [])}
			max={get(props, 'max', 100)}
			min={get(props, 'min', 100)}
		/>
	);
};

export default Slider;
