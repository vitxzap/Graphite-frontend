import axios from "axios"
export async function fetchHost() {
    const c = axios.get("http://localhost:3001/host")
    return c
}