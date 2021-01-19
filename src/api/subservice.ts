import { AxiosPromise } from "axios"
import { axios } from "../core"
import { ISubService } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: ISubService): AxiosPromise => axios.post("/subservice", data),
	show: (): AxiosPromise => axios.get("/subservice"),
	update: (data: ISubService): AxiosPromise =>
		axios.put(`/subservice/${data._id}`, data),
	delete: (id: string): AxiosPromise => axios.delete(`/subservice/${id}`),
}
