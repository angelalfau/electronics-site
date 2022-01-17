export interface ErrorState {
	name: String;
	email: String;
	password: String;
}

export const initialErrorState: ErrorState = {
	name: "",
	email: "",
	password: "",
};
