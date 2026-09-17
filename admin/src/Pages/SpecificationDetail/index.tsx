import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DetailView from 'Components/Detail/View';
import { apiServiceInstance } from 'Services/ApiService';
import { VinistoImageDllModelsApiReturnDataImageReturn } from 'vinisto_api_client/src/api-types/image-api/';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	TYPE_COMBO_BOX,
	TYPE_MULTI_COMBO_BOX,
} from 'Services/Specification/constants';
import {
	ComboBoxSpecification,
	MultiComboBoxSpecification,
	SpecificationDetail,
} from 'Services/Specification/interfaces';
import { useCallback, useContext, useMemo } from 'react';
import { Loader } from 'react-bootstrap-typeahead';
import { useNavigate, useParams } from 'react-router-dom';
import Detail from 'Components/Detail';
import { confirmAlert } from 'react-confirm-alert';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { SpecificationHeader } from './Components/Header';
import SpecificationSettings from './Components/Settings';
import Translations from './Components/Translations';
import SpecificationValues from './Components/Values';

const fetchSpecificationData = async (specificationId: string) => {
	return await apiServiceInstance.get<SpecificationDetail>(
		`product-api/specifications/${specificationId}/GetSpecification`,
		true
	);
};

const fetchSpecificationValues = async (specificationId: string) => {
	return await apiServiceInstance.get<SpecificationDetail>(
		`product-api/specifications/${specificationId}/GetSpecificationUsedValues`,
		true
	);
};

const SpecificationDetailPage = () => {
	const { id: specificationId } = useParams();
	if (!specificationId) throw new Error('Missing specificationId');

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const history = useNavigate();

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const queryClient = useQueryClient();

	const specificationQueryKey = useMemo(
		() => ['specifications', specificationId],
		[specificationId]
	);

	const { data, isLoading, isError } = useQuery<SpecificationDetail>(
		specificationQueryKey,
		() => fetchSpecificationData(specificationId)
	);

	const specificationValues = useQuery<SpecificationDetail>(
		specificationQueryKey,
		() => fetchSpecificationValues(specificationId)
	);

	const isMultiComboBox =
		data?.specification?.specificationType === TYPE_MULTI_COMBO_BOX;

	const createSpecificationValue = (requestData: any) => {
		return apiServiceInstance.put(
			`product-api/specifications/${specificationId}/${
				isMultiComboBox ? 'Multi' : ''
			}ComboBoxSpecificationEditAllowedValues`,
			requestData,
			true
		);
	};

	const editSpecification = useCallback(
		async (specificationId: string, requestData: any) => {
			try {
				if (requestData.image instanceof FileList) {
					const formData = new FormData();
					formData.append('imageFile', requestData.image.item(0));

					const imageUploadResponse =
						await apiServiceInstance.upload<VinistoImageDllModelsApiReturnDataImageReturn>(
							`image-api/general-images?UserLoginHash=${requestData.userLoginHash}&ItemType=SpecificationDefinition`,
							formData,
							true
						);

					if (
						imageUploadResponse.images &&
						typeof imageUploadResponse.images[0].id == 'string'
					)
						requestData.imageId = imageUploadResponse.images[0].id;
				}
			} catch (error) {
				handleShowErrorNotification('admin.uploadImage.error');
			}

			return apiServiceInstance.put<SpecificationDetail>(
				`product-api/specifications/${specificationId}/UpdateSpecificationDefinition`,
				requestData,
				true
			);
		},
		[handleShowErrorNotification]
	);

	const editSpecificationValue = useCallback(
		async (requestData: any) => {
			try {
				if (requestData.image instanceof FileList) {
					const formData = new FormData();
					formData.append('imageFile', requestData.image.item(0));

					const imageUploadResponse =
						await apiServiceInstance.upload<VinistoImageDllModelsApiReturnDataImageReturn>(
							`image-api/general-images?UserLoginHash=${requestData.userLoginHash}&ItemType=SpecificationValue`,
							formData,
							true
						);

					if (
						imageUploadResponse.images &&
						typeof imageUploadResponse.images[0].id == 'string'
					)
						requestData.imageId = imageUploadResponse.images[0].id;
				}

				if (requestData.icon instanceof FileList) {
					const formData = new FormData();
					formData.append('imageFile', requestData.icon.item(0));

					const iconUploadResponse =
						await apiServiceInstance.upload<VinistoImageDllModelsApiReturnDataImageReturn>(
							`image-api/general-images?UserLoginHash=${requestData.userLoginHash}&ItemType=Icon`,
							formData,
							true
						);

					if (
						iconUploadResponse.images &&
						typeof iconUploadResponse.images[0].id === 'string'
					)
						requestData.iconId = iconUploadResponse.images[0].id;
				}
			} catch (error) {
				handleShowErrorNotification('admin.uploadImage.error');
			}

			return apiServiceInstance.put(
				`product-api/specifications/${specificationId}/${
					isMultiComboBox ? 'Multi' : ''
				}ComboBoxSpecificationEditAllowedValues`,
				requestData,
				true
			);
		},
		[handleShowErrorNotification, isMultiComboBox, specificationId]
	);

	const deleteSpecificationValue = (requestData: any) => {
		return apiServiceInstance.put(
			`product-api/specifications/${specificationId}/${
				isMultiComboBox ? 'Multi' : ''
			}ComboBoxSpecificationRemoveAllowedValues`,
			requestData,
			true
		);
	};

	const deleteSpecification = useCallback(
		({ id, userLoginHash }: { id: string; userLoginHash: string }) => {
			apiServiceInstance
				.delete(`product-api/specifications/${id}`, undefined, false, [
					{ key: 'userLoginHash', value: userLoginHash },
					{ key: 'specificationId', value: id },
				])
				.then(() => {
					handleShowSuccessNotification('admin.deleteSpecification.success');
					queryClient.invalidateQueries(specificationQueryKey);
					history(-1);
				})
				.catch(() => {
					handleShowErrorNotification(
						`${t({ id: 'admin.deleteSpecification.error' })}`
					);
				});
		},
		[
			handleShowErrorNotification,
			handleShowSuccessNotification,
			history,
			queryClient,
			specificationQueryKey,
			t,
		]
	);

	const editSpecificationMutation = useMutation(
		(data) => editSpecification(specificationId, data),
		{
			onSuccess: (updatedSpecification) => {
				handleShowSuccessNotification(
					'admin.category.specifications.edit.success'
				);
				queryClient.setQueryData(specificationQueryKey, updatedSpecification);
			},
			onError: () => {
				handleShowErrorNotification('admin.category.specifications.edit.error');
			},
		}
	);

	const createSpecificationValueMutation = useMutation(
		(data) => createSpecificationValue(data),
		{
			onSuccess: () => {
				handleShowSuccessNotification(
					'admin.addAllowedValueToSpecification.success'
				);
				queryClient.invalidateQueries(specificationQueryKey);
			},
			onError: () => {
				handleShowErrorNotification(
					'admin.addAllowedValueToSpecification.error'
				);
			},
		}
	);

	const editSpecificationValueMutation = useMutation(
		(data) => editSpecificationValue(data),
		{
			onSuccess: () => {
				handleShowSuccessNotification(
					'admin.editAllowedValueInSpecification.success'
				);
				queryClient.invalidateQueries(specificationQueryKey);
			},
			onError: () => {
				handleShowErrorNotification(
					'admin.editAllowedValueInSpecification.error'
				);
			},
		}
	);

	const deleteSpecificationValueMutation = useMutation(
		(data) => deleteSpecificationValue(data),
		{
			onSuccess: () => {
				handleShowSuccessNotification(
					'admin.deleteAllowedValueInSpecification.success'
				);
				queryClient.invalidateQueries(specificationQueryKey);
			},
			onError: () => {
				handleShowErrorNotification(
					'admin.deleteAllowedValueInSpecification.error'
				);
			},
		}
	);

	const handleOnRemoveSpecification = useCallback(
		(id: string) => {
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteSpecification.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteSpecification.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							deleteSpecification({ id, userLoginHash });
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
					},
				],
			});
		},
		[deleteSpecification, t, userLoginHash]
	);

	if (isError || specificationValues.isError)
		throw new Error('Error while fetching specification data');

	const isDataLoading =
		isLoading ||
		editSpecificationMutation.isLoading ||
		editSpecificationValueMutation.isLoading ||
		specificationValues.isLoading;

	if (isDataLoading || !data)
		return (
			<div>
				<Loader />
				<span className="ms-3">{t({ id: 'admin.loading' })}</span>
			</div>
		);

	const showValues =
		data?.specification?.specificationType === TYPE_MULTI_COMBO_BOX ||
		data?.specification?.specificationType === TYPE_COMBO_BOX;

	return (
		<DetailView>
			{data && <SpecificationHeader data={data} />}
			{data && (
				<SpecificationSettings
					data={data}
					editSpecificationMutation={editSpecificationMutation}
				/>
			)}
			{showValues && (
				<>
					<Translations
						data={
							data.specification as
								| ComboBoxSpecification
								| MultiComboBoxSpecification
						}
						editSpecificationMutation={editSpecificationMutation}
					/>
					<SpecificationValues
						data={specificationValues.data}
						createSpecificationValueMutation={createSpecificationValueMutation}
						editSpecificationValueMutation={editSpecificationValueMutation}
						deleteSpecificationValueMutation={deleteSpecificationValueMutation}
					/>
				</>
			)}
			{data && (
				<div className="d-flex ms-auto me-3">
					<Detail.Button
						onClick={() => handleOnRemoveSpecification(specificationId)}
					>
						{t({ id: 'admin.confirm.deleteSpecification.title' })}
					</Detail.Button>
				</div>
			)}
		</DetailView>
	);
};

export default SpecificationDetailPage;
