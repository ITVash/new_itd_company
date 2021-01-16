import { AxiosPromise } from "axios"
import { axios } from "../core"
import { IService } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IService): AxiosPromise => axios.post("/service", data),
	show: (): AxiosPromise => axios.get("/service"),
	update: (data: IService): AxiosPromise =>
		axios.put(`/service/${data._id}`, data),
	delete: (id: string): AxiosPromise => axios.delete(`/service/${id}`),
}
