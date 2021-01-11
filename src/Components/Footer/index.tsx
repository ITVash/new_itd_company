/* eslint-disable react/jsx-no-target-blank */
import { inject, observer } from "mobx-react"
import React from "react"
import { Link } from "react-router-dom"
import HomeStores from "../../stores/homeStores"
import { IHome } from "../../Types"

import "./style.scss"
interface IFooterProps {
	homeStores?: HomeStores
}
const Footer: React.FC<IFooterProps> = inject("homeStores")(
	observer(({ homeStores }) => {
		const items: IHome = homeStores!.getHomeInfo
		return (
			<footer>
				<nav>
					<ul className='wrapper'>
						<li>
							<Link to='/'>Главная</Link>
						</li>
						<li>
							<Link to='/about'>О нас</Link>
						</li>
						<li>
							<Link to='/services'>Услуги</Link>
						</li>
						<li>
							<Link to='/portfolio'>Портфолио</Link>
						</li>
						<li>
							<Link to='/about'>Контакты</Link>
						</li>
					</ul>
				</nav>
				<section className='wrapper'>
					<ul>
						{items.be && items.be!.length > 0 && (
							<li>
								<a href={items.be} target='_blank'>
									<img src='/img/soc_be.png' alt='' />
								</a>
							</li>
						)}
						{items.fb && items.fb.length > 0 && (
							<li>
								<a href={items.fb} target='_blank'>
									<img src='/img/soc_face.png' alt='' />
								</a>
							</li>
						)}
						{items.inst && items.inst.length > 0 && (
							<li>
								<a href={items.inst} target='_blank'>
									<img src='/img/soc_inst.png' alt='' />
								</a>
							</li>
						)}
						{items.tg && items.tg.length > 0 && (
							<li>
								<a href={items.tg} target='_blank'>
									<img src='/img/soc_tg.png' alt='' />
								</a>
							</li>
						)}
						{items.vk && items.vk.length > 0 && (
							<li>
								<a href={items.vk} target='_blank'>
									<img src='/img/soc_vk.png' alt='' />
								</a>
							</li>
						)}
						{items.pin && items.pin.length > 0 && (
							<li>
								<a href={items.pin} target='_blank'>
									<img src='/img/soc_pin.png' alt='' />
								</a>
							</li>
						)}
						{items.twit && items.twit.length > 0 && (
							<li>
								<a href={items.twit} target='_blank'>
									<img src='/img/soc_twit.png' alt='' />
								</a>
							</li>
						)}
						{items.youtube && items.youtube.length > 0 && (
							<li>
								<a href={items.youtube} target='_blank'>
									<img src='/img/soc_you.png' alt='' />
								</a>
							</li>
						)}
					</ul>
				</section>
			</footer>
		)
	}),
)

export default Footer
