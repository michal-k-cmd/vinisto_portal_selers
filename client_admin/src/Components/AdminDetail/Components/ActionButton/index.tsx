import * as React from 'react';
import { get } from 'lodash-es';
import { CButton, CCol } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import { IActionButtonProps } from './interfaces';

import './styles.css';

/**
 * @category Component Action Button
 */
const ActionButton: React.FC<IActionButtonProps> = (
	props: IActionButtonProps
) => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const handleOnClick = React.useCallback(() => {
		const clickHandler = get(props, 'onClick', null);
		if (clickHandler && typeof clickHandler === 'function') {
			clickHandler({});
		}
	}, [props]);

	const ActionButtonIcon = get(props, 'icon', null);

	return (
		<CCol
			xs={12}
			lg={4}
			className="admin-action-buttons-row"
		>
			<CButton
				color="primary"
				onClick={handleOnClick}
				className="px-4 admin-action-button"
				type="button"
				disabled={get(props, 'disabled', false)}
			>
				{!!ActionButtonIcon && (
					<ActionButtonIcon className="action-button-icon" />
				)}
				{t({ id: get(props, 'label', '') })}
			</CButton>
		</CCol>
	);
};

export default ActionButton;
