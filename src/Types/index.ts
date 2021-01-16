export type TImage = {
	destination?: string
	encoding?: string
	fieldname?: string
	filename?: string
	mimetype?: string
	originalname?: string
	path?: string
	size?: number
}

export type TAdvant = {
	_id?: string
	title: string
	icon?: string
}

export interface IHome {
	_id?: string
	advantages?: TAdvant[]
	serviceDesc?: string
	whyWe?: string
	vk?: string
	fb?: string
	inst?: string
	be?: string
	tg?: string
	pin?: string
	twit?: string
	youtube?: string
}

export interface IAbout {
	_id?: string
	title?: string
	desc?: string
	why?: string
	photo1?: string
	photo2?: string
	photo3?: string
	video?: string
	phone?: string
	email?: string
	work?: TAdvant[]
}

export interface IPortfolio {
	_id?: string
	title?: string
	desc?: string
	proj?: string
	prev?: string
	link?: string
}

export interface ISubService {
	_id?: string
	title?: string
	body?: string
	img1?: string
	img2?: string
	text1?: string
	text2?: string
}

export interface IService {
	_id?: string
	background?: string
	title?: string
	subService?: ISubService[]
}

export interface ISiteType {
	_id?: string
	title?: string
	desc?: string
	icon?: string
	example?: string[]
}
