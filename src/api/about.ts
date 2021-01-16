import { AxiosPromise } from "axios"
import { axios } from "../core"
import { IAbout } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IAbout): AxiosPromise => axios.post("/about", data),
	show: (): AxiosPromise => axios.get("/about"),
	update: (data: IAbout): AxiosPromise => axios.put(`/about/${data._id}`, data),
	delete: (id: any): AxiosPromise => axios.delete("/about", id),
}
