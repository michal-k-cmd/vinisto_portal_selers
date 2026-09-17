import { LW_CRUD_ACTION, LW_MODAL_ACTION } from './constants';

import { LinkWidget } from '@/domain/link-widget';

export interface ModalState {
	isOpen: boolean;
	data: Partial<LinkWidget>;
	mode: keyof typeof LW_CRUD_ACTION;
}

export type ModalAction =
	| {
			type: typeof LW_MODAL_ACTION.OPEN;
			payload: {
				mode: typeof LW_CRUD_ACTION.CREATE;
				data: Partial<LinkWidget>;
				isOpen?: undefined;
			};
	  }
	| {
			type: typeof LW_MODAL_ACTION.OPEN;
			payload: {
				mode: typeof LW_CRUD_ACTION.UPDATE;
				data: Partial<LinkWidget>;
				isOpen?: undefined;
			};
	  }
	| {
			type: typeof LW_MODAL_ACTION.CLOSE;
			payload?: undefined;
	  };
