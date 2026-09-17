import { Fragment, useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import {
	CButton,
	CCard,
	CCardBody,
	CCol,
	CFormSelect,
	CRow,
} from '@coreui/react';
import { map, size } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import {
	Navigate,
	useLoaderData,
	useNavigate,
	useParams,
	useRevalidator,
} from 'react-router-dom';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/product-api';
import { Modal } from 'Components/Modal';
import { CATEGORY_ADD_TRANSLATION } from 'Components/Modal/constants';
import { LANGUAGE_CODE_MAP } from 'Services/ApiService/constants';
import { ProductSelectionType } from 'Services/Category/constants';
import OldCategoryService from 'Services/Category';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { IntegrationContext } from 'Services/IntergationService';
import { CategoryBundleDiscountFilter } from 'Services/Category/interfaces';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import ActionButtons from 'Components/AdminDetail/Components/ActionButtons';
import { BiPlus } from 'react-icons/bi';
import { MdKeyboardBackspace, MdOutlineDelete } from 'react-icons/md';
import { useLocalizedValues } from 'Hooks/useLocalizedValue';
import VinistoSwitch from 'Components/Switch';
import DeleteIcon from 'Components/Icons/Delete';
import adminDetailStyles from 'Components/AdminDetail/styles.module.css';
import { CategoryService } from 'vinisto_api_client';
import AddSearchCountryForm from 'Components/Forms/add-search-country';
import Config from 'Config';

import CategoryBundleList from './Components/CategoryBundleList';
import CategoryImageList from './Components/CategoryImageList';
import CategorySpecificationList from './Components/CategorySpecificationList';
import { CategoryDetailLoader } from './interfaces';
import CategoryTranslation from './Components/CategoryTranslation';
import './styles.css';
import LinkWidgetList from './Components/LinkWidgetList';
import { PRODUCT_SELECTION_TYPE_MAP } from './constants';
import CategoryParentCategory from './Components/CategoryParentCategory';
import CategoryTagList from './Components/CategoryTagList';
import CategorySellerList from './Components/CategorySellerList';

import { VinistoServicesApiServicesIntegrationListItemDto } from '@/api-types/services-api';

const CategoryDetailPage = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const userLoginHash = vinistoUser?.loginHash;
	const { integrations } = useContext(IntegrationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage, activeLanguageKey } =
		useContext(LocalizationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const localizeArray = useLocalizedValues();

	const t = useFormatMessage();
	const history = useNavigate();
	const revalidator = useRevalidator();
	const { id: categoryId } = useParams();

	const defaultCategory = useLoaderData() as CategoryDetailLoader;

	const [data, setData] = useState<CategoryDetailLoader>(defaultCategory);

	const [
		isAutocompleteModalCountryModalOpen,
		setIsAutocompleteModalCountryModalOpen,
	] = useState(false);

	useEffect(() => {
		setData(defaultCategory);
	}, [categoryId, defaultCategory]);

	if (categoryId === undefined || data.category === undefined) {
		handleShowErrorNotification('admin.categoryDetail.loadingError');
		return <Navigate to="/category-list" />;
	}

	const actionButtonsSchema = [
		{
			rowId: 'CATEGORY_ACTIONS',
			items: [
				{
					label: 'admin.btn.back',
					onClick: () => history(-1),
					icon: MdKeyboardBackspace,
				},
				{
					label: 'admin.category.delete.btn',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.category.delete.title',
							})}`,
							message: `${t({
								id: 'admin.category.delete.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.yes',
									})}`,
									onClick: () => {
										OldCategoryService.deleteCategory(
											categoryId,
											vinistoUser.loginHash
										)
											.then(() => {
												handleShowSuccessNotification(
													'admin.category.delete.success'
												);
												history(-1);
											})
											.catch(() => {
												handleShowErrorNotification(
													'admin.category.delete.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.no',
									})}`,
									onClick: () => null,
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
			],
		},
	];

	const translations = data.category.translations;
	const isOnlyTranslation = Object.keys(translations ?? {}).length === 1;
	const keywords = localizeArray(data.category.keywords);
	const url =
		data.category.translations[activeLanguageKey]?.url ??
		Object.values(data.category.translations)[0]?.url;
	const categoryEshopUrl = url
		? `${Config.eshopUrl}${t({
				id: 'eshop.routes.category.route',
		  })}/${url}/page/1`
		: null;

	const togglePlatform = (
		platform: VinistoServicesApiServicesIntegrationListItemDto
	) => {
		const platformCount = data.category?.availableOnPlatforms?.length ?? 0;
		const currentPlatformSetting =
			data.category?.availableOnPlatforms?.includes(platform.integrationId);
		const deletingLastPlatform = currentPlatformSetting && platformCount === 1;

		if (deletingLastPlatform) {
			handleShowErrorNotification(
				'admin.categoryDetail.platform.deleteLastPlatform'
			);
			return;
		}

		if (currentPlatformSetting) {
			CategoryService.removePlatform({
				categoryId,
				UserLoginHash: userLoginHash,
				Platform: platform.integrationId,
			})
				.then(() => {
					handleShowSuccessNotification(
						`${t(
							{
								id: 'admin.removePlatform.success',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
					setData((prev) => {
						if (prev.category) {
							return {
								...prev,
								category: {
									...prev.category,
									availableOnPlatforms:
										prev.category.availableOnPlatforms.filter(
											(p) => p !== platform.integrationId
										),
								},
							};
						}
						return prev;
					});
				})
				.catch(() => {
					handleShowErrorNotification(
						`${t(
							{
								id: 'admin.removePlatform.error',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
				});
		} else {
			CategoryService.addPlatform({
				categoryId,
				UserLoginHash: userLoginHash,
				Platform: platform.integrationId,
			})
				.then(() => {
					handleShowSuccessNotification(
						`${t(
							{
								id: 'admin.setPlatform.success',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
					setData((prev) => {
						if (prev.category) {
							return {
								...prev,
								category: {
									...prev.category,
									availableOnPlatforms: [
										...(prev.category.availableOnPlatforms ?? []),
										platform.integrationId,
									],
								},
							};
						}
						return prev;
					});
				})
				.catch(() => {
					handleShowErrorNotification(
						`${t(
							{
								id: 'admin.setPlatform.error',
							},
							{ platform: platform.integrationName }
						)}`
					);
				});
		}
	};

	const handleClickDeleteSearchCountry = (
		country: VinistoHelperDllEnumsCountryCode
	) => {
		confirmAlert({
			title: `${t({
				id: 'admin.category.deleteCountry.title',
			})}`,
			message: `${t({
				id: 'admin.category.deleteCountry.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						CategoryService.removeSearchCountry({
							categoryId,
							UserLoginHash: userLoginHash,
							AllowedSearchCountries: [country],
						})
							.then(() => {
								handleShowSuccessNotification(
									'admin.category.deleteCountry.success'
								);
								setData((prev) => {
									if (prev.category) {
										return {
											...prev,
											category: {
												...prev.category,
												allowedSearchCountries:
													prev.category.allowedSearchCountries.filter(
														(c) => c !== country
													),
											},
										};
									}
									return prev;
								});
							})
							.catch(() => {
								handleShowErrorNotification(
									'admin.category.deleteCountry.error'
								);
							});
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.no',
					})}`,
					onClick: () => null,
				},
			],
		});
	};

	const handleClickAddSearchCountry = () => {
		setIsAutocompleteModalCountryModalOpen(true);
	};

	const handleSubmitAddSearchCountry = (
		countries: VinistoHelperDllEnumsCountryCode[]
	) => {
		CategoryService.addSearchCountry({
			categoryId,
			UserLoginHash: userLoginHash,
			AllowedSearchCountries: countries,
		})
			.then(() => {
				handleShowSuccessNotification(
					'admin.category.addSearchCountry.success'
				);
				setData((prev) => {
					if (prev.category) {
						return {
							...prev,
							category: {
								...prev.category,
								allowedSearchCountries: Array.from(
									new Set([
										...(prev.category.allowedSearchCountries ?? []),
										...countries,
									])
								),
							},
						};
					}
					return prev;
				});
			})
			.catch(() => {
				handleShowErrorNotification('admin.category.addSearchCountry.error');
			});
		setIsAutocompleteModalCountryModalOpen(false);
	};

	const setBundleDiscountFilter = (
		nextBundleDiscountFilter: (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter]
	) => {
		if (!userLoginHash) {
			handleShowErrorNotification('admin.category.bundleDiscountFilter.error');
			return;
		}

		const previousBundleDiscountFilter =
			data.category?.bundleDiscountFilter ?? CategoryBundleDiscountFilter.ALL;

		setData((prev) => {
			if (!prev.category) return prev;

			return {
				...prev,
				category: {
					...prev.category,
					bundleDiscountFilter: nextBundleDiscountFilter,
				},
			};
		});

		OldCategoryService.setBundleDiscountFilter(
			categoryId,
			nextBundleDiscountFilter,
			userLoginHash
		)
			.then(() => {
				handleShowSuccessNotification(
					'admin.category.bundleDiscountFilter.success'
				);
				revalidator.revalidate();
			})
			.catch(() => {
				setData((prev) => {
					if (!prev.category) return prev;

					return {
						...prev,
						category: {
							...prev.category,
							bundleDiscountFilter: previousBundleDiscountFilter,
						},
					};
				});
				handleShowErrorNotification(
					'admin.category.bundleDiscountFilter.error'
				);
			});
	};

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<CButton
							type="button"
							className={cx('btn btn-primary', adminDetailStyles.backButton)}
							onClick={() => {
								history(-1);
							}}
						>
							{t({ id: 'admin.btn.back' })}
						</CButton>
						<dl className="category-detail-list ">
							<dt>{t({ id: 'admin.categoryDetail.identifier.label' })}</dt>
							<dd>{categoryId}</dd>
							<dt>
								{t({ id: 'admin.categoryDetail.productSelectionType.label' })}
							</dt>
							<dd>
								{t({
									id: PRODUCT_SELECTION_TYPE_MAP[
										data.category.productSelectionType
									],
								})}
							</dd>
							{categoryEshopUrl && (
								<>
									<dt>{t({ id: 'admin.categoryDetail.url.label' })}</dt>
									<dd>
										<a href={categoryEshopUrl}>{url}</a>
									</dd>
								</>
							)}
							<dt>
								{t({ id: 'admin.categoryDetail.allowedSearchCountries.label' })}
							</dt>
							<dd>
								{map(data.category.allowedSearchCountries, (country) => (
									<div key={country}>
										{`${country} `}
										<DeleteIcon
											className="pointer"
											onClick={() => handleClickDeleteSearchCountry(country)}
										/>
									</div>
								))}
							</dd>
							<dt>
								{t({
									id: 'admin.category.bundleDiscountFilter.label',
								})}
							</dt>
							<dd>
								<CFormSelect
									value={
										data.category.bundleDiscountFilter ??
										CategoryBundleDiscountFilter.ALL
									}
									onChange={(event) =>
										setBundleDiscountFilter(
											event.target
												.value as (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter]
										)
									}
									options={[
										{
											value: String(CategoryBundleDiscountFilter.ALL),
											label: `${t({
												id: 'admin.category.bundleDiscountFilter.all',
											})}`,
										},
										{
											value: String(
												CategoryBundleDiscountFilter.DISCOUNTED_ONLY
											),
											label: `${t({
												id: 'admin.category.bundleDiscountFilter.discountedOnly',
											})}`,
										},
										{
											value: String(
												CategoryBundleDiscountFilter.NON_DISCOUNTED_ONLY
											),
											label: `${t({
												id: 'admin.category.bundleDiscountFilter.nonDiscountedOnly',
											})}`,
										},
									]}
								/>
							</dd>
						</dl>
						<section>
							<h2 className="category-detail__heading">
								{t({ id: 'admin.categoryDetail.translations.label' })}
							</h2>
							{map(translations, (translation, language) => (
								<CategoryTranslation
									language={language as VinistoHelperDllEnumsLanguage}
									translation={translation}
									categoryId={categoryId}
									key={language}
									isOnlyTranslation={isOnlyTranslation}
									keywords={keywords}
								/>
							))}
							<ActionButton
								onClick={() =>
									handleOpenModal(CATEGORY_ADD_TRANSLATION, {
										submitButtonLabel:
											'admin.modal.category.translation.add.submit',
										categoryId,
										existingTranslations: Object.keys(translations ?? {}),
										keywords,
									})
								}
								label="admin.category.translation.button.add"
								icon={BiPlus}
								disabled={size(translations) === size(LANGUAGE_CODE_MAP)}
							/>
						</section>
						<CategoryImageList category={data.category} />
						<CategoryParentCategory categoryId={categoryId} />
						{data.category.productSelectionType ===
							ProductSelectionType.STATIC && (
							<CategoryBundleList categoryId={categoryId} />
						)}
						{data.category.productSelectionType ===
							ProductSelectionType.DYNAMIC && (
							<CategorySpecificationList category={data.category} />
						)}
						<CategoryTagList category={data.category} />
						<CategorySellerList category={data.category} />
						{url && <LinkWidgetList categoryUrl={url} />}
						<ActionButton
							onClick={() => handleClickAddSearchCountry()}
							label="admin.category.addSearchCountry.button"
							icon={BiPlus}
						/>
						<div className="py-3">
							<h2 className="category-detail__heading">
								{t({ id: 'platform' })}:
							</h2>

							<dl className="category-detail-list">
								{integrations?.map((platform) => (
									<Fragment key={platform.integrationName}>
										<dt key={platform.integrationName}>
											{platform.integrationName}
										</dt>
										<dd>
											<VinistoSwitch
												onChange={() => togglePlatform(platform)}
												checked={Boolean(
													data?.category?.availableOnPlatforms?.includes(
														platform.integrationId
													)
												)}
												id={`${platform.integrationName}`}
											/>
										</dd>
									</Fragment>
								))}
							</dl>
						</div>
						<div className="mt-5">
							<ActionButtons actionButtonsSchema={actionButtonsSchema} />
						</div>
					</CCardBody>
				</CCard>
			</CCol>
			<Modal
				show={isAutocompleteModalCountryModalOpen}
				handleClose={() => setIsAutocompleteModalCountryModalOpen(false)}
				title={t({
					id: 'admin.category.addSearchCountry.title',
				})?.toString()}
			>
				<AddSearchCountryForm
					onSubmit={handleSubmitAddSearchCountry}
					initialSelectedValues={data.category.allowedSearchCountries.map(
						(country) => ({
							label: country,
							value: country,
						})
					)}
				/>
			</Modal>
		</CRow>
	);
};

export default CategoryDetailPage;
