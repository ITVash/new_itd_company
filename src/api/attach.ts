import { AxiosPromise } from "axios"
import { axios } from "../core"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: any): AxiosPromise => axios.post("/attachments", data),
	createMany: (data: any): AxiosPromise => axios.post("/attachmentsMany", data),
	show: (): AxiosPromise => axios.get("/attachments"),
	update: (data: any): AxiosPromise =>
		axios.put(`/attachments/${data._id}`, data),
	delete: (id: any): AxiosPromise => axios.delete("/attachments", id),
}
