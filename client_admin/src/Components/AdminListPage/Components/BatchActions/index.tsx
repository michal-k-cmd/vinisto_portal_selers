import { FC, useContext } from 'react';
import cx from 'classnames';
import { map } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import { BsArrow90DegDown } from 'react-icons/bs';

import { BatchActionsProps } from './interfaces';

const BatchActions: FC<BatchActionsProps> = (props) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="d-flex align-items-end mx-1 pb-1 px-2 gap-2">
			<BsArrow90DegDown
				className={cx({
					'batch-actions-arrow--disabled': !props.isAllowed,
				})}
			/>
			{map(props.actions, (action, index) => (
				<button
					key={index}
					type="button"
					className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
					disabled={!props.isAllowed}
					onClick={action.onClick}
				>
					{action.ico} {t({ id: action.title })}
				</button>
			))}
		</div>
	);
};

export default BatchActions;
