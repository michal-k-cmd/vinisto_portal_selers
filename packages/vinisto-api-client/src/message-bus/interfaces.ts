import { Actions } from './constants';

export type MessageEventType =
	| {
			action: typeof Actions.LOGIN_FROM_ADMIN;
			// TODO Pull IVinistoUser out of eshop and admin
			vinistoUser: Record<PropertyKey, any>;
	  }
	| {
			action: typeof Actions.LOGIN_FROM_ADMIN_SUCCESS;
			// TODO Pull IVinistoUser out of eshop and admin
			vinistoUser: Record<PropertyKey, any>;
	  }
	| {
			action: typeof Actions.LOGOUT_FROM_ESHOP;
	  }
	| {
			action: typeof Actions.CREATE_NEW_BASKET_FROM_ADMIN;
	  }
	| {
			action: typeof Actions.DELETE_BASKET_FROM_ADMIN;
	  }
	| {
			action: typeof Actions.DELETE_BASKET_FROM_ADMIN_SUCCESS;
	  }
	| {
			action: typeof Actions.SET_BASKET_ID;
			basketId: string;
	  }
	| {
			action: typeof Actions.RESET_BASKET_FROM_ESHOP;
	  };
