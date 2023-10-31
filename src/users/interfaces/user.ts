export interface User {
	uuid: string;
	username: string;
	email: string;
	password: string;
}

export interface UserDetails extends User {
	avatar: URL;
	bio: string;
	createAt: Date;
}
