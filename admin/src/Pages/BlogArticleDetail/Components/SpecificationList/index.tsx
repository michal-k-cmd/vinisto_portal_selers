import { FC, ReactNode, useCallback, useContext, useState } from 'react';
import { CButton } from '@coreui/react';
import { get } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import { useLoaderData } from 'react-router-dom';
import { BlogArticleDetailLoaderReturnValue } from 'Pages/BlogArticleDetail/interfaces';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import {
	ADD_SPECIFICATION_TO_BLOG_ARTICLE,
	EDIT_SPECIFICATION_IN_BLOG_ARTICLE,
} from 'Components/Modal/constants';
import { BlogArticleDetailAction } from 'Pages/BlogArticleDetail/constants';
import { SpecificationType } from 'Services/Specification/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import BlogService from 'Services/CmsService/Blog';
import { ModalContext } from 'Components/Modal/context';
import { BlogArticleDetailContext } from 'Pages/BlogArticleDetail/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import SpecificationList from 'Components/SpecificationList';
import { BiPlus } from 'react-icons/bi';

import { BlogArticleSpecificationListProps } from './interfaces';

import './styles.css';

const BlogArticleSpecificationList: FC<BlogArticleSpecificationListProps> = ({
	article,
}) => {
	const {
		vinistoUser: { loginHash: userLoginHash },
	} = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { specifications, dispatch } = useContext(BlogArticleDetailContext);

	const { bundlesCount } =
		useLoaderData() as BlogArticleDetailLoaderReturnValue;

	const [matchingBundleCount, setMatchingBundleCount] = useState(
		bundlesCount ?? 0
	);
	const [isUpdatingBundleCount, setIsUpdatingBundleCount] = useState(false);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const handleOnRecalculate = () => {
		if (!specifications) {
			handleShowErrorNotification(
				'admin.cms.articleDetail.specifications.recalculate.noSpeficiationsError'
			);

			return;
		}

		setIsUpdatingBundleCount(true);
		BlogService.getBundlesCount(specifications, userLoginHash)
			.then((result) => {
				setMatchingBundleCount(result);
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.cms.articleDetail.specifications.bundleCount.error'
				);
			})
			.finally(() => {
				setIsUpdatingBundleCount(false);
			});
	};

	const handleOnRemove = useCallback(
		(specificationId: string) => () => {
			confirmAlert({
				title: `${t({
					id: 'admin.cms.articleDetail.specifications.delete.title',
				})}`,
				message: `${t({
					id: 'admin.cms.articleDetail.specifications.delete.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							dispatch([
								BlogArticleDetailAction.removeSpecification,
								specificationId,
							]);
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
					},
				],
			});
		},
		[t, dispatch]
	);

	const handleOnAddSpecification = useCallback(
		(specification: SpecificationDetail) => {
			dispatch([BlogArticleDetailAction.addSpecification, specification]);
		},
		[dispatch]
	);

	const handleOnUpdateSpecification = useCallback(
		(specification: SpecificationDetail) => {
			dispatch([BlogArticleDetailAction.updateSpecification, specification]);
		},
		[dispatch]
	);

	const handleOnEdit = useCallback(
		(specification: SpecificationDetail) => () => {
			const { specificationType } = specification.definition;

			const specificationToEdit = {
				id: specification.definition.id,
				name: specification.definition.name,
				specificationType,
				allowedValues: specification.definition.allowedValues,
				availableValues: specification.definition.availableValues,
			};

			if (
				specificationType === SpecificationType.COMBO_BOX ||
				specificationType === SpecificationType.MULTI_COMBO_BOX ||
				specificationType === SpecificationType.DECIMAL_NUMBER ||
				specificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
				specificationType === SpecificationType.NUMBER ||
				specificationType === SpecificationType.NUMBER_IMPERIAL ||
				specificationType === SpecificationType.TEXT
			) {
				apiServiceInstance
					.get(
						`product-api/specifications/${specification.definition.id}/GetSpecification`,
						true
					)
					.then((payload) => {
						handleOpenModal(EDIT_SPECIFICATION_IN_BLOG_ARTICLE, {
							specification: {
								...specificationToEdit,
								allowedValues: get(payload, 'specification.allowedValues', []),
								availableValues: get(
									payload,
									'specification.availableValues',
									[]
								),
							},
							selectedValues: specification.value.allowedValues,
							onSubmit: handleOnUpdateSpecification,
						});
					})
					.catch(() =>
						handleShowErrorNotification(
							'admin.cms.articleDetail.specifications.edit.error'
						)
					);
			} else {
				handleOpenModal(EDIT_SPECIFICATION_IN_BLOG_ARTICLE, {
					specification: specificationToEdit,
					selectedValues: specification.value.allowedValues,
					onSubmit: handleOnUpdateSpecification,
				});
			}
		},
		[handleOnUpdateSpecification, handleOpenModal, handleShowErrorNotification]
	);

	const specificationValueMapper = (
		specification: SpecificationDetail,
		yesLabel: ReactNode,
		noLabel: ReactNode
	) => {
		const { specificationType } = specification.definition;
		if (
			specificationType === SpecificationType.MULTI_COMBO_BOX ||
			specificationType === SpecificationType.COMBO_BOX
		) {
			const specificationAllowedValue = specification.value
				.allowedValues as string[];

			const specificationAllowedValueFilter =
				specification.definition.allowedValues &&
				Object.fromEntries(
					Object.entries(specification.definition.allowedValues).filter(
						([key]) => specificationAllowedValue.includes(key)
					)
				);

			return Object.values(specificationAllowedValueFilter ?? {})
				.map((value) => {
					return getLocalizedValue(value.name);
				})
				.join(', ');
		}
		if (specificationType === SpecificationType.CHECK_BOX) {
			return specification.value.allowedValues
				?.map((value) => (value === true ? yesLabel : noLabel))
				.join(', ');
		}
		return specification.value.allowedValues?.join(', ');
	};
	return (
		<section className="blog-article-specifications mb-4">
			<header className="blog-article-specifications__header">
				<h2 className="blog-article-specifications__heading">
					{t({ id: 'admin.cms.articleDetail.specifications.title' })}
				</h2>
				<span>
					{t({
						id: 'admin.cms.articleDetail.specifications.matchingBundles.label',
					})}
					: {matchingBundleCount}
				</span>
				<CButton
					onClick={handleOnRecalculate}
					disabled={isUpdatingBundleCount}
					className="btn-sm"
				>
					{t({
						id: 'admin.cms.articleDetail.specifications.matchingBundles.recalculate',
					})}
				</CButton>
			</header>
			{specifications && specifications.length > 0 && (
				<SpecificationList
					// @ts-expect-error types updated for adapter, but this branch is not using it yet
					specifications={specifications}
					// @ts-expect-error types updated for adapter, but this branch is not using it yet
					handleOnEdit={handleOnEdit}
					handleOnRemove={handleOnRemove}
					specificationValueMapper={specificationValueMapper}
					showDetailInNewWindow
				/>
			)}
			<ActionButton
				onClick={() =>
					handleOpenModal(ADD_SPECIFICATION_TO_BLOG_ARTICLE, {
						alreadyAdded: article?.specificationDetails ?? [],
						onSubmit: handleOnAddSpecification,
					})
				}
				label="admin.cms.articleDetail.specifications.button.add"
				icon={BiPlus}
				className="btn-sm"
			/>
		</section>
	);
};

export default BlogArticleSpecificationList;
