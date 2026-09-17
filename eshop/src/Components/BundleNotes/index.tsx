import {
	Dispatch,
	FormEvent,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import cx from 'classnames';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';
import CloseIcon from 'Components/Icons/Close';
import { LocalizationContext } from 'Services/LocalizationService';
import { useQueryClient } from '@tanstack/react-query';
import type { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

import Info from './Components/Info';
import styles from './styles.module.css';
import {
	ALL_NOTES_QUERY_KEY,
	useConfirmAlertOnDeleteNote,
	useCreateNote,
	useDeleteNote,
	useGetUserNotesForBundle,
	useUpdateNote,
} from './hooks';

interface BundleNotesProps {
	bundleId: string;
	inputRef?: React.RefObject<HTMLTextAreaElement>;
	onCreateNote?: () => void;
}

interface NoteFormProps {
	bundleId: string;
	inputRef?: React.RefObject<HTMLTextAreaElement>;
	onCreateNote?: (note?: BundleNote) => void;
	refetchQuery?: () => void;
}

const BundleNotes = ({ bundleId, inputRef }: BundleNotesProps) => {
	const queryClient = useQueryClient();
	const { data: notes, refetch: refetchUserNotesForBundle } =
		useGetUserNotesForBundle(bundleId);

	const refetchBundleNotesData = () => {
		refetchUserNotesForBundle();
		queryClient.invalidateQueries([ALL_NOTES_QUERY_KEY]);
	};
	return (
		<NotesWrapper>
			<NoteForm
				bundleId={bundleId}
				inputRef={inputRef}
				refetchQuery={refetchBundleNotesData}
			/>
			<NotesListWrapper>
				<NoteList
					notes={notes}
					refetchQuery={refetchBundleNotesData}
				/>
			</NotesListWrapper>
		</NotesWrapper>
	);
};

export const NotesWrapper = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => <div className={cx(styles.wrapper, className)}>{children}</div>;

export const NotesListWrapper = ({ children }: { children: ReactNode }) => (
	<div className={styles.notes}>{children}</div>
);

export const NoteForm = ({
	bundleId,
	inputRef,
	refetchQuery,
	onCreateNote,
}: NoteFormProps) => {
	const [note, setNote] = useState('');

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { mutate: createNote } = useCreateNote(bundleId, {
		onMutate: () => {
			setNote('');
		},
		onError: (note) => {
			setNote(note);
		},
		onSuccess: (note) => {
			onCreateNote?.(note);
			refetchQuery?.();
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createNote(note);
	};

	return (
		<div className={styles.formContainer}>
			<div className={styles.mainHeadingWrap}>
				<h2 className={styles.mainHeading}>
					{t({
						defaultMessage: 'Vaše poznámky k produktu',
						id: 'bundle.notes.form.heading',
					})}
				</h2>
				<Info />
			</div>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<textarea
					placeholder={`${t({
						defaultMessage: 'Sem můžete psát poznámky, které vidíte pouze vy.',
						id: 'bundle.notes.form.placeholder',
					})}`}
					className={styles.textarea}
					value={note}
					ref={inputRef}
					onChange={(e) => setNote(e.target.value)}
				/>
				<button
					className={styles.saveButton}
					disabled={!note}
				>
					{t({
						defaultMessage: 'Uložit poznámku',
						id: 'bundle.notes.form.save',
					})}
				</button>
			</form>
		</div>
	);
};

export const NoteList = ({
	notes,
	editedNote,
	refetchQuery,
	onDeleteNote,
}: {
	notes?: BundleNote[];
	editedNote?: BundleNote;
	refetchQuery?: () => void;
	onDeleteNote?: () => void;
}) => {
	return notes?.map((note) => (
		<NoteItem
			key={'note' + note.id}
			note={note}
			isEditing={editedNote?.id === note.id}
			refetchQuery={refetchQuery}
			onDeleteNote={onDeleteNote}
		/>
	));
};

const NoteItem = ({
	note,
	isEditing: isEditingProp,
	refetchQuery,
	onDeleteNote,
}: {
	note: BundleNote;
	refetchQuery?: () => void;
	isEditing?: boolean;
	onDeleteNote?: () => void;
}) => {
	const [isEditing, setIsEditing] = useState(!!isEditingProp);
	const { mutate: deleteNote } = useDeleteNote(note, {
		onSuccess: () => {
			onDeleteNote?.();
			refetchQuery?.();
		},
	});

	const handleOnDeleteNote = useConfirmAlertOnDeleteNote({
		deleteHandler: () => deleteNote(),
	});

	useEffect(() => {
		if (isEditingProp) {
			setIsEditing(true);
		}
	}, [isEditingProp]);

	if (isEditing) {
		return (
			<NoteFormEdit
				data={note}
				setIsEditing={setIsEditing}
				refetchQuery={refetchQuery}
			/>
		);
	}

	return (
		<div className={styles.noteItem}>
			<div className={styles.noteHeader}>
				<span className={styles.date}>
					{!!note.createdAt &&
						new Date(note.createdAt).toLocaleDateString('cs-CZ')}
				</span>
				<div className={styles.actions}>
					<button onClick={() => setIsEditing(true)}>
						<EditIcon
							height={17}
							width={17}
						/>
					</button>
					<button onClick={handleOnDeleteNote}>
						<DeleteIcon
							height={17}
							width={15}
						/>
					</button>
				</div>
			</div>
			<p>{note.note}</p>
		</div>
	);
};

interface NoteFormEditProps {
	data: BundleNote;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	refetchQuery?: () => void;
}

const NoteFormEdit = ({
	data,
	setIsEditing,
	refetchQuery,
}: NoteFormEditProps) => {
	const [note, setNote] = useState(data.note);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { mutate: updateNote } = useUpdateNote(data, {
		onMutate: () => {
			setNote('');
			setIsEditing(false);
		},
		onError: (note: string) => {
			setNote(note);
		},
		onSuccess: () => {
			refetchQuery?.();
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateNote(note);
	};

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = '0px';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(note.length, note.length);
		adjustHeight();
		// Putting note.length in the dependency array would cause the cursor jumping to the end of the text
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (
				e.key === 'Escape' &&
				document.activeElement === textareaRef.current
			) {
				setIsEditing(false);
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [setIsEditing]);

	return (
		<form
			className={styles.editForm}
			onSubmit={handleSubmit}
		>
			<div className={styles.editContainer}>
				<span className={styles.editDate}>
					{!!data.createdAt &&
						new Date(data.createdAt).toLocaleDateString('cs-CZ')}
				</span>
				<textarea
					className={styles.editTextarea}
					value={note}
					onChange={(e) => setNote(e.target.value)}
					onInput={adjustHeight}
					ref={textareaRef}
				/>
			</div>
			<div className={styles.editActions}>
				<button
					className={styles.cancelButton}
					onClick={() => setIsEditing(false)}
				>
					<CloseIcon
						width={10}
						height={10}
					/>

					{t({
						defaultMessage: 'Zahodit změny',
						id: 'bundle.notes.form.discard',
					})}
				</button>
				<button
					className={styles.saveButton}
					disabled={!note}
				>
					{t({
						defaultMessage: 'Uložit poznámku',
						id: 'bundle.notes.form.save',
					})}
				</button>
			</div>
		</form>
	);
};

export default BundleNotes;
