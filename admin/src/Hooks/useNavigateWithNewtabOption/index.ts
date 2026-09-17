import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigateWithNewtabOption = () => {
	const navigate = useNavigate();

	return useCallback(
		(path: string, event: React.MouseEvent) => {
			// Enable text selection
			if (window.getSelection()?.toString()) return;
			// If there's a link or button we want to use the default behavior
			if (
				event.target instanceof HTMLAnchorElement ||
				event.target instanceof HTMLButtonElement
			)
				return;
			// Use the default behavior for a right click as well
			if (event.button === 2) return;
			// Middle click, ctrl + click, cmd + click
			if (
				event.type === 'auxclick' ||
				event.button === 1 ||
				event.ctrlKey ||
				event.metaKey
			) {
				window.open(path, `${path}`)?.focus();
				return;
			}
			// Left click
			if (event.button === 0) return navigate(path);
		},
		[navigate]
	);
};

export default useNavigateWithNewtabOption;
