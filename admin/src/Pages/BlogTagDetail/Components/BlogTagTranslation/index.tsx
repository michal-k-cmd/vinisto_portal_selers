import { FC, useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import { useRevalidator } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { EDIT_CMS_BLOG_TAG } from 'Components/Modal/constants';
import { LANGUAGE_CODE_MAP } from 'Services/ApiService/constants';
import { CMS_TAG_META_DESCRIPTION_LIMIT } from 'Components/Modal/Components/CmsBlogTag/constants';
import { truncateString } from 'Pages/CategoryDetail/Components/CategoryTranslation/helpers';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import DeleteIcon from 'Components/Icons/Delete';
import EditIcon from 'Components/Icons/Edit';
import './styles.css';
import PostTagService from 'Services/CmsService/PostTag';

import { PostTagTranslationProps } from './interfaces';

const BlogTagTranslation: FC<PostTagTranslationProps> = ({
	language,
	translation,
	blogTagId,
	isOnlyTranslation,
}) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const { removeLanguage } = PostTagService;

	const t = useFormatMessage();
	const revalidator = useRevalidator();
	const queryClient = useQueryClient();

	const [isDescriptionExpanded, setIsDescriptionExpanded] =
		useState<boolean>(false);
	const [isExpanded, setIsExpanded] = useState<boolean>(isOnlyTranslation);

	const handleOnDelete = () => {
		confirmAlert({
			title: `${t({
				id: 'admin.cmsBlogTag.translation.delete.title',
			})}`,
			message: `${t({
				id: 'admin.cmsBlogTag.translation.delete.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						removeLanguage(blogTagId, language, vinistoUser.loginHash)
							.then(() => {
								notificationsContext.handleShowSuccessNotification(
									'admin.category.translation.delete.success'
								);
								revalidator.revalidate();
								queryClient.invalidateQueries(['cmsBlogTag']);
							})
							.catch(() => {
								notificationsContext.handleShowErrorNotification(
									'admin.category.translation.delete.error'
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
	};

	// when two translations are present, other is removed and this one collapsed, we need to expand it
	useEffect(() => {
		isOnlyTranslation && setIsExpanded(isOnlyTranslation);
	}, [isOnlyTranslation]);

	return (
		<div
			className={cx('category-translation my-3 ps-3 py-1', {
				'category-translation--open px-3 py-3': isExpanded,
			})}
		>
			<h3 className="category-translation__language">
				{t({ id: 'admin.category.translation.language' })}:{' '}
				{LANGUAGE_CODE_MAP[language]}
			</h3>
			<nav className="category-translation-controls">
				<ul className="d-flex m-0 list-unstyled">
					{isExpanded && !isOnlyTranslation && (
						<li>
							<button
								className="btn"
								onClick={handleOnDelete}
							>
								<DeleteIcon className="category-translation-controls__delete" />
							</button>
						</li>
					)}
					{isExpanded && (
						<li>
							<button
								className="btn"
								onClick={() =>
									handleOpenModal(EDIT_CMS_BLOG_TAG, {
										submitButtonLabel:
											'admin.modal.category.translation.edit.submit',
										translationData: { ...translation, language },
										blogTagId,
									})
								}
							>
								<EditIcon />
							</button>
						</li>
					)}
					{!isOnlyTranslation && (
						<li>
							<button
								className={cx(
									'btn category-translation__toggle category-translation__toggle--standalone',
									{
										'category-translation__toggle--open': isExpanded,
									}
								)}
								onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
							>
								<span className="visually-hidden">
									{t({ id: 'admin.category.translation.toggle' })}
								</span>
							</button>
						</li>
					)}
				</ul>
			</nav>
			{isExpanded && (
				<>
					<dl className="category-translation__list">
						<dt>{t({ id: 'admin.category.translation.name' })}</dt>
						<dd>{translation.name}</dd>
						<dt>{t({ id: 'admin.category.translation.url' })}</dt>
						<dd>{translation.url}</dd>
						<dt>{t({ id: 'admin.category.translation.metaTitle' })}</dt>
						<dd>{translation.metaTitle}</dd>
						<dt>{t({ id: 'admin.category.translation.meta' })}</dt>
						<dd>
							{translation.metaDescription ??
								truncateString(
									translation.description,
									CMS_TAG_META_DESCRIPTION_LIMIT
								)}
						</dd>
						<dt>{t({ id: 'admin.category.translation.description' })}</dt>
						<dd
							className={cx({ 'two-line-ellipsis': !isDescriptionExpanded })}
							dangerouslySetInnerHTML={{ __html: translation.description }}
						/>
					</dl>
					<button
						className={cx('btn category-translation__toggle', {
							'category-translation__toggle--open': isDescriptionExpanded,
						})}
						onClick={() =>
							setIsDescriptionExpanded((isExpanded) => !isExpanded)
						}
					>
						{t({ id: 'admin.category.translation.description.showAll' })}
					</button>
				</>
			)}
		</div>
	);
};

export default BlogTagTranslation;
