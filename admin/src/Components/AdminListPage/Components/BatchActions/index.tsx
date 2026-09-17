import { useContext } from 'react';
import { map } from 'Helpers/lodash';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { BsArrow90DegDown } from 'react-icons/bs';

import { IBatchActionsProps } from './interfaces';

const BatchActions = ({ isAllowed, actions }: IBatchActionsProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div className="d-flex align-items-end mx-1 pb-1 px-0 px-md-2 gap-2 flex-wrap">
			<BsArrow90DegDown
				className={cx({
					'batch-actions-arrow--disabled': !isAllowed,
				})}
			/>
			{map(actions, (action, index) => (
				<button
					key={index}
					type="button"
					className={cx(
						'btn btn-outline-primary btn-sm d-flex align-items-center gap-1 ms-md-0',
						index == 0 ? 'ms-0' : 'ms-4'
					)}
					disabled={!isAllowed}
					onClick={action.onClick}
				>
					{action.ico} {t({ id: action.title })}
				</button>
			))}
		</div>
	);
};

export default BatchActions;
