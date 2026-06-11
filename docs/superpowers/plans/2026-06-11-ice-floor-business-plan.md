# Ice & Instinct Two-Floor Business Plan (полный, исполняемый)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Tasks D1-D4 are code tasks in this repo; all other tasks are owner-side or document tasks that Claude prepares and Temo signs off.

**Goal:** Превратить Ice & Instinct в работающий двухэтажный бизнес: INSTINCT = премиум-миксология лично Темо ($650-$3000+, как сейчас), ICE = диспетчеризация бартендеров по вызову со спредом ~$200-270 с заказа, ноль стартового капитала.

**Architecture:** Вариант A («деньги через Темо»): клиент платит Ice & Instinct пакетную цену, Темо платит бартендеру-субподрядчику, разница = доход. Юр-защита = одностраничный субподрядный договор + обязательная собственная страховка бартендера + non-solicit (запрет уводить клиентов). Эскалация в W2/LLC по триггерам объёма, не раньше.

**Tech Stack / Ops Stack:** Существующий сайт (React/Vite, 27 страниц, пререндер), Formspree xpwkadgp, GA4, Google Sheets (трекер), Zelle (выплаты), телефон. База: docs/BUSINESS-MODEL.md + deep-research рынка NYC/NJ от 2026-06-11.

**Истина рынка (из research, для контекста исполнителю):**
- Фрилансеру платят $35-65/час (в NYC до $75); 4-часовой заказ = $160-220 на руки.
- Клиентская цена соло-бартендера в NYC/NJ: $50-100/час или пакет.
- NJ ABC-тест (действует с 1 окт 2026): «1099-контрактор» почти невозможен, если диспетчеризация = твой основной бизнес И ты контролируешь работу как работодатель. Защита фазы 1: настоящая независимость субподрядчика (свои инструменты, право отказаться, работает на других, своя страховка) + договор.
- NY: постоянной лицензии для мобильного бара без помещения НЕТ; алкоголь покупает/предоставляет хост (наша текущая модель, менять нельзя). Бартендер наливает, не продаёт - это держит нас вне зоны лицензирования. Dram shop (GOL 11-101): не наливать явно пьяным - в договоре и в стандартах скамейки.

---

## ЧАСТЬ A - ЮРИДИЧЕСКИЙ ФУНДАМЕНТ (неделя 1, затраты $0)

### Task A1: Субподрядный договор (одна страница)

**Files:**
- Create: `docs/business/subcontractor-agreement.md` (мастер-текст; из него делается PDF для подписи)

- [ ] **Step 1: Сохранить полный текст договора** (ниже - готовый текст; это образец, НЕ юр-консультация; перед первым подписанием показать NJ-юристу, ~1 бесплатная консультация в SCORE/NJSBDC):

```markdown
INDEPENDENT CONTRACTOR AGREEMENT - EVENT BARTENDING SERVICES

This Agreement is between Teimuraz Benidze d/b/a Ice & Instinct ("Company")
and ______________________ ("Contractor"), effective ____________.

1. SERVICES. Contractor will provide bartending services at private events
   on a per-event basis. Each engagement is offered by Company and may be
   accepted or declined by Contractor in Contractor's sole discretion. No
   minimum amount of work is promised by either party.

2. INDEPENDENT CONTRACTOR STATUS. Contractor is an independent contractor,
   not an employee. Contractor controls the manner and means of performing
   the services, supplies their own basic tools and professional attire,
   sets their own availability, and is free to perform services for other
   companies and clients at any time. Contractor is responsible for their
   own taxes; Company will issue IRS Form 1099-NEC where required.

3. FEES. Company will pay Contractor a flat fee agreed per event, in
   writing (text message is sufficient), within 24 hours after the event
   via Zelle or other agreed method.

4. INSURANCE. Contractor represents that they carry, or will work only
   under a host's or venue's, general liability coverage applicable to
   bartending services. Proof of Contractor's own policy (if any) shall be
   provided on request.

5. RESPONSIBLE SERVICE. Contractor will not serve alcohol to visibly
   intoxicated persons or anyone under 21, will check ID when in doubt,
   and will follow applicable NY/NJ law. Alcohol is provided by the host;
   Contractor and Company do not sell alcohol.

6. CLIENT NON-SOLICITATION. For 12 months after an event, Contractor will
   not directly solicit or accept private bookings from clients introduced
   by Company, and will refer any such requests back to Company. Referral
   of new clients TO Company is rewarded at 10% of the engagement.

7. CONDUCT AND BRAND. At Company-booked events Contractor represents the
   Ice & Instinct standard: punctuality (arrive per Event Order), grooming,
   no phone use behind the bar, no consumption of alcohol during service.

8. INDEMNIFICATION. Each party is responsible for the consequences of its
   own acts. Contractor indemnifies Company against claims arising from
   Contractor's gross negligence or willful misconduct.

9. TERM. Either party may end this Agreement at any time; obligations in
   Sections 6 and 8 survive termination.

10. GOVERNING LAW. New Jersey law governs; venue is the county of
    Company's principal place of business.

Company: ______________________    Contractor: ______________________
Date: ____________                 Date: ____________
```

- [ ] **Step 2: DoD-проверка текста:** в договоре есть все 5 несущих пунктов: право отказаться от заказа (п.1-2), свои инструменты (п.2), работа на других (п.2), страховка (п.4), non-solicit 12 мес + 10% за рефералов (п.6). Если какого-то нет - текст сломан, починить.
- [ ] **Step 3: Commit** `git add docs/business/subcontractor-agreement.md && git commit -m "docs(business): subcontractor agreement v1"`
- [ ] **Step 4 (Темо):** показать текст юристу на бесплатной консультации (SCORE NJ / NJSBDC), внести правки, версия v1.1.

### Task A2: Требования к скамейке (bench standard)

**Files:**
- Create: `docs/business/bench-standard.md`

- [ ] **Step 1: Сохранить чек-лист допуска бартендера на скамейку:**

```markdown
# Стандарт скамейки Ice (допуск бартендера)

Обязательно (без этого не выходит под брендом):
- [ ] Подписан субподрядный договор (A1)
- [ ] 21+, право на работу в США (W-9 заполнен - нужен для 1099)
- [ ] Страховка: своя GL-полиса ИЛИ письменное ок работать только под
      страховкой площадки/хоста (фиксируем в листе скамейки)
- [ ] Пробная смена/тейстинг пройдены лично у Темо (90 минут: классика
      из 6 позиций, скорость, чистота, манера)
- [ ] Внешний вид: чёрный верх/низ или дресс-код заказа, ухоженность
- [ ] Телефон отвечает в течение 2 часов в дни перед заказом

Желательно (плюс к тиру A):
- [ ] Сертификат TIPS / ServSafe Alcohol
- [ ] Свой базовый набор инструментов (шейкер, джиггер, стрейнер, нож)
- [ ] Опыт свадеб/корпоративов 2+ года

Тиры:
- A-bench: премиум-уровень, может выйти на заказ рядом с Instinct
  (ставка $50-60/час, $200-240 за 4ч)
- B-bench: стандартные ивенты (ставка $40-50/час, $160-200 за 4ч)
```

- [ ] **Step 2: Commit** `git commit -m "docs(business): bench standard v1"`

### Task A3: Решение по юр-форме (зафиксировать триггеры, сейчас ничего не платить)

**Files:**
- Modify: `docs/BUSINESS-MODEL.md` (раздел 5-year arc - добавить триггеры)

- [ ] **Step 1: Записать правило:** сейчас работаем как sole proprietor (как уже работает Instinct). НИЧЕГО не оформляем и не платим, пока не сработал триггер.
- [ ] **Step 2: Триггеры (записать в BUSINESS-MODEL.md):**

```markdown
## Триггеры эскалации структуры (не раньше!)
1. LLC (NJ, ~$125 + $75/год): когда Ice делает $5k+/мес три месяца подряд
   ИЛИ первый корпоративный клиент требует COI на компанию.
2. Своя страховка агентства (GL + liquor liability, ~$500-900/год):
   вместе с LLC.
3. Первый W2-бартендер: когда один и тот же субподрядчик стабильно
   делает 8+ заказов/мес два месяца подряд (дальше держать его на 1099
   в NJ опасно) ИЛИ суммарно 25+ заказов/мес по скамейке.
4. До триггеров: только договор A1 + страховка бартендера/площадки.
```

- [ ] **Step 3: Commit.**

---

## ЧАСТЬ B - ЦЕНЫ И СКРИПТЫ (неделя 1, $0)

### Task B1: Ценовая сетка Ice (финальная)

**Files:**
- Create: `docs/business/ice-pricing.md`

- [ ] **Step 1: Зафиксировать сетку:**

```markdown
# Ice - цены (клиентские, флэт, без торга)

| Пакет | Состав | Цена клиенту | Бартендеру | Спред |
|---|---|---|---|---|
| The Single      | 1 бартендер, до 4ч, до ~50 гостей      | $450  | $180-220 | $230-270 |
| The Single+     | 1 бартендер + барбек, до 4ч            | $650  | $330-380 | $270-320 |
| The Pair        | 2 бартендера, до 4ч, 50-100 гостей     | $850  | $380-440 | $410-470 |
| The Wedding Ice | команда под размер, до 6ч              | $1,200-2,400 | 45-55% | остальное |
| Доп. час        | за каждого бартендера                  | +$75  | +$45     | +$30 |
| Clear-ice апгрейд | лёд как на Instinct                  | +$120 | себестоимость | маржа |

Железные правила:
1. Минимальный спред $200/заказ. Если не выходит - цена выше или отказ.
2. Цена клиенту = выплата бартендеру x ~2.1 (проверочная формула).
3. Депозит 50% при бронировании (Zelle/ссылка), остаток в день события.
4. Алкоголь ВСЕГДА предоставляет хост (или закупаем по чеку без наценки) -
   это держит нас вне лицензий NY/NJ. Никогда не продаём алкоголь.
5. Манхэттен/Хэмптонс: +$50-100 трэвел к цене (не к выплате - наша маржа
   на логистике, у нас NJ-база).
6. Instinct-цены не трогаются и не скидываются никогда. Если клиент Ice
   просит «самого Темо» - это апселл в Instinct ($650+), не скидка вниз.
```

- [ ] **Step 2: Commit.**

### Task B2: Скрипты (звонок бартендеру, котировка клиенту)

**Files:**
- Create: `docs/business/scripts.md`

- [ ] **Step 1: Скрипт котировки клиенту (телефон/WhatsApp, 8 вопросов интейка):**

```markdown
## Интейк заказа (8 вопросов, в этом порядке)
1. Дата и время? 2. Город/адрес (хотя бы город)? 3. Сколько гостей?
4. Сколько часов бар? 5. Повод (ДР/свадьба/корпоратив)?
6. Какой бар: классика / коктейли по списку / просто пиво-вино?
7. Алкоголь ваш или закупить по чеку? 8. Есть ли стойка/стол под бар?

## Котировка (говорить уверенно, цена флэт)
«Для [40 гостей, 4 часа, день рождения в Монклере] это наш пакет
The Single: один профессиональный бартендер из нашей команды, весь
сервис за стойкой, $450 флэт. Бронируем датой: 50% депозит, остаток
в день события. Алкоголь по вашему списку - я пришлю расчёт закупки.»

Если просят дешевле: «Цена флэт, торга нет - но могу убрать час:
3 часа = $375.» (держим формулу, не маржу).
Если просят люкс/«а кто у вас главный»: апселл -> Instinct, от $650:
«Тогда вам нужен не бартендер, а наш фирменный вечер - его веду я сам.»

## Звонок бартендеру (после депозита клиента!)
«[Имя], привет. Суббота 14-е, Монклер NJ, день рождения, 40 гостей,
4 часа, классика по списку. $200 на руки, Zelle в тот же вечер.
Идёшь?» -> Да -> скинуть Event Order текстом (дата, адрес, время
прибытия = минус 45 мин, дресс-код, список коктейлей, контакт хоста).
Правило: бартендеру звоним ТОЛЬКО после депозита клиента. Без депозита
нет брони, без брони нет звонка.
```

- [ ] **Step 2: Commit.**

---

## ЧАСТЬ C - СКАМЕЙКА (недели 1-4, цель: 6 человек к концу месяца)

### Task C1: Лист скамейки (Google Sheet)

- [ ] **Step 1 (Темо/Claude):** создать Google Sheet «Ice Bench» с колонками: Имя | Телефон | Тир (A/B) | Ставка 4ч | Страховка (своя/площадка) | Договор подписан (дата) | W-9 получен | Пробная смена (дата, оценка 1-5) | Заказов сделано | Последний заказ | Заметки.
- [ ] **Step 2: DoD:** первый ряд заполнен (хотя бы помощник Темо с премиум-заказов).

### Task C2: Рекрутинг скамейки

- [ ] **Step 1: Текст объявления (готовый, постить в NYC/NJ bartender-группы FB, craigslist gigs, знакомым):**

```markdown
Ищем event-бартендеров (NYC + North NJ) в скамейку частной студии
Ice & Instinct. Платим флэт $180-240 за 4-часовой ивент (Zelle в тот же
вечер), заказы по выходным, без обязательного минимума - берёшь те
заказы, которые хочешь. Требования: 21+, опыт ивентов, опрятность,
свои базовые инструменты - плюс. Пробная смена 90 минут.
Пишите: [телефон] / iceinstinct.com/work-with-us
```

- [ ] **Step 2: Воронка:** отклик -> 10-мин звонок -> пробная смена у Темо -> договор + W-9 -> в лист скамейки с тиром.
- [ ] **Step 3: DoD месяца:** 6 подписанных (2 A-tier, 4 B-tier). Этого хватает на 3-4 заказа/нед без отказов.

---

## ЧАСТЬ D - САЙТ: ДВЕРИ ICE (код, этот репозиторий; паттерн = существующие 27 страниц)

> Архитектура страницы (как везде в репо): стаб `app/<route>/index.html` (полный head + JSON-LD + GA4 G-KBVETWTVVH) + `app/src/main-<page>.tsx` + `app/src/pages/<Page>.tsx` + ввязка в `vite.config.ts`, `scripts/prerender.mjs`, `src/entry-server.tsx`, `src/seo/seoData.ts` (jsonLd: []), `public/sitemap.xml`, футер. Образец для копирования структуры: app/gift/* + src/pages/Gift.tsx. Запрет: эм-дэши, рисованный куб (только ii-mark.png), брейк бренда.

### Task D1: Страница /events/ (витрина Ice)

**Files:**
- Create: `app/events/index.html`, `app/src/main-events.tsx`, `app/src/pages/Events.tsx`, `app/src/styles/events.css`
- Modify: `app/vite.config.ts` (input `events`), `app/scripts/prerender.mjs` (route `/events/`), `app/src/entry-server.tsx`, `app/src/seo/seoData.ts`, `app/public/sitemap.xml`, `app/src/sections/SiteFooter.tsx` (ссылка «Event Bartenders»)

- [ ] **Step 1: Контент страницы (копирайт готовый, вставлять как есть):**
  - H1: «Event bartenders, on call - NYC & New Jersey»
  - Лид: «The same studio behind our private mixology evenings keeps a vetted bench of event bartenders. One call books a professional for your birthday, house party, wedding or corporate night - insured, punctual, fluent in the classics.»
  - Пакеты: таблица из Task B1 (The Single $450 / The Single+ $650 / The Pair $850 / The Wedding Ice from $1,200; +$75/час; депозит 50%).
  - «How it works»: 1) Tell us date, guests, hours 2) Flat quote in one message 3) 50% deposit holds the date 4) A vetted bartender from our bench arrives 45 minutes early.
  - Блок доверия: vetted bench, founder-trained, responsible service (21+, никогда не наливаем явно пьяным), host provides alcohol - we run the bar.
  - Мостик вверх: «Want the founder himself, a custom menu, the omakase? That is our INSTINCT floor -> /offerings/».
  - CTA: «Get a flat quote» -> `/contact/?occasion=event+staffing` + tel.
- [ ] **Step 2: В Contact.tsx добавить опцию occasion «event staffing»** (Modify: `app/src/pages/Contact.tsx` - в OCCASIONS-массив).
- [ ] **Step 3: JSON-LD в стабе:** Service (serviceType "Event bartending staffing", areaServed как на гео-страницах, AggregateOffer lowPrice 450) + FAQPage (3 Q/A: сколько стоит / кто предоставляет алкоголь / страховка) + BreadcrumbList.
- [ ] **Step 4: Сборка и тесты:** `cd app && npm run build && npx vitest run` - зелёные; пререндер 29 роутов (после D2).
- [ ] **Step 5: Commit + push main (деплой) + curl-проверка** `curl -s https://www.iceinstinct.com/events/ | grep -o '<title>[^<]*'`.

### Task D2: Страница /work-with-us/ (набор скамейки)

**Files:**
- Create: `app/work-with-us/index.html`, `app/src/main-workwithus.tsx`, `app/src/pages/WorkWithUs.tsx`
- Modify: те же файлы ввязки, что в D1; футер (ссылка «Join the bench» мелко, в нижний ряд)

- [ ] **Step 1: Контент:** заголовок «Join the bench»; текст объявления из Task C2 в брендовой подаче; условия ($180-240 за 4ч, Zelle same-day, выбираешь заказы сам); форма: имя, телефон, email, лет опыта (select 0-2/2-5/5+), есть ли свои инструменты (да/нет), есть ли страховка (да/нет/не знаю) -> POST Formspree xpwkadgp c `_subject: "Bench application - <имя>"`.
- [ ] **Step 2: GA4:** track('bench_apply') на успешной отправке.
- [ ] **Step 3: Сборка, commit, push, curl-проверка.**

### Task D3: Две двери на главной (панель INSTINCT / ICE)

**Files:**
- Modify: `app/src/Home.tsx` (одна новая секция между существующими, НЕ редизайн), `app/src/styles/home`-слой по месту

- [ ] **Step 1: Минимальная секция «Two floors»:** два тихих кабинета в стиле существующих карточек: INSTINCT («Private mixology by the founder. From $650» -> /offerings/) | ICE («Event bartenders, on call. From $450» -> /events/). Никакой перестройки героя: добавка, не революция.
- [ ] **Step 2: Сборка, визуальная проверка скриншотом, commit, push.**

### Task D4: SEO-хвосты Ice

**Files:**
- Modify: `app/public/llms.txt` (блок Pages: + /events/, /work-with-us/ со строкой цен), `app/public/sitemap.xml` (готово в D1/D2), гео-страницы (по 1 ссылке на /events/ в тексте - 4 файла `app/src/pages/{NewJersey,Manhattan,Hamptons,WestchesterGreenwich}.tsx`)

- [ ] **Step 1: Внести, прогнать `node scripts/verify-llms.mjs` (цены Ice не входят в guard - guard только про тиры Instinct, проверить что не сломали).**
- [ ] **Step 2: Сборка, commit, push, curl llms.txt через cache-bust.**

---

## ЧАСТЬ E - ДИСПЕТЧЕРСКАЯ ОПЕРАЦИЯ (процесс на каждый заказ)

### Task E1: Чек-лист заказа (от лида до спреда)

**Files:**
- Create: `docs/business/dispatch-checklist.md`

- [ ] **Step 1: Сохранить чек-лист:**

```markdown
# Один заказ Ice - 10 шагов
1. Лид пришёл (форма/звонок/GBP) -> 8 вопросов интейка (B2) сразу.
2. Котировка флэт в одном сообщении. Молчат 24ч -> один follow-up.
3. Депозит 50% (Zelle / Stripe-ссылка). Нет депозита = нет брони.
4. Звонок бартендеру по тиру (B2-скрипт). Принял -> Event Order текстом.
5. Лист заказа в трекер (E2) в момент брони.
6. За день: подтверждение бартендеру И клиенту одним сообщением каждому.
7. День события: бартендер на месте за 45 мин -> фото сетапа в WhatsApp.
8. После: остаток оплаты от клиента; Zelle бартендеру в тот же вечер.
9. +24ч: сообщение клиенту - спасибо + ссылка на отзыв (GBP review link).
10. Закрыть строку в трекере: записать спред. Спред < $200 -> разбор, что
    пошло не так с ценой.
```

- [ ] **Step 2: Commit.**

### Task E2: Трекер денег (Google Sheet «Ice Dispatch»)

- [ ] **Step 1: Создать лист с колонками:** Дата события | Клиент | Канал лида | Город | Пакет | Цена клиенту | Депозит получен (дата) | Бартендер | Выплата | Выплачено (дата) | СПРЕД | Отзыв запрошен | Отзыв получен | Заметки.
- [ ] **Step 2: Внизу формула месяца:** сумма спредов, число заказов, средний спред. DoD: лист существует, формулы считают.

---

## ЧАСТЬ F - ЗАПУСК И РОСТ

### Task F1: Первые 5 заказов Ice (каналы без бюджета)

- [ ] 1. GBP (после часа Темо): добавить услугу «Event bartender - from $450» рядом с тирами Instinct.
- [ ] 2. 18 черновиков планировщикам: ДОБАВИТЬ одну строку перед отправкой: «We also keep a vetted bench of event bartenders (from $450) when you just need solid hands.» (правка черновиков - 15 минут, делает Claude в Gmail drafts).
- [ ] 3. Каждому прошлому клиенту Instinct: одно сообщение «теперь у нас есть и просто бартендеры на вечер - если у друзей праздник, вот ссылка /events/, рефералка 10%».
- [ ] 4. /events/ страница ловит органику по «bartender for hire NJ/NYC» (D1+D4).
- [ ] 5. Craigslist gigs + локальные FB-группы (Hoboken/Montclair/UWS): пост с пакетом The Single (текст = лид /events/). Instagram НЕ трогаем (запрет владельца).
- [ ] DoD: 5 оплаченных заказов Ice. После 5-го: пересмотреть цены (если конверсия >50% - поднять Single до $495).

### Task F2: KPI и триггеры (ежемесячный разбор, входит в понедельничный дайджест)

- [ ] **Step 1: Добавить в cron `ii-weekly-kpi` Ice-метрики:** заказы Ice, суммарный спред, средний спред, заявок на скамейку (modify prompt задачи через update_scheduled_task).
- [ ] **Step 2: Цели по месяцам (год 1):** М1: 5 заказов / скамейка 6. М3: 12 заказов/мес, спред $2,500+/мес. М6: 16-20 заказов/мес, $4-5k/мес спреда, скамейка 12. М12: триггеры LLC/страховки/первого W2 из Task A3 - если сработали, исполняем Фазу 2 (Year-2 arc в BUSINESS-MODEL.md).
- [ ] **Step 3: Еженедельная гармония Темо:** 1 Instinct-вечер лично + 2-4 Ice-диспатча с телефона + 0 заказов, на которые Темо ходит «дешёвым бартендером» - себя не диспетчеризуем вниз НИКОГДА (защита бренда).

---

## Порядок исполнения (что за чем)

1. **Сегодня-завтра:** A1 (договор) + B1 (цены) + B2 (скрипты) + E1/E2 (чек-лист + трекеры) - всё документы, ~час работы Claude + правки Темо.
2. **Эта неделя:** D1-D4 (сайт: /events/, /work-with-us/, две двери, SEO) - одна Workflow-волна + ввязка + деплой.
3. **Параллельно:** C1-C2 (скамейка - объявление постит Темо, пробные смены ведёт Темо).
4. **После часа Темо (GBP):** F1 (каналы, правка 18 черновиков).
5. **Постоянно:** E1-чек-лист на каждый заказ, F2-разбор раз в месяц.

## Self-review (выполнен)
- Покрытие: модель (A/B выбор -> A), юр-защита (договор, страховка, non-solicit, триггеры W2/LLC), цены+формула, скрипты, скамейка (рекрутинг+стандарт+тиры), сайт (4 код-задачи с файлами), процесс заказа, деньги/трекер, каналы запуска, KPI/гармония - всё из BUSINESS-MODEL.md и ответов Темо закрыто.
- Заглушек нет: договор - полный текст, объявление - полный текст, скрипты - дословные, цены - числа, колонки трекеров - перечислены.
- Согласованность: цены B1 = ценам на /events/ (D1) = строкам llms.txt (D4); occasion «event staffing» в D1 шаг 2 добавляется в Contact OCCASIONS; review link в E1 шаг 9 появляется из TEMO-HOUR (GBP).
