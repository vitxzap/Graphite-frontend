export type cardInfo = {
	title?: string;
	id?: number;
	defaultInput?: [
		{
			title?: string;
			type?: string;
			value?: string
		},
	];
	selectInput?: [
		{
			title?: string;
			type?: string;
			value?: string
			filter?: string;
		},
	];
	textarea?: [
		{
			title?: string;
			type?: string;
			value?: string
		},
	];
	icon?: any;
	description?: string;
};

export interface insertData {
	name: string;
	description?: string;
	clientId?: number;
	serverId?: number;
	hostId?: number;
	nProject?: number;
}
