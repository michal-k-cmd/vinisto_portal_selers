import { lazy, Suspense, useContext, useState } from 'react';
import Loader from 'Components/View/Loader';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);
import FilterDropdownArrowOpenedIcon from 'Components/Icons/FilterDropdownArrowOpened';
import { LocalizationContext } from 'Services/LocalizationService';
import { MotivationAccordionProps } from 'pages-spa/Bundle/Components/BundleDetail/Components/MotivationAccordion/interfaces';
import motivationAccordionData from 'pages-spa/Bundle/Components/BundleDetail/Components/MotivationAccordion/data';

import styles from './styles.module.css';

const MotivationAccordion = ({
	items = motivationAccordionData,
	sliceLength = 99,
}: MotivationAccordionProps) => {
	const [activeKey, setActiveKey] = useState<string | null>(null);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const highlightWords = (
		t({ id: 'productDetail.accordion.highlight' }) as string
	).split(',');

	const handleAccordionClick = (key: string) => {
		setActiveKey(activeKey === key ? null : key);
	};

	return (
		<>
			{items.map((item) => {
				const Icon = item.icon;

				const isOpen = activeKey === item.id;

				const translatedTitle = t({ id: item.title }) as string;
				const translatedContent = t(
					{ id: item.content },
					{
						br: '<br/>',
					}
				) as string;

				const content =
					typeof translatedContent === 'string' && !isOpen
						? highlightToHtml(
								getTruncatedContent(translatedContent, sliceLength),
								highlightWords
						  )
						: highlightToHtml(translatedContent, highlightWords);

				return (
					<div
						className="w-full d-flex flex-row gap-2 p-2 bg-white"
						key={'ma' + item.id}
					>
						<div className="mt-1">
							<Icon />
						</div>
						<div className="w-full ps-2">
							<div>
								<h5 className={styles.motivationHeading}>{translatedTitle}</h5>
							</div>
							<div>
								<p
									className={styles.motivationText}
									dangerouslySetInnerHTML={{ __html: content }}
								></p>
							</div>
						</div>
						<div
							className={styles.motivationAccordionArrow}
							onClick={() => handleAccordionClick(item.id)}
						>
							{!isOpen ? (
								<Suspense fallback={<Loader blank />}>
									<FilterDropdownArrowIcon />
								</Suspense>
							) : (
								<Suspense fallback={<Loader blank />}>
									<FilterDropdownArrowOpenedIcon />
								</Suspense>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

const getTruncatedContent = (content: string, maxLength: number): string => {
	if (content.length <= maxLength) return content;
	const lastSpaceIndex = content.lastIndexOf(' ', maxLength);
	return content.slice(0, lastSpaceIndex);
};

const highlightToHtml = (text: string, highlightWords: string[]): string => {
	const escapedHighlightWords = highlightWords.map((word) =>
		word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
	);
	const regex = new RegExp(`(${escapedHighlightWords.join('|')})`, 'gi');
	const parts = text.split(regex);

	return parts
		.map((part) =>
			highlightWords.includes(part.toLowerCase())
				? `<span class="${styles.highlightVinisto}">${part}</span>`
				: part
		)
		.join('');
};

export default MotivationAccordion;
