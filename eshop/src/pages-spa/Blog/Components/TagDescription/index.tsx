import { useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { BlogContext } from 'pages-spa/Blog/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import sanitizeHTML from 'Helpers/sanitizeHTML';

import styles from './styles.module.css';

const BlogTagDescription = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { tags, activeTagUrl } = useContext(BlogContext);
	const getLocalizedValue = useLocalizedValue();

	const activeTag = tags?.find(
		(tag) => getLocalizedValue(tag.url) === activeTagUrl
	);

	const { isDesktop, isMobile, isTablet } = useContext(DeviceServiceContext);

	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
		setIsExpanded(true);
	};

	const [isTextOverflow, setIsTextOverflow] = useState(false);
	const textElementRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const element = textElementRef.current;
		const scrollHeight = element?.scrollHeight;
		const clientHeight = element?.clientHeight;

		if (!scrollHeight || !clientHeight) return;
		if (scrollHeight > clientHeight) {
			setIsTextOverflow(true);
		} else {
			setIsTextOverflow(false);
		}
	}, [activeTag, isDesktop, isMobile, isTablet]);

	if (getLocalizedValue(activeTag?.description) == '') return <></>;

	const sanitizedHTML = sanitizeHTML(getLocalizedValue(activeTag?.description));
	return (
		<div className="container">
			<div className={styles.relativeWrap}>
				<p
					ref={textElementRef}
					className={cx(styles.categoryDesc, {
						'max-lines--3': !isExpanded,
					})}
					dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
				/>
				{isTextOverflow && !isExpanded && (
					<button
						className={styles.showMoreBtn}
						onClick={handleExpandClick}
					>
						{t({ id: 'blog.continueReading' })}
					</button>
				)}
			</div>
		</div>
	);
};

export default BlogTagDescription;
