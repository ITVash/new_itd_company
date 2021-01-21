importScripts("workbox-v5.1.3/workbox-sw.js")
workbox.setConfig({ modulePathPrefix: "workbox-v5.1.3/" })

const dataCacheConfig = {
	cacheName: "meme-data",
}

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

workbox.routing.registerRoute(
	/.*about/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)
workbox.routing.registerRoute(
	/.*/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)
workbox.routing.registerRoute(
	/.*portfolio/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)
workbox.routing.registerRoute(
	/.*services/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)
workbox.routing.registerRoute(
	/.*subservices/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)
workbox.routing.registerRoute(
	/.*type-site/,
	new workbox.strategies.NetworkFirst(dataCacheConfig),
	"GET",
)

workbox.routing.registerRoute(
	({ request }) => request.destination === "image",
	new workbox.strategies.NetworkFirst({ cacheName: "meme-images" }),
	"GET",
)

let defenderPrompt
const installApp = () => {
	defenderPrompt.prompt()
	defenderPrompt.userChoice.then((choice) => {
		if (choice.outcome === "accepted") {
			//alert('Приложение установлено')
			console.log("Приложение установленно")
		} else {
			console.log("Не удается установить приложение")
		}
		defenderPrompt = null
	})
}
self.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault()
	console.log("platform", e)
	defenderPrompt = e
	const install = document.querySelector(".downloadBtn")
	install.addEventListener("click", (d) => {
		d.preventDefault()
		installApp()
	})
})

self.addEventListener("install", (e) => {
	const channel = new BroadcastChannel("service-worker-channel")
	channel.postMessage({ promptToReload: true })
	channel.onmessage = (message) => {
		if (message.data.skipWaiting) {
			self.skipWaiting()
		}
	}
	//e.waitUntil(self.skipWaiting())
})
self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim())
})
