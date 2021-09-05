export interface ILogin {
	email?: string;
	password?: string;
}

export default interface IAccount extends ILogin {
	token?: string;
}
