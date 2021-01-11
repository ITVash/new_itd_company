import axios from "axios"

axios.defaults.baseURL = ""

const token = localStorage.getItem("token")
token && (axios.defaults.headers.common["token"] = `${token}`)

export default axios
