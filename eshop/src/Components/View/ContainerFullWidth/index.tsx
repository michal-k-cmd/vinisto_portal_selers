import cx from 'classnames';

import { IContainerFullWidthProps } from './interfaces';

const ContainerFullWidth = (props: IContainerFullWidthProps) => {
	return (
		<div className={cx('container', props?.containerClassName)}>
			<div className={cx('row', props?.rowClassName)}>
				<div className={cx('col-12', props?.className)}>{props.children}</div>
			</div>
		</div>
	);
};

export default ContainerFullWidth;
