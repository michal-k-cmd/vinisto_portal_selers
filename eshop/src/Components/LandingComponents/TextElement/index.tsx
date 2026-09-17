'use client';

import { useContext, useState } from 'react';
import cx from 'classnames';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { LocalizationContext } from 'Services/LocalizationService';

import Pretitle from '../Pretitle';
import Heading from '../Heading';

import { TextElementProps } from './interfaces';
import styles from './styles.module.css';

const TextElement = ({
	pretitle,
	heading,
	text,
	textAlign = 'left',
	isWithContainer = false,
	onlyElementInColumns,
	isWithReadMore = false,
}: TextElementProps) => {
	if (isWithContainer) {
		return (
			<ContainerFullWidth>
				<TextElementComponent
					pretitle={pretitle}
					heading={heading}
					text={text}
					textAlign={textAlign}
					isWithContainer={isWithContainer}
					isWithReadMore={isWithReadMore}
				/>
			</ContainerFullWidth>
		);
	}
	return (
		<TextElementComponent
			pretitle={pretitle}
			heading={heading}
			text={text}
			textAlign={textAlign}
			onlyElementInColumns={onlyElementInColumns}
			isWithReadMore={isWithReadMore}
		/>
	);
};

const TextElementComponent = ({
	pretitle,
	heading,
	text,
	textAlign,
	isWithContainer = false,
	onlyElementInColumns = false,
	isWithReadMore,
}: TextElementProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	return (
		<div
			className={cx(
				styles.textElement,
				isWithContainer && styles.withContainer,
				onlyElementInColumns && styles.onlyElementInColumns
			)}
			style={{
				textAlign: textAlign,
			}}
		>
			{pretitle && <Pretitle pretitle={pretitle} />}
			{heading && <Heading heading={heading} />}
			{isWithReadMore ? (
				<div
					className={cx(
						styles.text,
						isWithReadMore && styles.readMoreWrap,
						!showFullDescription && styles.preview
					)}
				>
					<span dangerouslySetInnerHTML={{ __html: text || '' }}></span>
					<button
						onClick={() =>
							setShowFullDescription(
								(setShowFullDescription) => !setShowFullDescription
							)
						}
						className={styles.readMoreLink}
					>
						{showFullDescription
							? t({
									id: 'category.header.stopReading',
							  })
							: t({
									id: 'category.header.continueReading',
							  })}
					</button>
				</div>
			) : (
				<div
					className={styles.text}
					dangerouslySetInnerHTML={{ __html: text || '' }}
				></div>
			)}
		</div>
	);
};

export default TextElement;
