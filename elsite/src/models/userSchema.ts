export interface UserState {
	id: String;
	name: String;
	email: String;
	iat: Number;
	exp: Number;
}

export const initialUserState: UserState = {
	id: "",
	name: "",
	email: "",
	iat: 0,
	exp: 0,
};
