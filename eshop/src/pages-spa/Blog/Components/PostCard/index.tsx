import { useContext } from 'react';
import NextLink from 'next/link';
import cx from 'classnames';
import transformImage from 'Helpers/transformImage';
import { dayjsInstance as dayjs } from 'Services/Date';
import { BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

const fallbackImage = '/assets/images/blog-fallback.webp';

import styles from './styles.module.css';

const BlogPostCard = ({ post }: { post: BlogArticle }) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<NextLink
			href={`/blog/${post.url}`}
			className={styles.blogPostCard}
		>
			<div className={styles.blogPostCardImgWrap}>
				<img
					src={transformImage(
						post?.image ? post?.image?.urls?.thumb_1000 : fallbackImage,
						425
					)}
					alt={post?.image?.alternativeText ?? ''}
					className={styles.blogPostCardImg}
				/>
			</div>
			<div>
				<h3 className={styles.blogPostCardTitle}>{post.title}</h3>
				<div className={styles.blogPostCardInfo}>
					<span>
						{dayjs(post.publishDate).locale(navigator.language).format('LL')}
					</span>
					<span className={styles.blogPostCardAuthor}>
						{' '}
						- {post.authorDetails
							?.map((author) => author.name)
							.join(', ')} -{' '}
					</span>
					<span>
						{t(
							{ id: 'blog.readingTime' },
							{
								time: post.readingTime.toString(),
							}
						)}
					</span>
				</div>
				<div className={cx(styles.blogPostCardText, 'max-lines--4')}>
					{post.leadParagraph}
					<span className={styles.showMoreBtn}>
						<span className={styles.showMoreBtnSpan}>
							{t({ id: 'blog.readMore' })}
						</span>
					</span>
				</div>
			</div>
		</NextLink>
	);
};

export default BlogPostCard;
