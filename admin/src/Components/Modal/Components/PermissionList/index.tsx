import RightsSwitcher from 'Components/RightsSwitcher';
import { VinistoHelperDllEnumsUserUserRights } from 'vinisto_api_client/src/api-types/user-api/';
import { MdInfo } from 'react-icons/md';
import { LocalizationContext } from 'Services/LocalizationService';
import { useCallback, useContext, useMemo, useState } from 'react';
import { ModalContext } from 'Components/Modal/context';

import styles from './styles.module.css';
import { RIGHTS_LABELS } from './interfaces';
import { PERMISSION_PRESETS } from './presets';

const PermissionList = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { data } = useContext(ModalContext);
	const {
		addPermissionMutation,
		deletePermissionMutation,
		userPermissions,
		skipPermissionToast,
		handleShowSuccessNotification,
		handleShowErrorNotification,
	} = data ?? {};

	const rights = VinistoHelperDllEnumsUserUserRights;

	const initialPermissions = useMemo(
		() => new Set<string>(userPermissions ?? []),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const [activePermissions, setActivePermissions] =
		useState<Set<string>>(initialPermissions);

	const handleToggle = useCallback(
		(permissionId: VinistoHelperDllEnumsUserUserRights) => {
			setActivePermissions((prev) => {
				const next = new Set(prev);
				if (next.has(permissionId)) {
					next.delete(permissionId);
					deletePermissionMutation?.mutate(permissionId);
				} else {
					next.add(permissionId);
					addPermissionMutation?.mutate(permissionId);
				}
				return next;
			});
		},
		[addPermissionMutation, deletePermissionMutation]
	);

	const handleApplyPreset = useCallback(
		async (presetPermissions: VinistoHelperDllEnumsUserUserRights[]) => {
			const desired = new Set<string>(presetPermissions);

			const currentPermissions = activePermissions;
			const allRights = Object.values(rights).filter(
				(p) => p !== rights.UNKNOWN
			);

			const toAdd = presetPermissions.filter((p) => !currentPermissions.has(p));
			const toRemove = allRights.filter(
				(p) => currentPermissions.has(p) && !desired.has(p)
			);

			if (toAdd.length === 0 && toRemove.length === 0) return;

			if (skipPermissionToast) skipPermissionToast.current = true;
			try {
				for (const perm of toAdd) {
					await addPermissionMutation?.mutateAsync(perm);
				}
				for (const perm of toRemove) {
					await deletePermissionMutation?.mutateAsync(perm);
				}
				handleShowSuccessNotification?.('admin.modal.changeRights.success');
			} catch {
				handleShowErrorNotification?.('admin.modal.changeRights.error');
			} finally {
				if (skipPermissionToast) skipPermissionToast.current = false;
			}

			setActivePermissions(desired);
		},
		[
			activePermissions,
			addPermissionMutation,
			deletePermissionMutation,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			rights,
			skipPermissionToast,
		]
	);

	return (
		<>
			<div className={styles.presetBar}>
				{PERMISSION_PRESETS.map((preset) => (
					<button
						key={preset.id}
						type="button"
						className={styles.presetButton}
						onClick={() => handleApplyPreset(preset.permissions)}
						disabled={preset.id === 'sales'}
					>
						{preset.label}
					</button>
				))}
			</div>
			<ul className={styles.permissionList}>
				{Object.values(rights).map(
					(permission) =>
						permission !== VinistoHelperDllEnumsUserUserRights.UNKNOWN && (
							<li
								key={permission}
								className={styles.permissionItem}
							>
								<RightsSwitcher
									permissionId={permission}
									checked={activePermissions.has(permission)}
									onToggle={handleToggle}
								/>
								{RIGHTS_LABELS[permission] && (
									<span className={styles.permissionLabelOpen}>
										<MdInfo />
										<span className={styles.permissionLabel}>
											{t({ id: RIGHTS_LABELS[permission] })}
										</span>
									</span>
								)}
							</li>
						)
				)}
			</ul>
		</>
	);
};

export default PermissionList;
