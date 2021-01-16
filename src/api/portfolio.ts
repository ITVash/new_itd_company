import { AxiosPromise } from "axios"
import { axios } from "../core"
import { IPortfolio } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IPortfolio): AxiosPromise => axios.post("/portfolio", data),
	show: (): AxiosPromise => axios.get("/portfolio"),
	update: (data: IPortfolio): AxiosPromise =>
		axios.put(`/portfolio/${data._id}`, data),
	delete: (id: string): AxiosPromise => axios.delete(`/portfolio/${id}`),
}
