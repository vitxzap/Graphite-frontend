import axios from "axios";
const api = "http://localhost:3001";
class Host {
	async get() {
		const c = await axios.get(`${api}/host`);
		return c;
	}

	async post(value: string, description: string) {
		const c = await axios.post(`${api}/host`);
		return c;
	}
}

class Server {
	async get(hostId: number) {
		const c = await axios.get(`${api}/server?id${hostId}`);
		return c;
	}

	async post(value: string, hostId: number) {
		const c = await axios.post(`${api}/server`, {
			nm_server: value,
			id_host: hostId,
		});
	}
}

const host = new Host
const server = new Server
export { host, server };