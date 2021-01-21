import axios from "axios"

axios.defaults.baseURL = "https://api.itd.company:5051/api"

const token = localStorage.getItem("token")
token && (axios.defaults.headers.common["token"] = `${token}`)

export default axios
