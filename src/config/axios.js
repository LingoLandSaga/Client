import axios from "axios"

const IP_ADDRESS = "http://localhost:3000"

const instance = axios.create({
  baseURL: IP_ADDRESS
})

export default instance