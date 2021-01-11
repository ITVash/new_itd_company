//localStorage.setItem("lang", localStorage.getItem("lang") ? localStorage.getItem("lang") : "ru")
const googleTranslateConfig = {
  lang: "ru",
};

const TranslateGetCode = () => {
	// Если куки нет, то передаем дефолтный язык
	const goog = document.cookie.split("=")
	let lang =
		document.cookie !== undefined && document.cookie !== ""
			? goog[1]
			: googleTranslateConfig.lang
	return lang.substr(-2)
}

TranslateInit = () => {
  let code = TranslateGetCode();
  const lang = document.querySelectorAll(".popup_nav_list__item");
  if (code == googleTranslateConfig.lang) {
    // Если язык по умолчанию, совпадает с языком на который переводим
    // То очищаем куки
    TranslateClearCookie();
  }
  new google.translate.TranslateElement({
    pageLanguage: googleTranslateConfig.lang,
  });
  lang.forEach(item => {
    if (item.getAttribute("data-google-lang") === code) {
      item.classList.add("popup_nav_list__item_active")
    }
    item.addEventListener("click", () => {
      localStorage.setItem("lang", item.getAttribute("data-google-lang"))
      item.classList.add("popup_nav_list__item_active");
      TranslateSetCookie(item.getAttribute("data-google-lang"))
      window.location.reload()
    });
  })
};

const TranslateSetCookie = (code) => {
  // Записываем куки /язык_который_переводим/язык_на_который_переводим
  document.cookie = `googtrans=/auto/${code};`
  document.cookie = `googtrans=/auto/${code}; domain=.${document.domain};`
}

const TranslateClearCookie = () => {
  document.cookie = `googtrans=; max-age=-1;`
  document.cookie = `googtrans=; domain=.${document.domain}; max-age=-1;`
}


//TranslateInit();