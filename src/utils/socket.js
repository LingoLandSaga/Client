import { io } from "socket.io-client"

const IP_ADDRESS = "http://localhost:3000"

export const socket = io(IP_ADDRESS)