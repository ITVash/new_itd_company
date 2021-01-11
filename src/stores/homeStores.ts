import { observable, action, computed } from "mobx"
import { IHome } from "../Types"

class HomeStores {
	@observable private home: IHome = {
		whyWe: `<p>Мы придерживаемся принципу индивидуального подхода к каждому	проекту, любой наш проект уникален.</p><p>Мы создаем сайты для бизнеса, которые будут работать на вас.</p><p>Мы всегда стремимся найти самые конкурентоспособные решения и	достичь самого высокого уровня эффективности по всем проектам.</p><p>Мы создаем landing, корпоративный сайт, интернет – магазин любой сложности.</p><p>Мы продвигаем сайты на всех интернет- площадках.</p><p>Заказать создание сайта от веб - студии International Techno Dynamics, значит доверить свой имидж лучшим.</p>`,
		advantages: [
			{
				title: "Эффективность",
				icon: "/img/advantages_cool.png",
			},
			{
				title: "Креативные идеи",
				icon: "/img/advantages_pencil.png",
			},
			{
				title: "Оптимизация",
				icon: "/img/advantages_cubok.png",
			},
			{
				title: "Стратегия",
				icon: "/img/advantages_tool.png",
			},
			{
				title: "Работа на результат",
				icon: "/img/advantages_clock.png",
			},
			{
				title: "Работаем без шаблонов",
				icon: "/img/advantages_patern.png",
			},
		],
		fb: "https://www.facebook.com/itdwebcompany/?modal=admin_todo_tour",
		inst: "https://www.instagram.com/itd_company/",
		vk: "https://vk.com/itd.company",
		be: "",
	}

	@computed
	get getHomeInfo() {
		return this.home
	}

	@action setItems = (item: IHome): void => {
		this.home = item
	}
}

export default HomeStores
