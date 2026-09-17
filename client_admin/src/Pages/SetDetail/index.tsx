import { useContext, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { SET_TYPE_DATA } from 'Pages/SetList/constants';
import { Form } from 'react-final-form';
import { SetTypeWithoutNone } from 'Pages/SetList/interfaces';
import { tiles } from 'Pages/SetList/Components/SetTiles/constants';
import arrayMutators from 'final-form-arrays';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';
import {
	CreateOrUpdateSetFormValues,
	FormApiWithArrayMutators,
} from './interfaces';
import SetForm from './Components/SetForm';
import Header from './Components/Header';

import supplierSetService from '@/supplier-set-service';
import {
	VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsBundleSetType,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundleReturn,
} from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';
import { bundleAdapter } from '@/index';

const FALLBACK_SET_TYPE = VinistoHelperDllEnumsBundleSetType.OnePlusOneFree;

const SetDetailPage = ({ mode = 'CREATE' }: { mode: 'CREATE' | 'EDIT' }) => {
	const getLocalizedValue = useLocalizedValue();
	const { vinistoUser, activeSupplierId } = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const queryClient = useQueryClient();

	const getSetBundlesQuery = useQuery(
		['get-supplier-set-bundle', id],
		() =>
			supplierSetService.getSupplierSetBundle(id ?? '').then((res) => ({
				...res,
				bundle: {
					...res.bundle,
					paidBundles:
						res.bundle?.paidBundles.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency: VinistoHelperDllEnumsCurrency.CZK,
							})
						) ?? [],
					freeBundles:
						res.bundle?.freeBundles.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency: VinistoHelperDllEnumsCurrency.CZK,
							})
						) ?? [],
				},
			})),
		{ enabled: mode === 'EDIT' && !!id, refetchOnMount: true }
	);

	const [setType] = useQueryParam(
		'setType',
		withDefault(StringParam, VinistoHelperDllEnumsBundleSetType.OnePlusOneFree)
	) as unknown as [SetTypeWithoutNone];

	useEffect(() => {
		if (!tiles.includes(setType as SetTypeWithoutNone)) {
			navigate(`/set-detail?setType=${FALLBACK_SET_TYPE}`, {
				replace: true,
			});
		}
	}, [setType, navigate]);

	const [numberOfPaidBundles, numberOfFreeBundles] = SET_TYPE_DATA[setType];

	const initialValues: Partial<CreateOrUpdateSetFormValues> = useMemo(() => {
		if (mode === 'EDIT') {
			const paidBundles = getSetBundlesQuery.data?.bundle?.paidBundles ?? [];
			const freeBundles = getSetBundlesQuery.data?.bundle?.freeBundles ?? [];
			const { name, shortDescription, description, setType } =
				getSetBundlesQuery.data?.bundle ?? {};

			return {
				name: getLocalizedValue(name ?? []),
				shortDescription: getLocalizedValue(shortDescription ?? []),
				description: getLocalizedValue(description ?? []),
				setType: setType ?? FALLBACK_SET_TYPE,
				freeBundles,
				paidBundles,
			};
		}

		return {
			name: '',
			shortDescription: '',
			description: '',
			setType,
			paidBundles: Array.from({ length: numberOfPaidBundles }).fill(
				null
			) as Array<Bundle | null>,

			freeBundles: Array.from({ length: numberOfFreeBundles }).fill(
				null
			) as Array<Bundle | null>,
		};
	}, [
		getLocalizedValue,
		getSetBundlesQuery.data,
		mode,
		numberOfFreeBundles,
		numberOfPaidBundles,
		setType,
	]);

	const { mutateAsync: saveSet } = useMutation<
		VinistoProductDllModelsApiBundleBundleReturn,
		unknown,
		Omit<CreateOrUpdateSetFormValues, 'action'>
	>({
		mutationFn: (values) => {
			const data = {
				...values,
				...(values.setType ===
				VinistoHelperDllEnumsBundleSetType.Six10Percentage
					? {
							percentageDiscountValue: 10,
					  }
					: {}),
				paidBundles:
					values.paidBundles
						.filter((bundle) => bundle?.id != undefined)
						.map((bundle) => String(bundle?.id)) ?? [],

				freeBundles:
					values.freeBundles
						.filter((bundle) => bundle?.id != undefined)
						.map((bundle) => String(bundle?.id)) ?? [],
				userLoginHash: vinistoUser?.loginHash ?? '',
				supplierId: activeSupplierId,
			};

			if (mode === 'EDIT')
				return supplierSetService.editSupplierSet(id ?? '', data);
			return supplierSetService.createSupplierSet(data);
		},
		onSuccess: () => {
			if (mode === 'CREATE') {
				notificationsContext.handleShowSuccessNotification(
					'set.create.success'
				);
			} else if (mode === 'EDIT') {
				notificationsContext.handleShowSuccessNotification('set.edit.success');
			}
			navigate(`/set-list`);
		},
		onError: (error) => {
			if (
				error &&
				typeof error === 'object' &&
				'message' in error &&
				error.message === 'ObjectAlreadyExists'
			) {
				return notificationsContext.handleShowErrorNotification(
					'set.error.objectAlreadyExists'
				);
			}
			if (mode === 'CREATE') {
				return notificationsContext.handleShowErrorNotification(
					'set.create.error'
				);
			}
			if (mode === 'EDIT') {
				return notificationsContext.handleShowErrorNotification(
					'set.edit.error'
				);
			}
		},
	});

	const { mutateAsync: requestConfirmation } = useMutation<
		VinistoProductDllModelsApiBundleBundleReturn,
		unknown,
		{ bundleId: string; userLoginHash: string }
	>({
		mutationFn: ({ bundleId, userLoginHash }) => {
			return supplierSetService.updateSupplierBundleState(bundleId, {
				userLoginHash,
				bundleSupplierState: VinistoHelperDllEnumsBundleBundleState.ToConfirm,
			});
		},
		onSuccess: () => {
			notificationsContext.handleShowSuccessNotification('set.confirm.success');
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification('set.confirm.error');
		},
	});

	const handleSubmit = async ({
		action,
		...values
	}: CreateOrUpdateSetFormValues) => {
		const bundleId = await saveSet(values).then((res) => res?.bundle?.id ?? '');
		if (bundleId && action === 'saveAsPublished') {
			await requestConfirmation({
				bundleId,
				userLoginHash: vinistoUser?.loginHash ?? '',
			});
		}
		await Promise.all([
			queryClient.invalidateQueries(['get-supplier-set-bundle', id]),
			queryClient.invalidateQueries(['product-api/bundles/get-supplier-sets']),
		]);
	};

	const formRef = useRef<HTMLFormElement>(null);

	return (
		<Form<CreateOrUpdateSetFormValues>
			onSubmit={handleSubmit}
			validateOnBlur={false}
			initialValues={initialValues}
			mutators={{
				...arrayMutators,
			}}
			validate={(values) => {
				const errors: Partial<Record<string, string>> = {};

				if (values.freeBundles.some((value) => value == null)) {
					errors.freeBundles = 'set.error.freeBundles';
				}
				if (values.paidBundles.some((value) => value == null)) {
					errors.paidBundles = 'set.error.paidBundles';
				}

				return errors;
			}}
			keepDirtyOnReinitialize
			render={({ form, handleSubmit, values }) => {
				return (
					<form
						ref={formRef}
						onSubmit={handleSubmit}
					>
						<Header
							bundleId={id}
							values={values}
							change={form.change}
							setType={setType}
							handleSubmit={handleSubmit}
							state={
								getSetBundlesQuery.data?.bundle?.states?.[0] ??
								VinistoHelperDllEnumsBundleBundleState.Concept
							}
						/>
						<div className={styles.formWrapper}>
							<input
								type="hidden"
								name="setType"
							/>
							<SetForm
								form={
									form as FormApiWithArrayMutators<CreateOrUpdateSetFormValues>
								}
								values={values}
								state={
									getSetBundlesQuery.data?.bundle?.states?.[0] ??
									VinistoHelperDllEnumsBundleBundleState.Concept
								}
							/>
						</div>
					</form>
				);
			}}
		/>
	);
};

export default SetDetailPage;
