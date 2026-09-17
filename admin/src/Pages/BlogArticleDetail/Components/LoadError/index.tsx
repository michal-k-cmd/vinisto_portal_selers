import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_URL as BLOG_ARTICLE_LIST_PAGE_URL } from 'Pages/BlogArticleList/constants';
import { LocalizationContext } from 'Services/LocalizationService';

const LoadError: FC = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div className="not-found-page">
			<p className="page-title mb-4">
				{t({ id: 'admin.cms.articleDetail.loadingError' })}
			</p>
			<Link
				to={BLOG_ARTICLE_LIST_PAGE_URL}
				className="btn btn-primary"
			>
				{t({ id: 'admin.btn.back' })}
			</Link>
		</div>
	);
};

export default LoadError;
