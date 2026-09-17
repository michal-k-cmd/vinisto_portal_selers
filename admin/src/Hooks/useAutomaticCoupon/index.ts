/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { apiServiceInstance } from 'Services/ApiService';
import AutomaticCouponAdapter, {
	AutomaticCoupon,
} from 'Services/ApiService/Adapters/AutomaticCouponAdapter';
import { DEFAULT_LANGUAGE } from 'Components/Modal/Components/Banner/constants';
import { HttpError as AxiosError } from 'Services/ApiService/http';
import {
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
} from 'Services/Specification/constants';

import { AUTOMATIC_COUPON_URI } from './constants';

import {
	AutomaticCouponsCreatePayload,
	VinistoHelperDllEnumsAutomaticCouponTriggerType,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsDiscountCouponLimitationType,
} from '@/api-types/order-api';

const useAutomaticCoupon = () => {
	const locale = useContext(LocalizationContext);
	const auth = useContext(AuthenticationContext);
	const notifications = useContext(NotificationsContext);

	const automaticCouponAdapter = new AutomaticCouponAdapter();

	const t = locale.useFormatMessage();

	const [automaticCoupons, setAutomaticCoupons] = useState<AutomaticCoupon[]>(
		[]
	);

	const mapTriggerOptionsToObject = (
		enumValue: VinistoHelperDllEnumsAutomaticCouponTriggerType
	) => {
		switch (enumValue) {
			case VinistoHelperDllEnumsAutomaticCouponTriggerType.NEW_USER_REGISTRATION:
				return {
					value: 'NEW_USER_REGISTRATION',
					label: `${t({
						id: 'admin.modal.discountCouponAuto.trigger.newUserRegistration',
					})}`,
				};
			case VinistoHelperDllEnumsAutomaticCouponTriggerType.NEXT_ORDER:
				return {
					value: 'NEXT_ORDER',
					label: `${t({
						id: 'admin.modal.discountCouponAuto.trigger.nextOrder',
					})}`,
				};
		}
	};

	const triggerOptions = Object.values(
		VinistoHelperDllEnumsAutomaticCouponTriggerType
	).map(mapTriggerOptionsToObject);

	useEffect(() => {
		const getAll = async () => {
			return apiServiceInstance
				.getCollection(
					AUTOMATIC_COUPON_URI,
					[
						{
							key: 'UserLoginHash',
							value: auth.vinistoUser.loginHash,
						},
					],
					true
				)
				.then((response: unknown) => {
					if (
						typeof response === 'object' &&
						response !== null &&
						'automaticCoupons' in response &&
						Array.isArray(response.automaticCoupons) &&
						response.automaticCoupons.every((item: unknown) =>
							automaticCouponAdapter.isValid(item)
						)
					) {
						setAutomaticCoupons(
							response.automaticCoupons.map(automaticCouponAdapter.fromApi)
						);
					} else {
						// eslint-disable-next-line no-console
						console.error('Invalid response');
					}
				})
				.catch(() => {
					notifications.handleShowErrorNotification(
						'admin.modal.discountCouponAuto.getAll.error'
					);
				});
		};

		getAll();
	}, []);

	const create = async (data: AutomaticCoupon) => {
		const requestData: AutomaticCouponsCreatePayload = {
			userLoginHash: auth.vinistoUser.loginHash,
			trigger: data.trigger,
			applicableFrom: parseInt(data.applicableFrom),
			minOrderPrice: data.minOrderPrice,
			maxOrderPrice: data.maxOrderPrice,
			name: data.name,
			discountType:
				data.discountType as VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
			discountValue: data.discountValue,
			currency: data.currency as VinistoHelperDllEnumsCurrency,
			language: DEFAULT_LANGUAGE,
			expirationDays: data.expirationDays,
			isCombinable: data.isCombinable,
			isForDiscountedItems: data.isForDiscountedItems,
			limitationDefinition: data.limitationDefinition,
		};

		if (
			data.limitationDefinition.limitationType ===
			VinistoHelperDllEnumsDiscountCouponLimitationType.SPECIFICATION_LIMITATION
		) {
			requestData.limitationDefinition = {
				...requestData.limitationDefinition,
				specification: {
					specificationDefinitionId: data.specificationDefinitionId,
					specificationType: data.specificationType,
					allowedValues: data.specificationValues?.map(({ value }) =>
						[
							TYPE_DECIMAL_NUMBER,
							TYPE_DECIMAL_NUMBER_IMPERIAL,
							TYPE_NUMBER,
							TYPE_NUMBER_IMPERIAL,
						].includes(data.specificationType ?? '')
							? Number(value)
							: value
					),
				},
			};
		}

		return apiServiceInstance
			.post(AUTOMATIC_COUPON_URI, requestData, true)
			.then(() => {
				notifications.handleShowSuccessNotification(
					'admin.modal.discountCouponAuto.create.success'
				);
			})
			.catch((e) => {
				if (e.message === 'ObjectAlreadyExists') {
					notifications.handleShowErrorNotification(
						'admin.modal.discountCouponAuto.error.objectAlreadyExists'
					);
					return;
				}

				notifications.handleShowErrorNotification(
					'admin.modal.discountCouponAuto.create.error'
				);
			});
	};

	const update = async (data: AutomaticCoupon) => {
		const requestData: AutomaticCouponsCreatePayload = {
			userLoginHash: auth.vinistoUser.loginHash,
			trigger: data.trigger,
			applicableFrom: parseInt(data.applicableFrom),
			minOrderPrice: data.minOrderPrice,
			maxOrderPrice: data.maxOrderPrice,
			name: data.name,
			discountType:
				data.discountType as VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
			discountValue: data.discountValue,
			currency: data.currency as VinistoHelperDllEnumsCurrency,
			language: DEFAULT_LANGUAGE,
			expirationDays: data.expirationDays,
			isCombinable: data.isCombinable,
			isForDiscountedItems: data.isForDiscountedItems,
			limitationDefinition: data.limitationDefinition,
		};

		if (
			data.limitationDefinition.limitationType ===
			VinistoHelperDllEnumsDiscountCouponLimitationType.CATEGORY_LIMITATION
		) {
			requestData.limitationDefinition = {
				limitationType: data.limitationDefinition.limitationType,
				categoryId: data.limitationDefinition.categoryId,
			};
		}

		if (
			data.limitationDefinition.limitationType ===
			VinistoHelperDllEnumsDiscountCouponLimitationType.SPECIFICATION_LIMITATION
		) {
			requestData.limitationDefinition = {
				...requestData.limitationDefinition,
				specification: {
					specificationDefinitionId: data.specificationDefinitionId,
					specificationType: data.specificationType,
					allowedValues: data.specificationValues?.map(({ value }) =>
						[
							TYPE_DECIMAL_NUMBER,
							TYPE_DECIMAL_NUMBER_IMPERIAL,
							TYPE_NUMBER,
							TYPE_NUMBER_IMPERIAL,
						].includes(data.specificationType ?? '')
							? Number(value)
							: value
					),
				},
			};
		}

		if (
			data.limitationDefinition.limitationType ===
			VinistoHelperDllEnumsDiscountCouponLimitationType.SUPPLIER_LIMITATION
		) {
			requestData.limitationDefinition = {
				limitationType: data.limitationDefinition.limitationType,
				supplierId: data.limitationDefinition.supplier?.[0]?.value,
			};
		}

		return apiServiceInstance
			.put(AUTOMATIC_COUPON_URI, requestData, true, data.id ?? '')
			.then(() => {
				notifications.handleShowSuccessNotification(
					'admin.modal.discountCouponAuto.update.success'
				);
			})
			.catch((e: AxiosError) => {
				if (e.message === 'ObjectAlreadyExists') {
					notifications.handleShowErrorNotification(
						'admin.modal.discountCouponAuto.error.objectAlreadyExists'
					);
					return;
				}

				notifications.handleShowErrorNotification(
					'admin.modal.discountCouponAuto.update.error'
				);
			});
	};

	const remove = async (couponId: string) => {
		return apiServiceInstance
			.delete(AUTOMATIC_COUPON_URI, couponId, true, [
				{
					key: 'userLoginHash',
					value: auth.vinistoUser.loginHash,
				},
			])
			.then(() => {
				notifications.handleShowSuccessNotification(
					'admin.modal.discountCouponAuto.delete.success'
				);
			})
			.catch(() => {
				notifications.handleShowErrorNotification(
					'admin.modal.discountCouponAuto.delete.error'
				);
			});
	};

	return {
		triggerOptions,
		automaticCoupons,
		create,
		update,
		remove,
	};
};

export default useAutomaticCoupon;
