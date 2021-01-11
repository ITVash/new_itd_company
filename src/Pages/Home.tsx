import { inject, observer } from "mobx-react"
import React from "react"
import { Helmet } from "react-helmet"

import { Footer, Forms, Header, Clickbait } from "../Components"
import HomeStores from "../stores/homeStores"
import { IHome } from "../Types"
import "./styles/home.scss"
interface IHomeProps {
	homeStores?: HomeStores
}
const Home: React.FC<IHomeProps> = inject("homeStores")(
	observer(
		({ homeStores }): React.ReactElement => {
			const items: IHome = homeStores!.getHomeInfo
			const [click, setClick] = React.useState<boolean>(false)
			return (
				<>
					<Helmet>
						<title>Главная - ITD Company</title>
						<meta name='description' content='Главная страница сайта' />
					</Helmet>
					<Header />
					<section className='index_main_screen'>
						<div className='wrapper'>
							<div className='index_main_screen_content_container'>
								<div className='index_main_screen_logo_container'>
									<img src='/img/logo_172.png' alt='logo' />
								</div>
								<div className='index_main_screen_name_container'>
									<h1>
										international
										<br />
										techno
										<br />
										dynamics
									</h1>
									<h2>Команда специалистов, которая впечатляет!</h2>
									<div className='index_main_screen_text'>
										Ответьте всего на 5 вопросов
										<br />и узнайте цену Вашего сайта
									</div>
									<button
										className='main_screen_button'
										onClick={() => setClick(true)}>
										Узнать цену
									</button>
								</div>
								<div className='index_main_screen_img_container'>
									<img src='/img/index_main_img.png' alt='img' />
								</div>
							</div>
						</div>
					</section>
					<section className='index_advantages_screen'>
						<div className='wrapper'>
							<div className='gradient_title'>
								<h2>
									Наши
									<br />
									преимущества
								</h2>
							</div>
						</div>
						<div className='index_advantages'>
							{items &&
								items.advantages!.map((item, index) => (
									<div
										className='index_advantages_item'
										key={index + Date.now()}>
										<div className='index_advantages_item_number'>
											0{index + 1}
										</div>
										<div className='index_advantages_item_icon'>
											<img
												src={item.icon}
												alt=''
												className='index_advantages_icon'
											/>
											<div className='index_advantages_item_title'>
												{item.title}
											</div>
										</div>
									</div>
								))}
						</div>
					</section>
					<section className='index_why_we'>
						<div className='wrapper'>
							<h2>Почему мы?</h2>
							<div className='shift_description'>
								{window.innerWidth >= 100 && (
									<div
										dangerouslySetInnerHTML={{
											__html: items.whyWe!,
										}}
									/>
								)}
								{window.innerWidth <= 100 && (
									<div
										dangerouslySetInnerHTML={{
											__html: items.whyWe!.substr(0, 99),
										}}
									/>
								)}
							</div>
						</div>
					</section>
					<section className='index_contacts'>
						<div className='wrapper'>
							<h2>
								Оставьте заявку
								<br />и мы с Вами свяжемся!
							</h2>
							<Forms />
							<p className='centrus'>
								<button className='downloadBtn'>Скачать</button>
							</p>
						</div>
					</section>
					<Footer />
					{click && <Clickbait setCheck={setClick} check={click} />}
				</>
			)
		},
	),
)

export default Home
