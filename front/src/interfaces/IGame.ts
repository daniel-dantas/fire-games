export enum EConsole {
	XBOX_ONE = "XBOX ONE",
	PS4 = "PS4",
	NINTENDO_SWITCH = "NINTENDO SWITCH",
	PS5 = "PS5",
	PC = "PC"
}

export default interface IGame {
	id: number;
	front_cover: string;
	title: string;
	year: string;
	console: EConsole;
	concluded: boolean;
	conclusion_date: Date;
	personal_notes: string;
}
