import { cardInfo } from "@/app/types/types";
import { BiCloud, BiError, BiTv, BiUser } from "react-icons/bi";

const cardsIconSize = 62;
const cards: cardInfo = [
	{
		title: "Novo host",
		id: 1,
		defaultInput: [
			{ title: "Nome do host", type: "text", value: "name"  }
		],
		icon: <BiTv size={cardsIconSize} />,
		description: "Crie um novo host e o detalhe corretamente para resoluções mais precisas.",
	},
	{
		title: "Novo server",
		id: 2,
		defaultInput: [{ title: "Nome do server", type: "text", value: "name" }],
		selectInput: [{ title: "Pertence ao Host:", filter: "host", type: "text", value: "hostId" }],
		icon: <BiCloud size={cardsIconSize} />,
		description: "Crie um novo server e o detalhe corretamente para resoluções mais precisas.",
	},
	{
		title: "Novo cliente",
		id: 3,
		defaultInput: [
			{ title: "Nome do cliente", type: "text", value: "name" },
			{ title: "Número do projeto do cliente", type: "number", value: "nProject" },
		],
		selectInput: [
			{ title: "Pertence ao host:", filter: "host", type: "text", value: "hostId" },
			{ title: "Pertence ao server:", filter: "server", type: "text", value: "serverId" },
		],
		icon: <BiUser size={cardsIconSize} />,
		description: "Crie um novo cliente e o detalhe corretamente para resoluções mais precisas.",
	},
	{
		title: "Novo problema",
		id: 4,
		defaultInput: [{ title: "Problema", type: "text", value: "name" }],
		textarea: [{ title: "Descrição/solução", type: "text", value: "description" }],
		selectInput: [
			{ title: "Pertence ao host:", type: "text", filter: "host", value: "hostId" },
			{ title: "Pertence ao server:", type: "text", filter: "server", value: "serverId" },
			{ title: "Pertence ao cliente:", type: "text", filter: "client", value: "clientId" },
		],
		icon: <BiError size={cardsIconSize} />,
		description: "Detalhe um problema para que sua resolução seja cada vez mais rápida e otimizada.",
	},
];
export { cards };
