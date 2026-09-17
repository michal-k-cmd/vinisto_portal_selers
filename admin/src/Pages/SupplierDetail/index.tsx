import { useCallback, useContext, useMemo, useState } from 'react';
import { get, includes } from 'Helpers/lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
	ADD_USER_TO_SUPPLIER,
	EDIT_SUPPLIER,
	UPLOAD_SUPPLIER_BASE_IMAGE,
	UPLOAD_SUPPLIER_CERTIFICATE,
	UPLOAD_SUPPLIER_LOGO,
} from 'Components/Modal/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import ApiService from 'Services/ApiService';
import AdminDetail from 'Components/AdminDetail';
import {
	MdAdd,
	MdKeyboardBackspace,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineSubtitles,
	MdPermIdentity,
} from 'react-icons/md';
import { RiBarcodeBoxLine } from 'react-icons/ri';
import {
	BsCamera,
	BsFacebook,
	BsFileLock,
	BsFillTagsFill,
	BsGlobe,
} from 'react-icons/bs';
import { HiOutlineIdentification } from 'react-icons/hi';
import { FaFilePdf, FaTruck } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Detail from 'Components/Detail';

import Image from './Components/Image';
import CertificatesList from './Components/CertificatesList';
import UserList from './Components/UserList';
import AddressList from './Components/AddressList';
import TagList from './Components/TagList';
import AttachTagModal from './Components/AttachTagModal';
import { supplierTypeTranslationsMap } from './constants';

import SupplierService from '@/supplier-service';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsSupplierSupplierType,
} from '@/api-types/supplier-api';

const SupplierDetailPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser;
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const history = useNavigate();
	const apiService = useMemo(() => new ApiService(), []);
	const permissions = get(authenticationContext, 'vinistoUser.permissions', []);
	const queryClient = useQueryClient();

	const { id: supplierId } = useParams();
	const supplierQueryKey = ['supplier', supplierId];

	const {
		data: supplierData,
		isLoading,
		refetch,
	} = useQuery(
		supplierQueryKey,
		() => SupplierService.getById(`${supplierId}`, userLoginHash),
		{
			enabled: !!supplierId,
		}
	);

	const handleEditInternalNote = (note: string) =>
		editInternalNoteMutation.mutate(note);

	const editInternalNoteMutation = useMutation(
		(note: string) =>
			SupplierService.updateSupplier(supplierId ?? '', {
				...supplierData,
				ico: supplierData?.ico ?? '',
				nameBilling: supplierData?.nameBilling ?? '',
				nameWeb: supplierData?.nameWeb ?? '',
				web: getLocalizedValue(supplierData?.web ?? []) || null,
				companyDescription:
					getLocalizedValue(supplierData?.companyDescription ?? []) || null,
				mainProfile: getLocalizedValue(supplierData?.mainProfile ?? []) || null,
				wineRegion: getLocalizedValue(supplierData?.wineRegion ?? []) || null,
				countryCode:
					supplierData?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ,
				supplierType:
					supplierData?.supplierType ??
					VinistoHelperDllEnumsSupplierSupplierType.PRODUCER,
				userLoginHash,
				internalSupplierNote: note,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.editInternalNote.success');
				queryClient.invalidateQueries(supplierQueryKey);
			},
			onError: () => {
				handleShowErrorNotification('admin.editInternalNote.error');
			},
		}
	);

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.supplierDetail.identifier.label',
			value: get(supplierData, 'id', supplierId),
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.supplierDetail.name.label',
			value: get(supplierData, 'nameBilling', '-'),
			type: null,
		},
		{
			icon: MdPermIdentity,
			label: 'admin.supplierDetail.regNumber.label',
			value: get(supplierData, 'ico', '-'),
			type: null,
		},
		{
			icon: HiOutlineIdentification,
			label: 'admin.supplierDetail.vatNumber.label',
			value: get(supplierData, 'dic', '-'),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.countryCode.label',
			value: get(supplierData, 'countryCode', '-'),
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.supplierDetail.nameWeb.label',
			value: get(supplierData, 'nameWeb', ''),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.web.label',
			value: (() => {
				const supplierWeb = getLocalizedValue(supplierData?.web ?? []);
				if (!supplierWeb) return '-';
				const resolvedAddress = supplierWeb.startsWith('http')
					? supplierWeb
					: `https://${supplierWeb}`;
				return (
					<a
						href={resolvedAddress}
						target="_blank"
						rel="noreferrer"
					>
						{supplierWeb}
					</a>
				);
			})(),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.companyDescription.label',
			value: getLocalizedValue(get(supplierData, 'companyDescription', [])),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.mainProfile.label',
			value: getLocalizedValue(get(supplierData, 'mainProfile', [])),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.wineRegion.label',
			value: getLocalizedValue(get(supplierData, 'wineRegion', [])),
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.supplierType.label',
			value: supplierData?.supplierType
				? t({ id: supplierTypeTranslationsMap[supplierData?.supplierType] })
				: '-',
			type: null,
		},
		{
			icon: BsGlobe,
			label: 'admin.supplierDetail.isShipping.label',
			value: get(supplierData, 'isShipping', false),
			type: 'boolean',
		},
		{
			icon: BsFacebook,
			label: 'admin.supplierDetail.flexi.label',
			value: get(supplierData, 'abbreviationInFlexibee', '-'),
			type: null,
		},
		{
			icon: BsFileLock,
			label: 'admin.supplierDetail.supplierNote.label',
			value: (
				<div>
					<Detail.Textarea
						label={null}
						value={supplierData?.internalSupplierNote ?? ''}
						onSave={handleEditInternalNote}
					/>
				</div>
			),
			type: null,
		},
	];

	if (!get(supplierData, 'isShipping')) {
		detailSchema.push(
			{
				icon: MdOutlineSubtitles,
				label: 'admin.supplierDetail.pickupAddress.label',
				value: ' ',
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.name.label',
				value: get(supplierData, 'pickupAddress.title', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.addressee.label',
				value: get(supplierData, 'pickupAddress.addressee', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.street.label',
				value: get(supplierData, 'pickupAddress.street', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.landRegistryNumber.label',
				value: get(supplierData, 'pickupAddress.landRegistryNumber', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.houseNumber.label',
				value: get(supplierData, 'pickupAddress.houseNumber', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.zip.label',
				value: get(supplierData, 'pickupAddress.zip', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.city.label',
				value: get(supplierData, 'pickupAddress.city', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.countryCode.label',
				value: get(supplierData, 'pickupAddress.countryCode', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.phone.label',
				value: get(supplierData, 'pickupAddress.phone', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.email.label',
				value: get(supplierData, 'pickupAddress.email', '-'),
				type: null,
			},
			{
				icon: FaTruck,
				label: 'admin.supplierDetail.note.label',
				value: get(supplierData, 'pickupAddress.note', '-'),
				type: null,
			}
		);
	}

	const actionButtonsSchema: Record<any, any>[] = [
		{
			rowId: 'SUPPLIER_1',
			items: [
				{
					label: 'admin.btn.editSupplier',
					key: 'editSupplier',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(EDIT_SUPPLIER, {
							supplierData,
							refetch,
						});
					},
					icon: MdOutlineEdit,
				},
				{
					label: 'admin.btn.addUser',
					key: 'addUser',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_USER_TO_SUPPLIER, {
							supplierData,
							refetch,
						});
					},
					icon: MdAdd,
				},
				{
					label: 'admin.btn.back',
					onClick: useCallback(() => {
						history(-1);
					}, [history]),
					icon: MdKeyboardBackspace,
				},
			],
		},
		{
			rowId: 'SUPPLIER_2',
			items: [
				{
					label: 'admin.btn.uploadLogo',
					key: 'uploadLogo',
					disabled: isLoading,
					onClick: useCallback(() => {
						modalContext.handleOpenModal(UPLOAD_SUPPLIER_LOGO, {
							supplierData,
							refetch,
						});
					}, [modalContext, refetch, supplierData]),
					icon: BsCamera,
				},
				{
					label: 'admin.btn.uploadBaseImage',
					key: 'uploadBaseImage',
					disabled: isLoading,
					onClick: useCallback(() => {
						modalContext.handleOpenModal(UPLOAD_SUPPLIER_BASE_IMAGE, {
							supplierData,
							refetch,
						});
					}, [modalContext, supplierData, refetch]),
					icon: BsCamera,
				},
				{
					label: 'admin.btn.uploadCertificate',
					key: 'uploadCertificate',
					onClick: useCallback(() => {
						modalContext.handleOpenModal(UPLOAD_SUPPLIER_CERTIFICATE, {
							supplierData,
							refetch,
						});
					}, [modalContext, supplierData, refetch]),
					icon: FaFilePdf,
					disabled:
						isLoading ||
						!includes(permissions, 'USER_ADMIN_SUPPLIER_CERTIFICATES'),
				},
			],
		},
		{
			rowId: 'SUPPLIER_3',
			items: [
				{
					label: 'admin.btn.deleteSupplier',
					key: 'deleteSupplier',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteSupplier.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteSupplier.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.yes',
									})}`,
									onClick: () => {
										apiService
											.delete(`supplier-api/suppliers`, supplierId, true, [
												{
													key: 'userLoginHash',
													value: authenticationContext.vinistoUser.loginHash,
												},
											])
											.then(() => {
												handleShowSuccessNotification(
													'admin.deleteSupplier.success'
												);
												history(`/supplier-list`);
											})
											.catch(() => {
												handleShowErrorNotification(
													'admin.deleteSupplier.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.no',
									})}`,
									onClick: () => {},
								},
							],
						});
					},
					icon: MdOutlineDelete,
					disabled: isLoading,
				},
				{
					label: 'tags.manage',
					key: 'manage tags',
					onClick: () => setIsAttachTagModalOpen(true),
					icon: BsFillTagsFill,
				},
			],
		},
	];

	const handleOnDeleteImage = useCallback(
		(imageId: string) => () => {
			confirmAlert({
				title: `${t({ id: 'admin.confirm.deleteImage.title' })}`,
				message: `${t({ id: 'admin.confirm.deleteImage.message' })}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							apiService
								.delete(`image-api/images/${imageId}`, undefined, true, [
									{
										key: 'UserLoginHash',
										value: get(authenticationContext, 'vinistoUser.loginHash'),
									},
								])
								.then(() => {
									refetch();
									handleShowSuccessNotification(
										'admin.confirm.deleteImage.success'
									);
								})
								.catch(() => {
									handleShowErrorNotification(
										'admin.confirm.deleteImage.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => undefined,
					},
				],
			});
		},
		[
			t,
			apiService,
			authenticationContext,
			refetch,
			handleShowSuccessNotification,
			handleShowErrorNotification,
		]
	);

	const [isAttachTagModalOpen, setIsAttachTagModalOpen] = useState(false);

	if (!supplierData) {
		return null;
	}

	return (
		<AdminDetail
			{...{ detailSchema, actionButtonsSchema }}
			customComponentRender={() => (
				<>
					<AddressList
						supplier={supplierData}
						isLoading={isLoading}
						refetch={refetch}
					/>

					<div className="admin-item-list__title">Logo</div>
					{!supplierData.logo?.id ? (
						<p>{t({ id: 'admin.supplierDetail.noLogoUploaded' })}</p>
					) : (
						<Image
							imageUrl={supplierData.logo.domainUrls?.original_png ?? ''}
							onDelete={handleOnDeleteImage(supplierData.logo.id)}
						/>
					)}
					<div className="admin-item-list__title">Úvodní fotografie</div>
					{!supplierData.baseImage.id ? (
						<p>{t({ id: 'admin.supplierDetail.noBaseImageUploaded' })}</p>
					) : (
						<Image
							imageUrl={supplierData.baseImage.domainUrls?.original_png ?? ''}
							onDelete={handleOnDeleteImage(supplierData.baseImage.id)}
						/>
					)}
					<div className="admin-item-list__title">
						{t({ id: 'admin.supplierDetail.couponPrefix.label' })}
					</div>
					<p>
						{supplierData?.couponPrefix ??
							t({ id: 'admin.supplierDetail.couponPrefix.noCoupon' })}
					</p>

					<div className="admin-page-list">
						<CertificatesList
							supplier={supplierData}
							refetch={refetch}
						/>
						<UserList
							supplier={supplierData}
							refetch={refetch}
						/>
						<TagList
							tags={supplierData?.supplierTags}
							supplierId={supplierId}
							refetch={refetch}
						/>
						<AttachTagModal
							supplier={supplierData}
							isOpen={isAttachTagModalOpen}
							setIsOpen={setIsAttachTagModalOpen}
							refetch={refetch}
						/>
					</div>
				</>
			)}
		/>
	);
};

export default SupplierDetailPage;
