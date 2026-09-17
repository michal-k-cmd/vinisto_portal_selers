import { useContext } from 'react';
import { BlogContext } from 'pages-spa/Blog/context';
import BlogPostCard from 'pages-spa/Blog/Components/PostCard';

import styles from './styles.module.css';

const BlogPostList = () => {
	const { posts } = useContext(BlogContext);

	return (
		<div className="container">
			<div className={styles.postList}>
				{posts?.slice(1).map((post) => (
					<BlogPostCard
						key={'blgpostlinkcardspa' + post.id}
						post={post}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogPostList;
