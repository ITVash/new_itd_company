import { makeAutoObservable } from "mobx"
import { aboutApi } from "../api"
import { IAbout, TAdvant } from "../Types"
class AboutStores {
	isLoad: boolean = false
	about: IAbout = {
		title: `МЫ БОЛЬШЕ,<br />ЧЕМ ПРОСТО КОМПАНИЯ`,
		desc: `<p>Веб-студия International Techno Dynamics создана в 2019 году. В
    ней работает дружный коллектив, который действует сообща. Наши
    сотрудники ответственно относятся к своему ремеслу. Они
    настоящие специалисты в сфере веб-разработки, графическом
    дизайне, SEO, SMM, (креативные дизайнеры, профессиональные
    программисты.) Каждый работник любит свою профессию и следит за
    трендами в своей сфере деятельности, поэтому компания
    поддерживает и задает новые направления, постоянно разрабатывает
    новые решения. Все работники веб-студии являются
    профессионалами, ведь они отдали профессии немало лет.
  </p>`,
		photo1: "/img/ITD_1.jpg",
		why:
			"Новые технологии, творческий подход и желание всегда быть на шаг впереди — основные принципы работы нашего агентства. Тут не нужно лишних слов, просто посмотрите раздел проектов — они говорят за нас.",
		photo2: "/img/ITD2.jpg",
		photo3: "/img/ITD3.jpg",
		phone: "+79064187882",
		email: "itdwebcompany@gmail.com",
		work: [
			{
				icon: "/how/checklist.svg",
				title: "Заполнение чек-листа",
			},
			{
				icon: "/how/srs.svg",
				title: "Формирование первичного ТЗ на основании полученной информации",
			},
			{
				icon: "/how/discussion.svg",
				title:
					"Обсуждение вопросов и нюансов, согласование с заказчиком цены и сроков",
			},
			{
				icon: "/how/srs-agreement.svg",
				title: "Утверждение заказчиком финального ТЗ",
			},
			{
				icon: "/how/contract.svg",
				title: "Заключение договора",
			},
			{
				icon: "/how/website.svg",
				title: "Разработка макетов дизайна сайта",
			},
			{
				icon: "/how/website-agreement.svg",
				title: "Согласование макетов с заказчиком",
			},
			{
				icon: "/how/frontend.svg",
				title: "Верстка макетов",
			},
			{
				icon: "/how/backend.svg",
				title: "Бэкенд, разработка функционала сайта",
			},
			{
				icon: "/how/testing.svg",
				title: "Тестирование проекта, при необходимости правки в проекте",
			},
			{
				icon: "/how/presentation.svg",
				title: "Демонстрация проекта заказчику",
			},
			{
				icon: "/how/documentation.svg",
				title: "Создание документации",
			},
			{
				icon: "/how/hosting.svg",
				title: "Размещение сайта на хостинге",
			},
			{
				icon: "/how/presentation.svg",
				title: "Прием работы от заказчика",
			},
			{
				icon: "/how/finish.svg",
				title: "Завершение проекта",
			},
		],
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
		this.about.work = [...this.about.work!, obj]
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
