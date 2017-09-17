export interface Request {
	params: {
		group: string;
	};
	body: {
		time: number;
	};
}

export interface Context {
	path: string;
	request: Request;
	method: 'post';
	throw(statusCode: number, message?: string): void;
}
