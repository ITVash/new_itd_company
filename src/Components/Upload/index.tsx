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
enum ETypes {
	image,
	videos,
}
type TUploadProps = {
	list?: TUpImg | string
	listArr?: any[]
	multiple?: boolean
	onChange?: (func: File | any | undefined) => void
	type?: ETypes
}
const Upload: React.FC<TUploadProps> = ({
	list,
	listArr,
	multiple,
	onChange,
	type,
}): React.ReactElement => {
	const preview = React.useRef<any | any[]>(null)
	const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!multiple) {
			const file = e.target.files![0]
			preview.current = URL.createObjectURL(file)
			onChange!(file)
		} else {
			const file = e.target.files!
			for (let i = 0; i < file.length; i++) {
				const item = file[i]
				onChange!((prev: any[]) => prev.concat(item))
			}
		}
	}
	const delImage = (): void => {
		onChange!(undefined)
	}
	const delImageArr = (id: number): void => {
		onChange!((prev: any[]) => prev.filter((item, index) => index !== id))
	}
	const nameUpdate = String(Math.round(Math.random() * 10) + Date.now())
	console.log("type", type)

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
			) : type === 1 ? (
				<div className='previewImg'>
					<video height='100px' width='100px'>
						<source
							src={
								list && typeof list === "string"
									? `http://localhost:5051/${list}`
									: preview.current
							}
						/>
					</video>
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

			{multiple && listArr?.length && (
				<div style={{ display: "flex" }}>
					{listArr &&
						listArr.map((item, index) => (
							<div className='previewImg multiple' key={index + Date.now()}>
								<img
									alt=''
									src={
										listArr && typeof listArr[0] === "string"
											? `http://localhost:5051/${item}`
											: URL.createObjectURL(item)
									}
								/>{" "}
								<span onClick={() => delImageArr(index)}>Удалить</span>
							</div>
						))}
					{/* <div className='uploadBox'>
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
					</div> */}
				</div>
			)}
		</>
	)
}

export default Upload
