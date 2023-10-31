export interface Auth {
	uuid: string;
	username: string;
	avatar: URL | string;
	expiresIn: string | undefined;
}
