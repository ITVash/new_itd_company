import { makeAutoObservable } from "mobx"
import { IUser } from "../Types"
import jwtDecode from "jwt-decode"
import { userApi } from "../api"

class UserStores {
	user: IUser = {}
	login: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	getMe = async (): Promise<void> => {
		try {
			const token = localStorage.getItem("token")
			if (token) {
				const dec: any = await jwtDecode(token)
				if (dec!.exp * 1000 > Date.now()) {
					const get = await userApi.getMe()
					this.login = true
					this.user = get.data.data
				} else {
					this.user = {}
					this.login = false
					localStorage.removeItem("token")
				}
			}
		} catch (error) {
			console.error(`Ошибка получения токена: ${error}`)
		}
	}

	signIn = async (data: {
		username?: string
		password?: string
	}): Promise<void> => {
		try {
			const signin = await userApi.signIn(data)
			if (signin.data.status === "success") {
				const token = signin.data.data.token
				localStorage.setItem("token", token)
				this.user = signin.data.data
				this.login = true
			} else {
				alert("Не правильный пароль!")
			}
		} catch (error) {
			console.error(`Ошибка авторизации: ${error}`)
		}
	}
}

export default new UserStores()
