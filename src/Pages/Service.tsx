/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite"
import React from "react"
import { Helmet } from "react-helmet"
import {
	Footer,
	Forms,
	Header,
	ServiceBody,
	ServiceContainer,
} from "../Components"
import homeStores from "../stores/homeStores"
import serviceStores from "../stores/serviceStores"
import { IHome, IService } from "../Types"

const Service: React.FC = observer(
	(): React.ReactElement => {
		const itemRef = React.useRef<HTMLElement | any>(null)
		const [service, setService] = React.useState<boolean>(false)
		const [count, setCount] = React.useState<number>(0)
		const serviceBase: IService[] = serviceStores.service
		const home: IHome = homeStores.home[0]
		let slidesType = null

		const onClickHandler = React.useCallback(() => {
			let index = 0
			const serviceItem = document.querySelectorAll(".service_item")
			const prevSlide = document.querySelector("#prev_slide")
			const nextSlide = document.querySelector("#next_slide")
			const slide = itemRef
			/**
			 * Обработка нажатия а услугу и показ нужного типа услуги
			 */
			serviceItem.forEach((item, id) => {
				item.addEventListener("click", () => {
					index = id
					setCount(id)
					setService(true)
					slidesType =
						slide.current && slide.current.querySelectorAll(".services_slider")
					slidesType!.forEach((sliden: HTMLElement, i: number) => {
						let offset = (i - id) * 100 + "%"
						setTimeout(() => (sliden.style.left = offset), 1)
					})
					document.querySelector("#slide_number")!.textContent =
						"0" + (index + 1) + ""
				})
			})
			/**
			 * Отработчик скрола назад
			 */
			index = count
			if (service)
				prevSlide!.addEventListener("click", () => {
					index--
					setCount(index < 0 ? 0 : index)
					nextSlide!.classList.remove("disable")
					if (index <= 0) {
						prevSlide!.classList.add("disable")
					}
					if (index < 0) {
						index++
					}
					slidesType = slide.current!.querySelectorAll(".services_slider")
					slidesType.forEach((sliden: HTMLElement, i: number) => {
						let offset = (i - index) * 100 + "%"
						sliden.style.transition = "all .500s linear"
						setTimeout(() => (sliden.style.left = offset), 1)
					})
					document.querySelector("#slide_number")!.textContent =
						"0" + (index + 1) + ""
				})
			/**
			 * Обработчик слайдера некст
			 */
			if (service)
				nextSlide!.addEventListener("click", () => {
					index++
					slidesType = slide.current!.querySelectorAll(".services_slider")
					setCount(
						index > slidesType.length - 1 ? slidesType.length - 1 : index,
					)
					prevSlide!.classList.remove("disable")
					if (index >= slidesType.length - 1) {
						nextSlide!.classList.add("disable")
					}
					if (index > slidesType.length - 1) {
						index--
					}
					slidesType.forEach((sliden: HTMLElement, i: number) => {
						let offset = (i - index) * 100 + "%"
						sliden.style.transition = "all .500s linear"
						setTimeout(() => (sliden.style.left = offset), 1)
					})
					document.querySelector("#slide_number")!.textContent =
						"0" + (index + 1) + ""
				})
			/**
			 * Делаем треугольные типы услуг))
			 */
			if (service) {
				let webTypes = slide.current!.querySelectorAll(".web_design")
				let ul = webTypes.item(count)
				let subItem = ul.childNodes
				if (window.innerWidth > 800) {
					let width_circle = ul.querySelector(".number")!.clientWidth
					let cur_x = width_circle + 25
					let step = subItem[1].offsetTop - subItem[0].offsetTop
					subItem.forEach((item: HTMLElement, id: number) => {
						if (subItem.length % 2 === 0) {
							if (subItem.length / (id + 1) >= 2) {
								let res = -cur_x + "px"
								setTimeout(
									() => (item.style.cssText = `margin-left: ${res}`),
									1,
								)
								cur_x += step
							} else {
								cur_x -= step
								let res = -cur_x + "px"
								setTimeout(
									() => (item.style.cssText = `margin-left: ${res}`),
									1,
								)
							}
						} else {
							if (Math.ceil(subItem.length / (id + 1)) > 2) {
								let res = -cur_x + "px"
								setTimeout(
									() => (item.style.cssText = `margin-left: ${res}`),
									1,
								)
								cur_x += step
							} else {
								let res = -cur_x + "px"
								setTimeout(
									() => (item.style.cssText = `margin-left: ${res}`),
									1,
								)
								cur_x -= step
							}
						}
					})
					/**
					 * Квадрат
					 */
					let height = ul.clientHeight / Math.sqrt(2)
					let width = ul.clientHeight / Math.sqrt(2)
					let rec = slide.current!.querySelectorAll(".rectangle").item(count)
					rec.style.cssText = `width: ${
						height > width ? height : width
					}px; height: ${height > width ? height : width}px;`
					let top_offset = (ul.clientHeight - rec.clientHeight) / 2
					rec.style.top = `${top_offset}px`
					rec.style.left = `${-rec.clientHeight / 2}px`
				}
			}
		}, [service, count])

		React.useEffect(() => {
			onClickHandler()
		}, [onClickHandler])
		React.useEffect(() => {
			window.scrollTo(0, 0)
		}, [])

		React.useEffect(() => {
			!serviceStores.isLoad && serviceStores.fetchService()
		}, [])

		return (
			<>
				<Helmet>
					<title>Услуги - ITD Company</title>
					<meta name='description' content='Страница сайта - Услуги' />
				</Helmet>
				<Header />
				<section className='services_screen'>
					<div className='wrapper'>
						<div className='services_container'>
							<div className='gradient_title'>
								<h2>Услуги</h2>
							</div>
							<div
								className='shift_description light_text'
								dangerouslySetInnerHTML={{ __html: home && home.serviceDesc! }}
							/>
							<div className='services'>
								{serviceBase &&
									serviceBase.map((item, index) => (
										<article className='service_item' key={index + Date.now()}>
											<span>
												<div className='top_part'>
													<h4 className='service_title'>{item.title}</h4>
												</div>
												<div className='bottom_part'>
													<div className='services_number'>
														{index + 1 <= 9 ? "0" : ""}
														{index + 1}
													</div>
												</div>
											</span>
										</article>
									))}
							</div>
						</div>
					</div>
				</section>
				<section className='index_contacts index_contacts_light'>
					<div className='wrapper'>
						<h2>
							Оставьте заявку <br /> и мы с Вами свяжемся!
						</h2>
						<Forms />
					</div>
				</section>
				{service && (
					<ServiceContainer
						numb={null}
						close={() => setService(false)}
						refs={itemRef}>
						{serviceBase &&
							serviceBase.map((item, id) => (
								<ServiceBody
									key={id}
									title={item.title}
									img={item.background}
									items={item.subService}
								/>
							))}
					</ServiceContainer>
				)}
				<Footer />
			</>
		)
	},
)

export default Service
