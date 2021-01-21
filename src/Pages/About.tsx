import { observer } from "mobx-react-lite"
import React from "react"
import { Helmet } from "react-helmet"
import { Footer, Forms, Header } from "../Components"
import AboutStores from "../stores/aboutStores"
import { IAbout } from "../Types"

import "./styles/about.scss"
type TAbout = {
	contact?: boolean
}
const About: React.FC<TAbout> = observer(
	({ contact }): React.ReactElement => {
		const about: IAbout = AboutStores.about
		const [openSlide, setOpenSlide] = React.useState<boolean>(false)
		const scrollRef = React.useRef<HTMLDivElement>(null)
		const slider = React.useCallback(() => {
			let item = 0
			let str = ""
			const switcher = document.querySelector(".slide_switcher_constraint")
			const sliders: NodeListOf<HTMLElement> = document.querySelectorAll(
				".slide",
			)
			for (let i = 0; i < sliders.length; i++) {
				let offset = i * 100 + "%"
				sliders[i].style.left = offset
				str += '<span class="switcher_point"></span>'
			}
			if (openSlide) switcher!.innerHTML = str
			if (openSlide) switcher!.children[item].classList.add("active")
			const switchPoints = document.querySelectorAll(".switcher_point")
			const nextSlide = document.querySelector("#next_slide")
			const prevSlide = document.querySelector("#prev_slide")
			if (openSlide)
				nextSlide!.addEventListener("click", () => {
					item++
					prevSlide!.classList.remove("disable")
					if (item >= sliders.length - 1) {
						nextSlide!.setAttribute("class", "disable")
					}
					if (item > sliders.length - 1) {
						item--
					}
					sliders.forEach((point, id) => {
						let offset = (id - item) * 100 + "%"
						point.style.transition = "all .500s linear"
						setTimeout(() => (point.style.left = `${offset}`), 1)
					})
					switchPoints.forEach((item) => item.classList.remove("active"))
					switchPoints.item(item).classList.add("active")
				})
			if (openSlide)
				prevSlide!.addEventListener("click", () => {
					item--
					nextSlide!.classList.remove("disable")
					if (item <= 0) {
						prevSlide!.setAttribute("class", "disable")
					}
					if (item < 0) {
						item++
					}
					sliders.forEach((point, id) => {
						let offset = (id - item) * 100 + "%"
						point.style.transition = "all .500s linear"
						setTimeout(() => (point.style.left = `${offset}`), 1)
					})
					switchPoints.forEach((item) => item.classList.remove("active"))
					switchPoints.item(item).classList.add("active")
				})

			switchPoints.forEach((item, id) => {
				let iter: number
				item.addEventListener("click", () => {
					iter = id
					sliders.forEach((point, id) => {
						let offset = (id - iter) * 100 + "%"
						point.style.transition = "all .500s linear"
						setTimeout(() => (point.style.left = `${offset}`), 1)
					})
					switchPoints.forEach((item) => item.classList.remove("active"))
					switchPoints.item(iter).classList.add("active")
				})
			})
		}, [openSlide])
		React.useEffect(() => {
			slider()
		}, [slider])
		React.useEffect(() => {
			if (!AboutStores.isLoad) {
				AboutStores.fetchAbout()
			}
		}, [])
		React.useEffect(() => {
			if (contact) {
				window.scrollTo(
					0,
					document.querySelector(".App")?.clientHeight! -
						scrollRef.current!.clientHeight -
						document.querySelector("footer")?.clientHeight!,
				)
			} else {
				window.scrollTo(0, 0)
			}
		}, [contact])
		return (
			<>
				<Helmet>
					<title>О Нас - ITD Company</title>
					<meta name='description' content='Страница сайта - О Нас' />
				</Helmet>
				<Header />
				<div className='wrapper'>
					<div className='services_container'>
						<div className='gradient_title'>
							<h2>О нас</h2>
						</div>
					</div>
				</div>
				<div className='wrapper'>
					<section className='about_introduction'>
						<div className='about_container'>
							<div className='about'>
								<h2 dangerouslySetInnerHTML={{ __html: about.title! }}></h2>
								<div dangerouslySetInnerHTML={{ __html: about.desc! }} />
							</div>
						</div>
						<div className='about_img_container'>
							<img
								src={
									about &&
									about.photo1! &&
									`https://api.itd.company:5051/${about.photo1}`
								}
								alt='photo1'
							/>
						</div>
					</section>
				</div>

				{about && about.video && about.video!.length > 0 && (
					<div className='wrapper'>
						<video width='100%' height='auto' controls autoPlay>
							<source
								src={
									about && about.video! && about.video!.includes("upload")
										? `https://api.itd.company:5051/${about.video}`
										: about.video
								}
								type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
							/>
						</video>
					</div>
				)}

				<div className='wrapper'>
					<section className='slogan'>
						<div dangerouslySetInnerHTML={{ __html: about.why! }} />
						<div></div>
					</section>
				</div>

				<section className='photos'>
					<div className='wrapper'>
						<div className='photos_container'>
							<img
								src={
									about &&
									about.photo2! &&
									`https://api.itd.company:5051/${about.photo2}`
								}
								alt='photo2'
							/>
							<img
								src={
									about &&
									about.photo3! &&
									`https://api.itd.company:5051/${about.photo3}`
								}
								alt='photo3'
							/>
						</div>
						<button id='how_we_work' onClick={() => setOpenSlide(true)}>
							Как мы работаем
						</button>
					</div>
				</section>

				<section className='contact_form index_contacts_light' ref={scrollRef}>
					<div className='wrapper'>
						<div className='wrapper_form'>
							<div className='gradient_title'>
								<h2>Контакты</h2>
							</div>
							<div className='contacts'>
								<div>
									<div className='title'>Позвоните нам</div>
									<div className='gradient_contact'>{about.phone}</div>
								</div>
								<div>
									<div className='title'>Или напишите нам</div>
									<div className='gradient_contact'>{about.email}</div>
								</div>
							</div>

							<div className='index_contacts index_contacts_light'>
								<h2>Или оставьте заявку и мы свяжемся с Вами!</h2>
								<Forms />
							</div>
						</div>
					</div>
				</section>

				{openSlide && (
					<section id='how_we_work_form'>
						<img
							src='/img/close_form.png'
							alt=''
							id='close_how_form'
							style={{ opacity: "70%" }}
							onClick={() => setOpenSlide(false)}
						/>
						<div className='how_we_work_wrapper'>
							<img src='/img/prev_slide_blue.png' alt='prev' id='prev_slide' />
							<img src='/img/next_slide_blue.png' alt='next' id='next_slide' />

							<div className='gradient_title'>
								<h2>КАК МЫ РАБОТАЕМ</h2>
							</div>

							<div id='how_we_work_slider'>
								{about.work!.length &&
									about.work!.map((item, index) => (
										<div className='slide' key={index + Date.now()}>
											<div className='content_container'>
												<div
													className='slider_image'
													style={{
														background: `url(https://api.itd.company:5051/${item.icon})`,
													}}></div>
												<div className='slide_info'>
													<div className='number'>
														{index + 1 <= 9 ? "0" : ""}
														{index + 1}
													</div>
													<p>{item.title}</p>
												</div>
												<div className='number_mobile'>
													{index + 1 <= 9 ? "0" : ""}
													{index + 1}
												</div>
											</div>
										</div>
									))}
							</div>
							<div className='slide_switcher'>
								<span className='slide_switcher_constraint'></span>
							</div>
						</div>
					</section>
				)}

				<Footer />
			</>
		)
	},
)

export default About
