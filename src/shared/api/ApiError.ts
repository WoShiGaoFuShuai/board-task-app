export class ApiError extends Error {
	public readonly statusCode: number;

	constructor({ msg, statusCode }: { msg?: string; statusCode: number }) {
		super(msg ?? `Request failed with status ${statusCode}`);

		this.name = 'ApiError';
		this.statusCode = statusCode;
	}
}
