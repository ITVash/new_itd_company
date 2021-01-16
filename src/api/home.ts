import { AxiosPromise } from "axios"
import { axios } from "../core"
import { IHome } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IHome): AxiosPromise => axios.post("/home", data),
	show: (): AxiosPromise => axios.get("/home"),
	update: (data: IHome): AxiosPromise => axios.put(`/home/${data._id}`, data),
	delete: (id: any): AxiosPromise => axios.delete("/home", id),
}
