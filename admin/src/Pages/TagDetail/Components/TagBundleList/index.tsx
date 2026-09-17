import { CForm } from '@coreui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { BundleItemList } from 'Components/BundleItem';
import { Validators } from 'Components/Form';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import useWarehouseCount from 'Hooks/Queries/useWarehouseCount';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import BundleService from 'Services/Bundle';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { addTagToBundle, removeTagFromBundle } from 'Services/TagService';
import { useCallback, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { BiPlus } from 'react-icons/bi';
import { VinistoProductDllModelsApiBundleBundle as BundleApiModel } from 'vinisto_api_client/src/api-types/product-api/';
import { Modal } from 'Components/Modal';
import { confirmAlert } from 'react-confirm-alert';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';

import { TagBundleListProps } from './interfaces';
import styles from './styles.module.css';

import { VinistoHelperDllEnumsTagTagType } from '@/api-types/cms-api';

const TagBundleList = ({
	tagId,
	tagType,
	countryOfSale,
}: TagBundleListProps) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const { data } = useQuery(['getBundlesWithTag', tagId, countryOfSale], () => {
		return BundleService.getBundlesWithTag(tagId, countryOfSale);
	});

	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({
		alreadyUsedBundleIds: data
			? data.bundles?.map((bundle: BundleApiModel) => String(bundle?.id))
			: [],
	});

	const bundleCountQuery = useWarehouseCount(
		(data?.bundles ?? []).map((bundle) => bundle.id ?? '')
	);

	const { mutateAsync: attachBundleToTag } = useMutation({
		mutationFn: addTagToBundle,
	});

	const { mutateAsync: detachBundleFromTag } = useMutation({
		mutationFn: removeTagFromBundle,
	});

	interface FormValues {
		bundleName: { bundle: BundleApiModel }[];
	}

	const handleOnDetach = (bundleId: string) => {
		detachBundleFromTag({
			bundleId,
			countryOfSale,
			userLoginHash: vinistoUser?.loginHash ?? '',
			tagId,
		})
			.then(() => {
				handleShowSuccessNotification('admin.modal.tag.bundle.remove.success');
				queryClient.invalidateQueries(['getBundlesWithTag', tagId]);
			})
			.catch(() => {
				handleShowErrorNotification('admin.modal.tag.bundle.remove.error');
			});
	};

	const handleRemoveBtnClick = (bundleId: string) => {
		confirmAlert({
			title: `${t({
				id: 'admin.modal.tag.bundles.remove.title',
			})}`,
			message: `${t({
				id: 'admin.modal.tag.bundles.remove.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.form.yes',
					})}`,
					onClick: () => {
						handleOnDetach(bundleId);
					},
				},
				{
					label: `${t({
						id: 'admin.form.no',
					})}`,
				},
			],
		});
	};

	const handleOnSubmit = (formValues: FormValues) => {
		const [item] = formValues.bundleName;

		attachBundleToTag({
			bundleId: String(item.bundle.id),
			userLoginHash: vinistoUser?.loginHash ?? '',
			countryOfSale,
			itemId: tagId,
		})
			.then(() => {
				handleShowSuccessNotification('admin.modal.tag.bundle.add.success');
				queryClient.invalidateQueries(['getBundlesWithTag', tagId]);
			})
			.catch(() => {
				handleShowErrorNotification('admin.modal.tag.bundle.add.error');
			})
			.finally(() => {
				setIsModalOpen(false);
			});
	};

	const renderOption = useCallback((option: AutocompleteBundleOption) => {
		return (
			<BundleOption
				bundle={option?.bundle}
				label={option?.label}
			/>
		);
	}, []);

	return (
		<>
			<section className={styles.container}>
				<h2 className="category-detail__heading">
					{t({ id: 'admin.tag.bundles.label' })}
				</h2>
				<BundleItemList
					bundles={data?.bundles ?? []}
					onRemove={handleRemoveBtnClick}
					idAvailableCountMaps={bundleCountQuery.data?.map((item) => ({
						itemId: item.id,
						quantity: item.quantity,
					}))}
				/>
				{tagType !== VinistoHelperDllEnumsTagTagType.System && (
					<ActionButton
						onClick={() => {
							setIsModalOpen(true);
						}}
						label="admin.btn.addBundle"
						icon={BiPlus}
					/>
				)}
			</section>
			<Modal
				show={isModalOpen}
				title={String(t({ id: 'admin.modal.tag.bundles.add.title' }))}
				handleClose={() => setIsModalOpen(false)}
			>
				<Form<FormValues>
					onSubmit={handleOnSubmit}
					render={({ handleSubmit, submitting }) => (
						<CForm onSubmit={handleSubmit}>
							<AutocompleteBundle
								label="admin.modal.tag.bundle.autocomplete.label"
								placeholder="admin.modal.tag.bundle.autocomplete.placeholder"
								labelKey="label"
								name="bundleName"
								identifier="bundleName"
								onSearchCallback={handleOnSearch}
								options={autocompleteOptions}
								validate={Validators.required}
								renderOption={renderOption}
							/>
							<Button
								type="submit"
								disabled={submitting}
							>
								{t({ id: 'admin.btn.addBundle' })}
							</Button>
						</CForm>
					)}
				/>
			</Modal>
		</>
	);
};

export default TagBundleList;
