const CREATE = 'CREATE';
const UPDATE = 'UPDATE';

export const LW_CRUD_ACTION = {
	CREATE,
	UPDATE,
} as const;

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

export const LW_MODAL_ACTION = {
	OPEN,
	CLOSE,
} as const;
