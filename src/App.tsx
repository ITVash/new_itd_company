import React from "react"
import { Route, Switch } from "react-router-dom"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Portfolio from "./Pages/Portfolio"
import Service from "./Pages/Service"
import SiteType from "./Pages/SiteType"
import SubService from "./Pages/SubService"
/**
 * ToDo
 * 1. Сделать типы сайтов (50%)
 * 2. Приступить к админке (Примерный стек: верстка с помощью ант дизайна)
 * 3. Написать серверную часть под все модули, интерфейсы взять с фронта
 * 4. Дописать недостоющие акшены в бизнес-логике фронта
 * 5. Сдать в тестирование и в продакшн
 * 6. Повесить на кнопку установку, без подписки и пуш-уведомлений
 */
const App: React.FC = (): React.ReactElement => {
	return (
		<div className='App'>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/about' exact component={About} />
				<Route path='/portfolio' exact component={Portfolio} />
				<Route path='/portfolio/:id' exact render={() => <Portfolio view />} />
				<Route path='/services' exact component={Service} />
				<Route path='/services/:id' exact component={SubService} />
				<Route path='/type-site' exact component={SiteType} />
			</Switch>
		</div>
	)
}

export default App
