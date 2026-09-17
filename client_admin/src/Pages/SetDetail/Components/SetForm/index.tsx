import {
	CreateOrUpdateSetFormValues,
	FormApiWithArrayMutators,
} from 'Pages/SetDetail/interfaces';
import cx from 'classnames';
import { useCallback, useContext, useMemo } from 'react';
import { Input, InputTextArea, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import warehouseServiceInstance from 'Services/WarehouseService';
import { useQuery } from '@tanstack/react-query';
import { WAREHOUSE_QUANTITY_QUERY_KEY } from 'Services/WarehouseService/constants';
import { Field } from 'react-final-form';
import { unstable_useBlocker } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import styles from '../../styles.module.css';

import { ProductType } from './interfaces';
import { TableRow } from './TableRow';

import { Bundle } from '@/domain/bundle';
import { VinistoHelperDllEnumsBundleBundleState } from '@/api-types/product-api';

type Props = {
	form: FormApiWithArrayMutators<CreateOrUpdateSetFormValues>;
	values: CreateOrUpdateSetFormValues;
	state: `${VinistoHelperDllEnumsBundleBundleState}`;
};

const SetForm = ({ form, values, state }: Props) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const blocker = unstable_useBlocker(({ currentLocation, nextLocation }) => {
		const formState = form.getState();

		return (
			formState.dirty === true &&
			formState.submitting === false &&
			formState.submitSucceeded === false &&
			currentLocation.pathname !== nextLocation.pathname
		);
	});

	const hasFreeBundles = useMemo(
		() => values.freeBundles.length > 0,
		[values.freeBundles]
	);

	const handleAddProduct = useCallback(
		(type: ProductType, index: number, bundle: Bundle | null) => {
			const fieldName =
				type === ProductType.PAID ? 'paidBundles' : 'freeBundles';
			form.mutators.update(fieldName, index, bundle);
		},
		[form]
	);

	const bundleIds = [...values.paidBundles, ...values.freeBundles]
		.filter((bundle) => bundle?.id)
		.map((bundle) => bundle?.id);

	const { data: stockData } = useQuery({
		queryKey: [WAREHOUSE_QUANTITY_QUERY_KEY, String(bundleIds)],
		queryFn: () =>
			warehouseServiceInstance.getBundleQuantities(bundleIds as string[]),
		enabled: Boolean(bundleIds.length),
	});

	const renderTableRows = useCallback(
		(productType: ProductType) => {
			const arrayName =
				productType === ProductType.PAID ? 'paidBundles' : 'freeBundles';

			return (
				<Field
					name={arrayName}
					render={({ meta }) => {
						return (
							<>
								{values[arrayName].map((bundle, index) => {
									return (
										<TableRow
											key={`row-${arrayName}-${index}`}
											bundle={bundle}
											onAddProduct={(bundle) => {
												return handleAddProduct(productType, index, bundle);
											}}
											rowNumber={
												productType == ProductType.PAID
													? index + 1
													: values.paidBundles.length + index + 1
											}
											stockData={
												stockData?.find(
													(stockBundle) => stockBundle.itemId === bundle?.id
												)?.quantity
											}
											state={state}
										/>
									);
								})}
								{meta.error && meta.touched && (
									<tr className={cx('input-error mt-1 mb-2')}>
										<td colSpan={3}>
											{meta.touched
												? t({ id: 'set.form.missingBundles' })
												: null}
										</td>
									</tr>
								)}
							</>
						);
					}}
				></Field>
			);
		},
		[values, t, stockData, state, handleAddProduct]
	);

	return (
		<>
			<div className={styles.card}>
				<h2>{t({ id: 'set.form.information.heading' })}</h2>
				<p className={styles.info}>
					{t({
						id: 'set.form.information.description',
					})}
				</p>
				<div className={styles.inputWrapper}>
					<Input
						type="text"
						name="name"
						identifier="name"
						label={t({ id: 'set.form.name' })}
						validate={Validators.required}
						disabled={state !== VinistoHelperDllEnumsBundleBundleState.Concept}
					/>
					<InputTextArea
						name="shortDescription"
						identifier="shortDescription"
						label={
							<div className={styles.tooltipwrapper}>
								{t({
									id: 'set.form.shortDescription',
									defaultMessage: 'Krátký popis',
								})}
								<div className={styles.tooltip}>
									i
									<span className={styles.tooltiptext}>
										{t({
											id: 'set.form.shortDescription.tooltip',
										})}
									</span>
								</div>
							</div>
						}
						validate={Validators.required}
						disabled={state !== VinistoHelperDllEnumsBundleBundleState.Concept}
						rows={2}
					/>
					<InputTextArea
						name="description"
						identifier="description"
						label={
							<div className={styles.tooltipwrapper}>
								{t({
									id: 'set.form.description',
									defaultMessage: 'Detailní popis',
								})}
								<div className={styles.tooltip}>
									i
									<span className={styles.tooltiptext}>
										{t({
											id: 'set.form.description.tooltip',
										})}
									</span>
								</div>
							</div>
						}
						validate={Validators.required}
						disabled={state !== VinistoHelperDllEnumsBundleBundleState.Concept}
						rows={4}
					/>
				</div>
			</div>
			<div className={styles.card}>
				<h2>{t({ id: 'set.form.products.heading' })}</h2>
				<table className={styles.table}>
					<thead>
						<tr>
							<th></th>
							<th>{t({ id: 'set.form.products.table.image' })}</th>
							<th>{t({ id: 'set.form.products.table.id' })}</th>
							<th>{t({ id: 'set.form.products.table.name' })}</th>
							<th>{t({ id: 'set.form.products.table.priceB2C' })}</th>
							<th>{t({ id: 'set.form.products.table.priceB2B' })}</th>
							<th>{t({ id: 'set.form.products.table.quantity' })}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{renderTableRows(ProductType.PAID)}
						{hasFreeBundles && (
							<>
								<TableRow isFreeSpacer={true} />
								{renderTableRows(ProductType.FREE)}
							</>
						)}
					</tbody>
				</table>
			</div>
			{blocker.state === 'blocked'
				? confirmAlert({
						title: `${t({
							id: 'set.confirm.leave.title',
						})}`,
						message: `${t({
							id: 'set.confirm.leave.message',
						})}`,
						buttons: [
							{
								label: `${t({
									id: 'set.confirm.leave',
								})}`,
								onClick: () => {
									blocker.proceed();
								},
							},
							{
								label: `${t({
									id: 'set.confirm.stay',
								})}`,
								onClick: () => {
									blocker.reset();
								},
							},
						],
						closeOnEscape: false,
						closeOnClickOutside: false,
				  })
				: null}
		</>
	);
};

export default SetForm;
