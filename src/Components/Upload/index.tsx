import React from "react"

import "./style.css"
type TUpImg = {
	lastModified?: number
	lastModifiedDate?: any
	name?: string
	size?: number
	type?: string
	webkitRelativePath?: string
}
type TUploadProps = {
	list?: TUpImg | string
	listArr?: TUpImg[]
	multiple?: boolean
	onChange?: (func: File | undefined) => void
}
const Upload: React.FC<TUploadProps> = ({
	list,
	listArr,
	multiple,
	onChange,
}): React.ReactElement => {
	multiple = false
	const preview = React.useRef<any>(null)
	const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files![0]
		preview.current = URL.createObjectURL(file)
		onChange!(file)
	}
	const delImage = (): void => {
		onChange!(undefined)
	}
	const nameUpdate = String(Math.round(Math.random()) + Date.now())
	return (
		<>
			{!list ? (
				<div className='uploadBox'>
					<input
						type='file'
						multiple={multiple}
						id={nameUpdate}
						className='upload_style'
						onChange={changeInput}
					/>
					<label htmlFor={nameUpdate} className='uploadLabel'>
						<span>+</span> Загрузить
					</label>
				</div>
			) : (
				<div className='previewImg'>
					<img
						alt=''
						src={
							list && typeof list === "string"
								? `http://localhost:5051/${list}`
								: preview.current
						}
					/>{" "}
					<span onClick={delImage}>Удалить</span>
				</div>
			)}
		</>
	)
}

export default Upload
