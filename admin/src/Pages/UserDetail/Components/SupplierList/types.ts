export interface User {
	id: string;
	email: string;
	userLoginHash: string;
}

export interface Supplier {
	nameWeb: string;
	id: string;
	name: string;
	userIds: string[];
	users: User[];
}
