import { axios } from "../core"
import { IHome } from "../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	create: (data: IHome): Promise<void> => axios.post("/home", data),
	show: (): Promise<void> => axios.get("/home"),
	update: (data: IHome): Promise<void> => axios.put(`/home/${data._id}`, data),
	delete: (id: any): Promise<void> => axios.delete("/home", id),
}
