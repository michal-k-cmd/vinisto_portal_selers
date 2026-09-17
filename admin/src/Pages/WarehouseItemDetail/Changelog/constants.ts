/**
 * Row-highlight CSS classes for the warehouse change-log (defined in
 * Components/AdminTable/styles.css):
 *  - `up`   — stock was added (positive movement),
 *  - `down` — stock was removed (negative movement).
 *
 * Kept as named constants instead of magic strings so the styling contract is
 * explicit and greppable.
 */
export const MOVEMENT_ROW_CLASS = {
	up: 'movement-up',
	down: 'movement-down',
} as const;
