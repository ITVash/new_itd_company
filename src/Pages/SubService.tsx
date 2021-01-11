import { inject, observer } from "mobx-react"
import React from "react"
import { Helmet } from "react-helmet"
import { Footer, Forms, Header } from "../Components"
import SubServiceStores from "../stores/subserviceStores"
import { ISubService } from "../Types"

interface ISubServiceProps {
	subserviceStores: SubServiceStores
}

const SubService: React.FC<ISubServiceProps> = inject("subserviceStores")(
	observer(
		({ subserviceStores }): React.ReactElement => {
			const base: ISubService[] = subserviceStores!.getServiceInfo
			const find: string = decodeURI(window.location.pathname.split("/").pop()!)
			const items: ISubService = base.filter((item) => item.title === find)[0]
			React.useEffect(() => {
				window.scrollTo(0, 0)
			}, [])
			return (
				<>
					<Helmet>
						<title>{items.title} - ITD Company</title>
						<meta name='description' content={`Страница сайта - Услуги`} />
					</Helmet>
					<Header />
					<section className='subservices_screen'>
						<div className='wrapper'>
							<div className='services_container'>
								<div className='gradient_title'>
									<h2>{items && items.title}</h2>
								</div>
								<div className='shift_description'>{items && items.body}</div>
							</div>
						</div>
					</section>
					<section className='subservices_description_container'>
						<div className='wrapper'>
							<div className='subservices_description'>
								<img src={items && items.img1} alt='' />
								<div className='description_text'>
									<p>{items && items.text1}</p>
								</div>
							</div>

							<div className='subservices_description'>
								<img src={items && items.img2} alt='' />
								<div className='description_text'>
									<p>{items && items.text2}</p>
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
					<Footer />
				</>
			)
		},
	),
)

export default SubService
