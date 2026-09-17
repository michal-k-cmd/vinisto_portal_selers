import {
	NoteForm,
	NoteList,
	NotesListWrapper,
	NotesWrapper,
} from 'Components/BundleNotes';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

import styles from './styles.module.css';

interface UserBundleNotesProps {
	notes?: BundleNote[];
	bundleId: string;
	inputRef?: React.RefObject<HTMLTextAreaElement>;
	editedNote?: BundleNote | undefined;
	refetchData?: () => void;
	onCreateNote?: (note?: BundleNote) => void;
	onDeleteNote?: () => void;
}

const UserBundleNotes = ({
	notes,
	bundleId,
	inputRef,
	editedNote,
	refetchData,
	onCreateNote,
	onDeleteNote,
}: UserBundleNotesProps) => {
	return (
		<NotesWrapper className={styles.userSectionBundleNotesWrapper}>
			<NoteForm
				bundleId={bundleId}
				inputRef={inputRef}
				refetchQuery={refetchData}
				onCreateNote={onCreateNote}
			/>
			<NotesListWrapper>
				<NoteList
					notes={notes}
					refetchQuery={refetchData}
					editedNote={editedNote}
					onDeleteNote={onDeleteNote}
				/>
			</NotesListWrapper>
		</NotesWrapper>
	);
};

export default UserBundleNotes;
