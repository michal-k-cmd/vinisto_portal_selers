import { useContext, useState } from 'react';
import cx from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { BundleTagService } from 'Services/BundleTags';
import {
	MdKeyboardBackspace,
	MdLanguage,
	MdOutlineDelete,
} from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import VinistoSwitch from 'Components/Switch';
import ActionButtons from 'Components/AdminDetail/Components/ActionButtons';
import { Modal } from 'Components/Modal';
import CreateEditTagForm from 'Components/Modal/Components/Tag';
import { dayjsInstance as dayjs } from 'Services/Date';
import SpecificationList from 'Pages/TagDetail/Components/SpecificationList';
import { useQueryParam } from 'Helpers/query-params';
import adminDetailStyles from 'Components/AdminDetail/styles.module.css';
import getRootDomain from 'Helpers/getRootDomain';

import TagBundleList from './Components/TagBundleList';
import {
	TagModalMode,
	tagModalModes,
	tagTypeTranslationMap,
} from './constants';

import { VinistoHelperDllEnumsTagTagType } from '@/api-types/product-api';
import { CountryCode } from '@/shared';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const TagDetailPage = () => {
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { remove, update, getById, setEnable } = BundleTagService;
	const { id: tagId } = useParams();
	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const [countryOfSale] = useQueryParam('countryOfSale');

	const [openedModal, setOpenedModal] = useState<TagModalMode | null>(null);

	if (!tagId) {
		notificationsContext.handleShowErrorNotification('error.missingId');
		throw new Error('Missing tagId');
	}

	const typeSafeCountryOfSale =
		VinistoHelperDllEnumsCountryCode[
			String(countryOfSale) as keyof typeof VinistoHelperDllEnumsCountryCode
		];

	const queryClient = useQueryClient();
	const { data, isLoading, isError, refetch } = useQuery(
		['bundle-tag', { tagId, typeSafeCountryOfSale }],
		() => {
			return getById(tagId, {
				includeSpecifications: true,
				countryOfSale: typeSafeCountryOfSale,
			});
		}
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		notificationsContext.handleShowErrorNotification('error.general');
		throw new Error('Error while fetching tag');
	}

	const {
		id,
		name,
		description,
		metaDescription,
		metaTitle,
		slugs,
		color,
		isOnHomepage,
		isDisplayBundles,
		isEnabled,
		isVisibleInFilters,
		orderInFilters,
		type,
		validFrom,
		validTo,
	} = data ?? {};

	const toggleIsTagEnabled = () => {
		setEnable(tagId, {
			isEnabled: !isEnabled,
			userLoginHash,
			countryOfSale: typeSafeCountryOfSale,
		})
			.then(() => {
				queryClient.invalidateQueries(['bundle-tag', tagId]);
				notificationsContext.handleShowSuccessNotification(
					'admin.tagDetail.toggleTag.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.tagDetail.toggleTag.error'
				);
			})
			.finally(() => {
				refetch();
			});
	};

	const toggleIsTagShownInFilters = () => {
		update(tagId, {
			isVisibleInFilters: !isVisibleInFilters,
			userLoginHash,
		})
			.then(() => {
				queryClient.invalidateQueries(['bundle-tag', tagId]);
				notificationsContext.handleShowSuccessNotification(
					'admin.tagDetail.toggleTag.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.tagDetail.toggleTag.error'
				);
			})
			.finally(() => {
				refetch();
			});
	};

	const handleOnConfirmTagDeletion = () => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteTag.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteTag.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						handleOnDeleteTag();
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.no',
					})}`,
				},
			],
		});
	};

	const handleOnDeleteTag = () => {
		remove(tagId ?? '', { userLoginHash, countryOfSale: typeSafeCountryOfSale })
			.then(() => {
				navigate(`/tag-list`);
				notificationsContext.handleShowSuccessNotification(
					'admin.deleteTag.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.deleteTag.error'
				);
			});
	};

	const actionButtonsSchema = [
		{
			rowId: 'TAG_1',
			items: [
				{
					label: 'admin.btn.back',
					onClick: () => {
						navigate(-1);
					},
					icon: MdKeyboardBackspace,
				},
				{
					label: 'admin.modal.editTag',
					onClick: () => {
						setOpenedModal(tagModalModes.EDIT);
					},
					icon: BiEdit,
				},
				...(type !== VinistoHelperDllEnumsTagTagType.System
					? [
							{
								label: 'admin.modal.addCountryOfSale',
								onClick: () => {
									setOpenedModal(tagModalModes.ADD_COUNTRY_OF_SALE);
								},
								icon: MdLanguage,
							},
							{
								label: 'admin.btn.deleteTag',
								onClick: () => {
									handleOnConfirmTagDeletion();
								},
								icon: MdOutlineDelete,
							},
					  ]
					: []),
			],
		},
	];

	return (
		<>
			<Modal
				title={
					openedModal === tagModalModes.EDIT
						? `${t({ id: 'admin.modal.editTag' })}`
						: `${t({ id: 'admin.modal.addCountryOfSale' })}`
				}
				show={openedModal !== null}
				handleClose={() => setOpenedModal(null)}
			>
				<CreateEditTagForm
					id={id}
					name={name}
					slugs={slugs}
					description={description}
					metaDescription={metaDescription}
					metaTitle={metaTitle}
					color={{ hex: color ?? '' }}
					validFrom={validFrom ? dayjs.unix(validFrom).toDate() : undefined}
					validTo={validTo ? dayjs.unix(validTo).toDate() : undefined}
					countryOfSale={typeSafeCountryOfSale}
					isVisibleInFilters={isVisibleInFilters}
					orderInFilters={orderInFilters}
					handleClose={() => setOpenedModal(null)}
					resetTagList={() => null}
					mode={openedModal ?? tagModalModes.CREATE}
					type={type}
				/>
			</Modal>
			<CRow>
				<CCol xs={12}>
					<CCard className="mb-4">
						<CCardBody>
							<CButton
								type="button"
								className={cx('btn btn-primary', adminDetailStyles.backButton)}
								onClick={() => {
									navigate(-1);
								}}
							>
								{t({ id: 'admin.btn.back' })}
							</CButton>
							<dl className="category-detail-list ">
								<dt>{t({ id: 'admin.tagDetail.identifier.label' })}</dt>
								<dd>{id}</dd>

								<dt>{t({ id: 'type' })}</dt>
								<dd>{type ? t({ id: tagTypeTranslationMap[type] }) : '-'}</dd>

								<dt>{t({ id: 'admin.tagDetail.color.label' })}</dt>
								<dd className="d-flex align-items-center">
									<span
										className="d-inline-block me-2"
										style={{
											backgroundColor: color,
											height: '1rem',
											width: '1rem',
										}}
									></span>
									{color}
								</dd>

								<dt>{t({ id: 'admin.tagDetail.isInHomepage.label' })}</dt>
								<dd>
									{isOnHomepage ?? false
										? t({ id: 'admin.yes' })
										: t({ id: 'admin.no' })}
								</dd>

								<dt>{t({ id: 'admin.tagDetail.isEnabled.label' })}</dt>
								<dd>
									<div className="d-flex align-items-center">
										{!isEnabled
											? t({ id: 'admin.yes' })
											: t({ id: 'admin.no' })}
										{type !== VinistoHelperDllEnumsTagTagType.System && (
											<VinistoSwitch
												checked={!isEnabled}
												onChange={toggleIsTagEnabled}
												className={'ps-1'}
											/>
										)}
									</div>
								</dd>

								<dt>{t({ id: 'validity.from' })}</dt>
								<dd>
									{validFrom
										? dayjs
												.unix(validFrom)
												.format(`${t({ id: 'admin.dateFormat' })}`)
										: '-'}
								</dd>

								<dt>{t({ id: 'validity.to' })}</dt>
								<dd>
									{validTo
										? dayjs
												.unix(validTo)
												.format(`${t({ id: 'admin.dateFormat' })}`)
										: '-'}
								</dd>

								<dt>{t({ id: 'countryOfSale' })}</dt>
								<dd>
									{countryOfSale ? t({ id: `country.${countryOfSale}` }) : '-'}
								</dd>

								<dt>{t({ id: 'admin.tagDetail.isShowInFilters.label' })}</dt>
								<dd>
									<div className="d-flex align-items-center">
										{isVisibleInFilters
											? t({ id: 'admin.yes' })
											: t({ id: 'admin.no' })}
										{type !== VinistoHelperDllEnumsTagTagType.System && (
											<VinistoSwitch
												checked={Boolean(isVisibleInFilters)}
												onChange={toggleIsTagShownInFilters}
												className={'ps-1'}
											/>
										)}
									</div>
								</dd>

								<dt>{t({ id: 'admin.tagDetail.orderInFilters.label' })}</dt>
								<dd>{orderInFilters ?? '-'}</dd>

								<dt>{t({ id: 'admin.tagDetail.isDisplayProducts.label' })}</dt>
								<dd>
									{isDisplayBundles ?? false
										? t({ id: 'admin.yes' })
										: t({ id: 'admin.no' })}
								</dd>

								<dt>{t({ id: 'nameOf' })}</dt>
								<dd>{name}</dd>

								<dt>{t({ id: 'url' })}</dt>
								{slugs?.map((slug) => (
									// TODO Add isMain logic when ready
									<dd key={slug.value}>
										<a
											href={`https://${getRootDomain()}/stitek/${slug.value}`}
											target="_blank"
											rel="noreferrer"
										>
											{slug.value}
										</a>
									</dd>
								))}

								<dt>{t({ id: 'description' })}</dt>
								<dd>{description}</dd>

								<dt>{t({ id: 'admin.tagDetail.metaTitle.label' })}</dt>
								<dd>{metaTitle}</dd>

								<dt>{t({ id: 'admin.tagDetail.metaDescription.label' })}</dt>
								<dd>{metaDescription}</dd>
							</dl>

							<div className="mt-5">
								<ActionButtons actionButtonsSchema={actionButtonsSchema} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			{type !== VinistoHelperDllEnumsTagTagType.System && (
				<SpecificationList
					specificationDetails={data?.specificationDetails ?? []}
					tagId={tagId}
					tagCountryCode={typeSafeCountryOfSale as CountryCode}
					refetchTagsFn={refetch}
				/>
			)}
			<TagBundleList
				tagId={tagId}
				tagType={type}
				countryOfSale={typeSafeCountryOfSale as CountryCode}
			/>
		</>
	);
};

export default TagDetailPage;
