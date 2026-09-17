import { CButton, CCard, CCardBody, CForm } from '@coreui/react';
import cx from 'classnames';
import { FormApi, MutableState, SubmissionErrors, Tools } from 'final-form';
import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { Form } from 'react-final-form';
import { BiPlus } from 'react-icons/bi';
import { Option } from 'Components/Multiselect/interfaces';
import {
	ADD_BUNDLE_TO_BLOG_ARTICLE,
	CMS_IMAGE_LIST,
} from 'Components/Modal/constants';
import { PAGE_URL as BLOG_ARTICLE_LIST_PAGE_URL } from 'Pages/BlogArticleList/constants';
import { OBJECT_ALREADY_EXISTS_ERROR } from 'Services/ApiService/constants';
import {
	ARTICLE_PRODUCT_TYPE,
	ARTICLE_PRODUCT_TYPE_LOCALIZATION_MAP,
	ARTICLE_STATE,
} from 'Services/CmsService/Blog/constants';
import BlogService from 'Services/CmsService/Blog';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { Author } from 'Services/CmsService/interfaces';
import { BundleItemList } from 'Components/BundleItem';
import { required } from 'Components/Form/validators';
import getUrlString from 'Helpers/getUrlString';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	Condition,
	Input,
	InputDatePicker,
	InputMultiselect,
	InputSelect,
	InputTextArea,
	InputTinyMCE,
	Label,
	LanguageSelect,
} from 'Components/Form';
import useWarehouseCount from 'Hooks/Queries/useWarehouseCount';
import adminDetailStyles from 'Components/AdminDetail/styles.module.css';

import {
	BlogArticleDetailAction,
	META_MAX_LENGTH,
	SANITIZE_HTML_OPTIONS,
} from './constants';
import { BlogArticleDetailContext } from './context';
import BlogArticleButtons from './Components/Buttons';
import BlogArticleSpecificationList from './Components/SpecificationList';
import { useAuthorsQuery, useCreateAuthorMutation } from './loader';
import './styles.css';
import { BlogArticleFormValues } from './interfaces';

const BlogArticleDetailPage: FC = () => {
	const {
		article,
		specifications,
		bundles,
		bundleDetails,
		dispatch,
		cmsImageTags,
		postTags,
		selectedImageId,
		selectedImageUrl,
	} = useContext(BlogArticleDetailContext);

	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const { data: authors } = useAuthorsQuery(loginHash);
	const createAuthorMutation = useCreateAuthorMutation(loginHash);

	const {
		vinistoUser: { loginHash: userLoginHash },
	} = useContext(AuthenticationContext);
	const { activeLanguageKey, useFormatMessage } =
		useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const getLocalizedValue = useLocalizedValue();
	const t = useFormatMessage();

	const navigate = useNavigate();

	const isCreate = article === null;

	const handleOnTitleChange =
		(form: FormApi<BlogArticleFormValues>) => (value: string) => {
			form.mutators.updateUrl(value);
		};
	const handleOnLeadParagraphChange =
		(form: FormApi<BlogArticleFormValues>) => (value: string) => {
			form.mutators.updateMeta(value);
		};

	const handleOnTinyMceChange =
		(form: FormApi<BlogArticleFormValues>) => (value: string) => {
			form.mutators.updateContent(value);
		};

	const handleOnLoadImage = () => {
		handleOpenModal(CMS_IMAGE_LIST, {
			cmsImageTags,
			selectedImageId,
			onSelect: (
				imageUrl: string,
				imageDescription: string,
				imageAltText: string,
				imageId: string
			) => {
				dispatch([
					BlogArticleDetailAction.setImage,
					{
						id: imageId,
						url: imageUrl,
						description: imageDescription,
						altText: imageAltText,
					},
				]);
			},
		});
	};

	const {
		create: createArticle,
		update: updateArticle,
		publishArticle,
		draftArticle,
	} = BlogService;

	const [newAuthor, setNewAuthor] = useState<Author>();

	const handleCreateAuthor = (item: Option) => {
		const req = {
			name: item.label,
			userLoginHash,
		};

		createAuthorMutation.mutate(req, {
			onSuccess: (data) => {
				data.author && setNewAuthor(data.author);
				notificationsContext.handleShowSuccessNotification(
					'author.create.success'
				);
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification('author.create.error');
			},
		});
	};

	const handleOnSubmit = useCallback(
		(
			formValues: BlogArticleFormValues,
			form: FormApi<BlogArticleFormValues>,
			_callback?: (errors?: SubmissionErrors) => void,
			redirectToList = true
		) => {
			const authors = formValues.authors?.map(
				(author) => (author as unknown as Option).value ?? author
			);

			const postTags = formValues.tags?.map(
				(tag) => (tag as unknown as Option).value ?? tag
			);

			const tinyMceContent = formValues?.content ?? '';
			const tableRegex =
				/<table\b(?:(?!\s*style\b)[^>])*?\sstyle\s*=\s*["']?([^"'>]+)["']?(?:(?!\s*style\b)[^>])*?>[\s\S]*?<\/table>/g;
			const tableWrapperRegex =
				/<div\s+class\s*=\s*['"]table-wrapper['"][^>]*>([\s\S]*?)<\/div>/g;

			const modifiedHtml = tinyMceContent.replace(
				tableWrapperRegex,
				(match, content) => content
			);

			const tinyMceContentString = modifiedHtml.replace(
				tableRegex,
				(match, styleAttributeValue) => {
					const existingWrapperRegex = /<div class="table-wrapper"([^>]*)>/g;
					const existingWrapperMatch = existingWrapperRegex.exec(match);
					const heightValue = styleAttributeValue.match(
						/height\s*:\s*(\d+(?:\.\d+)?(?:%|px))\s*;/i
					);
					const heightAttribute = heightValue
						? `height:${heightValue[1]};`
						: '';
					const widthAttribute = 'max-width: 945px; display: grid;';
					const cleanedStyleAttributeValue = styleAttributeValue.replace(
						/width\s*:\s*(\d+(?:\.\d+)?(?:%|px))\s*;/i,
						''
					);
					const overflow = 'overflow: auto;';

					if (existingWrapperMatch) {
						const existingWrapperAttributes = existingWrapperMatch[1];
						return `<div class="table-wrapper"${existingWrapperAttributes} style="${heightAttribute} ${widthAttribute} ${overflow}">${match
							.replace(existingWrapperRegex, '')
							.replace(styleAttributeValue, cleanedStyleAttributeValue)}</div>`;
					} else {
						return `<div class="table-wrapper" style="${heightAttribute} ${widthAttribute} ${overflow}">${match}</div>`;
					}
				}
			);

			if (isCreate) {
				createArticle(
					{
						...formValues,
						content: tinyMceContentString,
						authors,
						tags: postTags,
						image: selectedImageId,
						specificationDetails: specifications ?? [],
						// @ts-expect-error: TODO: there are too many interfaces atm, refactor
						bundles,
						meta: formValues.meta
							? sanitizeHtml(formValues.meta, SANITIZE_HTML_OPTIONS)
							: undefined,
					},
					userLoginHash
				)
					.then(() => {
						notificationsContext.handleShowSuccessNotification(
							'admin.cms.articleDetail.create.success'
						);
						if (redirectToList) {
							navigate(BLOG_ARTICLE_LIST_PAGE_URL);
						} else {
							dispatch([BlogArticleDetailAction.reload]);
						}
					})
					.catch((specificError: Error) => {
						if (specificError.message === OBJECT_ALREADY_EXISTS_ERROR) {
							form.mutators.updateFormWithApiError(
								'admin.cms.articleDetail.error.alreadyExists'
							);
							return;
						}
						notificationsContext.handleShowErrorNotification(
							'admin.cms.articleDetail.create.error'
						);
					});
				return;
			}

			updateArticle(
				article,
				{
					...formValues,
					content: tinyMceContentString,
					authors,
					tags: postTags,
					image:
						selectedImageId.length > 0 ? selectedImageId : article?.imageId,
					specificationDetails: specifications ?? [],
					// @ts-expect-error: TODO: there are too many interfaces atm, refactor
					bundles,
					meta: formValues.meta
						? sanitizeHtml(formValues.meta, SANITIZE_HTML_OPTIONS)
						: undefined,
					state: article.state,
				},
				userLoginHash
			)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.cms.articleDetail.edit.success'
					);
					if (redirectToList) {
						navigate(BLOG_ARTICLE_LIST_PAGE_URL);
					} else {
						dispatch([BlogArticleDetailAction.reload]);
					}
				})
				.catch((specificError: Error) => {
					if (specificError.message === OBJECT_ALREADY_EXISTS_ERROR) {
						form.mutators.updateFormWithApiError(
							'admin.cms.articleDetail.error.alreadyExists'
						);
						return;
					}
					notificationsContext.handleShowErrorNotification(
						'admin.cms.articleDetail.edit.error'
					);
				});
		},
		[
			bundles,
			specifications,
			isCreate,
			updateArticle,
			article,
			selectedImageId,
			userLoginHash,
			createArticle,
			notificationsContext,
			navigate,
			dispatch,
		]
	);

	const handleOnToggleState = () => {
		let promise;

		article?.state === ARTICLE_STATE.CONCEPT
			? (promise = publishArticle(article.id, { userLoginHash }))
			: (promise = draftArticle(article?.id ?? '', { userLoginHash }));

		promise.then(() => {
			dispatch([BlogArticleDetailAction.reload]);
		});
	};

	const handleOnDiscard = () => navigate(BLOG_ARTICLE_LIST_PAGE_URL);

	const handleOnClickAddProduct = () => {
		handleOpenModal(ADD_BUNDLE_TO_BLOG_ARTICLE, {
			dispatch,
			bundles,
		});
	};

	const categoryMutators = {
		updateUrl: (
			[name]: [name: string],
			state: MutableState<BlogArticleFormValues>,
			tools: Tools<BlogArticleFormValues>
		) => {
			if (state.fields['url'].modified) return;
			tools.changeValue(state, 'url', () => {
				if (!name) return; // need to update value when name is empty
				return getUrlString(name);
			});
		},
		updateMeta: (
			[leadParagraph]: [string],
			state: MutableState<BlogArticleFormValues>,
			tools: Tools<BlogArticleFormValues>
		) => {
			if (state.fields['meta'].modified) return;
			tools.changeValue(state, 'meta', () => {
				if (!leadParagraph) return; // need to update value when description is empty
				return sanitizeHtml(leadParagraph, SANITIZE_HTML_OPTIONS).substring(
					0,
					META_MAX_LENGTH
				);
			});
		},
		updateContent: (
			[content]: [string],
			state: MutableState<BlogArticleFormValues>,
			tools: Tools<BlogArticleFormValues>
		) => {
			if (state.fields['content'].modified) return;
			tools.changeValue(state, 'content', () => {
				if (!content) return;
				return content;
			});
		},
		updateFormWithApiError: (
			[apiError]: [apiError: string],
			state: MutableState<BlogArticleFormValues>
		) => {
			state.formState.submitErrors = {
				...state.formState.submitErrors,
				url: apiError,
			};
			state.fields.url.blur();
		},
	};

	const productTypeSelectOptions = useMemo(
		() =>
			Object.entries(ARTICLE_PRODUCT_TYPE_LOCALIZATION_MAP).map(
				([value, label]) => ({
					value,
					label: `${t({ id: label })}`,
				})
			),
		[t]
	);

	const bundleCountQuery = useWarehouseCount(
		bundles?.map((bundle) => bundle.bundleId ?? '') ?? []
	);

	return (
		<Form<BlogArticleFormValues>
			onSubmit={handleOnSubmit}
			initialValuesEqual={() => true}
			initialValues={{
				// @ts-expect-error Don't have morals to deep dive into this abstraction to enforce the correct type
				language: activeLanguageKey,
				publishDate: new Date(),
				productType: ARTICLE_PRODUCT_TYPE.NONE,
				...article,
				bundles: [],
			}}
			mutators={categoryMutators}
			render={({ handleSubmit, form, values }) => {
				return (
					<CForm
						onSubmit={handleSubmit}
						className="w-100"
					>
						<BlogArticleButtons
							article={article}
							onDiscard={handleOnDiscard}
							onToggleState={handleOnToggleState}
							className="mb-3 justify-content-end"
						/>
						<CCard>
							<CCardBody>
								<CButton
									type="button"
									className={cx(
										'btn btn-primary',
										adminDetailStyles.backButton
									)}
									onClick={() => {
										navigate(-1);
									}}
								>
									{t({ id: 'admin.btn.back' })}
								</CButton>
								<LanguageSelect
									name="language"
									identifier="language"
									label="admin.cms.articleDetail.language.label"
									disabled={article !== undefined}
									validate={required}
									className="form-control--blog"
								/>

								<Input
									name="title"
									identifier="title"
									label="admin.cms.articleDetail.title.label"
									validate={required}
									onChange={isCreate ? handleOnTitleChange(form) : undefined}
									className="form-control--blog"
								/>

								<InputDatePicker
									name="publishDate"
									identifier="publishDate"
									label="admin.cms.articleDetail.publishDate.label"
									className="form-control--datepicker"
								/>

								<InputTextArea
									name="leadParagraph"
									identifier="leadParagraph"
									label="admin.cms.articleDetail.leadParagraph.label"
									onChange={
										isCreate ? handleOnLeadParagraphChange(form) : undefined
									}
									className="form-control--blog"
								/>

								<Input
									name="metaTitle"
									identifier="metaTitle"
									label="admin.cms.articleDetail.metaTitle.label"
									className="form-control--blog"
								/>

								<InputTextArea
									name="meta"
									identifier="meta"
									label="admin.modal.category.meta"
									maxLength={META_MAX_LENGTH}
									className="form-control--blog"
								/>

								<InputMultiselect
									options={
										authors?.map((author) => ({
											value: author.id,
											label: author.name,
										})) ?? []
									}
									initialSelected={article?.authorDetails.map((author) => {
										return {
											value: author.id || '',
											label: author.name || '',
										};
									})}
									name="authors"
									identifier="authors"
									label="admin.cms.articleDetail.author.label"
									className="form-control--blog"
									onAddNewItem={(item) => handleCreateAuthor(item)}
									newItem={{
										label: newAuthor?.name ?? '',
										value: newAuthor?.id ?? '',
									}}
								/>

								<Input
									name="readingTime"
									type="number"
									identifier="readingTime"
									label="admin.cms.articleDetail.readingTime.label"
									className="form-control--blog"
								/>

								<InputMultiselect
									options={
										postTags?.map((tag) => ({
											value: tag.id,
											label: getLocalizedValue(tag.name ?? []),
										})) ?? []
									}
									initialSelected={article?.tags.map((tagId) => {
										const tag = postTags?.find((tag) => tag.id === tagId);
										return {
											value: tag?.id || '',
											label: getLocalizedValue(tag?.name ?? []),
										};
									})}
									name="tags"
									identifier="tags"
									label="admin.cms.articleDetail.tags.label"
									className="form-control--blog"
								/>

								<Input
									name="url"
									identifier="url"
									label="admin.cms.articleDetail.url.label"
									validate={required}
									className="form-control--blog"
								/>

								<div className="d-flex flex-column align-items-start mb-4">
									<Label>
										{t(
											{ id: 'admin.cms.articleDetail.image.label' },
											{ recommendedSize: '1000 × 421' }
										)}
									</Label>
									{article?.image && !selectedImageUrl && (
										<img
											src={article.image}
											className="article-main-image"
										/>
									)}
									{selectedImageUrl && (
										<img
											src={selectedImageUrl}
											className="article-main-image"
										/>
									)}
									<CButton
										onClick={handleOnLoadImage}
										className="btn-sm"
									>
										{t({
											id: isCreate
												? 'admin.cms.articleDetail.image.btn.new'
												: 'admin.cms.articleDetail.image.btn.edit',
										})}
									</CButton>
								</div>

								<div className="w-50 mb-3">
									<InputTinyMCE
										name="content"
										identifier="content"
										label="admin.cms.articleDetail.content.label"
										initialValue={article?.content}
										myValue={values.content}
										onChangeNew={handleOnTinyMceChange(form)}
									/>
								</div>

								<BlogArticleSpecificationList article={article} />

								<InputSelect
									name="productType"
									identifier="productType"
									label="admin.cms.articleDetail.productType.label"
									options={productTypeSelectOptions}
									className="form-control--blog"
								/>

								<Condition
									when="productType"
									is={(value: ARTICLE_PRODUCT_TYPE) =>
										value !== ARTICLE_PRODUCT_TYPE.NONE
									}
								>
									<Input
										name="productListTitle"
										identifier="productListTitle"
										label="admin.cms.articleDetail.productListTitle.label"
										className="form-control--blog"
									/>
								</Condition>

								<Condition
									when="productType"
									is={(value: ARTICLE_PRODUCT_TYPE) =>
										value === ARTICLE_PRODUCT_TYPE.CAROUSEL_MANUAL ||
										value === ARTICLE_PRODUCT_TYPE.LIST_MANUAL
									}
								>
									<CButton
										className="btn-sm"
										onClick={handleOnClickAddProduct}
									>
										<BiPlus />
										{t({ id: 'admin.cms.articleDetail.products.btn.add' })}
									</CButton>
									<div className="my-2">
										<BundleItemList
											bundles={bundleDetails ?? []}
											idSequenceMaps={bundles?.map((bundle) => ({
												bundleId: bundle.bundleId,
												sequenceNumber: bundle.order,
											}))}
											idAvailableCountMaps={bundleCountQuery.data?.map(
												(item) => ({
													itemId: item.id,
													quantity: item.quantity,
												})
											)}
											onRemove={(bundleId) => {
												dispatch([
													BlogArticleDetailAction.removeBundle,
													bundleId,
												]);
											}}
										/>
									</div>
								</Condition>

								<BlogArticleButtons
									article={article}
									onDiscard={handleOnDiscard}
									onToggleState={handleOnToggleState}
									className="mt-3"
								/>
							</CCardBody>
						</CCard>
					</CForm>
				);
			}}
		/>
	);
};

export default BlogArticleDetailPage;
