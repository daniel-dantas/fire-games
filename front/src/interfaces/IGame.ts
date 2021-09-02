export enum EConsole {
	XBOX_ONE = "XBOX_ONE",
	PS4 = "PS4",
	NINTENDO_SWITCH = "NINTENDO_SWITCH",
	PS5 = "PS5",
	PC = "PC"
}

export interface IGame {
	id?: number;
	front_cover: string;
	title: string;
	year?: string;
	console: EConsole;
	age?: number;
}

export interface IMyGame {
	id?: number;
	concluded: boolean;
	conclusionDate: Date;
	personalNotes: string;
	game: IGame;
}
