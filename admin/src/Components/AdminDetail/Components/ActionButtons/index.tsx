import { useCallback, useContext } from 'react';
import { CRow } from '@coreui/react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';

import ActionButton from '../ActionButton';

import { ActionButtonSchema, ActionButtonsProps } from './interfaces';
import './styles.css';

const ActionButtons = ({ actionButtonsSchema }: ActionButtonsProps) => {
	const { permissions } = useContext(AuthenticationContext).vinistoUser;
	const { isTablet } = useContext(DeviceServiceContext);

	const getAllowedItems = useCallback(
		(schemaItem: ActionButtonSchema) => {
			return schemaItem.items.filter((item) =>
				item.rights
					? item.rights.some((right) => permissions.includes(right))
					: true
			);
		},
		[permissions]
	);

	return (
		<>
			{actionButtonsSchema.map((schemaItem, index) => {
				// Typeguard for ActionButtonSchema because I had to allow passing of Record<string, any> in order to suppress ts-error in various usages
				if (!isActionButtonSchema(schemaItem)) {
					return null;
				}
				const rowKey = `admin-detail-action-buttons-row-${schemaItem.rowId}-${index}`;
				return (
					<CRow
						key={rowKey}
						className={`admin-action-buttons-row ${
							isTablet ? 'flex-column' : ''
						}`}
					>
						{getAllowedItems(schemaItem).map(
							(
								{
									disableFallbackIcon = false,
									label,
									visible = true,
									key,
									disabled = false,
									icon,
									onClick,
									className,
								},
								itemIndex
							) => {
								const buttonKey = `action-button-${schemaItem.rowId}-${index}-${itemIndex}-${key}`;
								if (!visible) return null;
								return (
									<ActionButton
										key={buttonKey}
										onClick={onClick}
										label={label}
										icon={icon}
										disableFallbackIcon={disableFallbackIcon}
										disabled={disabled}
										className={className}
									/>
								);
							}
						)}
					</CRow>
				);
			})}
		</>
	);
};

export default ActionButtons;

function isActionButtonSchema(item: any): item is ActionButtonSchema {
	return item && typeof item.rowId === 'string' && Array.isArray(item.items);
}
