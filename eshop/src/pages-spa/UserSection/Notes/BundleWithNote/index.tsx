import { useCallback, useContext, useRef, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import PlusIcon from 'Components/Icons/PlusIcon';
import { DeviceServiceContext } from 'Services/DeviceService';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import getSrcSet from 'Helpers/getSrcSet';
import UserBundleNotes from 'pages-spa/UserSection/UserBundleNotes';
import {
	useConfirmAlertOnDeleteNote,
	useDeleteNote,
} from 'Components/BundleNotes/hooks';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

import styles from './styles.module.css';
import { BundleWithNoteProps } from './interface';

const BundleWithNote = ({
	image,
	bundleName,
	bundleId,
	bundleUrl,
	bundleSpecificationDetails,
	notes,
	refetchBundleNotes,
	showMoreButton = true,
	showMoreButtonIfOpen = false,
	addNoteText,
	setRecentyNotedBundleIds,
	onDeleteNote,
}: BundleWithNoteProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);

	const {
		shortVariety: producerName,
		component: flag,
		varietyUrl: producerUrl,
	} = getFlagSpecification(bundleSpecificationDetails || []);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const srcSet = getSrcSet(image?.domainUrls);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	const [isEditingFirstNote, setIsEditingFirstNote] = useState<boolean>(false);

	const notesCount = notes?.length || 0;

	const handleOnAddNote = useCallback(() => {
		setIsOpen(true);
		inputRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
		inputRef.current?.focus();
	}, []);

	const handleOnEditNote = useCallback(() => {
		setIsEditingFirstNote(true);
		setIsOpen(true);
	}, []);

	const handleOnDeleteNote = useDeleteNote(notes?.[0] as BundleNote, {
		onSuccess: () => {
			onDeleteNote?.();
			refetchBundleNotes?.();
		},
	});

	const handleOnDeleteFirstNote = useConfirmAlertOnDeleteNote({
		deleteHandler: handleOnDeleteNote.mutate,
	});

	if (!bundleName) return null;

	return (
		<div className={cx(styles.productWrap, isOpen && styles.open)}>
			<div className={styles.product}>
				<div className={styles.imageWrap}>
					<img
						srcSet={srcSet ?? undefined}
						sizes={`(max-width: 767.98px) 60px, 80px`}
						src={image?.domainUrls?.['original_png']}
						alt={bundleName}
						className={styles.image}
					/>
				</div>
				<div className={styles.productInfo}>
					<Link
						href={`/${t({ id: 'routes.product.route' })}/${bundleUrl}`}
						className={styles.productName}
					>
						{bundleName}
					</Link>
					<Link
						href={`/${t({
							id: 'routes.products.route',
						})}/Vyrobce/${producerUrl}`}
						className={styles.producer}
					>
						{flag}
						<span className={styles.producerName}>{producerName}</span>
					</Link>
				</div>
				<div
					className={cx(styles.noteWrap, {
						'd-none': isOpen || notesCount === 0,
					})}
				>
					<div className={styles.note}>
						<div className={styles.noteDate}>
							{notes?.[0]?.publishedAt
								? new Date(notes[0].publishedAt).toLocaleDateString('cs-CZ')
								: ''}
						</div>
						<div className={styles.noteButtons}>
							<button
								className={styles.noteButton}
								onClick={handleOnEditNote}
							>
								<EditIcon className={styles.editIcon} />
							</button>
							<button
								className={styles.noteButton}
								onClick={handleOnDeleteFirstNote}
							>
								<DeleteIcon className={styles.deleteIcon} />
							</button>
						</div>
						<div className={styles.noteText}>{notes?.[0]?.note}</div>
					</div>
				</div>

				{!isDesktop && (
					<div className={cx(styles.more, isOpen && styles.open)}>
						<div className={styles.overflow}>
							<div className={styles.notes}>
								<p className={styles.notesInfo}>
									{t({
										id: 'userSection.bought-products.notesInfo',
									})}
								</p>
								<UserBundleNotes
									notes={notes}
									bundleId={bundleId}
									inputRef={inputRef}
									editedNote={isEditingFirstNote ? notes?.[0] : undefined}
									refetchData={refetchBundleNotes}
									onCreateNote={(note?: BundleNote) =>
										setRecentyNotedBundleIds?.((prev) =>
											note ? new Set([...prev, note.bundleId]) : prev
										)
									}
									onDeleteNote={onDeleteNote}
								/>
							</div>
						</div>
					</div>
				)}

				<div className={styles.buttons}>
					<button
						className={styles.rateButton}
						onClick={handleOnAddNote}
					>
						{addNoteText ? (
							addNoteText
						) : (
							<>
								<PlusIcon className={styles.plusNote} />{' '}
								{t({ id: 'userSection.bought-products.newNote' })}
							</>
						)}
					</button>
					{(showMoreButton || (showMoreButtonIfOpen && isOpen)) && (
						<button
							className={cx(styles.moreInfoButton, isOpen && styles.open, {
								invisible: notesCount <= 1 && !showMoreButtonIfOpen,
							})}
							onClick={() => {
								setIsOpen(!isOpen);
								setIsEditingFirstNote(false);
							}}
						>
							{isOpen
								? t({
										id: 'userSection.myNotes.lessInfo',
								  })
								: t(
										{
											id: 'userSection.myNotes.moreInfo',
										},
										{ count: notesCount - 1 }
								  )}
							<FilterDropdownArrowIcon />
						</button>
					)}
				</div>
			</div>
			{isDesktop && (
				<div className={cx(styles.more, isOpen && styles.open)}>
					<div className={styles.overflow}>
						<div className={styles.notes}>
							<p className={styles.notesInfo}>
								{t({
									id: 'userSection.bought-products.notesInfo',
								})}
							</p>
							<UserBundleNotes
								notes={notes}
								bundleId={bundleId}
								inputRef={inputRef}
								refetchData={refetchBundleNotes}
								editedNote={isEditingFirstNote ? notes?.[0] : undefined}
								onCreateNote={(note?: BundleNote) =>
									setRecentyNotedBundleIds?.((prev) =>
										note ? new Set([...prev, note.bundleId]) : prev
									)
								}
								onDeleteNote={onDeleteNote}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BundleWithNote;
