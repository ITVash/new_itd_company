import { AxiosPromise } from "axios"
import { axios } from "../core"
import { IUser } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IUser): AxiosPromise => axios.post("/users", data),
	show: (): AxiosPromise => axios.get("/users"),
	update: (data: IUser): AxiosPromise => axios.put(`/users/${data._id}`, data),
	delete: (id: string): AxiosPromise => axios.delete(`/users/${id}`),
	getMe: (): AxiosPromise => axios.get("/auth/me"),
	signIn: (data: { username?: string; password?: string }): AxiosPromise =>
		axios.post("/signin", data),
}
