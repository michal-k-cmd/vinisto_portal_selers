import * as React from 'react';
import { CRow } from '@coreui/react';
import { get, map, uniqueId } from 'lodash-es';

import ActionButton from '../ActionButton';

const ActionButtons: React.FC<Record<any, any>> = (props: Record<any, any>) => {
	return (
		<>
			{map(
				get(props, 'actionButtonsSchema', []),
				(schemaItem: Record<any, any>, index: number) => {
					const rowKey = `admin-detail-action-buttons-row-${get(
						schemaItem,
						'rowId',
						''
					)}-${index}-${uniqueId()}`;
					return (
						<>
							<CRow key={rowKey}>
								{map(
									get(schemaItem, 'items', []),
									(item: Record<any, any>, itemIndex: number) => {
										const buttonKey = `action-button-${get(
											schemaItem,
											'rowId',
											''
										)}-${index}-${itemIndex}-${get(item, 'key')}-${uniqueId()}`;
										return (
											<ActionButton
												key={buttonKey}
												onClick={get(item, 'onClick', null)}
												label={get(item, 'label', '')}
												icon={get(item, 'icon', null)}
											/>
										);
									}
								)}
							</CRow>
							<br />
						</>
					);
				}
			)}
		</>
	);
};

export default ActionButtons;
