import {
	CreateOrUpdateSetFormValues,
	FormApiWithArrayMutators,
} from 'Pages/SetDetail/interfaces';
import React, { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import {
	SET_STATE_LOCALIZATION_MAP,
	SET_TYPE_LOCALIZATION_MAP,
} from 'Pages/SetList/constants';
import { SetTypeWithoutNone } from 'Pages/SetList/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import styles from '../../styles.module.css';

import {
	VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsBundleSetType,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';
import SupplierSetService from '@/supplier-set-service';

type Props = {
	bundleId: string | undefined;
	values: CreateOrUpdateSetFormValues;
	change: FormApiWithArrayMutators<CreateOrUpdateSetFormValues>['change'];
	setType: SetTypeWithoutNone;
	handleSubmit: (
		event?: Partial<
			Pick<React.SyntheticEvent, 'preventDefault' | 'stopPropagation'>
		>,
		submitType?: 'save' | 'send'
	) => void;
	state: `${VinistoHelperDllEnumsBundleBundleState}`;
};

const Header = ({ bundleId = '', values, change, state }: Props) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { loginHash: userLoginHash } = vinistoUser ?? {};
	const { useFormatMessage, activeCurrency } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const navigate = useNavigate();

	const totalPrice = useMemo(() => {
		const freeBundlesPrice = values.freeBundles.filter((item): item is Bundle =>
			Boolean(item)
		).length;

		const paidBundlesPrice = values.paidBundles.reduce((acc, bundle) => {
			if (!bundle) return acc;

			const { bundlePrices } = bundle;

			return acc + bundlePrices.basePrice.valueWithVat;
		}, 0);

		const totalPrice = freeBundlesPrice + paidBundlesPrice;

		if (values.setType === VinistoHelperDllEnumsBundleSetType.Six10Percentage) {
			return totalPrice - totalPrice * 0.1;
		}

		return totalPrice;
	}, [values.paidBundles, values.freeBundles, values.setType]);

	const deleteConceptMutation = useMutation(
		SupplierSetService.deleteSupplierSetConcept,
		{
			onSuccess: () => {
				notificationsContext.handleShowSuccessNotification(
					'set.delete.success'
				);
				navigate('/set-list');
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification('set.delete.error');
			},
		}
	);

	const handleDeleteConcept = useCallback(
		(args: { userLoginHash: string; bundleId: string }) =>
			confirmAlert({
				title: `${t({
					id: 'set.confirm.deleteConcept.title',
				})}`,
				message: `${t({
					id: 'set.confirm.deleteConcept.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'yes',
						})}`,
						onClick: () => deleteConceptMutation.mutateAsync(args),
					},
					{
						label: `${t({
							id: 'no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[deleteConceptMutation, t]
	);

	return (
		<div className={styles.header}>
			<div className={styles.setInfo}>
				<div>
					<span>{t({ id: 'set.setState' })}:</span>
					<strong>{t({ id: `${SET_STATE_LOCALIZATION_MAP[state]}` })}</strong>
				</div>
				<div>
					<span>{t({ id: 'set.setType' })}:</span>
					<strong>
						{t({
							id: `${
								SET_TYPE_LOCALIZATION_MAP[values.setType as SetTypeWithoutNone]
							}`,
						})}
					</strong>
				</div>
				<div>
					<span>{t({ id: 'set.setPrice' })}:</span>
					<strong>
						{getLocalizedPrice({
							price: totalPrice,
							currency:
								activeCurrency.currency as VinistoHelperDllEnumsCurrency,
						})}
					</strong>
				</div>
			</div>
			<div className={styles.control}>
				{state === VinistoHelperDllEnumsBundleBundleState.Concept && (
					<div style={{ display: 'contents' }}>
						<button
							className={cx(styles.btn, 'btn btn-success')}
							// https://github.com/final-form/react-final-form/issues/656#issuecomment-838161562
							onClick={() => {
								change('action', 'saveAsPublished');
							}}
							type="submit"
						>
							{t({ id: 'set.saveAndSend' })}
						</button>
						<button
							className={cx(styles.btn, 'btn btn-primary')}
							// https://github.com/final-form/react-final-form/issues/656#issuecomment-838161562
							onClick={() => {
								change('action', 'saveAsConcept');
							}}
							type="submit"
						>
							{t({ id: 'set.save' })}
						</button>
						{Boolean(bundleId) && (
							<button
								className={cx(styles.btn, 'btn btn-primary')}
								onClick={() =>
									handleDeleteConcept({
										userLoginHash: userLoginHash ?? '',
										bundleId,
									})
								}
								type="button"
							>
								{t({ id: 'set.delete' })}
							</button>
						)}
					</div>
				)}
				<Link
					to={`/set-list`}
					className={cx(styles.btn, styles.backLink, 'btn btn-primary')}
				>
					{t({ id: 'set.backToList' })}
				</Link>
			</div>
		</div>
	);
};

export default Header;
