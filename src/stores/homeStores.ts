import { makeAutoObservable } from "mobx"
import { homeApi } from "../api"
import { IHome, TAdvant } from "../Types"

class HomeStores {
	home: IHome[] = []
	isLoad: boolean = false
	constructor() {
		makeAutoObservable(this, {}, { deep: true })
	}

	get getHomeInfo() {
		return this.home
	}

	private setLoading = (status: boolean): void => {
		this.isLoad = status
	}
	setChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.home = this.home.map((item) => ({
			...item,
			[e.target.name]: e.target.value,
		}))
	}
	setService = (e: string) => {
		this.home = this.home.map((item) => ({
			...item,
			serviceDesc: e,
		}))
	}
	setWhy = (e: string) => {
		this.home = this.home.map((item) => ({
			...item,
			whyWe: e,
		}))
	}
	addAdvant = (obj: TAdvant): void => {
		this.home = this.home.map((item) => ({
			...item,
			advantages: [...item.advantages!, obj],
		}))
	}
	editAdvant = (id: number, obj: TAdvant): void => {
		const adv = this.home[0].advantages?.map((item, idx) =>
			idx === id ? { ...item, ...obj } : item,
		)
		this.home = this.home.map((item) => ({
			...item,
			advantages: adv,
		}))
	}
	delAdvant = (id: number): void => {
		const adv = this.home[0].advantages?.filter((i, idx) => idx !== id)
		this.home = this.home.map((item) => ({
			...item,
			advantages: adv,
		}))
	}
	update = async () => {
		try {
			const { data } = await homeApi.update(this.home[0])
			if (data.status === "success") alert("Данные сохранены!")
		} catch (error) {
			console.log("Ошибка", error)
		}
	}
	fetchItems = () => {
		homeApi
			.show()
			.then(({ data }) => {
				this.home = data.data
				this.setLoading(true)
			})
			.catch((err: any) => console.log("Ошибка запроса к базе данных", err))
	}
}

export default new HomeStores()
