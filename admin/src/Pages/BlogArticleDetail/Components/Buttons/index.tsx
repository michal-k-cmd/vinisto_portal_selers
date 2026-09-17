import { FC, useContext } from 'react';
import { CButton } from '@coreui/react';
import cx from 'classnames';
import { ARTICLE_STATE } from 'Services/CmsService/Blog/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import { BlogArticleButtonsProps } from './interfaces';

const BlogArticleButtons: FC<BlogArticleButtonsProps> = ({
	article,
	onDiscard,
	onToggleState,
	className,
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div className={cx('d-flex gap-4', className)}>
			<CButton onClick={onDiscard}>
				{t({ id: 'admin.cms.articleDetail.btn.discard' })}
			</CButton>
			<CButton type="submit">
				{t({ id: 'admin.cms.articleDetail.btn.save' })}
			</CButton>
			<CButton
				onClick={onToggleState}
				disabled={article === null}
			>
				{t({
					id:
						article === null || article.state === ARTICLE_STATE.CONCEPT
							? 'admin.cms.articleDetail.btn.publish'
							: 'admin.cms.articleDetail.btn.concept',
				})}
			</CButton>
		</div>
	);
};

export default BlogArticleButtons;
