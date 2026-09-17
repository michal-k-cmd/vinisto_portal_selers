import { useCallback, useContext } from 'react';
import cx from 'classnames';
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { useQuery } from '@tanstack/react-query';
import { map, size } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'Services/Date';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useParams } from 'react-router-dom';
import {
	TagsDetailParams,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { ADD_TRANSLATION_CMS_BLOG_TAG } from 'Components/Modal/constants';
import { LANGUAGE_CODE_MAP } from 'Services/ApiService/constants';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import ActionButtons from 'Components/AdminDetail/Components/ActionButtons';
import { BiPlus } from 'react-icons/bi';
import { MdKeyboardBackspace, MdOutlineDelete } from 'react-icons/md';
import PostTagService from 'Services/CmsService/PostTag';
import adminDetailStyles from 'Components/AdminDetail/styles.module.css';

import BlogTagTranslation from './Components/BlogTagTranslation';

import './styles.css';

const BlogTagDetailPage = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const loginHash = vinistoUser.loginHash;
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { activeLanguageKey } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const history = useNavigate();
	const { id: blogTagId } = useParams();
	const { getById, remove } = PostTagService;
	const dateFormat = `${t({ id: 'admin.dateFormat' })}`;

	const blogTag = useQuery(
		['cmsBlogTag', blogTagId],
		() => {
			const params: TagsDetailParams = {
				UserLoginHash: vinistoUser?.loginHash,
				tagId: blogTagId ?? '',
			};

			return getById(params, activeLanguageKey);
		},
		{}
	);

	const timeConvert = (blogTagCreationTime?: number) => {
		return dayjs.unix(blogTagCreationTime ?? 0).format(dateFormat);
	};

	const removeBlogTag = useCallback(() => {
		remove(blogTagId ?? '', loginHash)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.cmsBlogTag.delete.success'
				);
				history(`/cms-blog-tags`);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.cmsBlogTag.delete.error'
				);
			});
	}, [notificationsContext, loginHash, blogTagId, remove]);

	const actionButtonsSchema = [
		{
			rowId: 'BLOG_TAG_ACTIONS',
			items: [
				{
					label: 'admin.btn.back',
					onClick: () => history('/cms-blog-tags'),
					icon: MdKeyboardBackspace,
				},
				{
					label: 'admin.cmsBlogTag.delete.btn',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.cmsBlogTag.delete.title',
							})}`,
							message: `${t({
								id: 'admin.cmsBlogTag.delete.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.yes',
									})}`,
									onClick: () => {
										removeBlogTag();
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
				},
			],
		},
	];

	const translations = blogTag?.data?.translations;
	const isOnlyTranslation = Object.keys(translations ?? {}).length === 1;

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
							<dt>{t({ id: 'admin.cmsBlogTag.identifier.label' })}</dt>
							<dd>{blogTagId}</dd>
							<dt>{t({ id: 'admin.cmsBlogTag.createTime.label' })}</dt>
							<dd>{timeConvert(blogTag?.data?.createTime)}</dd>
							<dt>{t({ id: 'admin.cmsBlogTag.articleNumber.label' })}</dt>
							<dd>{blogTag?.data?.articleNumber}</dd>
						</dl>
						<section>
							<h2 className="category-detail__heading">
								{t({ id: 'admin.categoryDetail.translations.label' })}
							</h2>
							{map(translations, (translation, language) => (
								<BlogTagTranslation
									language={language as VinistoHelperDllEnumsLanguage}
									translation={translation}
									blogTagId={blogTagId ?? ''}
									key={language}
									isOnlyTranslation={isOnlyTranslation}
								/>
							))}
							<ActionButton
								onClick={() =>
									handleOpenModal(ADD_TRANSLATION_CMS_BLOG_TAG, {
										submitButtonLabel:
											'admin.modal.cmsBlogTag.translation.add.submit',
										blogTagId: blogTagId,
										existingTranslations: Object.keys(translations ?? {}),
									})
								}
								label="admin.category.translation.button.add"
								icon={BiPlus}
								disabled={size(translations) === size(LANGUAGE_CODE_MAP)}
							/>
						</section>
						<div className="mt-5">
							<ActionButtons actionButtonsSchema={actionButtonsSchema} />
						</div>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default BlogTagDetailPage;
