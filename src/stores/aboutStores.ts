import { makeAutoObservable } from "mobx"
import { aboutApi } from "../api"
import { IAbout, TAdvant } from "../Types"
class AboutStores {
	isLoad: boolean = false
	about: IAbout = {
		desc: "",
		why: "",
		work: [],
	}
	constructor() {
		makeAutoObservable(this, {}, { deep: true })
	}
	fetchAbout = async (): Promise<void> => {
		try {
			const { data } = await aboutApi.show()
			this.about = data.data[0]
			this.isLoad = true
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
	update = async (e: IAbout): Promise<void> => {
		try {
			const { data } = await aboutApi.update(e)
			if (data.status === "success") {
				this.about = e
				alert("Данные сохранены!")
			}
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
	addAdvant = (obj: TAdvant): void => {
		//this.about.work = [...this.about.work!, obj]
		this.about.work?.push(obj)
	}
	editAdvant = (id: number, obj: TAdvant): void => {
		const adv = this.about.work?.map((item, idx) =>
			idx === id ? { ...item, ...obj } : item,
		)
		this.about.work = adv
	}
	delAdvant = (id: number): void => {
		const adv = this.about.work?.filter((i, idx) => idx !== id)
		this.about.work = adv
	}
}
export default new AboutStores()
