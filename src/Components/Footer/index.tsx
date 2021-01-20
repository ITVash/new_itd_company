/* eslint-disable react/jsx-no-target-blank */
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import HomeStores from "../../stores/homeStores"
import { IHome } from "../../Types"

import "./style.scss"

const Footer: React.FC = observer(
	(): React.ReactElement => {
		const items: IHome = HomeStores.home[0]
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
							<Link to='/contacts'>Контакты</Link>
						</li>
					</ul>
				</nav>
				<section className='wrapper'>
					<ul>
						{items && items.be && items.be!.length > 0 && (
							<li>
								<a href={items.be} target='_blank'>
									<img src='/img/soc_be.png' alt='' />
								</a>
							</li>
						)}
						{items && items.fb && items.fb.length > 0 && (
							<li>
								<a href={items.fb} target='_blank'>
									<img src='/img/soc_face.png' alt='' />
								</a>
							</li>
						)}
						{items && items.inst && items.inst.length > 0 && (
							<li>
								<a href={items.inst} target='_blank'>
									<img src='/img/soc_inst.png' alt='' />
								</a>
							</li>
						)}
						{items && items.tg && items.tg.length > 0 && (
							<li>
								<a href={items.tg} target='_blank'>
									<img src='/img/soc_tg.png' alt='' />
								</a>
							</li>
						)}
						{items && items.vk && items.vk.length > 0 && (
							<li>
								<a href={items.vk} target='_blank'>
									<img src='/img/soc_vk.png' alt='' />
								</a>
							</li>
						)}
						{items && items.pin && items.pin.length > 0 && (
							<li>
								<a href={items.pin} target='_blank'>
									<img src='/img/soc_pin.png' alt='' />
								</a>
							</li>
						)}
						{items && items.twit && items.twit.length > 0 && (
							<li>
								<a href={items.twit} target='_blank'>
									<img src='/img/soc_twit.png' alt='' />
								</a>
							</li>
						)}
						{items && items.youtube && items.youtube.length > 0 && (
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
	},
)

export default Footer
