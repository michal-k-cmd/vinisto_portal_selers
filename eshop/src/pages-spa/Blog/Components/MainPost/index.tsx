import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import NextLink from 'next/link';
import { useContext } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import transformImage from 'Helpers/transformImage';
import { BlogContext } from 'pages-spa/Blog/context';

const fallbackImage = '/assets/images/blog-fallback.webp';

import styles from './styles.module.css';

const BlogMainPost = () => {
	const { posts, isPostsLoading } = useContext(BlogContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const mainPost = posts?.[0];

	if (isPostsLoading)
		return (
			<div className="container">
				<Skeleton />
			</div>
		);
	if (!mainPost) return <></>;

	return (
		<div className="container">
			<NextLink
				href={`/blog/${mainPost.url}`}
				className={styles.mainPost}
			>
				<div className={styles.mainPostImgWrap}>
					<img
						className={styles.mainPostImg}
						src={transformImage(
							mainPost?.image
								? mainPost?.image?.urls?.thumb_1000
								: fallbackImage,
							950
						)}
						alt={mainPost.image?.alternativeText ?? ''}
					/>
				</div>
				<div>
					<h2 className={styles.mainPostTitle}>{mainPost.title}</h2>
					<div className={styles.mainPostInfo}>
						<span>
							{dayjs(mainPost.publishDate)
								.locale(navigator.language)
								.format('LL')}
						</span>
						<span className={styles.mainPostAuthor}>
							{' '}
							-{' '}
							{mainPost.authorDetails
								?.map((author) => author.name)
								.join(', ')}{' '}
							-{' '}
						</span>
						<span>
							{t(
								{ id: 'blog.readingTime' },
								{
									time: mainPost.readingTime.toString(),
								}
							)}
						</span>
					</div>
					<div
						className={cx(styles.mainPostText, {
							'max-lines--4': isMobile || isTablet,
						})}
					>
						{`${mainPost.leadParagraph} … `}
						<span className={styles.mainPostReadMore}>
							<span className={styles.mainPostReadMoreSpan}>
								{t({ id: 'blog.readMore' })}
							</span>
						</span>
					</div>
				</div>
			</NextLink>
		</div>
	);
};

export default BlogMainPost;
