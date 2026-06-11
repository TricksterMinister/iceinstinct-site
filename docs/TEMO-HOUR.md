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

## 3. Google Business Profile (~15 мин) - ПО СЛОВАМ ТЕМО ПРОФИЛЬ УЖЕ ЕСТЬ (2026-06-11)
0. ПЕРВЫМ ДЕЛОМ: https://business.google.com с аккаунта Темо -> проверить, что профиль "Ice & Instinct" там виден и что это ТА ЖЕ карточка, что в выдаче (kgmid /g/11ms10nkr6 - сверим по адресу/телефону/ссылке). Если в выдаче живёт дубль без владельца - запросить объединение/claim дубля, иначе отзывы пойдут мимо.
1. Если профиля в business.google.com всё же нет: открыть https://www.google.com/maps -> найти "Ice & Instinct" -> "Own this business?" / "Заявить права" -> пройти claim с аккаунта Темо.
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

## 5a. Purge CDN-кэша (1 минута) - ВАЖНО для AI-движков
- Hostinger hPanel -> сайт iceinstinct.com -> **CDN -> Purge cache** (всё).
- Причина: edge-кэш (hcdn) держит llms.txt / sitemap.xml со старым 30-дневным TTL. Заголовки в коде уже починены (1 час), но закэшированную копию надо выбить один раз вручную.

## 6. Решение по каталогам (2 минуты, один раз)
- **PartySlate** - это витрина для люкс-ивент-планировщиков (бюджеты $10k+), НЕ биржа дешевых заказов. Да или нет?
- **The Knot / WeddingWire** - свадебные каталоги, та же логика. Да или нет?
- Ответ фиксирую в STATE. Если "да" - профиль(и) создаем в этот же час (фото-папка та же).

## 6a. Wikidata - аккаунт + bot password (3 минуты)
Якорь для всех AI Knowledge Graph. Сам элемент создам я, от тебя только доступ:
1. https://www.wikidata.org -> Create account (любой ник, твой email). Капча - поэтому нужен ты.
2. После входа: Special:BotPasswords -> имя "claude" -> права: "Edit existing pages" + "Create, edit, and move pages" -> Create.
3. Отдай мне логин вида "НикБота@claude" и сгенерированный пароль - я создам элемент "Ice & Instinct" (instance of: business, industry: mixology, HQ: NJ/NY, founder, official website, Instagram) через API и добавлю QID в schema сайта.

## 7. Опционально: мгновенный WhatsApp-алерт о лидах (5 минут, можно потом)
Сейчас работает так: каждые 15 минут локальный агент проверяет Gmail на письма Formspree и шлёт push в Claude. Этого достаточно для старта. Если хочешь МГНОВЕННЫЙ WhatsApp-пинг через Make, нужно от тебя:
1. CallMeBot opt-in: отправить в WhatsApp на +34 644 71 81 99 текст "I allow callmebot to send me messages" - в ответ придёт apikey, отдай мне.
2. Make: бесплатный план = 2 активных сценария, оба заняты продакшеном ORBIS. Либо апгрейд Make, либо оставляем 15-минутный вотчер (моя рекомендация: оставить вотчер, деньги не тратить).

---

## Чек на выходе из часа
- [ ] GSC verified + sitemap + 15 URL requested
- [ ] Bing import done
- [ ] GBP claimed + services + 15 фото + review link записан
- [ ] hello@iceinstinct.com живой (тест туда-обратно)
- [ ] Stripe gift links у меня
- [ ] PartySlate / Knot / WeddingWire: да/нет записано
