import { observer } from "mobx-react-lite"
import React from "react"
import { Route, Switch } from "react-router-dom"
import { userApi } from "./api"
import About from "./Pages/About"
import Admin from "./Pages/Admin"
import Home from "./Pages/Home"
import Portfolio from "./Pages/Portfolio"
import Service from "./Pages/Service"
import SiteType from "./Pages/SiteType"
import SubService from "./Pages/SubService"
import HomeStores from "./stores/homeStores"
import ServiceStores from "./stores/serviceStores"
import SubserviceStores from "./stores/subserviceStores"
import userStores from "./stores/userStores"
/**
 * ToDo
 * 1. Дописать недостоющие акшены в бизнес-логике фронта
 * 2. Сдать в тестирование и в продакшн
 * 3. Повесить на кнопку установку, без подписки и пуш-уведомлений
 */

const App: React.FC = observer(
	(): React.ReactElement => {
		React.useEffect(() => {
			if (!HomeStores.isLoad) {
				HomeStores!.fetchItems()
			}
			if (!ServiceStores.isLoad) {
				ServiceStores!.fetchService()
			}
			if (!SubserviceStores.isLoad) {
				SubserviceStores!.fetchService()
			}
		}, [])
		React.useEffect(() => {
			userApi.show()
			userStores.getMe()
		}, [])
		return (
			<div className='App'>
				<Switch>
					<Route path='/manager' exact component={Admin} />
					<Route path='/' exact component={Home} />
					<Route path='/about' exact component={About} />
					<Route path='/portfolio' exact component={Portfolio} />
					<Route
						path='/portfolio/:id'
						exact
						render={() => <Portfolio view />}
					/>
					<Route path='/services' exact component={Service} />
					<Route path='/services/:id' exact component={SubService} />
					<Route path='/type-site' exact component={SiteType} />
				</Switch>
			</div>
		)
	},
)
export default App
