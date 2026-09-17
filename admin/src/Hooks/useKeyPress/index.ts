import { useEffect, useState } from 'react';

/**
 * useKeyPress
 * @param targetKey - The key to listen for
 * @param enabled - Whether or not to listen for the key, e.g. isEscapable = false for modal, then disable
 * @returns boolean
 * @example
 * const isPressed = useKeyPress('Enter');
 * if (isPressed) {
 *  // do something
 * }
 */

const useKeyPress = (targetKey: string, enabled = true): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	useEffect(() => {
		if (!enabled) {
			return;
		}
		const downHandler = ({ key }: KeyboardEvent) => {
			if (key === targetKey) {
				setKeyPressed(true);
			}
		};

		const upHandler = ({ key }: KeyboardEvent) => {
			if (key === targetKey) {
				setKeyPressed(false);
			}
		};

		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, [targetKey]);

	return keyPressed;
};

export default useKeyPress;
