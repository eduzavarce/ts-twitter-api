export interface JsonError extends Error {
	details?: object | undefined;
	code?: number;
}

export const throwError = (message: string, code: number): JsonError => {
	const error = new Error(message) as JsonError;
	error.code = code || 500;

	throw error;
};
