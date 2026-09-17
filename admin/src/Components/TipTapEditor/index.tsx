import { type Editor } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect, useState } from 'react';

import ControlClickLink from './Plugins/ControlClickLink';
import styles from './styles.module.css';
import Toolbar from './Components/Toolbar';

interface RichTextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
	content?: string;
	// eslint-disable-next-line no-unused-vars
	onUpdate?: (editor: Editor) => void;
	ToolbarComponent?: React.ComponentType<{ editor: Editor }>;
}

const TipTapEditor = ({
	content = '',
	onUpdate = () => {},
	ToolbarComponent = Toolbar,
	...props
}: RichTextEditorProps) => {
	const editor = useEditor({
		onUpdate({ editor }) {
			onUpdate(editor);
		},
		extensions: [StarterKit, ControlClickLink],
		content,
		editorProps: {
			attributes: {
				class: styles.editor,
			},
		},
	});

	const [editorContainerRef, setEditorContainerRef] =
		useState<HTMLDivElement | null>(null);

	const listenToCtrlPressed = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey && !event.repeat && editorContainerRef) {
				editorContainerRef.classList.add(styles.ctrlPressed);
			}
		},
		[editorContainerRef]
	);

	const listenToCtrlReleased = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Control' && editorContainerRef) {
				editorContainerRef.classList.remove(styles.ctrlPressed);
			}
		},
		[editorContainerRef]
	);

	useEffect(() => {
		document.addEventListener('keydown', listenToCtrlPressed);
		document.addEventListener('keyup', listenToCtrlReleased);
		return () => {
			document.removeEventListener('keydown', listenToCtrlPressed);
			document.removeEventListener('keyup', listenToCtrlReleased);
		};
	}, [editorContainerRef, listenToCtrlPressed, listenToCtrlReleased]);

	if (!editor) return null;

	return (
		<div ref={setEditorContainerRef}>
			<ToolbarComponent editor={editor} />
			<EditorContent
				editor={editor}
				{...props}
			/>
		</div>
	);
};

export default TipTapEditor;
