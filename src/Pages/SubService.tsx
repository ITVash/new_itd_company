import { observer } from "mobx-react-lite"
import React from "react"
import { Helmet } from "react-helmet"
import { Footer, Forms, Header } from "../Components"
import SubServiceStores from "../stores/subserviceStores"
import { ISubService } from "../Types"
import { useHistory, withRouter } from "react-router-dom"

import "./styles/sub.scss"
import { ArrowLeftOutlined } from "@ant-design/icons"
import NotFound from "./NotFound"

const SubService: React.FC = observer(
	(): React.ReactElement => {
		const history = useHistory()
		const base: ISubService[] = SubServiceStores!.subservice
		const [items, setItems] = React.useState<ISubService>()
		/* const find: ISubService = base.filter(
			(item) => item.title === i.current,
		)[0] */
		React.useEffect(() => {
			const { pathname } = window.location
			const uri = decodeURI(pathname.split("/").pop()!)
			setItems(base.filter((item) => item.title === uri)[0])
			console.log(uri, items)
		}, [base, items])
		React.useEffect(() => {
			!SubServiceStores.isLoad && SubServiceStores.fetchService()
		}, [])
		React.useEffect(() => {
			window.scrollTo(0, 0)
		}, [])
		if (base.length <= 0) {
			return <NotFound />
		}
		return (
			<>
				<Helmet>
					<title>{items ? items.title : "Услуги"} - ITD Company</title>
					<meta name='description' content={`Страница сайта - Услуги`} />
				</Helmet>
				<Header />
				<section className='subservices_screen'>
					<div className='wrapper'>
						<div className='services_container'>
							<div className='gradient_title'>
								<h2>{items && items.title}</h2>
							</div>
							<div
								className='shift_description'
								dangerouslySetInnerHTML={{
									__html: items! && items.body!,
								}}
							/>
						</div>
						<ArrowLeftOutlined
							onClick={() => {
								history.push("/services")
							}}
						/>
					</div>
				</section>
				<section className='subservices_description_container'>
					<div className='wrapper'>
						<div className='subservices_description'>
							<img
								src={`https://api.itd.company:5051/${items && items.img1!}`}
								alt=''
							/>
							<div
								className='description_text'
								dangerouslySetInnerHTML={{
									__html: items! && items.text1!,
								}}
							/>
						</div>
						<div className='subservices_description'>
							<img
								src={`https://api.itd.company:5051/${items && items.img2!}`}
								alt=''
							/>
							<div
								className='description_text'
								dangerouslySetInnerHTML={{
									__html: items! && items.text2!,
								}}
							/>
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
)

export default withRouter(SubService)
