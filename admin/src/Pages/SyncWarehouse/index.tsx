import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { IoMdRepeat } from 'react-icons/io';
import AdminDetail from 'Components/AdminDetail';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

import WarehouseService from '@/warehouse-service';

const SyncWarehouse = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const loginHash = vinistoUser?.loginHash ?? '';

	const actionButtonsSchema = [
		{
			rowId: 'BUTTON_ROW_1',
			items: [
				{
					label: 'admin.syncWarehouse.sync',
					key: 'syncWarehouse',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.syncWarehouse.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.syncWarehouse.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.yes',
									})}`,
									onClick: () => {
										toast.promise(
											WarehouseService.synchronizeWarehouse({
												UserLoginHash: loginHash,
											}),
											{
												pending: `${t({
													id: 'admin.syncWarehouse.pending',
												})}`,
												success: `${t({
													id: 'admin.syncWarehouse.success',
												})}`,
												error: `${t({
													id: 'admin.syncWarehouse.error',
												})}`,
											}
										);
									},
								},
								{
									label: `${t({
										id: 'admin.no',
									})}`,
									onClick: undefined,
								},
							],
						});
					},
					icon: IoMdRepeat,
				},
			],
		},
	];

	return (
		<AdminDetail
			detailSchema={[]}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<div className="admin-page-list">
					<h1>
						{t({
							id: 'admin.syncWarehouse.header',
						})}
					</h1>
				</div>
			)}
		/>
	);
};

export default SyncWarehouse;
