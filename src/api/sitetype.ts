import { AxiosPromise } from "axios"
import { axios } from "../core"
import { ISiteType } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: ISiteType): AxiosPromise => axios.post("/sitetype", data),
	show: (): AxiosPromise => axios.get("/sitetype"),
	update: (data: ISiteType): AxiosPromise =>
		axios.put(`/sitetype/${data._id}`, data),
	delete: (id: string): AxiosPromise => axios.delete(`/sitetype/${id}`),
}
