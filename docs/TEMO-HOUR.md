# THE TEMO HOUR - браузерная сессия Phase 1 (~60 минут)

> Один вечер, один час, залогиненный браузер. Я (Claude) сижу рядом в этой же сессии: ты кликаешь, я диктую и сразу вношу код-части. Порядок ниже = порядок по деньгам.

## Что нужно открыть заранее
- Google аккаунт (тот, на который претендуем GBP + Search Console)
- Hostinger hPanel (iceinstinct.com)
- Stripe (аккаунт Темо)

---

## 1. Google Search Console (~10 мин) - КРИТИЧНО: Google видит 2 страницы из 15
1. https://search.google.com/search-console -> Add property -> URL prefix -> `https://www.iceinstinct.com/`
2. Выбрать метод верификации **HTML file** -> скачать файл -> передать мне (или продиктовать имя файла `googleXXXX.html`). Я кладу его в корень сайта и деплою за 2 минуты.
3. После верификации: Sitemaps -> добавить `https://www.iceinstinct.com/sitemap.xml`
4. URL Inspection -> по очереди вставить каждый из 15 URL -> Request Indexing (я продиктую список).

## 2. Bing Webmaster Tools (~5 мин) - кормит ChatGPT search + Copilot
1. https://www.bing.com/webmasters -> Sign in (Google аккаунт ок)
2. Кнопка **Import from Google Search Console** -> подтвердить. Все. Sitemap подтянется сам, проверить в Sitemaps.

## 3. Claim Google Business Profile (~20 мин) - сущность УЖЕ существует
1. Открыть https://www.google.com/maps -> найти "Ice & Instinct" (kgmid /g/11ms10nkr6; если не ищется - открыть share.google ссылку, я дам)
2. "Own this business?" / "Заявить права" -> пройти claim с аккаунта Темо.
3. Заполнить:
   - Тип: **Service-area business** (БЕЗ публичного адреса)
   - Зоны: Manhattan, Brooklyn, North NJ, Westchester, Greenwich, Hamptons
   - Категория: **Bartending service** (+ вторичная Caterer)
   - Телефон: +1 917 292 7859
   - Сайт: https://www.iceinstinct.com/
   - Booking link: https://www.iceinstinct.com/contact/
   - Hours: By appointment
4. Services -> 4 тира с from-ценами: Foundation from $650, Perfection in Simplicity from $900, Bespoke Design & Artistry from $1,800, Omakase Improvisation from $3,000
5. Photos -> загрузить 15 фото из папки **/Volumes/TEMO DISC/Reports/iceinstinct-gbp-photos/** (уже подготовлена, файлы пронумерованы)
6. После клейма: получить **review link** (Ask for reviews -> g.page/r/...) -> отдать мне, я записываю в STATE (нужен для review engine Phase 5).

## 4. Почта hello@iceinstinct.com (~10 мин)
1. Hostinger hPanel -> Emails -> iceinstinct.com -> Create email account -> `hello@iceinstinct.com` (пароль - твой, сохрани)
2. Там же проверить, что SPF / DKIM / DMARC записи включены (hPanel обычно ставит сам - если есть кнопка "Set up records", нажать).
3. Отправить тест на temo.benidze@gmail.com и ответить обратно.
4. Дальше моя часть (код): футер, contact, schema email, Formspree reply-to. Скажешь "почта готова" - деплою.

## 5. Stripe Payment Link для Gift an Evening (~10 мин)
1. Stripe Dashboard -> Payment Links -> Create
2. Два продукта: **Gift an Evening - The Foundation** $650 и **Gift an Evening - Perfection in Simplicity** $900 (one-time)
3. Настройки: collect customer email + shipping address NOT needed; after payment -> redirect на https://www.iceinstinct.com/contact/?occasion=gift (или стандартный receipt)
4. Скопировать обе ссылки -> отдать мне, я вшиваю в /gift/ страницу.

## 6. Решение по каталогам (2 минуты, один раз)
- **PartySlate** - это витрина для люкс-ивент-планировщиков (бюджеты $10k+), НЕ биржа дешевых заказов. Да или нет?
- **The Knot / WeddingWire** - свадебные каталоги, та же логика. Да или нет?
- Ответ фиксирую в STATE. Если "да" - профиль(и) создаем в этот же час (фото-папка та же).

---

## Чек на выходе из часа
- [ ] GSC verified + sitemap + 15 URL requested
- [ ] Bing import done
- [ ] GBP claimed + services + 15 фото + review link записан
- [ ] hello@iceinstinct.com живой (тест туда-обратно)
- [ ] Stripe gift links у меня
- [ ] PartySlate / Knot / WeddingWire: да/нет записано
