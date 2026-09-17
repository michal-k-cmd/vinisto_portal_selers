export type Dispatch<A = any, B = any> = (action: A) => B;

export type MiddlewareAPI<A, DA = any, DB = any> = {
	getState: () => A;
	dispatch: Dispatch<DA, DB>;
};

export type Middleware<A, DA = any, DB = any> = (
	api: MiddlewareAPI<A, DA, DB>
) => (next: Dispatch<DA, DB>) => Dispatch<DA, DB>;
