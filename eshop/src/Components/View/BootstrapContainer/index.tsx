/**
 * @deprecated
 * Use Container component instead
 */
import cx from 'classnames';

import { BootstrapContainerProps } from './interfaces';

const BootstrapContainer = (props: BootstrapContainerProps) => {
	return (
		<div
			className={cx('container', props?.containerClassName)}
			ref={props.parentRef}
		>
			<div className={cx('row', props?.className)}>{props.children}</div>
		</div>
	);
};

export default BootstrapContainer;
