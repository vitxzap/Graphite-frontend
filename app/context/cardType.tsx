export type cardInfo = {
	title: string | undefined;
	id: number | undefined;
	defaultInput: [{
		title: string | undefined;
		type: string | undefined;
	}];
	selectInput: [{
		title: string | undefined;
		type: string | undefined;
		filter: string | undefined;
	}];
	textarea: [{
		title: string | undefined;
		type: string | undefined;
	}];
	icon: any | undefined;
	description: string | undefined;
};
