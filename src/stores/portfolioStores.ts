import { observable, action, computed } from "mobx"
import { IPortfolio } from "../Types"

class PortfolioStores {
	@observable private portfolio: IPortfolio[] = [
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

	@computed
	get getPortfolioInfo() {
		return this.portfolio
	}

	@action setItems = (item: IPortfolio[]): void => {
		this.portfolio = item
	}
}

export default PortfolioStores
