import { type Editor } from '@tiptap/core';
import {
	FaBold,
	FaItalic,
	FaLink,
	FaListOl,
	FaListUl,
	FaRedo,
	FaUndo,
} from 'react-icons/fa';
import { useCallback } from 'react';

import { ToggleGroup } from '../ToggleButtonGroup';

import styles from './styles.module.css';

interface ToolbarProps {
	editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
	const setLink = useCallback(() => {
		if (!editor) return;
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl ?? 'https://');

		if (url === null) {
			return;
		}

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	return (
		<ToggleGroup.Root className={styles.buttonGroup}>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('heading', { level: 3 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				<span className={styles.label}>H3</span>
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('bold')}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<FaBold />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('italic')}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<FaItalic />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('link')}
				onClick={setLink}
			>
				<FaLink />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('bulletList')}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<FaListUl />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('orderedList')}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<FaListOl />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('undo')}
				onClick={() => editor.chain().focus().undo().run()}
			>
				<FaUndo />
			</ToggleGroup.Button>
			<ToggleGroup.Button
				className={styles.button}
				activeClassName={styles.active}
				isPressed={editor.isActive('redo')}
				onClick={() => editor.chain().focus().redo().run()}
			>
				<FaRedo />
			</ToggleGroup.Button>
		</ToggleGroup.Root>
	);
};

export default Toolbar;
