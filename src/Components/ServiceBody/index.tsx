import React from "react"
import { Link } from "react-router-dom"
import { ISubService } from "../../Types"

interface IServiceBody {
	title?: string
	img?: string
	items?: ISubService[]
	rec?: any
}

const ServiceBody: React.FC<IServiceBody> = ({
	img,
	items,
	title,
	rec,
}): React.ReactElement => {
	return (
		<div className='services_slider'>
			<h3 className='title'>{title}</h3>
			<img
				className='background_img'
				src={`https://api.itd.company:5051/${img}`}
				alt={title}
			/>
			<nav>
				<div className='rectangle'>{rec}</div>
				<ul className='web_design'>
					{items &&
						items.map((item, id) => (
							<Link key={id} to={`/services/${item.title}`}>
								<li>
									<span className='number'>{id + 1}</span>
									<span className='subitem'>{item.title}</span>
								</li>
							</Link>
						))}
				</ul>
			</nav>
		</div>
	)
}

export default ServiceBody
