import classNames from "classnames"
import { observer } from "mobx-react-lite"
import React from "react"
import { Helmet } from "react-helmet"
import { Clickbait, Footer, Header } from "../Components"
import { Collapse } from "antd"

import "./styles/typesite.scss"
import SiteTypeStores from "../stores/siteTypeStores"
import { ISiteType } from "../Types"

const SiteType: React.FC = observer(
	(): React.ReactElement => {
		const types: ISiteType[] = SiteTypeStores.sitetype
		const [check, setCheck] = React.useState<boolean>(false)
		const [activ, setActiv] = React.useState<number>(1)
		const [typeSite, setTypeSite] = React.useState<ISiteType | null>(null)
		/* const [mobi, setMobi] = React.useState<boolean>(false) */
		React.useEffect(() => {
			!SiteTypeStores.isLoad && SiteTypeStores.fetchService()
		}, [])
		React.useEffect(() => {
			if (types.length) {
				setTypeSite(types[0])
			}
		}, [types])
		return (
			<>
				<Helmet>
					<title>Типы сайтов - ITD Company</title>
					<meta name='description' content='Страница сайта - Типы сайтов' />
				</Helmet>
				<Header />
				<div className='index_contacts_light'>
					<div className='wrapper'>
						<div className='services_container '>
							<div className='gradient_title'>
								<h2>Типы сайтов</h2>
							</div>
						</div>
					</div>
				</div>
				<div className='index_contacts_light'>
					<div className='wrapper types_site_container'>
						<Collapse className='types' accordion>
							{types &&
								types.map((item, index) => (
									<Collapse.Panel
										showArrow={false}
										className={classNames("types_item", {
											active: activ === index + 1,
										})}
										header={
											<div
												className='types_item_header'
												onClick={(e) => {
													setActiv(index + 1)
													setTypeSite(item)
													if (window.innerWidth > 800) e.stopPropagation()
													window.scrollTo(0, e.pageY)
												}}>
												<img
													src={`http://localhost:5051/${item.icon}`}
													alt=''
													className='type_icon'
												/>
												<p>{item.title}</p>
											</div>
										}
										key={index + 1}>
										<>
											<div
												className='description'
												dangerouslySetInnerHTML={{ __html: item.desc! }}
											/>
											<div className='images'>
												{item.example!.length &&
													item.example!.map((image, index) => (
														<a href='/' key={index + Date.now()}>
															<img
																src={`http://localhost:5051/${image}`}
																alt=''
															/>
														</a>
													))}
											</div>
										</>
									</Collapse.Panel>
								))}
							<button id='view_check_list' onClick={() => setCheck(true)}>
								Заполнить чек-лист
							</button>
						</Collapse>
						<div id='type_description_container'>
							{typeSite && (
								<div
									className={classNames(
										"type_description",
										"type_description_mobile",
										{ active: true },
									)}>
									<div className='description'>
										<div dangerouslySetInnerHTML={{ __html: typeSite.desc! }} />
									</div>
									<div className='images'>
										{typeSite.example!.length &&
											typeSite.example!.map((image, index) => (
												<a href='/' key={index + Date.now()}>
													<img src={`http://localhost:5051/${image}`} alt='' />
												</a>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{check && <Clickbait setCheck={setCheck} check={check} />}
				<Footer />
			</>
		)
	},
)

export default SiteType
