import { makeAutoObservable } from "mobx"
import { portfolioApi } from "../api"
import { IPortfolio } from "../Types"

class PortfolioStores {
	isLoad: boolean = false
	portfolio: IPortfolio[] = [
		{
			title: "Picasso Studio",
			desc: "Студия интерьерного дизайна",
			link: "https://artprokofyev.art/",
			prev: "../../portfolio/prev/picasso_studio.jpg",
			proj: "../../portfolio/picasso-min.jpg",
		},
		{
			title: "Rec Hustle",
			desc: "Продакшн студи полного цикла/Узбекистан",
			prev: "../../portfolio/prev/rec_hustle.jpg",
			link: "https://rechustle.uz/",
			proj: "../../portfolio/rechustle-min.jpg",
		},
		{
			title: "КупиМама",
			desc: "Интернет-магазин детских товаров",
			prev: "../../portfolio/prev/kupimama.jpg",
			link: "https://xn--80aawhlbr5a.com/",
			proj: "../../portfolio/kupimama-min.jpg",
		},
		{
			title: "Мария Семенова",
			desc: "Сайт-визитка услуги визажа/Дубай",
			prev: "../../portfolio/prev/mary.jpg",
			link: "https://mariyasemenova.ru/",
			proj: "../../portfolio/mary-min.jpg",
		},
		{
			title: "Металл Донбасса",
			desc: "Корпоративный сайт",
			prev: "../../portfolio/prev/metaldon.jpg",
			link: "https://металлдонбасса.com",
			proj: "../../portfolio/metaldon-min.jpg",
		},
		{
			title: "Нероли",
			desc: "Салон косметики и парфюмерии",
			prev: "../../portfolio/prev/neroly.jpg",
			link: "https://itd.company",
			proj: "../../portfolio/neroli-min.jpg",
		},
		{
			title: "Промо-сайт конференции SAY-IT",
			desc: "Шаблон",
			prev: "../../portfolio/prev/sayit.jpg",
			link: "https://itd.company",
			proj: "../../portfolio/sayit-min.jpg",
		},
		{
			title: "Rykhlova Accessorise",
			desc: "Одностраничный сайт для производителя аксессуаров",
			prev: "../../portfolio/prev/rykhlova.jpg",
			link: "https://rykhlova.com/",
			proj: "../../portfolio/ruklova-min.jpg",
		},
	]
	constructor() {
		makeAutoObservable(this)
	}
	create = async (e: IPortfolio): Promise<void> => {
		try {
			const { data } = await portfolioApi.create(e)
			if (data.status === "success") {
				this.portfolio.push(data.data)
				console.log(this.portfolio, data)
				alert("Данные сохранены!")
			}
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
	update = async (e: IPortfolio): Promise<void> => {
		try {
			const { data } = await portfolioApi.update(e)
			if (data.status === "success") {
				this.portfolio = this.portfolio.map((item) =>
					item._id === e._id ? (item = e) : item,
				)
				alert("Данные обновлены!")
			}
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
	delete = async (e: string): Promise<void> => {
		try {
			const { data } = await portfolioApi.delete(e)
			if (data.status === "success") {
				this.portfolio = this.portfolio.filter((item) => item._id !== e)
				alert("Данные удалены!")
			}
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
	fetchPortfolio = async (): Promise<void> => {
		try {
			const { data } = await portfolioApi.show()
			this.portfolio = data.data
			this.isLoad = true
		} catch (error) {
			console.error(`Ошибка: ${error}`)
		}
	}
}

export default new PortfolioStores()
