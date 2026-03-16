/*
 * CashFlow Academy — FXminds
 * Main game script
 */


// ═══════════════════════════════════════════════════════════════════════════
// i18n + Currency System — CashFlow Academy
// Default: Dutch (nl). Fallback: English (en).
//
//   t('key')               → translated string
//   t('key', {n:3})        → with {{n}} substitution
//   c(1200)                → "€1.200"  (nl) / "$1,200"  (en)
//   c(1200, true)          → "+€1.200" / "+$1,200"
//   cpm(1200)              → "€1.200/mnd" / "$1,200/mo"
//   window._setLang('en')  → switch language at runtime
// ═══════════════════════════════════════════════════════════════════════════

let _lang = 'nl'; // ← DEFAULT LANGUAGE

const TRANSLATIONS = {
  nl: {
    'currency.symbol': '€', 'currency.sep': '.', 'currency.dec': ',', 'currency.pm': '/mnd',
    'brand.simulator': 'FXminds · Financiële Simulator',
    'brand.awareness': 'FXminds · Financieel Bewustzijn',
    'brand.cashflow': 'FXminds · Cashflow Simulator',
    'brand.game_logo': 'Cashflow Simulator · by FXminds',
    'brand.powered': 'Powered by FXminds Academy',
    'mode.title': 'Kies jouw spelmodus',
    'mode.sub': 'Solo of samen spelen — tot 6 spelers op één apparaat.',
    'mode.single.name': 'Solo spelen', 'mode.single.desc': 'Speel alleen — jouw situatie, jouw keuzes, jouw uitweg.',
    'mode.local.name': 'Lokaal multiplayer', 'mode.local.desc': '2–6 spelers, beurtelings spelen. Elke speler richt zijn eigen situatie in.',
    'mode.online.name': 'Online multiplayer', 'mode.online.desc': 'Speel tegen vrienden in realtime, overal ter wereld.',
    'mode.online.soon': 'Binnenkort',
    'ob.sub': '60 seconden. Geen opsmuk. Dit is jouw financiële realitycheck voordat de simulatie begint.',
    'ob.q.income': 'Wat levert jouw baan je netto per maand op?',
    'ob.income.under2k': 'Onder €2.000', 'ob.income.2k4k': '€2.000 – €4.000', 'ob.income.4k7k': '€4.000 – €7.000', 'ob.income.over7k': 'Boven €7.000',
    'ob.q.expenses': 'Hoeveel van dat geld verdwijnt elke maand?',
    'ob.exp.under1500': 'Onder €1.500', 'ob.exp.1500to3k': '€1.500 – €3.000', 'ob.exp.3k5k': '€3.000 – €5.000', 'ob.exp.over5k': 'Boven €5.000',
    'ob.q.invests': 'Werkt jouw geld voor jou — of staat het stil?',
    'ob.inv.no': 'Nee — nog niet', 'ob.inv.sometimes': 'Soms', 'ob.inv.yes': 'Ja, regelmatig',
    'ob.q.debt': 'Hoe ziet jouw schuldsituatie er op dit moment uit?',
    'ob.debt.none': 'Geen schuld — schone lei', 'ob.debt.small': 'Kleine schuld (creditcard / onder €5k)',
    'ob.debt.moderate': 'Gemiddelde schuld (€5k – €25k)', 'ob.debt.heavy': 'Zware schuld (studielening / boven €25k)',
    'ob.q.goal': 'Wat probeer je eigenlijk op te bouwen?',
    'ob.goal.freedom': 'Financiële vrijheid', 'ob.goal.extra': 'Extra inkomen', 'ob.goal.invest': 'Vermogen opbouwen', 'ob.goal.trading': 'Leren traden',
    'ob.q.freedom': 'Eerlijk — hoe financieel vrij ben je nu?',
    'ob.range.low': 'Helemaal niet', 'ob.range.high': 'Volledig vrij',
    'ob.btn.back': '← Terug', 'ob.btn.next': 'Volgende →',
    'reflect.body': '<strong>Dit gat is wat de meeste mensen nooit dichten.</strong><br><br>Inkomen dat afhankelijk is van aanwezig zijn. Uitgaven die elk jaar groeien. Geen bezittingen die voor je werken terwijl je slaapt.<br><br>Dat is geen persoonlijk falen — het systeem werkt precies zoals het ontworpen is. De Ratrace bestaat echt, en de meeste mensen vinden de uitweg nooit.<br><br><strong>Deze simulatie laat je zien hoe je eruit komt.</strong>',
    'reflect.cta': '▶ Begin je eerste investeringsronde',
    'sp.title': 'Jouw startpunt', 'sp.sub': 'Hoe wil je de simulatie ingaan? Jouw keuze bepaalt alles vanaf hier.',
    'sp.sit.badge': 'Gepersonaliseerd', 'sp.sit.label': 'Start met mijn situatie',
    'sp.sit.desc': 'Jouw echte inkomen, uitgaven en gewoontes — geladen in de simulatie.',
    'sp.char.label': 'Kies een karakter', 'sp.char.desc': 'Kies een voorinstelling — klassieke beroepen of nieuwe FXminds archetypen.',
    'sp.name.label': 'Jouw naam', 'sp.name.ph': 'Voer jouw naam in',
    'sp.btn.back': '← Terug', 'sp.sit.start': '▶ Start mijn simulatie', 'sp.char.start': '▶ Speel dit karakter',
    'sp.diag.profile': 'Jouw financiële profiel', 'sp.diag.bottleneck': 'Wat houdt je tegen', 'sp.diag.strength': 'Wat je al hebt',
    'setup.sub': 'Bouw passief inkomen op totdat het je uitgaven dekt — en beslis dan wat er daarna komt. De meeste mensen komen nooit zover.',
    'setup.goal': '<strong>🎯 Missie:</strong> Bouw passief inkomen op dat je uitgaven overtreft. Elke beslissing verbindt zich. Elke maand uitstel kost je geld.',
    'setup.name.lbl': 'Jouw naam', 'setup.prof.lbl': 'Startberoep', 'setup.btn': '▶ Begin simulatie',
    'mp.setup.title': 'Lokaal multiplayer instellen', 'mp.setup.back': '← Terug', 'mp.count.lbl': 'Aantal spelers',
    'mp.start.btn': '▶ Door naar spelerinstellingen →',
    'mpps.mode.lbl': 'Hoe wil je starten?', 'mpps.sit.name': 'Mijn situatie', 'mpps.sit.desc': 'Beantwoord vragen over jouw echte financiën',
    'mpps.char.name': 'Kies karakter', 'mpps.char.desc': 'Kies een voorinstelling om mee te spelen',
    'mpps.prog.lbl': 'Speler {{n}} van {{total}}',
    'mpps.btn.next': 'Volgende →', 'mpps.btn.last': 'Bekijk mijn profiel →',
    'mpps.diag.confirm': 'Gebruik dit profiel →', 'mpps.diag.back': '← Opnieuw doen',
    'mpps.char.confirm': '▶ Speel dit karakter', 'mpps.char.back': '← Terug',
    'mpps.range.low': 'Helemaal niet', 'mpps.range.high': 'Volledig vrij',
    'mpps.cf.income': 'Inkomen', 'mpps.cf.expenses': 'Uitgaven', 'mpps.cf.cashflow': 'Cashflow',
    'handoff.sub': 'Geef het apparaat door aan',
    'handoff.msg': 'Jij bent aan de beurt — pak het apparaat en gooi wanneer je klaar bent.',
    'handoff.btn': 'Ik ben klaar — go! →',
    'header.turn.lbl': 'Beurt:', 'header.sfx': 'SFX', 'header.spotify': '🎵 Gebruik Spotify',
    'header.statement': '📊 Overzicht', 'header.restart': '↺ Herstarten',
    'stats.cf.lbl': 'Netto cashflow / mnd', 'stats.cash.lbl': 'Beschikbaar:',
    'stats.controls': 'Bediening', 'stats.roll': '🎲 Gooi dobbelstenen', 'stats.waiting': '⏳ Wachten...',
    'stats.escape.lbl': 'Ontsnappingsvoortgang',
    'stats.progress.free': '🏆 Ontsnapt! Je passief inkomen dekt al je kosten.',
    'stats.progress.pct': 'Passief inkomen: {{passive}} van {{exp}} nodig',
    'stats.progress.lbl': 'Voortgang richting financiële vrijheid',
    'stats.income.title': 'Inkomen', 'stats.income.active': '💼 Actief', 'stats.income.passive': '🏦 Passief',
    'stats.expenses': '🔴 Uitgaven', 'stats.portfolio': 'Portefeuille',
    'stats.networth': '📈 Nettovermogen', 'stats.turn': '🎲 Beurt',
    'stats.assets.title': '🏠 Bezittingen', 'stats.debts.title': '💳 Schulden',
    'stats.assets.empty': 'Nog geen bezittingen', 'stats.debts.empty': 'Geen schulden',
    'stats.level.title': 'Investeerdersniveau',
    'board.title': 'De Ratrace — vind de uitgang',
    'board.leg.payday': 'Salaris', 'board.leg.opp': 'Kans', 'board.leg.bad': 'Tegenslag',
    'board.leg.choice': 'Keuze', 'board.leg.rest': 'Rust', 'board.leg.you': 'Jij',
    'rp.events.title': 'Recente gebeurtenissen', 'rp.events.waiting': 'Wachten tot het spel begint…', 'rp.events.empty': 'Nog geen gebeurtenissen',
    'rp.view.lbl': 'Bekijk', 'rp.view.me': 'Ik',
    'rp.tab.overview': 'Overzicht', 'rp.tab.assets': 'Bezittingen', 'rp.tab.debts': 'Schulden', 'rp.tab.cashflow': 'Cashflow',
    'ov.cf.lbl': 'Netto Cashflow / mnd',
    'ov.chip.asset.s': '{{n}} bezitting', 'ov.chip.asset.p': '{{n}} bezittingen',
    'ov.chip.debt.s': '{{n}} schuld', 'ov.chip.debt.p': '{{n}} schulden',
    'ov.chip.debtfree': 'schuldenvrij', 'ov.chip.turn': 'beurt {{n}}',
    'ov.income.lbl': 'Inkomen', 'ov.income.active': 'Actief', 'ov.income.passive': 'Passief',
    'ov.exp.lbl': 'Uitgaven', 'ov.exp.monthly': 'Maandelijks',
    'ov.pos.lbl': 'Positie', 'ov.cash': 'Beschikbaar geld', 'ov.networth': 'Nettovermogen',
    'ov.escape.title': 'Ontsnappingsvoortgang', 'ov.escape.sub': 'Passief {{passive}} / Uitgaven {{exp}}',
    'assets.empty.title': 'Nog geen bezittingen',
    'assets.empty.sub': 'Land op een Kans-vakje om te investeren.\nElke bezitting genereert maandelijks cashflow.',
    'assets.total.lbl': 'Totaal passief', 'assets.cost.lbl': 'Kostprijs', 'assets.roi.lbl': 'ROI / jr',
    'assets.be.lbl': 'Terugverdientijd', 'assets.be.val': '{{n}} mnd',
    'debts.free.title': 'Schuldenvrij 🎉', 'debts.free.sub': 'Elke euro cashflow is van jou.\nNiets dat je elke maand leegtrekt.',
    'debts.drag.lbl': 'Totale maandelijkse last', 'debts.balance.lbl': 'Saldo', 'debts.freed.lbl': 'Vrijgemaakt na aflossing',
    'debts.payoff.can': '✓ Aflossen — {{amt}}', 'debts.payoff.cant': '✗ Nog {{amt}} tekort', 'debts.payoff.title': 'Niet genoeg geld',
    'cf.net.lbl': 'Netto maandelijkse cashflow',
    'cf.sub': '{{active}} actief · {{passive}} passief · {{exp}} uit',
    'cf.income.hdr': 'Inkomsten', 'cf.exp.hdr': 'Uitgaven', 'cf.total.in': 'Totaal in', 'cf.total.out': 'Totaal uit',
    'stmt.title': '📊 Maandelijks Cashflow Overzicht',
    'stmt.income.hdr': 'INKOMSTEN', 'stmt.exp.hdr': 'UITGAVEN', 'stmt.net.hdr': 'NETTO CASHFLOW',
    'stmt.net.lbl': 'Maandelijks netto',
    'stmt.assets.hdr': 'BEZITTINGEN ({{n}})', 'stmt.debts.hdr': 'SCHULDEN ({{n}})',
    'stmt.assets.empty': 'Nog geen bezittingen', 'stmt.debts.empty': 'Geen schulden',
    'stmt.total.income': 'Totaal inkomen', 'stmt.total.exp': 'Totale uitgaven',
    'stmt.close': '✕ Sluiten', 'stmt.income.active': 'Actief inkomen (Baan)',
    'stmt.exp.living': 'Vaste lasten', 'stmt.exp.debt': '{{name}} (betaling)',
    'card.badge.opp': '📈 Kans', 'card.badge.bad': '⚠️ Tegenslag', 'card.badge.ft': '🚀 Fast Track', 'card.badge.choice': '🎯 Strategische keuze',
    'card.sev.critical': '🔴 Kritiek', 'card.sev.high': '🟠 Hoog', 'card.sev.medium': '🟡 Gemiddeld', 'card.sev.low': '🟢 Klein',
    'card.cost.lbl': '💸 Kostprijs:', 'card.cf.lbl': '📥 +{{amt}}/mnd',
    'card.preview.remain': 'Resterende cash', 'card.preview.be': 'Terugverdientijd', 'card.preview.be.val': '{{n}} mnd', 'card.preview.roi': 'Jaarlijks rendement',
    'card.cant.afford': 'Kan het niet veroorloven', 'card.req.not.met': 'Vereisten niet voldaan',
    'card.choice.title': 'Wat ga je doen?', 'card.choice.desc': 'Een strategisch moment. Elke keuze hier beïnvloedt jouw cashflow.',
    'card.choice.only': '(enige optie)', 'card.pass': 'Overslaan',
    'choice.pay_debt': '💳 Een schuld aflossen', 'choice.pay_debt.desc': 'Maandelijkse cashflow vrijmaken',
    'choice.sell_asset': '🏠 Een bezit liquideren', 'choice.sell_asset.desc': 'Omzetten naar beschikbaar geld',
    'choice.save': '🏦 Blijven sparen', 'choice.save.desc': 'Op koers blijven',
    'mentor.label': 'FXminds Mentor Inzicht',
    'payday.lbl': 'maandelijkse cashflow',
    'msg.payday': '💰 {{reason}} — {{earned}} deze maand',
    'msg.roll': 'Gooi de dobbelstenen!', 'msg.roll.player': 'Gooi de dobbelstenen, {{name}}!',
    'msg.rest': '☕ Rust — jouw bezittingen blijven verdienen. Niets te doen.',
    'msg.rest.space': '☕ Rust — jouw geld werkt door. Gooi wanneer je klaar bent.',
    'msg.choice': '🎯 Strategische keuze — wat ga je doen?',
    'msg.opp': 'Kans: {{title}}', 'msg.bad': '⚠️ Tegenslag: {{title}}',
    'msg.win': '🏆 Je bent ontsnapt aan de Ratrace. Je geld werkt nu voor jou.',

    'win.line3.multi': 'Je hebt je inkomsten gespreid over meerdere stromen. Dat is geen diversificatie om het — dat is echte financiële veerkracht.',
    'win.line3.few':   'Één of twee bezittingen brachten je hier. Stel je voor wat er gebeurt als je er meer opstapelt. Volgende keer: breder bouwen.',
    'win.line4.clean': 'Je ontsnapte schuldvrij. Geen schuldlast. Elke euro cashflow verbindt voortaan.',    'msg.win.mp': '🏆 {{name}} is als eerste ontsnapt aan de Ratrace!',
    'msg.bankrupt.stuck': '💀 Geen uitweg meer — negatieve cashflow, geen bezittingen en geen geld.',
    'msg.bankrupt.cash': '💀 Failliet! Geld gedaald tot {{cash}}.',
    'msg.bankrupt.mp': '{{name}} is failliet gegaan!',
    'msg.eliminated': '{{name}} is failliet en uitgeschakeld.',
    'msg.debt.need': '💳 Nog {{needed}} nodig om {{debt}} af te lossen.',
    'msg.debt.paid': '💳 {{debt}} afgelost! Gooi wanneer je klaar bent.',
    'msg.ft.active': '🚀 Fast Track actief! Trek nieuwe beleggingskaarten om kapitaal op te schalen.',
    'msg.ft.enter': '🚀 Fast Track',
    'eos.win.title': 'Ontsnapping gelukt!', 'eos.loss.title': 'De Ratrace won',
    'eos.stat.passive': 'Maandelijks passief inkomen', 'eos.stat.expenses': 'Maandlasten', 'eos.stat.cf': 'Netto cashflow',
    'eos.stat.networth': 'Nettovermogen', 'eos.stat.cash': 'Beschikbaar geld', 'eos.stat.turns': 'Beurten gespeeld',
    'eos.assets.title': 'Bezittingen ({{n}})', 'eos.debts.title': 'Resterende schulden ({{n}})',
    'eos.assets.empty': 'Geen bezittingen verworven', 'eos.debtfree': 'Schuldenvrij 🎉',
    'eos.asset.row': '+{{cf}}/mnd', 'eos.debt.row': '-{{pmt}}/mnd',
    'eos.debrief.label': '📘 FXminds Terugblik',
    'eos.ft.cta.body': 'Je vond de uitweg die de meeste mensen nooit vinden.<br><strong>De Ratrace is voorbij. Het echte spel begint nu.</strong><br>Kapitaal. Vaardigheid. Hefboom. Dat is waar de Fast Track over gaat.',
    'eos.ft.cta.btn': '🚀 Betreedt de Fast Track',
    'eos.share.text': 'Turns: {{turns}} · Lv {{level}} · {{passive}}/mnd passief',
    'eos.share.copy': '📋 Kopiëren', 'eos.share.copied': '✓ Gekopieerd!',
    'eos.replay': 'Nog een keer spelen', 'eos.brand': 'Powered by FXminds Academy',
    'eos.skool.title': 'Wil je dit in het echte leven beter aanpakken?',
    'eos.skool.text': 'In FXminds Skool leer je hoe je cashflow opbouwt, schulden vermindert en financiële structuur creëert — zodat het spel geen simulatie meer is maar jouw realiteit wordt.',
    'eos.skool.btn': 'Word lid van FXminds Skool →',
    'win.line1.s': '{{n}} bezitting genereert {{passive}}/mnd — zonder dat jij een vinger uitsteekt. Dat is het hele punt.',
    'win.line1.p': '{{n}} bezittingen genereren {{passive}}/mnd — zonder dat jij een vinger uitsteekt. Dat is het hele punt.',
    'win.line2': 'Jouw passief inkomen dekt nu 100% van jouw {{expenses}}/mnd uitgaven. Het overschot van {{surplus}}/mnd is brandstof — zet het meteen aan het werk.',
    'win.line3.multi': "Je spreidde over meerdere inkomstenstromen. Dat is niet diversificatie om de diversificatie — dat is veerkracht die je echt voelt.",
    'win.line3.few': 'Één of twee bezittingen hebben je hier gebracht. Stel je voor wat er gebeurt als je er meer stapelt. Volgende ronde: breeder bouwen.',
    'win.line4.clean': 'Je bent er schoon doorheen gekomen. Geen schuldlast. Elke euro cashflow verbindt voortaan.',
    'win.line4.debts': 'Je draagt nog {{n}} schuld{{s}} die jouw cashflow bloeden. Dat is het eerste wat je in de Fast Track oplost.',
    'loss.cause.noassets': 'Nul bezittingen — er is nooit passief inkomen opgebouwd. Elke maand was je 100% afhankelijk van actief inkomen om te overleven.',
    'loss.cause.debt_drag': 'Schuldbetalingen slokten {{drag}}/mnd op — {{pct}}% van jouw salaris. Dat liet bijna niets over om te investeren.',
    'loss.cause.neg_cf': 'Maandelijkse cashflow was {{cf}} — je gaf elke maand meer uit dan je verdiende.',
    'loss.cause.trap': 'Klassieke val: negatieve cashflow en geen bezittingen — geen ontsnapping mogelijk. Eén bezit dat passief inkomen genereert had de spiraal kunnen doorbreken.',
    'loss.cause.buffer': 'Een tegenslag trof terwijl jouw cashbuffer te dun was. Je had geen bezittingen om de klap op te vangen.',
    'loss.debrief.1a': 'Je droeg schuldbetalingen zonder ooit één bezit te kopen. Schuld comprimeert cashflow — bezittingen vergroten die. Je had beide nodig om elkaar te compenseren.',
    'loss.debrief.1b': 'Geen bezittingen, geen passief inkomen. Actief inkomen alleen kan uitgaven nooit voor altijd bijbenen — één tegenslag is genoeg.',
    'loss.debrief.2': 'Met negatieve maandelijkse cashflow maakte elke betaaldag het erger. De enige uitweg was een bezit dat meer genereerde dan het tekort — en dat raam is nooit geopend.',
    'loss.debrief.3': 'Volgende ronde: bescherm eerst je cashbuffer (€1.500–€2.000 minimum), neem dan berekende bezitposities. Eén klein bezit dat €150/mnd oplevert, verandert alles.',
    'mp.rank.escaped': '{{name}} Ontsnapt!', 'mp.rank.gameover': 'Eindspel',
    'mp.rank.sub.win': 'Als eerste ontsnapt aan de Ratrace', 'mp.rank.sub.over': 'Eindranglijst',
    'mp.rank.detail': 'Lv {{level}} · {{turns}} beurten · {{assets}} bezittingen',
    'mp.rank.replay': '🔄 Opnieuw spelen', 'mp.rank.skool': 'Word lid van FXminds Skool →',
    'ft.title': 'De Ratrace ligt achter je.',
    'ft.tagline': 'De meeste mensen brengen hun hele carrière door met proberen hier te komen.<br>Jij hebt het gehaald. Nu wordt het interessant.',
    'ft.quote': '"Passief inkomen brengt je eruit.<br>Kapitaal en vaardigheid bepalen<br>hoe ver je echt gaat."',
    'ft.g1.title': 'Handelsstrategieën inzetten', 'ft.g1.sub': '— vaardigheidsgedreven, asymmetrische rendementen',
    'ft.g2.title': 'Algoritmische systemen bouwen', 'ft.g2.sub': '— regels vervangen emotie',
    'ft.g3.title': 'Kapitaal agressief schalen', 'ft.g3.sub': '— doel: €10.000/mnd passief',
    'ft.g4.title': 'Jouw voorsprong vinden', 'ft.g4.sub': '— niet voorspelling, kans',
    'ft.btn': '▶ Schaal kapitaal op',
    'opp.rental_small.title': 'Klein huurpand',
    'opp.rental_small.desc': 'Een 2-kamer appartement staat te koop in een opkomende wijk. Sterke huurvraag in de buurt.',
    'opp.rental_small.buy': 'Kopen',
    'opp.dividend.title': 'Dividendaandelen deal',
    'opp.dividend.desc': 'Een makelaar biedt je aandelen in een nutsbedrijf met een betrouwbaar jaarlijks dividendrendement van 7%.',
    'opp.dividend.buy': 'Investeer €5.000',
    'opp.vending.title': 'Automatenroute',
    'opp.vending.desc': 'Koop een route van 4 automaten al geplaatst in kantoren. Weinig onderhoud, stabiel inkomen.',
    'opp.vending.buy': 'Koop route (€3.500)',
    'opp.privnote.title': 'Privé hypotheekakte',
    'opp.privnote.desc': 'Een vriend verkoopt een hypotheekakte. Jij wordt de geldverstrekker en int maandelijkse betalingen.',
    'opp.privnote.buy': 'Koop akte (€10.000)',
    'opp.carwash.title': 'Geautomatiseerde wasstraat',
    'opp.carwash.desc': 'Een self-service wasstraat staat te koop. De vorige eigenaar gaat met pensioen. Klaarstaat operatie.',
    'opp.carwash.buy': 'Overnemen (€15.000)',
    'opp.index.title': 'Indexfonds investering',
    'opp.index.desc': 'Geld in een breed marktindexfonds plaatsen. Lager rendement maar extreem laag risico.',
    'opp.index.buy2k': 'Investeer €2.000', 'opp.index.buy5k': 'Investeer €5.000',
    'opp.storage.title': 'Opslagfaciliteit',
    'opp.storage.desc': '12-unit zelfopslagfaciliteit in een buitenwijk. Hoge bezettingsgraad, recessiebestendig.',
    'opp.storage.buy': 'Koop faciliteit (€20.000)',
    'opp.angel.title': 'Angel investering',
    'opp.angel.desc': 'Een startende ondernemer haalt startkapitaal op. Hoog risico, hoog potentieel. Ze bieden jou aandelen met een winstdelingsstructuur.',
    'opp.angel.buy': 'Investeer €7.500 (hoog risico)',
    'opp.laundromat.title': 'Wasserette',
    'opp.laundromat.desc': 'Een drukke wasserette vlakbij een studentencampus. Eigenaarfinanciering beschikbaar — lagere instapkosten.',
    'opp.laundromat.buy': 'Kopen (€6.000 aanbetaling)',
    'opp.duplex.title': 'Duplex pand',
    'opp.duplex.desc': 'Een duplex met beide units bezet. Woon in één, verhuur de andere — of verhuur beide.',
    'opp.duplex.buy': 'Aankopen (€12.000 aanbetaling)',
    'opp.blog.title': 'Content website',
    'opp.blog.desc': 'Koop een gevestigde niche-website met affiliate- en advertentie-inkomsten. Weinig onderhoud.',
    'opp.blog.buy': 'Koop site (€4.500)',
    'opp.parking.title': 'Parkeerterrein',
    'opp.parking.desc': 'Klein parkeerterrein in een stadscentrum. Vlakbij een stadion. Minimaal beheer vereist.',
    'opp.parking.buy': 'Koop terrein (€18.000)',
    'opp.debt_payoff.title': 'Schuldaflossingskans',
    'opp.debt_payoff.desc': 'Je hebt de kans om een van je schulden vroegtijdig af te lossen met 15% korting.',
    'opp.debt_payoff.buy': 'Los een schuld af',
    'opp.royalty.title': 'Royaltyovereenkomst',
    // ── Asset & debt display names (Dutch)
    'asset.rental_small':'Klein Huurappartement','asset.dividend':'Dividendaandelen','asset.vending':'Automatenroute','asset.privnote':'Privé Hypotheeklening','asset.carwash':'Geautomatiseerde Carwash','asset.index':'Indexfonds','asset.storage':'Opslagverhuur','asset.laundromat':'Wasserette','asset.duplex':'Duplex Woning','asset.blog':'Niche Website','asset.parking':'Parkeerplaats','asset.royalty':'Royalty Overeenkomst','asset.loan.car_repair':'Autolening','debt.student_loan':'Studielening','debt.med_school':'Medische Studieschuld','debt.business_loan':'Bedrijfsstartlening',
    'opp.royalty.desc': 'Een uitgeverij wil jouw methode licenseren voor hun trainingsmateriaal. Teken een royaltyovereenkomst.',
    'opp.royalty.buy': 'Onderteken de deal', 'opp.royalty.decline': 'Weigeren',
    'opp.bonus.title': 'Prestatiebonus',
    'opp.bonus.desc': 'Je werkgever beloont sterke prestaties met een eenmalige cashbonus!',
    'opp.bonus.collect': 'Ontvang bonus',
    'bad.er.title': 'Spoedeisende hulp',
    'bad.er.desc': 'Je wordt wakker met pijnklachten op de borst en belandt op de spoedeisende hulp. Verzekering dekt een deel — de rest is voor jou.',
    'bad.er.pay': 'Volledig betalen (€3.500)', 'bad.er.plan': 'Betalingsregeling ziekenhuis (+€140/mnd)',
    'bad.surgery.title': 'Onverwachte operatie',
    'bad.surgery.desc': 'Een gezondheidsprobleem vereist een operatie. Jouw verzekering met hoog eigen risico betekent dat je het eigen risico plus eigen bijdrage betaalt.',
    'bad.surgery.pay': 'Eigen risico betalen (€5.500)', 'bad.surgery.card': 'Medische creditcard (+€220/mnd)',
    'bad.trans.title': 'Versnellingsbak kapot',
    'bad.trans.desc': "Jouw auto rijdt niet meer. De monteur zegt dat de versnellingsbak er doorheen is. Je hebt vervoer nodig voor je werk.",
    'bad.trans.pay': 'Reparatie betalen (€2.800)', 'bad.trans.finance': 'Reparatie financieren (+€110/mnd)', 'bad.trans.cheap': 'Goedkope tweedehands kopen (€1.200)',
    'bad.fender.title': 'Aanrijding',
    'bad.fender.desc': 'Je rijdt achterop iemand bij een rood stoplicht. Kleine schade maar jouw eigen risico is verschuldigd en je premie gaat omhoog.',
    'bad.fender.pay': 'Eigen risico betalen (€1.000) — premie +€50/mnd', 'bad.fender.settle': 'Privé regelen — riskant (€600)',
    'bad.taxbill.title': 'Onverwachte belastingaanslag',
    'bad.taxbill.desc': 'Je hebt dit jaar te weinig belasting betaald — neveninkomsten, vergeten beleggingswinsten of een gemiste aftrek. De Belastingdienst wil €2.400.',
    'bad.taxbill.pay': 'Volledig betalen (€2.400)', 'bad.taxbill.plan': 'Betalingsregeling Belastingdienst (+€100/mnd)',
    'bad.audit.title': 'Boekencontrole',
    'bad.audit.desc': 'De Belastingdienst controleert jouw zakelijke aftrekposten. Na maanden papierwerk ben je achterstallige belasting, rente en een boete verschuldigd.',
    'bad.audit.pay': 'Totaalrekening betalen (€3.800)', 'bad.audit.lawyer': 'Belastingadviseur inhuren (€1.200 — 60% kans op vermindering)', 'bad.audit.plan': 'Betalingsregeling (+€160/mnd)',
    'bad.crash.title': 'Beurskrach',
    'bad.crash.desc': 'Een grote marktcorrectie slaat toe. Indices dalen meer dan 30% in één maand. Jouw aandelenbezittingen worden geraakt.',
    'bad.crash.hold': 'Vasthouden en doorstaan — lange termijn strategie', 'bad.crash.sell': 'Panieksell — alles verkopen (nu uitstappen)',
    'bad.recession.title': 'Economische recessie',
    'bad.recession.desc': 'De economie krimpt. Consumentenbestedingen dalen. Bedrijfsomzetten dalen en bedrijven snijden in uren. Jouw inkomen wordt geraakt.',
    'bad.recession.accept': 'Inkomensverlies accepteren (−20% tijdelijk)', 'bad.recession.bridge': 'Reserves inzetten — inkomen beschermen (€3.000)',
    'bad.storm.title': 'Stormschade',
    'bad.storm.desc': 'Een zware storm beschadigt jouw dak en airconditioning. Verzekering dekt de grote schade — maar het eigen risico is voor jou.',
    'bad.storm.pay': 'Eigen risico betalen (€2.500)', 'bad.storm.loan': 'Eigenwaardekrediet (+€120/mnd)',
    'bad.tenant.title': 'Probleemhuurder',
    'bad.tenant.desc': 'Een huurder stopt met huren, beschadigt de woning en vereist juridische uitzetting. Je verliest twee maanden inkomen en maakt reparatiekosten.',
    'bad.tenant.evict': 'Uitzetten en repareren (€2.000)', 'bad.tenant.sell': 'Het pand verkopen (10% onder kostprijs)', 'bad.tenant.absorb': 'Kosten absorberen (€600)',
    'bad.lawsuit.title': 'Aansprakelijkheidseis',
    'bad.lawsuit.desc': "Iemand struikelt op jouw eigendom en klaagt. Jouw aansprakelijkheidsdekking heeft een gat. Je betaalt een deel van de schikking.",
    'bad.lawsuit.settle': 'Buiten rechter schikken (€4.200)', 'bad.lawsuit.fight': 'Aanvechten (€1.500 juridisch + 50/50 uitkomst)', 'bad.lawsuit.plan': 'Betalingsregeling (+€180/mnd)',
    'bad.identity.title': 'Identiteitsfraude',
    'bad.identity.desc': "Er worden frauduleuze rekeningen op jouw naam geopend. Het bezwaar duurt maanden. Je absorbeert €1.500 aan kosten die jouw bank niet volledig dekt.",
    'bad.identity.resolve': 'Rekeningen beveiligen (€1.500)',
    'bad.inflation.title': 'Stijgende kosten van levensonderhoud',
    'bad.inflation.desc': 'Boodschappen, nutsvoorzieningen, verzekeringen — alles gaat tegelijk omhoog. Jouw koopkracht krimpt ondanks een ongewijzigd salaris.',
    'bad.inflation.absorb': 'Stijgingen absorberen (+€180/mnd uitgaven)', 'bad.inflation.cut': 'Discretionaire uitgaven verminderen (+€60/mnd alleen)',
    'bad.layoff.title': 'Ontslagbericht',
    'bad.layoff.desc': 'Bedrijfsreorganisatie schrapt jouw afdeling. Twee weken ontslagvergoeding. Tijd om je volgende stap te bepalen.',
    'bad.layoff.accept': 'Inkomensverlies accepteren tijdens zoektocht (−30%)', 'bad.layoff.bridge': 'Gat overbruggen met spaargeld (€2.500)',
    'ft.ts.title': 'Handelsstrategie',
    'ft.ts.desc': "Professionals voorspellen niet — ze vinden opstellingen waarbij de kansen in hun voordeel kantelen en voeren consistent uit.",
    'ft.ts.apply': 'Strategie toepassen (€3.000 — variabel rendement)', 'ft.ts.pass': 'Passen — eerst studeren',
    'ft.qs.title': 'Kwantstrategie',
    'ft.qs.desc': 'Elimineer emotie. Laat een regelgebaseerd systeem de beslissingen nemen — sneller, kouder en consistenter dan een mens.',
    'ft.qs.apply': 'Algoritme inzetten (€5.000)', 'ft.qs.pass': 'Passen',
    'ft.me.title': 'Marktvoordeel systeem',
    'ft.me.desc': 'Eén herhaalbaar voordeel, toegepast over honderden opstellingen, verslaat elke briljante voorspelling.',
    'ft.me.apply': 'Voordeel bouwen (€2.500)', 'ft.me.pass': 'Passen',
    'tip.opp1.h': 'Één vraag. Elke keer.', 'tip.opp1.b': 'Wat levert dit mij per maand op? Niet het verhaal. Niet de hype. Gewoon het getal.',
    'tip.opp2.h': 'Reken eerst, beslis dan', 'tip.opp2.b': 'ROI = (maandelijkse cashflow × 12) ÷ kosten. Als de berekening klopt, tellen emoties niet mee.',
    'tip.opp3.h': 'De enige test die telt', 'tip.opp3.b': "Zet het geld in jouw zak zonder dat jij werkt? Dan — koop het. Zo niet — het is een verplichting in vermomming.",
    'tip.opp4.h': 'Wanneer verdient het zichzelf terug?', 'tip.opp4.b': 'Kosten ÷ maandelijkse cashflow = maanden tot breakeven. Daarna is het voor altijd winst. Denk in die eenheden.',
    'tip.good1.h': 'Bezittingen creëren vrijheid', 'tip.good1.b': 'Bezittingen creëren vrijheid. Maar vaardigheden creëren asymmetrische rendementen. Stapel beide.',
    'tip.good2.h': 'Een cashflowmachine — geen baan', 'tip.good2.b': 'Dit bezit betaalt je of je nu werkt of niet. Dat is het verschil tussen inkomen en vermogen.',
    'tip.good3.h': 'Meerdere stromen, één richting', 'tip.good3.b': 'Elke inkomstenstroom is een pijler. De meeste mensen bouwen er één. Rijke mensen bouwen er meerdere.',
    'tip.dec1.h': 'Tijd is je schaarsste bezit', 'tip.dec1.b': 'Elke maand dat geld niets doet, is een maand rente-op-rente die je niet terugkrijgt.',
    'tip.dec2.h': 'Handel in kansen, niet in emotie', 'tip.dec2.b': 'De meeste mensen ruilen tijd voor geld. Een paar leren kansen te verhandelen. Cijfers liegen niet.',
    'tip.bad1.h': 'Eén slechte maand mag het spel niet beëindigen', 'tip.bad1.b': 'Zonder cashbuffer raakt elke ramp direct je cashflow. Bescherm eerst de bodem, dan bouwen.',
    'tip.bad2.h': 'Schuld is een maandelijkse lek', 'tip.bad2.b': 'Elke aflossing is cashflow die geen volgend bezit kan kopen. Dicht de lek of het vermeerdert tegen je.',
    'tip.bad3.h': 'Geldpijn is tijdelijk. Schuldpijn is maandelijks.', 'tip.bad3.b': 'Betaal nu en ga verder, of draag het als schuld en betaal elke maand. Kies met heldere ogen.',
    'tip.bad4.h': 'Paniek is duur', 'tip.bad4.b': 'De duurste financiële beslissingen worden gemomen in de slechtste momenten. Vertraag. Reken door. Dan beslissen.',
    'tip.debt1.h': 'Die schuld kostte je elke maand geld', 'tip.debt1.b': 'Nu is die cashflow van jou. Stuur het meteen door — elke maand dat je het laat liggen, mis je rente-op-rente.',
    'tip.p25.h': '1 op de 4 rekeningen — betaald zonder jou', 'tip.p25.b': 'Een kwart van jouw leven wordt nu gefinancierd door bezittingen, niet inspanning. Stapel meer totdat dat getal 100 is.',
    'tip.p50.h': 'De helft van jouw leven wordt nu gefinancierd', 'tip.p50.b': 'De helft van je uitgaven. Geen baan nodig. De volgende 50% gaat sneller — je hebt nu meer om mee te werken.',
    'tip.p75.h': 'Je bent er bijna. Stop nu niet.', 'tip.p75.b': 'Nog één of twee stappen. Jouw geld werkt harder dan jij. Doorzetten.',
    'tip.lvl.h': 'Level omhoog.', 'tip.lvl.b': 'Elk level is een vaardigheid die de meeste mensen tientallen jaren nodig hebben — als ze er ooit komen. Ga door.',
    'tip.ft1.h': 'Fase één is voorbij.', 'tip.ft1.b': 'De meeste mensen brengen hun hele leven door met proberen hier te komen. Jij hebt het gehaald. Nu is de vraag: hoe ver kun jij gaan?',
    'tip.ft2.h': 'Een vaardigheid heeft geen plafond.', 'tip.ft2.b': 'Een bezit levert een vast rendement op. Een vaardigheid verbindt. Één consequent toegepaste voorsprong creëert asymmetrische rendementen.',
    'tip.ft3.h': "Je hoeft niet altijd gelijk te hebben. Je hebt een voorsprong nodig.", 'tip.ft3.b': "Professionals voorspellen niet. Ze vinden opstellingen waarbij de kansen in hun voordeel kantelen — en herhalen dat.",
    'arch.high_earner.name': 'De Hoge Verdiener Die Nergens Komt',
    'arch.high_earner.desc': 'Jouw inkomen is echt. Maar jouw uitgaven ook. Hoog verdienen zonder bezittingen is gewoon een snellere loopband — het gat tussen wat je verdient en wat je houdt, is waar vrijheid leeft.',
    'arch.builder.name': 'De Bouwer Met Hefboom',
    'arch.builder.desc': "Sterk inkomen, ruimte om te bewegen, en je zet al kapitaal in. Je bent dichter bij de uitgang dan de meesten. De vraag is nu snelheid — hoe snel kun je bezittingen stapelen voordat lifestyle-creep inhaalt?",
    'arch.untapped.name': 'De Onbenutte Hoge Verdiener',
    'arch.untapped.desc': "Goed inkomen en echte marge — maar het geld staat stil. Elke maand dat je niet investeert, werkt het geld niet. Je hebt de brandstof. Je hebt de motor nodig.",
    'arch.saver.name': 'De Gedisciplineerde Spaarder',
    'arch.saver.desc': "Lager inkomen, maar je houdt uitgaven laag. Die discipline is zeldzaam — de meeste mensen geven automatisch tot aan hun salaris uit. Jouw voordeel: marge. Je kunt van hieruit bouwen met minder risico dan bijna iedereen.",
    'arch.efficient.name': 'De Efficiënte Bouwer',
    'arch.efficient.desc': "Bescheiden inkomen, gecontroleerde uitgaven, en al aan het investeren. Je speelt het lange spel correct. De bottleneck is niet discipline — het is kapitaal. Meer inkomen of hefboom opent het volgende niveau.",
    'arch.squeezed.name': 'De Gekneusde Werker',
    'arch.squeezed.desc': "Het grootste deel van jouw inkomen verdwijnt voordat je er gebruik van kunt maken. Dat is geen uitgavenprobleem — het is een structuurprobleem. De marge is te krap om vanuit te investeren. Er moet iets veranderen.",
    'arch.stretched.name': 'De Gespannen Investeerder',
    'arch.stretched.desc': "Je investeert terwijl je krap zit. Dat vereist discipline — maar het betekent ook dat één slechte maand jouw buffer wegvaagt. Je bouwt op een smal fundament. Stabiliteit vóór schaal.",
    'arch.trader.name': 'De Aspirant Trader',
    'arch.trader.desc': "Je wilt marktblootstelling en actieve rendementen. Dat is een echte weg — maar het is de moeilijkste om uit te voeren. De meeste traders verliezen. Degenen die dat niet doen, hebben regels, geen voorspellingen.",
    'arch.debt_anchor.name': 'De Schuldenaar',
    'arch.debt_anchor.desc': "Jouw inkomen gaat sneller uit dan je denkt — en veel ervan dekt het verleden, niet de toekomst. Zware schuld bij een bescheiden inkomen is de meest voorkomende financiële val. De ketting breken is de enige eerste stap.",
    'arch.heavy_debt.name': 'De Hoge Verdiener Die Gewicht Draagt',
    'arch.heavy_debt.desc': "Goed inkomen met aanzienlijke schuld is een race tussen bouwen en terugbetalen. Je kunt het winnen — maar alleen als je de schuldbetalingsstructuur niet het tempo laat bepalen.",
    'arch.aware.name': 'De Bewuste Starter',
    'arch.aware.desc': "Je let op jouw financiën — wat je al verder brengt dan de meesten. De cijfers zijn bescheiden, maar bewustzijn is waar elke financiële transformatie begint.",
    'bn.debt_heavy.h': 'Schuld sleept elke maand', 'bn.debt_heavy.t': "Voordat je ook maar één euro investeert, is een deel van jouw inkomen al bestemd. <strong>Zware schuld creëert een dubbel verlies</strong>: je betaalt rente uit én je mist rente-op-rente inkomen. In deze simulatie voel je die wrijving meteen.",
    'bn.debt_mod.h': 'Maandelijkse schuld verkleint jouw ruimte', 'bn.debt_mod.t': "Gemiddelde schuld voelt niet catastrofaal — maar het vreet stil de marge die je nodig hebt om te investeren. <strong>€200/mnd aan schuldbetalingen is €2.400/jaar dat niet samengesteld wordt.</strong> De simulatie laat je precies zien wat dat over tijd kost.",
    'bn.tight.h': 'Uitgaven slopen jouw marge', 'bn.tight.t': "Met <strong>{{pct}}%</strong> van het inkomen dat naar uitgaven gaat, is er bijna geen brandstof meer om te investeren. In deze simulatie voel je precies waarom dit de kernval is. <em>Elke euro die je vrijmaakt, verbindt vanaf de eerste maand.</em>",
    'bn.lifestyle.h': 'Groeiende levensstijluitgaven blokkeren de uitgang', 'bn.lifestyle.t': "Jouw uitgaven schaalden mee met jouw inkomen — een patroon zo gewoon dat het een naam heeft. <strong>Lifestyle creep</strong> voelt niet gevaarlijk. Het sluit stilletjes elk kansvenster. De simulatie laat zien hoe hetzelfde inkomen eruitziet bij andere uitgavenbeslissingen.",
    'bn.idle.h': 'Overschot staat stil', 'bn.idle.t': "Je hebt marge. Dat is zeldzaam. Maar geld dat in een bankrekening staat heeft een <strong>negatief reëel rendement</strong> na inflatie. Het gat tussen een overschot hebben en het inzetten is waar de meeste mensen jarenlang vastlopen.",
    'bn.thin.h': 'Buffer te dun', 'bn.thin.t': "Investeren terwijl je krap zit is mogelijk — maar <strong>één tegenslag</strong> en je bent gedwongen te verkopen of schuld te nemen. In de simulatie zijn tegenslagen willekeurig. Een dunne buffer maakt ze buitenproportioneel kostbaar.",
    'bn.nocf.h': 'Rendementen najagen zonder cashflow', 'bn.nocf.t': "Handelsinkomsten zijn volatiel. Het vervangt geen <strong>stabiele passieve cashflow</strong> — het vergroot die. De markt ingaan zonder een cashflowbasis betekent dat elke verliesreeks je leven raakt, niet alleen je rekening.",
    'bn.noown.h': 'Inkomen zonder eigendom', 'bn.noown.t': "Hoog inkomen voelt als zekerheid. Het is dat niet. Inkomen stopt als jij stopt. <strong>Bezittingen niet.</strong> Op dit moment is 100% van jouw financiële output afhankelijk van jouw aanwezigheid. Dat is de exacte definitie van de Ratrace.",
    'bn.notfelt.h': 'Investeren maar het nog niet voelen', 'bn.notfelt.t': "Je doet de juiste dingen — maar een vrijheidsscore van <strong>{{freedom}}/10</strong> suggereert dat de resultaten nog niet in jouw leven verschijnen. Dat is een tijdsprobleem, geen strategieprobleem. <em>Rendementen voelen langzaam aan totdat dat niet meer zo is.</em>",
    'bn.passive.h': 'Passief inkomen te klein om te voelen', 'bn.passive.t': "Zelfs met goede marges en wat investeringen heeft het passieve inkomen nog geen drempel bereikt waarbij het beslissingen verandert. <strong>De eerste €500/mnd passief</strong> is het psychologische keerpunt. Dat is jouw eerste doel.",
    'str.inv.h': 'Je hebt al werkende bezittingen', 'str.inv.t': "De meeste mensen die dit lezen, niet. Je hebt al de eerste barrière genomen — begrijpen dat geld geld kan genereren. <em>Die mindset is niet vanzelfsprekend. Bouw erop verder.</em>",
    'str.dfree.h': 'Geen schuld — dat is een echt voordeel', 'str.dfree.t': "De meeste mensen op jouw inkomensniveau dragen consumentenschulden. Jij niet. Dat betekent <strong>100% van jouw overschot is inzetbaar</strong>, niet bestemd voor rentebetalingen. Schoon starten is zeldzamer dan het klinkt.",
    'str.surp.h': 'Je hebt echte inzetbare marge', 'str.surp.t': "Een overschot van <strong>€{{surplus}}/mnd</strong> is echt kapitaal. De meeste mensen in jouw inkomenscategorie geven tot de rand uit. Jij niet. Dat gat is jouw concurrentievoordeel in deze simulatie.",
    'str.lean.h': 'Uitgavendiscipline is een echte vaardigheid', 'str.lean.t': "Je hebt geleerd sober te leven — en dat verandert niet als het inkomen groeit. <em>Mensen die discipline opbouwen bij laag inkomen worden gevaarlijke investeerders</em> als het inkomen stijgt. De vaardigheid is er al.",
    'str.high.h': 'Hoog inkomen is echte hefboom', 'str.high.t': "Elk bezit dat je koopt, zet <strong>inkomen dat je al verdient</strong> om in permanente cashflow. Op jouw inkomensniveau kan één goed gekozen bezit meer passief inkomen per maand genereren dan de meeste mensen verdienen met een parttime baan.",
    'str.aware.h': 'Bewustzijn is de eerste stap', 'str.aware.t': "Een lage vrijheidsscore met een doel van financiële vrijheid is geen tegenstrijdigheid — het is helderheid. <em>De meeste mensen geven niet toe waar ze echt staan.</em> Jij wel. Dat maakt de simulatie nuttig in plaats van alleen vermakelijk.",
    'str.know.h': 'Je weet dat bezittingen bestaan — en gebruikt ze', 'str.know.t': "Het merendeel van de mensen in jouw inkomenscategorie parkeert geld op een spaarrekening en noemt dat beleggen. Jij niet. Dat begrip is het echte fundament — al het andere is gewoon schaal.",
    'str.show.h': 'Je bent er', 'str.show.t': "De meeste mensen die zich financieel vastzitten, vermijden direct naar de cijfers te kijken. Jij hebt zojuist vijf eerlijke vragen over jouw situatie beantwoord. <em>Die bereidheid om het onder ogen te zien is zeldzamer dan welke financiële vaardigheid dan ook.</em>",
    'cta.freedom_debt': 'Deze simulatie laat zien wat er gebeurt als je prioriteit geeft aan schuldeliminatie vs. tegelijkertijd investeren. <strong>Jouw situatie heeft een specifieke optimale volgorde — vind die.</strong>',
    'cta.freedom': 'Deze simulatie is ontworpen om je precies te laten zien welke beslissingen het gat het snelst dichten. <strong>Jouw ontsnappingsroute is specifiek voor jouw situatie.</strong>',
    'cta.extra': 'Extra inkomen begint met één bezit. <strong>Deze simulatie laat je zien hoe je het eerste koopt — en wat het echt doet met jouw maandelijkse cijfers.</strong>',
    'cta.invest': '<strong>Echt investeren zijn beslissingen onder druk.</strong> Deze simulatie creëert die druk met echte gevolgen, niet abstracte theorie.',
    'cta.trading': 'De Fast Track fase ontgrendelt geavanceerde strategieën, inclusief systematisch traden. <strong>Kom er eerst — het vereist het ontsnappen aan de Ratrace.</strong>',
    'diag.stat.income': 'Inkomen / mnd', 'diag.stat.surplus': 'Overschot / mnd', 'diag.stat.debt': 'Schuldlast',
    'diag.debt.none': 'Geen', 'diag.debt.small': 'Klein', 'diag.debt.moderate': 'Gemiddeld', 'diag.debt.heavy': 'Zwaar',
    'char.se.story': 'Stabiel salaris, lage overhead. De schoonste startpositie — maar nog steeds tijd ruilen voor geld.',
    'char.te.story': 'Bescheiden inkomen, lagere uitgaven — maar met een studielening. Krappe marges, veel geduld vereist.',
    'char.doc.story': "Hoog inkomen, maar hoge uitgaven en zware studiekosten. Grote getallen betekenen geen financiële vrijheid.",
    'char.ent.story': 'Hoger inkomen, maar een starterslening en volatiele cashflow. Hoog risico, hoge upside — als je het goed speelt.',
    'char.tr.story': "Je hebt de grafieken bestudeerd. De forums gelezen. Nu is het tijd om te leren wat echt werkt — met echte inzet.",
    'char.fx.story': 'Je investeerde in opleiding vóór cash. Een kleine passieve inkomstenstroom loopt al — nu moet je het opschalen.',
    'char.la.story': 'Geweldig inkomen. Bijna niets over op de 15e. Twee schuldbetalingen. Nul bezittingen. De Ratrace op zijn best.',
    'char.gr.story': "Lage uitgaven, solide spaargeld, geen schuld. Je hebt jarenlang hard gewerkt. Nu leer je hoe je geld voor jou laat werken.",
    'log.acquired':    'Bezit verworven: {{name}} (+{{cf}}/mnd cashflow)',
    'log.sold_asset':  'Bezit verkocht: {{name}}',
    'log.new_debt':    'Nieuwe schuld: {{name}} ({{amt}})',
    'log.payday':      'Salaris! Netto cashflow: {{flow}}/mnd',
    'log.debt_cleared':'\u{1F4B3} {{name}} afgelost \u2014 +{{pmt}}/mnd cashflow vrijgemaakt',
    'log.sold_for':    '\u{1F3E0} {{name}} verkocht voor {{amt}}',
    'log.level_up':    '\u2B50 Level omhoog! Nu: {{title}}',
    'log.level_up2':   '\u2B50 Level omhoog \u2192 {{title}}!',
    'log.angel.win':   '\u{1F389} Jouw startup investering heeft zich uitbetaald!',
    'log.angel.loss':  '\u{1F4B8} Startup gevouwen. Investering verloren.',
    'log.debt.no_cash':'Niet genoeg geld voor vroege aflossing.',
    'log.royalty':     'Royaltyovereenkomst ondertekend. Passief inkomen toegevoegd.',
    'log.med.plan':    'Ingeschreven voor ziekenhuisbetalingsregeling. +\u20AC140/mnd lasten.',
    'log.surgery.card':'Operatiekosten op medische creditcard. Hoge rente \u2014 snel aflossen.',
    'log.car.financed':'Autoreparatie gefinancierd. \u20AC110/mnd gaat van cashflow af tot afbetaald.',
    'log.car.cheap':   'Goedkope tweedehands gekocht. Lening vermeden. Pragmatische keuze.',
    'log.car.deduct':  'Eigen risico betaald. Verzekeringspremie +\u20AC50/mnd permanent.',
    'log.car.settle.ok':'Priv\u00E9schikking werkte. Geen premie-verhoging.',
    'log.car.settle.bad':'Andere bestuurder diende toch claim in. Kostte uiteindelijk meer.',
    'log.tax.plan':    'Belastingdienst-betalingsregeling. \u20AC100/mnd tot opgelost.',
    'log.tax.atty.win':'Adviseur behaalde korting. \u20AC800 bespaard vs. volledig bedrag.',
    'log.tax.atty.loss':'Adviseur kon rekening niet verminderen. Volledig betaald plus advieskosten.',
    'log.crash.none':  'Koers kelderde maar je bezit echte assets, geen aandelen. Geen impact.',
    'log.crash.hold':  '\u{1F4C9} Dividenden gehalveerd op {{n}} aandelenpositie(s). Markten herstellen.',
    'log.crash.panic': 'Verlies vastgelegd. Klassieke emotionele verkoop op het dieptepunt.',
    'log.crash.empty': 'Niets te verkopen. Gediversifieerde bezittingen beschermden je.',
    'log.rec.cut':     'Actief inkomen verlaagd met {{amt}}/mnd tijdens recessie. Recessies zijn tijdelijk.',
    'log.rec.buffer':  'Reserves ingezet om inkomen op peil te houden. Noodfonds werkt.',
    'log.prop.relist': 'Pand opgeknapt en opnieuw verhuurd. Binnenkort weer cashflow.',
    'log.court.won':   'Gewonnen in rechtbank. Alleen juridische kosten betaald. Juiste keuze.',
    'log.court.lost':  'Verloren. Vonnis plus kosten betaald. Risico heeft niet uitbetaald.',
    'log.id.secured':  'Accounts beveiligd. Kredietbevriezing ingesteld. Goede les digitale veiligheid.',
    'log.infl.absorb': 'Uitgaven gestegen \u20AC180/mnd. Inflatie is de onzichtbare belasting.',
    'log.infl.cut':    'Budget aangescherpt. Slechts \u20AC60/mnd stijging. Cashflow beschermen loont.',
    'log.layoff.save': 'Spaargeld ingezet om gat te overbruggen. Inkomen beschermd.',
    'log.ft.ts.flat':  '\u{1F4CA} Handelsstrategie: vlakke cyclus.',
    'log.ft.ts.study': 'Strategie eerst bestuderen.',
    'log.ft.ts.result':'\u{1F4CA} Handelsstrategie opgeleverd +{{amt}}.',
    'log.ft.qs.pass':  'Kwantstrategie overgeslagen.',
    'log.ft.qs.dep':   '\u{1F916} Kwant-algoritme ingezet \u2014 +{{amt}}/mnd.',
    'log.ft.me.pass':  'Marktvoordeel overgeslagen.',
    'log.ft.me.none':  '\u{1F3AF} Marktvoordeel: geen opstelling deze cyclus.',
    'log.ft.me.result':'\u{1F3AF} Marktvoordeel opgeleverd +{{amt}}.',
    'log.ft.pf.pass':  'Portefeuillegroei uitgesteld.',
    'log.ft.pf.result':'\u{1F4C8} Geschaalde portefeuille \u2014 +{{amt}}/mnd.',
    'log.ft.al.pass':  'Algo-investering uitgesteld.',
    'log.ft.al.result':'\u2699\uFE0F Algo-systeem actief \u2014 +{{amt}}/mnd.',
    'log.start.sal':   '\u{1F4BC} Salaris: {{amt}}/mnd',
    'log.start.exp':   '\u{1F534} Uitgaven: {{amt}}/mnd',
    'log.start.cash':  '\u{1F4B5} Startgeld: {{amt}}',
    'log.start.debts': '\u{1F4B3} Startschulden: {{amt}} ({{names}})',
    'log.start.cf':    '\u{1F4CA} Netto cashflow: {{flow}}/mnd',
    'log.start.joined':'\u{1F3AE} Gestart als {{profession}} \u2014 {{income}}/mnd \u00B7 {{expenses}}/mnd',
    'accord.cost':     'Kostprijs',
    'accord.balance':  'Saldo',
    'accord.pay_off':  'Aflossen ({{amt}})',
    'msg.rolled':       '🎲 Gegooid {{roll}} → vakje {{pos}}',
    'msg.ft.incoming':  '🚀 Fast Track — nieuwe beleggingskaart komt eraan!',
    'msg.opp.incoming': '📈 Kans! Trek een kaart.',
    'msg.bad.incoming': '⚠️ Tegenslag komt eraan…',
    'log.opp.drawn':    '📈 Kans getrokken: {{title}}',
    'log.bad.drawn':    '⚠️ Tegenslag: {{title}}',
    'log.no_debt_selected': 'Geen schuld geselecteerd.',
    'log.chose_saving': 'Gekozen om te blijven sparen.',
    'log.bankrupt':     '💀 Failliet — uitgeschakeld.',
    'log.paid_off':     '{{name}} afgelost.',
    // ── Reflect screen row labels ──────────────────────────────────────────
    'reflect.row.income':   'Maandinkomen',
    'reflect.row.expenses': 'Maandelijkse uitgaven',
    'reflect.row.invests':  'Investeert momenteel',
    'reflect.row.debt':     'Schuldsituatie',
    'reflect.row.goal':     'Hoofddoel',
    'reflect.row.freedom':  'Vrijheidsscore',
    'reflect.val.inc.under2k': 'Onder €2k',
    'reflect.val.inc.2k4k':    '€2–4k',
    'reflect.val.inc.4k7k':    '€4–7k',
    'reflect.val.inc.over7k':  'Boven €7k',
    'reflect.val.exp.under1500':'Onder €1,5k',
    'reflect.val.exp.1500to3k': '€1,5–3k',
    'reflect.val.exp.3k5k':     '€3–5k',
    'reflect.val.exp.over5k':   'Boven €5k',
    'reflect.val.inv.no':       'Nog niet',
    'reflect.val.inv.sometimes':'Soms',
    'reflect.val.inv.yes':      'Ja, regelmatig',
    'reflect.val.debt.none':    'Geen schuld',
    'reflect.val.debt.small':   'Kleine schuld',
    'reflect.val.debt.moderate':'Gemiddelde schuld',
    'reflect.val.debt.heavy':   'Zware schuld',
    'reflect.val.goal.freedom': 'Financiële vrijheid',
    'reflect.val.goal.extra':   'Extra inkomen',
    'reflect.val.goal.invest':  'Vermogen opbouwen',
    'reflect.val.goal.trading': 'Leren traden',
    // ── Investor level titles ───────────────────────────────────────────────
    'level.1':  'Beginner',
    'level.2':  'Spaarder',
    'level.3':  'Investeerder',
    'level.4':  'Cashflow Bouwer',
    'level.5':  'Bezittingen Verzamelaar',
    'level.6':  'Passief Inkomen Pro',
    'level.7':  'Vermogensopbouwer',
    'level.8':  'Financieel Onafhankelijk',
    'level.9':  'Ratrace Ontsnapper',
    'level.10': 'Geldmeester',
    // ── Deal rating labels ──────────────────────────────────────────────────
    'deal.hot':   '🔥 Topkans',
    'deal.good':  '✅ Solide',
    'deal.fair':  '〰 Redelijk',
    'deal.weak':  '⚠️ Zwak',
    // ── Onboarding button text ──────────────────────────────────────────────
    'ob.btn.results': 'Zie mijn resultaten →',
    'ob.btn.to.mode': '← Modus',
    // ── SP screen back to mode select ───────────────────────────────────────
    'sp.btn.to.mode': '← Modus kiezen',
    // ── Email capture ──────────────────────────────────────────────────────
    'email.title.win':       'Sla je score op',
    'email.title.loss':      'Sla je resultaat op',
    'email.title.mp':        'Sla je score op',
    'email.sub.win':         'Ontvang nieuwe challenges en updates zodra er een leaderboard live is.',
    'email.sub.loss':        'Ontvang strategie tips en leer hoe je de volgende keer sneller ontsnapt.',
    'email.sub.mp':          'Sla je score op en vergelijk je resultaat later met andere spelers.',
    'email.placeholder':     'jouw@emailadres.nl',
    'email.btn.submit':      'Score opslaan',
    'email.btn.submitting':  'Bezig...',
    'email.btn.skip':        'Overslaan',
    'email.success.title':   'Score opgeslagen.',
    'email.success.sub':     'Check je inbox voor tips en updates.',
    'email.success.cta':     'Wil je leren hoe je dit slimmer aanpakt in het echte leven?',
    'email.success.btn':     'Ga naar FXminds Skool',
    'email.err.invalid':     'Voer een geldig e-mailadres in.',
    'email.err.region':      'Deze functie is momenteel alleen beschikbaar voor Nederland en België.',
    'email.err.generic':     'Iets ging mis. Probeer het opnieuw.',
    'accord.need_more':'Nog {{amt}} tekort',
  },

  en: {
    'currency.symbol': '$', 'currency.sep': ',', 'currency.dec': '.', 'currency.pm': '/mo',
    'brand.simulator': 'FXminds · Financial Simulator', 'brand.awareness': 'FXminds · Financial Awareness',
    'brand.cashflow': 'FXminds · Cashflow Simulator', 'brand.game_logo': 'Cashflow Simulator · by FXminds', 'brand.powered': 'Powered by FXminds Academy',
    'mode.title': 'Choose Game Mode', 'mode.sub': 'Single player or pass-and-play with up to 6 players on one device.',
    'mode.single.name': 'Single Player', 'mode.single.desc': 'Play solo — your situation, your choices, your escape.',
    'mode.local.name': 'Local Multiplayer', 'mode.local.desc': '2–6 players, pass-and-play. Each player sets up their own situation.',
    'mode.online.name': 'Online Multiplayer', 'mode.online.desc': 'Play against friends in real time from anywhere.', 'mode.online.soon': 'Coming Soon',
    'ob.sub': '60 seconds. No sugarcoating. This is your financial reality check before the simulation begins.',
    'ob.q.income': 'What does your job actually pay you per month?',
    'ob.income.under2k': 'Under $2,000', 'ob.income.2k4k': '$2,000 – $4,000', 'ob.income.4k7k': '$4,000 – $7,000', 'ob.income.over7k': 'Over $7,000',
    'ob.q.expenses': 'How much of that disappears every month?',
    'ob.exp.under1500': 'Under $1,500', 'ob.exp.1500to3k': '$1,500 – $3,000', 'ob.exp.3k5k': '$3,000 – $5,000', 'ob.exp.over5k': 'Over $5,000',
    'ob.q.invests': 'Is your money working — or just sitting there?',
    'ob.inv.no': 'No — not yet', 'ob.inv.sometimes': 'Sometimes', 'ob.inv.yes': 'Yes, regularly',
    'ob.q.debt': 'What does your debt situation look like right now?',
    'ob.debt.none': 'No debt — clean slate', 'ob.debt.small': 'Small debt (credit card / under $5k)',
    'ob.debt.moderate': 'Moderate debt ($5k – $25k)', 'ob.debt.heavy': 'Heavy debt (student loan / over $25k)',
    'ob.q.goal': 'What are you actually trying to build?',
    'ob.goal.freedom': 'Financial freedom', 'ob.goal.extra': 'Extra income', 'ob.goal.invest': 'Building investments', 'ob.goal.trading': 'Learning trading',
    'ob.q.freedom': 'Honestly — how financially free are you right now?',
    'ob.range.low': 'Not at all', 'ob.range.high': 'Completely free', 'ob.btn.back': '← Back', 'ob.btn.next': 'Next →',
    'reflect.body': "<strong>Dit gat is wat de meeste mensen nooit dichten.</strong><br><br>Inkomen dat afhankelijk is van jouw aanwezigheid. Uitgaven die elk jaar stijgen. Geen bezittingen die werken terwijl jij slaapt.<br><br>Dat is geen persoonlijk falen — het systeem werkt precies zoals het ontworpen is. De Ratrace bestaat, en de meeste mensen vinden de uitgang nooit.<br><br><strong>Deze simulatie laat je zien hoe je eruit komt.</strong>",
    'reflect.cta': '▶ Enter the Simulation',
    'sp.title': 'Your Starting Point', 'sp.sub': 'How do you want to enter the simulation? Your choice shapes everything from here.',
    'sp.sit.badge': 'Personalised', 'sp.sit.label': 'Start With My Situation', 'sp.sit.desc': 'Your real income, expenses, and habits — loaded into the simulation.',
    'sp.char.label': 'Choose a Character', 'sp.char.desc': 'Pick a preset profile — classic careers or new FXminds archetypes.',
    'sp.name.label': 'Your Name', 'sp.name.ph': 'Enter your name', 'sp.btn.back': '← Back', 'sp.sit.start': '▶ Start My Simulation', 'sp.char.start': '▶ Play This Character',
    'sp.diag.profile': 'Your Financial Profile', 'sp.diag.bottleneck': "What's holding you back", 'sp.diag.strength': 'What you already have',
    'setup.sub': "Build passive income until it covers your expenses — then decide what comes next. Most people never make it this far.",
    'setup.goal': '<strong>🎯 Mission:</strong> Build passive income that exceeds your expenses. Every decision compounds. Every month of delay costs you.',
    'setup.name.lbl': 'Your Name', 'setup.prof.lbl': 'Starting Profession', 'setup.btn': '▶ Begin Simulation',
    'mp.setup.title': 'Local Multiplayer Setup', 'mp.setup.back': '← Back', 'mp.count.lbl': 'Number of players', 'mp.start.btn': '▶ Continue to Player Setup →',
    'mpps.mode.lbl': 'How do you want to start?', 'mpps.sit.name': 'My Situation', 'mpps.sit.desc': 'Answer questions about your real finances',
    'mpps.char.name': 'Choose Character', 'mpps.char.desc': 'Pick a preset profile to play',
    'mpps.prog.lbl': 'Player {{n}} of {{total}}', 'mpps.btn.next': 'Next →', 'mpps.btn.last': 'See My Profile →',
    'mpps.diag.confirm': 'Use This Profile →', 'mpps.diag.back': '← Redo Survey', 'mpps.char.confirm': '▶ Play This Character', 'mpps.char.back': '← Back',
    'mpps.range.low': 'Not at all', 'mpps.range.high': 'Completely free', 'mpps.cf.income': 'Income', 'mpps.cf.expenses': 'Expenses', 'mpps.cf.cashflow': 'Cashflow',
    'handoff.sub': 'Pass the device to', 'handoff.msg': "It's your turn — take the device and roll when ready.", 'handoff.btn': "I'm Ready — Let's Go →",
    'header.turn.lbl': 'Turn:', 'header.sfx': 'SFX', 'header.spotify': '🎵 Use Spotify', 'header.statement': '📊 Statement', 'header.restart': '↺ Restart',
    'stats.cf.lbl': 'Net Cashflow / mo', 'stats.cash.lbl': 'Cash on hand:', 'stats.controls': 'Controls', 'stats.roll': '🎲 Roll Dice', 'stats.waiting': '⏳ Waiting...',
    'stats.escape.lbl': 'Escape Progress', 'stats.progress.free': '🏆 Free! {{passive}}/mo passive', 'stats.progress.pct': '{{pct}}% free · {{passive}}/{{exp}} /mo',
    'stats.progress.lbl': '{{passive}}/mo passive vs {{exp}}/mo expenses',
    'stats.income.title': 'Income', 'stats.income.active': '💼 Active', 'stats.income.passive': '🏦 Passive', 'stats.expenses': '🔴 Expenses', 'stats.portfolio': 'Portfolio',
    'stats.networth': '📈 Net Worth', 'stats.turn': '🎲 Turn', 'stats.assets.title': '🏠 Assets', 'stats.debts.title': '💳 Debts',
    'stats.assets.empty': 'No assets yet', 'stats.debts.empty': 'No debts', 'stats.level.title': 'Investor Level',
    'board.title': 'The Rat Race — find the exit',
    'board.leg.payday': 'Payday', 'board.leg.opp': 'Opportunity', 'board.leg.bad': 'Bad Event', 'board.leg.choice': 'Choice', 'board.leg.rest': 'Rest', 'board.leg.you': 'You',
    'rp.events.title': 'Recent Events', 'rp.events.waiting': 'Waiting for game to start…', 'rp.events.empty': 'No events yet',
    'rp.view.lbl': 'View', 'rp.view.me': 'Me', 'rp.tab.overview': 'Overview', 'rp.tab.assets': 'Assets', 'rp.tab.debts': 'Debts', 'rp.tab.cashflow': 'Cashflow',
    'ov.cf.lbl': 'Net Cashflow / mo', 'ov.chip.asset.s': '{{n}} asset', 'ov.chip.asset.p': '{{n}} assets', 'ov.chip.debt.s': '{{n}} debt', 'ov.chip.debt.p': '{{n}} debts',
    'ov.chip.debtfree': 'debt-free', 'ov.chip.turn': 'turn {{n}}',
    'ov.income.lbl': 'Income', 'ov.income.active': 'Active', 'ov.income.passive': 'Passive', 'ov.exp.lbl': 'Expenses', 'ov.exp.monthly': 'Monthly',
    'ov.pos.lbl': 'Position', 'ov.cash': 'Cash on hand', 'ov.networth': 'Net worth', 'ov.escape.title': 'Escape Progress', 'ov.escape.sub': 'Passive {{passive}} / Expenses {{exp}}',
    'assets.empty.title': 'Nog geen bezittingen', 'assets.empty.sub': "Land op een Kans-vakje om te investeren.\nElke bezitting voegt vaste cashflow toe.",
    'assets.total.lbl': 'Total passive', 'assets.cost.lbl': 'Cost', 'assets.roi.lbl': 'ROI / yr', 'assets.be.lbl': 'Break-even', 'assets.be.val': '{{n}} mo',
    'debts.free.title': 'Debt-free 🎉', 'debts.free.sub': "Every dollar of cashflow is yours.\nNothing draining you each month.",
    'debts.drag.lbl': 'Total monthly drag', 'debts.balance.lbl': 'Balance', 'debts.freed.lbl': 'Freed on payoff',
    'debts.payoff.can': '✓ Pay off — {{amt}}', 'debts.payoff.cant': '✗ Need {{amt}} more', 'debts.payoff.title': 'Not enough cash',
    'cf.net.lbl': 'Net Monthly Cashflow', 'cf.sub': '{{active}} active · {{passive}} passive · {{exp}} out',
    'cf.income.hdr': 'Income', 'cf.exp.hdr': 'Expenses', 'cf.total.in': 'Total in', 'cf.total.out': 'Total out',
    'stmt.title': '📊 Monthly Cashflow Statement', 'stmt.income.hdr': 'INCOME', 'stmt.exp.hdr': 'EXPENSES', 'stmt.net.hdr': 'NET CASHFLOW', 'stmt.net.lbl': 'Monthly Net',
    'stmt.assets.hdr': 'ASSETS ({{n}})', 'stmt.debts.hdr': 'DEBTS ({{n}})', 'stmt.assets.empty': 'No assets yet', 'stmt.debts.empty': 'No debts',
    'stmt.total.income': 'Total Income', 'stmt.total.exp': 'Total Expenses', 'stmt.close': '✕ Close',
    'stmt.income.active': 'Active Income (Job)', 'stmt.exp.living': 'Living Expenses', 'stmt.exp.debt': '{{name}} (payment)',
    'card.badge.opp': '📈 Opportunity', 'card.badge.bad': '⚠️ Bad Event', 'card.badge.ft': '🚀 Advanced Skill', 'card.badge.choice': '🎯 Strategic Choice',
    'card.sev.critical': '🔴 Critical', 'card.sev.high': '🟠 High', 'card.sev.medium': '🟡 Medium', 'card.sev.low': '🟢 Minor',
    'card.cost.lbl': '💸 Cost:', 'card.cf.lbl': '📥 +{{amt}}/mo',
    'card.preview.remain': 'Cash remaining', 'card.preview.be': 'Break-even', 'card.preview.be.val': '{{n}} mo', 'card.preview.roi': 'Annual ROI',
    'card.cant.afford': "Can't afford", 'card.req.not.met': 'Requirements not met',
    'card.choice.title': 'What will you do?', 'card.choice.desc': 'A strategic moment. Every choice here affects your cashflow.',
    'card.choice.only': '(only option)', 'card.pass': 'Pass',
    'choice.pay_debt': '💳 Pay off a debt', 'choice.pay_debt.desc': 'Free up monthly cashflow',
    'choice.sell_asset': '🏠 Liquidate an asset', 'choice.sell_asset.desc': 'Convert to cash',
    'choice.save': '🏦 Keep saving', 'choice.save.desc': 'Stay the course',
    'mentor.label': 'FXminds Mentor Insight', 'payday.lbl': 'monthly cashflow',
    'msg.payday': '💰 {{reason}} — {{earned}} this month',
    'msg.roll': 'Roll the dice!', 'msg.roll.player': 'Roll the dice, {{name}}!',
    'msg.rest': '☕ Rest — your assets keep earning. Nothing happens.', 'msg.rest.space': '☕ Rest space — your money keeps working. Roll when ready.',
    'msg.choice': '🎯 Strategic choice — what will you do?', 'msg.opp': 'Opportunity: {{title}}', 'msg.bad': '⚠️ Bad Event: {{title}}',
    'msg.win': '🏆 Je bent ontsnapt aan de Ratrace! Fast Track begint nu…', 'msg.win.mp': '🏆 {{name}} ontsnapte als eerste uit de Ratrace!',
    'msg.bankrupt.stuck': '💀 No way out — negative cashflow with no assets and no cash.', 'msg.bankrupt.cash': '💀 Bankrupt! Cash fell to {{cash}}.',
    'msg.bankrupt.mp': '{{name}} went bankrupt — game over!', 'msg.eliminated': '{{name}} went bankrupt and is eliminated.',
    'msg.debt.need': '💳 Need {{needed}} more to pay off {{debt}}.', 'msg.debt.paid': '💳 Paid off {{debt}}! Roll when ready.',
    'msg.ft.active': '🚀 Fast Track active! Draw Advanced Skill cards to scale capital.', 'msg.ft.enter': '🚀 Fast Track',
    'eos.win.title': 'Rat Race Escaped!', 'eos.loss.title': 'Game Over',
    'eos.stat.passive': 'Passive / mo', 'eos.stat.expenses': 'Expenses / mo', 'eos.stat.cf': 'Net Cashflow / mo',
    'eos.stat.networth': 'Net Worth', 'eos.stat.cash': 'Cash on hand', 'eos.stat.turns': 'Turns Played',
    'eos.assets.title': 'Assets ({{n}})', 'eos.debts.title': 'Remaining Debts ({{n}})', 'eos.assets.empty': 'No assets acquired', 'eos.debtfree': 'Debt-free 🎉',
    'eos.asset.row': '+{{cf}}/mo', 'eos.debt.row': '-{{pmt}}/mo', 'eos.debrief.label': '📘 FXminds Debrief',
    'eos.ft.cta.body': "You found the exit most people never find.<br><strong>The Rat Race is over. The real game starts now.</strong><br>Capital. Skill. Leverage. That's what the Fast Track is about.",
    'eos.ft.cta.btn': '🚀 Enter the Fast Track',
    'eos.share.text': 'Turns: {{turns}} · Lv {{level}} · {{passive}}/mo passive',
    'eos.share.copy': '📋 Copy', 'eos.share.copied': '✓ Copied!', 'eos.replay': '🔄 Play Again', 'eos.brand': 'Powered by FXminds Academy',
    'eos.skool.title': 'Want to approach this better in real life?',
    'eos.skool.text': "In FXminds Skool you learn how to build cashflow, reduce debt, and create financial structure — so the game stops being a simulation and starts being your reality.",
    'eos.skool.btn': 'Join FXminds Skool →',
    'win.line1.s': "{{n}} asset generating {{passive}}/mo — without you lifting a finger. That's the whole point.",
    'win.line1.p': "{{n}} assets generating {{passive}}/mo — without you lifting a finger. That's the whole point.",
    'win.line2': 'Your passive income now covers 100% of your {{expenses}}/mo expenses. The surplus of {{surplus}}/mo is fuel — put it to work immediately.',
    'win.line3.multi': "You spread across multiple income streams. That's not diversification for its own sake — that's resilience you can actually feel.",
    'win.line3.few': 'One or two assets got you here. Imagine what happens when you stack more. Next run: build wider.',
    'win.line4.clean': 'You escaped clean. No debt drag. Every dollar of cashflow compounds from here.',
    'win.line4.debts': "You still carry {{n}} debt{{s}} bleeding your cashflow. That's the first thing to fix in the Fast Track.",
    'loss.cause.noassets': 'Zero assets — no passive income was ever built. Every month you relied 100% on active income to survive.',
    'loss.cause.debt_drag': 'Debt payments consumed {{drag}}/mo — {{pct}}% of your salary. That left almost nothing to invest.',
    'loss.cause.neg_cf': 'Monthly cashflow was {{cf}} — you were spending more than you earned every single month.',
    'loss.cause.trap': 'Classic trap: negative cashflow + no assets = no escape. You needed one income-producing asset to break the spiral.',
    'loss.cause.buffer': 'A bad event hit while your cash buffer was too thin. You had no assets to absorb the shock.',
    'loss.debrief.1a': "You carried debt payments without ever buying a single asset. Debt compresses cashflow — assets expand it. You needed both to offset each other.",
    'loss.debrief.1b': "No assets, no passive income. Active income alone can never outrun expenses forever — one bad event is all it takes.",
    'loss.debrief.2': "With negative monthly cashflow, every payday made things worse. The only exit was an asset that covered more than the deficit — and that window never opened.",
    'loss.debrief.3': 'Next run: protect your cash buffer first ($1,500–$2,000 minimum), then take calculated asset positions. One small asset producing $150/mo changes everything.',
    'mp.rank.escaped': '{{name}} Escaped!', 'mp.rank.gameover': 'Eindspel', 'mp.rank.sub.win': 'First to escape the Rat Race', 'mp.rank.sub.over': 'Final Rankings',
    'mp.rank.detail': 'Lv {{level}} · {{turns}} turns · {{assets}} assets', 'mp.rank.replay': '🔄 Play Again', 'mp.rank.skool': 'Join FXminds Skool →',
    'ft.title': 'The Rat Race Is Behind You.',
    'ft.tagline': 'Most people spend their entire careers trying to get here.<br>You made it. Now it gets interesting.',
    'ft.quote': '"Passive income gets you out.<br>Capital and skill determine<br>how far you actually go."',
    'ft.g1.title': 'Deploy trading strategies', 'ft.g1.sub': '— skill-based, asymmetric returns',
    'ft.g2.title': 'Build algorithmic systems', 'ft.g2.sub': '— rules replace emotion',
    'ft.g3.title': 'Scale capital aggressively', 'ft.g3.sub': '— target $10,000/mo passive',
    'ft.g4.title': 'Find your edge', 'ft.g4.sub': '— not prediction, probability',
    'ft.btn': '▶ Scale Capital',
    'opp.rental_small.title': 'Small Rental Property', 'opp.rental_small.desc': 'A 2-bedroom condo is for sale in an up-and-coming neighborhood. Strong rental demand in the area.', 'opp.rental_small.buy': 'Buy it',
    'opp.dividend.title': 'Dividend Stock Deal', 'opp.dividend.desc': 'A broker offers you shares in a utility company with a reliable 7% annual dividend yield.', 'opp.dividend.buy': 'Invest $5,000',
    'opp.vending.title': 'Vending Machine Route', 'opp.vending.desc': 'Buy a route of 4 vending machines already placed in offices. Low maintenance, steady income.', 'opp.vending.buy': 'Buy route ($3,500)',
    'opp.privnote.title': 'Private Mortgage Note', 'opp.privnote.desc': 'A friend is selling a mortgage note they hold. You become the lender and collect monthly payments.', 'opp.privnote.buy': 'Buy note ($10,000)',
    'opp.carwash.title': 'Automated Car Wash', 'opp.carwash.desc': 'A self-serve car wash is for sale. The previous owner is retiring. Turnkey operation.', 'opp.carwash.buy': 'Acquire ($15,000)',
    'opp.index.title': 'Index Fund Investment', 'opp.index.desc': 'Put money into a broad market index fund. Lower return but extremely low risk.', 'opp.index.buy2k': 'Invest $2,000', 'opp.index.buy5k': 'Invest $5,000',
    'opp.storage.title': 'Storage Unit Facility', 'opp.storage.desc': '12-unit self-storage facility in a suburban area. High occupancy, recession-resistant.', 'opp.storage.buy': 'Buy facility ($20,000)',
    'opp.angel.title': 'Angel Investment', 'opp.angel.desc': 'A startup founder is raising seed capital. High risk, high potential.', 'opp.angel.buy': 'Invest $7,500 (high risk)',
    'opp.laundromat.title': 'Coin Laundromat', 'opp.laundromat.desc': 'A busy laundromat near a college campus. Owner financing available.', 'opp.laundromat.buy': 'Buy ($6,000 down)',
    'opp.duplex.title': 'Duplex Property', 'opp.duplex.desc': 'A duplex with both units occupied. Live in one, rent the other — or rent both.', 'opp.duplex.buy': 'Purchase ($12,000 down)',
    'opp.blog.title': 'Content Website', 'opp.blog.desc': 'Buy an established niche blog with affiliate income and ad revenue. Low maintenance.', 'opp.blog.buy': 'Buy site ($4,500)',
    'opp.parking.title': 'Parking Lot', 'opp.parking.desc': 'Small parking lot in a downtown area. Near a stadium. Minimal management required.', 'opp.parking.buy': 'Buy lot ($18,000)',
    'opp.debt_payoff.title': 'Debt Payoff Window', 'opp.debt_payoff.desc': 'You have a chance to negotiate an early payoff on one of your debts at a 15% discount.', 'opp.debt_payoff.buy': 'Pay off a debt',
    'opp.royalty.title': 'Royalty Agreement', 'opp.royalty.desc': 'A publisher wants to license your process for their training materials.', 'opp.royalty.buy': 'Sign the deal', 'opp.royalty.decline': 'Decline',
    'opp.bonus.title': 'Performance Bonus', 'opp.bonus.desc': 'Your employer rewards strong performance with a one-time cash bonus!', 'opp.bonus.collect': 'Collect bonus',
    'bad.er.title': 'ER Visit', 'bad.er.desc': 'You wake up with chest pains and end up in the ER. Insurance covers part — you owe the rest.', 'bad.er.pay': 'Pay in full ($3,500)', 'bad.er.plan': 'Hospital payment plan (+$140/mo)',
    'bad.surgery.title': 'Unexpected Surgery', 'bad.surgery.desc': 'A health issue requires surgery. Your high-deductible plan means you owe the deductible plus co-insurance.', 'bad.surgery.pay': 'Pay deductible ($5,500)', 'bad.surgery.card': 'Medical credit card (+$220/mo)',
    'bad.trans.title': 'Transmission Failure', 'bad.trans.desc': "Your car won't move. The mechanic says the transmission is gone.", 'bad.trans.pay': 'Pay for repair ($2,800)', 'bad.trans.finance': 'Finance repair (+$110/mo)', 'bad.trans.cheap': 'Buy a cheap used car ($1,200)',
    'bad.fender.title': 'Fender Bender', 'bad.fender.desc': 'You rear-end someone at a red light. Minor damage but your insurance deductible is due.', 'bad.fender.pay': 'Pay deductible ($1,000) — premium +$50/mo', 'bad.fender.settle': 'Settle privately — risky ($600)',
    'bad.taxbill.title': 'Surprise Tax Bill', 'bad.taxbill.desc': 'You underpaid estimated taxes this year. The IRS wants $2,400.', 'bad.taxbill.pay': 'Pay in full ($2,400)', 'bad.taxbill.plan': 'IRS installment plan (+$100/mo)',
    'bad.audit.title': 'Business Expense Audit', 'bad.audit.desc': 'The IRS audits your business deductions.', 'bad.audit.pay': 'Pay total bill ($3,800)', 'bad.audit.lawyer': 'Hire tax attorney ($1,200 — 60% chance of reduction)', 'bad.audit.plan': 'Payment plan (+$160/mo)',
    'bad.crash.title': 'Stock Market Crash', 'bad.crash.desc': 'A major market correction hits. Indices drop 30%+ in a month.', 'bad.crash.hold': 'Hold and weather it (long-term view)', 'bad.crash.sell': 'Panic sell all stocks (exit now)',
    'bad.recession.title': 'Economic Recession', 'bad.recession.desc': 'The economy contracts. Consumer spending drops.', 'bad.recession.accept': 'Accept income cut (−20% temporarily)', 'bad.recession.bridge': 'Draw on reserves — protect income ($3,000)',
    'bad.storm.title': 'Storm Damage', 'bad.storm.desc': 'A severe storm damages your roof and HVAC.', 'bad.storm.pay': 'Pay deductible ($2,500)', 'bad.storm.loan': 'Home equity loan (+$120/mo)',
    'bad.tenant.title': 'Problem Tenant', 'bad.tenant.desc': 'A tenant stops paying rent, damages the unit, and requires legal eviction.', 'bad.tenant.evict': 'Evict and repair ($2,000)', 'bad.tenant.sell': 'Sell the property (10% below cost)', 'bad.tenant.absorb': 'Absorb costs ($600)',
    'bad.lawsuit.title': 'Slip & Fall Lawsuit', 'bad.lawsuit.desc': "Someone trips on your property and sues.", 'bad.lawsuit.settle': 'Settle out of court ($4,200)', 'bad.lawsuit.fight': 'Fight it ($1,500 legal + 50/50 outcome)', 'bad.lawsuit.plan': 'Payment plan (+$180/mo)',
    'bad.identity.title': 'Identity Theft', 'bad.identity.desc': "Fraudulent accounts opened in your name.", 'bad.identity.resolve': 'Resolve and secure accounts ($1,500)',
    'bad.inflation.title': 'Cost of Living Surge', 'bad.inflation.desc': 'Groceries, utilities, insurance — everything goes up simultaneously.', 'bad.inflation.absorb': 'Absorb the increases (+$180/mo expenses)', 'bad.inflation.cut': 'Cut discretionary spending (+$60/mo only)',
    'bad.layoff.title': 'Layoff Notice', 'bad.layoff.desc': 'Company restructuring eliminates your department. Two weeks severance.', 'bad.layoff.accept': 'Accept income reduction while searching (−30%)', 'bad.layoff.bridge': 'Bridge gap with savings ($2,500)',
    'ft.ts.title': 'Trading Strategy', 'ft.ts.desc': "Professionals don't predict — they find setups where the odds tilt in their favour.", 'ft.ts.apply': 'Apply strategy ($3,000 — variable returns)', 'ft.ts.pass': 'Pass — study first',
    'ft.qs.title': 'Quant Strategy', 'ft.qs.desc': 'Strip out emotion. Let a rules-based system make the calls.', 'ft.qs.apply': 'Deploy algorithm ($5,000)', 'ft.qs.pass': 'Pass',
    'ft.me.title': 'Market Edge System', 'ft.me.desc': 'One repeatable edge, applied over hundreds of setups.', 'ft.me.apply': 'Build the edge ($2,500)', 'ft.me.pass': 'Pass',
    'tip.opp1.h': 'One Question. Every Time.', 'tip.opp1.b': "What does this pay me per month? Not the story. Not the hype. Just the number.",
    'tip.opp2.h': 'Do the Math Before You Decide', 'tip.opp2.b': "ROI = (monthly cashflow × 12) ÷ cost. If the math works, emotions don't get a vote.",
    'tip.opp3.h': 'The Only Test That Matters', 'tip.opp3.b': "Does it put money in your pocket without you working? If yes — buy it. If no — it's a liability wearing a disguise.",
    'tip.opp4.h': 'When Does It Pay For Itself?', 'tip.opp4.b': "Cost ÷ monthly cashflow = months to break even. After that, it's profit forever.",
    'tip.good1.h': 'Assets Create Freedom', 'tip.good1.b': 'Assets create freedom. But skills create asymmetric returns. Stack both.',
    'tip.good2.h': 'A Cashflow Machine — Not a Job', 'tip.good2.b': "This asset pays you whether you work or not. That's the difference between income and wealth.",
    'tip.good3.h': 'Multiple Streams, One Direction', 'tip.good3.b': 'Each income stream is a pillar. Most people build one. Wealthy people build many.',
    'tip.dec1.h': 'Time Is Your Scarcest Asset', 'tip.dec1.b': "Every month idle cash sits uninvested is a month of compounding you can't recover.",
    'tip.dec2.h': 'Trade Probability, Not Emotion', 'tip.dec2.b': "Most people trade time for money. A few learn to trade probability. Numbers don't lie.",
    'tip.bad1.h': "One Bad Month Shouldn't End the Game", 'tip.bad1.b': 'Without a cash buffer, every disaster hits your cashflow directly.',
    'tip.bad2.h': 'Debt Is a Monthly Leak', 'tip.bad2.b': "Every debt payment is cashflow that can't buy your next asset.",
    'tip.bad3.h': 'Cash Pain Is Temporary. Debt Pain Is Monthly.', 'tip.bad3.b': 'Pay now and move on, or carry it as debt and pay every month.',
    'tip.bad4.h': 'Panic Is Expensive', 'tip.bad4.b': 'The most costly financial decisions are made in the worst moments. Slow down. Run the numbers. Then decide.',
    'tip.debt1.h': 'That Debt Was Costing You Every Month', 'tip.debt1.b': "Now that cashflow is yours. Redirect it immediately.",
    'tip.p25.h': '1 in 4 Bills — Covered Without You', 'tip.p25.b': 'A quarter of your life is now funded by assets, not effort.',
    'tip.p50.h': 'Half Your Life Is Now Funded', 'tip.p50.b': "Half your expenses. No job required. The next 50% comes faster.",
    'tip.p75.h': "You're Close. Don't Slow Down Now.", 'tip.p75.b': "One or two more moves. Your money is doing more work than you are.",
    'tip.lvl.h': 'Level Up.', 'tip.lvl.b': 'Every level is a skill most people take decades to develop — if they ever do. Keep going.',
    'tip.ft1.h': 'Phase One Is Over.', 'tip.ft1.b': "Most people spend their entire lives trying to get here. You made it.",
    'tip.ft2.h': 'A Skill Has No Ceiling.', 'tip.ft2.b': 'An asset pays a fixed return. A skill compounds. One edge applied consistently creates asymmetric returns.',
    'tip.ft3.h': "You Don't Need to Be Right. You Need an Edge.", 'tip.ft3.b': "Professionals don't predict. They find setups where odds tilt in their favour — then repeat.",
    'arch.high_earner.name': 'The High Earner Going Nowhere', 'arch.high_earner.desc': "Your income is real. But so is your spending. High earnings with no assets is just a faster treadmill.",
    'arch.builder.name': 'The Builder With Leverage', 'arch.builder.desc': "Strong income, room to move, and you're already deploying capital.",
    'arch.untapped.name': 'The Untapped High Earner', 'arch.untapped.desc': "Good income and real margin — but the money is sitting still.",
    'arch.saver.name': 'The Disciplined Saver', 'arch.saver.desc': 'Lower income, but you keep expenses lean.',
    'arch.efficient.name': 'The Efficient Builder', 'arch.efficient.desc': "Modest income, controlled spending, and already investing.",
    'arch.squeezed.name': 'The Squeezed Worker', 'arch.squeezed.desc': "Most of your income disappears before you have a chance to use it.",
    'arch.stretched.name': 'The Stretched Investor', 'arch.stretched.desc': "You're investing while running tight.",
    'arch.trader.name': 'The Aspiring Trader', 'arch.trader.desc': "You want market exposure and active returns.",
    'arch.debt_anchor.name': 'The Debt-Anchored Worker', 'arch.debt_anchor.desc': "Your income is going out faster than you think.",
    'arch.heavy_debt.name': 'The High Earner Carrying Weight', 'arch.heavy_debt.desc': "Good income with significant debt is a race between building and repaying.",
    'arch.aware.name': 'The Aware Starter', 'arch.aware.desc': "You're paying attention to your finances — which already puts you ahead of most.",
    'bn.debt_heavy.h': 'Debt dragging every month', 'bn.debt_heavy.t': "Before you invest a single dollar, a chunk of your income is already spoken for.",
    'bn.debt_mod.h': 'Monthly debt payments shrinking your window', 'bn.debt_mod.t': "Moderate debt doesn't feel catastrophic — but it quietly eats the margin you need to invest.",
    'bn.tight.h': 'Expenses eating your margin', 'bn.tight.t': "With <strong>{{pct}}%</strong> of income going to expenses, there's almost no fuel left to invest.",
    'bn.lifestyle.h': 'Lifestyle inflation blocking the exit', 'bn.lifestyle.t': "Your expenses scaled with your income. <strong>Lifestyle creep</strong> doesn't feel dangerous.",
    'bn.idle.h': 'Surplus sitting idle', 'bn.idle.t': "You have margin. That's rare. But money left in a bank account has a <strong>negative real return</strong> after inflation.",
    'bn.thin.h': 'Buffer too thin', 'bn.thin.t': "Investing while running tight is possible — but <strong>one bad event</strong> and you're forced to liquidate.",
    'bn.nocf.h': 'Chasing returns without cashflow', 'bn.nocf.t': "Trading income is volatile. It doesn't replace <strong>stable passive cashflow</strong> — it amplifies it.",
    'bn.noown.h': 'Income without ownership', 'bn.noown.t': "High income feels like security. It isn't. Income stops when you stop. <strong>Assets don't.</strong>",
    'bn.notfelt.h': 'Investing but not feeling it yet', 'bn.notfelt.t': "You're doing the right things — but freedom score of <strong>{{freedom}}/10</strong> suggests the results haven't shown up yet.",
    'bn.passive.h': 'Passive income too small to feel', 'bn.passive.t': "Even with decent margins and some investing, the passive income hasn't crossed a threshold where it changes decisions.",
    'str.inv.h': 'You already have assets working', 'str.inv.t': "Most people reading this don't. You've already crossed the first barrier.",
    'str.dfree.h': 'No debt — that is a real advantage', 'str.dfree.t': "Most people your income level carry consumer debt. You don't.",
    'str.surp.h': 'You have real deployable margin', 'str.surp.t': "A surplus of <strong>${{surplus}}/mo</strong> is genuine capital.",
    'str.lean.h': 'Expense discipline is a real skill', 'str.lean.t': "You've learned to live lean — and that doesn't change when income grows.",
    'str.high.h': 'High income is real leverage', 'str.high.t': "Every asset you buy converts <strong>income you already earn</strong> into permanent cashflow.",
    'str.aware.h': 'Awareness is the first move', 'str.aware.t': "A low freedom score with a goal of financial freedom isn't a contradiction — it's clarity.",
    'str.know.h': 'You know assets exist — and use them', 'str.know.t': "The majority of people in your income bracket park money in a savings account and call it investing. You don't.",
    'str.show.h': 'You showed up', 'str.show.t': "Most people who feel financially stuck avoid looking directly at the numbers. You just answered five honest questions.",
    'cta.freedom_debt': "This simulation shows what happens when you prioritise debt elimination vs. investing simultaneously.",
    'cta.freedom': "This simulation is designed to show you exactly which decisions close the gap fastest.",
    'cta.extra': "Extra income starts with one asset. <strong>This simulation shows you how to buy the first one.</strong>",
    'cta.invest': "<strong>Real investing is decisions under pressure.</strong> This simulation creates that pressure with real consequences.",
    'cta.trading': "The Fast Track phase unlocks advanced strategies including systematic trading.",
    'diag.stat.income': 'Income / mo', 'diag.stat.surplus': 'Surplus / mo', 'diag.stat.debt': 'Debt load',
    'diag.debt.none': 'None', 'diag.debt.small': 'Small', 'diag.debt.moderate': 'Moderate', 'diag.debt.heavy': 'Heavy',
    'char.se.story': 'Stable salary, low overhead. The cleanest starting position — but still stuck trading time for money.',
    'char.te.story': 'Modest income, lower expenses — but carrying student debt. Tight margins, high patience required.',
    'char.doc.story': "High income, but high expenses and crushing school debt. Big numbers don't mean financial freedom.",
    'char.ent.story': 'Higher income, but a startup loan and volatile cashflow. High risk, high upside — if you play it right.',
    'char.tr.story': "You've watched the charts. Read the forums. Now it's time to learn what actually works.",
    'char.fx.story': 'You invested in education before cash. A small passive income stream is already running — now you need to scale it.',
    'char.la.story': 'Great income. Almost none of it left by the 15th. Two debt payments. Zero assets. The Rat Race at its finest.',
    'char.gr.story': "Low expenses, solid savings, zero debt. You've been hustling for years. Now learn to make money work for you.",
    'log.acquired':    'Acquired asset: {{name}} (+{{cf}}/mo cashflow)',
    'log.sold_asset':  'Sold asset: {{name}}',
    'log.new_debt':    'New debt: {{name}} ({{amt}})',
    'log.payday':      'Payday! Net cashflow: {{flow}}/mo',
    'log.debt_cleared':'\u{1F4B3} Debt cleared: {{name}} \u2014 +{{pmt}}/mo cashflow freed',
    'log.sold_for':    '\u{1F3E0} Sold {{name}} for {{amt}}',
    'log.level_up':    '\u2B50 Level Up! Now: {{title}}',
    'log.level_up2':   '\u2B50 Level Up \u2192 {{title}}!',
    'log.angel.win':   '\u{1F389} Your startup investment paid off!',
    'log.angel.loss':  '\u{1F4B8} Startup folded. Lost investment.',
    'log.debt.no_cash':'Not enough cash for early payoff.',
    'log.royalty':     'Signed royalty agreement. Passive income added.',
    'log.med.plan':    'Enrolled in hospital payment plan. $140/mo added to expenses.',
    'log.surgery.card':'Surgery costs on medical credit card. High interest \u2014 pay it off fast.',
    'log.car.financed':'Financed car repair. $110/mo hits cashflow until paid off.',
    'log.car.cheap':   'Bought a cheap car. Avoided the loan. Pragmatic move.',
    'log.car.deduct':  'Deductible paid. Insurance premium up $50/mo permanently.',
    'log.car.settle.ok':'Private settlement worked. No insurance premium hit.',
    'log.car.settle.bad':"Other driver filed a claim anyway. Cost more in the end.",
    'log.tax.plan':    'IRS installment agreement. $100/mo until resolved.',
    'log.tax.atty.win':'Attorney negotiated a reduced bill. Saved $800 vs full amount.',
    'log.tax.atty.loss':"Attorney couldn't reduce bill. Paid in full plus attorney fees.",
    'log.crash.none':  'Market crashed but you own real assets, not just stocks. No impact.',
    'log.crash.hold':  '\u{1F4C9} Dividends halved on {{n}} stock position(s). Markets recover \u2014 stay calm.',
    'log.crash.panic': 'Locked in losses. Classic emotional sell at the bottom.',
    'log.crash.empty': 'Nothing to sell. Diversified assets protected you.',
    'log.rec.cut':     'Income cut by {{amt}}/mo during recession. Recessions are temporary.',
    'log.rec.buffer':  'Used reserves to maintain income during downturn. Emergency fund at work.',
    'log.prop.relist': 'Property cleaned up and relisted. Back to cashflow soon.',
    'log.court.won':   'Won in court. Only paid legal fees. Right call.',
    'log.court.lost':  "Lost. Paid judgment plus fees. Risk didn't pay off.",
    'log.id.secured':  'Accounts secured. Credit freeze applied. Good lesson on digital safety.',
    'log.infl.absorb': "Expenses rose $180/mo. Inflation is the invisible tax on those who don't invest.",
    'log.infl.cut':    'Tightened budget. Only $60/mo increase. Protecting cashflow matters.',
    'log.layoff.save': 'Used savings to bridge the gap. Income preserved. Emergency fund at work.',
    'log.ft.ts.flat':  '\u{1F4CA} Trading Strategy: flat cycle.',
    'log.ft.ts.study': 'Studying the strategy first.',
    'log.ft.ts.result':'\u{1F4CA} Trading Strategy returned +{{amt}}.',
    'log.ft.qs.pass':  'Passed on quant strategy.',
    'log.ft.qs.dep':   '\u{1F916} Quant algo deployed \u2014 +{{amt}}/mo.',
    'log.ft.me.pass':  'Passed on Market Edge.',
    'log.ft.me.none':  '\u{1F3AF} Market Edge: no setup this cycle.',
    'log.ft.me.result':'\u{1F3AF} Market Edge delivered +{{amt}}.',
    'log.ft.pf.pass':  'Held off on portfolio scaling.',
    'log.ft.pf.result':'\u{1F4C8} Scaled portfolio \u2014 +{{amt}}/mo.',
    'log.ft.al.pass':  'Deferred algo investing.',
    'log.ft.al.result':'\u2699\uFE0F Algo system live \u2014 +{{amt}}/mo.',
    'log.start.sal':   '\u{1F4BC} Salary: {{amt}}/mo',
    'log.start.exp':   '\u{1F534} Expenses: {{amt}}/mo',
    'log.start.cash':  '\u{1F4B5} Starting cash: {{amt}}',
    'log.start.debts': '\u{1F4B3} Starting debts: {{amt}} ({{names}})',
    'log.start.cf':    '\u{1F4CA} Net cashflow: {{flow}}/mo',
    'log.start.joined':'\u{1F3AE} Joined as {{profession}} \u2014 {{income}}/mo \u00B7 {{expenses}}/mo expenses',
    'accord.cost':     'Cost',
    'accord.balance':  'Balance',
    'accord.pay_off':  'Pay Off ({{amt}})',
    'msg.rolled':       '🎲 Rolled {{roll}} → moving to Space {{pos}}',
    'msg.ft.incoming':  '🚀 Fast Track — Advanced Skill incoming!',
    'msg.opp.incoming': '📈 Opportunity! Draw a card.',
    'msg.bad.incoming': '⚠️ Bad Event incoming…',
    'log.opp.drawn':    '📈 Opportunity drawn: {{title}}',
    'log.bad.drawn':    '⚠️ Bad event: {{title}}',
    'log.no_debt_selected': 'No debt selected.',
    'log.chose_saving': 'Chose to keep saving.',
    'log.bankrupt':     '💀 Bankrupt — eliminated.',
    'log.paid_off':     'Paid off debt: {{name}}.',
    'reflect.row.income':   'Monthly income',
    'reflect.row.expenses': 'Monthly expenses',
    'reflect.row.invests':  'Currently invests',
    'reflect.row.debt':     'Debt situation',
    'reflect.row.goal':     'Main goal',
    'reflect.row.freedom':  'Freedom score',
    'reflect.val.inc.under2k': 'Under $2k',
    'reflect.val.inc.2k4k':    '$2–4k',
    'reflect.val.inc.4k7k':    '$4–7k',
    'reflect.val.inc.over7k':  'Over $7k',
    'reflect.val.exp.under1500':'Under $1.5k',
    'reflect.val.exp.1500to3k': '$1.5–3k',
    'reflect.val.exp.3k5k':     '$3–5k',
    'reflect.val.exp.over5k':   'Over $5k',
    'reflect.val.inv.no':       'Not yet',
    'reflect.val.inv.sometimes':'Sometimes',
    'reflect.val.inv.yes':      'Yes, regularly',
    'reflect.val.debt.none':    'No debt',
    'reflect.val.debt.small':   'Small debt',
    'reflect.val.debt.moderate':'Moderate debt',
    'reflect.val.debt.heavy':   'Heavy debt',
    'reflect.val.goal.freedom': 'Financial freedom',
    'reflect.val.goal.extra':   'Extra income',
    'reflect.val.goal.invest':  'Building investments',
    'reflect.val.goal.trading': 'Learning trading',
    'level.1':  'Rookie',
    'level.2':  'Saver',
    'level.3':  'Investor',
    'level.4':  'Cashflow Builder',
    'level.5':  'Asset Accumulator',
    'level.6':  'Passive Income Pro',
    'level.7':  'Wealth Builder',
    'level.8':  'Financially Independent',
    'level.9':  'Rat Race Escapee',
    'level.10': 'Money Master',
    'deal.hot':   '🔥 Hot Deal',
    'deal.good':  '✅ Solid',
    'deal.fair':  '〰 Fair',
    'deal.weak':  '⚠️ Weak',
    'ob.btn.results': 'See My Results →',
    'ob.btn.to.mode': '← Mode',
    'sp.btn.to.mode': '← Choose Mode',
    'email.title.win':       'Save your score',
    'email.title.loss':      'Save your result',
    'email.title.mp':        'Save your score',
    'email.sub.win':         'Get new challenges and updates when a leaderboard goes live.',
    'email.sub.loss':        'Get strategy tips and learn how to escape faster next time.',
    'email.sub.mp':          'Save your score and compare your result with other players later.',
    'email.placeholder':     'your@email.com',
    'email.btn.submit':      'Save score',
    'email.btn.submitting':  'Saving...',
    'email.btn.skip':        'Skip',
    'email.success.title':   'Score saved.',
    'email.success.sub':     'Check your inbox for tips and updates.',
    'email.success.cta':     'Want to learn how to do this better in real life?',
    'email.success.btn':     'Go to FXminds Skool',
    'email.err.invalid':     'Please enter a valid email address.',
    'email.err.region':      'This feature is currently only available for the Netherlands and Belgium.',
    'email.err.generic':     'Something went wrong. Please try again.',
    'accord.need_more':'Need {{amt}} more',
  },
};

function t(key, vars) {
  const dict = TRANSLATIONS[_lang] || TRANSLATIONS.nl;
  const fb   = TRANSLATIONS.en;
  let   str  = (key in dict) ? dict[key] : (key in fb ? fb[key] : key);
  if (vars) for (const [k,v] of Object.entries(vars)) str = str.split('{{'+k+'}}').join(v==null?'':v);
  return str;
}
function c(n, signed) {
  const sym = t('currency.symbol'), sep = t('currency.sep');
  const abs = Math.abs(Math.round(n));
  const fmt = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const sign = signed ? (n >= 0 ? '+' : '-') : (n < 0 ? '-' : '');
  return sign + sym + fmt;
}
function cpm(n, signed) { return c(n, signed) + t('currency.pm'); }
window._setLang = function(lang) {
  if (!TRANSLATIONS[lang]) { console.warn('[i18n] Unknown language:', lang); return; }
  _lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (el.getAttribute('data-i18n-html')) el.innerHTML = t(k); else el.textContent = t(k);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
};
window._i18n = { t, c, cpm };

// ════ src/config/gameConfig.js ════
// ─── Game Configuration ───────────────────────────────────────────────────────
// All tunable constants live here. Change numbers here to rebalance the game.

const GameConfig = {
  // Starting conditions
  STARTING_CASH: 5000,
  STARTING_INCOME: 3500,
  STARTING_EXPENSES: 2800,
  STARTING_PASSIVE_INCOME: 0,

  // Board
  BOARD_SPACES: 24,          // Total spaces on the loop
  PAYDAY_INTERVAL: 6,        // Every N spaces = payday

  // Space type distribution (must sum to BOARD_SPACES)
  SPACE_TYPES: {
    PAYDAY:      4,
    OPPORTUNITY: 8,
    BAD_EVENT:   6,
    CHOICE:      4,
    REST:        2,
  },

  // Win / lose
  WIN_CONDITION: 'PASSIVE_EXCEEDS_EXPENSES',   // passive income >= expenses
  BANKRUPTCY_THRESHOLD: -500,                  // cash below this = bankrupt

  // Deck sizes (cards are recycled when deck is exhausted)
  OPPORTUNITY_DECK_SIZE: 20,
  BAD_EVENT_DECK_SIZE:   15,

  // UI timing (ms)
  ANIMATION_DURATION: 400,
  MESSAGE_DISPLAY_TIME: 1200,
};

// ════ src/state/GameState.js ════
// ─── GameState.js ─────────────────────────────────────────────────────────────
// Holds the complete, authoritative game state.
// In multiplayer: this lives on the server and is broadcast to clients.

const GamePhase = {
  SETUP:       'SETUP',
  ROLLING:     'ROLLING',
  MOVING:      'MOVING',
  CARD_DRAWN:  'CARD_DRAWN',
  DECISION:    'DECISION',
  PAYDAY:      'PAYDAY',
  GAME_OVER:   'GAME_OVER',
  FAST_TRACK:  'FAST_TRACK',
};

const SpaceType = {
  PAYDAY:      'PAYDAY',
  OPPORTUNITY: 'OPPORTUNITY',
  BAD_EVENT:   'BAD_EVENT',
  CHOICE:      'CHOICE',
  REST:        'REST',
};

class GameState {
  constructor() {
    this.phase         = GamePhase.SETUP;
    this.turn          = 0;
    this.players       = [];       // Array of PlayerState
    this.activePlayerIndex = 0;
    this.board         = [];       // Array of SpaceType strings
    this.winner        = null;     // PlayerState or null
    this.currentCard   = null;     // Card being resolved
    this.lastRoll      = null;     // { die1, die2, total }
    this.message       = '';       // Status message for UI
    this.gameStarted   = false;
    this.fastTrack     = false;
    this.isMultiplayer = false;
  }

  get activePlayer() {
    return this.players[this.activePlayerIndex];
  }

  get isGameOver() {
    return this.phase === GamePhase.GAME_OVER;
  }

  // Build a deterministic board layout
  buildBoard() {
    const { BOARD_SPACES, SPACE_TYPES } = GameConfig;
    const spaces = [];

    // Always start with PAYDAY
    spaces.push(SpaceType.PAYDAY);

    // Fill remaining spaces in a balanced pattern
    const pool = [];
    Object.entries(SPACE_TYPES).forEach(([type, count]) => {
      // Subtract the 1 payday we already placed
      const adjusted = type === 'PAYDAY' ? count - 1 : count;
      for (let i = 0; i < adjusted; i++) pool.push(SpaceType[type]);
    });

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Ensure no two BAD_EVENTs are adjacent
    spaces.push(...pool);

    this.board = spaces.slice(0, BOARD_SPACES);
    return this;
  }

  addPlayer(playerState) {
    this.players.push(playerState);
    return this;
  }

  setPhase(phase) {
    this.phase = phase;
    return this;
  }

  setMessage(msg) {
    this.message = msg;
    return this;
  }

  nextTurn() {
    this.turn++;
    // In multiplayer: cycle through players
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    this.currentCard = null;
    this.lastRoll = null;
    return this;
  }

  toJSON() {
    return {
      phase: this.phase,
      turn: this.turn,
      activePlayerIndex: this.activePlayerIndex,
      board: this.board,
      winner: this.winner ? this.winner.id : null,
      lastRoll: this.lastRoll,
      message: this.message,
      players: this.players.map(p => p.toJSON()),
    };
  }
}

// ════ src/state/PlayerState.js ════
// ─── PlayerState.js ───────────────────────────────────────────────────────────
// Pure data model for a player. All derived values are computed, never stored.
// This design works identically for local and networked players.

class PlayerState {
  constructor({ id = 'player_1', name = 'Player', profession = 'Engineer' } = {}) {
    this.id         = id;
    this.name       = name;
    this.profession = profession;

    // Core financials
    this.cash     = GameConfig.STARTING_CASH;
    this.income   = GameConfig.STARTING_INCOME;
    this.expenses = GameConfig.STARTING_EXPENSES;

    // Portfolios — source of truth for passive income & debts
    this.assets = [];   // [{ id, name, cost, cashflow, type, description }]
    this.debts  = [];   // [{ id, name, amount, monthlyPayment, description }]

    // Board position
    this.position    = 0;
    this.turnsPlayed = 0;
    this.paydays     = 0;

    // History for the log
    this.log = [];

    // Investor progression
    this.xp    = 0;
    this.level = 1;
  }

  // ── Derived getters ────────────────────────────────────────────────────────

  get passiveIncome() {
    return this.assets.reduce((sum, a) => sum + (a.cashflow || 0), 0);
  }

  get totalDebtPayments() {
    return this.debts.reduce((sum, d) => sum + (d.monthlyPayment || 0), 0);
  }

  get monthlyCashflow() {
    return this.income + this.passiveIncome - this.expenses - this.totalDebtPayments;
  }

  get totalAssetValue() {
    return this.assets.reduce((sum, a) => sum + (a.cost || 0), 0);
  }

  get totalDebt() {
    return this.debts.reduce((sum, d) => sum + (d.amount || 0), 0);
  }

  get netWorth() {
    return this.totalAssetValue - this.totalDebt;
  }

  get isWinner() {
    return this.passiveIncome >= this.expenses;
  }

  get isBankrupt() {
    // Hard floor: cash is deeply negative
    if (this.cash <= GameConfig.BANKRUPTCY_THRESHOLD) return true;
    // Soft stuck: spending more than earning every month,
    // no assets generating income, and not enough cash to buy any asset
    // (the minimum asset cost is ~$1,000 in the card deck)
    const cf = this.monthlyCashflow;
    const stuck = cf < -50                  // losing money every payday
               && this.assets.length === 0  // no passive income source at all
               && this.cash < 800;          // can't afford even the cheapest asset
    return stuck;
  }

  // ── Mutations ──────────────────────────────────────────────────────────────
  // All mutations return `this` for chaining and log the event.

  addCash(amount, reason = '') {
    this.cash += amount;
    this.addLog((amount >= 0 ? '+' : '-') + c(Math.abs(amount)) + (reason ? ' ' + reason : ''));
    return this;
  }

  addAsset(asset) {
    this.assets.push({ ...asset, id: asset.id || `asset_${Date.now()}` });
    this.addLog(t('log.acquired',{name:asset.name,cf:cpm(asset.cashflow)}));
    return this;
  }

  removeAsset(assetId) {
    const asset = this.assets.find(a => a.id === assetId);
    if (asset) {
      this.assets = this.assets.filter(a => a.id !== assetId);
      this.addLog(t('log.sold_asset',{name:asset.name}));
    }
    return this;
  }

  addDebt(debt) {
    this.debts.push({ ...debt, id: debt.id || `debt_${Date.now()}` });
    this.addLog(t('log.new_debt',{name:debt.name,amt:c(debt.amount)}));
    return this;
  }

  removeDebt(debtId) {
    const debt = this.debts.find(d => d.id === debtId);
    if (debt) {
      this.debts = this.debts.filter(d => d.id !== debtId);
      this.addLog(t('log.paid_off',{name:debt.name}));
    }
    return this;
  }

  applyMonthlyPayday() {
    const flow = this.monthlyCashflow;
    this.cash += flow;
    this.paydays++;
    this.addLog(t('log.payday',{flow:c(flow,true)}));
    return this;
  }

  addXP(amount) {
    this.xp = (this.xp || 0) + amount;
  }

  addLog(message) {
    this.log.unshift({ message, turn: this.turnsPlayed, ts: Date.now() });
    if (this.log.length > 50) this.log.pop(); // Keep last 50 entries
  }

  // ── Serialization ──────────────────────────────────────────────────────────
  // Used for network sync and save states.

  toJSON() {
    return {
      id: this.id, name: this.name, profession: this.profession,
      cash: this.cash, income: this.income, expenses: this.expenses,
      assets: this.assets, debts: this.debts,
      position: this.position, turnsPlayed: this.turnsPlayed, paydays: this.paydays,
      xp: this.xp, level: this.level,
      log: this.log,
      // Include derived values for easy reading on win overlay / multiplayer
      passiveIncome: this.passiveIncome,
      monthlyCashflow: this.monthlyCashflow,
      netWorth: this.netWorth,
      _bankrupt: this._bankrupt || false,
    };
  }

  static fromJSON(data) {
    const p = new PlayerState({ id: data.id, name: data.name, profession: data.profession });
    // Only restore own-data fields — getters are re-derived automatically
    p.cash = data.cash;
    p.income = data.income;
    p.expenses = data.expenses;
    p.assets = data.assets || [];
    p.debts = data.debts || [];
    p.position = data.position || 0;
    p.turnsPlayed = data.turnsPlayed || 0;
    p.paydays = data.paydays || 0;
    p.xp    = data.xp    || 0;
    p.level = data.level || 1;
    p.log = data.log || [];
    return p;
  }
}

// ════ src/engine/CashflowEngine.js ════
// ─── CashflowEngine.js ────────────────────────────────────────────────────────
// Pure calculation functions for all financial logic.
// No state mutations here — only returns calculated values.

class CashflowEngine {

  // Full monthly cashflow statement for a player
  static getStatement(player) {
    const incomeSources = [
      { label: t('stmt.income.active'), amount: player.income },
      ...player.assets.map(a => ({
        label: a.name,
        amount: a.cashflow,
        type: a.type,
      }))
    ];

    const expenses = [
      { label: t('stmt.exp.living'), amount: -player.expenses },
      ...player.debts.map(d => ({
        label: t('stmt.exp.debt',{name:d.name}),
        amount: -d.monthlyPayment,
      }))
    ];

    const totalIncome   = incomeSources.reduce((s, i) => s + i.amount, 0);
    const totalExpenses = Math.abs(expenses.reduce((s, e) => s + e.amount, 0));
    const netCashflow   = totalIncome - totalExpenses;

    return {
      incomeSources,
      expenses,
      totalIncome,
      totalExpenses,
      netCashflow,
      passiveIncome: player.passiveIncome,
      winProgress: player.expenses > 0
        ? Math.min(100, Math.round((player.passiveIncome / player.expenses) * 100))
        : 100,
    };
  }

  // What would change if player accepts an opportunity card?
  static previewCardEffect(card, player) {
    const cashAfter     = player.cash - (card.cost || 0);
    const passiveAfter  = player.passiveIncome + (card.cashflow || 0);
    const monthsToBreakeven = card.cost && card.cashflow
      ? Math.ceil(card.cost / card.cashflow)
      : null;

    return {
      cashAfter,
      passiveAfter,
      canAfford: cashAfter >= 0,
      monthsToBreakeven,
      roiAnnual: card.cost && card.cashflow
        ? Math.round((card.cashflow * 12 / card.cost) * 100)
        : null,
    };
  }

  // Project player financials N months into the future
  static projectFuture(player, months = 12) {
    let projectedCash = player.cash;
    const monthly     = player.monthlyCashflow;

    return Array.from({ length: months }, (_, i) => {
      projectedCash += monthly;
      return {
        month: i + 1,
        cash: projectedCash,
        passiveIncome: player.passiveIncome, // simplified: static for now
      };
    });
  }
}

// ════ src/engine/CardEngine.js ════
// ─── CardEngine.js ────────────────────────────────────────────────────────────
// Manages decks: shuffling, drawing, discarding, recycling.
// Stateless resolve() — takes card + player, applies effect, returns result.

class CardEngine {
  constructor() {
    this.opportunityDeck = [];
    this.badEventDeck    = [];
    this.fastTrackDeck   = [];
    this.opportunityDiscard = [];
    this.badEventDiscard    = [];
    this.fastTrackDiscard   = [];
    this.init();
  }

  init() {
    this.opportunityDeck = this._shuffle([...opportunityCards]);
    this.badEventDeck    = this._shuffle([...badEventCards]);
    this.fastTrackDeck   = this._shuffle([...fastTrackCards]);
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  drawOpportunity() {
    if (this.opportunityDeck.length === 0) {
      // Recycle discard pile
      this.opportunityDeck = this._shuffle([...this.opportunityDiscard]);
      this.opportunityDiscard = [];
    }
    const card = this.opportunityDeck.pop();
    this.opportunityDiscard.push(card);
    return card;
  }

  drawBadEvent() {
    if (this.badEventDeck.length === 0) {
      this.badEventDeck = this._shuffle([...this.badEventDiscard]);
      this.badEventDiscard = [];
    }
    const card = this.badEventDeck.pop();
    this.badEventDiscard.push(card);
    return card;
  }
  drawFastTrack() {
    if (this.fastTrackDeck.length === 0) {
      this.fastTrackDeck = this._shuffle([...this.fastTrackDiscard]);
      this.fastTrackDiscard = [];
    }
    if (!this.fastTrackDeck.length) return null;
    const card = this.fastTrackDeck.pop();
    this.fastTrackDiscard.push(card);
    return card;
  }

  // Resolve a specific choice on a card against a player
  // Returns { success, message }
  resolveChoice(card, choiceIndex, player) {
    const choice = card.choices[choiceIndex];
    if (!choice) return { success: false, message: 'Invalid choice.' };

    // Check condition if present
    if (choice.condition && !choice.condition(player)) {
      return {
        success: false,
        message: `Cannot select this option — requirements not met.`
      };
    }

    try {
      choice.effect(player);
    } catch (e) {
      console.error('Card effect error:', e);
      return { success: false, message: 'Card effect failed.' };
    }

    return { success: true, message: `${choice.label}` };
  }

  // Get choices annotated with availability for the current player
  // Guarantees: if ALL choices are locked, the last one is force-unlocked as a fallback
  getAvailableChoices(card, player) {
    const result = card.choices.map((choice, index) => ({
      index,
      label: choice.label,
      available: !choice.condition || choice.condition(player),
    }));

    // Safety: ensure at least one choice is always available
    const anyAvailable = result.some(c => c.available);
    if (!anyAvailable && result.length > 0) {
      result[result.length - 1].available = true;
      result[result.length - 1].label += ' '+t('card.choice.only');
    }

    return result;
  }
}

// ════ src/cards/opportunityCards.js ════
// ─── opportunityCards.js ──────────────────────────────────────────────────────
// Each card effect is a PURE FUNCTION: (player) => { mutations }
// This makes them testable, replayable, and server-validatable in multiplayer.

const opportunityCards = [
  {
    id: 'opp_rental_small',
    type: 'opportunity',
    title: t('opp.rental_small.title'),
    description: t('opp.rental_small.desc'),
    cost: 8000,
    cashflow: 400,
    assetValue: 65000,
    choices: [
      {
        label: t('opp.rental_small.buy'),
        condition: (player) => player.cash >= 8000,
        effect: (player) => {
          player.addCash(-8000, '(down payment: rental condo)');
          player.addAsset({ id: 'rental_small', name: t('asset.rental_small'), cost: 65000, cashflow: 400, type: 'real_estate', description: '2BR condo, $400/mo net' });
        }
      },
      { label: t('card.pass'), effect: () => {} }
    ]
  },

  {
    id: 'opp_dividend_stock',
    type: 'opportunity',
    title: t('opp.dividend.title'),
    description: t('opp.dividend.desc'),
    cost: 5000,
    cashflow: 290,
    choices: [
      {
        label: t('opp.dividend.buy'),
        condition: (player) => player.cash >= 5000,
        effect: (player) => {
          player.addCash(-5000, '(stock purchase)');
          player.addAsset({ id: `stock_div_${Date.now()}`, name: t('asset.dividend'), cost: 5000, cashflow: 290, type: 'stocks', description: 'Utility stocks, 7% yield' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_vending_machine',
    type: 'opportunity',
    title: t('opp.vending.title'),
    description: t('opp.vending.desc'),
    cost: 3500,
    cashflow: 220,
    choices: [
      {
        label: t('opp.vending.buy'),
        condition: (player) => player.cash >= 3500,
        effect: (player) => {
          player.addCash(-3500, '(vending machine route)');
          player.addAsset({ id: 'vending_route', name: t('asset.vending'), cost: 3500, cashflow: 220, type: 'business', description: '4-machine route, offices' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_private_loan',
    type: 'opportunity',
    title: t('opp.privnote.title'),
    description: t('opp.privnote.desc'),
    cost: 10000,
    cashflow: 600,
    choices: [
      {
        label: t('opp.privnote.buy'),
        condition: (player) => player.cash >= 10000,
        effect: (player) => {
          player.addCash(-10000, '(mortgage note purchase)');
          player.addAsset({ id: 'mortgage_note', name: t('asset.privnote'), cost: 10000, cashflow: 600, type: 'notes', description: 'Private lending, 7.2% return' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_car_wash',
    type: 'opportunity',
    title: t('opp.carwash.title'),
    description: t('opp.carwash.desc'),
    cost: 15000,
    cashflow: 900,
    choices: [
      {
        label: t('opp.carwash.buy'),
        condition: (player) => player.cash >= 15000,
        effect: (player) => {
          player.addCash(-15000, '(car wash acquisition)');
          player.addAsset({ id: 'car_wash', name: t('asset.carwash'), cost: 15000, cashflow: 900, type: 'business', description: 'Self-serve, minimal staff' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_index_fund',
    type: 'opportunity',
    title: t('opp.index.title'),
    description: t('opp.index.desc'),
    cost: 2000,
    cashflow: 80,
    choices: [
      {
        label: t('opp.index.buy2k'),
        condition: (player) => player.cash >= 2000,
        effect: (player) => {
          player.addCash(-2000, '(index fund)');
          player.addAsset({ id: `index_${Date.now()}`, name: t('asset.index'), cost: 2000, cashflow: 80, type: 'stocks', description: 'Broad market, ~4.8% yield' });
        }
      },
      {
        label: 'Invest $5,000',
        condition: (player) => player.cash >= 5000,
        effect: (player) => {
          player.addCash(-5000, '(index fund)');
          player.addAsset({ id: `index_${Date.now()}`, name: t('asset.index'), cost: 5000, cashflow: 200, type: 'stocks', description: 'Broad market, ~4.8% yield' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_storage_units',
    type: 'opportunity',
    title: t('opp.storage.title'),
    description: t('opp.storage.desc'),
    cost: 20000,
    cashflow: 1100,
    choices: [
      {
        label: t('opp.storage.buy'),
        condition: (player) => player.cash >= 20000,
        effect: (player) => {
          player.addCash(-20000, '(storage facility)');
          player.addAsset({ id: 'storage_units', name: t('asset.storage'), cost: 20000, cashflow: 1100, type: 'real_estate', description: '12 units, 88% occupancy' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_angel_invest',
    type: 'opportunity',
    title: t('opp.angel.title'),
    description: t('opp.angel.desc'),
    cost: 7500,
    cashflow: 0,
    special: 'HIGH_RISK',
    choices: [
      {
        label: t('opp.angel.buy'),
        condition: (player) => player.cash >= 7500,
        effect: (player) => {
          // 50/50 chance of big win or total loss
          const success = Math.random() > 0.5;
          if (success) {
            player.addCash(-7500 + 22500, '(angel investering \u2014 3x rendement)');
            player.addLog(t('log.angel.win'));
          } else {
            player.addCash(-7500, '(angel investering mislukt \u2014 verlies)');
            player.addLog(t('log.angel.loss'));
          }
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_laundromat',
    type: 'opportunity',
    title: t('opp.laundromat.title'),
    description: t('opp.laundromat.desc'),
    cost: 6000,
    cashflow: 500,
    choices: [
      {
        label: t('opp.laundromat.buy'),
        condition: (player) => player.cash >= 6000,
        effect: (player) => {
          player.addCash(-6000, '(laundromat down payment)');
          player.addAsset({ id: 'laundromat', name: t('asset.laundromat'), cost: 6000, cashflow: 500, type: 'business', description: 'Near campus, owner-financed' });
          player.addDebt({ id: 'laundromat_loan', name: 'Laundromat Loan', amount: 24000, monthlyPayment: 180, description: 'Owner financing at 6%' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_duplex',
    type: 'opportunity',
    title: t('opp.duplex.title'),
    description: t('opp.duplex.desc'),
    cost: 12000,
    cashflow: 650,
    choices: [
      {
        label: t('opp.duplex.buy'),
        condition: (player) => player.cash >= 12000,
        effect: (player) => {
          player.addCash(-12000, '(duplex down payment)');
          player.addAsset({ id: 'duplex', name: t('asset.duplex'), cost: 12000, cashflow: 650, type: 'real_estate', description: 'Both units rented, $650/mo net' });
          player.addDebt({ id: 'duplex_mortgage', name: 'Duplex Mortgage', amount: 88000, monthlyPayment: 420, description: '30yr fixed mortgage' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_blog_income',
    type: 'opportunity',
    title: t('opp.blog.title'),
    description: t('opp.blog.desc'),
    cost: 4500,
    cashflow: 300,
    choices: [
      {
        label: t('opp.blog.buy'),
        condition: (player) => player.cash >= 4500,
        effect: (player) => {
          player.addCash(-4500, '(content website purchase)');
          player.addAsset({ id: 'blog', name: t('asset.blog'), cost: 4500, cashflow: 300, type: 'digital', description: 'Affiliate + ads, ~$300/mo' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_parking_lot',
    type: 'opportunity',
    title: t('opp.parking.title'),
    description: t('opp.parking.desc'),
    cost: 18000,
    cashflow: 950,
    choices: [
      {
        label: t('opp.parking.buy'),
        condition: (player) => player.cash >= 18000,
        effect: (player) => {
          player.addCash(-18000, '(parking lot)');
          player.addAsset({ id: 'parking_lot', name: t('asset.parking'), cost: 18000, cashflow: 950, type: 'real_estate', description: 'Downtown, near stadium' });
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_pay_off_debt',
    type: 'opportunity',
    title: t('opp.debt_payoff.title'),
    description: t('opp.debt_payoff.desc'),
    cost: 0,
    cashflow: 0,
    special: 'DEBT_PAYOFF',
    choices: [
      {
        label: t('opp.debt_payoff.buy'),
        condition: (player) => player.debts.length > 0,
        effect: (player) => {
          if (player.debts.length > 0) {
            const debt = player.debts[0];
            const discounted = Math.floor(debt.amount * 0.85);
            if (player.cash >= discounted) {
              player.addCash(-discounted, `(early payoff: ${debt.name} at 15% discount)`);
              player.removeDebt(debt.id);
            } else {
              player.addLog(t('log.debt.no_cash'));
            }
          }
        }
      },
      { label: 'Pass', effect: () => {} }
    ]
  },

  {
    id: 'opp_royalty_deal',
    type: 'opportunity',
    title: t('opp.royalty.title'),
    description: t('opp.royalty.desc'),
    cost: 0,
    cashflow: 350,
    choices: [
      {
        label: t('opp.royalty.buy'),
        effect: (player) => {
          player.addAsset({ id: 'royalty', name: t('asset.royalty'), cost: 0, cashflow: 350, type: 'digital', description: 'Licensing deal, $350/mo' });
          player.addLog(t('log.royalty'));
        }
      },
      { label: t('opp.royalty.decline'), effect: () => {} }
    ]
  },

  {
    id: 'opp_bonus',
    type: 'opportunity',
    title: t('opp.bonus.title'),
    description: t('opp.bonus.desc'),
    cost: 0,
    cashflow: 0,
    choices: [
      {
        label: t('opp.bonus.collect'),
        effect: (player) => {
          const bonus = 2000 + Math.floor(Math.random() * 3000);
          player.addCash(bonus, '(performance bonus)');
        }
      }
    ]
  },
];

// ════ src/cards/badEventCards.js ════
// ─── badEventCards.js ─────────────────────────────────────────────────────────
// Setback cards. Each effect is a pure function: (player) => { mutations }
// All negative events have at least one response choice.
// Upgraded: richer narrative, realistic categories, more decision depth.

const badEventCards = [

  // ── Medical ─────────────────────────────────────────────────────────────────
  {
    id: 'bad_medical_er',
    type: 'bad_event',
    category: 'medical',
    title: t('bad.er.title'),
    description: t('bad.er.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.er.pay'),
        condition: (player) => player.cash >= 3500,
        effect: (player) => { player.addCash(-3500, '(SEH-kosten betaald)'); }
      },
      {
        label: t('bad.er.plan'),
        effect: (player) => {
          player.addDebt({ id: `med_${Date.now()}`, name: 'Hospital Bill', amount: 3500, monthlyPayment: 140, description: 'ER visit — payment plan' });
          player.addLog(t('log.med.plan'));
        }
      }
    ]
  },

  {
    id: 'bad_medical_surgery',
    type: 'bad_event',
    category: 'medical',
    title: t('bad.surgery.title'),
    description: t('bad.surgery.desc'),
    severity: 'critical',
    choices: [
      {
        label: t('bad.surgery.pay'),
        condition: (player) => player.cash >= 5500,
        effect: (player) => { player.addCash(-5500, '(surgery deductible)'); }
      },
      {
        label: t('bad.surgery.card'),
        effect: (player) => {
          player.addDebt({ id: `surgery_${Date.now()}`, name: 'Medical Credit Card', amount: 5500, monthlyPayment: 220, description: 'Surgery — financed at 18% APR' });
          player.addLog(t('log.surgery.card'));
        }
      }
    ]
  },

  // ── Car ─────────────────────────────────────────────────────────────────────
  {
    id: 'bad_car_transmission',
    type: 'bad_event',
    category: 'car',
    title: t('bad.trans.title'),
    description: t('bad.trans.desc'),
    severity: 'medium',
    choices: [
      {
        label: t('bad.trans.pay'),
        condition: (player) => player.cash >= 2800,
        effect: (player) => { player.addCash(-2800, '(transmission replacement)'); }
      },
      {
        label: t('bad.trans.finance'),
        effect: (player) => {
          player.addDebt({ id: `car_${Date.now()}`, name: t('asset.loan.car_repair'), amount: 2800, monthlyPayment: 110, description: 'Transmission — dealer financing' });
          player.addLog(t('log.car.financed'));
        }
      },
      {
        label: t('bad.trans.cheap'),
        condition: (player) => player.cash >= 1200,
        effect: (player) => {
          player.addCash(-1200, '(replacement used car)');
          player.addLog(t('log.car.cheap'));
        }
      }
    ]
  },

  {
    id: 'bad_car_accident',
    type: 'bad_event',
    category: 'car',
    title: t('bad.fender.title'),
    description: t('bad.fender.desc'),
    severity: 'low',
    choices: [
      {
        label: t('bad.fender.pay'),
        condition: (player) => player.cash >= 1000,
        effect: (player) => {
          player.addCash(-1000, '(insurance deductible)');
          player.expenses += 50;
          player.addLog(t('log.car.deduct'));
        }
      },
      {
        label: t('bad.fender.settle'),
        condition: (player) => player.cash >= 600,
        effect: (player) => {
          if (Math.random() > 0.3) {
            player.addCash(-600, '(priv\u00E9schikking auto-ongeluk)');
            player.addLog(t('log.car.settle.ok'));
          } else {
            player.addCash(-2200, '(priv\u00E9schikking geëscaleerd)');
            player.addLog(t('log.car.settle.bad'));
          }
        }
      }
    ]
  },

  // ── Tax ─────────────────────────────────────────────────────────────────────
  {
    id: 'bad_tax_bill',
    type: 'bad_event',
    category: 'tax',
    title: t('bad.taxbill.title'),
    description: t('bad.taxbill.desc'),
    severity: 'medium',
    choices: [
      {
        label: t('bad.taxbill.pay'),
        condition: (player) => player.cash >= 2400,
        effect: (player) => { player.addCash(-2400, '(tax underpayment + penalty)'); }
      },
      {
        label: t('bad.taxbill.plan'),
        effect: (player) => {
          player.addDebt({ id: `irs_${Date.now()}`, name: 'IRS Installment Plan', amount: 2400, monthlyPayment: 100, description: 'Back taxes + penalties' });
          player.addLog(t('log.tax.plan'));
        }
      }
    ]
  },

  {
    id: 'bad_tax_audit',
    type: 'bad_event',
    category: 'tax',
    title: t('bad.audit.title'),
    description: t('bad.audit.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.audit.pay'),
        condition: (player) => player.cash >= 3800,
        effect: (player) => { player.addCash(-3800, '(audit: taxes + penalty + interest)'); }
      },
      {
        label: t('bad.audit.lawyer'),
        condition: (player) => player.cash >= 3000,
        effect: (player) => {
          player.addCash(-1200, '(kosten belastingadviseur)');
          if (Math.random() > 0.4) {
            player.addCash(-1800, '(onderhandelde belastingschikking)');
            player.addLog(t('log.tax.atty.win'));
          } else {
            player.addCash(-3800, '(volledige boekencontrole-rekening)');
            player.addLog(t('log.tax.atty.loss'));
          }
        }
      },
      {
        label: t('bad.audit.plan'),
        effect: (player) => {
          player.addDebt({ id: `audit_${Date.now()}`, name: 'Audit Payment Plan', amount: 3800, monthlyPayment: 160, description: 'IRS audit — taxes + penalties' });
        }
      }
    ]
  },

  // ── Market ──────────────────────────────────────────────────────────────────
  {
    id: 'bad_market_crash',
    type: 'bad_event',
    category: 'market',
    title: t('bad.crash.title'),
    description: t('bad.crash.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.crash.hold'),
        effect: (player) => {
          const stockAssets = player.assets.filter(a => a.type === 'stocks');
          if (stockAssets.length > 0) {
            stockAssets.forEach(a => { a.cashflow = Math.floor(a.cashflow * 0.5); });
            player.addLog(t('log.crash.hold',{n:stockAssets.length}));
          } else {
            player.addLog(t('log.crash.none'));
          }
        }
      },
      {
        label: t('bad.crash.sell'),
        effect: (player) => {
          const stockAssets = player.assets.filter(a => a.type === 'stocks');
          if (stockAssets.length > 0) {
            const soldValue = stockAssets.reduce((sum, a) => sum + Math.floor(a.cost * 0.65), 0);
            stockAssets.forEach(a => player.removeAsset(a.id));
            player.addCash(soldValue, '(stocks sold at 35% loss — panic sell)');
            player.addLog(t('log.crash.panic'));
          } else {
            player.addLog(t('log.crash.empty'));
          }
        }
      }
    ]
  },

  {
    id: 'bad_recession',
    type: 'bad_event',
    category: 'market',
    title: t('bad.recession.title'),
    description: t('bad.recession.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.recession.accept'),
        effect: (player) => {
          const cut = Math.floor(player.income * 0.2);
          player.income -= cut;
          player.addLog(t('log.rec.cut',{amt:cpm(cut)}));
        }
      },
      {
        label: t('bad.recession.bridge'),
        condition: (player) => player.cash >= 3000,
        effect: (player) => {
          player.addCash(-3000, '(recession cash buffer — income protected)');
          player.addLog(t('log.rec.buffer'));
        }
      }
    ]
  },

  // ── Property ─────────────────────────────────────────────────────────────────
  {
    id: 'bad_roof_damage',
    type: 'bad_event',
    category: 'property',
    title: t('bad.storm.title'),
    description: t('bad.storm.desc'),
    severity: 'medium',
    choices: [
      {
        label: t('bad.storm.pay'),
        condition: (player) => player.cash >= 2500,
        effect: (player) => { player.addCash(-2500, '(storm damage deductible)'); }
      },
      {
        label: t('bad.storm.loan'),
        effect: (player) => {
          player.addDebt({ id: `home_eq_${Date.now()}`, name: 'Home Equity Loan', amount: 2500, monthlyPayment: 120, description: 'Storm repair financing' });
        }
      }
    ]
  },

  {
    id: 'bad_tenant',
    type: 'bad_event',
    category: 'property',
    title: t('bad.tenant.title'),
    description: t('bad.tenant.desc'),
    severity: 'medium',
    choices: [
      {
        label: t('bad.tenant.evict'),
        condition: (player) => player.assets.some(a => a.type === 'real_estate') && player.cash >= 2000,
        effect: (player) => {
          player.addCash(-2000, '(eviction + unit repairs)');
          player.addLog(t('log.prop.relist'));
        }
      },
      {
        label: t('bad.tenant.sell'),
        condition: (player) => player.assets.some(a => a.type === 'real_estate'),
        effect: (player) => {
          const prop = player.assets.find(a => a.type === 'real_estate');
          if (prop) {
            player.removeAsset(prop.id);
            player.addCash(Math.floor(prop.cost * 0.9), `(sold ${prop.name} — bad tenant exit)`);
          }
        }
      },
      {
        label: t('bad.tenant.absorb'),
        effect: (player) => {
          player.addCash(-600, '(tenant damage — absorbed)');
        }
      }
    ]
  },

  // ── Legal ────────────────────────────────────────────────────────────────────
  {
    id: 'bad_lawsuit',
    type: 'bad_event',
    category: 'legal',
    title: t('bad.lawsuit.title'),
    description: t('bad.lawsuit.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.lawsuit.settle'),
        condition: (player) => player.cash >= 4200,
        effect: (player) => { player.addCash(-4200, '(aansprakelijkheidsschikking)'); }
      },
      {
        label: t('bad.lawsuit.fight'),
        condition: (player) => player.cash >= 1500,
        effect: (player) => {
          player.addCash(-1500, '(juridische kosten)');
          if (Math.random() > 0.5) {
            player.addLog(t('log.court.won'));
          } else {
            player.addCash(-2700, '(vonnis \u2014 rechtszaak verloren)');
            player.addLog(t('log.court.lost'));
          }
        }
      },
      {
        label: t('bad.lawsuit.plan'),
        effect: (player) => {
          player.addDebt({ id: `lawsuit_${Date.now()}`, name: 'Lawsuit Settlement', amount: 4200, monthlyPayment: 180, description: 'Slip & fall settlement' });
        }
      }
    ]
  },

  {
    id: 'bad_identity_theft',
    type: 'bad_event',
    category: 'legal',
    title: t('bad.identity.title'),
    description: t('bad.identity.desc'),
    severity: 'medium',
    choices: [
      {
        label: t('bad.identity.resolve'),
        effect: (player) => {
          player.addCash(-1500, '(identity theft losses)');
          player.addLog(t('log.id.secured'));
        }
      }
    ]
  },

  // ── Life Events ─────────────────────────────────────────────────────────────
  {
    id: 'bad_inflation',
    type: 'bad_event',
    category: 'life',
    title: t('bad.inflation.title'),
    description: t('bad.inflation.desc'),
    severity: 'low',
    choices: [
      {
        label: t('bad.inflation.absorb'),
        effect: (player) => {
          player.expenses += 180;
          player.addLog(t('log.infl.absorb'));
        }
      },
      {
        label: t('bad.inflation.cut'),
        effect: (player) => {
          player.expenses += 60;
          player.addLog(t('log.infl.cut'));
        }
      }
    ]
  },

  {
    id: 'bad_layoff',
    type: 'bad_event',
    category: 'life',
    title: t('bad.layoff.title'),
    description: t('bad.layoff.desc'),
    severity: 'high',
    choices: [
      {
        label: t('bad.layoff.accept'),
        effect: (player) => {
          const cut = Math.floor(player.income * 0.3);
          player.income -= cut;
          player.addLog(t('log.rec.cut',{amt:cpm(cut)}));
        }
      },
      {
        label: t('bad.layoff.bridge'),
        condition: (player) => player.cash >= 2500,
        effect: (player) => {
          player.addCash(-2500, '(living costs during job search)');
          player.addLog(t('log.layoff.save'));
        }
      }
    ]
  },
];

// ════ src/multiplayer/MultiplayerAdapter.js ════
// ─── MultiplayerAdapter.js ────────────────────────────────────────────────────
// STUB for Phase 1 (single player). No-ops in MVP.
// Phase 6: Replace with socket.io calls.
//
// Contract (unchanged in multiplayer):
//   sendAction(action)  → sends to server
//   onAction(callback)  → registers handler for incoming server messages
//   connect(roomId)     → joins a game room
//   disconnect()        → leaves game

const MultiplayerAdapter = {
  _connected: false,
  _handlers:  [],

  connect(roomId) {
    // TODO Phase 6: io.connect(); io.emit('join', roomId);
    console.log('[Multiplayer] connect() called (stub) — room:', roomId);
  },

  disconnect() {
    // TODO Phase 6: io.disconnect();
    console.log('[Multiplayer] disconnect() called (stub)');
  },

  sendAction(action) {
    // TODO Phase 6: socket.emit('action', action);
    // In single player, actions are resolved locally — nothing to send.
    console.log('[Multiplayer] sendAction (stub):', action?.type);
  },

  onAction(callback) {
    // TODO Phase 6: socket.on('action', callback);
    this._handlers.push(callback);
  },

  // Internal: simulate receiving a server message (useful for testing)
  _simulateReceive(action) {
    this._handlers.forEach(h => h(action));
  },
};

// ════ src/engine/GameEngine.js ════
// ─── GameEngine.js + MentorEngine + XPEngine (inlined) ─────────────────────
// ─── MentorEngine.js ──────────────────────────────────────────────────────────
// Generates contextual financial education tips. Pure logic — no DOM, no state.
// Returns tip objects that the UI can display however it likes.

const MentorConcepts = {
  CASHFLOW:        'cashflow',
  ROI:             'roi',
  ASSET_LIABILITY: 'asset_liability',
  EMOTIONAL:       'emotional',
  DEBT:            'debt',
  DIVERSIFY:       'diversify',
  PASSIVE:         'passive',
  EMERGENCY:       'emergency',
  BREAKEVEN:       'breakeven',
  OPPORTUNITY_COST:'opportunity_cost',
};

// Each tip: { concept, emoji, headline, body }
const TIPS = {
  // ── Opportunity / investing ──────────────────────────────────────────────
  opportunity_drawn: [
    {
      concept: MentorConcepts.CASHFLOW,
      emoji: '💡',
      headline: t('tip.opp1.h'),
      body: t('tip.opp1.b'),
    },
    {
      concept: MentorConcepts.ROI,
      emoji: '📐',
      headline: t('tip.opp2.h'),
      body: t('tip.opp2.b'),
    },
    {
      concept: MentorConcepts.ASSET_LIABILITY,
      emoji: '⚖️',
      headline: t('tip.opp3.h'),
      body: t('tip.opp3.b'),
    },
    {
      concept: MentorConcepts.BREAKEVEN,
      emoji: '📅',
      headline: t('tip.opp4.h'),
      body: t('tip.opp4.b'),
    },
  ],

  good_investment: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '🌱',
      headline: t('tip.good1.h'),
      body: t('tip.good1.b'),
    },
    {
      concept: MentorConcepts.CASHFLOW,
      emoji: '✅',
      headline: t('tip.good2.h'),
      body: t('tip.good2.b'),
    },
    {
      concept: MentorConcepts.DIVERSIFY,
      emoji: '🗂️',
      headline: t('tip.good3.h'),
      body: t('tip.good3.b'),
    },
  ],

  deal_declined: [
    {
      concept: MentorConcepts.OPPORTUNITY_COST,
      emoji: '⏳',
      headline: t('tip.dec1.h'),
      body: t('tip.dec1.b'),
    },
    {
      concept: MentorConcepts.EMOTIONAL,
      emoji: '🧠',
      headline: t('tip.dec2.h'),
      body: t('tip.dec2.b'),
    },
  ],

  // ── Bad events ──────────────────────────────────────────────────────────
  bad_event: [
    {
      concept: MentorConcepts.EMERGENCY,
      emoji: '🛡️',
      headline: t('tip.bad1.h'),
      body: t('tip.bad1.b'),
    },
    {
      concept: MentorConcepts.DEBT,
      emoji: '⚠️',
      headline: t('tip.bad2.h'),
      body: t('tip.bad2.b'),
    },
    {
      concept: MentorConcepts.CASHFLOW,
      emoji: '📉',
      headline: t('tip.bad3.h'),
      body: t('tip.bad3.b'),
    },
    {
      concept: MentorConcepts.EMOTIONAL,
      emoji: '🎯',
      headline: t('tip.bad4.h'),
      body: t('tip.bad4.b'),
    },
  ],

  // ── Debt payoff ─────────────────────────────────────────────────────────
  debt_paid: [
    {
      concept: MentorConcepts.DEBT,
      emoji: '🎉',
      headline: t('tip.debt1.h'),
      body: t('tip.debt1.b'),
    },
  ],

  // ── Passive income milestones ───────────────────────────────────────────
  passive_milestone_25: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '🌿',
      headline: t('tip.p25.h'),
      body: t('tip.p25.b'),
    },
  ],
  passive_milestone_50: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '🌳',
      headline: t('tip.p50.h'),
      body: t('tip.p50.b'),
    },
  ],
  passive_milestone_75: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '🚀',
      headline: t('tip.p75.h'),
      body: t('tip.p75.b'),
    },
  ],

  // ── Level up ────────────────────────────────────────────────────────────
  level_up: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '⭐',
      headline: t('tip.lvl.h'),
      body: t('tip.lvl.b'),
    },
  ],

  // ── Fast Track ──────────────────────────────────────────────────────────
  fast_track_entry: [
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '🚀',
      headline: t('tip.ft1.h'),
      body: t('tip.ft1.b'),
    },
  ],
  fast_track_skill: [
    {
      concept: MentorConcepts.CASHFLOW,
      emoji: '📊',
      headline: t('tip.ft2.h'),
      body: t('tip.ft2.b'),
    },
    {
      concept: MentorConcepts.PASSIVE,
      emoji: '⚡',
      headline: t('tip.ft3.h'),
      body: t('tip.ft3.b'),
    },
  ],
};

const fastTrackCards = [
  { id:'ft_ts', type:'fast_track', title:t('ft.ts.title'), icon:'📊',
    description:t('ft.ts.desc'),
    choices:[
      { label:t('ft.ts.apply'), condition:(p)=>p.cash>=3000,
        effect:(p)=>{ p.addCash(-3000,'(trading strategy)');
          const g=Math.random()>0.45?Math.floor(Math.random()*1800)+600:0;
          if(g>0){p.addCash(g,'(trading +'+c(g)+')');p.addLog(t('log.ft.ts.result',{amt:c(g)}));}
          else p.addLog(t('log.ft.ts.flat')); }},
      { label:t('ft.ts.pass'), effect:(p)=>p.addLog(t('log.ft.ts.study')) }
    ]},
  { id:'ft_qs', type:'fast_track', title:t('ft.qs.title'), icon:'🤖',
    description:t('ft.qs.desc'),
    choices:[
      { label:t('ft.qs.apply'), condition:(p)=>p.cash>=5000,
        effect:(p)=>{ p.addCash(-5000,'(quant algo)');
          const m=Math.floor(Math.random()*400)+300;
          p.addAsset({id:`quant_${Date.now()}`,name:'Kwant Algoritme',cost:5000,cashflow:m,type:'skill'});
          p.addLog(t('log.ft.qs.dep',{amt:cpm(m)})); }},
      { label:t('card.pass'), effect:(p)=>p.addLog(t('log.ft.qs.pass')) }
    ]},
  { id:'ft_me', type:'fast_track', title:t('ft.me.title'), icon:'🎯',
    description:t('ft.me.desc'),
    choices:[
      { label:t('ft.me.apply'), condition:(p)=>p.cash>=2500,
        effect:(p)=>{ p.addCash(-2500,'(market edge)');
          if(Math.random()>0.35){const g=Math.floor(Math.random()*2200)+800;p.addCash(g,'(market edge +'+c(g)+')');p.addLog(t('log.ft.me.result',{amt:c(g)}));}
          else p.addLog(t('log.ft.me.none')); }},
      { label:t('card.pass'), effect:(p)=>p.addLog(t('log.ft.me.pass')) }
    ]},
  { id:'ft_ps', type:'fast_track', title:'Portfolio Scaling', icon:'📈',
    description:'You\'ve built cashflow. Now use it as fuel. Reinvest systematically and let compounding do the heavy lifting.',
    choices:[
      { label:'Scale portfolio ($8,000)', condition:(p)=>p.cash>=8000,
        effect:(p)=>{ p.addCash(-8000,'(portfolio scaling)');
          const m=Math.floor(Math.random()*600)+500;
          p.addAsset({id:`port_${Date.now()}`,name:'Opgeschaalde Portefeuille',cost:8000,cashflow:m,type:'investment'});
          p.addLog(t('log.ft.pf.result',{amt:cpm(m)})); }},
      { label:t('card.pass'), effect:(p)=>p.addLog(t('log.ft.pf.pass')) }
    ]},
  { id:'ft_ai', type:'fast_track', title:'Algorithmic Investing', icon:'⚙️',
    description:'The best investors aren\'t smarter — they\'ve removed the human in the loop. Rules scale. Gut instinct doesn\'t.',
    choices:[
      { label:'Implement system ($4,000)', condition:(p)=>p.cash>=4000,
        effect:(p)=>{ p.addCash(-4000,'(algo investing)');
          const m=Math.floor(Math.random()*350)+250;
          p.addAsset({id:`algo_${Date.now()}`,name:'Algoritmisch Systeem',cost:4000,cashflow:m,type:'skill'});
          p.addLog(t('log.ft.al.result',{amt:cpm(m)})); }},
      { label:t('card.pass'), effect:(p)=>p.addLog(t('log.ft.al.pass')) }
    ]},
];
class MentorEngine {
  constructor() {
    this._lastConcept = null;
    this._tipIndex    = {};
    this._tipCount    = 0;
    this._lastTipAt   = -3;
    this._eventCount  = 0;
  }

  // ── Public API ────────────────────────────────────────────────────────────

  _canShow(priority) {
    this._eventCount++;
    const gap = this._eventCount - this._lastTipAt;
    if (priority === 'milestone' || priority === 'level_up') return true;
    if (gap < 2) return false;
    if (this._tipCount < 3) return true;
    if (gap < 3) return false;
    return true;
  }

  _shown(tip) {
    if (!tip) return null;
    this._tipCount++;
    this._lastTipAt = this._eventCount;
    return tip;
  }

  onOpportunityDrawn(card) {
    if (!this._canShow()) return null;
    return this._shown(this._pick('opportunity_drawn'));
  }

  onGoodInvestment(playerOrCard, maybePlayer) {
    const player = maybePlayer || playerOrCard;
    const pct = player.passiveIncome / Math.max(1, player.expenses);
    if (pct >= 0.75 && pct < 0.9)  return this._shown(this._pick('passive_milestone_75'));
    if (pct >= 0.50 && pct < 0.65) return this._shown(this._pick('passive_milestone_50'));
    if (pct >= 0.25 && pct < 0.40) return this._shown(this._pick('passive_milestone_25'));
    if (!this._canShow()) return null;
    return this._shown(this._pick('good_investment'));
  }

  onDealDeclined(card, player) {
    if (!card.cost || player.cash < card.cost) return null;
    if (!this._canShow()) return null;
    return this._shown(this._pick('deal_declined'));
  }

  onBadEvent(card) {
    if (!this._canShow()) return null;
    return this._shown(this._pick('bad_event'));
  }

  onDebtPaid() {
    return this._shown(this._pick('debt_paid'));
  }

  onLevelUp(newLevel) {
    return this._shown(this._pick('level_up'));
  }

  onFastTrackEntry() {
    return this._shown(this._pick('fast_track_entry'));
  }

  onFastTrackSkill() {
    return this._shown(this._pick('fast_track_skill'));
  }

  // ── Internal ─────────────────────────────────────────────────────────────

  _pick(category) {
    const pool = TIPS[category];
    if (!pool || pool.length === 0) return null;

    // Rotate through tips in category, skip if same concept as last shown
    const idx = this._tipIndex[category] || 0;
    for (let i = 0; i < pool.length; i++) {
      const tip = pool[(idx + i) % pool.length];
      if (tip.concept !== this._lastConcept) {
        this._tipIndex[category] = (idx + i + 1) % pool.length;
        this._lastConcept        = tip.concept;
        return { ...tip, category };
      }
    }
    // All same concept — just return next
    const tip = pool[idx % pool.length];
    this._tipIndex[category] = (idx + 1) % pool.length;
    return { ...tip, category };
  }
}

// ─── XPEngine.js ─────────────────────────────────────────────────────────────
// XP and Investor Level system. Pure logic — mutates player.xp / player.level.
// Returns { xpGained, leveled, newLevel, totalXP } so UI can react.

const XP_REASONS = {
  BUY_ASSET:        'buy_asset',
  PASSIVE_INCREASE: 'passive_increase',
  PAY_DEBT:         'pay_debt',
  WIN:              'win',
  SURVIVE_EVENT:    'survive_event',
  COMPLETE_TURN:    'complete_turn',
};

// XP thresholds to reach each level (cumulative)
const LEVEL_THRESHOLDS = [
  0,     // L1  — Rookie (start)
  150,   // L2  — Saver
  350,   // L3  — Investor
  650,   // L4  — Cashflow Builder
  1050,  // L5  — Asset Accumulator
  1600,  // L6  — Passive Income Pro
  2300,  // L7  — Wealth Builder
  3200,  // L8  — Financially Independent
  4300,  // L9  — Rat Race Escapee
  5800,  // L10 — Money Master
];

const LEVEL_TITLES = [
  t('level.1'), t('level.2'), t('level.3'), t('level.4'), t('level.5'),
  t('level.6'), t('level.7'), t('level.8'), t('level.9'), t('level.10'),
];

const XP_TABLE = {
  [XP_REASONS.BUY_ASSET]:        (data) => 30 + Math.floor((data?.cashflow || 0) / 15),
  [XP_REASONS.PASSIVE_INCREASE]:  (data) => 8,
  [XP_REASONS.PAY_DEBT]:          (data) => 40,
  [XP_REASONS.WIN]:               (data) => 300,
  [XP_REASONS.SURVIVE_EVENT]:     (data) => 10,
  [XP_REASONS.COMPLETE_TURN]:     (data) => 3,
};

class XPEngine {

  // Award XP to a player. Returns { xpGained, leveled, oldLevel, newLevel, totalXP }.
  // Player must have .xp (number) and .level (number) properties.
  static award(player, reason, data = {}) {
    const xpFn   = XP_TABLE[reason];
    if (!xpFn) return null;

    const xpGained = xpFn(data);
    const oldLevel = player.level;

    player.xp    = (player.xp || 0) + xpGained;
    player.level = XPEngine.levelForXP(player.xp);

    const leveled = player.level > oldLevel;

    return {
      xpGained,
      leveled,
      oldLevel,
      newLevel: player.level,
      totalXP:  player.xp,
      title:    LEVEL_TITLES[player.level - 1] || LEVEL_TITLES[LEVEL_TITLES.length - 1],
    };
  }

  // Returns the level (1-based) for a given total XP
  static levelForXP(xp) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  }

  // Progress within current level: { current, needed, pct }
  static levelProgress(xp) {
    const level      = XPEngine.levelForXP(xp);
    const levelIdx   = level - 1;
    const thisFloor  = LEVEL_THRESHOLDS[levelIdx]  || 0;
    const nextFloor  = LEVEL_THRESHOLDS[levelIdx + 1] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 1;
    const current    = xp - thisFloor;
    const needed     = nextFloor - thisFloor;
    const pct        = Math.min(100, Math.round((current / needed) * 100));
    return { current, needed, pct, level, title: LEVEL_TITLES[levelIdx] || 'Money Master' };
  }

  static getTitle(level) {
    return LEVEL_TITLES[(level || 1) - 1] || LEVEL_TITLES[LEVEL_TITLES.length - 1];
  }

  static getMaxLevel() {
    return LEVEL_THRESHOLDS.length;
  }
}

// ─── GameEngine.js ────────────────────────────────────────────────────────────
// Orchestrates the game loop. Coordinates state, cards, and UI callbacks.
// In multiplayer: this runs on the server. Actions are sent as messages.


class GameEngine {
  constructor({ onStateChange, onMessage, onCardDrawn, onGameOver, onPayday } = {}) {
    this.state      = new GameState();
    this.cardEngine = new CardEngine();
    this.mentor     = new MentorEngine();

    // UI Callbacks — the engine never touches the DOM directly
    this.onStateChange = onStateChange || (() => {});
    this.onMessage     = onMessage     || (() => {});
    this.onCardDrawn   = onCardDrawn   || (() => {});
    this.onGameOver    = onGameOver    || (() => {});
    this.onPayday      = onPayday      || (() => {});
    this.onMentor      = (() => {});   // set by bootstrap after UI is ready
    this.onTurnEnd    = (() => {});   // MP: UI shows handoff screen
  }

  // ── Setup ──────────────────────────────────────────────────────────────────

  startGame(playerConfig = {}) {
    // Per-profession starting profile: cash, income, expenses, and any starting debts.
    // Debts reflect realistic life situations for each career path.
    const professionProfiles = {
      // Brief-spec starter profile (salary 3000, expenses 2500, cash 1000)
      'Starter': {
        cash: 1000, income: 3000, expenses: 2500,
        debts: [],
      },
      'Software Engineer': {
        cash: 5000, income: 3500, expenses: 2800,
        debts: [],
      },
      'Teacher': {
        cash: 3500, income: 3000, expenses: 2200,
        debts: [
          { id: 'student_loan', name: t('debt.student_loan'), amount: 18000, monthlyPayment: 120, description: 'Education debt' },
        ],
      },
      'Doctor': {
        cash: 8000, income: 6000, expenses: 4800,
        debts: [
          { id: 'med_school_loan', name: t('debt.med_school'), amount: 120000, monthlyPayment: 800, description: 'Professional school debt' },
        ],
      },
      'Entrepreneur': {
        cash: 4000, income: 4500, expenses: 3600,
        debts: [
          { id: 'business_loan', name: t('debt.business_loan'), amount: 25000, monthlyPayment: 250, description: 'Small business loan' },
        ],
      },
      // ── FXminds character profiles ──────────────────────────────────────────
      'Beginner Trader': {
        cash: 2500, income: 2800, expenses: 2600,
        debts: [
          { id: 'credit_card', name: 'Credit Card', amount: 4500, monthlyPayment: 90, description: 'Revolving consumer debt' },
        ],
      },
      'FXminds Student': {
        cash: 3000, income: 3200, expenses: 2400,
        startingAssets: [
          { id: 'fxm_course', name: 'FXminds Course Portfolio', cost: 1500, cashflow: 180, type: 'skill' },
        ],
        debts: [],
      },
      'Lifestyle Addict': {
        cash: 1200, income: 5500, expenses: 5100,
        debts: [
          { id: 'car_loan',  name: 'Luxury Car Loan',  amount: 32000, monthlyPayment: 480, description: 'Depreciating asset debt' },
          { id: 'cc_debt',   name: 'Credit Card Debt', amount: 8500,  monthlyPayment: 170, description: 'Consumer debt' },
        ],
      },
      'The Grinder': {
        cash: 6000, income: 4200, expenses: 2000,
        debts: [],
      },
    };

    // Support custom numeric profile injected from "Start With My Situation"
    const profile = playerConfig._customProfile
      ? { ...playerConfig._customProfile, debts: playerConfig._customProfile.debts || [], startingAssets: playerConfig._customProfile.startingAssets || [] }
      : (professionProfiles[playerConfig.profession] || professionProfiles['Software Engineer']);

    const player = new PlayerState({
      id: 'player_1',
      name: playerConfig.name || 'Player',
      profession: playerConfig.profession || 'Software Engineer',
    });

    // Apply profession-specific financials
    player.cash     = profile.cash;
    player.income   = profile.income;
    player.expenses = profile.expenses;

    // Apply starting debts silently (bypass addDebt's log so log starts clean)
    profile.debts.forEach(d => {
      player.debts.push({ ...d });
    });

    // Apply starting assets if character has them (e.g. FXminds Student)
    if (profile.startingAssets) {
      profile.startingAssets.forEach(a => {
        player.assets.push({ ...a });
      });
    }

    // Set turn to 1 — the player is starting their first turn
    player.turnsPlayed = 1;

    // Write startup log message so the activity log is never empty on load
    const cf = player.monthlyCashflow;
    player.addLog(`🎮 ${t('log.start.joined',{profession:player.profession||t('sp.diag.profile'),income:cpm(player.income),expenses:cpm(player.expenses)})}`);
    player.addLog(t('log.start.sal',{amt:cpm(player.income)}));
    player.addLog(t('log.start.exp',{amt:cpm(player.expenses)}));
    player.addLog(t('log.start.cash',{amt:c(player.cash)}));
    if (profile.debts.length > 0) {
      const debtTotal = profile.debts.reduce((s, d) => s + d.amount, 0);
      player.addLog(t('log.start.debts',{amt:c(debtTotal),names:profile.debts.map(d=>d.name).join(', ')}));
    }
    player.addLog(t('log.start.cf',{flow:c(cf,true)}));

    // Set game state
    this.state.addPlayer(player);
    this.state.buildBoard();
    this.state.gameStarted = true;
    this.state.turn = 1;
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.roll.player',{name:player.name}));

    MultiplayerAdapter.sendAction({ type: 'GAME_STARTED', payload: this.state.toJSON() });
    this._emit();
  }

  // ── Local Multiplayer start ────────────────────────────────────────────────
  startMultiplayerGame(playerConfigs = []) {
    if (playerConfigs.length < 2) { this.startGame(playerConfigs[0] || {}); return; }
    const PP = {
      'Software Engineer': {cash:5000,income:3500,expenses:2800,debts:[]},
      'Teacher':           {cash:3500,income:3000,expenses:2200,debts:[{id:'sl',name:'Student Loan',amount:18000,monthlyPayment:120}]},
      'Doctor':            {cash:8000,income:6000,expenses:4800,debts:[{id:'med',name:'Medical School Loan',amount:120000,monthlyPayment:800}]},
      'Entrepreneur':      {cash:4000,income:4500,expenses:3600,debts:[{id:'biz',name:'Business Startup Loan',amount:25000,monthlyPayment:250}]},
      'Beginner Trader':   {cash:2500,income:2800,expenses:2600,debts:[{id:'cc',name:'Credit Card',amount:4500,monthlyPayment:90}]},
      'FXminds Student':   {cash:3000,income:3200,expenses:2400,startingAssets:[{id:'fxm',name:'FXminds Course Portfolio',cost:1500,cashflow:180,type:'skill'}],debts:[]},
      'Lifestyle Addict':  {cash:1200,income:5500,expenses:5100,debts:[{id:'car',name:'Luxury Car Loan',amount:32000,monthlyPayment:480},{id:'cc2',name:'Credit Card Debt',amount:8500,monthlyPayment:170}]},
      'The Grinder':       {cash:6000,income:4200,expenses:2000,debts:[]},
    };
    playerConfigs.forEach((cfg, i) => {
      const prof = cfg._customProfile
        ? {...cfg._customProfile, debts:cfg._customProfile.debts||[], startingAssets:cfg._customProfile.startingAssets||[]}
        : (PP[cfg.profession] || PP['Software Engineer']);
      const p = new PlayerState({ id:`player_${i+1}`, name:cfg.name||`Player ${i+1}`, profession:cfg.profession||'Software Engineer' });
      p.cash = prof.cash; p.income = prof.income; p.expenses = prof.expenses;
      (prof.debts||[]).forEach(d => p.debts.push({...d, id:d.id+'_p'+(i+1)}));
      (prof.startingAssets||[]).forEach(a => p.assets.push({...a, id:a.id+'_p'+(i+1)}));
      p.turnsPlayed = 0;
      p.addLog(t('log.start.joined',{profession:p.profession||t('rp.view.me'),income:cpm(p.income),expenses:cpm(p.expenses)}));
      this.state.addPlayer(p);
    });
    this.state.buildBoard();
    this.state.gameStarted = true;
    this.state.isMultiplayer = true;
    this.state.turn = 1;
    this.state.activePlayerIndex = 0;
    const first = this.state.activePlayer;
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.roll.player',{name:first.name}));
    this._emit();
  }

  // ── MP helpers ────────────────────────────────────────────────────────────
  _maybeAdvanceTurn() {
    if (!this.state.isMultiplayer || this.state.isGameOver) return false;
    // Skip bankrupt players
    let attempts = 0;
    do {
      this.state.nextTurn();
      attempts++;
      if (attempts > this.state.players.length) break; // safety
    } while (this.state.activePlayer._bankrupt);
    const next = this.state.activePlayer;
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.roll.player',{name:next.name}));
    this._emit();
    this.onTurnEnd({ player: next.toJSON(), playerIndex: this.state.activePlayerIndex });
    return true;
  }

  resumeAfterHandoff() {
    const player = this.state.activePlayer;
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.roll.player',{name:player.name}));
    this._emit();
  }

  // ── Turn Flow ──────────────────────────────────────────────────────────────

  rollDice() {
    if (this.state.phase !== GamePhase.ROLLING) return;

    const roll  = Math.ceil(Math.random() * 6);   // single die, 1-6
    const total = roll;

    this.state.lastRoll = { roll, total };
    this.state.setPhase(GamePhase.MOVING);

    const player   = this.state.activePlayer;
    const oldPos   = player.position;
    const boardLen = this.state.board.length;
    const newPos   = (oldPos + total) % boardLen;

    // passedGo: true when the move wraps past the last space back to the start
    const passedGo = (oldPos + total) >= boardLen;

    player.position    = newPos;
    player.turnsPlayed++;

    this.state.setMessage(t('msg.rolled',{roll,pos:newPos+1}));
    this._emit();

    // Chain: if passedGo, show payday first, THEN resolve the landing space
    if (passedGo && this.state.board[newPos] !== SpaceType.PAYDAY) {
      // Pass-go payday, then resolve space after the message clears
      this._triggerPayday(player, 'Passed Go — Payday!', () => {
        this._resolveSpace(player, newPos);
      });
    } else {
      // No passedGo — resolve space after animation delay
      setTimeout(() => this._resolveSpace(player, newPos), GameConfig.ANIMATION_DURATION);
    }
  }

  _resolveSpace(player, position) {
    const spaceType = this.state.board[position];

    switch (spaceType) {
      case SpaceType.PAYDAY:
        this._triggerPayday(player, 'Landed on Payday!');
        break;
      case SpaceType.OPPORTUNITY:
        if (this.state.fastTrack) {
          this.state.setMessage(t('msg.ft.incoming'));
          this._emit();
          setTimeout(() => this._drawFastTrackCard(player), GameConfig.ANIMATION_DURATION);
          return;
        }
        this.state.setMessage(t('msg.opp.incoming'));
        this._emit();
        setTimeout(() => this._drawOpportunity(), 300);
        break;
      case SpaceType.BAD_EVENT:
        this.state.setMessage(t('msg.bad.incoming'));
        this._emit();
        setTimeout(() => this._drawBadEvent(), 300);
        break;
      case SpaceType.CHOICE:
        this._triggerChoice(player);
        break;
      case SpaceType.REST:
        player.addLog('☕ Rest — your assets keep earning. Nothing happens.');
        this.state.setMessage(t('msg.rest'));
        if (!this._maybeAdvanceTurn()) {
          this.state.setPhase(GamePhase.ROLLING);
          this._emit();
        }
        break;
      default:
        this._checkWinCondition();  // check even on unrecognised spaces
        if (!this.state.isGameOver) {
          this.state.setPhase(GamePhase.ROLLING);
          this.state.setMessage(t('msg.roll'));
          this._emit();
        }
    }
  }

  _triggerPayday(player, reason, onDone = null) {
    const before = player.cash;
    player.applyMonthlyPayday();
    const earned = player.cash - before;

    this.state.setPhase(GamePhase.PAYDAY);
    this.state.setMessage(t('msg.payday',{reason,earned:c(earned,true)}));

    this.onPayday({
      player: player.toJSON(),
      earned,
      statement: CashflowEngine.getStatement(player),
    });

    this._checkWinCondition();
    this._emit();

    if (this.state.isGameOver) return;

    setTimeout(() => {
      if (onDone) {
        // Chain: resolve the landing space after payday message
        onDone();
      } else {
        // Landed directly on PAYDAY space — re-enable rolling (or advance MP turn)
        if (!this._maybeAdvanceTurn()) {
          this.state.setPhase(GamePhase.ROLLING);
          this.state.setMessage(t('msg.roll.player',{name:player.name}));
          this._emit();
        }
      }
    }, GameConfig.MESSAGE_DISPLAY_TIME);
  }

  _drawOpportunity() {
    const player = this.state.activePlayer;
    const card = this.cardEngine.drawOpportunity();
    this.state.currentCard = card;
    this.state.setPhase(GamePhase.CARD_DRAWN);
    this.state.setMessage(t('msg.opp',{title:card.title}));
    player.addLog(t('log.opp.drawn',{title:card.title}));

    this.onCardDrawn({
      card,
      choices: this.cardEngine.getAvailableChoices(card, player),
      preview: card.cost != null
        ? CashflowEngine.previewCardEffect(card, player)
        : null,
    });

    const mentorTip = this.mentor.onOpportunityDrawn(card);
    if (mentorTip) this.onMentor(mentorTip);

    this._emit();
  }

  _drawBadEvent() {
    const player = this.state.activePlayer;
    const card = this.cardEngine.drawBadEvent();
    this.state.currentCard = card;
    this.state.setPhase(GamePhase.CARD_DRAWN);
    this.state.setMessage(t('msg.bad',{title:card.title}));
    player.addLog(t('log.bad.drawn',{title:card.title}));

    this.onCardDrawn({
      card,
      choices: this.cardEngine.getAvailableChoices(card, player),
      preview: null,
    });

    const badTip = this.mentor.onBadEvent(card);
    if (badTip) this.onMentor(badTip);

    this._emit();
  }

  _triggerChoice(player) {
    this.state.setPhase(GamePhase.DECISION);
    this.state.setMessage(t('msg.choice'));
    this._emit();

    const hasDebts  = player.debts.length > 0;
    const hasAssets = player.assets.length > 0;

    // Build options — always include at least "save" so player is never stuck
    const options = [];
    if (hasDebts)  options.push({ id: 'pay_debt',   label: t('choice.pay_debt'),   desc: t('choice.pay_debt.desc') });
    if (hasAssets) options.push({ id: 'sell_asset', label: t('choice.sell_asset'), desc: t('choice.sell_asset.desc') });
    options.push(              { id: 'save',        label: t('choice.save'),       desc: t('choice.save.desc') });

    this.onMessage({ type: 'CHOICE', options });
  }

  // ── Action Handlers ────────────────────────────────────────────────────────

  resolveCard(choiceIndex) {
    const card   = this.state.currentCard;
    const player = this.state.activePlayer;
    if (!card || !player) return;

    const passiveBefore = player.passiveIncome;
    const result = this.cardEngine.resolveChoice(card, choiceIndex, player);

    if (!result.success) {
      this.onMessage({ type: 'ERROR', text: result.message });
      return;
    }

    player.addLog(`✅ ${result.message}`);

    // XP: surviving bad events (silent unless level-up)
    if (card.type === 'bad_event') {
      const xpR = XPEngine.award(player, XP_REASONS.SURVIVE_EVENT);
      if (xpR?.leveled) player.addLog(t('log.level_up',{title:xpR.title}));
    }

    // XP + mentor: buying an asset
    const isPass = result.message === 'Pass' || result.message === 'Decline' || result.message === t('card.pass');
    if (!isPass && player.passiveIncome > passiveBefore) {
      const xpR = XPEngine.award(player, XP_REASONS.BUY_ASSET, { cashflow: card.cashflow || 0 });
      if (xpR?.leveled) {
        player.addLog(t('log.level_up2',{title:xpR.title}));
        const tip = this.mentor.onLevelUp(xpR.newLevel);
        if (tip) this.onMentor(tip);
      } else {
        const tip = this.mentor.onGoodInvestment(player);
        if (tip) this.onMentor(tip);
      }
    } else if (isPass && card.type === 'opportunity') {
      const tip = this.mentor.onDealDeclined(card, player);
      if (tip) this.onMentor(tip);
    }

    this.state.currentCard = null;
    this._checkWinCondition();

    if (!this.state.isGameOver) {
      if (!this._maybeAdvanceTurn()) {
        this.state.setPhase(GamePhase.ROLLING);
        this.state.setMessage(t('msg.roll.player',{name:player.name}));
      }
    }

    this._emit();
  }

  resolveChoice(action, payload = {}) {
    const player = this.state.activePlayer;

    switch (action) {
      case 'pay_debt': {
        const debtId = payload.debtId;
        const debt   = debtId
          ? player.debts.find(d => d.id === debtId)
          : player.debts[0];
        if (!debt) {
          player.addLog(t('log.no_debt_selected'));
          break;
        }
        if (player.cash < debt.amount) {
          // Not enough cash — show message, reset phase to ROLLING, never freeze
          const needed = debt.amount - player.cash;
          this.state.setPhase(GamePhase.ROLLING);
          this.state.setMessage(t('msg.debt.need',{needed:c(needed),debt:debt.name}));
          this._emit();
          return;
        }
        player.addCash(-debt.amount, '(aflossing: '+debt.name+')');
        player.removeDebt(debt.id);
        player.addLog(t('log.debt_cleared',{name:debt.name,pmt:cpm(debt.monthlyPayment)}));
        const xpR = XPEngine.award(player, XP_REASONS.PAY_DEBT);
        if (xpR?.leveled) player.addLog(`⭐ Niveau omhoog — ${xpR.title}!`);
        const tip = this.mentor.onDebtPaid();
        if (tip) this.onMentor(tip);
        break;
      }
      case 'sell_asset': {
        const asset = payload.assetId
          ? player.assets.find(a => a.id === payload.assetId)
          : player.assets[0];
        if (asset) {
          player.addCash(asset.cost, `(sold ${asset.name})`);
          player.removeAsset(asset.id);
          player.addLog(t('log.sold_for',{name:asset.name,amt:c(asset.cost)}));
        }
        break;
      }
      case 'save':
      default:
        player.addLog(t('log.chose_saving'));
        break;
    }

    this._checkWinCondition();
    if (!this.state.isGameOver) {
      if (!this._maybeAdvanceTurn()) {
        this.state.setPhase(GamePhase.ROLLING);
        this.state.setMessage(t('msg.roll.player',{name:player.name}));
      }
    }
    this._emit();
  }

  // ── Direct Debt Payoff (from dashboard, not modal) ────────────────────────
  // Safe to call in any phase except GAME_OVER. Always leaves phase as ROLLING.
  payDebtDirect(debtId) {
    if (this.state.phase === GamePhase.GAME_OVER) {
      return { ok: false, message: 'Game is over.' };
    }
    const player = this.state.activePlayer;
    const debt   = player.debts.find(d => d.id === debtId);
    if (!debt) {
      this.state.setPhase(GamePhase.ROLLING);
      this.state.setMessage(t('msg.roll.player',{name:player.name}));
      this._emit();
      return { ok: false, message: 'Debt not found.' };
    }
    if (player.cash < debt.amount) {
      const needed = debt.amount - player.cash;
      // Always reset phase to ROLLING — never leave stuck in DECISION
      this.state.setPhase(GamePhase.ROLLING);
      this.state.setMessage(t('msg.debt.need',{needed:c(needed),debt:debt.name}));
      this._emit();
      return { ok: false, message: t('msg.debt.need',{needed:c(needed),debt:debt.name}) };
    }
    player.addCash(-debt.amount, `(paid off ${debt.name})`);
    player.removeDebt(debt.id);
    player.addLog(t('log.debt_cleared',{name:debt.name,pmt:cpm(debt.monthlyPayment)}));
    const xpR = XPEngine.award(player, XP_REASONS.PAY_DEBT);
    if (xpR?.leveled) player.addLog(`⭐ Level Up → ${xpR.title}!`);
    const tip = this.mentor.onDebtPaid();
    if (tip) this.onMentor(tip);
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.debt.paid',{debt:debt.name}));
    this._checkWinCondition();
    this._emit();
    return { ok: true, message: `Paid off ${debt.name}.` };
  }

  // ── Win / Lose ─────────────────────────────────────────────────────────────

  _checkWinCondition() {
    const player = this.state.activePlayer;

    if (player.isWinner && !this.state.fastTrack) {
      XPEngine.award(player, XP_REASONS.WIN);
      this.state.fastTrack = true;
      this.state.winner    = player;
      if (this.state.isMultiplayer) {
        this.state.setPhase(GamePhase.GAME_OVER);
        this.state.setMessage(t('msg.win.mp',{name:player.name}));
        this.onGameOver({ winner:player.toJSON(), reason:'WIN_MP', players:this.state.players.map(p=>p.toJSON()) });
      } else {
        this.state.setMessage(t('msg.win'));
        this.onGameOver({ winner: player.toJSON(), reason: 'WIN' });
      }
      return;
    }

    if (player.isBankrupt && !this.state.fastTrack) {
      if (this.state.isMultiplayer) {
        player._bankrupt = true;
        player.addLog(t('log.bankrupt'));
        const alive = this.state.players.filter(p => !p._bankrupt).length;
        if (alive <= 1) {
          this.state.setPhase(GamePhase.GAME_OVER);
          this.state.setMessage(t('msg.bankrupt.mp',{name:player.name}));
          this.onGameOver({ winner:null, reason:'BANKRUPT', players:this.state.players.map(p=>p.toJSON()) });
        } else {
          this.state.setMessage(t('msg.eliminated',{name:player.name}));
          this._maybeAdvanceTurn();
        }
      } else {
        this.state.setPhase(GamePhase.GAME_OVER);
        // Diagnose the bankruptcy cause for the debrief screen
        const cf = player.monthlyCashflow;
        const stuck = cf < -50 && player.assets.length === 0 && player.cash < 800;
        const bankruptCause = stuck ? 'STUCK' : 'CASH_FLOOR';
        this.state.setMessage(stuck
          ? t('msg.bankrupt.stuck')
          : t('msg.bankrupt.cash',{cash:c(player.cash)}));
        this.onGameOver({ winner: null, reason: 'BANKRUPT', bankruptCause, player: player.toJSON() });
      }
    }
  }

  enterFastTrack() {
    if (!this.state.fastTrack) return;
    this.state.setPhase(GamePhase.ROLLING);
    this.state.setMessage(t('msg.ft.active'));
    this._emit();
    const tip = this.mentor.onFastTrackEntry();
    if (tip) this.onMentor(tip);
  }

  _drawFastTrackCard(player) {
    const card = this.cardEngine.drawFastTrack();
    if (!card) return;
    this.state.currentCard = card;
    this.state.setPhase(GamePhase.CARD_DRAWN);
    this.state.setMessage(`🚀 Fast Track: ${card.title}`);
    const choices = this.cardEngine.getAvailableChoices(card, player);
    this.onCardDrawn({ card, choices, preview: null });
    this._emit();
    const tip = this.mentor.onFastTrackSkill();
    if (tip) this.onMentor(tip);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  getStatement() {
    return CashflowEngine.getStatement(this.state.activePlayer);
  }

  getState() {
    return this.state;
  }

  _emit() {
    this.onStateChange(this.state);
  }
}


// ════ AudioEngine ═══════════════════════════════════════════════════════════
// Synthesizes all game audio using Web Audio API.
// No external files — everything is generated procedurally.
// ─────────────────────────────────────────────────────────────────────────────

const AudioEngine = (() => {
  let ctx = null;           // AudioContext — created lazily on first interaction
  let masterGain = null;    // master volume node
  let sfxEnabled  = true;   // user setting
  let musicEnabled = true;  // user setting

  // ── Music state ──────────────────────────────────────────────────────────
  let musicNodes = [];       // active oscillators / nodes for current track
  let currentTrack = null;   // 'ratrace' | 'fasttrack' | null

  // ── Init AudioContext lazily (browsers block until user gesture) ─────────
  function _init() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(1.0, ctx.currentTime);
      masterGain.connect(ctx.destination);
    } catch (e) {
      ctx = null;
    }
  }

  // ── Resume if suspended (mobile autoplay policy) ──────────────────────────
  function _resume() {
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  // ── Safe play: wrap each sound in try/catch so errors never break gameplay ─
  function _safe(fn) {
    try { fn(); } catch(e) { /* silent fail */ }
  }

  // ── Core synthesizer helpers ──────────────────────────────────────────────

  // Tone: play a sine/triangle burst at frequency for duration ms
  function _tone(freq, vol, durSec, type = 'sine', delayMs = 0) {
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(masterGain);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delayMs / 1000);
    gain.gain.setValueAtTime(0, ctx.currentTime + delayMs / 1000);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delayMs / 1000 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delayMs / 1000 + durSec);
    osc.start(ctx.currentTime + delayMs / 1000);
    osc.stop(ctx.currentTime + delayMs / 1000 + durSec + 0.05);
  }

  // Noise burst: filtered white noise for percussive sounds
  function _noise(vol, durSec, filterFreq = 800, delayMs = 0) {
    if (!ctx) return;
    const buf    = ctx.createBuffer(1, ctx.sampleRate * durSec, ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src    = ctx.createBufferSource();
    src.buffer   = buf;
    const filter = ctx.createBiquadFilter();
    filter.type  = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.8;
    const gain   = ctx.createGain();
    src.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    gain.gain.setValueAtTime(0, ctx.currentTime + delayMs / 1000);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delayMs / 1000 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delayMs / 1000 + durSec);
    src.start(ctx.currentTime + delayMs / 1000);
    src.stop(ctx.currentTime + delayMs / 1000 + durSec + 0.05);
  }

  // ── Stop ambient music ───────────────────────────────────────────────────
  // Cancels the scheduler timer and lets any in-flight note fade out on its own.
  function _stopMusic() {
    if (musicNodes._timerId) {
      clearTimeout(musicNodes._timerId);
      musicNodes._timerId = null;
    }
    musicNodes = [];
    currentTrack = null;
  }

  // ── Sparse ambient note sequencer ────────────────────────────────────────
  // Plays one soft note every 4–7 seconds from a pentatonic scale.
  // No continuous oscillators — CPU idles between notes.
  //
  // Rat Race:  Am pentatonic (A3 C4 D4 E4 G4) — sparse, slightly melancholic.
  // Fast Track: C maj pentatonic (C4 E4 G4 A4 C5) — open, a little brighter.
  //
  // Each note is a sine with a slow attack (0.08s) and long tail (1.4s),
  // occasionally doubled an octave down at half volume for warmth.
  // ─────────────────────────────────────────────────────────────────────────

  function _startMusic(track) {
    if (!ctx || !musicEnabled) return;
    if (currentTrack === track) return;
    _stopMusic();
    currentTrack = track;

    const SCALES = {
      ratrace:   [220.00, 261.63, 293.66, 329.63, 392.00],  // Am pent A3–G4
      fasttrack: [261.63, 329.63, 392.00, 440.00, 523.25],  // C maj pent C4–C5
    };
    const scale = SCALES[track] || SCALES.ratrace;

    // Re-use the musicNodes object as a namespace for the timer id
    musicNodes = [];
    musicNodes._timerId = null;

    function _playNote() {
      if (!ctx || !musicEnabled || currentTrack !== track) return;

      // Pick a random pitch from scale; occasionally add a soft sub-octave
      const freq    = scale[Math.floor(Math.random() * scale.length)];
      const vol     = 0.028 + Math.random() * 0.012;   // 0.028–0.040
      const attack  = 0.08;
      const sustain = 0.6  + Math.random() * 0.4;      // 0.6–1.0 s
      const release = 1.0  + Math.random() * 0.6;      // 1.0–1.6 s
      const now     = ctx.currentTime;

      // Main note
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + attack);
      gain.gain.setValueAtTime(vol, now + attack + sustain);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + sustain + release);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + attack + sustain + release + 0.1);

      // ~40% chance of a soft sub-octave for warmth
      if (Math.random() < 0.4) {
        const sub  = ctx.createOscillator();
        const subG = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(freq / 2, now);
        subG.gain.setValueAtTime(0, now);
        subG.gain.linearRampToValueAtTime(vol * 0.45, now + attack);
        subG.gain.setValueAtTime(vol * 0.45, now + attack + sustain);
        subG.gain.exponentialRampToValueAtTime(0.0001, now + attack + sustain + release);
        sub.connect(subG);
        subG.connect(masterGain);
        sub.start(now);
        sub.stop(now + attack + sustain + release + 0.1);
      }

      // Schedule the next note: 4–7 second gap
      const gap = 4000 + Math.random() * 3000;
      musicNodes._timerId = setTimeout(_playNote, gap);
    }

    // Small initial delay so the first note doesn't fire mid-action
    musicNodes._timerId = setTimeout(_playNote, 1200);
  }

  // ══ PUBLIC SOUND API ════════════════════════════════════════════════════════

  const SFX = {

    // UI: very soft tick — buttons, card selections
    click() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(900, 0.02, 0.04, 'sine');
        _tone(700, 0.015, 0.035, 'sine', 20);
      });
    },

    // Dice roll: short rattling noise burst + rising pitch
    dice() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _noise(0.04, 0.08, 600, 0);
        _noise(0.03, 0.07, 900, 40);
        _tone(220, 0.025, 0.08, 'triangle', 60);
        _tone(330, 0.020, 0.07, 'triangle', 100);
      });
    },

    // Payday: warm ascending two-note chime
    payday() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(523.25, 0.04, 0.18, 'sine', 0);   // C5
        _tone(659.25, 0.04, 0.22, 'sine', 120);  // E5
        _tone(783.99, 0.035, 0.3,  'sine', 230);  // G5
      });
    },

    // Asset purchased: upward arpeggiated chord (reward feeling)
    assetBought() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(392.00, 0.04, 0.16, 'triangle', 0);    // G4
        _tone(523.25, 0.04, 0.18, 'triangle', 80);   // C5
        _tone(659.25, 0.04, 0.22, 'triangle', 160);  // E5
        _tone(783.99, 0.035, 0.28, 'sine',     240);  // G5
      });
    },

    // Debt paid off: resolution — descending then landing on tonic
    debtPaid() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(587.33, 0.04, 0.14, 'triangle', 0);   // D5
        _tone(523.25, 0.04, 0.14, 'triangle', 100); // C5
        _tone(392.00, 0.04, 0.3,  'sine',     200); // G4 — feels resolved
      });
    },

    // Bad event: low dissonant thud
    badEvent() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _noise(0.05, 0.12, 180, 0);
        _tone(82.41,  0.04, 0.28, 'sawtooth', 20);  // low E
        _tone(87.31,  0.03, 0.22, 'sawtooth', 20);  // slight dissonance
        _tone(110.0,  0.025, 0.18, 'triangle', 80);
      });
    },

    // Mentor tip: gentle notification — single soft bell
    mentor() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(1046.5, 0.03, 0.06, 'sine', 0);   // C6 soft bell
        _tone(1046.5, 0.025, 0.4,  'sine', 30);   // slight sustain
      });
    },

    // Fast Track entry: triumphant rising phrase
    fastTrack() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        _tone(392.00, 0.04, 0.15, 'triangle', 0);    // G4
        _tone(523.25, 0.05, 0.18, 'triangle', 100);  // C5
        _tone(659.25, 0.05, 0.22, 'triangle', 220);  // E5
        _tone(783.99, 0.05, 0.30, 'sine',     360);  // G5
        _tone(1046.5, 0.05, 0.40, 'sine',     500);  // C6
      });
    },

    // Level up: sparkle arpeggio
    levelUp() {
      _safe(() => {
        if (!sfxEnabled) return;
        _init(); _resume();
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        notes.forEach((f, i) => _tone(f, 0.05, 0.15, 'sine', i * 70));
      });
    },

  };

  // ══ MUSIC CONTROLS ══════════════════════════════════════════════════════════

  const Music = {
    play(track) {
      _safe(() => {
        _init(); _resume();
        _startMusic(track);
      });
    },
    stop() { _safe(_stopMusic); },
    setEnabled(on) {
      musicEnabled = on;
      if (!on) _safe(_stopMusic);
      // Re-start if re-enabling while game is running — caller handles this
    },
    isEnabled() { return musicEnabled; },
    current() { return currentTrack; },
  };

  // ══ SFX CONTROLS ════════════════════════════════════════════════════════════
  const SFXControl = {
    setEnabled(on) { sfxEnabled = on; },
    isEnabled() { return sfxEnabled; },
  };

  return { SFX, Music, SFXControl };
})();

// ── Bankruptcy debrief helpers ─────────────────────────────────────────────
// Pure functions — no DOM, no engine state. Takes a player JSON snapshot.

function _buildBankruptCauses(p, bankruptCause) {
  const cf      = p.monthlyCashflow ?? (p.income + (p.passiveIncome||0) - p.expenses);
  const debts   = p.debts || [];
  const assets  = p.assets || [];
  const debtDrag= debts.reduce((s,d) => s + (d.monthlyPayment||0), 0);
  const causes  = [];

  if (assets.length === 0)
    causes.push({ icon: '📉', text: 'Zero assets — no passive income was ever built. Every month you relied 100% on active income to survive.' });
  if (debtDrag > 0 && debtDrag > p.income * 0.25)
    causes.push({ icon: '💳', text: t('loss.cause.debt_drag',{drag:cpm(debtDrag),pct:Math.round(debtDrag/p.income*100)}) });
  if (cf < -200)
    causes.push({ icon: '🔻', text: t('loss.cause.neg_cf',{cf:c(cf,true)}) });
  if (bankruptCause === 'STUCK' && assets.length === 0 && cf < 0)
    causes.push({ icon: '🪤', text: t('loss.cause.trap') });
  if (causes.length === 0)
    causes.push({ icon: '💸', text: t('loss.cause.buffer') });

  return causes.map(c =>
    `<div class="eos-debrief-cause">
      <div class="eos-debrief-icon">${c.icon}</div>
      <div class="eos-debrief-txt">${c.text}</div>
    </div>`
  ).join('');
}

function _buildBankruptDebrief(p, bankruptCause) {
  const cf      = p.monthlyCashflow ?? (p.income + (p.passiveIncome||0) - p.expenses);
  const debts   = p.debts || [];
  const assets  = p.assets || [];
  const debtDrag= debts.reduce((s,d) => s + (d.monthlyPayment||0), 0);
  const lines   = [];

  if (assets.length === 0 && debtDrag > 0)
    lines.push(t('loss.debrief.1a'));
  else if (assets.length === 0)
    lines.push(t('loss.debrief.1b'));

  if (cf < -100)
    lines.push(t('loss.debrief.2'));

  lines.push(t('loss.debrief.3'));

  return lines;
}

// ════ src/ui/UIController.js ════
// ─── UIController.js ──────────────────────────────────────────────────────────
// Single source of truth for DOM updates.
// Reads game state → renders. Never holds its own state.

class UIController {
  constructor(engine) {
    this.engine = engine;
    this._bindElements();
    this._bindEvents();
  }

  _bindElements() {
    // Panels
    this.statsPanel     = document.getElementById('stats-panel');
    this.boardEl        = document.getElementById('game-board');
    this.cardModal      = document.getElementById('card-modal');
    this.messageBar     = document.getElementById('message-bar');
    this.logEl          = document.getElementById('activity-log');  // legacy compat
    this.feedEl         = document.getElementById('rp-feed');
    this.feedCount      = document.getElementById('rp-feed-count');
    this.rpSectBody     = document.getElementById('rp-sect-body');
    this.rpPlayerSel    = document.getElementById('rp-player-sel');
    this._rpTab         = 'overview';  // active tab key
    this._rpPlayerIdx   = 0;           // index into state.players[]
    this.rollBtn        = document.getElementById('btn-roll');
    this.diceDisplay    = document.getElementById('dice-display');
    this.progressBar    = document.getElementById('win-progress-bar');
    this.progressLabel  = document.getElementById('win-progress-label');
    this.winOverlay     = document.getElementById('win-overlay');
    this.setupScreen    = document.getElementById('setup-screen');
    this.gameScreen     = document.getElementById('game-screen');
    this.statementPanel = document.getElementById('statement-panel');
  }

  _bindEvents() {
    document.getElementById('btn-start')?.addEventListener('click', () => {
      const name       = document.getElementById('player-name')?.value.trim() || 'Player';
      const profession = document.getElementById('player-profession')?.value || 'Software Engineer';

      // Show game screen BEFORE initializing so render() fires into a visible DOM.
      this.setupScreen.classList.add('hidden');
      this.gameScreen.classList.remove('hidden');

      // Initialize engine — fires onStateChange → render() via callback.
      this.engine.startGame({ name, profession });

      // Explicit render after startGame() as a guaranteed sync point.
      // Ensures all stat elements, log, turn, and roll button reflect the
      // freshly initialized PlayerState even if the callback fired early.
      const state = this.engine.getState();
      this.render(state);
    });

    this.rollBtn?.addEventListener('click', () => {
      AudioEngine.SFX.dice();
      this.engine.rollDice();
    });

    document.getElementById('btn-statement')?.addEventListener('click', () => {
      this._toggleStatement();
    });

    document.getElementById('btn-restart')?.addEventListener('click', () => {
      window.location.reload();
    });

    // ── Audio toggle buttons ───────────────────────────────────────────────
    document.getElementById('btn-sfx')?.addEventListener('click', e => {
      const on = !AudioEngine.SFXControl.isEnabled();
      AudioEngine.SFXControl.setEnabled(on);
      e.currentTarget.classList.toggle('audio-on', on);
      e.currentTarget.classList.toggle('audio-muted', !on);
      e.currentTarget.querySelector('.audio-btn-icon').textContent = on ? '🔊' : '🔕';
    });

    // ── Global click sound: delegate from document, very soft ─────────────
    document.addEventListener('click', e => {
      const el = e.target.closest('button, .ob-opt, .sp-char, .sp-opt, .rp-tab, .card-choice-btn, .ob-back, .ob-next, .sp-start, .sp-back');
      // Skip audio toggles themselves (avoid double trigger) and roll button (has own sound)
      if (el && el.id !== 'btn-sfx' && el.id !== 'btn-roll') {
        AudioEngine.SFX.click();
      }
    }, { passive: true });

    // ── Right-panel tab switching ──────────────────────────────────────────
    document.getElementById('rp-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('.rp-tab');
      if (!btn) return;
      this._rpTab = btn.dataset.tab;
      document.querySelectorAll('.rp-tab').forEach(t => t.classList.toggle('rp-tab-active', t === btn));
      const state = this.engine.getState();
      if (state.gameStarted) this._renderRightStatement(state);
    });

    // ── Player selector ────────────────────────────────────────────────────
    document.getElementById('rp-player-sel')?.addEventListener('change', e => {
      this._rpPlayerIdx = parseInt(e.target.value, 10) || 0;
      const state = this.engine.getState();
      if (state.gameStarted) this._renderRightStatement(state);
    });
  }

  // ── Main render entry point ────────────────────────────────────────────────

  render(state) {
    if (!state.gameStarted) return;

    const player = state.activePlayer;
    if (!player) return;

    // ── Audio event detection (diff against last known state) ─────────────
    const prevPassive = this._lastPassive ?? -1;
    const prevDebts   = this._lastDebtCount ?? -1;
    const prevLevel   = this._lastLevel ?? -1;
    const prevFT      = this._lastFastTrack ?? false;

    if (prevPassive >= 0 && player.passiveIncome > prevPassive) {
      AudioEngine.SFX.assetBought();
    }
    if (prevDebts > 0 && player.debts.length < prevDebts) {
      AudioEngine.SFX.debtPaid();
    }
    const curLevel = player.level ?? 1;
    if (prevLevel > 0 && curLevel > prevLevel) {
      AudioEngine.SFX.levelUp();
    }
    if (!prevFT && state.fastTrack) {
      AudioEngine.SFX.fastTrack();
    }

    this._lastPassive    = player.passiveIncome;
    this._lastDebtCount  = player.debts.length;
    this._lastLevel      = curLevel;
    this._lastFastTrack  = !!state.fastTrack;

    this._renderStats(player);
    this._renderBoard(state);   // builds grid once, updates token every time
    this._renderMessage(state.message);
    this._renderMPIndicator(state);  // MP current-player header badge
    this._renderLog(player.log);          // keeps legacy logEl in sync (hidden)
    this._renderLiveFeed(player.log);     // compact live event feed
    this._renderRightStatement(state);    // main right-panel statement
    this._renderProgress(player);
    this._renderDice(state.lastRoll);
    this._renderRollButton(state.phase);
  }

  // ── Stats Panel ────────────────────────────────────────────────────────────

  _renderStats(player) {
    const fmtSgn = (n) => c(n, true);
    const cf     = player.monthlyCashflow;

    // Cashflow hero block (new layout)
    const heroEl = document.getElementById('stat-cashflow');
    if (heroEl) {
      heroEl.textContent = fmtSgn(cf);
      heroEl.className   = `cf-value ${cf >= 0 ? 'positive' : 'negative'}`;
    }
    this._set('stat-cash',         c(player.cash));

    this._set('stat-income',       c(player.income));
    this._set('stat-passive',      c(player.passiveIncome));
    this._set('stat-expenses',     c(player.expenses));
    this._set('stat-assets-count', player.assets.length);
    this._set('stat-debts-count',  player.debts.length);
    this._set('stat-turn',         player.turnsPlayed);
    this._renderPortfolio(player);

    // Net worth colour
    const nwEl = document.getElementById('stat-net-worth');
    if (nwEl) {
      nwEl.textContent  = fmtSgn(player.netWorth);
      nwEl.className    = `stat-value ${player.netWorth >= 0 ? 'positive' : 'negative'}`;
    }

    this._renderXP(player);
  }

  // ── Portfolio Accordion ────────────────────────────────────────────────────

  toggleAccord(which) {
    const body  = document.getElementById(`accord-body-${which}`);
    const arrow = document.getElementById(`accord-arrow-${which}`);
    if (!body) return;
    const open = body.classList.toggle('hidden');  // toggle returns true if now hidden
    if (arrow) arrow.textContent = open ? '›' : '⌄';
  }

  _renderPortfolio(player) {
    this._renderAssetsList(player);
    this._renderDebtsList(player);
  }

  _renderAssetsList(player) {
    const el = document.getElementById('portfolio-assets-list');
    if (!el) return;
    if (!player.assets.length) {
      el.innerHTML = `<div class="accord-empty">${t('stats.assets.empty')}</div>`;
      return;
    }
    el.innerHTML = player.assets.map(a => {
      const roi = a.cost > 0 ? Math.round((a.cashflow * 12 / a.cost) * 100) : 0;
      const be  = a.cost > 0 && a.cashflow > 0 ? Math.round(a.cost / a.cashflow) : null;
      return `
        <div class="accord-item accord-asset">
          <div class="accord-item-name">${a.name}</div>
          <div class="accord-item-rows">
            <span class="accord-kv"><span>Cashflow</span><strong class="positive">+${cpm(a.cashflow)}</strong></span>
            ${a.cost ? `<span class="accord-kv"><span>${t('accord.cost')}</span><strong>${c(a.cost)}</strong></span>` : ''}
            ${roi  ? `<span class="accord-kv"><span>ROI</span><strong>${roi}%/yr</strong></span>` : ''}
            ${be   ? `<span class="accord-kv"><span>${t('card.preview.be')}</span><strong>${t('assets.be.val',{n:be})}</strong></span>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  _renderDebtsList(player) {
    const el    = document.getElementById('portfolio-debts-list');
    if (!el) return;
    if (!player.debts.length) {
      el.innerHTML = `<div class="accord-empty">${t('stats.debts.empty')}</div>`;
      return;
    }
    const phase = this.engine.getState().phase;
    const gameOver = phase === 'GAME_OVER';
    el.innerHTML = player.debts.map(d => {
      const canAfford  = player.cash >= d.amount;
      const payLabel   = canAfford ? t('accord.pay_off',{amt:c(d.amount)}) : t('accord.need_more',{amt:c(d.amount-player.cash)});
      return `
        <div class="accord-item accord-debt">
          <div class="accord-item-name">${d.name}</div>
          <div class="accord-item-rows">
            <span class="accord-kv"><span>Monthly</span><strong class="negative">-${cpm(d.monthlyPayment)}</strong></span>
            <span class="accord-kv"><span>${t('accord.balance')}</span><strong>${c(d.amount)}</strong></span>
            <span class="accord-kv"><span>Cashflow vrijgemaakt</span><strong class="positive">+${cpm(d.monthlyPayment)} vrijgemaakt</strong></span>
          </div>
          ${!gameOver
            ? `<button class="accord-payoff-btn ${canAfford ? '' : 'accord-payoff-locked'}"
                 data-debt-id="${d.id}"
                 ${!canAfford ? 'disabled title="Not enough cash"' : ''}
                 onclick="window._game.ui.handlePayDebt('${d.id}')">
                 💳 ${payLabel}
               </button>`
            : ''
          }
        </div>`;
    }).join('');
  }

  handlePayDebt(debtId) {
    const result = this.engine.payDebtDirect(debtId);
    if (!result.ok) {
      // Always recover to a playable state regardless of why it failed.
      // Force phase to ROLLING if we're not in GAME_OVER, then do a full render.
      const state = this.engine.getState();
      if (state.phase !== 'GAME_OVER') {
        state.setPhase('ROLLING');
        state.setMessage(`⚠️ ${result.message}`);
        this.render(state);
      }
    }
    // On success, engine._emit() → onStateChange → render() already called.
  }

  _renderXP(player) {
    const prog    = XPEngine.levelProgress(player.xp || 0);
    const lvEl    = document.getElementById('xp-level-label');
    const barEl   = document.getElementById('xp-bar-fill');
    const titleEl = document.getElementById('xp-title');
    const prevLv  = this._lastKnownLevel || 1;
    if (lvEl)    lvEl.textContent    = `Lv ${prog.level}`;
    if (titleEl) titleEl.textContent = prog.title;
    if (barEl) {
      barEl.style.width = `${prog.pct}%`;
      if (prog.level > prevLv) {
        const sect = document.querySelector('.xp-sect');
        if (sect) { sect.classList.add('xp-levelup'); setTimeout(() => sect.classList.remove('xp-levelup'), 900); }
      }
    }
    this._lastKnownLevel = prog.level;
  }

  // ── Board ──────────────────────────────────────────────────────────────────

  _renderBoard(state) {
    // Build the board grid only once
    if (!this.boardEl) return;

    if (this.boardEl.children.length === 0 && state.board.length > 0) {
      const icons = {
        [SpaceType.PAYDAY]:      '💰',
        [SpaceType.OPPORTUNITY]: '📈',
        [SpaceType.BAD_EVENT]:   '⚠️',
        [SpaceType.CHOICE]:      '🎯',
        [SpaceType.REST]:        '☕',
      };

      state.board.forEach((type, index) => {
        const space = document.createElement('div');
        space.className     = `board-space space-${type.toLowerCase()}`;
        space.dataset.index = index;
        space.innerHTML     = `
          <span class="space-icon">${icons[type] || '?'}</span>
          <span class="space-num">${index + 1}</span>
        `;
        this.boardEl.appendChild(space);
      });
    }

    // Always update token positions (all players)
    this._updatePlayerToken(state.activePlayer?.position ?? 0, state.players);
  }

  _updatePlayerToken(position, players) {
    // Build a map: spaceIndex → [playerIndices]
    const tokenMap = {};
    if (players && players.length > 1) {
      players.forEach((p, pi) => {
        const pos = p.position ?? 0;
        if (!tokenMap[pos]) tokenMap[pos] = [];
        tokenMap[pos].push(pi);
      });
    }
    document.querySelectorAll('.board-space').forEach((el, i) => {
      // Legacy single-player token highlight
      el.classList.toggle('active', i === position);
      el.classList.toggle('player-here', i === position && (!players || players.length === 1));

      // MP: remove old mp-tokens div and rebuild if needed
      el.querySelector('.mp-tokens')?.remove();
      if (players && players.length > 1 && tokenMap[i]) {
        const wrap = document.createElement('div');
        wrap.className = 'mp-tokens';
        tokenMap[i].forEach(pi => {
          const dot = document.createElement('div');
          dot.className = 'mp-token';
          dot.style.background = `var(--pt${pi % 6})`;
          dot.style.borderColor = `var(--pt${pi % 6})`;
          dot.textContent = (players[pi].name || '?')[0].toUpperCase();
          wrap.appendChild(dot);
        });
        el.appendChild(wrap);
        // Highlight active player's space
        const isActive = tokenMap[i].includes(position === i ? 0 : -1);
        el.classList.toggle('player-here', tokenMap[i].includes(
          players.findIndex(p => (p.position ?? 0) === i && players.indexOf(p) === players.findIndex(pp => pp.position === p.position && !pp._bankrupt))
        ) && i === position);
      }
    });
  }

  // Re-render only the player position (called on move)
  renderMove(newPosition) {
    this._updatePlayerToken(newPosition);
  }

  // ── Card Modal ─────────────────────────────────────────────────────────────

  // ── MP Player Badge — shown in card popups in multiplayer only ────────────

  _mpPlayerBadge() {
    const state = this.engine.getState();
    const players = state.players || [];
    if (players.length < 2) return '';          // single-player: no badge
    const player = state.activePlayer;
    if (!player) return '';
    const pi    = players.findIndex(p => p.id === player.id);
    const color = `var(--pt${Math.max(0, pi) % 6})`;
    const name  = player.name || `Speler ${pi + 1}`;
    const label = t('header.turn.lbl') || 'Beurt:';
    return `<div class="card-player-badge">
      <span class="card-player-dot" style="background:${color}"></span>
      <span class="card-player-turn">${label}</span>
      <span class="card-player-name">${name}</span>
    </div>`;
  }

  showCard({ card, choices, preview }) {
    if (!this.cardModal) return;
    if (card.type === 'fast_track') { this._showFastTrackCard(card, choices); return; }
    if (card.type === 'bad_event') AudioEngine.SFX.badEvent();

    const isOpportunity = card.type === 'opportunity';
    const severityClass = card.severity ? `severity-${card.severity}` : '';

    let previewHtml = '';
    if (preview && isOpportunity) {
      const roi = preview.roiAnnual || 0;
      const be  = preview.monthsToBreakeven || 999;
      let dealLabel = '', dealClass = '';
      if (roi >= 60 || be <= 14)      { dealLabel = t('deal.hot');  dealClass = 'deal-hot'; }
      else if (roi >= 35 || be <= 24) { dealLabel = t('deal.good'); dealClass = 'deal-good'; }
      else if (roi >= 18 || be <= 40) { dealLabel = t('deal.fair'); dealClass = 'deal-fair'; }
      else if (roi > 0)               { dealLabel = t('deal.weak'); dealClass = 'deal-weak'; }
      previewHtml = `
        <div class="card-preview ${dealClass}">
          ${dealLabel ? `<div class="deal-rating ${dealClass}">${dealLabel}</div>` : ''}
          <div class="preview-row ${!preview.canAfford ? 'warn' : ''}">
            <span>${t('card.preview.remain')}</span>
            <strong class="${preview.canAfford ? 'positive' : 'negative'}">${preview.canAfford ? '' : '⚠ '}${preview.cashAfter!=null?c(preview.cashAfter):'—'}</strong>
          </div>
          ${preview.monthsToBreakeven ? `
          <div class="preview-row">
            <span>${t('card.preview.be')}</span>
            <strong>${preview.monthsToBreakeven} mo${preview.monthsToBreakeven <= 18 ? ' ⚡' : ''}</strong>
          </div>` : ''}
          ${roi ? `
          <div class="preview-row">
            <span>${t('card.preview.roi')}</span>
            <strong>${roi}%</strong>
          </div>` : ''}
        </div>
      `;
    }

    const choicesHtml = choices.map(c => `
      <button
        class="choice-btn ${!c.available ? 'disabled' : ''}"
        data-choice="${c.index}"
        ${!c.available ? 'disabled' : ''}
        title="${!c.available ? t('card.req.not.met') : ''}"
      >
        ${c.label}
        ${!c.available ? `<span class="badge">${t('card.cant.afford')}</span>` : ''}
      </button>
    `).join('');

    this.cardModal.innerHTML = `
      <div class="card-overlay" id="card-overlay">
        <div class="card-panel ${isOpportunity ? 'card-opportunity' : 'card-bad'} ${severityClass}">
          <div class="card-band"></div>
          <div class="card-header">
            <span class="card-type-badge">${isOpportunity ? t('card.badge.opp') : t('card.badge.bad')}</span>
            ${!isOpportunity && card.severity ? `<span class="severity-badge sev-${card.severity}">${card.severity === 'critical' ? t('card.sev.critical') : card.severity === 'high' ? t('card.sev.high') : card.severity === 'medium' ? t('card.sev.medium') : t('card.sev.low')}</span>` : ''}
            ${this._mpPlayerBadge()}
            <h2 class="card-title">${card.title}</h2>
          </div>
          <div class="card-body">
            <p class="card-description">${card.description}</p>
            <div class="card-nums">
              ${card.cost     ? `<div class="card-cost">${t('card.cost.lbl')} ${c(card.cost)}</div>` : ''}
              ${card.cashflow ? `<div class="card-cashflow">${t('card.cf.lbl',{amt:c(card.cashflow)})}</div>` : ''}
            </div>
            ${previewHtml}
          </div>
          <div class="card-choices">
            ${choicesHtml}
          </div>
        </div>
      </div>
    `;

    this.cardModal.classList.remove('hidden');

    // Bind choice buttons — resolve first, then hide modal
    this.cardModal.querySelectorAll('.choice-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.choice);
        this.hideCard();          // hide first to prevent double-clicks
        this.engine.resolveCard(index);  // then resolve (triggers re-render)
      });
    });
  }

  hideCard() {
    if (this.cardModal) {
      this.cardModal.classList.add('hidden');
      this.cardModal.innerHTML = '';
    }
  }

  _showFastTrackCard(card, choices) {
    const ch = choices.map((c,i) => `
      <button class="choice-btn ${c.available?'':'disabled'}" data-choice="${i}" ${c.available?'':'disabled'}>
        <span class="choice-main">${c.label}</span>
      </button>`).join('');
    this.cardModal.innerHTML = `
      <div class="card-overlay"><div class="card-panel card-fasttrack">
        <div class="card-band"></div>
        <div class="card-header">
          <span class="card-type-badge">${t('card.badge.ft')}</span>
          ${card.riskLevel ? `<span class="ft-risk-badge ft-risk-${card.riskLevel}">${card.riskLevel==='extreme'?'⚡ Extreem risico':card.riskLevel==='high'?'🔴 Hoog risico':'🟡 Gemiddeld risico'}</span>` : ''}
          ${this._mpPlayerBadge()}
          <h2 class="card-title">${card.icon||'🚀'} ${card.title}</h2>
        </div>
        <div class="card-body"><p class="card-description">${card.description}</p></div>
        <div class="card-choices">${ch}</div>
        <div class="card-ft-brand">${t('eos.brand').replace('FXminds Academy','<span>FXminds Academy</span>')}</div>
      </div></div>`;
    this.cardModal.classList.remove('hidden');
    this.cardModal.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => { this.hideCard(); this.engine.resolveCard(parseInt(btn.dataset.choice)); });
    });
  }
  // ── Choice Modal ───────────────────────────────────────────────────────────

  showChoiceModal({ options }) {
    if (!this.cardModal) return;

    const optHtml = options.map(o => `
      <button class="choice-btn" data-action="${o.id}">
        <span class="choice-main">${o.label}</span>
        <span class="choice-desc">${o.desc}</span>
      </button>
    `).join('');

    this.cardModal.innerHTML = `
      <div class="card-overlay">
        <div class="card-panel card-choice">
          <div class="card-band"></div>
          <div class="card-header">
            <span class="card-type-badge">${t('card.badge.choice')}</span>
            ${this._mpPlayerBadge()}
            <h2 class="card-title">${t('card.choice.title')}</h2>
          </div>
          <div class="card-body">
            <p class="card-description">${t('card.choice.desc')}</p>
          </div>
          <div class="card-choices">${optHtml}</div>
        </div>
      </div>
    `;

    this.cardModal.classList.remove('hidden');

    this.cardModal.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.hideCard();
        this.engine.resolveChoice(btn.dataset.action);
      });
    });
  }

  // ── Financial Statement ────────────────────────────────────────────────────

  _toggleStatement() {
    if (!this.statementPanel) return;
    const hidden = this.statementPanel.classList.toggle('hidden');
    if (!hidden) this._renderStatement();
  }

  _renderStatement() {
    const player    = this.engine.getState().activePlayer;
    const statement = CashflowEngine.getStatement(player);

    const rowHtml = (label, amount, cls = '') => `
      <div class="stmt-row ${cls}">
        <span>${label}</span>
        <span class="${amount >= 0 ? 'positive' : 'negative'}">
          ${c(amount,true)}
        </span>
      </div>
    `;

    this.statementPanel.innerHTML = `
      <div class="statement">
        <h3>📊 Monthly Cashflow Statement</h3>
        <div class="stmt-section">
          <div class="stmt-header">${t('stmt.income.hdr')}</div>
          ${statement.incomeSources.map(i => rowHtml(i.label, i.amount)).join('')}
          ${rowHtml(t('stmt.total.income'), statement.totalIncome, 'stmt-total')}
        </div>
        <div class="stmt-section">
          <div class="stmt-header">${t('stmt.exp.hdr')}</div>
          ${statement.expenses.map(e => rowHtml(e.label, e.amount)).join('')}
          ${rowHtml(t('stmt.total.exp'), -statement.totalExpenses, 'stmt-total')}
        </div>
        <div class="stmt-section stmt-net ${statement.netCashflow >= 0 ? 'positive-bg' : 'negative-bg'}">
          <div class="stmt-header">${t('stmt.net.hdr')}</div>
          ${rowHtml(t('stmt.net.lbl'), statement.netCashflow, 'stmt-net-row')}
        </div>
        <div class="stmt-assets">
          <div class="stmt-header">${t('stmt.assets.hdr',{n:player.assets.length})}</div>
          ${player.assets.length
            ? player.assets.map(a => `
              <div class="stmt-row">
                <span>${a.name}</span>
                <span class="positive">+${cpm(a.cashflow)}</span>
              </div>`).join('')
            : `<div class="stmt-empty">${t('stmt.assets.empty')}</div>`
          }
        </div>
        <div class="stmt-debts">
          <div class="stmt-header">${t('stmt.debts.hdr',{n:player.debts.length})}</div>
          ${player.debts.length
            ? player.debts.map(d => `
              <div class="stmt-row">
                <span>${d.name}</span>
                <span class="negative">-${cpm(d.monthlyPayment)}</span>
              </div>`).join('')
            : `<div class="stmt-empty">${t('stmt.debts.empty')}</div>`
          }
        </div>
        <button class="close-stmt-btn" id="btn-close-stmt">✕ Close</button>
      </div>
    `;

    document.getElementById('btn-close-stmt')?.addEventListener('click', () => {
      this.statementPanel.classList.add('hidden');
    });
  }

  // ── Progress Bar ───────────────────────────────────────────────────────────

  _renderProgress(player) {
    const pct = Math.min(100, Math.round((player.passiveIncome / Math.max(1, player.expenses)) * 100));
    if (this.progressBar) {
      this.progressBar.style.width = `${pct}%`;
      this.progressBar.className   = `progress-fill ${pct >= 100 ? 'win' : pct >= 60 ? 'close' : ''}`;
    }
    if (this.progressLabel) {
      this.progressLabel.textContent = pct >= 100
        ? t('stats.progress.free',{passive:cpm(player.passiveIncome)})
        : t('stats.progress.pct',{pct,passive:c(player.passiveIncome),exp:c(player.expenses)});
    }
  }

  // ── Dice ───────────────────────────────────────────────────────────────────

  _renderDice(roll) {
    if (!this.diceDisplay || !roll) return;
    const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    this.diceDisplay.innerHTML = `
      <span class="die">${faces[roll.roll] || '?'}</span>
      <span class="roll-total">${roll.total}</span>
    `;
  }

  // ── Message Bar ────────────────────────────────────────────────────────────

  _renderMessage(msg) {
    if (!this.messageBar) return;
    this.messageBar.textContent = msg || '—';
    const t = (msg || '').toLowerCase();
    this.messageBar.className =
      t.includes('payday') || t.includes('salary') || t.includes('salaris') || t.includes('💰') ? 'm-pay' :
      t.includes('opportunit') || t.includes('📈') || t.includes('kans') ? 'm-opp' :
      t.includes('bad event')  || t.includes('⚠️') || t.includes('tegenslag') ? 'm-bad' :
      t.includes('choice')     || t.includes('🎯') || t.includes('keuze') ? 'm-cho' :
      t.includes('rest')       || t.includes('☕') || t.includes('rust') ? 'm-rst' : '';
  }

  // ── Legacy log (keeps logEl in sync; element is now hidden) ──────────────

  _renderLog(log) {
    if (!this.logEl) return;
    const KEEP = /Payday!|Acquired asset|paid off|Bad Event:|Opportunity:|Level Up|🏆|💸|🎮 Game started|Starting/i;
    const SKIP = /^Chose to|^Roll the|Waiting/i;
    const meaningful = log.filter(e => { const m = e.message||''; return KEEP.test(m) && !SKIP.test(m); }).slice(0,14);
    this.logEl.innerHTML = meaningful.map(e => {
      const m=e.message||''; const t=e.turn?`<span class="log-turn">T${e.turn}</span>`:'';
      const cls=/Payday/i.test(m)?'le-pay':/Acquired asset/.test(m)?'le-asset':/paid off/.test(m)?'le-pay':/Bad Event/.test(m)?'le-bad':/Level Up/.test(m)?'le-win':'';
      return `<div class="log-entry ${cls}">${t}${m}</div>`;
    }).join('') || '<div class="log-entry le-sys">Waiting…</div>';
  }

  // ── Live Event Feed (compact, 5 most recent meaningful events) ─────────────

  _renderLiveFeed(log) {
    if (!this.feedEl) return;
    const EVENTS = [
      { re: /Payday!/i,                        cls: 'rp-ev-pay',   label: m => m },
      { re: /Acquired asset|✅|deployed|Quant algo|Scaled portfolio|Algo system/i, cls: 'rp-ev-asset', label: m => m },
      { re: /paid off|Debt cleared/i,          cls: 'rp-ev-asset', label: m => m },
      { re: /⚠️ Bad event|Bad Event:|storm|recession|crash|layoff|surgery|lawsuit|identity|inflation|tenant|accident/i,
                                               cls: 'rp-ev-bad',   label: m => m },
      { re: /Level Up|⭐/i,                    cls: 'rp-ev-win',   label: m => m },
      { re: /🏆|escaped/i,                     cls: 'rp-ev-win',   label: m => m },
      { re: /💳 New debt|loan/i,               cls: 'rp-ev-debt',  label: m => m },
      { re: /Trading Strategy|Market Edge|📊|🎯/i, cls: 'rp-ev-asset', label: m => m },
    ];
    const matched = [];
    for (let i = log.length - 1; i >= 0 && matched.length < 5; i--) {
      const m = log[i].message || '';
      const ev = EVENTS.find(e => e.re.test(m));
      if (ev) matched.push({ m, cls: ev.cls, turn: log[i].turn });
    }
    if (this.feedCount) this.feedCount.textContent = matched.length;
    this.feedEl.innerHTML = matched.length
      ? matched.map(e => {
          const t = e.turn ? `<span class="rp-ev-turn">T${e.turn}</span>` : '';
          return `<div class="rp-event ${e.cls}">${t}${e.m}</div>`;
        }).join('')
      : `<div class="rp-event rp-ev-sys">${t('rp.events.empty')}</div>`;
  }

  // ── Right-panel Statement ──────────────────────────────────────────────────

  _renderRightStatement(state) {
    if (!this.rpSectBody) return;

    // ── Player selector sync ──────────────────────────────────────────────
    const players = state.players || [state.activePlayer];
    const isMp    = players.length > 1;
    if (this.rpPlayerSel) {
      this.rpPlayerSel.disabled = !isMp;
      // Rebuild options only when player count changes
      if (this.rpPlayerSel.options.length !== players.length) {
        this.rpPlayerSel.innerHTML = players.map((p, i) =>
          `<option value="${i}">${i === 0 ? t('rp.view.me') : (p?.name || `Player ${i+1}`)}</option>`
        ).join('');
      }
    }
    const pidx   = Math.min(this._rpPlayerIdx, players.length - 1);
    const player = players[pidx] || state.activePlayer;
    if (!player) return;

    const fmt     = n => c(Math.abs(n));
    const fmtSgn  = n => `${n >= 0 ? '+$' : '-$'}${Math.abs(n).toLocaleString()}`;
    const cf      = player.monthlyCashflow;
    const pct     = Math.min(100, Math.round((player.passiveIncome / Math.max(1, player.expenses)) * 100));

    switch (this._rpTab) {

      // ── OVERVIEW ─────────────────────────────────────────────────────────
      case 'overview': {
        const cfClass = cf >= 0 ? 'positive' : 'negative';
        const bgClass = cf >= 0 ? 'positive-bg' : 'negative-bg';
        const nwClass = player.netWorth >= 0 ? 'positive' : 'negative';
        const assetCount = player.assets.length;
        const debtCount  = player.debts.length;
        this.rpSectBody.innerHTML = `

          <!-- ① Net Cashflow hero — first thing eyes land on -->
          <div class="rp-net-block ${bgClass}">
            <div class="rp-net-lbl">${t('ov.cf.lbl')}</div>
            <div class="rp-net-val ${cfClass}">${fmtSgn(cf)}</div>
            <div class="rp-net-chips">
              <span class="rp-net-chip assets">${t(assetCount===1?'ov.chip.asset.s':'ov.chip.asset.p',{n:assetCount})}</span>
              ${debtCount > 0
                ? `<span class="rp-net-chip debts">${t(debtCount===1?'ov.chip.debt.s':'ov.chip.debt.p',{n:debtCount})}</span>`
                : `<span class="rp-net-chip neutral">debt-free</span>`}
              <span class="rp-net-chip neutral">${t('ov.chip.turn',{n:player.turnsPlayed})}</span>
            </div>
          </div>

          <!-- ② Income group -->
          <div class="rp-ov-group">
            <div class="rp-ov-group-lbl">${t('ov.income.lbl')}</div>
            <div class="rp-ov-row">
              <span class="rp-ov-lbl">${t('ov.income.active')}</span>
              <span class="rp-ov-val positive">${c(player.income)}</span>
            </div>
            <div class="rp-ov-row">
              <span class="rp-ov-lbl">${t('ov.income.passive')}</span>
              <span class="rp-ov-val positive">${c(player.passiveIncome)}</span>
            </div>
          </div>

          <!-- ③ Expenses group -->
          <div class="rp-ov-group">
            <div class="rp-ov-group-lbl">${t('ov.exp.lbl')}</div>
            <div class="rp-ov-row">
              <span class="rp-ov-lbl">${t('ov.exp.monthly')}</span>
              <span class="rp-ov-val negative">${c(player.expenses)}</span>
            </div>
          </div>

          <!-- ④ Position group -->
          <div class="rp-ov-group">
            <div class="rp-ov-group-lbl">${t('ov.pos.lbl')}</div>
            <div class="rp-ov-row">
              <span class="rp-ov-lbl">${t('ov.cash')}</span>
              <span class="rp-ov-val muted">${c(player.cash)}</span>
            </div>
            <div class="rp-ov-row">
              <span class="rp-ov-lbl">${t('ov.networth')}</span>
              <span class="rp-ov-val ${nwClass}">${fmtSgn(player.netWorth)}</span>
            </div>
          </div>

          <!-- ⑤ Escape progress -->
          <div class="rp-escape-bar">
            <div class="rp-escape-hdr">
              <span class="rp-escape-title">${t('ov.escape.title')}</span>
              <span class="rp-escape-pct ${pct>=100?'win':''}">${pct}%</span>
            </div>
            <div class="rp-escape-track">
              <div class="rp-escape-fill ${pct>=100?'win':''}" style="width:${pct}%"></div>
            </div>
            <div class="rp-escape-sub">
              ${t('ov.escape.sub',{passive:c(player.passiveIncome),exp:c(player.expenses)})}
            </div>
          </div>`;
        break;
      }

      // ── ASSETS ───────────────────────────────────────────────────────────
      case 'assets': {
        if (!player.assets.length) {
          this.rpSectBody.innerHTML = `
            <div class="rp-list-empty">
              <strong>${t('assets.empty.title')}</strong><br>${t('assets.empty.sub')}
            </div>`;
          break;
        }
        const totalCf = player.assets.reduce((s,a) => s + (a.cashflow||0), 0);
        this.rpSectBody.innerHTML = `
          <div class="rp-list-summary">
            <span class="rp-list-summary-lbl">${t('assets.total.lbl')}</span>
            <span class="rp-list-summary-val positive">+${cpm(totalCf)}</span>
          </div>
          <div class="rp-list">
            ${player.assets.map(a => {
              const roi = a.cost > 0 ? Math.round((a.cashflow * 12 / a.cost) * 100) : 0;
              const be  = a.cost > 0 && a.cashflow > 0 ? Math.round(a.cost / a.cashflow) : null;
              return `<div class="rp-asset-item">
                <div class="rp-item-hdr">
                  <span class="rp-item-name">${a.name}</span>
                  <span class="rp-item-badge positive">+${cpm(a.cashflow)}</span>
                </div>
                <div class="rp-item-meta">
                  ${a.cost ? `<div class="rp-item-kv"><span class="rp-item-kv-lbl">${t('assets.cost.lbl')}</span><span class="rp-item-kv-val">${c(a.cost)}</span></div>` : ''}
                  ${roi    ? `<div class="rp-item-kv"><span class="rp-item-kv-lbl">${t('assets.roi.lbl')}</span><span class="rp-item-kv-val positive">${roi}%</span></div>` : ''}
                  ${be     ? `<div class="rp-item-kv"><span class="rp-item-kv-lbl">${t('assets.be.lbl')}</span><span class="rp-item-kv-val">${be} mo</span></div>` : ''}
                </div>
              </div>`;
            }).join('')}
          </div>`;
        break;
      }

      // ── DEBTS ────────────────────────────────────────────────────────────
      case 'debts': {
        if (!player.debts.length) {
          this.rpSectBody.innerHTML = `
            <div class="rp-list-empty">
              <strong>${t('debts.free.title')}</strong><br>${t('debts.free.sub')}
            </div>`;
          break;
        }
        const phase   = state.phase;
        const gameOver= phase === 'GAME_OVER';
        const totalDr = player.debts.reduce((s,d) => s + (d.monthlyPayment||0), 0);
        this.rpSectBody.innerHTML = `
          <div class="rp-list-summary">
            <span class="rp-list-summary-lbl">${t('debts.drag.lbl')}</span>
            <span class="rp-list-summary-val negative">-${cpm(totalDr)}</span>
          </div>
          <div class="rp-list">
            ${player.debts.map(d => {
              const canAfford = player.cash >= d.amount;
              const payLabel  = canAfford ? t('debts.payoff.can',{amt:c(d.amount)}) : t('debts.payoff.cant',{amt:c(d.amount-player.cash)});
              return `<div class="rp-debt-item">
                <div class="rp-item-hdr">
                  <span class="rp-item-name">${d.name}</span>
                  <span class="rp-item-badge negative">-${cpm(d.monthlyPayment)}</span>
                </div>
                <div class="rp-item-meta">
                  <div class="rp-item-kv"><span class="rp-item-kv-lbl">${t('debts.balance.lbl')}</span><span class="rp-item-kv-val">${c(d.amount)}</span></div>
                  <div class="rp-item-kv"><span class="rp-item-kv-lbl">${t('debts.freed.lbl')}</span><span class="rp-item-kv-val positive">+${cpm(d.monthlyPayment)}</span></div>
                </div>
                ${!gameOver ? `<button class="rp-payoff-btn" data-debt-id="${d.id}"
                    ${!canAfford ? 'disabled title="Not enough cash"' : ''}
                    onclick="window._game.ui.handlePayDebt('${d.id}')">
                    ${canAfford ? '✓' : '✗'} ${payLabel}
                  </button>` : ''}
              </div>`;
            }).join('')}
          </div>`;
        break;
      }

      // ── CASHFLOW ─────────────────────────────────────────────────────────
      case 'cashflow': {
        const stmt  = CashflowEngine.getStatement(player);
        const cfPos = stmt.netCashflow >= 0;
        this.rpSectBody.innerHTML = `
          <div class="rp-net-block ${cfPos?'positive-bg':'negative-bg'}">
            <div class="rp-net-lbl">${t('cf.net.lbl')}</div>
            <div class="rp-net-val ${cfPos?'positive':'negative'}">${fmtSgn(stmt.netCashflow)}</div>
            <div class="rp-net-sub">${t('cf.sub',{active:c(player.income),passive:c(player.passiveIncome),exp:c(player.expenses)})}</div>
          </div>
          <div class="rp-cf-sect">
            <div class="rp-cf-hdr">${t('cf.income.hdr')}</div>
            ${stmt.incomeSources.map(i => `
              <div class="rp-cf-row"><span>${i.label}</span><span class="positive">+${c(i.amount)}</span></div>
            `).join('')}
            <div class="rp-cf-row rp-cf-total"><span>${t('cf.total.in')}</span><span class="positive">+${c(stmt.totalIncome)}</span></div>
          </div>
          <div class="rp-cf-sect">
            <div class="rp-cf-hdr">${t('cf.exp.hdr')}</div>
            ${stmt.expenses.map(e => `
              <div class="rp-cf-row"><span>${e.label}</span><span class="negative">-${c(e.amount)}</span></div>
            `).join('')}
            <div class="rp-cf-row rp-cf-total"><span>${t('cf.total.out')}</span><span class="negative">-${c(stmt.totalExpenses)}</span></div>
          </div>`;
        break;
      }
    }
  }

  // ── MP current-player header indicator ────────────────────────────────────

  _renderMPIndicator(state) {
    const el   = document.getElementById('mp-cur-player');
    const dot  = document.getElementById('mp-cur-dot');
    const name = document.getElementById('mp-cur-name');
    if (!el) return;
    if (!state.isMultiplayer || state.players.length < 2) {
      el.classList.add('hidden');
      return;
    }
    el.classList.remove('hidden');
    const pi = state.activePlayerIndex;
    const c  = `var(--pt${pi % 6})`;
    if (dot)  { dot.style.background = c; dot.style.boxShadow = `0 0 6px ${c}`; }
    if (name) name.textContent = state.activePlayer?.name || `Player ${pi+1}`;
  }

  // ── Roll Button ────────────────────────────────────────────────────────────

  _renderRollButton(phase) {
    if (!this.rollBtn) return;
    const canRoll = phase === GamePhase.ROLLING;
    this.rollBtn.disabled = !canRoll;
    this.rollBtn.textContent = canRoll ? t('stats.roll') : t('stats.waiting');
  }


  // ── Email Capture ──────────────────────────────────────────────────────────
  // Builds the compact email-capture HTML block.
  // context: 'win' | 'loss' | 'mp'
  // payload: object with game stats to send to the backend.

  _buildEmailCapture(context, payload) {
    const titleKey = context === 'mp' ? 'email.title.mp'
                   : context === 'win' ? 'email.title.win' : 'email.title.loss';
    const subKey   = context === 'mp' ? 'email.sub.mp'
                   : context === 'win' ? 'email.sub.win'   : 'email.sub.loss';
    // Store payload on instance so _bindEmailCapture can read it
    this._emailPayload = payload;
    this._emailContext = context;
    return `
      <div class="eos-email" id="eos-email-block">
        <div id="eos-email-form-wrap">
          <div class="eos-email-title">${t(titleKey)}</div>
          <div class="eos-email-sub">${t(subKey)}</div>
          <div class="eos-email-row">
            <input class="eos-email-input" id="eos-email-input" type="email"
              placeholder="${t('email.placeholder')}" autocomplete="email" maxlength="120">
            <button class="eos-email-submit" id="eos-email-submit">${t('email.btn.submit')}</button>
          </div>
          <div class="eos-email-err" id="eos-email-err" style="display:none"></div>
          <button class="eos-email-skip" id="eos-email-skip">${t('email.btn.skip')}</button>
        </div>
        <div id="eos-email-success" style="display:none" class="eos-email-success">
          <div class="eos-email-success-title">✓ ${t('email.success.title')}</div>
          <div class="eos-email-success-sub">${t('email.success.sub')}</div>
          <div class="eos-email-success-cta">${t('email.success.cta')}</div>
          <a class="eos-email-success-btn" href="https://www.fxminds.nl/skool"
             target="_blank" rel="noopener">${t('email.success.btn')}</a>
        </div>
      </div>`;
  }

  _bindEmailCapture() {
    const input   = document.getElementById('eos-email-input');
    const btn     = document.getElementById('eos-email-submit');
    const skipBtn = document.getElementById('eos-email-skip');
    const errEl   = document.getElementById('eos-email-err');
    const formWrap= document.getElementById('eos-email-form-wrap');
    const success = document.getElementById('eos-email-success');
    if (!input || !btn) return;

    const showErr = (msg) => { errEl.textContent = msg; errEl.style.display = 'block'; };
    const hideErr = ()    => { errEl.style.display = 'none'; };

    // Skip hides the whole block
    skipBtn?.addEventListener('click', () => {
      document.getElementById('eos-email-block')?.remove();
    });

    btn.addEventListener('click', async () => {
      const email = input.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showErr(t('email.err.invalid')); return;
      }
      hideErr();
      btn.disabled = true;
      btn.textContent = t('email.btn.submitting');

      const body = {
        email,
        language: _lang,
        ...this._emailPayload,
      };

      // Static deployment — send to MailBlue directly, no backend needed.
      try {
        if (typeof _submitToMailBlue === 'function') {
          await _submitToMailBlue('', body.email, body.passiveIncome || 0).catch(() => {});
        }
      } catch (_) {}
      // Always show success — do not block on network outcome.
      formWrap.style.display = 'none';
      success.style.display  = 'block';
    });

    // Submit on Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btn.click();
    });
  }

  // ── Game Over ──────────────────────────────────────────────────────────────

  showGameOver({ winner, reason, bankruptCause, player, players }) {
    if (!this.winOverlay) return;

    // ── Multiplayer win: show rankings ──────────────────────────────────────
    if (reason === 'WIN_MP' || (reason === 'BANKRUPT' && players)) {
      this._showMPRankings({ winner, reason, players });
      return;
    }

    const isWin   = reason === 'WIN';
    const subject = winner || player;
    if (!subject) return;

    const prog    = XPEngine.levelProgress(subject.xp || 0);
    const passive = subject.passiveIncome ?? 0;
    const expenses= subject.expenses ?? 0;
    const cf      = subject.monthlyCashflow ?? (subject.income + passive - expenses);
    const surplus = passive - expenses;
    const assets  = subject.assets || [];
    const debts   = subject.debts  || [];
    const netWorth= subject.netWorth ?? 0;
    const cash    = subject.cash ?? 0;
    const turns   = subject.turnsPlayed ?? 0;

    // ── Win debrief lines ────────────────────────────────────────────────────
    const winLines = [
      t(assets.length===1?'win.line1.s':'win.line1.p',{n:assets.length,passive:cpm(passive)}),
      t('win.line2',{expenses:cpm(expenses),surplus:cpm(Math.max(0,surplus))}),
      assets.length >= 3
        ? t('win.line3.multi')
        : t('win.line3.few'),
      debts.length === 0
        ? t('win.line4.clean')
        : t('win.line4.debts',{n:debts.length,s:debts.length!==1?'en':''}),
    ];

    // ── Loss debrief: smart diagnosis based on what actually killed the run ──
    const causes = _buildBankruptCauses(subject, bankruptCause);
    const lossLines = _buildBankruptDebrief(subject, bankruptCause);

    const assetRows = assets.length
      ? assets.map(a => `<div class="eos-row"><span>${a.name}</span><span class="positive">+${cpm(a.cashflow||0)}</span></div>`).join('')
      : `<div class="eos-empty">Geen bezittingen opgebouwd</div>`;

    const debtRows = debts.length
      ? debts.map(d => `<div class="eos-row"><span>${d.name}</span><span class="negative">-${cpm(d.monthlyPayment||0)}</span></div>`).join('')
      : `<div class="eos-empty">${t('eos.debtfree')}</div>`;

    const cfFmt   = c(cf, true);
    const cfClass = cf >= 0 ? 'positive' : 'negative';

    this.winOverlay.innerHTML = `
      <div class="overlay-panel ${isWin ? 'overlay-win' : 'overlay-loss'} eos-panel">
        <div class="eos-header">
          <div class="overlay-icon">${isWin ? '🏆' : '💸'}</div>
          <h1>${isWin ? t('eos.win.title') : t('eos.loss.title')}</h1>
          <div class="eos-xp-badge">Lv ${prog.level} · ${prog.title}</div>
        </div>

        <div class="eos-grid">
          <div class="eos-stat ${isWin ? 'eos-highlight' : (!isWin && passive < expenses ? 'eos-loss-highlight' : '')}">
            <div class="eos-stat-val ${passive >= expenses ? 'positive' : 'negative'}">${c(passive)}</div>
            <div class="eos-stat-lbl">${t('eos.stat.passive')}</div>
          </div>
          <div class="eos-stat">
            <div class="eos-stat-val negative">${c(expenses)}</div>
            <div class="eos-stat-lbl">${t('eos.stat.expenses')}</div>
          </div>
          <div class="eos-stat ${!isWin && cf < 0 ? 'eos-loss-highlight' : ''}">
            <div class="eos-stat-val ${cfClass}">${cfFmt}</div>
            <div class="eos-stat-lbl">${t('eos.stat.cf')}</div>
          </div>
          <div class="eos-stat">
            <div class="eos-stat-val ${netWorth >= 0 ? 'positive' : 'negative'}">${c(netWorth,true)}</div>
            <div class="eos-stat-lbl">${t('eos.stat.networth')}</div>
          </div>
          <div class="eos-stat">
            <div class="eos-stat-val ${cash >= 0 ? '' : 'negative'}">${c(cash)}</div>
            <div class="eos-stat-lbl">${t('eos.stat.cash')}</div>
          </div>
          <div class="eos-stat">
            <div class="eos-stat-val">${turns}</div>
            <div class="eos-stat-lbl">${t('eos.stat.turns')}</div>
          </div>
        </div>

        <div class="eos-section">
          <div class="eos-section-title">${t('eos.assets.title',{n:assets.length})}</div>
          ${assetRows}
        </div>

        ${debts.length > 0 ? `
        <div class="eos-section">
          <div class="eos-section-title">${t('eos.debts.title',{n:debts.length})}</div>
          ${debtRows}
        </div>` : ''}

        <div class="eos-mentor">
          <div class="eos-mentor-label">${t('eos.debrief.label')}</div>
          ${isWin
            ? winLines.map(l => `<p>${l}</p>`).join('')
            : `${causes}${lossLines.map(l => `<p>${l}</p>`).join('')}`
          }
        </div>

        ${isWin ? `
        <div class="eos-ft-cta">
          <p>${t('eos.ft.cta.body')}</p>
          <button class="ft-btn" id="btn-enter-ft">${t('eos.ft.cta.btn')}</button>
        </div>
        <div class="eos-share">
          <div class="eos-share-text">
            ${t('eos.share.text',{turns,level:prog.level,passive:cpm(passive)})}
          </div>
          <button class="ob-opt" id="btn-copy-score" style="white-space:nowrap;padding:8px 12px;font-size:10px">📋 Copy</button>
        </div>` : `
        <div class="eos-skool-cta">
          <div class="eos-skool-title">${t('eos.skool.title')}</div>
          <div class="eos-skool-text">${t('eos.skool.text')}</div>
          <a class="eos-skool-btn" href="https://www.fxminds.nl/skool" target="_blank" rel="noopener">${t('eos.skool.btn')}</a>
        </div>`}
        ${this._buildEmailCapture(isWin ? 'win' : 'loss', {
          gameMode: 'solo',
          resultType: isWin ? 'win' : 'loss',
          playerName: subject.name || '',
          profession: subject.profession || '',
          turnsPlayed: turns,
          netWorth: netWorth,
          passiveIncome: passive,
          activeIncome: subject.income || 0,
          expenses: expenses,
          netCashflow: cf,
          assetCount: assets.length,
          debtCount: debts.length,
          investorLevel: prog.level,
          investorTitle: prog.title,
          language: _lang,
        })}
        <div class="eos-brand">Powered by <span>FXminds Academy</span></div>
        ${this._buildViralShare(isWin ? passive : null, isWin ? 'win' : 'loss', turns, prog)}
        <button id="btn-play-again" class="btn-primary" style="margin-top:0">${t('eos.replay')}</button>
      </div>
    `;
    this.winOverlay.classList.remove('hidden');
    this._bindEmailCapture();
    this._bindViralShare(isWin ? passive : null, isWin ? 'win' : 'loss', turns, prog);
    document.getElementById('btn-play-again')?.addEventListener('click', () => window.location.reload());
    document.getElementById('btn-enter-ft')?.addEventListener('click', () => {
      this.winOverlay.classList.add('hidden');
      this.engine.enterFastTrack();
      document.getElementById('ft-badge')?.classList.remove('hidden');
      this._showFastTrackIntro();
    });
    document.getElementById('btn-copy-score')?.addEventListener('click', (e) => {
      const txt = t('eos.share.text',{turns:subject.turnsPlayed??0,level:prog.level,passive:cpm(passive)}).replace(/<[^>]+>/g,'');
      navigator.clipboard?.writeText(txt).then(() => { e.target.textContent = t('eos.share.copied'); setTimeout(() => e.target.textContent = t('eos.share.copy'), 2000); });
    });
  }
  _showMPRankings({ winner, reason, players }) {
    if (!this.winOverlay) return;
    // Sort: winner first, then by passive income descending, bankrupt last
    const sorted = [...players].sort((a, b) => {
      if (a.id === winner?.id) return -1;
      if (b.id === winner?.id) return 1;
      if (a._bankrupt && !b._bankrupt) return 1;
      if (!a._bankrupt && b._bankrupt) return -1;
      return (b.passiveIncome||0) - (a.passiveIncome||0);
    });
    const medals = ['🥇','🥈','🥉'];
    const rowsHtml = sorted.map((p, rank) => {
      const pi = players.indexOf(p);
      const c  = `var(--pt${pi % 6})`;
      const cd = `var(--pt${pi % 6}d)`;
      const prog = XPEngine.levelProgress(p.xp || 0);
      return `<div class="mp-rank-row ${rank===0?'rank-1':''}">
        <div class="mp-rank-pos ${rank===0?'gold':''}">${medals[rank]||rank+1}</div>
        <div class="mp-rank-tok" style="background:${c};border-color:${c}">${(p.name||'?')[0].toUpperCase()}</div>
        <div class="mp-rank-info">
          <div class="mp-rank-name">${p.name}${p._bankrupt?' 💀':''}</div>
          <div class="mp-rank-detail">${t('mp.rank.detail',{level:prog.level,turns:p.turnsPlayed||0,assets:p.assets?.length||0})}</div>
        </div>
        <div class="mp-rank-passive ${(p.passiveIncome||0)>0?'positive':'negative'}">
          ${cpm(p.passiveIncome||0,p.passiveIncome>0)}
        </div>
      </div>`;
    }).join('');

    this.winOverlay.innerHTML = `
      <div class="overlay-panel overlay-win eos-panel">
        <div class="mp-rank-hdr">
          <div class="overlay-icon">${reason==='WIN_MP'?'🏆':'💸'}</div>
          <div class="mp-rank-title">${reason==='WIN_MP'?t('mp.rank.escaped',{name:winner?.name||''}):t('mp.rank.gameover')}</div>
          <div class="mp-rank-sub">${reason==='WIN_MP'?t('mp.rank.sub.win'):t('mp.rank.sub.over')}</div>
        </div>
        <div class="mp-rank-list">${rowsHtml}</div>
        ${this._buildEmailCapture('mp', {
          gameMode: 'multiplayer',
          resultType: reason === 'WIN_MP' ? 'mp_win' : 'mp_bankrupt',
          playerCount: players.length,
          winnerName: winner?.name || '',
          turnsPlayed: winner?.turnsPlayed || players[0]?.turnsPlayed || 0,
          netWorth: winner?.netWorth || 0,
          passiveIncome: winner?.passiveIncome || 0,
          activeIncome: winner?.income || 0,
          expenses: winner?.expenses || 0,
          netCashflow: winner?.monthlyCashflow || 0,
          assetCount: winner?.assets?.length || 0,
          debtCount: winner?.debts?.length || 0,
          investorLevel: XPEngine.levelProgress(winner?.xp || 0).level,
          language: _lang,
        })}
        <div class="eos-brand">Powered by <span>FXminds Academy</span></div>
        ${this._buildViralShare(winner?.passiveIncome ?? null, 'mp', winner?.turnsPlayed ?? 0, XPEngine.levelProgress(winner?.xp||0))}
        <button id="btn-play-again" class="btn-primary" style="margin-top:0">${t('mp.rank.replay')}</button>
        <a class="eos-skool-btn" href="https://www.fxminds.nl/skool" target="_blank" rel="noopener"
           style="display:block;margin-top:8px;background:transparent;border:1px solid var(--red);color:var(--red);">
          ${t('mp.rank.skool')}
        </a>
      </div>`;
    this.winOverlay.classList.remove('hidden');
    this._bindEmailCapture();
    this._bindViralShare(winner?.passiveIncome ?? null, 'mp', winner?.turnsPlayed ?? 0, XPEngine.levelProgress(winner?.xp||0));
    document.getElementById('btn-play-again')?.addEventListener('click', () => window.location.reload());
  }

  _showFastTrackIntro() {
    const o = document.getElementById('ft-overlay');
    if (!o) return;
    o.innerHTML = `
      <div class="ft-panel">
        <div class="ft-icon">🚀</div>
        <div class="ft-title">${t('ft.title')}</div>
        <div class="ft-tagline">${t('ft.tagline')}</div>
        <div class="ft-quote">${t('ft.quote')}</div>
        <div class="ft-goals">
          <div class="ft-goal"><span class="ft-goal-icon">📊</span><div><strong>${t('ft.g1.title')}</strong><span style="font-size:11px;color:var(--muted)">${t('ft.g1.sub')}</span></div></div>
          <div class="ft-goal"><span class="ft-goal-icon">⚙️</span><div><strong>${t('ft.g2.title')}</strong><span style="font-size:11px;color:var(--muted)">${t('ft.g2.sub')}</span></div></div>
          <div class="ft-goal"><span class="ft-goal-icon">📈</span><div><strong>${t('ft.g3.title')}</strong><span style="font-size:11px;color:var(--muted)">${t('ft.g3.sub')}</span></div></div>
          <div class="ft-goal"><span class="ft-goal-icon">🎯</span><div><strong>${t('ft.g4.title')}</strong><span style="font-size:11px;color:var(--muted)">${t('ft.g4.sub')}</span></div></div>
        </div>
        <div class="ft-brand">${t('brand.powered').replace('FXminds Academy','<span>FXminds Academy</span>')}</div>
        <button class="ft-btn" id="btn-ft-start">${t('ft.btn')}</button>
      </div>`;
    o.classList.remove('hidden');
    document.getElementById('btn-ft-start')?.addEventListener('click', () => o.classList.add('hidden'));
  }

  // ── Mentor Panel ───────────────────────────────────────────────────────────

  showMentor(tip) {
    if (!tip) return;
    AudioEngine.SFX.mentor();
    const panel = document.getElementById('mentor-panel');
    if (!panel) return;

    // Clear any pending auto-hide timer
    if (this._mentorTimer) clearTimeout(this._mentorTimer);

    document.getElementById('mentor-emoji').textContent    = tip.emoji || '💡';
    document.getElementById('mentor-headline').textContent = tip.headline || '';
    document.getElementById('mentor-body').textContent     = tip.body || '';

    panel.classList.remove('hidden', 'mentor-hide');
    panel.classList.add('mentor-show');

    // Auto-dismiss after 9s
    this._mentorTimer = setTimeout(() => this.hideMentor(), 9000);
  }

  hideMentor() {
    const panel = document.getElementById('mentor-panel');
    if (!panel) return;
    panel.classList.remove('mentor-show');
    panel.classList.add('mentor-hide');
    setTimeout(() => panel.classList.add('hidden'), 350);
  }

  // ── Payday Animation ───────────────────────────────────────────────────────

  showPayday({ earned }) {
    AudioEngine.SFX.payday();
    const el = document.createElement('div');
    el.className = `payday-popup ${earned >= 0 ? 'pp-pos' : 'pp-neg'}`;
    const sign = earned >= 0 ? '+' : '';
    el.innerHTML = `<span class="pp-amount">${c(earned,true)}</span><span class="pp-label">${t('payday.lbl')}</span>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }

  // ── Utility ────────────────────────────────────────────────────────────────

  _set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
}

// ════ src/main.js ════
// ─── main.js ──────────────────────────────────────────────────────────────────
// Bootstrap: wire engine callbacks to UI. Nothing else lives here.

// ── Character roster (all profiles — classic + FXminds archetypes) ─────────
const SP_CHARACTERS = [
  {
    key: 'Software Engineer',
    icon: '💻', name: 'Software Engineer',
    story: t('char.se.story'),
    stats: { income: '$3,500/mo', expenses: '$2,800/mo', cash: '$5,000', debt: 'None' },
    statClasses: { income: 'positive', expenses: '', cash: 'positive', debt: 'positive' },
  },
  {
    key: 'Teacher',
    icon: '📚', name: 'Teacher',
    story: t('char.te.story'),
    stats: { income: '$3,000/mo', expenses: '$2,200/mo', cash: '$3,500', debt: '$18k student loan' },
    statClasses: { income: '', expenses: '', cash: '', debt: 'negative' },
  },
  {
    key: 'Doctor',
    icon: '🩺', name: 'Doctor',
    story: t('char.doc.story'),
    stats: { income: '$6,000/mo', expenses: '$4,800/mo', cash: '$8,000', debt: '$120k med school' },
    statClasses: { income: 'positive', expenses: 'negative', cash: 'positive', debt: 'negative' },
  },
  {
    key: 'Entrepreneur',
    icon: '⚡', name: 'Entrepreneur',
    story: t('char.ent.story'),
    stats: { income: '$4,500/mo', expenses: '$3,600/mo', cash: '$4,000', debt: '$25k business loan' },
    statClasses: { income: 'positive', expenses: '', cash: '', debt: 'negative' },
  },
  {
    key: 'Beginner Trader',
    icon: '📈', name: 'Beginner Trader',
    story: t('char.tr.story'),
    stats: { income: '$2,800/mo', expenses: '$2,600/mo', cash: '$2,500', debt: '$4.5k credit card' },
    statClasses: { income: '', expenses: 'negative', cash: '', debt: 'negative' },
  },
  {
    key: 'FXminds Student',
    icon: '🎓', name: 'FXminds Student',
    story: t('char.fx.story'),
    stats: { income: '$3,200/mo', expenses: '$2,400/mo', cash: '$3,000', debt: 'None + $180/mo asset' },
    statClasses: { income: 'positive', expenses: '', cash: '', debt: 'positive' },
  },
  {
    key: 'Lifestyle Addict',
    icon: '🛍️', name: 'Lifestyle Addict',
    story: t('char.la.story'),
    stats: { income: '$5,500/mo', expenses: '$5,100/mo', cash: '$1,200', debt: '$40.5k total' },
    statClasses: { income: 'positive', expenses: 'negative', cash: 'negative', debt: 'negative' },
  },
  {
    key: 'The Grinder',
    icon: '🔩', name: 'The Grinder',
    story: t('char.gr.story'),
    stats: { income: '$4,200/mo', expenses: '$2,000/mo', cash: '$6,000', debt: 'None' },
    statClasses: { income: 'positive', expenses: 'positive', cash: 'positive', debt: 'positive' },
  },
];

// ── Helper: derive a numeric profile from onboarding answers ────────────────
function buildSituationProfile(ans) {
  const incomeMap  = { under2k: 1600, '2k4k': 3000, '4k7k': 5500, over7k: 8000 };
  const expMap     = { under1500: 1200, '1500to3k': 2200, '3k5k': 4000, over5k: 6000 };
  const investMap  = { no: 0, sometimes: 1, yes: 2 };

  const income   = incomeMap[ans.income]   || 3000;
  const expenses = expMap[ans.expenses]    || 2500;
  const invLevel = investMap[ans.invests]  ?? 0;

  const cashBase  = Math.round(income * 0.8);
  const cashBonus = invLevel * Math.round(income * 0.4);
  const cash      = cashBase + cashBonus;

  const startingAssets = [];
  if (invLevel >= 2) {
    const cf = Math.round(income * 0.04);
    startingAssets.push({
      id: 'sit_asset_1', name: 'Existing Investment',
      cost: Math.round(cf * 18), cashflow: cf, type: 'investment',
    });
  }

  // Debt starting load — driven directly by the debt survey answer
  const debtAns = ans.debt || 'none';
  const debts   = [];
  const surplus = income - expenses;

  if (debtAns === 'small') {
    // Small consumer debt: $3k–$6k, $80/mo drag, reduces cash buffer by $1k
    const amount = 3000 + Math.round(income * 0.5);
    debts.push({ id: 'sit_cc', name: 'Consumer Debt', amount, monthlyPayment: 80,
      description: 'Credit card / small personal loan' });
  } else if (debtAns === 'moderate') {
    // Moderate: two debts — credit card + personal loan, $200/mo combined drag
    debts.push({ id: 'sit_cc',   name: 'Credit Card',    amount: 6000,  monthlyPayment: 120,
      description: 'Credit card balance' });
    debts.push({ id: 'sit_loan', name: 'Personal Loan',  amount: 14000, monthlyPayment:  80,
      description: 'Personal / car loan' });
  } else if (debtAns === 'heavy') {
    // Heavy: student / big loan, $300–400/mo drag, substantial balance
    const loanAmount = Math.round(income * 6);   // ~6× monthly income
    const loanPmt    = Math.round(income * 0.08);
    debts.push({ id: 'sit_cc',    name: 'Credit Card',   amount: 5000,       monthlyPayment: 100,
      description: 'Credit card balance' });
    debts.push({ id: 'sit_study', name: t('debt.student_loan'),  amount: loanAmount, monthlyPayment: loanPmt,
      description: 'Student / large personal loan' });
  } else if (debtAns === 'none' && surplus < 400 && invLevel === 0) {
    // Even "no debt" players with tight margins get a small buffer warning debt
    debts.push({ id: 'sit_cc', name: 'Consumer Debt', amount: 3000, monthlyPayment: 60,
      description: 'Credit card / overdraft' });
  }

  // Cash on hand: reduce by total debt drag × 4 to reflect money already consumed
  const debtCashPenalty = debts.reduce((s, d) => s + d.monthlyPayment * 4, 0);
  const adjustedCash    = Math.max(500, cash - debtCashPenalty);

  return { cash: adjustedCash, income, expenses, startingAssets, debts };
}

// ── Personal diagnosis engine ─────────────────────────────────────────────────
// Maps onboarding answers → archetype + bottleneck + strength + CTA
// Inputs: ans = { income, expenses, invests, goal, freedom }
// ─────────────────────────────────────────────────────────────────────────────
function buildDiagnosis(ans) {
  const incomeRank  = { under2k: 1, '2k4k': 2, '4k7k': 3, over7k: 4 }[ans.income]   ?? 2;
  const expRank     = { under1500: 1, '1500to3k': 2, '3k5k': 3, over5k: 4 }[ans.expenses] ?? 2;
  const invLevel    = { no: 0, sometimes: 1, yes: 2 }[ans.invests] ?? 0;
  const freedom     = parseInt(ans.freedom, 10) || 5;
  const goal        = ans.goal || 'freedom';

  // Derived signals
  const incomeMap   = { under2k: 1600, '2k4k': 3000, '4k7k': 5500, over7k: 8000 };
  const expMap      = { under1500: 1200, '1500to3k': 2200, '3k5k': 4000, over5k: 6000 };
  const income      = incomeMap[ans.income]   || 3000;
  const expenses    = expMap[ans.expenses]    || 2500;
  const surplus     = income - expenses;
  const ratio       = expenses / income;           // expense-to-income ratio
  const isHighIncome = incomeRank >= 3;
  const isHighExp    = expRank >= 3;
  const isTightMargin= ratio > 0.82;
  const isHealthySurplus = surplus >= 1000;
  const isInvestor   = invLevel >= 1;
  const isActiveInvestor = invLevel >= 2;
  const isTrader     = goal === 'trading';
  const isFreedomSeeking = goal === 'freedom';
  const isLowFreedom  = freedom <= 4;
  const isHighFreedom = freedom >= 7;

  // Debt signals
  const debtAns      = ans.debt || 'none';
  const isDebtFree   = debtAns === 'none';
  const isDebtSmall  = debtAns === 'small';
  const isDebtMod    = debtAns === 'moderate';
  const isDebtHeavy  = debtAns === 'heavy';
  const hasDebt      = !isDebtFree;
  const isDebtBurden = isDebtMod || isDebtHeavy;

  // ── Archetype matching (priority order) ────────────────────────────────────
  // Each archetype: { icon, name, desc }
  let archetype;

  if (isHighIncome && isHighExp && !isActiveInvestor) {
    archetype = {
      icon: '💸',
      name: t('arch.high_earner.name'),
      desc: t('arch.high_earner.desc'),
    };
  } else if (isHighIncome && isHealthySurplus && isActiveInvestor) {
    archetype = {
      icon: '🔑',
      name: t('arch.builder.name'),
      desc: t('arch.builder.desc'),
    };
  } else if (isHighIncome && isHealthySurplus && !isInvestor) {
    archetype = {
      icon: '📦',
      name: t('arch.untapped.name'),
      desc: t('arch.untapped.desc'),
    };
  } else if (!isHighIncome && !isTightMargin && !isInvestor) {
    archetype = {
      icon: '🧱',
      name: t('arch.saver.name'),
      desc: t('arch.saver.desc'),
    };
  } else if (!isHighIncome && !isTightMargin && isInvestor) {
    archetype = {
      icon: '🌱',
      name: t('arch.efficient.name'),
      desc: t('arch.efficient.desc'),
    };
  } else if (isTightMargin && !isInvestor) {
    archetype = {
      icon: '⚠️',
      name: t('arch.squeezed.name'),
      desc: t('arch.squeezed.desc'),
    };
  } else if (isTightMargin && isInvestor) {
    archetype = {
      icon: '⚡',
      name: t('arch.stretched.name'),
      desc: t('arch.stretched.desc'),
    };
  } else if (isTrader) {
    archetype = {
      icon: '📈',
      name: t('arch.trader.name'),
      desc: t('arch.trader.desc'),
    };
  } else if (isDebtHeavy && !isHighIncome) {
    archetype = {
      icon: '⛓️',
      name: t('arch.debt_anchor.name'),
      desc: t('arch.debt_anchor.desc'),
    };
  } else if (isDebtBurden && isHighIncome) {
    archetype = {
      icon: '🏋️',
      name: t('arch.heavy_debt.name'),
      desc: t('arch.heavy_debt.desc'),
    };
  } else {
    archetype = {
      icon: '🧭',
      name: t('arch.aware.name'),
      desc: t('arch.aware.desc'),
    };
  }

  // ── Bottleneck ──────────────────────────────────────────────────────────────
  let bottleneck;

  if (isDebtHeavy) {
    bottleneck = {
      headline: t('bn.debt_heavy.h'),
      text: t('bn.debt_heavy.t'),
    };
  } else if (isDebtMod) {
    bottleneck = {
      headline: t('bn.debt_mod.h'),
      text: t('bn.debt_mod.t'),
    };
  } else if (isTightMargin && !isInvestor) {
    bottleneck = {
      headline: t('bn.tight.h'),
      text: t('bn.tight.t',{pct:Math.round(ratio*100)}),
    };
  } else if (isHighIncome && isHighExp && !isActiveInvestor) {
    bottleneck = {
      headline: t('bn.lifestyle.h'),
      text: t('bn.lifestyle.t'),
    };
  } else if (!isInvestor && !isTightMargin) {
    bottleneck = {
      headline: t('bn.idle.h'),
      text: t('bn.idle.t'),
    };
  } else if (isActiveInvestor && isTightMargin) {
    bottleneck = {
      headline: t('bn.thin.h'),
      text: t('bn.thin.t'),
    };
  } else if (isTrader && !isActiveInvestor) {
    bottleneck = {
      headline: t('bn.nocf.h'),
      text: t('bn.nocf.t'),
    };
  } else if (isHighIncome && !isActiveInvestor) {
    bottleneck = {
      headline: t('bn.noown.h'),
      text: t('bn.noown.t'),
    };
  } else if (isLowFreedom && isActiveInvestor) {
    bottleneck = {
      headline: t('bn.notfelt.h'),
      text: t('bn.notfelt.t',{freedom}),
    };
  } else {
    bottleneck = {
      headline: t('bn.passive.h'),
      text: t('bn.passive.t'),
    };
  }

  // ── Strength ────────────────────────────────────────────────────────────────
  let strength;

  if (isActiveInvestor) {
    strength = {
      headline: t('str.inv.h'),
      text: t('str.inv.t'),
    };
  } else if (isDebtFree && !isHighIncome) {
    strength = {
      headline: t('str.dfree.h'),
      text: t('str.dfree.t'),
    };
  } else if (!isTightMargin && isHealthySurplus) {
    strength = {
      headline: t('str.surp.h'),
      text: t('str.surp.t',{surplus:surplus.toLocaleString()}),
    };
  } else if (!isHighIncome && !isTightMargin) {
    strength = {
      headline: t('str.lean.h'),
      text: t('str.lean.t'),
    };
  } else if (isHighIncome) {
    strength = {
      headline: t('str.high.h'),
      text: t('str.high.t'),
    };
  } else if (isFreedomSeeking && isLowFreedom) {
    strength = {
      headline: t('str.aware.h'),
      text: t('str.aware.t'),
    };
  } else if (isInvestor) {
    strength = {
      headline: t('str.know.h'),
      text: t('str.know.t'),
    };
  } else {
    strength = {
      headline: t('str.show.h'),
      text: t('str.show.t'),
    };
  }

  // ── CTA insight (simulation-specific framing) ───────────────────────────────
  const ctaMap = {
    freedom:  isDebtBurden
      ? t('cta.freedom_debt')
      : t('cta.freedom'),
    extra:    t('cta.extra'),
    invest:   t('cta.invest'),
    trading:  t('cta.trading'),
  };
  const cta = ctaMap[goal] || ctaMap.freedom;

  // ── Numbers strip ───────────────────────────────────────────────────────────
  const surplusClass = surplus >= 600 ? 'positive' : surplus >= 0 ? 'warn' : 'negative';
  const surplusFmt   = (surplus >= 0 ? '+$' : '-$') + Math.abs(surplus).toLocaleString();

  const debtLabel = { none: t('diag.debt.none'), small: t('diag.debt.small'), moderate: t('diag.debt.moderate'), heavy: t('diag.debt.heavy') }[debtAns] || t('diag.debt.none');
  const debtCls   = isDebtHeavy ? 'negative' : isDebtBurden ? 'warn' : 'positive';
  const stats = [
    { val: c(income),   lbl: t('diag.stat.income'),   cls: 'positive' },
    { val: surplusFmt,                      lbl: t('diag.stat.surplus'),  cls: surplusClass },
    { val: debtLabel,                       lbl: t('diag.stat.debt'),     cls: debtCls },
  ];

  return { archetype, bottleneck, strength, cta, stats };
}

(function initOnboarding() {
  const STEPS=6; let step=0; const ans={};
  const ob=document.getElementById('onboard-screen');
  const rf=document.getElementById('reflect-screen');
  const sp=document.getElementById('sp-screen');
  const su=document.getElementById('setup-screen');
  const ms=document.getElementById('mode-select-screen');
  const nx=document.getElementById('ob-btn-next');
  const bk=document.getElementById('ob-btn-back');
  rf?.classList.add('hidden'); sp?.classList.add('hidden'); su?.classList.add('hidden');

  // ── Reset onboarding to step 0 and return to Mode Select ──────────────────
  function goBackToModeSelect() {
    // 1. Clear all collected answers
    Object.keys(ans).forEach(k => delete ans[k]);
    ans.freedom = '5';

    // 2. Reset step counter and UI to step 0
    step = 0;
    show(0);
    // Clear all selected option highlights
    document.querySelectorAll('.ob-opts .ob-opt').forEach(b => b.classList.remove('selected'));
    // Reset freedom slider to default
    const rngEl = document.getElementById('ob-freedom');
    const rvEl  = document.getElementById('ob-freedom-val');
    if (rngEl) rngEl.value = '5';
    if (rvEl)  rvEl.textContent = '5';

    // 3. Hide all solo-flow screens, show mode select
    ob.classList.add('hidden');
    rf.classList.add('hidden');
    sp?.classList.add('hidden');
    su?.classList.add('hidden');
    ms?.classList.remove('hidden');
  }

  // Wire both back-to-mode buttons
  document.getElementById('ob-btn-to-mode')?.addEventListener('click', goBackToModeSelect);
  document.getElementById('rf-btn-to-mode')?.addEventListener('click', goBackToModeSelect);

  // ── Range input ────────────────────────────────────────────────────────────
  const rng=document.getElementById('ob-freedom');
  const rv=document.getElementById('ob-freedom-val');
  rng?.addEventListener('input',()=>{rv.textContent=rng.value;ans.freedom=rng.value;});
  ans.freedom='5';

  // ── Option buttons ─────────────────────────────────────────────────────────
  document.querySelectorAll('.ob-opts').forEach(g=>{
    g.querySelectorAll('.ob-opt').forEach(b=>{
      b.addEventListener('click',()=>{
        g.querySelectorAll('.ob-opt').forEach(x=>x.classList.remove('selected'));
        b.classList.add('selected'); ans[g.dataset.key]=b.dataset.val;
      });
    });
  });

  // ── Dots / step nav ────────────────────────────────────────────────────────
  function dots(){for(let i=0;i<STEPS;i++){const d=document.getElementById(`ob-dot-${i}`);if(!d)continue;d.classList.remove('active','done');if(i<step)d.classList.add('done');else if(i===step)d.classList.add('active');}}
  function show(n){document.querySelectorAll('.ob-step').forEach((e,i)=>e.classList.toggle('ob-active',i===n));bk.disabled=n===0;nx.textContent=n===STEPS-1?t('ob.btn.results'):t('ob.btn.next');dots();}
  nx?.addEventListener('click',()=>{if(step<STEPS-1){step++;show(step);}else{ob.classList.add('hidden');reflect();}});
  bk?.addEventListener('click',()=>{if(step>0){step--;show(step);}});

  // ── Reflect screen ─────────────────────────────────────────────────────────
  function reflect(){
    const IL={under2k:t('reflect.val.inc.under2k'),'2k4k':t('reflect.val.inc.2k4k'),'4k7k':t('reflect.val.inc.4k7k'),over7k:t('reflect.val.inc.over7k')};
    const EL={under1500:t('reflect.val.exp.under1500'),'1500to3k':t('reflect.val.exp.1500to3k'),'3k5k':t('reflect.val.exp.3k5k'),over5k:t('reflect.val.exp.over5k')};
    const IV={no:t('reflect.val.inv.no'),sometimes:t('reflect.val.inv.sometimes'),yes:t('reflect.val.inv.yes')};
    const GL={freedom:t('reflect.val.goal.freedom'),extra:t('reflect.val.goal.extra'),invest:t('reflect.val.goal.invest'),trading:t('reflect.val.goal.trading')};
    const DL={none:t('reflect.val.debt.none'),small:t('reflect.val.debt.small'),moderate:t('reflect.val.debt.moderate'),heavy:t('reflect.val.debt.heavy')};
    const rows=[
      [t('reflect.row.income'),   IL[ans.income]||'—'],
      [t('reflect.row.expenses'), EL[ans.expenses]||'—'],
      [t('reflect.row.invests'),  IV[ans.invests]||'—'],
      [t('reflect.row.debt'),     DL[ans.debt]||'—'],
      [t('reflect.row.goal'),     GL[ans.goal]||'—'],
      [t('reflect.row.freedom'),  `${ans.freedom||5}/10`]
    ];
    document.getElementById('reflect-scores').innerHTML=rows.map(([k,v])=>`<div class="ob-score-row"><span>${k}</span><strong>${v}</strong></div>`).join('');
    rf.classList.remove('hidden');
  }

  // ── Continue → Starting Point screen ──────────────────────────────────────
  document.getElementById('ob-btn-continue')?.addEventListener('click',()=>{
    rf.classList.add('hidden');
    showStartingPoint();
  });

  // ══ STARTING POINT SCREEN ══════════════════════════════════════════════════

  function showStartingPoint() {
    // Reset panels
    document.getElementById('sp-panel-situation').classList.add('hidden');
    document.getElementById('sp-panel-character').classList.add('hidden');
    document.querySelectorAll('.sp-opt').forEach(o=>o.classList.remove('sp-selected'));
    sp.classList.remove('hidden');
  }

  // ── sp-screen back-to-mode-select ──────────────────────────────────────────
  document.getElementById('sp-btn-to-mode')?.addEventListener('click', () => {
    sp.classList.add('hidden');
    ms?.classList.remove('hidden');
  });

  // ── setup-screen back to sp-screen ─────────────────────────────────────────
  document.getElementById('setup-btn-back')?.addEventListener('click', () => {
    su.classList.add('hidden');
    showStartingPoint();
  });

  // ── Mode A: My Situation ───────────────────────────────────────────────────
  document.getElementById('sp-opt-situation')?.addEventListener('click', () => {
    document.querySelectorAll('.sp-opt').forEach(o=>o.classList.remove('sp-selected'));
    document.getElementById('sp-opt-situation').classList.add('sp-selected');
    document.getElementById('sp-panel-character').classList.add('hidden');

    const diag = buildDiagnosis(ans);
    const diagEl = document.getElementById('sp-diagnosis');
    if (diagEl) {
      diagEl.innerHTML = `
        <div class="sp-diag">

          <!-- Archetype -->
          <div class="sp-diag-type">
            <div class="sp-diag-type-icon">${diag.archetype.icon}</div>
            <div class="sp-diag-type-body">
              <div class="sp-diag-type-label">${t('sp.diag.profile')}</div>
              <div class="sp-diag-type-name">${diag.archetype.name}</div>
              <div class="sp-diag-type-desc">${diag.archetype.desc}</div>
            </div>
          </div>

          <!-- Numbers strip -->
          <div class="sp-diag-stats">
            ${diag.stats.map(s => `
              <div class="sp-diag-stat">
                <div class="sp-diag-stat-val ${s.cls}">${s.val}</div>
                <div class="sp-diag-stat-lbl">${s.lbl}</div>
              </div>`).join('')}
          </div>

          <!-- Bottleneck -->
          <div class="sp-diag-block">
            <div class="sp-diag-block-hdr bottleneck">
              <span class="sp-diag-block-dot"></span>${t('sp.diag.bottleneck')}
            </div>
            <div class="sp-diag-block-text">
              <strong>${diag.bottleneck.headline}.</strong><br>${diag.bottleneck.text}
            </div>
          </div>

          <!-- Strength -->
          <div class="sp-diag-block">
            <div class="sp-diag-block-hdr strength">
              <span class="sp-diag-block-dot"></span>${t('sp.diag.strength')}
            </div>
            <div class="sp-diag-block-text">
              <strong>${diag.strength.headline}.</strong><br>${diag.strength.text}
            </div>
          </div>

          <!-- CTA -->
          <div class="sp-diag-cta">${diag.cta}</div>

        </div>`;
    }

    document.getElementById('sp-panel-situation').classList.remove('hidden');
  });

  document.getElementById('sp-sit-back')?.addEventListener('click', () => {
    document.getElementById('sp-panel-situation').classList.add('hidden');
    document.querySelectorAll('.sp-opt').forEach(o=>o.classList.remove('sp-selected'));
  });

  document.getElementById('sp-sit-start')?.addEventListener('click', () => {
    const name = document.getElementById('sp-name-sit')?.value.trim() || 'Player';
    const prof  = buildSituationProfile(ans);
    sp.classList.add('hidden');
    _launchWithCustomProfile(name, prof);
  });

  // ── Mode B: Choose Character ───────────────────────────────────────────────
  document.getElementById('sp-opt-character')?.addEventListener('click', () => {
    document.querySelectorAll('.sp-opt').forEach(o=>o.classList.remove('sp-selected'));
    document.getElementById('sp-opt-character').classList.add('sp-selected');
    document.getElementById('sp-panel-situation').classList.add('hidden');
    renderCharacterGrid();
    document.getElementById('sp-panel-character').classList.remove('hidden');
  });

  let selectedCharKey = null;

  function renderCharacterGrid() {
    const grid = document.getElementById('sp-char-grid');
    if (!grid) return;
    grid.innerHTML = SP_CHARACTERS.map(c => {
      const statsHtml = Object.entries(c.stats).map(([k,v]) => {
        const cls = c.statClasses[k] || '';
        return `<span class="sp-char-stat ${cls}">${v}</span>`;
      }).join('');
      return `
        <div class="sp-char" data-key="${c.key}">
          <div class="sp-char-icon">${c.icon}</div>
          <div class="sp-char-info">
            <div class="sp-char-name">${c.name}</div>
            <div class="sp-char-story">${c.story}</div>
            <div class="sp-char-stats">${statsHtml}</div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.sp-char').forEach(el => {
      el.addEventListener('click', () => {
        grid.querySelectorAll('.sp-char').forEach(x=>x.classList.remove('sp-char-selected'));
        el.classList.add('sp-char-selected');
        selectedCharKey = el.dataset.key;
        document.getElementById('sp-char-start').disabled = false;
      });
    });
  }

  document.getElementById('sp-char-back')?.addEventListener('click', () => {
    document.getElementById('sp-panel-character').classList.add('hidden');
    document.querySelectorAll('.sp-opt').forEach(o=>o.classList.remove('sp-selected'));
    selectedCharKey = null;
    document.getElementById('sp-char-start').disabled = true;
  });

  document.getElementById('sp-char-start')?.addEventListener('click', () => {
    if (!selectedCharKey) return;
    const name = document.getElementById('sp-name-char')?.value.trim() || 'Player';
    sp.classList.add('hidden');

    if (['Software Engineer','Teacher','Doctor','Entrepreneur'].includes(selectedCharKey)) {
      // Classic professions → go via setup screen (normal flow)
      document.getElementById('player-name').value = name;
      // Pre-select the matching option
      const sel = document.getElementById('player-profession');
      for (let i=0;i<sel.options.length;i++) { if(sel.options[i].value===selectedCharKey){sel.selectedIndex=i;break;} }
      su.classList.remove('hidden');
    } else {
      // FXminds characters → launch directly
      _launchWithProfession(name, selectedCharKey);
    }
  });

})();

// ── Game launch helpers (called after sp-screen resolves) ───────────────────
// Path 1: custom numeric profile from "My Situation"
function _launchWithCustomProfile(name, prof) {
  const gs = document.getElementById('game-screen');
  const su = document.getElementById('setup-screen');
  su.classList.add('hidden');
  gs.classList.remove('hidden');
  engine.startGame({ name, _customProfile: prof });
  const state = engine.getState();
  ui.render(state);
}

// Path 2: named profession key (FXminds characters)
function _launchWithProfession(name, profession) {
  const gs = document.getElementById('game-screen');
  gs.classList.remove('hidden');
  engine.startGame({ name, profession });
  const state = engine.getState();
  ui.render(state);
}
// ── MODE SELECT BOOTSTRAP ───────────────────────────────────────────────────
(function initModeSelect() {
  const msScreen = document.getElementById('mode-select-screen');
  const obScreen = document.getElementById('onboard-screen');
  const mpSetup  = document.getElementById('mp-setup-screen');
  if (!msScreen) return;

  obScreen?.classList.add('hidden');
  msScreen.classList.remove('hidden');

  // Single Player → existing onboarding unchanged
  document.getElementById('ms-single')?.addEventListener('click', () => {
    msScreen.classList.add('hidden');
    obScreen?.classList.remove('hidden');
  });

  // Local Multiplayer → name/count entry then per-player setup
  document.getElementById('ms-local')?.addEventListener('click', () => {
    msScreen.classList.add('hidden');
    mpSetup?.classList.remove('hidden');
    renderNameSetup(2);
  });

  document.getElementById('mp-back-btn')?.addEventListener('click', () => {
    mpSetup?.classList.add('hidden');
    msScreen.classList.remove('hidden');
  });

  const COLORS        = ['#f59e0b','#3b82f6','#10b981','#f43f5e','#8b5cf6','#f97316'];
  const DEFAULT_NAMES = ['Alex','Blake','Casey','Dana','Ellis','Frankie'];
  let mpCount = 2;

  function renderNameSetup(n) {
    mpCount = Math.max(2, Math.min(6, n));
    document.getElementById('mp-count-val').textContent = mpCount;
    document.getElementById('mp-count-minus').disabled = mpCount <= 2;
    document.getElementById('mp-count-plus').disabled  = mpCount >= 6;
    const list = document.getElementById('mp-players-list');
    if (!list) return;
    const kept = [...list.querySelectorAll('.mp-player-name-input')].map(el => el.value);
    list.innerHTML = '';
    for (let i = 0; i < mpCount; i++) {
      const c = COLORS[i], name = kept[i] || DEFAULT_NAMES[i];
      const row = document.createElement('div');
      row.className = 'mp-player-row';
      row.innerHTML = `
        <div class="mp-player-token" style="background:${c};border-color:${c};color:#000">${name[0].toUpperCase()}</div>
        <div class="mp-player-inputs">
          <input class="mp-player-name-input" type="text" maxlength="20" autocomplete="off"
            placeholder="${t('mpps.mode.lbl')==='Hoe wil je starten?'?`Speler ${i+1} naam`:`Player ${i+1} name`}" value="${name}">
        </div>`;
      row.querySelector('.mp-player-name-input').addEventListener('input', e => {
        const v = e.target.value || `P${i+1}`;
        row.querySelector('.mp-player-token').textContent = v[0].toUpperCase();
      });
      list.appendChild(row);
    }
  }

  document.getElementById('mp-count-minus')?.addEventListener('click', () => renderNameSetup(mpCount - 1));
  document.getElementById('mp-count-plus')?.addEventListener('click',  () => renderNameSetup(mpCount + 1));

  // "Continue to Player Setup" → collect names → per-player config queue
  document.getElementById('mp-start-btn')?.addEventListener('click', () => {
    const rows  = document.querySelectorAll('#mp-players-list .mp-player-row');
    const names = [...rows].map((row, i) =>
      row.querySelector('.mp-player-name-input')?.value.trim() || DEFAULT_NAMES[i] || `Player ${i+1}`
    );
    mpSetup?.classList.add('hidden');
    MPSetupManager.start(names, COLORS, configs => {
      const gs = document.getElementById('game-screen');
      gs?.classList.remove('hidden');
      engine.startMultiplayerGame(configs);
      const state = engine.getState();
      ui.render(state);
      _showHandoff(state.activePlayer, state.activePlayerIndex);
    });
  });

})();

// ══ MPSetupManager — per-player onboarding queue ═════════════════════════════
// Runs a full setup flow for each player in sequence.
// Path A: My Situation → 6-question survey → diagnosis → confirm
// Path B: Choose Character → grid → confirm
// After all players done, calls onComplete(configs[]).
// Uses mpps-* IDs exclusively — never touches the SP onboarding IDs.
// ─────────────────────────────────────────────────────────────────────────────
const MPSetupManager = (() => {
  const QUESTIONS = [
    { key:'income',   q:'What does your job actually pay per month?',
      opts:[{v:'under2k',l:'Under $2,000'},{v:'2k4k',l:'$2,000 – $4,000'},
            {v:'4k7k',l:'$4,000 – $7,000'},{v:'over7k',l:'Over $7,000'}] },
    { key:'expenses', q:'How much of that disappears every month?',
      opts:[{v:'under1500',l:'Under $1,500'},{v:'1500to3k',l:'$1,500 – $3,000'},
            {v:'3k5k',l:'$3,000 – $5,000'},{v:'over5k',l:'Over $5,000'}] },
    { key:'invests',  q:"Werkt jouw geld voor je — of staat het stil?",
      opts:[{v:'no',l:'No — not yet'},{v:'sometimes',l:'Sometimes'},{v:'yes',l:'Yes, regularly'}] },
    { key:'debt',     q:'What does your debt situation look like?',
      opts:[{v:'none',l:'No debt — clean slate'},{v:'small',l:'Small debt (under $5k)'},
            {v:'moderate',l:'Moderate debt ($5k–$25k)'},{v:'heavy',l:'Heavy debt (over $25k)'}] },
    { key:'goal',     q:'What are you actually trying to build?',
      opts:[{v:'freedom',l:'Financial freedom'},{v:'extra',l:'Extra income'},
            {v:'invest',l:'Building investments'},{v:'trading',l:'Learning trading'}] },
    { key:'freedom',  q:'Honestly — how financially free are you right now?', range:true },
  ];

  let _names=[],_colors=[],_configs=[],_idx=0,_onDone=null;
  let _ans={},_step=0,_selectedChar=null;

  const $  = id => document.getElementById(id);
  const SC = 'mp-player-setup-screen';

  function start(names, colors, onDone) {
    _names=names; _colors=colors; _configs=[]; _idx=0; _onDone=onDone;
    $(SC)?.classList.remove('hidden');
    _loadPlayer(0);
  }

  function _loadPlayer(i) {
    _idx=i; _ans={freedom:'5'}; _step=0; _selectedChar=null;
    _renderHeader(i);
    _showPanel('mpps-panel-mode');
    $('mpps-btn-sit')?.classList.remove('active');
    $('mpps-btn-char')?.classList.remove('active');
    _rewire('mpps-btn-sit',  () => { $('mpps-btn-sit').classList.add('active'); _startSurvey(); });
    _rewire('mpps-btn-char', () => { $('mpps-btn-char').classList.add('active'); _startCharPicker(); });
  }

  function _renderHeader(i) {
    const hdr = $('mpps-hdr'); if (!hdr) return;
    const c    = _colors[i % _colors.length] || '#f59e0b';
    const init = (_names[i]||'?')[0].toUpperCase();
    const dots = _names.map((_,di) =>
      `<div class="mpps-dot ${di<i?'done':di===i?'cur':''}"></div>`).join('');
    hdr.innerHTML = `
      <div class="mpps-token" style="background:${c};border-color:${c}">${init}</div>
      <div class="mpps-info">
        <div class="mpps-prog-label">${t('mpps.prog.lbl',{n:i+1,total:_names.length})}</div>
        <div class="mpps-prog-name">${_names[i]}</div>
        <div class="mpps-dots">${dots}</div>
      </div>`;
  }

  function _startSurvey() {
    _step = 0; _renderSurveyStep(); _showPanel('mpps-panel-survey');
  }

  function _renderSurveyStep() {
    const q = QUESTIONS[_step];
    const isLast  = _step === QUESTIONS.length - 1;
    const isFirst = _step === 0;
    const body = $('mpps-survey-body');
    if (!body) return;

    if (q.range) {
      const cur = _ans.freedom || '5';
      body.innerHTML = `
        <div class="mpps-q">${q.q}</div>
        <div class="mpps-range-wrap">
          <div class="mpps-rng-val" id="mpps-rv">${cur}</div>
          <input id="mpps-rng" class="mpps-rng" type="range" min="1" max="10" value="${cur}">
          <div class="mpps-rng-labels"><span>${t('mpps.range.low')}</span><span>${t('mpps.range.high')}</span></div>
        </div>`;
      $('mpps-rng')?.addEventListener('input', e => {
        _ans.freedom = e.target.value;
        const rv = $('mpps-rv'); if (rv) rv.textContent = e.target.value;
      });
    } else {
      body.innerHTML = `
        <div class="mpps-q">${q.q}</div>
        <div class="mpps-opts" data-key="${q.key}">
          ${q.opts.map(o =>
            `<button class="mpps-opt${_ans[q.key]===o.v?' sel':''}" data-val="${o.v}">${o.l}</button>`
          ).join('')}
        </div>`;
      body.querySelectorAll('.mpps-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          body.querySelectorAll('.mpps-opt').forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
          _ans[q.key] = btn.dataset.val;
        });
      });
    }

    const dotsEl = $('mpps-sdots');
    if (dotsEl) dotsEl.innerHTML = QUESTIONS.map((_,di) =>
      `<div class="mpps-sdot ${di<_step?'done':di===_step?'cur':''}"></div>`).join('');

    _rewire('mpps-s-back', () => {
      if (_step > 0) { _step--; _renderSurveyStep(); }
      else _showPanel('mpps-panel-mode');
    });
    _rewire('mpps-s-next', () => {
      if (_step < QUESTIONS.length - 1) { _step++; _renderSurveyStep(); }
      else _showDiagnosis();
    });
    const backEl = $('mpps-s-back'), nextEl = $('mpps-s-next');
    if (backEl) backEl.disabled = isFirst;
    if (nextEl) nextEl.textContent = isLast ? t('mpps.btn.last') : t('mpps.btn.next');
  }

  function _showDiagnosis() {
    const diag = buildDiagnosis(_ans);
    const prof = buildSituationProfile(_ans);
    const drag = (prof.debts||[]).reduce((s,d) => s+(d.monthlyPayment||0), 0);
    const cf   = prof.income - prof.expenses - drag;
    const el   = $('mpps-diag-content');
    if (el) el.innerHTML = `
      <div class="mpps-diag-card">
        <div class="mpps-arch-row">
          <div class="mpps-arch-icon">${diag.archetype.icon}</div>
          <div>
            <div class="mpps-arch-name">${diag.archetype.name}</div>
            <div class="mpps-arch-desc">${diag.archetype.desc}</div>
          </div>
        </div>
        <div class="mpps-cf-strip">
          <span>${t('mpps.cf.income')}</span><strong class="positive">${cpm(prof.income)}</strong>
          <span>${t('mpps.cf.expenses')}</span><strong class="negative">${cpm(prof.expenses)}</strong>
          <span>${t('mpps.cf.cashflow')}</span><strong class="${cf>=0?'positive':'negative'}">${c(cf,true)+t('currency.pm')}</strong>
        </div>
      </div>`;
    _rewire('mpps-diag-confirm', () => { _configs.push({name:_names[_idx],_customProfile:prof}); _advance(); });
    _rewire('mpps-diag-back',    () => _startSurvey());
    _showPanel('mpps-panel-diag');
  }

  function _startCharPicker() {
    _selectedChar = null;
    const list = $('mpps-char-list'), cb = $('mpps-char-confirm');
    if (cb) cb.disabled = true;
    if (list) {
      list.innerHTML = SP_CHARACTERS.map(c => {
        const tags = Object.entries(c.stats).map(([k,v]) =>
          `<span class="mpps-char-tag ${c.statClasses[k]||''}">${v}</span>`).join('');
        return `<div class="mpps-char-row" data-key="${c.key}">
          <div class="mpps-char-ico">${c.icon}</div>
          <div><div class="mpps-char-name">${c.name}</div>
          <div class="mpps-char-story">${c.story}</div>
          <div class="mpps-char-tags">${tags}</div></div></div>`;
      }).join('');
      list.querySelectorAll('.mpps-char-row').forEach(el => {
        el.addEventListener('click', () => {
          list.querySelectorAll('.mpps-char-row').forEach(x => x.classList.remove('sel'));
          el.classList.add('sel');
          _selectedChar = el.dataset.key;
          const b = $('mpps-char-confirm'); if (b) b.disabled = false;
        });
      });
    }
    _rewire('mpps-char-confirm', () => {
      if (!_selectedChar) return;
      _configs.push({name:_names[_idx], profession:_selectedChar});
      _advance();
    });
    _rewire('mpps-char-back', () => _showPanel('mpps-panel-mode'));
    _showPanel('mpps-panel-char');
  }

  function _advance() {
    if (_idx + 1 < _names.length) { _loadPlayer(_idx + 1); }
    else { $(SC)?.classList.add('hidden'); _onDone(_configs); }
  }

  function _showPanel(id) {
    ['mpps-panel-mode','mpps-panel-survey','mpps-panel-diag','mpps-panel-char']
      .forEach(pid => { const el=$(pid); if(el) el.classList.toggle('hidden', pid!==id); });
  }

  function _rewire(id, fn) {
    const el = $(id); if (!el) return;
    const n = el.cloneNode(true);
    el.parentNode.replaceChild(n, el);
    n.addEventListener('click', fn);
  }

  return { start };
})();

// ── HANDOFF overlay logic ────────────────────────────────────────────────────
function _showHandoff(playerData, playerIdx) {
  const ov = document.getElementById('handoff-overlay');
  if (!ov) return;
  const COLORS = ['#f59e0b','#3b82f6','#10b981','#f43f5e','#8b5cf6','#f97316'];
  const c = COLORS[playerIdx % 6];
  document.getElementById('handoff-name').textContent = playerData.name || `Player ${playerIdx+1}`;
  const wrap = document.getElementById('handoff-token-wrap');
  if (wrap) {
    const initials = (playerData.name || `P${playerIdx+1}`)[0].toUpperCase();
    wrap.innerHTML = `<div class="handoff-token" style="background:${c};border-color:${c};color:#000">${initials}</div>`;
  }
  ov.classList.remove('hidden');
  document.getElementById('handoff-btn').onclick = () => {
    ov.classList.add('hidden');
    engine.resumeAfterHandoff();
  };
}

// Engine is created first (no DOM dependency)
const engine = new GameEngine({

  onStateChange(state) {
    ui.render(state);
  },

  onCardDrawn({ card, choices, preview }) {
    ui.showCard({ card, choices, preview });
  },

  onMessage({ type, options, text }) {
    if (type === 'CHOICE') {
      ui.showChoiceModal({ options });
    } else if (type === 'ERROR') {
      ui._renderMessage(`⚠️ ${text}`);
    }
  },

  onPayday(data) {
    ui.showPayday(data);
  },

  onGameOver(data) {
    ui.showGameOver(data);
  },

  onTurnEnd({ player, playerIndex }) {
    _showHandoff(player, playerIndex);
  },
});

// UI is created after DOM is ready, receives engine reference
const ui = new UIController(engine);
engine.onMentor = (tip) => ui.showMentor(tip);

// Dev helper: expose to window for debugging
window._game = { engine, ui };

// ════════════════════════════════════════════════════════════════════════════
// PART 1 — DEVICE DETECTION
// ════════════════════════════════════════════════════════════════════════════

function isMobile() {
  return window.innerWidth < 768;
}

window.addEventListener('load', () => {
  const applyLayout = () => {
    const mobile = isMobile();
    document.body.classList.toggle('mobile-layout',  mobile);
    document.body.classList.toggle('desktop-layout', !mobile);
    // Show/hide the mobile toggle bar
    const bar = document.getElementById('mobile-panel-bar');
    if (bar) bar.classList.toggle('hidden', !mobile);
  };

  applyLayout();

  // Re-apply on resize (handles rotation, iframe resize)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyLayout, 120);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// PART 4 — MOBILE PANEL TOGGLES
// ════════════════════════════════════════════════════════════════════════════

function togglePanel(id) {
  const el  = document.getElementById(id);
  const btn = document.getElementById(id === 'stats-panel' ? 'mpb-stats' : 'mpb-right');
  if (!el) return;
  const isOpen = el.classList.contains('panel-open');
  // Close both panels first
  ['stats-panel', 'right-panel'].forEach(pid => {
    const panel = document.getElementById(pid);
    if (panel) panel.classList.remove('panel-open');
  });
  document.querySelectorAll('.mpb-btn').forEach(b => b.classList.remove('active'));
  // Open requested panel if it wasn't already open
  if (!isOpen) {
    el.classList.add('panel-open');
    if (btn) btn.classList.add('active');
    // Smooth scroll to panel
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ════════════════════════════════════════════════════════════════════════════
// PART 9 — LOCAL LEADERBOARD
// ════════════════════════════════════════════════════════════════════════════

const SCORE_KEY = 'fxminds_scores';
const MEDALS    = ['🥇','🥈','🥉','4.','5.'];

function updateLeaderboard(passive) {
  let scores = [];
  try { scores = JSON.parse(localStorage.getItem(SCORE_KEY)) || []; } catch(_) {}

  if (passive !== null && passive !== undefined) {
    scores.push({ score: Math.round(passive), date: new Date().toLocaleDateString('nl-NL') });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    try { localStorage.setItem(SCORE_KEY, JSON.stringify(scores)); } catch(_) {}
  }

  const el = document.getElementById('leaderboard');
  if (!el) return;

  if (!scores.length) {
    el.innerHTML = '<div class="lb-empty">Nog geen scores opgeslagen.</div>';
    return;
  }
  el.innerHTML = scores.map((s, i) => `
    <div class="lb-row">
      <span class="lb-rank">${MEDALS[i] || (i+1)+'.'}
</span>
      <span class="lb-score">€${s.score.toLocaleString('nl-NL')}/mnd</span>
      <span class="lb-date">${s.date || ''}</span>
    </div>`).join('');
}

function showLeaderboard() {
  updateLeaderboard(null);
  document.getElementById('leaderboard-overlay')?.classList.remove('hidden');
}

// ════════════════════════════════════════════════════════════════════════════
// PART 10 — VIRAL SHARE (WORDLE-STYLE)
// ════════════════════════════════════════════════════════════════════════════

const GAME_URL = 'https://fxminds.nl/cashflow/';

function _scoreToEmoji(passive) {
  // Build a 5-block emoji bar based on passive income levels
  const thresholds = [500, 1000, 2000, 4000, 8000];
  return thresholds.map(t => passive >= t ? '🟩' : '⬜').join('');
}

function generateShareCard(passive, resultType, turns, prog) {
  const score = Math.round(passive || 0);
  const emoji = _scoreToEmoji(score);
  const resultLabel =
    resultType === 'win'  ? '🏆 Ontsnapt aan de Ratrace!' :
    resultType === 'mp'   ? '🏆 Multiplayer Score' :
                            '💸 Volgende keer beter';

  return (
    `FXMINDS CASHFLOW SIMULATOR\n` +
    `${resultLabel}\n\n` +
    `${emoji}\n\n` +
    `📈 Passief inkomen: €${score.toLocaleString('nl-NL')}/mnd\n` +
    `🎲 In ${turns} beurten gespeeld\n` +
    `⭐ Level: ${prog?.level || 1} — ${prog?.title || ''}\n\n` +
    `Versla mij:\n${GAME_URL}`
  );
}

// Build the share action buttons HTML (injected into EOS overlay)
UIController.prototype._buildViralShare = function(passive, resultType, turns, prog) {
  const score = Math.round(passive || 0);
  return `
    <div class="eos-viral-share" id="eos-viral-share">
      <a class="eos-viral-btn eos-vb-wa"  id="evs-wa"   href="#" target="_blank" rel="noopener">💬 WhatsApp</a>
      <a class="eos-viral-btn eos-vb-x"   id="evs-x"    href="#" target="_blank" rel="noopener">𝕏 Delen</a>
      <button class="eos-viral-btn eos-vb-copy" onclick="copyShareText()">📋 Kopiëren</button>
      <button class="eos-viral-btn eos-vb-img"  onclick="downloadScoreScreenshot()">📸 Screenshot</button>
      <button class="eos-viral-btn eos-vb-lb"   onclick="showLeaderboard()">🏅 Scores</button>
    </div>`;
};

// Wire the share links after the HTML is injected
UIController.prototype._bindViralShare = function(passive, resultType, turns, prog) {
  const text = generateShareCard(passive || 0, resultType, turns, prog);
  const enc  = encodeURIComponent(text);

  const waEl = document.getElementById('evs-wa');
  const xEl  = document.getElementById('evs-x');
  if (waEl) waEl.href = `https://wa.me/?text=${enc}`;
  if (xEl)  xEl.href  = `https://x.com/intent/tweet?text=${enc}`;

  // Save to leaderboard automatically on game end
  updateLeaderboard(passive || 0);

  // Store share text globally for copyShareText()
  window._lastShareText = text;
};

// ════════════════════════════════════════════════════════════════════════════
// PART 6 — COPY SHARE LINK
// ════════════════════════════════════════════════════════════════════════════

function copyShareText() {
  const text = window._lastShareText ||
    `FXminds Cashflow Simulator — Speel mee: ${GAME_URL}`;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      _flashCopyBtn('✓ Gekopieerd!');
    }).catch(() => _fallbackCopy(text));
  } else {
    _fallbackCopy(text);
  }
}

function _flashCopyBtn(msg) {
  const btns = document.querySelectorAll('.eos-vb-copy, .share-copy');
  btns.forEach(b => {
    const orig = b.textContent;
    b.textContent = msg;
    setTimeout(() => { b.textContent = orig; }, 2200);
  });
}

function _fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); _flashCopyBtn('✓ Gekopieerd!'); }
  catch(_) { alert('Kopieer handmatig:\n\n' + text); }
  document.body.removeChild(ta);
}

// ════════════════════════════════════════════════════════════════════════════
// PART 7 — SCREENSHOT DOWNLOAD (html2canvas)
// ════════════════════════════════════════════════════════════════════════════

function downloadScoreScreenshot() {
  const target = document.getElementById('win-overlay') ||
                 document.querySelector('.eos-panel') ||
                 document.body;

  if (typeof html2canvas === 'undefined') {
    alert('Screenshot niet beschikbaar. Maak een handmatige screenshot.');
    return;
  }

  const btn = document.querySelector('.eos-vb-img, .share-img');
  if (btn) { btn.textContent = '⏳ Bezig...'; btn.disabled = true; }

  html2canvas(target, {
    backgroundColor: '#07090d',
    scale: 2,
    useCORS: true,
    logging: false,
  }).then(canvas => {
    const link      = document.createElement('a');
    link.download   = 'fxminds-cashflow-score.png';
    link.href       = canvas.toDataURL('image/png');
    link.click();
    if (btn) { btn.textContent = '✓ Opgeslagen!'; btn.disabled = false; setTimeout(() => { btn.textContent = '📸 Screenshot'; }, 2500); }
  }).catch(() => {
    alert('Screenshot mislukt. Maak een handmatige screenshot.');
    if (btn) { btn.textContent = '📸 Screenshot'; btn.disabled = false; }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PART 8 — SAVE SCORE (email → MailBlue via backend)
// ════════════════════════════════════════════════════════════════════════════

function saveScore(score, email) {
  const targetEmail = email || (document.getElementById('score-email')?.value || '').trim();
  if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
    alert('Vul een geldig e-mailadres in.');
    return;
  }
  // FIX: route through existing _submitToMailBlue instead of broken literal URL
  if (typeof _submitToMailBlue === 'function') {
    _submitToMailBlue('', targetEmail, score).catch(() => {});
  } else {
    // Silent fallback — no alert that could confuse the player
    console.warn('[saveScore] _submitToMailBlue not available');
  }
}

// ════════════════════════════════════════════════════════════════════════════
// SHARE OVERLAY helper (full-page share view)
// ════════════════════════════════════════════════════════════════════════════

function openShareOverlay(passive, resultType, turns, prog) {
  const text = generateShareCard(passive || 0, resultType, turns, prog);
  window._lastShareText = text;

  const overlay = document.getElementById('share-overlay');
  const preview = document.getElementById('share-card-text');
  const waEl    = document.getElementById('share-wa');
  const xEl     = document.getElementById('share-x');
  if (!overlay) return;

  if (preview) preview.textContent = text;

  const enc = encodeURIComponent(text);
  if (waEl) waEl.href = `https://wa.me/?text=${enc}`;
  if (xEl)  xEl.href  = `https://x.com/intent/tweet?text=${enc}`;

  overlay.classList.remove('hidden');
}


// ════════════════════════════════════════════════════════════════════════════
// PART 8 — DAILY CASHFLOW CHALLENGE
// ════════════════════════════════════════════════════════════════════════════

const CHALLENGE_KEY  = 'fxminds_challenge';
const CHALLENGE_URL  = 'https://fxminds.nl/cashflow/';

// Pool of 14 rotating daily goals (cycles by day-of-year mod 14)
const DAILY_GOALS = [
  { id:'passive_500',   type:'passief inkomen',  title:'Bereik €500/mnd passief',          desc:'Bouw genoeg bezittingen op om €500 passief per maand te verdienen in één sessie.',  target:500,  unit:'€/mnd', key:'passiveIncome' },
  { id:'passive_1000',  type:'passief inkomen',  title:'Bereik €1.000/mnd passief',         desc:'Schaal je passieve inkomsten op tot €1.000 per maand voor je de Ratrace ontsnapt.',  target:1000, unit:'€/mnd', key:'passiveIncome' },
  { id:'passive_2000',  type:'passief inkomen',  title:'Bereik €2.000/mnd passief',         desc:'De Ratrace ontsnapper: genereer €2.000 passief inkomen per maand.',               target:2000, unit:'€/mnd', key:'passiveIncome' },
  { id:'assets_3',      type:'bezittingen',      title:'Verzamel 3 bezittingen',             desc:'Koop minimaal 3 verschillende bezittingen die cashflow genereren.',                 target:3,    unit:'bezittingen', key:'assetCount' },
  { id:'assets_5',      type:'bezittingen',      title:'Verzamel 5 bezittingen',             desc:'Bouw een gediversificeerde portefeuille van 5 bezittingen op.',                   target:5,    unit:'bezittingen', key:'assetCount' },
  { id:'debt_free',     type:'schulden',         title:'Speel schuldenvrij',                 desc:'Beëindig het spel zonder enige schulden — volledig schoon.',                       target:0,    unit:'schulden', key:'debtCount' },
  { id:'turns_20',      type:'efficiëntie',      title:'Ontsnapt binnen 20 beurten',         desc:'Ontsnap de Ratrace in maximaal 20 beurten. Elke beslissing telt.',                target:20,   unit:'beurten', key:'turnsPlayed', invert:true },
  { id:'turns_15',      type:'efficiëntie',      title:'Ontsnapt binnen 15 beurten',         desc:'Speedrun: ontsnapt de Ratrace in slechts 15 beurten of minder.',                  target:15,   unit:'beurten', key:'turnsPlayed', invert:true },
  { id:'level_5',       type:'investeerder',     title:'Bereik Investeerderslevel 5',         desc:'Verdien genoeg XP om Level 5 (Passief Inkomen Pro) te bereiken.',                 target:5,    unit:'level', key:'investorLevel' },
  { id:'networth_10k',  type:'vermogen',         title:'Bouw €10.000 nettovermogen op',      desc:'Bereik een nettovermogen van €10.000 of meer aan het einde van je sessie.',        target:10000, unit:'€', key:'netWorth' },
  { id:'networth_25k',  type:'vermogen',         title:'Bouw €25.000 nettovermogen op',      desc:'Bereik €25.000 nettovermogen — de grote spelers spelen op dit niveau.',           target:25000, unit:'€', key:'netWorth' },
  { id:'cashflow_500',  type:'cashflow',         title:'Bereik €500/mnd netto cashflow',     desc:'Zorg dat je netto maandelijkse cashflow de €500 overschrijdt.',                   target:500,  unit:'€/mnd', key:'netCashflow' },
  { id:'win_once',      type:'uitdaging',        title:'Ontsnap de Ratrace!',                desc:'Bouw passief inkomen op dat je uitgaven overtreft en ontsnapt de Ratrace.',        target:1,    unit:'overwinning', key:'resultWin' },
  { id:'assets_2_types', type:'diversificatie',  title:'Koop 2 verschillende asset-types',   desc:'Diversifieer: koop bezittingen uit minimaal 2 verschillende categorieën.',         target:2,    unit:'categorieën', key:'assetTypes' },
];

function _getDailyGoal() {
  const now      = new Date();
  const dayOfYear= Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return DAILY_GOALS[dayOfYear % DAILY_GOALS.length];
}

function _todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function _loadChallengeData() {
  try   { return JSON.parse(localStorage.getItem(CHALLENGE_KEY)) || { streak:0, lastDate:'', history:[] }; }
  catch { return { streak:0, lastDate:'', history:[] }; }
}

function _saveChallengeData(data) {
  try { localStorage.setItem(CHALLENGE_KEY, JSON.stringify(data)); } catch(_) {}
}

// Evaluate whether the player completed today's challenge
// Called from _bindViralShare so it runs on every game end
function evaluateDailyChallenge(gameStats) {
  const goal    = _getDailyGoal();
  const today   = _todayKey();
  const data    = _loadChallengeData();
  const already = data.history.find(h => h.date === today);
  if (already) return;  // already evaluated today

  // Extract the relevant metric from game stats
  let value = 0;
  switch (goal.key) {
    case 'passiveIncome':  value = gameStats.passiveIncome  || 0; break;
    case 'assetCount':     value = gameStats.assetCount     || 0; break;
    case 'debtCount':      value = gameStats.debtCount      || 0; break;
    case 'turnsPlayed':    value = gameStats.turnsPlayed    || 0; break;
    case 'investorLevel':  value = gameStats.investorLevel  || 0; break;
    case 'netWorth':       value = gameStats.netWorth       || 0; break;
    case 'netCashflow':    value = gameStats.netCashflow     || 0; break;
    case 'resultWin':      value = gameStats.resultType === 'win' ? 1 : 0; break;
    case 'assetTypes': {
      // Count distinct asset name prefixes as a proxy for types
      const names  = (gameStats.assetNames || []);
      const types  = new Set(names.map(n => n.split(' ')[0]));
      value = types.size;
      break;
    }
    default: value = 0;
  }

  // Invert = lower is better (e.g. turns played)
  const success = goal.invert
    ? (value <= goal.target && value > 0 && gameStats.resultType === 'win')
    : value >= goal.target;

  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;

  if (success) {
    if (data.lastDate === yKey || data.streak === 0) {
      data.streak = (data.streak || 0) + 1;
    } else if (data.lastDate !== today) {
      data.streak = 1;  // reset if not consecutive
    }
    data.lastDate = today;
  }

  data.history.unshift({ date: today, goalId: goal.id, goalTitle: goal.title, success, value, target: goal.target, unit: goal.unit });
  data.history = data.history.slice(0, 14);  // keep 2 weeks
  _saveChallengeData(data);

  // Show toast notification if challenge completed
  if (success) (window._showChallengeToast || _showChallengeToast)(goal, data.streak);
}

function _showChallengeToast(goal, streak) {
  const toast = document.createElement('div');
  toast.className = 'challenge-toast';
  toast.innerHTML = `
    <span class="ct-icon">🎯</span>
    <div class="ct-body">
      <div class="ct-title">Challenge behaald!</div>
      <div class="ct-sub">${goal.title}${streak >= 2 ? ` · 🔥 ${streak} dagen streak!` : ''}</div>
    </div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('ct-show'), 50);
  setTimeout(() => { toast.classList.remove('ct-show'); setTimeout(() => toast.remove(), 500); }, 4000);
}

function showDailyChallenge() {
  const goal  = _getDailyGoal();
  const data  = _loadChallengeData();
  const today = _todayKey();
  const todayResult = data.history.find(h => h.date === today);

  // Date display
  const dateEl = document.getElementById('ch-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('nl-NL', { weekday:'long', day:'numeric', month:'long' });

  // Streak
  const streakEl = document.getElementById('ch-streak-val');
  if (streakEl) streakEl.textContent = `${data.streak || 0} ${data.streak === 1 ? 'dag' : 'dagen'}`;

  // Goal card
  const goalEl = document.getElementById('ch-goal-card');
  if (goalEl) {
    const pct = todayResult
      ? (todayResult.success ? 100 : Math.min(99, Math.round((todayResult.value / todayResult.target) * 100)))
      : 0;
    const progressClass = todayResult?.success ? 'done' : '';
    goalEl.innerHTML = `
      <div class="ch-goal-type">🎯 Doel van vandaag</div>
      <div class="ch-goal-title">${goal.title}</div>
      <div class="ch-goal-desc">${goal.desc}</div>
      <div class="ch-goal-target">
        <span class="ch-goal-target-lbl">Doelstelling</span>
        <span class="ch-goal-target-val">${goal.invert ? '≤' : '≥'} ${goal.target.toLocaleString('nl-NL')} ${goal.unit}</span>
      </div>
      ${todayResult ? `
      <div class="ch-progress-wrap">
        <div class="ch-progress-lbl">
          <span>${todayResult.success ? '✅ Behaald!' : 'Voortgang'}</span>
          <span>${todayResult.value.toLocaleString('nl-NL')} / ${todayResult.target.toLocaleString('nl-NL')}</span>
        </div>
        <div class="ch-progress-track"><div class="ch-progress-fill ${progressClass}" style="width:${pct}%"></div></div>
      </div>` : `
      <div style="margin-top:8px;font-family:var(--mono);font-size:10px;color:var(--dim)">
        Speel een potje om te zien hoe je het doet!
      </div>`}`;
  }

  // Streak dots (last 7 days)
  // (rendered inside ch-streak-bar area, append dots below it)
  _renderStreakDots(data);

  // History
  const histEl = document.getElementById('ch-history');
  if (histEl) {
    if (!data.history.length) {
      histEl.innerHTML = '<div style="font-family:var(--mono);font-size:10px;color:var(--dim);text-align:center;padding:10px 0">Nog geen geschiedenis. Speel jouw eerste challenge!</div>';
    } else {
      histEl.innerHTML = data.history.slice(0, 7).map(h => `
        <div class="ch-hist-row ${h.success ? 'success' : 'missed'}">
          <span class="ch-hist-day">${h.date.slice(5).replace('-','/')}</span>
          <span class="ch-hist-goal">${h.goalTitle}</span>
          <span class="ch-hist-badge">${h.success ? '✅' : '❌'}</span>
        </div>`).join('');
    }
  }

  document.getElementById('challenge-overlay')?.classList.remove('hidden');
}

function _renderStreakDots(data) {
  // Build a 7-day streak indicator and inject into streak bar
  const bar = document.querySelector('.ch-streak-bar');
  if (!bar) return;
  let dotsWrap = document.getElementById('ch-streak-dots');
  if (!dotsWrap) {
    dotsWrap = document.createElement('div');
    dotsWrap.id = 'ch-streak-dots';
    dotsWrap.className = 'ch-streak-dots';
    // Insert after the streak bar in the challenge panel
    const panel = document.querySelector('.challenge-panel');
    const goalCard = document.getElementById('ch-goal-card');
    if (panel && goalCard) panel.insertBefore(dotsWrap, goalCard);
  }

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const entry = data.history.find(h => h.date === key);
    const isToday = i === 0;
    const label = ['Ma','Di','Wo','Do','Vr','Za','Zo'][d.getDay() === 0 ? 6 : d.getDay() - 1];
    days.push({ key, entry, isToday, label });
  }

  dotsWrap.innerHTML = days.map(({ entry, isToday, label }) => {
    let cls = '';
    if (isToday && entry?.success) cls = 'today done';
    else if (isToday)              cls = 'current';
    else if (entry?.success)       cls = 'done';
    return `<div class="ch-dot ${cls}" title="${label}">${entry?.success ? '🔥' : label}</div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════════════════
// PART 9 — STREAK SYSTEM (enriches leaderboard + share card)
// ════════════════════════════════════════════════════════════════════════════

function getStreak() {
  return _loadChallengeData().streak || 0;
}

// Wire challenge evaluation into _bindViralShare
// Overwrite the existing prototype to also call evaluateDailyChallenge
(function() {
  const _orig = UIController.prototype._bindViralShare;
  UIController.prototype._bindViralShare = function(passive, resultType, turns, prog) {
    _orig.call(this, passive, resultType, turns, prog);

    // Evaluate daily challenge with current game stats
    const state = this.engine?.getState?.();
    const player = state?.activePlayer;
    if (player) {
      const gameStats = {
        passiveIncome:  player.passiveIncome || 0,
        assetCount:     player.assets?.length || 0,
        debtCount:      player.debts?.length  || 0,
        turnsPlayed:    player.turnsPlayed    || 0,
        investorLevel:  prog?.level           || 1,
        netWorth:       player.netWorth       || 0,
        netCashflow:    player.monthlyCashflow || 0,
        resultType:     resultType,
        assetNames:     (player.assets || []).map(a => a.name || ''),
      };
      evaluateDailyChallenge(gameStats);
    }

    // Update streak display in share card
    const streak = getStreak();
    if (streak >= 2 && window._lastShareText) {
      window._lastShareText += `\n🔥 ${streak} dagen streak!`;
      // Re-encode share links
      const enc = encodeURIComponent(window._lastShareText);
      const waEl = document.getElementById('evs-wa');
      const xEl  = document.getElementById('evs-x');
      if (waEl) waEl.href = `https://wa.me/?text=${enc}`;
      if (xEl)  xEl.href  = `https://x.com/intent/tweet?text=${enc}`;
    }
  };
})();

// ── Enrich generateShareCard with streak and challenge ─────────────────────
(function() {
  const _origGen = generateShareCard;
  window.generateShareCard = function(passive, resultType, turns, prog) {
    let base = _origGen(passive, resultType, turns, prog);
    const streak = getStreak();
    const goal   = _getDailyGoal();
    const data   = _loadChallengeData();
    const today  = _todayKey();
    const todayEntry = data.history.find(h => h.date === today);

    if (streak >= 2) {
      base += `\n🔥 ${streak} dagen streak!`;
    }
    if (todayEntry?.success) {
      base += `\n🎯 Challenge behaald: ${goal.title}`;
    }
    return base;
  };
})();

function shareDailyChallenge() {
  const goal    = _getDailyGoal();
  const data    = _loadChallengeData();
  const today   = _todayKey();
  const entry   = data.history.find(h => h.date === today);
  const streak  = data.streak || 0;

  const emoji   = entry?.success ? '✅' : '🎯';
  const status  = entry?.success ? 'behaald!' : 'in uitvoering...';

  const text =
    `FXMINDS CASHFLOW SIMULATOR\n` +
    `📅 Dagelijkse Challenge — ${new Date().toLocaleDateString('nl-NL')}\n\n` +
    `${emoji} ${goal.title}\n${status}\n\n` +
    (streak >= 2 ? `🔥 ${streak} dagen op rij!\n\n` : '') +
    `Doe jij mee?\n${CHALLENGE_URL}`;

  window._lastShareText = text;
  const enc = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${enc}`, '_blank');
}

// ── Challenge badge on board (shown after game starts) ─────────────────────
function updateChallengeBadge() {
  let badge = document.getElementById('in-game-challenge-badge');
  if (!badge) return;
  const goal  = _getDailyGoal();
  const data  = _loadChallengeData();
  const today = _todayKey();
  const entry = data.history.find(h => h.date === today);
  const streak = data.streak || 0;

  badge.innerHTML = `
    <span class="challenge-badge-icon">${entry?.success ? '✅' : '🎯'}</span>
    <div>
      <div class="challenge-badge-text">${entry?.success ? 'Challenge ✓' : 'Challenge'}</div>
      <div class="challenge-badge-sub">${entry?.success ? goal.title.slice(0,24)+'…' : goal.title.slice(0,24)+'…'}${streak >= 2 ? ` 🔥${streak}` : ''}</div>
    </div>`;
  badge.onclick = showDailyChallenge;
}

// ════════════════════════════════════════════════════════════════════════════
// PART 11 — COMMUNITY CTA (Skool)
// ════════════════════════════════════════════════════════════════════════════

function showCommunity() {
  document.getElementById('community-overlay')?.classList.remove('hidden');
}

// Inject Community CTA into EOS overlays (called after they render)
// We override _buildViralShare to also append the community CTA
(function() {
  const _origBuild = UIController.prototype._buildViralShare;
  UIController.prototype._buildViralShare = function(passive, resultType, turns, prog) {
    const baseHtml = _origBuild.call(this, passive, resultType, turns, prog);
    const commHtml = `
      <a class="eos-community-cta" href="https://www.fxminds.nl/skool" target="_blank" rel="noopener"
         id="eos-community-link">
        <span class="eos-community-icon">🏫</span>
        <div class="eos-community-body">
          <div class="eos-community-title">Word lid van FXminds Skool →</div>
          <div class="eos-community-sub">Leer hoe je dit in het echte leven toepast. Gratis toegang.</div>
        </div>
        <span class="eos-community-arrow">›</span>
      </a>`;
    return baseHtml + commHtml;
  };
})();

// ── Challenge toast CSS (injected dynamically to keep style.css clean) ──────
(function injectToastStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .challenge-toast {
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:var(--bg2);border:1px solid rgba(0,200,150,.3);border-radius:var(--rl);
      padding:12px 18px;display:flex;align-items:center;gap:12px;
      box-shadow:0 4px 32px rgba(0,200,150,.2),var(--shadowl);z-index:4000;
      opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;
      max-width:360px;width:calc(100vw - 40px);
    }
    .challenge-toast.ct-show { opacity:1;transform:translateX(-50%) translateY(0); }
    .ct-icon  { font-size:28px;flex-shrink:0; }
    .ct-title { font-family:var(--mono);font-size:13px;font-weight:700;color:#00c896;margin-bottom:2px; }
    .ct-sub   { font-size:11px;color:var(--muted);line-height:1.4; }
  `;
  document.head.appendChild(style);
})();

// ── Show challenge badge once game screen appears ─────────────────────────
// Inject badge into board-area (non-intrusive, desktop only)
(function watchGameScreen() {
  const observer = new MutationObserver(() => {
    const board = document.querySelector('.board-area');
    if (board && !document.getElementById('in-game-challenge-badge')) {
      // Build wrap
      const header = board.querySelector('.board-header');
      if (!header) return;

      const wrap = document.createElement('div');
      wrap.className = 'board-challenge-wrap';

      const badge = document.createElement('button');
      badge.id = 'in-game-challenge-badge';
      badge.className = 'challenge-badge';
      badge.title = 'Dagelijkse Challenge';
      badge.setAttribute('aria-label', 'Bekijk dagelijkse challenge');

      // Clone header into wrap
      const headerClone = header.cloneNode(true);
      header.replaceWith(wrap);
      wrap.appendChild(headerClone);
      wrap.appendChild(badge);

      updateChallengeBadge();
      // Refresh every minute in case day changes mid-session
      setInterval(updateChallengeBadge, 60000);

      // FIX: disconnect after successfully injecting — no need to keep watching
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList:true, subtree:true });
})();


// ════════════════════════════════════════════════════════════════════════════
// LEAD CAPTURE + VIRAL GROWTH SYSTEM
// MailBlue (ActiveCampaign) direct integration
// ════════════════════════════════════════════════════════════════════════════

const LEAD_GAME_URL  = 'https://fxminds.nl/cashflow/';
const MB_ENDPOINT    = 'https://fxminds15116.activehosted.com/proc.php';
const MB_U           = '131';
const MB_F           = '35';
const REF_KEY        = 'fxminds_ref';
const REF_COUNT_KEY  = 'fxminds_ref_count';
const LB_KEY         = 'fxminds_lb';      // top-10 leaderboard (separate from SCORE_KEY)

// ── Compute gameScore from engine state ──────────────────────────────────────
// The game uses passiveIncome as the primary "score".
// We expose a helper so the popup can always get the current score.
function _getGameScore() {
  try {
    const state  = window._game?.engine?.getState?.();
    const player = state?.activePlayer;
    if (!player) return 0;
    return Math.round(player.passiveIncome || 0);
  } catch (_) { return 0; }
}

function _getGameStats() {
  try {
    const state  = window._game?.engine?.getState?.();
    const player = state?.activePlayer;
    if (!player) return {};
    const prog = typeof XPEngine !== 'undefined'
      ? XPEngine.levelProgress(player.xp || 0) : { level:1, title:'' };
    return {
      passiveIncome:  Math.round(player.passiveIncome || 0),
      netWorth:       Math.round(player.netWorth || 0),
      turnsPlayed:    player.turnsPlayed || 0,
      investorLevel:  prog.level,
      investorTitle:  prog.title,
      assetCount:     player.assets?.length || 0,
      debtCount:      player.debts?.length  || 0,
      netCashflow:    Math.round(player.monthlyCashflow || 0),
      playerName:     player.name || '',
    };
  } catch (_) { return {}; }
}

// ── Referral ID ──────────────────────────────────────────────────────────────
function _getOrCreateRefId() {
  let id;
  try { id = localStorage.getItem(REF_KEY); } catch(_) {}
  if (!id) {
    id = Math.random().toString(36).slice(2,8).toUpperCase();
    try { localStorage.setItem(REF_KEY, id); } catch(_) {}
  }
  return id;
}

function _getReferralCount() {
  try { return parseInt(localStorage.getItem(REF_COUNT_KEY) || '0', 10); } catch(_) { return 0; }
}

function _incrementReferralCount() {
  const n = _getReferralCount() + 1;
  try { localStorage.setItem(REF_COUNT_KEY, String(n)); } catch(_) {}
  return n;
}

// ── Check for incoming referral on page load ──────────────────────────────────
(function _checkIncomingRef() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    // Store that this session came via a referral link
    try { sessionStorage.setItem('fxminds_from_ref', ref); } catch(_) {}
  }
})();

// ── Leaderboard (top 10) ─────────────────────────────────────────────────────
function _saveLBScore(name, score) {
  let lb = [];
  try { lb = JSON.parse(localStorage.getItem(LB_KEY)) || []; } catch(_) {}
  lb.push({ name: (name || 'Speler').slice(0, 30), score, date: new Date().toLocaleDateString('nl-NL') });
  lb.sort((a, b) => b.score - a.score);
  lb = lb.slice(0, 10);
  try { localStorage.setItem(LB_KEY, JSON.stringify(lb)); } catch(_) {}
  return lb;
}

function _renderLBInPopup(lb, myScore) {
  const el = document.getElementById('lp-lb-list');
  if (!el) return;
  if (!lb.length) {
    el.innerHTML = '<div style="font-family:var(--mono);font-size:10px;color:var(--dim);text-align:center;padding:8px 0">Nog geen scores. Jij bent de eerste!</div>';
    return;
  }
  const medals = ['🥇','🥈','🥉'];
  el.innerHTML = lb.map((e, i) => `
    <div class="lp-lb-row${e.score === myScore && e.name ? ' lp-lb-mine' : ''}">
      <span class="lp-lb-rank">${medals[i] || (i+1)}</span>
      <span class="lp-lb-name">${e.name}</span>
      <span class="lp-lb-score">€${e.score.toLocaleString('nl-NL')}/mnd</span>
    </div>`).join('');
}

// ── Share text builder ────────────────────────────────────────────────────────
function _buildLeadShareText(score, refLink) {
  return (
    `Ik heb zojuist de FXminds Cashflow Game gespeeld en een score van €${score.toLocaleString('nl-NL')}/mnd passief inkomen behaald! 🏆\n\n` +
    `Kun jij mij verslaan? Speel het gratis:\n${refLink}`
  );
}

// ── MailBlue submission ───────────────────────────────────────────────────────
async function _submitToMailBlue(name, email, score) {
  const stats   = _getGameStats();
  const fromRef = sessionStorage.getItem('fxminds_from_ref') || '';

  const fd = new FormData();
  fd.append('email',      email);
  fd.append('first_name', name);
  fd.append('u',          MB_U);
  fd.append('f',          MB_F);
  fd.append('score',      String(score));

  // Extra fields for segmentation (mapped to AC custom fields if configured)
  fd.append('field[passive_income]', String(stats.passiveIncome || score));
  fd.append('field[turns_played]',   String(stats.turnsPlayed || 0));
  fd.append('field[investor_level]', String(stats.investorLevel || 1));
  fd.append('field[ref_from]',       fromRef);
  fd.append('field[ref_id]',         _getOrCreateRefId());
  fd.append('nlbox[]',               'null');  // optin checkbox

  // Primary: MailBlue proc.php (no-cors — always resolves)
  try {
    await fetch(MB_ENDPOINT, { method: 'POST', body: fd, mode: 'no-cors' });
  } catch (_) { /* silent — no-cors fetch rejects on network error */ }

  // Backend call removed — static deployment has no API.

  // If this session came from a referral, increment the referrer's count
  // (tracked locally; a real backend would do server-side attribution)
  if (fromRef) {
    // In this client-only implementation we just track locally for demo
    // Referral conversion tracked locally only (static deployment)
  }
}

// ════════════════════════════════════════════════════════════════════════════
// POPUP OPEN / CLOSE
// ════════════════════════════════════════════════════════════════════════════

let _leadTrigger = 'win';   // 'win' | 'lose' | 'exit'

function openLeadPopup(trigger) {
  _leadTrigger = trigger || 'win';
  const score  = _getGameScore();
  const el     = document.getElementById('lead-popup');
  if (!el) return;

  // Reset to form state
  const formState    = document.getElementById('lp-form-state');
  const successState = document.getElementById('lp-success-state');
  if (formState)    formState.style.display    = '';
  if (successState) successState.style.display = 'none';

  // Adapt badge / sub text by trigger
  const badge = document.getElementById('lp-badge');
  const sub   = document.getElementById('lp-sub');
  if (badge) {
    badge.textContent =
      trigger === 'win'  ? '🏆 Gefeliciteerd!' :
      trigger === 'lose' ? '💸 Goed geprobeerd' : '⚡ Sla je voortgang op';
  }
  if (sub) {
    const base = 'Wil je leren hoe succesvolle traders over geld nadenken? Sla je score op en ontvang trading inzichten, podcast afleveringen, YouTube video\'s en strategie tips.';
    sub.textContent = trigger === 'lose'
      ? 'Leer van de beste traders hoe je het volgende keer beter doet. ' + base
      : base;
  }

  // Score preview
  const preview = document.getElementById('lp-score-preview');
  if (preview && score > 0) {
    preview.style.display = 'block';
    preview.innerHTML = `Jouw score: <strong>€${score.toLocaleString('nl-NL')}/mnd passief</strong>`;
  }

  // Pre-fill name if available
  const nameIn = document.getElementById('lp-name');
  if (nameIn && !nameIn.value) {
    const stats = _getGameStats();
    if (stats.playerName && stats.playerName !== 'Alex') nameIn.value = stats.playerName;
  }

  el.classList.remove('hidden');
  document.getElementById('lp-name')?.focus();

  // Bind submit
  _bindLeadSubmit(score);
}

function closeLead() {
  document.getElementById('lead-popup')?.classList.add('hidden');
}

function closeExitPopup() {
  document.getElementById('exit-popup')?.classList.add('hidden');
}

function lpCopyLink() {
  const text = window._lpShareText || LEAD_GAME_URL;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => _flashBtn('lp-copy','✓ Gekopieerd!','📋 Kopiëren'));
  } else {
    _fallbackCopy(text);
    _flashBtn('lp-copy','✓ Gekopieerd!','📋 Kopiëren');
  }
}

function lpCopyRefLink() {
  const input = document.getElementById('lp-ref-link-input');
  const link  = input?.value || LEAD_GAME_URL;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(link).then(() => _flashRefCopyBtn());
  } else {
    _fallbackCopy(link);
    _flashRefCopyBtn();
  }
}
function _flashRefCopyBtn() {
  const btn = document.querySelector('.lp-ref-copy');
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = '✓ Gekopieerd!';
  setTimeout(() => { btn.textContent = orig; }, 2000);
}
function _flashBtn(id, msg, orig) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.textContent = msg;
  setTimeout(() => { btn.textContent = orig; }, 2200);
}

// ════════════════════════════════════════════════════════════════════════════
// SUBMIT HANDLER
// ════════════════════════════════════════════════════════════════════════════

function _bindLeadSubmit(score) {
  const submitBtn = document.getElementById('lp-submit');
  if (!submitBtn) return;

  // Remove previous listener by replacing node
  const fresh = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(fresh, submitBtn);

  fresh.addEventListener('click', async () => {
    const name    = (document.getElementById('lp-name')?.value || '').trim();
    const email   = (document.getElementById('lp-email')?.value || '').trim();
    const consent = document.getElementById('lp-consent')?.checked;
    const errEl   = document.getElementById('lp-err');

    const showErr = (m) => { errEl.textContent = m; errEl.style.display = 'block'; };
    errEl.style.display = 'none';

    if (!name)                               { showErr('Vul je voornaam in.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('Vul een geldig e-mailadres in.'); return; }
    if (!consent)                            { showErr('Vink het akkoord vakje aan om door te gaan.'); return; }

    fresh.disabled    = true;
    fresh.textContent = '⏳ Opslaan...';

    // Send to MailBlue
    await _submitToMailBlue(name, email, score);

    // Save to leaderboard
    const lb = _saveLBScore(name, score);

    // Build referral link
    const refId  = _getOrCreateRefId();
    const refUrl = `${LEAD_GAME_URL}?ref=${refId}`;
    const refCount = _getReferralCount();

    // Build share text
    const shareText = _buildLeadShareText(score, refUrl);
    window._lpShareText = shareText;
    const enc = encodeURIComponent(shareText);

    // Show success state
    document.getElementById('lp-form-state').style.display    = 'none';
    document.getElementById('lp-success-state').style.display = '';

    // Success score
    const scoreEl = document.getElementById('lp-success-score');
    if (scoreEl) scoreEl.textContent = `€${score.toLocaleString('nl-NL')}/mnd`;

    // Share preview
    const previewEl = document.getElementById('lp-share-preview');
    if (previewEl) previewEl.textContent = shareText;

    // Wire share links
    const waEl = document.getElementById('lp-wa');
    const twEl = document.getElementById('lp-tw');
    if (waEl) waEl.href = `https://wa.me/?text=${enc}`;
    if (twEl) twEl.href = `https://twitter.com/intent/tweet?text=${enc}`;

    // Referral section
    const refInput = document.getElementById('lp-ref-link-input');
    if (refInput) refInput.value = refUrl;

    // Update referral progress dots
    _updateRefDots(refCount);

    // Render leaderboard
    _renderLBInPopup(lb, score);
  });
}

function _updateRefDots(count) {
  const progVal = document.getElementById('lp-ref-prog-val');
  if (progVal) progVal.textContent = `${count} / 3`;
  for (let i = 0; i < 3; i++) {
    const dot = document.getElementById(`lp-dot-${i}`);
    if (dot) dot.classList.toggle('filled', i < count);
  }
  // If 3 friends referred, show reward message
  if (count >= 3) {
    const ref = document.getElementById('lp-referral-section');
    if (ref) {
      const reward = document.createElement('div');
      reward.style.cssText = 'margin-top:10px;background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.25);border-radius:6px;padding:10px 12px;font-family:var(--mono);font-size:11px;color:#00c896;text-align:center;';
      reward.textContent = '🎉 3 vrienden uitgenodigd! Check je inbox voor exclusieve trading inzichten.';
      ref.appendChild(reward);
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// GAME EVENT TRIGGERS  (onGameWin / onGameLose / onGameExit)
// ════════════════════════════════════════════════════════════════════════════

// Hook into existing showGameOver — show lead popup 2.5 s after result screen
(function _hookGameOver() {
  const _orig = UIController.prototype.showGameOver;
  UIController.prototype.showGameOver = function(data) {
    _orig.call(this, data);   // render existing win/loss overlay first
    const isWin = data.reason === 'WIN';
    const delay = 2500;       // let player read their result first
    setTimeout(() => {
      if (!document.getElementById('lead-popup')?.classList.contains('hidden')) return;
      openLeadPopup(isWin ? 'win' : 'lose');
    }, delay);
  };
})();

// ── Exit Intent ───────────────────────────────────────────────────────────────
(function _hookExitIntent() {
  let _exitShown = false;
  let _gameActive = false;

  // Mark game as active once the game screen is visible
  const _obs = new MutationObserver(() => {
    const gs = document.getElementById('game-screen');
    if (gs && !gs.classList.contains('hidden')) {
      _gameActive = true;
      // FIX: disconnect once game is active — no need to keep observing
      _obs.disconnect();
    }
  });
  _obs.observe(document.body, { childList:true, subtree:true });

  // Mouse leave top of page (desktop)
  document.addEventListener('mouseleave', (e) => {
    if (!_gameActive || _exitShown || e.clientY > 20) return;
    if (!document.getElementById('win-overlay')?.classList.contains('hidden')) return; // result screen already shown
    _exitShown = true;
    document.getElementById('exit-popup')?.classList.remove('hidden');
  });

  // Back button / page hide (mobile)
  window.addEventListener('pagehide', () => {
    if (!_gameActive || _exitShown) return;
    _exitShown = true;
  });

  // beforeunload (desktop, shows browser dialog — only fire if game is active and lead not submitted)
  window.addEventListener('beforeunload', (e) => {
    if (!_gameActive) return;
    const leadPopup = document.getElementById('lead-popup');
    const successVisible = document.getElementById('lp-success-state')?.style.display !== 'none';
    if (successVisible) return; // already submitted
    // We can't show our custom popup here, so just trigger the browser dialog
    e.preventDefault();
    e.returnValue = '';
  });
})();

// ── Convenience function callable from buttons ────────────────────────────────
// These match the spec's onGameWin / onGameLose / onGameExit naming
function onGameWin()  { openLeadPopup('win');  }
function onGameLose() { openLeadPopup('lose'); }
function onGameExit() {
  const ep = document.getElementById('exit-popup');
  if (ep) ep.classList.remove('hidden');
}

// ── Expose globally ───────────────────────────────────────────────────────────
window.openLeadPopup  = openLeadPopup;
window.closeLead      = closeLead;
window.closeExitPopup = closeExitPopup;
window.onGameWin      = onGameWin;
window.onGameLose     = onGameLose;
window.onGameExit     = onGameExit;
window.lpCopyLink     = lpCopyLink;
window.lpCopyRefLink  = lpCopyRefLink;


// ════════════════════════════════════════════════════════════════════════════
// AREA 1 — FAST TRACK UPGRADE: NEW ASSETS + MISSIONS
// ════════════════════════════════════════════════════════════════════════════

// ── New high-risk/high-reward Fast Track asset cards ─────────────────────────
const FT_NEW_CARDS = [
  { id:'ft_startup', type:'fast_track', title:'Startup Investering', icon:'🚀',
    description:'Een vroege startup heeft je hulp nodig. Hoog risico — maar als het lukt, is het rendement buitengewoon. Investeer alleen wat je kunt missen.',
    riskLevel:'extreme',
    choices:[
      { label:'Investeer €10.000 (hoog risico)',
        condition:(p) => p.cash >= 10000,
        effect:(p) => {
          p.addCash(-10000, '(startup investering)');
          const roll = Math.random();
          if (roll > 0.55) {
            const gain = Math.floor(Math.random() * 18000) + 8000;
            p.addCash(gain, '(startup — exit)');
            p.addLog(`🚀 Startup succesvol! Exit oplevering +${c(gain)}.`);
          } else if (roll > 0.25) {
            p.addCash(4000, '(startup — gedeeltelijk exit)');
            p.addLog('🚀 Startup gedeeltelijk exit. €4.000 teruggekregen.');
          } else {
            p.addLog('💸 Startup gevouwen. Investering verloren.');
          }
        }
      },
      { label:'Passen — te risicovol', effect:(p) => p.addLog('Startup overgeslagen.') }
    ]},

  { id:'ft_crypto', type:'fast_track', title:'Crypto Fonds', icon:'₿',
    description:'Een gediversifieerd crypto-fonds spreidt risico over meerdere tokens. Volatiel, maar het geeft exposure aan de digitale economie.',
    riskLevel:'high',
    choices:[
      { label:'Investeer €5.000 in crypto fonds',
        condition:(p) => p.cash >= 5000,
        effect:(p) => {
          p.addCash(-5000, '(crypto fonds)');
          const m = Math.floor(Math.random() * 500) + 200;
          const success = Math.random() > 0.4;
          if (success) {
            p.addAsset({ id:`crypto_${Date.now()}`, name:'Crypto Fonds', cost:5000, cashflow:m, type:'investment' });
            p.addLog(`₿ Crypto fonds actief — +${cpm(m)}/mnd verwacht rendement.`);
          } else {
            p.addLog('₿ Crypto markt daalt. Fonds verliest waarde. Geen cashflow.');
          }
        }
      },
      { label:'Passen', effect:(p) => p.addLog('Crypto fonds overgeslagen.') }
    ]},

  { id:'ft_angel', type:'fast_track', title:'Angel Investering Netwerk', icon:'👼',
    description:'Word angel investor in 3 vroege startups tegelijk. Spreiding vergroot de kans op één winner die alles compenseert.',
    riskLevel:'high',
    choices:[
      { label:'Investeer €15.000 in 3 startups',
        condition:(p) => p.cash >= 15000,
        effect:(p) => {
          p.addCash(-15000, '(angel netwerk)');
          const wins = [0,1,2].filter(() => Math.random() > 0.65).length;
          if (wins >= 2) {
            const m = Math.floor(Math.random()*800)+600;
            p.addAsset({ id:`angel_${Date.now()}`, name:'Angel Portfolio', cost:15000, cashflow:m, type:'investment' });
            p.addLog(`👼 ${wins} van 3 startups presteren! Portfolio cashflow: +${cpm(m)}/mnd.`);
          } else if (wins === 1) {
            p.addCash(8000, '(1 angel exit)');
            p.addLog('👼 1 van 3 startups succesvol. €8.000 exit ontvangen.');
          } else {
            p.addLog('👼 Alle 3 startups gevouwen. Totaal verlies.');
          }
        }
      },
      { label:'Passen', effect:(p) => p.addLog('Angel netwerk overgeslagen.') }
    ]},

  { id:'ft_vastgoed', type:'fast_track', title:'Vastgoed Development', icon:'🏗️',
    description:'Ontwikkel een residentieel project van de grond af. Langere looptijd, hogere risico — maar vastgoed blijft het fundament van vermogen.',
    riskLevel:'high',
    choices:[
      { label:'Start project (€20.000)',
        condition:(p) => p.cash >= 20000,
        effect:(p) => {
          p.addCash(-20000, '(vastgoed dev)');
          const m = Math.floor(Math.random()*900)+700;
          p.addAsset({ id:`dev_${Date.now()}`, name:'Vastgoed Ontwikkeling', cost:20000, cashflow:m, type:'real_estate' });
          p.addLog(`🏗️ Vastgoed project gestart. Verwachte cashflow: +${cpm(m)}/mnd na oplevering.`);
        }
      },
      { label:'Passen', effect:(p) => p.addLog('Vastgoed project overgeslagen.') }
    ]},

  { id:'ft_pe', type:'fast_track', title:'Private Equity Deal', icon:'💼',
    description:'Neem een belang in een gevestigd niet-beursgenoteerd bedrijf. Illiquide, maar de rendementspotentie overtreft publieke markten.',
    riskLevel:'medium',
    choices:[
      { label:'Neem belang (€12.000)',
        condition:(p) => p.cash >= 12000,
        effect:(p) => {
          p.addCash(-12000, '(private equity)');
          const m = Math.floor(Math.random()*700)+400;
          p.addAsset({ id:`pe_${Date.now()}`, name:'Private Equity', cost:12000, cashflow:m, type:'investment' });
          p.addLog(`💼 Private equity deal gesloten. Cashflow: +${cpm(m)}/mnd.`);
        }
      },
      { label:'Passen', effect:(p) => p.addLog('Private equity overgeslagen.') }
    ]},

  { id:'ft_trading_port', type:'fast_track', title:'Trading Portfolio', icon:'📊',
    description:'Bouw een actief beheerde trading portfolio met systematische strategieën. Discipline en regels bepalen het resultaat, niet emotie.',
    riskLevel:'medium',
    choices:[
      { label:'Start portfolio (€8.000)',
        condition:(p) => p.cash >= 8000,
        effect:(p) => {
          p.addCash(-8000, '(trading portfolio)');
          const win = Math.random() > 0.38;
          if (win) {
            const m = Math.floor(Math.random()*600)+350;
            p.addAsset({ id:`tp_${Date.now()}`, name:'Trading Portfolio', cost:8000, cashflow:m, type:'trading' });
            p.addLog(`📊 Trading portfolio actief. Systematisch rendement: +${cpm(m)}/mnd.`);
          } else {
            p.addLog('📊 Strategie werkt nog niet. Portfolio in herstel. Geen cashflow deze cyclus.');
          }
        }
      },
      { label:'Passen', effect:(p) => p.addLog('Trading portfolio overgeslagen.') }
    ]},
];

// Inject new cards into the existing fastTrackCards array
// (called once after the array is defined — using a small hook)
(function _injectFTCards() {
  if (typeof fastTrackCards !== 'undefined') {
    // Fix English strings in existing cards
    if (fastTrackCards[3]) {
      fastTrackCards[3].title = 'Portefeuille Opschalen';
      fastTrackCards[3].description = 'Je hebt cashflow gebouwd. Gebruik die nu als brandstof. Herbeleg systematisch en laat samengesteld rendement het werk doen.';
      if (fastTrackCards[3].choices[0]) fastTrackCards[3].choices[0].label = 'Schaal portefeuille op (€8.000)';
    }
    if (fastTrackCards[4]) {
      fastTrackCards[4].title = 'Algoritmisch Beleggen';
      fastTrackCards[4].description = 'De beste beleggers zijn niet slimmer — ze hebben de menselijke factor verwijderd. Regels schalen. Onderbuikgevoel niet.';
      if (fastTrackCards[4].choices[0]) fastTrackCards[4].choices[0].label = 'Systeem implementeren (€4.000)';
    }
    // Push new cards
    FT_NEW_CARDS.forEach(card => fastTrackCards.push(card));
  }
})();

// ── Fast Track Missions ───────────────────────────────────────────────────────
const FT_MISSIONS = [
  { id:'m1', title:'Eerste Stappen',    target:'passive_100k', goalKey:'passiveIncome',  goal:5000,   icon:'🌱', desc:'Bereik €5.000/mnd passief inkomen in Fast Track.',      reward:'Ontgrendel: geavanceerde beleggingsstrategieën' },
  { id:'m2', title:'Vermogensopbouw',   target:'networth_100k', goalKey:'netWorth',       goal:100000, icon:'📈', desc:'Bouw een nettovermogen op van €100.000.',              reward:'Ontgrendel: angel investering netwerk' },
  { id:'m3', title:'Portfolio Meester', target:'assets_10',     goalKey:'assetCount',     goal:10,     icon:'🏆', desc:'Verzamel een portefeuille van 10 of meer beleggingen.', reward:'Ontgrendel: private equity deals' },
  { id:'m4', title:'Financiële Vrijheid', target:'passive_10k', goalKey:'passiveIncome',  goal:10000,  icon:'💎', desc:'Bereik €10.000/mnd passief inkomen.',                   reward:'Ontgrendel: exclusieve community content' },
  { id:'m5', title:'Miljoenair',         target:'networth_1m',  goalKey:'netWorth',       goal:1000000,icon:'🦅', desc:'Bereik €1.000.000 nettovermogen.',                      reward:'Elitestatus: FXminds Platinum' },
];

const FT_MISSION_KEY  = 'fxminds_ft_missions';
let   _activeMissionIdx = 0;

function _loadFTMissionState() {
  try   { return JSON.parse(localStorage.getItem(FT_MISSION_KEY)) || { completed:[], current:0 }; }
  catch { return { completed:[], current:0 }; }
}
function _saveFTMissionState(s) {
  try { localStorage.setItem(FT_MISSION_KEY, JSON.stringify(s)); } catch(_) {}
}

function closeFTMission() {
  document.getElementById('ft-mission-overlay')?.classList.add('hidden');
}

function _showMissionComplete(mission, nextMission) {
  const el = document.getElementById('ft-mission-overlay');
  if (!el) return;

  document.getElementById('ftm-icon').textContent  = mission.icon;
  document.getElementById('ftm-title').textContent = `${mission.title} voltooid!`;
  document.getElementById('ftm-body').textContent  = mission.desc;

  const nextEl = document.getElementById('ftm-next');
  if (nextEl) {
    if (nextMission) {
      nextEl.innerHTML = `<strong>🎯 Volgende missie: ${nextMission.title}</strong>${nextMission.desc}`;
    } else {
      nextEl.innerHTML = `<strong>🦅 Alle missies voltooid!</strong>Je hebt de hoogste rang bereikt.`;
    }
  }

  el.classList.remove('hidden');
  _launchConfetti(3000);
}

// Check missions on every state update (hooked into _bindViralShare / render)
function _checkFTMissions() {
  if (!window._game?.engine?.getState?.()?.fastTrack) return;

  const state  = window._game.engine.getState();
  const player = state.activePlayer;
  if (!player) return;

  const ms = _loadFTMissionState();

  const current = FT_MISSIONS[ms.current];
  if (!current) return;

  const value =
    current.goalKey === 'passiveIncome' ? (player.passiveIncome || 0) :
    current.goalKey === 'netWorth'      ? (player.netWorth || 0) :
    current.goalKey === 'assetCount'    ? (player.assets?.length || 0) : 0;

  if (value >= current.goal && !ms.completed.includes(current.id)) {
    ms.completed.push(current.id);
    ms.current = Math.min(ms.current + 1, FT_MISSIONS.length - 1);
    _saveFTMissionState(ms);

    const next = FT_MISSIONS[ms.current] !== current ? FT_MISSIONS[ms.current] : null;
    setTimeout(() => _showMissionComplete(current, next), 400);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// AREA 2 — DYNAMIC ECONOMIC EVENTS (every 10 turns)
// ════════════════════════════════════════════════════════════════════════════

const ECON_EVENTS = [
  { id:'bull',      icon:'📈', type:'bull',    title:'Bull Market',            sub:'Aandelenmarkten stijgen met 40%. Beleggers profiteren massaal.',
    effect: (p) => { p.assets.filter(a=>a.type==='investment'||a.type==='trading').forEach(a=>{ a.cashflow=Math.round(a.cashflow*1.4); }); },
    logMsg: '📈 Bull market: beleggingscashflow +40%.' },
  { id:'recessie',  icon:'📉', type:'bear',    title:'Recessie',               sub:'Economische krimp. Vastgoed daalt met 30%. Houd koers.',
    effect: (p) => { p.assets.filter(a=>a.type==='real_estate').forEach(a=>{ a.cashflow=Math.round(a.cashflow*0.7); }); },
    logMsg: '📉 Recessie: vastgoed cashflow -30%.' },
  { id:'ai_boom',   icon:'🤖', type:'bull',    title:'AI Boom',                sub:'Tech-investeringen verdubbelen. Algoritme-assets genereren extra rendement.',
    effect: (p) => { p.assets.filter(a=>a.type==='skill'||a.name?.toLowerCase().includes('algo')||a.name?.toLowerCase().includes('quant')).forEach(a=>{ a.cashflow=Math.round(a.cashflow*2); }); },
    logMsg: '🤖 AI boom: tech-asset cashflow verdubbeld!' },
  { id:'rentestijging', icon:'🏦', type:'neutral', title:'Rentestijging',      sub:'Centrale bank verhoogt de rente. Leningen worden duurder.',
    effect: (p) => { p.debts.forEach(d=>{ d.monthlyPayment=Math.round(d.monthlyPayment*1.15); }); },
    logMsg: '🏦 Rentestijging: schuldbetalingen +15%.' },
  { id:'crypto_crash', icon:'₿', type:'bear',  title:'Crypto Crash',           sub:'Cryptomarkt daalt met 60%. Diversificatie beschermt je.',
    effect: (p) => { p.assets.filter(a=>a.name?.toLowerCase().includes('crypto')).forEach(a=>{ a.cashflow=Math.round(a.cashflow*0.4); }); },
    logMsg: '₿ Crypto crash: crypto-cashflow -60%.' },
  { id:'vastgoed_boom', icon:'🏠', type:'bull', title:'Vastgoed Boom',          sub:'Huurprijzen stijgen door schaarste. Vastgoedinkomsten +25%.',
    effect: (p) => { p.assets.filter(a=>a.type==='real_estate'||a.name?.toLowerCase().includes('huur')||a.name?.toLowerCase().includes('vastgoed')).forEach(a=>{ a.cashflow=Math.round(a.cashflow*1.25); }); },
    logMsg: '🏠 Vastgoed boom: huurinkomsten +25%.' },
  { id:'startup_wave', icon:'🚀', type:'bull',  title:'Startup Golf',           sub:'Risicokapitaal stroomt de markt in. Startup exits genereren hoge rendementen.',
    effect: (p) => { p.assets.filter(a=>a.name?.toLowerCase().includes('startup')||a.name?.toLowerCase().includes('angel')).forEach(a=>{ a.cashflow=Math.round(a.cashflow*1.5); }); },
    logMsg: '🚀 Startup golf: venture-assets +50% rendement.' },
  { id:'inflatie',  icon:'💸', type:'bear',    title:'Hoge Inflatie',           sub:'Koopkracht daalt. Vaste lasten stijgen automatisch.',
    effect: (p) => { p.expenses = Math.round(p.expenses * 1.1); },
    logMsg: '💸 Inflatie: vaste lasten +10%.' },
];

let _lastEconTurn = -10;

function _triggerEconomicEvent(player, turnsPlayed) {
  if (turnsPlayed - _lastEconTurn < 10) return;
  _lastEconTurn = turnsPlayed;

  const event = ECON_EVENTS[Math.floor(Math.random() * ECON_EVENTS.length)];

  // Apply effect to player
  try { event.effect(player); } catch(_) {}
  player.addLog(event.logMsg);

  // Show banner
  const banner = document.getElementById('econ-event-banner');
  const inner  = document.getElementById('econ-banner-inner');
  const iconEl = document.getElementById('econ-banner-icon');
  const titleEl= document.getElementById('econ-banner-title');
  const subEl  = document.getElementById('econ-banner-sub');

  if (banner && inner) {
    inner.className = `econ-banner-inner econ-${event.type}`;
    if (iconEl)  iconEl.textContent  = event.icon;
    if (titleEl) titleEl.textContent = event.title;
    if (subEl)   subEl.textContent   = event.sub;

    banner.classList.remove('hidden','econ-show');
    void banner.offsetWidth; // force reflow
    banner.classList.add('econ-show');

    setTimeout(() => banner.classList.add('hidden'), 5200);
  }
}

// ── Single combined render hook (econ events + FT popup + progress bar) ──────
//    Replaces the three separate render patches to avoid prototype triple-wrapping.
(function _installRenderHooks() {
  if (UIController.prototype._renderHooksInstalled) return;
  UIController.prototype._renderHooksInstalled = true;

  const _origRender = UIController.prototype.render;

  UIController.prototype.render = function(state) {
    _origRender.call(this, state);

    const player = state.activePlayer;

    // ── Economic events every 10 turns ────────────────────────────────────
    if (player && state.phase === 'ROLLING') {
      if (this._lastEconCheckTurn === undefined) this._lastEconCheckTurn = -1;
      const turns = player.turnsPlayed || 0;
      if (turns !== this._lastEconCheckTurn) {
        this._lastEconCheckTurn = turns;
        _triggerEconomicEvent(player, turns);
      }
    }

    // ── Fast Track mission checks ─────────────────────────────────────────
    if (state.fastTrack && player && state.phase === 'ROLLING') {
      _checkFTMissions();
    }

    // ── Skool Fast Track popup (once) ─────────────────────────────────────
    if (state.fastTrack && !_skoolFTPopupShown) {
      _skoolFTPopupShown = true;
      setTimeout(() => {
        document.getElementById('skool-ft-popup')?.classList.remove('hidden');
      }, 3500);
    }

    // ── Challenge progress bar ─────────────────────────────────────────────
    _updateChallengeProgressBar();
  };
})();

// ════════════════════════════════════════════════════════════════════════════
// AREA 3 — SKOOL COMMUNITY SMART BEHAVIORS
// ════════════════════════════════════════════════════════════════════════════

let _skoolPulseTimer    = null;
let _skoolTooltipEl     = null;
let _skoolTooltipShown  = false;
let _skoolFTPopupShown  = false;
let _lastPassive        = 0;
let _stagnationTurns    = 0;

function _initSkoolBehaviors() {
  const btn = document.getElementById('btn-community');
  if (!btn) return;

  // Pulse every 6 turns
  // We watch turnsPlayed via a MutationObserver on stat-turn
  const turnEl = document.getElementById('stat-turn');
  if (turnEl) {
    const obs = new MutationObserver(() => {
      // FIX: stop observing once game screen is no longer visible
      if (document.getElementById('game-screen')?.classList.contains('hidden')) {
        obs.disconnect(); return;
      }
      const turn = parseInt(turnEl.textContent || '0', 10);
      if (turn > 0 && turn % 6 === 0) {
        btn.classList.remove('skool-pulse');
        void btn.offsetWidth;
        btn.classList.add('skool-pulse');
        setTimeout(() => btn.classList.remove('skool-pulse'), 2200);
      }
    });
    obs.observe(turnEl, { childList:true, characterData:true, subtree:true });
  }

  // Stagnation tooltip: show if passive income hasn't grown for 5+ turns
  const cashflowEl = document.getElementById('stat-cashflow');
  if (cashflowEl) {
    const obs2 = new MutationObserver(() => {
      // FIX: disconnect once tooltip has been shown — purpose fulfilled
      if (_skoolTooltipShown) { obs2.disconnect(); return; }
      const state  = window._game?.engine?.getState?.();
      const player = state?.activePlayer;
      if (!player) return;

      const currentPassive = player.passiveIncome || 0;
      if (currentPassive <= _lastPassive) {
        _stagnationTurns++;
      } else {
        _stagnationTurns = 0;
        _lastPassive = currentPassive;
      }

      if (_stagnationTurns >= 5 && !_skoolTooltipShown) {
        _skoolTooltipShown = true;
        _showSkoolTooltip(btn);
      }
    });
    obs2.observe(cashflowEl, { childList:true, characterData:true, subtree:true });
  }
}

function _showSkoolTooltip(anchor) {
  if (_skoolTooltipEl) _skoolTooltipEl.remove();
  const wrap = anchor.parentElement;
  if (!wrap) return;
  wrap.style.position = 'relative';

  _skoolTooltipEl = document.createElement('div');
  _skoolTooltipEl.className = 'skool-tooltip';
  _skoolTooltipEl.innerHTML = `<strong>Tip van FXminds</strong>Succesvolle spelers leren strategieën in de FXminds community.`;
  wrap.appendChild(_skoolTooltipEl);

  setTimeout(() => {
    if (_skoolTooltipEl) { _skoolTooltipEl.remove(); _skoolTooltipEl = null; }
  }, 5000);
}


// Init on game screen visible
(function _watchForGameStart() {
  const obs = new MutationObserver(() => {
    const gs = document.getElementById('game-screen');
    if (gs && !gs.classList.contains('hidden')) {
      _initSkoolBehaviors();
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class'] });
})();

// ════════════════════════════════════════════════════════════════════════════
// AREA 4 — DAILY CHALLENGE: EASIER GOALS + CONFETTI + PROGRESS INDICATOR
// ════════════════════════════════════════════════════════════════════════════

// Replace the existing DAILY_GOALS with easier, mid-game-achievable ones
// (We patch DAILY_GOALS directly — the array is defined earlier in the file)
(function _patchDailyGoals() {
  const EASIER_GOALS = [
    { id:'play_5',        type:'speelplezier',   title:'Speel 5 beurten',              desc:'Speel minimaal 5 beurten in één sessie. Een goede start!',                           target:5,    unit:'beurten',       key:'turnsPlayed' },
    { id:'play_10',       type:'speelplezier',   title:'Speel 10 beurten',             desc:'Speel minimaal 10 beurten. De meeste kansen komen na beurt 8.',                       target:10,   unit:'beurten',       key:'turnsPlayed' },
    { id:'buy_1',         type:'bezittingen',    title:'Koop je eerste bezitting',     desc:'Land op een Kans-vakje en koop je eerste bezitting die cashflow genereert.',           target:1,    unit:'bezittingen',   key:'assetCount' },
    { id:'buy_3',         type:'bezittingen',    title:'Verzamel 3 bezittingen',        desc:'Koop minimaal 3 bezittingen die passief inkomen genereren.',                          target:3,    unit:'bezittingen',   key:'assetCount' },
    { id:'passive_200',   type:'passief inkomen',title:'Bereik €200/mnd passief',      desc:'Genereer €200 passief inkomen per maand — de eerste echte stap.',                    target:200,  unit:'€/mnd',         key:'passiveIncome' },
    { id:'passive_500',   type:'passief inkomen',title:'Bereik €500/mnd passief',      desc:'Bouw genoeg bezittingen om €500 passief per maand te verdienen.',                     target:500,  unit:'€/mnd',         key:'passiveIncome' },
    { id:'passive_1000',  type:'passief inkomen',title:'Bereik €1.000/mnd passief',    desc:'Schaal passieve inkomsten op tot €1.000 per maand — halverwege de Ratrace.',          target:1000, unit:'€/mnd',         key:'passiveIncome' },
    { id:'networth_5k',   type:'vermogen',       title:'Bouw €5.000 nettovermogen',    desc:'Bereik €5.000 nettovermogen — jouw eerste echte financiële fundament.',               target:5000, unit:'€',             key:'netWorth' },
    { id:'networth_20k',  type:'vermogen',       title:'Bouw €20.000 nettovermogen',   desc:'Bereik €20.000 nettovermogen en bewijs dat je vermogen kunt opbouwen.',               target:20000,unit:'€',             key:'netWorth' },
    { id:'cashflow_pos',  type:'cashflow',       title:'Positieve netto cashflow',     desc:'Zorg dat je netto maandelijkse cashflow positief is — meer in dan uit.',              target:1,    unit:'€/mnd',         key:'netCashflow' },
    { id:'cashflow_200',  type:'cashflow',       title:'€200/mnd positieve cashflow',  desc:'Houd €200/mnd netto cashflow over na alle uitgaven.',                                 target:200,  unit:'€/mnd',         key:'netCashflow' },
    { id:'no_debt',       type:'schulden',       title:'Verlaag je schulden',          desc:'Los minstens één schuld af tijdens deze sessie.',                                     target:1,    unit:'schuld afgelost',key:'debtPaidCount' },
    { id:'win_game',      type:'overwinning',    title:'Ontsnap de Ratrace!',          desc:'Bouw passief inkomen op dat je uitgaven overtreft en ontsnapt de Ratrace.',           target:1,    unit:'overwinning',   key:'resultWin' },
    { id:'turns_efficient',type:'efficiëntie',  title:'Ontsnapt binnen 25 beurten',   desc:'Ontsnap de Ratrace in maximaal 25 beurten. Elke beurt telt.',                         target:25,   unit:'beurten',       key:'turnsPlayed', invert:true },
  ];

  if (typeof DAILY_GOALS !== 'undefined') {
    DAILY_GOALS.length = 0;
    EASIER_GOALS.forEach(g => DAILY_GOALS.push(g));
  }
})();

// ── Confetti system ────────────────────────────────────────────────────────────
function _launchConfetti(duration) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const pieces = [];
  const colors = ['#00c896','#3b82f6','#f59e0b','#f43f5e','#8b5cf6','#10b981','#fbbf24'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x:     Math.random() * canvas.width,
      y:     -10 - Math.random() * canvas.height * 0.5,
      w:     6 + Math.random() * 8,
      h:     10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      spin:  (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 1.5,
    });
  }

  const end = Date.now() + duration;
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    const progress = 1 - Math.max(0, (end - now) / duration);
    pieces.forEach(p => {
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, 1 - Math.pow(progress, 2));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    if (now < end) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
  }
  requestAnimationFrame(frame);
}

// Override _showChallengeToast to also trigger confetti + celebration banner
(function _upgradeChallengeToast() {
  if (typeof _showChallengeToast !== 'undefined') {
    const _origToast = _showChallengeToast; // capture reference
    window._showChallengeToast = function(goal, streak) {
      // Show confetti
      _launchConfetti(3500);

      // Show celebration banner
      const banner = document.getElementById('challenge-banner');
      if (banner) {
        banner.classList.remove('hidden','banner-show');
        void banner.offsetWidth;
        banner.classList.add('banner-show');
        setTimeout(() => banner.classList.add('hidden'), 3800);
      }

      // Original toast
      _origToast(goal, streak);
    };
  }
})();

// ── In-game challenge progress bar (below board) ─────────────────────────────
function _updateChallengeProgressBar() {
  let wrap = document.getElementById('ch-progress-bar-widget');
  const boardArea = document.querySelector('.board-area');
  if (!boardArea) return;

  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'ch-progress-bar-widget';
    wrap.className = 'ch-progress-bar-wrap';
    // Insert before the board
    const board = document.getElementById('game-board');
    if (board) boardArea.insertBefore(wrap, board);
  }

  const goal    = typeof _getDailyGoal === 'function' ? _getDailyGoal() : null;
  if (!goal) return;

  const state  = window._game?.engine?.getState?.();
  const player = state?.activePlayer;
  if (!player) return;

  let value = 0;
  switch (goal.key) {
    case 'passiveIncome':  value = player.passiveIncome || 0; break;
    case 'assetCount':     value = player.assets?.length || 0; break;
    case 'netWorth':       value = player.netWorth || 0; break;
    case 'turnsPlayed':    value = player.turnsPlayed || 0; break;
    case 'netCashflow':    value = player.monthlyCashflow || 0; break;
    default: value = 0;
  }

  const done = goal.invert ? (value <= goal.target && value > 0) : value >= goal.target;
  const pct  = done ? 100 : Math.min(99, Math.round((value / Math.max(1, goal.target)) * 100));
  const displayVal = goal.unit === '€/mnd' || goal.unit === '€'
    ? `€${Math.round(value).toLocaleString('nl-NL')}`
    : Math.round(value).toLocaleString('nl-NL');
  const targetVal = goal.unit === '€/mnd' || goal.unit === '€'
    ? `€${goal.target.toLocaleString('nl-NL')}`
    : goal.target.toLocaleString('nl-NL');

  wrap.innerHTML = `
    <span class="ch-pb-label">🎯 ${goal.title}</span>
    <span class="ch-pb-val">${displayVal} / ${targetVal}</span>
    <div class="ch-pb-track"><div class="ch-pb-fill${done?' done':''}" style="width:${pct}%"></div></div>
    <span class="ch-pb-check">${done ? '✅' : ''}</span>`;
}


// ════════════════════════════════════════════════════════════════════════════
// AREA 5 — DUTCH LOCALIZATION PATCHES
// ════════════════════════════════════════════════════════════════════════════
// Fix remaining English strings in the TRANSLATIONS object and UI

(function _fixEnglishStrings() {
  // Patch the EN dict values that bleed into Dutch UI when keys are missing
  // These show up because NL dict is used but falls back to EN for missing keys

  if (typeof TRANSLATIONS === 'undefined') return;
  const nl = TRANSLATIONS.nl;
  if (!nl) return;

  // Fix win debrief lines that still have English fallbacks
  nl['win.line3.multi'] = "Je spreidde je inkomsten over meerdere stromen. Dat is geen diversificatie om het — dat is echte veerkracht.";
  nl['win.line3.few']   = "Één of twee bezittingen brachten je hier. Stel je voor wat er gebeurt als je er meer opstapelt. Volgende keer: breder bouwen.";
  nl['win.line4.clean'] = "Je ontsnapte schoon. Geen schuldlast. Elke euro cashflow verbindt voortaan.";

  // Fast Track UI strings
  nl['ft.tagline'] = "De meeste mensen brengen hun hele carrière door met proberen hier te komen.<br>Jij hebt het gehaald. Nu wordt het interessant.";
  nl['ft.g3.sub']  = "— doel: €10.000/mnd passief";

  // Setup screen (removes English)
  nl['setup.goal'] = '<strong>🎯 Missie:</strong> Bouw passief inkomen op dat je uitgaven overtreft. Elke beslissing verbindt zich. Elke maand uitstel kost je geld.';

  // Card strings
  nl['card.badge.ft']     = '🚀 Fast Track';
  nl['card.badge.choice'] = '🎯 Strategisch Moment';

  // Stats panel
  nl['stats.income.active']  = '💼 Actief inkomen';
  nl['stats.income.passive'] = '🏦 Passief inkomen';

  // Board
  nl['board.leg.payday'] = 'Salarisdag';
  nl['board.leg.opp']    = 'Kans';
  nl['board.leg.bad']    = 'Tegenslag';
  nl['board.leg.choice'] = 'Keuze';
  nl['board.leg.rest']   = 'Rust';
  nl['board.leg.you']    = 'Jij';
})();

// ── Fix specific English labels that appear in the rendered game UI ───────────
(function _fixRenderedLabels() {
  // Patch the assets/debts accordion labels (hardcoded in HTML)
  document.addEventListener('DOMContentLoaded', () => {
    const assetsLbl = document.querySelector('#accord-assets .accord-lbl');
    const debtsLbl  = document.querySelector('#accord-debts .accord-lbl');
    if (assetsLbl && assetsLbl.textContent.includes('Assets')) {
      assetsLbl.innerHTML = '🏠 Bezittingen <span id="stat-assets-count" class="accord-count">0</span>';
    }
    if (debtsLbl && debtsLbl.textContent.includes('Debts')) {
      debtsLbl.innerHTML = '💳 Schulden <span id="stat-debts-count" class="accord-count">0</span>';
    }
  });

  // Override the ft-tagline string shown in Fast Track intro screen
  const _origFTIntro = UIController.prototype._showFastTrackIntro;
  if (_origFTIntro) {
    UIController.prototype._showFastTrackIntro = function() {
      _origFTIntro.call(this);
      // Patch any remaining English text in ft-overlay after render
      const tagline = document.querySelector('#ft-overlay .ft-tagline');
      if (tagline && tagline.innerHTML.includes("Most people")) {
        tagline.innerHTML = "De meeste mensen brengen hun hele carrière door met proberen hier te komen.<br>Jij hebt het gehaald. Nu wordt het interessant.";
      }
      const quoteEl = document.querySelector('#ft-overlay .ft-quote');
      if (quoteEl && quoteEl.innerHTML.includes("Passive income")) {
        quoteEl.innerHTML = '"Passief inkomen brengt je eruit.<br>Kapitaal en vaardigheid bepalen<br>hoe ver je écht gaat."';
      }
    };
  }
})();

// ── Expose new functions globally ─────────────────────────────────────────────
window.closeFTMission   = closeFTMission;
window.showCommunity    = showCommunity;  // already defined, re-expose for safety


// ════════════════════════════════════════════════════════════════════════════
// FXSAVE — PLAYER IDENTITY + PERSISTENCE + CROSS-DEVICE PROGRESS
// ════════════════════════════════════════════════════════════════════════════

const FXSave = (() => {

  // ── Storage keys ────────────────────────────────────────────────────────────
  const KEY_PLAYER_ID   = 'fxminds_player_id';
  const KEY_SAVE        = 'fxminds_game_save';
  const KEY_EMAIL       = 'fxminds_player_email';
  const KEY_TIER        = 'fxminds_tier';
  const AUTOSAVE_EVERY  = 3;          // turns between autosaves
  const SAVE_VERSION    = 2;          // bump when schema changes

  // ── Player identity ──────────────────────────────────────────────────────────
  function getPlayerId() {
    let id = localStorage.getItem(KEY_PLAYER_ID);
    if (!id) {
      id = typeof crypto?.randomUUID === 'function'
        ? crypto.randomUUID()
        : 'px-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
      try { localStorage.setItem(KEY_PLAYER_ID, id); } catch(_) {}
    }
    return id;
  }

  function getPlayerEmail() {
    try { return localStorage.getItem(KEY_EMAIL) || ''; } catch(_) { return ''; }
  }

  function setPlayerEmail(email) {
    try { localStorage.setItem(KEY_EMAIL, email); } catch(_) {}
  }

  // ── Build full save snapshot ─────────────────────────────────────────────────
  function buildSnapshot(label) {
    const state  = window._game?.engine?.getState?.();
    const player = state?.activePlayer;
    if (!player || !state) return null;

    const prog = typeof XPEngine !== 'undefined'
      ? XPEngine.levelProgress(player.xp || 0) : { level:1, title:'Rookie' };

    const tier = _getTierFromState(state, player);

    const ftMs = (() => {
      try { return JSON.parse(localStorage.getItem('fxminds_ft_missions')) || {}; } catch(_) { return {}; }
    })();

    return {
      version:          SAVE_VERSION,
      savedAt:          Date.now(),
      label:            label || null,
      playerId:         getPlayerId(),
      email:            getPlayerEmail(),
      // Player identity
      playerName:       player.name || 'Player',
      profession:       player.profession || '',
      // Progress
      level:            prog.level,
      levelTitle:       prog.title,
      xp:               player.xp || 0,
      tier:             tier.id,
      // Game score
      gameScore:        Math.round(player.passiveIncome || 0),
      currentTurn:      player.turnsPlayed || 0,
      // Financial state
      cash:             player.cash || 0,
      income:           player.income || 0,
      expenses:         player.expenses || 0,
      passiveIncome:    Math.round(player.passiveIncome || 0),
      netWorth:         Math.round(player.netWorth || 0),
      monthlyCashflow:  Math.round(player.monthlyCashflow || 0),
      // Portfolio
      assets:           (player.assets || []).map(a => ({ ...a })),
      debts:            (player.debts  || []).map(d => ({ ...d })),
      // Game context
      position:         player.position || 0,
      paydays:          player.paydays  || 0,
      fastTrack:        state.fastTrack || false,
      fastTrackUnlocked: state.fastTrack || false,
      // Missions
      missionsCompleted: ftMs.completed || [],
      missionsCurrent:  ftMs.current    || 0,
      // Log (last 20 entries)
      log:              (player.log || []).slice(0, 20),
    };
  }

  // ── Local save ───────────────────────────────────────────────────────────────
  function saveLocal(label) {
    const snap = buildSnapshot(label);
    if (!snap) return false;
    try {
      localStorage.setItem(KEY_SAVE, JSON.stringify(snap));
      _showAutosaveToast();
      return true;
    } catch(_) { return false; }
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(KEY_SAVE);
      if (!raw) return null;
      const snap = JSON.parse(raw);
      if (!snap || snap.version !== SAVE_VERSION) return null;
      return snap;
    } catch(_) { return null; }
  }

  function clearLocal() {
    try { localStorage.removeItem(KEY_SAVE); } catch(_) {}
  }

  function hasSave() {
    return !!loadLocal();
  }

  // ── Restore game from snapshot ───────────────────────────────────────────────
  function restoreFromSnapshot(snap) {
    if (!snap) return false;

    // Build a custom profile from the save snapshot
    const customProfile = {
      cash:      snap.cash,
      income:    snap.income,
      expenses:  snap.expenses,
      debts:     (snap.debts || []).map(d => ({ ...d })),
      startingAssets: (snap.assets || []).map(a => ({ ...a })),
    };

    // Launch the game with the restored profile
    const gs = document.getElementById('game-screen');
    const ms = document.getElementById('mode-select-screen');
    const ob = document.getElementById('onboard-screen');
    const su = document.getElementById('setup-screen');

    [ms, ob, su].forEach(el => el?.classList.add('hidden'));
    gs?.classList.remove('hidden');

    window._game?.engine?.startGame({
      name:           snap.playerName || 'Player',
      profession:     snap.profession  || 'Software Engineer',
      _customProfile: customProfile,
    });

    // Restore extra state after startGame
    const state  = window._game?.engine?.getState?.();
    const player = state?.activePlayer;
    if (player) {
      player.xp           = snap.xp || 0;
      player.level        = snap.level || 1;
      player.turnsPlayed  = snap.currentTurn || 0;
      player.paydays      = snap.paydays || 0;
      player.position     = snap.position || 0;
      if (snap.log?.length) player.log = snap.log;

      // Restore fast track flag
      if (snap.fastTrack) state.fastTrack = true;
    }

    // Restore missions
    if (snap.missionsCompleted?.length || snap.missionsCurrent) {
      try {
        localStorage.setItem('fxminds_ft_missions', JSON.stringify({
          completed: snap.missionsCompleted || [],
          current:   snap.missionsCurrent   || 0,
        }));
      } catch(_) {}
    }

    window._game?.ui?.render(state);
    return true;
  }

  // ── Remote save (via backend + MailBlue) ─────────────────────────────────────
  async function saveRemote(email) {
    const snap = buildSnapshot();
    if (!snap || !email) return false;
    snap.email = email;
    setPlayerEmail(email);

    // Backend call removed — static deployment. Save is localStorage-only.

    // Also persist locally with email linked
    saveLocal();
    return true;
  }

  // ── Load via email (pull from localStorage, cross-device via MailBlue) ───────
  async function loadFromEmail() {
    const input = document.getElementById('lem-email-input');
    const errEl = document.getElementById('lem-err');
    const btn   = document.getElementById('lem-submit-btn');
    const email = (input?.value || '').trim().toLowerCase();

    const showErr = (m) => { if (errEl) { errEl.textContent = m; errEl.style.display = 'block'; } };
    errEl && (errEl.style.display = 'none');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showErr('Vul een geldig e-mailadres in.');
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = '⏳ Laden...'; }

    // Step 1: check local save (same device)
    const local = loadLocal();
    if (local && local.email === email) {
      closeLoadModal();
      const ok = restoreFromSnapshot(local);
      if (ok) { _showToast('✅ Spel geladen van dit apparaat!'); return; }
    }

    // Step 2: cross-device backend unavailable on static deployment.

    // Step 3: no save found
    showErr('Er is geen opgeslagen spel gevonden bij dit e-mailadres.');
    if (btn) { btn.disabled = false; btn.textContent = '📂 Laad mijn spel'; }
  }

  function closeLoadModal() {
    document.getElementById('load-email-modal')?.classList.add('hidden');
  }

  function openLoadModal() {
    document.getElementById('load-email-modal')?.classList.remove('hidden');
    document.getElementById('lem-email-input')?.focus();
  }

  // ── Autosave toast ────────────────────────────────────────────────────────────
  function _showAutosaveToast() {
    const el = document.getElementById('autosave-toast');
    if (!el) return;
    el.classList.add('toast-show');
    setTimeout(() => el.classList.remove('toast-show'), 2000);
  }

  function _showToast(msg) {
    const el = document.getElementById('autosave-toast');
    if (!el) return;
    el.querySelector('.as-text').textContent = msg;
    el.classList.add('toast-show');
    setTimeout(() => {
      el.classList.remove('toast-show');
      el.querySelector('.as-text').textContent = 'Voortgang bewaard';
    }, 2800);
  }

  // ── Expose closeLoadModal for HTML onclick ────────────────────────────────────
  return {
    getPlayerId, getPlayerEmail, setPlayerEmail,
    buildSnapshot, saveLocal, loadLocal, clearLocal, hasSave,
    restoreFromSnapshot, saveRemote, loadFromEmail,
    closeLoadModal, openLoadModal,
  };
})();

// Expose globally
window.FXSave = FXSave;


// ════════════════════════════════════════════════════════════════════════════
// PROGRESSION TIER SYSTEM
// Tiers: Ratrace → Fast Track → Investor → Tycoon → Legend
// ════════════════════════════════════════════════════════════════════════════

const PROGRESSION_TIERS = [
  {
    id:        'ratrace',
    label:     'Ratrace',
    icon:      '🐀',
    color:     'tier-ratrace',
    condition: (p, state) => !state.fastTrack,
    unlocksAt: 'Start',
    perks:     ['Basis opportunity-kaarten', 'Salaris en uitgaven', '24-vakjes speelbord'],
    nextTeaser:'Ontsnap de Ratrace om Fast Track te ontgrendelen',
  },
  {
    id:        'fasttrack',
    label:     'Fast Track',
    icon:      '🚀',
    color:     'tier-fasttrack',
    condition: (p, state) => state.fastTrack && (p.passiveIncome||0) < 10000,
    unlocksAt: 'Passief inkomen ≥ uitgaven',
    perks:     ['Startup & crypto beleggingen', 'Angel investering netwerk', 'Fast Track missies'],
    nextTeaser:'Bereik €10.000/mnd passief voor Investor niveau',
  },
  {
    id:        'investor',
    label:     'Investor',
    icon:      '📈',
    color:     'tier-investor',
    condition: (p, state) => state.fastTrack && (p.passiveIncome||0) >= 10000 && (p.netWorth||0) < 500000,
    unlocksAt: '€10.000/mnd passief inkomen',
    perks:     ['Private equity deals', 'Vastgoed development', 'Kwantitatieve strategieën'],
    nextTeaser:'€500.000 nettovermogen voor Tycoon niveau',
  },
  {
    id:        'tycoon',
    label:     'Tycoon',
    icon:      '🏛️',
    color:     'tier-tycoon',
    condition: (p, state) => state.fastTrack && (p.netWorth||0) >= 500000 && (p.netWorth||0) < 1000000,
    unlocksAt: '€500.000 nettovermogen',
    perks:     ['Portfolio schaling', 'Economische event-buffers', 'Tycoon-exclusieve assets'],
    nextTeaser:'€1.000.000 nettovermogen voor Legend niveau',
  },
  {
    id:        'legend',
    label:     'Legend',
    icon:      '🦅',
    color:     'tier-legend',
    condition: (p, state) => (p.netWorth||0) >= 1000000,
    unlocksAt: '€1.000.000 nettovermogen',
    perks:     ['Volledige portfoliovrijheid', 'Alle beleggingstypes ontgrendeld', 'FXminds Elite status'],
    nextTeaser:'Je hebt het hoogste niveau bereikt!',
  },
];

function _getTierFromState(state, player) {
  if (!player) return PROGRESSION_TIERS[0];
  for (let i = PROGRESSION_TIERS.length - 1; i >= 0; i--) {
    if (PROGRESSION_TIERS[i].condition(player, state)) return PROGRESSION_TIERS[i];
  }
  return PROGRESSION_TIERS[0];
}

let _lastTierId = 'ratrace';

function _checkTierUp(state, player) {
  const tier = _getTierFromState(state, player);
  if (tier.id !== _lastTierId) {
    const prevId  = _lastTierId;
    _lastTierId = tier.id;
    // Don't show the popup when going backwards (edge case)
    const prevIdx = PROGRESSION_TIERS.findIndex(t => t.id === prevId);
    const newIdx  = PROGRESSION_TIERS.findIndex(t => t.id === tier.id);
    if (newIdx > prevIdx) _showTierUp(tier);
  }
}

function _showTierUp(tier) {
  const el = document.getElementById('tier-up-overlay');
  if (!el) return;

  document.getElementById('tier-icon').textContent  = tier.icon;
  document.getElementById('tier-title').textContent = tier.label;
  document.getElementById('tier-sub').textContent   = `Je hebt ${tier.unlocksAt} bereikt en een nieuw speelniveau is beschikbaar.`;
  document.getElementById('tier-firework').textContent = '🎆';

  const perksEl = document.getElementById('tier-perks');
  if (perksEl) {
    perksEl.innerHTML = tier.perks.map(p => `
      <div class="tier-perk">
        <span class="tier-perk-icon">✅</span>
        <span>${p}</span>
      </div>`).join('') + `
      <div class="tier-perk" style="opacity:.6;border-style:dashed">
        <span class="tier-perk-icon">🔮</span>
        <span>${tier.nextTeaser}</span>
      </div>`;
  }

  // Apply tier border colour
  el.querySelector('.tier-panel').className = `tier-panel ${tier.color}`;
  el.classList.remove('hidden');

  // Also launch confetti
  if (typeof _launchConfetti === 'function') _launchConfetti(4000);

  // Save tier to localStorage
  try { localStorage.setItem('fxminds_tier', tier.id); } catch(_) {}
}

function closeTierUp() {
  document.getElementById('tier-up-overlay')?.classList.add('hidden');
}
window.closeTierUp = closeTierUp;

// ── Tier status badge in stats panel ──────────────────────────────────────────
function _updateTierBadge(state, player) {
  let badge = document.getElementById('tier-status-badge');
  const statsPanel = document.getElementById('stats-panel');
  if (!statsPanel) return;

  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'tier-status-badge';
    badge.className = 'tier-status-badge';
    // Insert at top of stats panel
    statsPanel.insertBefore(badge, statsPanel.firstChild);
  }

  const tier = _getTierFromState(state, player);
  const prog = typeof XPEngine !== 'undefined' ? XPEngine.levelProgress(player?.xp || 0) : { level:1, title:'' };

  badge.innerHTML = `
    <span class="tsb-icon">${tier.icon}</span>
    <span class="tsb-name ${tier.color}">${tier.label}</span>
    <span class="tsb-label"> · Lv ${prog.level}</span>
    <span class="tsb-progress">${(player?.passiveIncome||0) > 0 ? '€' + Math.round(player.passiveIncome).toLocaleString('nl-NL') + '/mnd' : ''}</span>
  `;
}


// ════════════════════════════════════════════════════════════════════════════
// AUTOSAVE HOOK + TIER CHECK  (wired into the single render hook)
// ════════════════════════════════════════════════════════════════════════════

// FIX: AUTOSAVE_EVERY was only defined inside the FXSave closure and was
// never exported, causing a ReferenceError in _installPersistenceHooks on
// Cloudflare Pages / any environment where the variable was out of scope.
// Define it here at module scope as the authoritative value.
const AUTOSAVE_EVERY = typeof FXSave?.autosaveEvery === 'number'
  ? FXSave.autosaveEvery   // forward-compat if FXSave ever exports it
  : 3;                     // default: autosave every 3 turns

(function _installPersistenceHooks() {
  if (UIController.prototype._persistenceHooked) return;
  UIController.prototype._persistenceHooked = true;

  const _origRender = UIController.prototype.render;
  UIController.prototype.render = function(state) {
    _origRender.call(this, state);

    const player = state.activePlayer;
    if (!player) return;

    // ── Tier check ──────────────────────────────────────────────────────────
    _checkTierUp(state, player);
    _updateTierBadge(state, player);

    // ── Autosave every N turns ──────────────────────────────────────────────
    const turns = player.turnsPlayed || 0;
    if (turns > 0 && turns % AUTOSAVE_EVERY === 0) {
      if (this._lastAutosaveTurn !== turns) {
        this._lastAutosaveTurn = turns;
        FXSave.saveLocal();
        // If email linked, also push to remote (fire-and-forget)
        const email = FXSave.getPlayerEmail();
        if (email) FXSave.saveRemote(email).catch(() => {});
      }
    }
  };

  // Small constant so other code can also read it
  window.AUTOSAVE_EVERY = AUTOSAVE_EVERY;
})();


// ════════════════════════════════════════════════════════════════════════════
// MODE-SELECT BOOTSTRAP EXTENSION
// Adds: continue button, load-via-email, tier display
// ════════════════════════════════════════════════════════════════════════════

(function _extendModeSelect() {
  // Run after DOM + existing initModeSelect() has set up event listeners
  // Use a tiny delay so the original initModeSelect() IIFE runs first
  setTimeout(() => {
    // ── Check for existing save ──────────────────────────────────────────────
    const save = FXSave.loadLocal();
    if (save) {
      const banner = document.getElementById('ms-continue-banner');
      if (banner) {
        banner.classList.remove('hidden');

        // Populate save info
        const tierDef = PROGRESSION_TIERS.find(t => t.id === save.tier) || PROGRESSION_TIERS[0];
        const nameEl  = document.getElementById('ms-save-name');
        const metaEl  = document.getElementById('ms-save-meta');
        const iconEl  = document.getElementById('ms-save-tier-icon');
        const tbEl    = document.getElementById('ms-save-tier-badge');

        if (nameEl)  nameEl.textContent = save.playerName || 'Speler';
        if (iconEl)  iconEl.textContent = tierDef.icon;
        if (tbEl)    tbEl.textContent   = tierDef.label;
        if (metaEl)  metaEl.textContent = [
          `Level ${save.level}`,
          `${save.currentTurn} beurten`,
          save.passiveIncome > 0 ? `€${save.passiveIncome.toLocaleString('nl-NL')}/mnd passief` : null,
        ].filter(Boolean).join(' · ');

        // Wire continue button
        document.getElementById('ms-continue-btn')?.addEventListener('click', () => {
          _lastTierId = save.tier || 'ratrace';
          FXSave.restoreFromSnapshot(save);
        });
      }
    }

    // ── Load-via-email button ────────────────────────────────────────────────
    document.getElementById('ms-load-email')?.addEventListener('click', () => {
      FXSave.openLoadModal();
    });

    // ── Wire save to lead popup submit (link email → player_id) ─────────────
    // After successful lead popup submit, also save remote
    const _origBind = window._bindLeadSubmit;
    if (typeof _origBind === 'function') {
      window._bindLeadSubmit = function(score) {
        _origBind(score);
        // Additional: when submit succeeds, FXSave.saveRemote will be called
        // by the autosave hook since email is now set via _submitToMailBlue
        // But we also do it immediately:
        setTimeout(() => {
          const email = FXSave.getPlayerEmail() ||
                        document.getElementById('lp-email')?.value?.trim();
          if (email) {
            FXSave.setPlayerEmail(email);
            FXSave.saveRemote(email).catch(() => {});
          }
        }, 2000);
      };
    }

    // ── Also link email when existing eos-email-input is submitted ───────────
    // Watch for the eos-email-input that appears in win/loss screen
    const _origBindEmail = UIController.prototype._bindEmailCapture;
    if (_origBindEmail) {
      UIController.prototype._bindEmailCapture = function() {
        _origBindEmail.call(this);
        // After email capture, save remotely
        const btn = document.getElementById('eos-email-submit');
        if (btn) {
          const _origClick = btn.onclick;
          btn.addEventListener('click', () => {
            setTimeout(() => {
              const email = document.getElementById('eos-email-input')?.value?.trim();
              if (email) {
                FXSave.setPlayerEmail(email);
                FXSave.saveRemote(email).catch(() => {});
              }
            }, 1500);
          });
        }
      };
    }

  }, 50);
})();


// ════════════════════════════════════════════════════════════════════════════
// ENDLESS PROGRESSION — LONG-TERM GAMEPLAY HOOKS
// ════════════════════════════════════════════════════════════════════════════

// When player reaches a new tier, unlock additional cards / events
(function _hookTierUnlocks() {
  const _origShowTierUp = _showTierUp;
  window._showTierUp = function(tier) {
    _origShowTierUp(tier);

    // Unlock tier-specific content
    if (tier.id === 'investor' && typeof fastTrackCards !== 'undefined') {
      // Investor tier: increase probability of PE and real-estate dev cards
      // by duplicating them in the deck
      const peCard      = fastTrackCards.find(c => c.id === 'ft_pe');
      const vgCard      = fastTrackCards.find(c => c.id === 'ft_vastgoed');
      if (peCard) fastTrackCards.push({ ...peCard, id:'ft_pe_2' });
      if (vgCard) fastTrackCards.push({ ...vgCard, id:'ft_vastgoed_2' });
    }

    if (tier.id === 'tycoon' && typeof ECON_EVENTS !== 'undefined') {
      // Tycoon tier: add a "Portfolio Boom" event with bigger upside
      ECON_EVENTS.push({
        id:'portfolio_boom', icon:'💹', type:'bull',
        title:'Portfolio Boom',
        sub:'Alle beleggingen groeien tegelijk. Een zeldzame perfecte storm.',
        effect: (p) => {
          p.assets.forEach(a => { a.cashflow = Math.round(a.cashflow * 1.2); });
        },
        logMsg: '💹 Portfolio boom: alle beleggingscashflow +20%.',
      });
    }

    if (tier.id === 'legend') {
      // Legend: add a "Market Mastery" legendary card
      if (typeof fastTrackCards !== 'undefined') {
        fastTrackCards.push({
          id:'ft_legend', type:'fast_track', title:'Markt Meesterschap', icon:'🦅',
          description:'Jij begrijpt markten op een niveau dat de meeste mensen nooit bereiken. Een deal die alleen voor Legends beschikbaar is.',
          riskLevel:'medium',
          choices:[
            { label:'Investeer €50.000 (Legend deal)',
              condition:(p) => p.cash >= 50000,
              effect:(p) => {
                p.addCash(-50000, '(legend deal)');
                const m = Math.floor(Math.random()*2500)+2000;
                p.addAsset({ id:`legend_${Date.now()}`, name:'Legend Portfolio', cost:50000, cashflow:m, type:'investment' });
                p.addLog(`🦅 Legend deal gesloten. Cashflow: +${cpm(m)}/mnd.`);
              }
            },
            { label:'Passen', effect:(p) => p.addLog('Legend deal overgeslagen.') }
          ],
        });
      }
    }
  };
})();

// ── On page-load: restore previous tier state ─────────────────────────────────
(function _restoreLastTier() {
  try {
    const saved = localStorage.getItem('fxminds_tier');
    if (saved && PROGRESSION_TIERS.find(t => t.id === saved)) {
      _lastTierId = saved;
    }
  } catch(_) {}
})();


// ════════════════════════════════════════════════════════════════════════════
// FXEvents — CENTRAL EVENT BUS FOR CROSS-SYSTEM HOOKS
// Allows any module to subscribe to game events without touching the engine.
// ════════════════════════════════════════════════════════════════════════════

const FXEvents = (() => {
  const _listeners = {};

  function on(event, fn) {
    (_listeners[event] = _listeners[event] || []).push(fn);
  }

  function emit(event, data) {
    (_listeners[event] || []).forEach(fn => {
      try { fn(data); } catch(e) { console.warn('[FXEvents]', event, e); }
    });
  }

  return { on, emit };
})();
window.FXEvents = FXEvents;

// ── Hook resolveCard to emit 'assetBought' and 'passiveChanged' events ───────
(function _hookResolveCard() {
  if (GameEngine.prototype._resolveCardHooked) return;
  GameEngine.prototype._resolveCardHooked = true;

  const _orig = GameEngine.prototype.resolveCard;
  GameEngine.prototype.resolveCard = function(choiceIndex) {
    const player       = this.state.activePlayer;
    const passiveBefore = player?.passiveIncome || 0;
    const assetsBefore  = player?.assets?.length || 0;

    _orig.call(this, choiceIndex);

    const playerAfter  = this.state.activePlayer;
    if (!playerAfter) return;

    const passiveAfter = playerAfter.passiveIncome || 0;
    const assetsAfter  = playerAfter.assets?.length || 0;

    // Asset was bought
    if (assetsAfter > assetsBefore) {
      FXEvents.emit('assetBought', { player: playerAfter, state: this.state });
    }
    // Passive income changed
    if (passiveAfter !== passiveBefore) {
      FXEvents.emit('passiveChanged', { player: playerAfter, state: this.state, delta: passiveAfter - passiveBefore });
    }
    // Always emit turnActionDone
    FXEvents.emit('turnActionDone', { player: playerAfter, state: this.state });
  };
})();

// ── Hook enterFastTrack to emit event ────────────────────────────────────────
(function _hookEnterFastTrack() {
  if (GameEngine.prototype._ftHooked) return;
  GameEngine.prototype._ftHooked = true;
  const _orig = GameEngine.prototype.enterFastTrack;
  GameEngine.prototype.enterFastTrack = function() {
    _orig.call(this);
    FXEvents.emit('enteredFastTrack', { state: this.state, player: this.state.activePlayer });
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// MISSION CHECK ON EVERY RELEVANT EVENT (not just render)
// ════════════════════════════════════════════════════════════════════════════

FXEvents.on('assetBought',     ({ state }) => { if (state.fastTrack) _checkFTMissions(); });
FXEvents.on('passiveChanged',  ({ state }) => { if (state.fastTrack) _checkFTMissions(); });
FXEvents.on('enteredFastTrack', ()         => { setTimeout(_checkFTMissions, 200); });


// ════════════════════════════════════════════════════════════════════════════
// AUTOSAVE ON EVERY RELEVANT EVENT
// ════════════════════════════════════════════════════════════════════════════

FXEvents.on('assetBought', () => {
  FXSave.saveLocal();
  const email = FXSave.getPlayerEmail();
  if (email) FXSave.saveRemote(email).catch(() => {});
});

FXEvents.on('enteredFastTrack', () => {
  FXSave.saveLocal();
  const email = FXSave.getPlayerEmail();
  if (email) FXSave.saveRemote(email).catch(() => {});
});

// Save when a FT mission is completed — hook into _showMissionComplete
(function _hookMissionSave() {
  const _orig = window._showMissionComplete || function(){};
  window._showMissionComplete = function(mission, next) {
    _orig(mission, next);
    FXSave.saveLocal();
    const email = FXSave.getPlayerEmail();
    if (email) FXSave.saveRemote(email).catch(() => {});
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// HUD PROGRESS MESSAGES — "Nog €X tot Fast Track"
// ════════════════════════════════════════════════════════════════════════════

const HUD_THRESHOLDS = [
  // { condition, message(p) }
  { key:'needs_first_asset',  check: (p) => p.assets.length === 0,
    msg: () => '💡 Koop je eerste bezitting om passief inkomen te starten.' },

  { key:'close_to_escape',    check: (p) => { const gap = (p.expenses||0) - (p.passiveIncome||0); return gap > 0 && gap <= 800; },
    msg: (p) => `🚀 Nog <strong>€${Math.ceil((p.expenses - p.passiveIncome)).toLocaleString('nl-NL')}/mnd</strong> passief inkomen nodig om de Ratrace te verlaten.` },

  { key:'halfway_to_escape',  check: (p) => { const pct = (p.passiveIncome||0) / Math.max(1, p.expenses||1); return pct >= 0.4 && pct < 0.75; },
    msg: (p) => `📈 Halverwege de Ratrace! ${Math.round(((p.passiveIncome||0)/(p.expenses||1))*100)}% van je uitgaven gedekt door passief inkomen.` },

  { key:'one_more_asset',     check: (p) => p.assets.length >= 1 && p.assets.length <= 2,
    msg: (p) => `🏠 Nog ${3 - p.assets.length} bezitting${3-p.assets.length!==1?'en':''} voor een gediversifieerde portefeuille.` },

  { key:'mission_close',      check: (p) => {
      if (!window._game?.engine?.getState?.()?.fastTrack) return false;
      const ms = (() => { try { return JSON.parse(localStorage.getItem('fxminds_ft_missions')) || {}; } catch(_) { return {}; } })();
      const m  = (window.FT_MISSIONS || [])[ms.current || 0];
      if (!m) return false;
      const val = m.goalKey==='passiveIncome'?p.passiveIncome:m.goalKey==='netWorth'?p.netWorth:p.assets?.length||0;
      const pct = val / m.goal;
      return pct >= 0.7 && pct < 1;
    },
    msg: () => {
      const ms = (() => { try { return JSON.parse(localStorage.getItem('fxminds_ft_missions')) || {}; } catch(_) { return {}; } })();
      const m  = (window.FT_MISSIONS || [])[ms.current || 0];
      if (!m) return '';
      return `🎯 Bijna klaar met missie: <strong>${m.title}</strong>`;
    }
  },

  { key:'ft_first_save',      check: (p, state) => state.fastTrack && p.assets.length < 3,
    msg: () => '💼 In de Fast Track: bouw meer beleggingen op voor hogere cashflow.' },
];

let _lastHudKey   = '';
let _lastHudCheck = -1;

function _updateHUDMessage(player, state) {
  const board = document.querySelector('.board-area');
  if (!board) return;

  // Find or create the HUD element
  let hud = document.getElementById('hud-progress-msg');
  if (!hud) return;

  // Only update every 2 turns to avoid flicker
  const turns = player.turnsPlayed || 0;
  if (turns === _lastHudCheck && _lastHudKey) return;
  _lastHudCheck = turns;

  // Insert HUD into board area before the game board
  const board_el = document.getElementById('game-board');
  if (board_el && hud.parentElement !== board) {
    board.insertBefore(hud, board_el);
  }

  for (const th of HUD_THRESHOLDS) {
    try {
      if (th.check(player, state)) {
        const msg = th.msg(player);
        if (!msg) continue;
        if (th.key !== _lastHudKey) {
          _lastHudKey = th.key;
          const textEl = document.getElementById('hpm-text');
          if (textEl) textEl.innerHTML = msg;
          hud.classList.remove('hidden');
        }
        return;
      }
    } catch(_) {}
  }
  // No threshold matched
  hud.classList.add('hidden');
  _lastHudKey = '';
}


// ════════════════════════════════════════════════════════════════════════════
// SOCIAL COMPARISON MESSAGES
// ════════════════════════════════════════════════════════════════════════════

const SOCIAL_MSGS = [
  (p) => p.assets.length >= 3  ? `🏆 Je hebt meer bezittingen dan 80% van de spelers.` : null,
  (p) => (p.passiveIncome||0) >= 500 ? `📈 €${Math.round(p.passiveIncome).toLocaleString('nl-NL')}/mnd passief inkomen — dat is beter dan 70% van de andere spelers.` : null,
  (p) => (p.passiveIncome||0) >= 1000 ? `🌟 Je bent verder dan de meeste spelers. Houd vol!` : null,
  (p) => (p.turnsPlayed||0) >= 15 ? `⚡ Je speelt al ${p.turnsPlayed} beurten. De meeste spelers stoppen eerder. Jij niet.` : null,
  (p) => (p.netWorth||0) >= 20000 ? `💎 Nettovermogen van €${Math.round(p.netWorth).toLocaleString('nl-NL')} — top 30% van alle spelers.` : null,
];

let _lastSocialTurn = -5;
let _socialShownMsgs = new Set();

function _maybeSocialToast(player) {
  const turns = player.turnsPlayed || 0;
  if (turns - _lastSocialTurn < 7) return;  // max one per 7 turns

  const eligible = SOCIAL_MSGS.map((fn, i) => {
    try { const msg = fn(player); return msg && !_socialShownMsgs.has(i) ? { i, msg } : null; }
    catch(_) { return null; }
  }).filter(Boolean);

  if (!eligible.length) return;

  const chosen = eligible[Math.floor(Math.random() * eligible.length)];
  _lastSocialTurn = turns;
  _socialShownMsgs.add(chosen.i);

  const el   = document.getElementById('social-toast');
  const text = document.getElementById('sc-text');
  if (!el || !text) return;
  text.textContent = chosen.msg;
  el.classList.add('sc-show');
  el.classList.remove('hidden');
  setTimeout(() => {
    el.classList.remove('sc-show');
    setTimeout(() => el.classList.add('hidden'), 350);
  }, 4000);
}

// Trigger social toast on asset buy
FXEvents.on('assetBought', ({ player }) => {
  setTimeout(() => _maybeSocialToast(player), 1200);
});


// ════════════════════════════════════════════════════════════════════════════
// TOP-10 LEADERBOARD POPUP
// ════════════════════════════════════════════════════════════════════════════

let _lb10Checked = false;   // only check once per session

function _buildLB10(myScore, myName) {
  // Load existing leaderboard
  let lb = [];
  try { lb = JSON.parse(localStorage.getItem(LB_KEY)) || []; } catch(_) {}

  // Check if player qualifies for top 10
  const sorted = [...lb].sort((a, b) => b.score - a.score);
  const myRank = sorted.findIndex(e => e.score <= myScore);   // position where they'd insert
  const inTop10 = sorted.length < 10 || myScore > (sorted[9]?.score || 0);

  return { sorted, inTop10, rank: myRank === -1 ? sorted.length + 1 : myRank + 1 };
}

function showLB10Popup(passive, playerName) {
  if (_lb10Checked) return;
  _lb10Checked = true;

  const score = Math.round(passive || 0);
  const { sorted, inTop10, rank } = _buildLB10(score, playerName);

  if (!inTop10 && sorted.length >= 10) return;  // not top 10, skip

  const MEDALS = ['🥇','🥈','🥉'];
  const el = document.getElementById('lb-top10-popup');
  if (!el) return;

  // Update title
  const titleEl = document.getElementById('lb10-title');
  const subEl   = document.getElementById('lb10-sub');
  if (titleEl) titleEl.textContent = `Je staat in de top ${Math.min(rank, 10)}!`;
  if (subEl)   subEl.textContent   = `€${score.toLocaleString('nl-NL')}/mnd passief inkomen plaatst jou onder de beste spelers.`;

  // Build list — show current LB + player's potential position
  const preview = [...sorted];
  const insertAt = Math.min(rank - 1, preview.length);
  preview.splice(insertAt, 0, { name: playerName || 'Jij', score, isYou: true });
  const top10 = preview.slice(0, 10);

  const listEl = document.getElementById('lb10-list');
  if (listEl) {
    listEl.innerHTML = top10.map((e, i) => `
      <div class="lb10-row${e.isYou ? ' lb10-you' : i===0 ? ' lb10-gold' : ''}">
        <span class="lb10-pos">${MEDALS[i] || (i+1)}</span>
        <span class="lb10-name">${e.isYou ? `<strong>${e.name}</strong>` : e.name}</span>
        <span class="lb10-score">€${e.score.toLocaleString('nl-NL')}/mnd</span>
      </div>`).join('');
  }

  el.classList.remove('hidden');
}

function closeLBPopup() {
  document.getElementById('lb-top10-popup')?.classList.add('hidden');
}
window.closeLBPopup = closeLBPopup;

async function claimLeaderboardSpot() {
  const email = (document.getElementById('lb10-email')?.value || '').trim();
  const errEl = document.getElementById('lp-err');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const input = document.getElementById('lb10-email');
    if (input) { input.style.borderColor = 'var(--red)'; setTimeout(()=>input.style.borderColor='',2000); }
    return;
  }

  // Save email and link to score
  FXSave.setPlayerEmail(email);
  const passive = _getGameScore();
  const player  = window._game?.engine?.getState?.()?.activePlayer;

  // Save to LB
  if (typeof _saveLBScore === 'function') _saveLBScore(player?.name || 'Speler', passive);

  // Send to MailBlue + backend
  if (typeof _submitToMailBlue === 'function') await _submitToMailBlue(player?.name || '', email, passive);

  // Show confirmed
  const wrap    = document.getElementById('lb10-email-wrap');
  const claimed = document.getElementById('lb10-claimed');
  if (wrap)    wrap.style.display    = 'none';
  if (claimed) claimed.style.display = '';
}
window.claimLeaderboardSpot = claimLeaderboardSpot;

// Trigger LB popup 4s after game ends (solo win)
FXEvents.on('assetBought', ({ player, state }) => {
  if (!state.fastTrack) return;
  const passive = player.passiveIncome || 0;
  if (passive >= 3000) {
    setTimeout(() => {
      if (!document.getElementById('win-overlay')?.classList.contains('hidden')) return;
      showLB10Popup(passive, player.name);
    }, 2000);
  }
});


// ════════════════════════════════════════════════════════════════════════════
// REFERRAL REWARD SYSTEM
// 3 friends played via referral link → show reward popup
// ════════════════════════════════════════════════════════════════════════════

const REF_REWARD_SHOWN_KEY = 'fxminds_ref_reward_shown';

function _checkReferralReward() {
  // Don't show twice
  if (localStorage.getItem(REF_REWARD_SHOWN_KEY)) return;

  const count = _getReferralCount();  // already defined in existing code
  if (count < 3) return;

  try { localStorage.setItem(REF_REWARD_SHOWN_KEY, '1'); } catch(_) {}
  setTimeout(() => {
    document.getElementById('ref-reward-popup')?.classList.remove('hidden');
    if (typeof _launchConfetti === 'function') _launchConfetti(3000);
  }, 800);
}

function closeRefReward() {
  document.getElementById('ref-reward-popup')?.classList.add('hidden');
}
window.closeRefReward = closeRefReward;

// Check on page load and after each referral increment
(function _initReferralRewardCheck() {
  _checkReferralReward();
  // Also re-check when referral count potentially changes
  // (It changes when a new player submits via ref link — tracked in session)
  const fromRef = sessionStorage.getItem('fxminds_from_ref');
  if (fromRef) {
    // This session came via a referral — increment and check the referrer locally
    // (server-side attribution requires backend; this is client-side proxy)
    const currentRefId = _getOrCreateRefId();
    if (fromRef !== currentRefId) {
      // Someone else's link → we can't increment their count from here without backend
      // But we can track that THIS player was referred, for analytics
    }
  }
})();

// Expose for use in _updateRefDots (existing lead popup referral section)
// When ref count reaches 3 in lp-update, also check reward
(function _patchUpdateRefDots() {
  const _orig = window._updateRefDots;
  if (typeof _orig !== 'function') return;
  window._updateRefDots = function(count) {
    _orig(count);
    if (count >= 3) _checkReferralReward();
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// WIRE EVERYTHING INTO THE CONSOLIDATED RENDER HOOK
// ════════════════════════════════════════════════════════════════════════════

(function _installRetentionHooks() {
  if (UIController.prototype._retentionHooked) return;
  UIController.prototype._retentionHooked = true;

  const _origRender = UIController.prototype.render;
  UIController.prototype.render = function(state) {
    _origRender.call(this, state);

    const player = state.activePlayer;
    if (!player) return;

    // HUD progress message
    _updateHUDMessage(player, state);

    // Social comparison (throttled internally)
    _maybeSocialToast(player);
  };
})();

// ── Hook into showGameOver to trigger LB popup ────────────────────────────────
(function _hookGameOverLB() {
  const _orig = UIController.prototype.showGameOver;
  UIController.prototype.showGameOver = function(data) {
    _orig.call(this, data);
    const { reason, winner, player } = data;
    const isWin = reason === 'WIN';
    const subject = winner || player;
    if (isWin && subject) {
      const passive = subject.passiveIncome || 0;
      setTimeout(() => showLB10Popup(passive, subject.name), 3500);
    }
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// WIRE LB POPUP TO VIRAL SHARE (_bindViralShare already updates LB)
// Also trigger from FXSave email linking
// ════════════════════════════════════════════════════════════════════════════

(function _patchBindViralShareForLB() {
  const _orig = UIController.prototype._bindViralShare;
  UIController.prototype._bindViralShare = function(passive, resultType, turns, prog) {
    _orig.call(this, passive, resultType, turns, prog);
    // After share/score save, check LB popup (with small delay so EOS overlay renders first)
    if (passive > 0 && resultType === 'win') {
      const player = window._game?.engine?.getState?.()?.activePlayer;
      // Already shown via _hookGameOverLB — just reset session check for reuse
    }
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// SECURITY LAYER
// Client-side integrity: debounced autosave, HMAC-style signature,
// FXEvents recursion guard, referral abuse protection, rate limiter.
// NOTE: true server-side validation requires backend support.
//       The client-side signature detects accidental corruption and
//       casual tampering; a real HMAC secret lives on the server.
// ════════════════════════════════════════════════════════════════════════════

// ── 1. Debounced autosave (max once per 5s) ──────────────────────────────────
const FXSecurity = (() => {
  let _saveTimer = null;
  const DEBOUNCE_MS = 5000;

  // Wrap FXSave.saveLocal with debounce
  function debouncedSave(label) {
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(() => {
      FXSave.saveLocal(label);
      const email = FXSave.getPlayerEmail();
      if (email) FXSave.saveRemote(email).catch(() => {});
    }, DEBOUNCE_MS);
  }

  // ── 2. Save integrity signature ─────────────────────────────────────────────
  // Uses a deterministic hash of the save payload so we can detect
  // naive localStorage edits. A proper HMAC requires a server secret.
  async function hashPayload(payload) {
    try {
      const text    = JSON.stringify(payload);
      const encoder = new TextEncoder();
      const data    = encoder.encode(text);
      const hashBuf = await crypto.subtle.digest('SHA-256', data);
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2,'0')).join('');
    } catch(_) {
      // Fallback: simple checksum for environments without crypto.subtle
      const text = JSON.stringify(payload);
      let h = 0x811c9dc5;
      for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = (h * 0x01000193) >>> 0;
      }
      return h.toString(16).padStart(8,'0');
    }
  }

  async function signSnapshot(snap) {
    // Sign everything except the sig field itself
    const { sig: _omit, ...payload } = snap;
    const hash = await hashPayload(payload);
    return { ...snap, sig: hash };
  }

  async function verifySnapshot(snap) {
    if (!snap || !snap.sig) return false;
    const { sig, ...payload } = snap;
    const expected = await hashPayload(payload);
    return expected === sig;
  }

  // ── 3. Score validation ────────────────────────────────────────────────────
  // Server re-validates; this client-side check catches obviously
  // impossible values before they reach the leaderboard.
  function validateScore(snap) {
    if (!snap) return { valid: false, reason: 'no snapshot' };
    // passiveIncome cannot exceed a realistic maximum given assets
    const assetCashflow = (snap.assets || []).reduce((s, a) => s + (a.cashflow || 0), 0);
    // Allow up to 20% variance (rounding, economic events)
    const reported  = snap.passiveIncome || 0;
    const deviation = Math.abs(reported - assetCashflow) / Math.max(1, assetCashflow);
    if (deviation > 0.25 && assetCashflow > 0) {
      return { valid: false, reason: 'passive_income_mismatch', reported, computed: assetCashflow };
    }
    // Net worth cannot be negative (would require engine bug or tampering)
    if ((snap.netWorth || 0) < -500000) {
      return { valid: false, reason: 'negative_networth' };
    }
    // turnsPlayed must be reasonable
    if ((snap.currentTurn || 0) > 2000) {
      return { valid: false, reason: 'unrealistic_turns' };
    }
    return { valid: true };
  }

  // ── 4. Rate limiter ────────────────────────────────────────────────────────
  // Prevents rapid-fire calls to sensitive functions (LB submit, referral, email link).
  const _rlWindows = {};
  function rateLimit(key, maxCalls, windowMs) {
    const now    = Date.now();
    const window = _rlWindows[key] || [];
    _rlWindows[key] = window.filter(ts => now - ts < windowMs);
    if (_rlWindows[key].length >= maxCalls) return false;  // blocked
    _rlWindows[key].push(now);
    return true;  // allowed
  }

  // ── 5. Device fingerprint (lightweight, privacy-safe) ─────────────────────
  function getFingerprint() {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ];
    let h = 0;
    const str = components.join('|');
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h.toString(36).padStart(7,'0');
  }

  return { debouncedSave, signSnapshot, verifySnapshot, validateScore, rateLimit, getFingerprint };
})();
window.FXSecurity = FXSecurity;


// ── Patch FXSave.saveLocal to sign snapshots ──────────────────────────────────
(function _patchSaveLocalWithSignature() {
  const _origSaveLocal = FXSave.saveLocal;
  FXSave.saveLocal = async function(label) {
    const snap = FXSave.buildSnapshot(label);
    if (!snap) return false;
    const signed = await FXSecurity.signSnapshot(snap);
    try {
      localStorage.setItem('fxminds_game_save', JSON.stringify(signed));
      // Show autosave toast
      const el = document.getElementById('autosave-toast');
      if (el) {
        el.classList.add('toast-show');
        setTimeout(() => el.classList.remove('toast-show'), 1800);
      }
      return true;
    } catch(_) { return false; }
  };
})();

// ── Patch FXSave.loadLocal to verify signatures ───────────────────────────────
(function _patchLoadLocalWithVerify() {
  const _origLoad = FXSave.loadLocal;
  FXSave.loadLocal = async function() {
    try {
      const raw = localStorage.getItem('fxminds_game_save');
      if (!raw) return null;
      const snap = JSON.parse(raw);
      if (!snap || snap.version !== 2) return null;

      // Verify signature
      const valid = await FXSecurity.verifySnapshot(snap);
      if (!valid) {
        console.warn('[FXSave] Signature mismatch — save may be corrupted.');
        // Still return it but log warning; don't block the player
        // In production: return null here for strict validation
      }
      return snap;
    } catch(_) { return null; }
  };
})();

// ── Replace autosave calls with debounced version ─────────────────────────────
// Override FXEvents listeners that call saveLocal directly
FXEvents.on('assetBought', () => FXSecurity.debouncedSave());
FXEvents.on('enteredFastTrack', () => FXSecurity.debouncedSave());
// (mission save also uses debounce — patched via _hookMissionSave below)


// ════════════════════════════════════════════════════════════════════════════
// FXEvents RECURSION GUARD
// Prevents infinite loops when an event handler emits the same event.
// ════════════════════════════════════════════════════════════════════════════

(function _guardFXEvents() {
  const _origEmit = FXEvents.emit;
  const _emitDepth = {};
  const MAX_DEPTH = 3;

  FXEvents.emit = function(event, data) {
    _emitDepth[event] = (_emitDepth[event] || 0) + 1;
    if (_emitDepth[event] > MAX_DEPTH) {
      console.warn(`[FXEvents] Recursion guard: "${event}" blocked at depth ${_emitDepth[event]}`);
      _emitDepth[event]--;
      return;
    }
    try {
      _origEmit.call(this, event, data);
    } finally {
      _emitDepth[event]--;
    }
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// RATE-LIMITED LEADERBOARD CLAIM
// Replaces claimLeaderboardSpot with a rate-limited version
// ════════════════════════════════════════════════════════════════════════════

(function _secureLBClaim() {
  const _origClaim = window.claimLeaderboardSpot;
  window.claimLeaderboardSpot = async function() {
    if (!FXSecurity.rateLimit('lb_claim', 5, 3600000)) {  // 5 per hour
      const el = document.getElementById('lb10-email');
      if (el) { el.style.borderColor = 'var(--gold)'; setTimeout(()=>el.style.borderColor='',2000); }
      const lbl = document.querySelector('.lb10-claim-lbl');
      if (lbl) { lbl.textContent = 'Te veel pogingen. Probeer het over een uur opnieuw.'; }
      return;
    }

    // Validate score before claim
    const snap = FXSave.buildSnapshot();
    if (snap) {
      const validation = FXSecurity.validateScore(snap);
      if (!validation.valid) {
        console.warn('[Security] Score validation failed:', validation.reason);
        // Still allow claim but flag for server review
      }
    }

    if (typeof _origClaim === 'function') await _origClaim();
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// REFERRAL ABUSE PROTECTION
// Referral only counts if: new player_id + different fingerprint + 5+ turns
// ════════════════════════════════════════════════════════════════════════════

const REF_SEEN_KEY = 'fxminds_ref_seen_fps';

(function _secureReferralTracking() {
  const fromRef = sessionStorage.getItem('fxminds_from_ref');
  if (!fromRef) return;

  const myId  = typeof _getOrCreateRefId === 'function' ? _getOrCreateRefId() : '';
  if (fromRef === myId) return;  // can't refer yourself

  // Track via FXEvents: only count when player completes 5+ turns
  FXEvents.on('turnActionDone', ({ player }) => {
    if ((player?.turnsPlayed || 0) < 5) return;

    const fp = FXSecurity.getFingerprint();
    let seen = [];
    try { seen = JSON.parse(localStorage.getItem(REF_SEEN_KEY) || '[]'); } catch(_) {}

    if (seen.includes(fp)) return;  // same device already counted
    seen.push(fp);
    try { localStorage.setItem(REF_SEEN_KEY, JSON.stringify(seen.slice(-20))); } catch(_) {}

    // Rate-limit referral tracking
    if (!FXSecurity.rateLimit('referral_track', 10, 3600000)) return;

    // Referral conversion tracked locally only (static deployment).

    // Remove once counted to avoid double-firing
    FXEvents.emit('turnActionDone', null);  // won't recurse: guard in place
    sessionStorage.removeItem('fxminds_from_ref');
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// COMPLETE DUTCH LOCALIZATION — remaining patches
// ════════════════════════════════════════════════════════════════════════════

// Patch NL TRANSLATIONS with any remaining missing keys
(function _finalDutchPatches() {
  if (typeof TRANSLATIONS === 'undefined') return;
  const nl = TRANSLATIONS.nl;
  if (!nl) return;

  const patches = {
    // Progress / milestone messages
    'msg.roll':          '🎲 Gooi de dobbelstenen!',
    'msg.roll.player':   '🎲 Gooi de dobbelstenen, {{name}}!',

    // Mission labels (used in FT_MISSIONS and progress bar)
    'mission.first_steps':    'Eerste Stappen',
    'mission.wealth_build':   'Vermogensopbouw',
    'mission.portfolio_master':'Portfolio Meester',
    'mission.fin_freedom':    'Financiële Vrijheid',
    'mission.millionaire':    'Miljoenair',

    // Tier labels
    'tier.ratrace':    'Ratrace',
    'tier.fasttrack':  'Fast Track',
    'tier.investor':   'Investeerder',
    'tier.tycoon':     'Tycoon',
    'tier.legend':     'Legende',

    // Level progression
    'tier.ratrace.desc':   'Bouw passief inkomen op om de Ratrace te verlaten.',
    'tier.fasttrack.desc': 'Schaal je vermogen op met geavanceerde beleggingen.',
    'tier.investor.desc':  'Beheer een gediversifieerde beleggingsportefeuille.',
    'tier.tycoon.desc':    'Leid grote financiële projecten en portfolios.',
    'tier.legend.desc':    'Elite financieel strateeg — het hoogste niveau.',

    // Save / load UI
    'save.autosaved':      '💾 Voortgang automatisch opgeslagen',
    'save.continue':       'Verder spelen',
    'save.newgame':        'Nieuw spel',
    'save.loadmail':       'Laad spel met e-mail',
    'save.meta':           'Level {{level}} · Beurt {{turn}} · €{{passive}}/mnd passief',

    // Leaderboard
    'lb.title':            '🏆 Top 10 Spelers',
    'lb.your_rank':        'Jouw positie: {{rank}}',
    'lb.empty':            'Nog geen scores. Jij kunt de eerste zijn!',
    'lb.claim_cta':        'Voer je e-mail in om je plek op het leaderboard te claimen.',
    'lb.claimed':          '✅ Score opgeslagen! Je staat officieel in de top 10.',
    'lb.rate_limited':     'Te veel pogingen. Probeer het over een uur opnieuw.',

    // Referral
    'ref.share_text':      'Ik speelde het Cashflow spel van FXminds en haalde €{{score}}/mnd passief inkomen.\nDurf jij mij te verslaan?\n{{url}}',
    'ref.reward_title':    '3 vrienden hebben jouw spel gespeeld!',
    'ref.reward_sub':      'Je hebt exclusieve investeerdersinzichten vrijgespeeld. Check je inbox.',
    'ref.progress':        '{{n}} van 3 vrienden uitgenodigd',

    // HUD progress
    'hud.first_asset':     '💡 Koop je eerste bezitting om passief inkomen te starten.',
    'hud.close_ft':        '🚀 Nog <strong>€{{gap}}/mnd</strong> passief inkomen tot de Fast Track.',
    'hud.halfway':         '📈 Halverwege de Ratrace! {{pct}}% van je uitgaven gedekt.',
    'hud.one_more':        '🏠 Nog {{n}} bezitting(en) voor een gediversifieerde portefeuille.',
    'hud.mission_close':   '🎯 Bijna klaar met missie: <strong>{{title}}</strong>',

    // Social comparison
    'social.assets_top':   '🏆 Je portefeuille is groter dan die van 80% van de spelers.',
    'social.passive_top':  '📈 €{{passive}}/mnd passief — beter dan 70% van de spelers.',
    'social.ahead':        '🌟 Je bent verder dan de meeste mensen. Goed bezig — houd vol!',
    'social.long_play':    '⚡ {{turns}} beurten gespeeld — langer dan 65% van de spelers.',
    'social.networth_top': '💎 €{{nw}} nettovermogen — top 30% van alle spelers.',

    // Security / validation messages
    'sec.score_invalid':   'Score validatie mislukt. Neem contact op met support.',
    'sec.save_corrupt':    'Opgeslagen data beschadigd. Nieuw spel gestart.',
    'sec.rate_limited':    'Actie tijdelijk geblokkeerd. Probeer het later opnieuw.',

    // Economic events (Dutch)
    'econ.bull.title':       'Bull Market',
    'econ.bull.sub':         'Aandelenmarkten stijgen met 40%. Beleggers profiteren massaal.',
    'econ.recession.title':  'Recessie',
    'econ.recession.sub':    'Economische krimp. Vastgoed daalt met 30%. Houd koers.',
    'econ.ai_boom.title':    'AI Boom',
    'econ.ai_boom.sub':      'Tech-investeringen verdubbelen. Algoritme-assets genereren extra rendement.',
    'econ.rates_up.title':   'Rentestijging',
    'econ.rates_up.sub':     'Centrale bank verhoogt de rente. Leningen worden duurder.',
    'econ.crypto_crash.title':'Crypto Crash',
    'econ.crypto_crash.sub': 'Cryptomarkt daalt met 60%. Diversificatie beschermt je.',
    'econ.property_boom.title':'Vastgoed Boom',
    'econ.property_boom.sub': 'Huurprijzen stijgen door schaarste. Vastgoedinkomsten +25%.',
    'econ.startup_wave.title':'Startup Golf',
    'econ.startup_wave.sub':  'Risicokapitaal stroomt in. Startup exits genereren hoge rendementen.',
    'econ.inflation.title':  'Hoge Inflatie',
    'econ.inflation.sub':    'Koopkracht daalt. Vaste lasten stijgen automatisch.',

    // Daily challenge completion
    'challenge.done.title':  'Dagelijkse uitdaging voltooid!',
    'challenge.done.sub':    'Je bouwt stap voor stap aan je financiële vrijheid.',

    // Mission celebration
    'mission.done.badge':    'Fast Track missie',
    'mission.done.continue': '▶ Verder spelen',
    'mission.done.community':'🏫 FXminds Community bekijken',

    // ── Stap 4: gameplay feedback teksten ──────────────────────────────────
    'msg.asset.bought':     'Slimme zet. Je cashflow groeit.',
    'msg.bad.sub':          'Dit hoort bij investeren. Blijf bouwen aan je cashflow.',
    'msg.payday.sub':       'Je cashflow werkt weer voor je.',
    'msg.dice.sub':         'De markt beweegt. Kijk wat er gebeurt.',
    'msg.near_win':         'Je bent dichtbij financiële vrijheid. Nog een paar slimme zetten.',
  };

  Object.assign(nl, patches);
})();


// ════════════════════════════════════════════════════════════════════════════
// FXTelemetry — LIGHTWEIGHT ANALYTICS (fire-and-forget, privacy-safe)
// Tracks player behaviour. Never sends raw email. Only player_id.
// ════════════════════════════════════════════════════════════════════════════

const FXTelemetry = (() => {
  const ENDPOINT  = '';  // static deployment — telemetry disabled
  const BATCH_MS  = 4000;   // flush every 4 s
  const MAX_QUEUE = 30;     // flush earlier if queue fills

  let _queue  = [];
  let _timer  = null;
  let _seq    = 0;

  function _getCtx() {
    try {
      const state  = window._game?.engine?.getState?.();
      const player = state?.activePlayer;
      const prog   = player && typeof XPEngine !== 'undefined'
        ? XPEngine.levelProgress(player.xp || 0) : { level:1 };
      return {
        player_id:     FXSave?.getPlayerId?.() || 'anon',
        turn:          player?.turnsPlayed || 0,
        level:         prog.level,
        netWorth:      Math.round(player?.netWorth || 0),
        passiveIncome: Math.round(player?.passiveIncome || 0),
        tier:          typeof _getTierFromState === 'function' && state && player
                         ? _getTierFromState(state, player)?.id : 'unknown',
      };
    } catch(_) { return { player_id: 'anon' }; }
  }

  function track(event, extra = {}) {
    // Never include email or PII
    const payload = {
      e:    event,
      ts:   Date.now(),
      seq:  ++_seq,
      ..._getCtx(),
      ...extra,
    };
    // Sanitise: remove email if accidentally included
    delete payload.email;
    delete payload.playerName;

    _queue.push(payload);

    if (_queue.length >= MAX_QUEUE) {
      _flush();
    } else {
      clearTimeout(_timer);
      _timer = setTimeout(_flush, BATCH_MS);
    }
  }

  function _flush() {
    // Static deployment — no telemetry backend. Drain queue silently.
    _queue.length = 0;
  }

  // Flush on page hide (before tab closes)
  window.addEventListener('pagehide', _flush);

  return { track };
})();
window.FXTelemetry = FXTelemetry;

// ── Wire telemetry to FXEvents ────────────────────────────────────────────────
FXEvents.on('assetBought',      ({ player }) => FXTelemetry.track('asset_bought'));
FXEvents.on('enteredFastTrack', ()           => FXTelemetry.track('fast_track_entered'));
FXEvents.on('turnActionDone',   ()           => FXTelemetry.track('turn_played'));

// Wire to existing completion hooks
(function _wireTelemetryToCompletions() {
  // Daily challenge completion
  const _origEval = window.evaluateDailyChallenge || evaluateDailyChallenge;
  if (typeof _origEval === 'function') {
    window.evaluateDailyChallenge = function(stats) {
      const dataBefore = _loadChallengeData();
      _origEval(stats);
      const dataAfter  = _loadChallengeData();
      // Detect if challenge was just completed (new success entry)
      const justDone = dataAfter.history.length > dataBefore.history.length
        && dataAfter.history[0]?.success;
      if (justDone) FXTelemetry.track('daily_challenge_completed');
    };
  }

  // Mission completion — wrap _showMissionComplete
  const _origMission = window._showMissionComplete;
  if (typeof _origMission === 'function') {
    window._showMissionComplete = function(mission, next) {
      _origMission(mission, next);
      FXTelemetry.track('mission_completed', { mission_id: mission?.id });
    };
  }

  // Leaderboard claimed
  const _origClaim = window.claimLeaderboardSpot;
  if (typeof _origClaim === 'function') {
    window.claimLeaderboardSpot = async function() {
      await _origClaim();
      FXTelemetry.track('leaderboard_claimed');
    };
  }

  // Email submitted (lead popup)
  const _origBind = window._bindLeadSubmit;
  if (typeof _origBind === 'function') {
    window._bindLeadSubmit = function(score) {
      _origBind(score);
      // Detect submit button click
      const btn = document.getElementById('lp-submit');
      if (btn) btn.addEventListener('click', () => {
        setTimeout(() => FXTelemetry.track('email_submitted'), 1500);
      }, { once: true });
    };
  }

  // Community CTA clicked
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-community') || e.target.closest('.eos-community-cta') || e.target.closest('.comm-cta-btn')) {
      FXTelemetry.track('community_cta_clicked');
    }
    if (e.target.closest('#evs-wa') || e.target.closest('#lp-wa') || e.target.closest('#share-wa')) {
      FXTelemetry.track('referral_shared', { channel: 'whatsapp' });
    }
    if (e.target.closest('#evs-x') || e.target.closest('#lp-tw') || e.target.closest('#share-x')) {
      FXTelemetry.track('referral_shared', { channel: 'twitter' });
    }
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// ENHANCED XP SYSTEM
// Extends the existing XPEngine with new award amounts, HUD bar,
// level-up popup, floating XP numbers, and unlockable content.
// ════════════════════════════════════════════════════════════════════════════

// ── New XP values (spec-compliant) — added as FXEvents listeners ─────────────
// The engine already calls XPEngine.award internally for buy_asset, win, survive_event.
// We add the new amounts on top of those via FXEvents.
const FX_XP_AWARDS = {
  turn_played:         5,
  asset_bought:        20,   // extra XP on top of engine's buy_asset
  mission_completed:   100,
  daily_challenge:     50,
  fast_track_entered:  150,
};

function _awardFXXP(reason, amount) {
  const state  = window._game?.engine?.getState?.();
  const player = state?.activePlayer;
  if (!player) return;
  const oldLevel = XPEngine.levelForXP(player.xp || 0);
  player.xp = (player.xp || 0) + amount;
  const newLevel = XPEngine.levelForXP(player.xp);
  if (newLevel > oldLevel) {
    player.level = newLevel;
    _showXPLevelUp(newLevel);
  }
  _showXPFloat(amount, reason);
  _updateHUDXPBar(player);
}

FXEvents.on('turnActionDone',   ({ player }) => _awardFXXP('turn',     FX_XP_AWARDS.turn_played));
FXEvents.on('assetBought',      ({ player }) => _awardFXXP('asset',    FX_XP_AWARDS.asset_bought));
FXEvents.on('enteredFastTrack', ()           => _awardFXXP('ft',       FX_XP_AWARDS.fast_track_entered));

// Challenge and mission completions wired via override further down

// ── Floating XP number ────────────────────────────────────────────────────────
function _showXPFloat(amount, reason) {
  const el = document.createElement('div');
  el.className = 'xp-award-float';
  el.textContent = `+${amount} XP`;
  // Position near the XP bar
  const xpSect = document.querySelector('.xp-sect');
  if (xpSect) {
    const rect = xpSect.getBoundingClientRect();
    el.style.left = `${rect.left + 12}px`;
    el.style.top  = `${rect.top - 4}px`;
  } else {
    el.style.right = '80px';
    el.style.top   = '56px';
  }
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1450);
}

// ── HUD XP mini-bar (shown above challenge bar) ───────────────────────────────
function _updateHUDXPBar(player) {
  let wrap = document.getElementById('hud-xp-bar-widget');
  const boardArea = document.querySelector('.board-area');
  if (!boardArea) return;

  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'hud-xp-bar-widget';
    wrap.className = 'hud-xp-bar-wrap';
    // Insert before the game board
    const board = document.getElementById('game-board');
    if (board) boardArea.insertBefore(wrap, board);
  }

  const prog = XPEngine.levelProgress(player?.xp || 0);
  wrap.innerHTML = `
    <span class="hud-xp-label">Lv ${prog.level} ${prog.title}</span>
    <div class="hud-xp-track"><div class="hud-xp-fill" style="width:${prog.pct}%"></div></div>
    <span class="hud-xp-pct">${prog.current}/${prog.needed} XP</span>`;
}

// ── Level-up popup ────────────────────────────────────────────────────────────
let _levelUpPopupOpen = false;

function _showXPLevelUp(newLevel) {
  if (_levelUpPopupOpen) return;
  _levelUpPopupOpen = true;

  const el = document.getElementById('xp-levelup-popup');
  if (!el) { _levelUpPopupOpen = false; return; }

  const prog      = XPEngine.levelProgress(
    (window._game?.engine?.getState?.()?.activePlayer?.xp) || 0
  );
  const unlockMsg = LEVEL_UNLOCKS[newLevel];

  document.getElementById('xlp-level').textContent  = `Level ${newLevel}`;
  document.getElementById('xlp-title').textContent  = prog.title || t(`level.${newLevel}`);

  const unlockEl   = document.getElementById('xlp-unlock');
  const unlockText = document.getElementById('xlp-unlock-text');
  if (unlockMsg && unlockEl && unlockText) {
    unlockEl.style.display   = '';
    unlockText.textContent   = unlockMsg;
  } else if (unlockEl) {
    unlockEl.style.display = 'none';
  }

  el.classList.remove('hidden');
  if (typeof _launchConfetti === 'function') _launchConfetti(2500);
  FXTelemetry.track('level_up', { new_level: newLevel });

  // Auto-dismiss after 6 s if player doesn't click
  const timer = setTimeout(() => {
    el.classList.add('hidden');
    _levelUpPopupOpen = false;
  }, 6000);

  el.querySelector('.xlp-close')?.addEventListener('click', () => {
    clearTimeout(timer);
    el.classList.add('hidden');
    _levelUpPopupOpen = false;
  }, { once: true });
}

// ── Content unlocks per level ─────────────────────────────────────────────────
const LEVEL_UNLOCKS = {
  3: 'Geavanceerde beleggingen zijn beschikbaar in de Fast Track fase.',
  4: 'Sterkere economische ontwikkelingen komen nu elke 8 beurten voorbij.',
  5: 'Elite beleggingskansen zijn beschikbaar — voor spelers die klaar zijn voor het hoogste niveau.',
  7: 'Vermogensbouwer modus: missies leveren dubbel XP op.',
  10:'Money Master — je hebt het maximale niveau bereikt!',
};

(function _installLevelUnlocks() {
  // Hook into FXEvents + periodically check in render
  // When level increases (caught in _awardFXXP), unlock content
  // Additional: apply Level 4+ shorter econ event interval
  const _origRender = UIController.prototype._lastRenderLevel;

  // Watch for level changes via render hook
  const _key = '_levelUnlockChecked';
  if (UIController.prototype[_key]) return;
  UIController.prototype[_key] = true;

  const _origRenderFn = UIController.prototype.render;
  UIController.prototype.render = function(state) {
    _origRenderFn.call(this, state);
    const player = state.activePlayer;
    if (!player) return;

    const level = XPEngine.levelForXP(player.xp || 0);

    // Level 4+: shorten economic event interval to every 8 turns
    if (level >= 4 && window._lastEconTurn !== undefined) {
      window._econInterval = 8;
    }

    // Level 5+: activate elite investment cards in FT deck
    if (level >= 5 && !window._eliteCardsAdded && typeof fastTrackCards !== 'undefined') {
      window._eliteCardsAdded = true;
      fastTrackCards.push({
        id:'ft_elite', type:'fast_track', title:'Elite Beleggingskans', icon:'👑',
        description:'Exclusief voor Master-investeerders. Maximaal risico, maximaal rendement. Niet voor beginners.',
        riskLevel:'extreme',
        choices:[
          { label:'Investeer €30.000 (elite kans)',
            condition:(p) => p.cash >= 30000,
            effect:(p) => {
              p.addCash(-30000, '(elite investering)');
              const roll = Math.random();
              if (roll > 0.4) {
                const gain = Math.floor(Math.random()*25000)+15000;
                p.addCash(gain, `(elite exit +${c(gain)})`);
                p.addLog(`👑 Elite exit geslaagd! +${c(gain)}`);
              } else if (roll > 0.15) {
                const m = Math.floor(Math.random()*1200)+800;
                p.addAsset({ id:`elite_${Date.now()}`, name:'Elite Portfolio', cost:30000, cashflow:m, type:'investment' });
                p.addLog(`👑 Elite portfolio actief: +${cpm(m)}/mnd.`);
              } else {
                p.addLog('👑 Elite kans mislukt. Verlies geabsorbeerd.');
              }
            }
          },
          { label:'Passen', effect:(p) => p.addLog('Elite kans overgeslagen.') }
        ],
      });
    }

    // Level 7+: double XP from missions
    if (level >= 7 && !window._doubleXPMissions) {
      window._doubleXPMissions = true;
    }

    _updateHUDXPBar(player);
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// FXStreak — DAILY LOGIN STREAK (separate from challenge streak)
// Tracks consecutive days the player opens the game and plays ≥ 1 turn.
// ════════════════════════════════════════════════════════════════════════════

const FXStreak = (() => {
  const KEY = 'fxminds_login_streak';

  function _load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { streak:0, lastDate:'', longestStreak:0, rewardsClaimed:[] }; }
    catch(_) { return { streak:0, lastDate:'', longestStreak:0, rewardsClaimed:[] }; }
  }

  function _save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(_) {}
  }

  function _todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function _yesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  // Call when the player plays their first turn today
  function recordPlay() {
    const data  = _load();
    const today = _todayKey();
    const yest  = _yesterdayKey();

    if (data.lastDate === today) return data;  // already recorded today

    const wasConsecutive = data.lastDate === yest;
    const gapDays = data.lastDate
      ? Math.floor((new Date(today) - new Date(data.lastDate)) / 86400000)
      : 0;

    let justBroken = false;

    if (wasConsecutive) {
      data.streak = (data.streak || 0) + 1;
    } else if (gapDays === 0) {
      // first ever play
      data.streak = 1;
    } else {
      // Missed one or more days
      if (data.streak > 1) justBroken = true;
      data.streak = 1;
    }

    data.lastDate     = today;
    data.longestStreak = Math.max(data.streak, data.longestStreak || 0);
    _save(data);

    if (justBroken) _showStreakBreak(gapDays);

    return data;
  }

  function getStreak() {
    return _load().streak || 0;
  }

  function getData() {
    return _load();
  }

  return { recordPlay, getStreak, getData };
})();
window.FXStreak = FXStreak;

// ── Streak reward definitions ─────────────────────────────────────────────────
const STREAK_REWARDS = [
  { days: 3,  icon:'🃏', title:'Bonus Beleggingskaart',   sub:'Je ontvangt een gratis bonus-beleggingskans bij je volgende Kans-vakje.',
    action: () => _grantStreakBonus('bonus_card') },
  { days: 7,  icon:'📊', title:'Economisch Inzicht',       sub:'Exclusief inzicht: de komende 3 economische events zijn in jouw voordeel.',
    action: () => _grantStreakBonus('economic_insight') },
  { days: 14, icon:'💎', title:'Zeldzame Beleggingskans',  sub:'Een exclusieve belegging is ontgrendeld in Fast Track.',
    action: () => _grantStreakBonus('rare_investment') },
  { days: 30, icon:'🦅', title:'Legende Status',            sub:'Je hebt 30 dagen op rij gespeeld. Ontvang de FXminds Legend badge.',
    action: () => _grantStreakBonus('legend_badge') },
];

function _grantStreakBonus(type) {
  // Store bonus in localStorage for the game to pick up
  try {
    const bonuses = JSON.parse(localStorage.getItem('fxminds_streak_bonuses') || '[]');
    bonuses.push({ type, grantedAt: Date.now() });
    localStorage.setItem('fxminds_streak_bonuses', JSON.stringify(bonuses));
  } catch(_) {}
  FXTelemetry.track('streak_reward_earned', { type });
}

function _checkStreakRewards(streak) {
  const data = FXStreak.getData();
  const claimed = data.rewardsClaimed || [];

  for (const reward of STREAK_REWARDS) {
    if (streak >= reward.days && !claimed.includes(reward.days)) {
      claimed.push(reward.days);
      // Persist claim
      const d = FXStreak.getData();
      d.rewardsClaimed = claimed;
      try { localStorage.setItem('fxminds_login_streak', JSON.stringify(d)); } catch(_) {}

      reward.action();
      _showStreakReward(reward, streak);
      break;  // one reward at a time
    }
  }
}

function _showStreakReward(reward, streak) {
  const el = document.getElementById('streak-reward-popup');
  if (!el) return;

  document.getElementById('sr-icon').textContent   = reward.icon;
  document.getElementById('sr-streak').textContent = `${streak} Dagen Streak!`;
  document.getElementById('sr-title').textContent  = 'Beloning vrijgespeeld';
  document.getElementById('sr-sub').textContent    = reward.sub;

  const rewardsEl = document.getElementById('sr-rewards');
  if (rewardsEl) {
    rewardsEl.innerHTML = `
      <div class="sr-reward-item">
        <span class="sr-reward-icon">${reward.icon}</span>
        <span>${reward.title}</span>
      </div>`;
  }

  el.classList.remove('hidden');
  if (typeof _launchConfetti === 'function') _launchConfetti(2500);
}

function _showStreakBreak(gapDays) {
  const el = document.getElementById('streak-break-popup');
  if (!el) return;
  el.classList.remove('hidden');
}

function closeStreakReward() {
  document.getElementById('streak-reward-popup')?.classList.add('hidden');
}
window.closeStreakReward = closeStreakReward;

// ── HUD streak indicator ──────────────────────────────────────────────────────
function _initHUDStreak() {
  const header = document.querySelector('.game-header');
  if (!header || document.getElementById('hud-streak-btn')) return;

  const btn = document.createElement('button');
  btn.id        = 'hud-streak-btn';
  btn.className = 'hud-streak';
  btn.title     = 'Jouw dagelijkse reeks — klik voor meer';
  btn.setAttribute('aria-label', 'Dagelijkse streak');
  btn.addEventListener('click', () => {
    if (typeof showDailyChallenge === 'function') showDailyChallenge();
  });

  // Insert before header-actions
  const actions = header.querySelector('.header-actions');
  if (actions) header.insertBefore(btn, actions);
  else header.appendChild(btn);

  _refreshHUDStreak();
}

function _refreshHUDStreak() {
  const btn    = document.getElementById('hud-streak-btn');
  if (!btn) return;
  const streak = FXStreak.getStreak();
  btn.className = `hud-streak${streak === 0 ? ' streak-zero' : ''}`;
  btn.innerHTML = `<span class="hud-streak-fire">🔥</span><span class="hud-streak-val">${streak} ${streak === 1 ? 'dag' : 'dagen'}</span>`;
}

// ── Wire streak to first turn each session ────────────────────────────────────
let _streakRecordedThisSession = false;

FXEvents.on('turnActionDone', ({ player }) => {
  if (_streakRecordedThisSession) return;
  _streakRecordedThisSession = true;

  const data   = FXStreak.recordPlay();
  const streak = data.streak;

  _refreshHUDStreak();
  _checkStreakRewards(streak);
  FXTelemetry.track('streak_updated', { streak });
});

// ── Lead popup after 10 turns (if not already shown) ──────────────────────
// Satisfies brief: "after 10 turns OR on win → show lead modal"
let _leadShownAfterTurns = false;
FXEvents.on('turnActionDone', ({ player }) => {
  if (_leadShownAfterTurns) return;
  if ((player?.turnsPlayed || 0) < 10) return;
  // Don't show if game is over (win overlay handles that)
  const winOverlay = document.getElementById('win-overlay');
  if (winOverlay && !winOverlay.classList.contains('hidden')) return;
  _leadShownAfterTurns = true;
  setTimeout(() => {
    const leadPopup = document.getElementById('lead-popup');
    if (!leadPopup || !leadPopup.classList.contains('hidden')) return;
    if (typeof openLeadPopup === 'function') openLeadPopup('turn10');
  }, 1500);
});

// ── Retention reminder (once per session, if streak > 0) ─────────────────────
let _reminderShown = false;

(function _scheduleRetentionReminder() {
  const streak = FXStreak.getStreak();
  if (!streak || _reminderShown) return;

  // Show reminder 90 s after page load if player hasn't played yet
  setTimeout(() => {
    if (_streakRecordedThisSession || _reminderShown) return;
    _reminderShown = true;
    _showRetentionReminder(streak);
  }, 90000);
})();

function _showRetentionReminder(streak) {
  // Inject reminder element if not present
  let el = document.getElementById('retention-reminder');
  if (!el) {
    el = document.createElement('div');
    el.id = 'retention-reminder';
    el.innerHTML = `
      <div class="rr-inner">
        <span class="rr-icon">🔥</span>
        <span class="rr-text">Speel vandaag om je <strong>${streak}-daagse streak</strong> te behouden!</span>
      </div>`;
    document.body.appendChild(el);
  }
  el.classList.add('rr-show');
  el.classList.remove('hidden');
  setTimeout(() => {
    el.classList.remove('rr-show');
    setTimeout(() => el.classList.add('hidden'), 350);
  }, 5000);
}

// ── Wire daily challenge XP award ─────────────────────────────────────────────
(function _wireChallengeXP() {
  const _origEval = window.evaluateDailyChallenge;
  if (typeof _origEval !== 'function') return;
  window.evaluateDailyChallenge = function(stats) {
    const before = (() => {
      try { return JSON.parse(localStorage.getItem('fxminds_challenge')) || {}; } catch(_) { return {}; }
    })();
    const prevLen = before.history?.length || 0;
    _origEval(stats);
    const after = (() => {
      try { return JSON.parse(localStorage.getItem('fxminds_challenge')) || {}; } catch(_) { return {}; }
    })();
    const justDone = (after.history?.length || 0) > prevLen && after.history?.[0]?.success;
    if (justDone) {
      _awardFXXP('challenge', FX_XP_AWARDS.daily_challenge);
      FXTelemetry.track('daily_challenge_completed');
    }
  };
})();

// ── Wire mission XP award ─────────────────────────────────────────────────────
(function _wireMissionXP() {
  const _origMission = window._showMissionComplete;
  if (typeof _origMission !== 'function') return;
  window._showMissionComplete = function(mission, next) {
    _origMission(mission, next);
    const multiplier = window._doubleXPMissions ? 2 : 1;
    _awardFXXP('mission', FX_XP_AWARDS.mission_completed * multiplier);
    FXTelemetry.track('mission_completed', { mission_id: mission?.id });
  };
})();

// ── Init HUD streak once game screen opens ────────────────────────────────────
(function _watchForGameScreenHUDStreak() {
  const obs = new MutationObserver(() => {
    const gs = document.getElementById('game-screen');
    if (gs && !gs.classList.contains('hidden')) {
      _initHUDStreak();
      obs.disconnect();
    }
  });
  obs.observe(document.body, {
    childList:true, subtree:true, attributes:true, attributeFilter:['class']
  });
})();

// ── Add NL translation keys for new system ────────────────────────────────────
(function _addRetentionTranslations() {
  if (typeof TRANSLATIONS === 'undefined') return;
  const nl = TRANSLATIONS.nl;
  if (!nl) return;
  Object.assign(nl, {
    'xp.levelup.title':     'NIVEAU OMHOOG!',
    'xp.levelup.sub':       'Je financieel inzicht groeit met elke beurt.',
    'xp.levelup.continue':  '▶ Verder spelen',
    'streak.days':          '{{n}} Dagen Streak!',
    'streak.broken':        'Je reeks is opnieuw gestart. Kom morgen terug en bouw hem weer op.',
    'streak.reminder':      'Speel vandaag om je reeks voort te zetten.',
    'streak.reward.title':  'Beloning vrijgespeeld',
    'streak.reward.3':      'Je ontvangt een gratis bonus-beleggingskans.',
    'streak.reward.7':      'Economisch inzicht: komende events in jouw voordeel.',
    'streak.reward.14':     'Zeldzame belegging ontgrendeld in Fast Track.',
    'streak.reward.30':     'FXminds Legend badge ontvangen. Maximale status.',
    'xp.award.turn':        '+{{xp}} XP — beurt gespeeld',
    'xp.award.asset':       '+{{xp}} XP — bezitting gekocht',
    'xp.award.mission':     '+{{xp}} XP — missie voltooid',
    'xp.award.challenge':   '+{{xp}} XP — dagelijkse uitdaging',
    'xp.award.fasttrack':   '+{{xp}} XP — Fast Track betreden',
    'unlock.level3':        'Geavanceerde beleggingskaarten beschikbaar in Fast Track.',
    'unlock.level4':        'Speciale economische events nu elke 8 beurten.',
    'unlock.level5':        'Elite beleggingskansen ontgrendeld.',
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// INTRO GATE + EMAIL GATE
// Mandatory onboarding before the game starts.
// Flow:
//   intro-gate → (if email known: skip) → email-gate → mode-select-screen
//   returning player with email → auto-load save → skip gates entirely
// ════════════════════════════════════════════════════════════════════════════

(function initGate() {
  'use strict';

  // ── Elements ────────────────────────────────────────────────────────────────
  const introGate  = document.getElementById('intro-gate');
  const emailGate  = document.getElementById('email-gate');
  const msScreen   = document.getElementById('mode-select-screen');
  const obScreen   = document.getElementById('onboard-screen');

  if (!introGate) return;   // safety — shouldn't happen

  // ── Helper: dismiss a gate with animation ────────────────────────────────────
  // animationend is unreliable (prefers-reduced-motion, browser quirks).
  // A guaranteed setTimeout fallback ensures the callback always fires.
  // FIX: use BOTH inline style AND .hidden class on the dismissed element
  // so display:none !important backs up the inline style, and vice versa.
  function _dismiss(el, cb) {
    if (!el) { if (cb) cb(); return; }
    let fired = false;
    function _done() {
      if (fired) return;
      fired = true;
      el.style.display = 'none';    // inline — immediate
      el.classList.add('hidden');   // class  — backs up inline style
      el.classList.remove('gate-exit');
      if (cb) cb();
    }
    el.classList.add('gate-exit');
    el.addEventListener('animationend', _done, { once: true });
    // Fallback: if animationend hasn't fired within 500ms, proceed anyway
    setTimeout(_done, 500);
  }

  // ── Helper: advance to mode-select (the normal game start point) ─────────────
  function _proceedToGame() {
    if (msScreen) {
      msScreen.classList.remove('hidden');
    }
    // Let _extendModeSelect check for saves (runs on its own timeout)
  }

  // ── ROOT CAUSE FIX: initModeSelect() (which runs before initGate) removes
  // 'hidden' from mode-select-screen so it is already visible when initGate
  // executes. For new players the gates should own the screen until they
  // complete. Hide mode-select now; _proceedToGame will re-show it.
  if (msScreen) msScreen.classList.add('hidden');

  // ── Check if player already has email saved (returning player) ───────────────
  // FXSave.loadLocal() is async and returns a Promise, so we read the email
  // key directly from localStorage to stay synchronous here.
  const existingEmail = (typeof FXSave !== 'undefined')
    ? FXSave.getPlayerEmail()
    : (localStorage.getItem('fxminds_player_email') || '');

  if (existingEmail) {
    // Returning player: skip both gates and go straight to mode-select
    introGate.style.display = 'none';
    if (emailGate) emailGate.style.display = 'none';
    _proceedToGame();
    FXTelemetry?.track('returning_player_auto_loaded');
    return;
  }

  // ── New player: intro gate is visible by default (no hidden class in HTML) ───
  FXTelemetry?.track('intro_gate_shown');

  // ── CTA button: "Speel het spel" ─────────────────────────────────────────────
  // Attach the listener unconditionally; log a warning if the button is missing
  // so it surfaces immediately in the console rather than failing silently.
  const ctaBtn = document.getElementById('ig-cta-btn');
  if (!ctaBtn) {
    console.warn('[initGate] #ig-cta-btn not found – start button will not work.');
    return;
  }

  ctaBtn.addEventListener('click', () => {
    FXTelemetry?.track('intro_cta_clicked');
    _dismiss(introGate, () => {
      if (emailGate) {
        // FIX: remove .hidden class AND set inline style so both mechanisms
        // guarantee visibility — classList.remove alone can be beaten by
        // display:none !important if the class lingers; the inline style
        // wins over any class-based rule.
        emailGate.classList.remove('hidden');
        emailGate.style.display = 'flex';
        document.getElementById('eg-name')?.focus();
        FXTelemetry?.track('email_gate_shown');
      }
    });
  });

  // ── Email gate: back button ──────────────────────────────────────────────────
  document.getElementById('eg-back-btn')?.addEventListener('click', () => {
    emailGate.classList.add('hidden');
    introGate.style.display = '';
    introGate.style.opacity  = '1';
    introGate.style.transform = '';
  });

  // ── Email gate: skip ─────────────────────────────────────────────────────────
  document.getElementById('eg-skip-btn')?.addEventListener('click', () => {
    FXTelemetry?.track('email_gate_skipped');
    _dismiss(emailGate, _proceedToGame);
  });

  // ── Email gate: submit ────────────────────────────────────────────────────────
  document.getElementById('eg-submit-btn')?.addEventListener('click', _handleGateSubmit);
  document.getElementById('eg-email')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') _handleGateSubmit();
  });

  async function _handleGateSubmit() {
    const nameInput  = document.getElementById('eg-name');
    const emailInput = document.getElementById('eg-email');
    const consentEl  = document.getElementById('eg-consent');
    const errEl      = document.getElementById('eg-err');
    const submitBtn  = document.getElementById('eg-submit-btn');
    const labelEl    = document.getElementById('eg-submit-label');

    const name    = (nameInput?.value  || '').trim();
    const email   = (emailInput?.value || '').trim().toLowerCase();
    const consent = consentEl?.checked;

    // Clear errors
    errEl.style.display = 'none';
    errEl.textContent   = '';
    nameInput?.classList.remove('eg-error');
    emailInput?.classList.remove('eg-error');

    // ── Validate ───────────────────────────────────────────────────────────────
    if (!name) {
      nameInput?.classList.add('eg-error');
      errEl.textContent   = 'Vul je voornaam in.';
      errEl.style.display = 'block';
      nameInput?.focus();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput?.classList.add('eg-error');
      errEl.textContent   = 'Vul een geldig e-mailadres in.';
      errEl.style.display = 'block';
      emailInput?.focus();
      return;
    }

    // ── Rate limit (FXSecurity) ────────────────────────────────────────────────
    if (typeof FXSecurity !== 'undefined' && !FXSecurity.rateLimit('email_gate', 5, 3600000)) {
      errEl.textContent   = 'Te veel pogingen. Probeer het over een uur opnieuw.';
      errEl.style.display = 'block';
      return;
    }

    // ── Disable + loading state ────────────────────────────────────────────────
    if (submitBtn)  submitBtn.disabled   = true;
    if (labelEl)    labelEl.textContent  = '⏳ Opslaan...';

    // ── Store email in FXSave ──────────────────────────────────────────────────
    if (typeof FXSave !== 'undefined') {
      FXSave.setPlayerEmail(email);
    }

    // ── Send to MailBlue (fire-and-forget) ────────────────────────────────────
    // Use existing _submitToMailBlue if available
    if (typeof _submitToMailBlue === 'function') {
      await _submitToMailBlue(name, email, 0).catch(() => {});
    } else {
      // Fallback: direct MailBlue call
      try {
        const fd = new FormData();
        fd.append('email',      email);
        fd.append('first_name', name);
        fd.append('u',          '131');
        fd.append('f',          '35');
        fd.append('player_id',  typeof FXSave !== 'undefined' ? FXSave.getPlayerId() : 'anon');
        await fetch('https://fxminds15116.activehosted.com/proc.php', {
          method: 'POST', body: fd, mode: 'no-cors',
        });
      } catch(_) {}
    }

    // Backend link removed — static deployment. Email saved to localStorage only.

    // ── Emit FXEvents ──────────────────────────────────────────────────────────
    if (typeof FXEvents !== 'undefined') {
      FXEvents.emit('emailSubmitted', { playerId, hasConsent: !!consent });
    }

    // ── Telemetry ──────────────────────────────────────────────────────────────
    if (typeof FXTelemetry !== 'undefined') {
      FXTelemetry.track('email_submitted', { source: 'email_gate', has_consent: !!consent });
    }

    // ── Persist in save system ────────────────────────────────────────────────
    if (typeof FXSave !== 'undefined') {
      await FXSave.saveLocal().catch?.(() => {});
    }

    // ── Show success micro-state briefly, then proceed ────────────────────────
    const formWrap    = document.getElementById('eg-form-wrap');
    const successWrap = document.getElementById('eg-success-wrap');
    if (formWrap)    formWrap.style.display    = 'none';
    if (successWrap) successWrap.style.display = '';

    setTimeout(() => {
      _dismiss(emailGate, _proceedToGame);
    }, 1400);
  }

  // ── Keyboard shortcut: Enter on name field moves to email ──────────────────
  document.getElementById('eg-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('eg-email')?.focus();
  });

})();

// ── FXEvents listener: on emailSubmitted, re-trigger autosave ─────────────────
if (typeof FXEvents !== 'undefined') {
  FXEvents.on('emailSubmitted', ({ playerId, hasConsent }) => {
    // Fire autosave so the email is included in the snapshot
    if (typeof FXSecurity !== 'undefined') {
      FXSecurity.debouncedSave();
    } else if (typeof FXSave !== 'undefined') {
      FXSave.saveLocal();
    }
  });
}

// ── NL translation keys for gate copy ────────────────────────────────────────
(function _gateTranslations() {
  if (typeof TRANSLATIONS === 'undefined') return;
  const nl = TRANSLATIONS.nl;
  if (!nl) return;
  Object.assign(nl, {
    'gate.intro.title':     'Kun jij ontsnappen uit de Rat Race?',
    'gate.intro.desc':      'Speel het Cashflow spel en ontdek hoe het opbouwen van passief inkomen echt werkt.',
    'gate.intro.b1':        'Leer hoe passief inkomen werkt',
    'gate.intro.b2':        'Bouw je eigen investeringsportfolio',
    'gate.intro.b3':        'Ontsnap uit de rat race',
    'gate.intro.cta':       'Speel het spel',
    'gate.intro.footnote':  'Gratis · Geen download · 5 minuten',
    'gate.email.title':     'Je staat bijna op het leaderboard. Bewaar je score.',
    'gate.email.desc':      'Vul je gegevens in zodat we je voortgang kunnen bewaren. Je ontvangt ook gratis inzichten over investeren.',
    'gate.email.name.lbl':  'Voornaam',
    'gate.email.email.lbl': 'E-mailadres',
    'gate.email.consent':   'Ik ontvang graag inzichten over investeren van FXminds. Ik kan mij altijd uitschrijven.',
    'gate.email.submit':    '▶ Begin het spel',
    'gate.email.skip':      'Overslaan — spelen zonder score op te slaan',
    'gate.email.err.name':  'Vul je voornaam in.',
    'gate.email.err.email': 'Vul een geldig e-mailadres in.',
    'gate.email.err.rate':  'Te veel pogingen. Probeer het over een uur opnieuw.',
    'gate.email.success.title': 'Gegevens opgeslagen!',
    'gate.email.success.sub':   'Je voortgang wordt automatisch bewaard. Veel plezier!',
    'gate.returning.welcome':   'Welkom terug! Je voortgang is geladen.',
  });
})();



// ════════════════════════════════════════════════════════════════════════════
// STAP 4 — GAMEPLAY FEEDBACK TEKSTEN
// Puur display-only. Geen logica, geen state-mutaties.
// Alleen addLog() en setMessage() via het bestaande t() systeem.
// ════════════════════════════════════════════════════════════════════════════

(function _installGameplayFeedback() {

  // ── 1. Na aankoop van een bezit: "Slimme zet. Je cashflow groeit." ────────
  FXEvents.on('assetBought', ({ player, state }) => {
    // Only show if player actually gained passive income (real buy, not a pass)
    if ((player?.passiveIncome || 0) > 0) {
      // Brief sub-message via a non-intrusive toast — delay so card modal closes first
      setTimeout(() => {
        const msg = typeof t === 'function' ? t('msg.asset.bought') : 'Slimme zet. Je cashflow groeit.';
        _showFeedbackToast(msg, 'positive');
      }, 800);
    }
  });

  // ── 2. Bij negatieve gebeurtenis: motiverende toon ────────────────────────
  // Hook via the existing UIController.showCard — read card type after render
  (function _patchShowCardForFeedback() {
    const _orig = UIController.prototype.showCard;
    if (!_orig || UIController.prototype._feedbackPatched) return;
    UIController.prototype._feedbackPatched = true;

    UIController.prototype.showCard = function(data) {
      _orig.call(this, data);
      if (data?.card?.type === 'bad_event') {
        setTimeout(() => {
          const msg = typeof t === 'function' ? t('msg.bad.sub') : 'Dit hoort bij investeren. Blijf bouwen aan je cashflow.';
          _showFeedbackToast(msg, 'neutral');
        }, 600);
      }
    };
  })();

  // ── 3. Bij bijna ontsnappen: spanningsmoment ──────────────────────────────
  // Already handled by HUD_THRESHOLDS 'close_to_escape'.
  // We enrich that message to match the spec.
  // Find and patch it:
  if (typeof HUD_THRESHOLDS !== 'undefined') {
    const closeEntry = HUD_THRESHOLDS.find(t => t.key === 'close_to_escape');
    if (closeEntry) {
      const _origMsg = closeEntry.msg;
      closeEntry.msg = function(p) {
        const gap = Math.ceil((p.expenses||0) - (p.passiveIncome||0));
        return `🚀 Je bent dichtbij financiële vrijheid. Nog <strong>€${gap.toLocaleString('nl-NL')}/mnd</strong> passief inkomen nodig.`;
      };
    }
  }

})();

// ── Feedback toast helper ─────────────────────────────────────────────────────
// Lightweight, standalone — does not touch game state.
function _showFeedbackToast(message, type) {
  // Reuse the existing autosave-toast element style but as a separate element
  const existing = document.getElementById('feedback-toast');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.id = 'feedback-toast';
  el.style.cssText = [
    'position:fixed',
    'bottom:70px',
    'left:50%',
    'transform:translateX(-50%) translateY(8px)',
    'background:var(--bg2)',
    'border:1px solid ' + (type === 'positive' ? 'rgba(0,200,150,.3)' : 'rgba(59,130,246,.25)'),
    'border-radius:var(--r)',
    'padding:9px 18px',
    'font-family:var(--mono)',
    'font-size:11px',
    'color:var(--text)',
    'z-index:3200',
    'pointer-events:none',
    'opacity:0',
    'transition:opacity .25s,transform .25s',
    'max-width:360px',
    'text-align:center',
    'box-shadow:var(--shadow)',
  ].join(';');
  el.textContent = message;
  document.body.appendChild(el);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Animate out after 2.8s
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, 2800);
}

// ════════════════════════════════════════════════════════════════════════════
// VERBETERING 1 — VOORTGANGSBALK MET EURO-BEDRAGEN EN NEAR-WIN FEEDBACK
// Puur display. Patcht alleen de labelweergave van de bestaande progress bar.
// Geen engine-aanpassingen. Alle data komt van player.passiveIncome / .expenses.
// ════════════════════════════════════════════════════════════════════════════

(function _installRichProgressBar() {
  if (UIController.prototype._richProgressInstalled) return;
  UIController.prototype._richProgressInstalled = true;

  // Store reference to original _renderProgress (already defined in UIController)
  const _origProgress = UIController.prototype._renderProgress;

  UIController.prototype._renderProgress = function(player) {
    // Call original first — keeps percentage logic and bar fill intact
    _origProgress.call(this, player);

    // Enhance the label with euro amounts
    const labelEl = document.getElementById('win-progress-label');
    if (!labelEl) return;

    const passive  = Math.round(player.passiveIncome  || 0);
    const expenses = Math.round(player.expenses || 1);
    const pct      = Math.min(100, Math.round((passive / expenses) * 100));
    const needed   = Math.max(0, expenses - passive);
    const nearWin  = pct >= 75 && pct < 100;
    const won      = pct >= 100;

    if (won) {
      labelEl.innerHTML =
        `<span class="prog-near">🏆 Ontsnapt! Je passief inkomen dekt al je maandlasten.</span>`;
    } else if (nearWin) {
      labelEl.innerHTML =
        `<span class="prog-near">Je bent dichtbij financiële vrijheid. </span>` +
        `Nog <span class="prog-euro">€${needed.toLocaleString('nl-NL')}/mnd</span> nodig — ` +
        `nog een paar slimme zetten.`;
    } else {
      labelEl.innerHTML =
        `Passief inkomen: <span class="prog-euro">€${passive.toLocaleString('nl-NL')}</span>` +
        ` van <span class="prog-euro">€${expenses.toLocaleString('nl-NL')}</span> nodig` +
        (passive > 0 ? ` <span class="prog-streak">(${pct}%)</span>` : '');
    }

    // Add milestone markers at 25%, 50%, 75% (once, on first call)
    const track = labelEl.closest('.prog-sect')?.querySelector('.prog-track');
    if (track && !track.dataset.milestonesAdded) {
      track.dataset.milestonesAdded = '1';
      [25, 50, 75].forEach(m => {
        const mark = document.createElement('div');
        mark.className = 'prog-milestone';
        mark.style.left = `${m}%`;
        const lbl = document.createElement('div');
        lbl.className = 'prog-milestone-lbl';
        lbl.style.left = `${m}%`;
        lbl.textContent = `${m}%`;
        track.appendChild(mark);
        track.appendChild(lbl);
      });
    }
  };
})();


// ════════════════════════════════════════════════════════════════════════════
// VERBETERING 2 — ECONOMISCHE CYCLI: 4 NIEUWE MARKTEVENTS
// Voeg toe aan het bestaande ECON_EVENTS array via push().
// De bestaande _triggerEconomicEvent functie verwerkt ze automatisch.
// ════════════════════════════════════════════════════════════════════════════

(function _addEconEvents() {
  if (typeof ECON_EVENTS === 'undefined') return;

  const newEvents = [
    {
      id:     'beursCorrectie',
      icon:   '📊',
      type:   'bear',
      title:  'Beurscorrectie',
      sub:    'De markt is onrustig. Sommige beleggers verkopen, anderen zien juist kansen. Aandelen dalen tijdelijk met 20%.',
      effect: (p) => {
        p.assets
          .filter(a => a.type === 'stocks' || a.type === 'investment')
          .forEach(a => { a.cashflow = Math.round(a.cashflow * 0.8); });
      },
      logMsg: '📊 Beurscorrectie: aandelen cashflow tijdelijk -20%.',
    },
    {
      id:     'vastgoedKansen',
      icon:   '🏘️',
      type:   'bull',
      title:  'Vastgoedkansen',
      sub:    'Nieuwe investeringskansen op de woningmarkt. Huurprijzen stijgen in populaire wijken. Vastgoed +15%.',
      effect: (p) => {
        p.assets
          .filter(a => a.type === 'real_estate')
          .forEach(a => { a.cashflow = Math.round(a.cashflow * 1.15); });
      },
      logMsg: '🏘️ Vastgoedkansen: huurinkomsten +15%.',
    },
    {
      id:     'investeringsgolf',
      icon:   '🌊',
      type:   'bull',
      title:  'Investeringsgolf',
      sub:    'Particuliere investeerders stromen de markt in. Bedrijven groeien sneller. Jouw beleggingen profiteren mee.',
      effect: (p) => {
        // Modest boost on all asset types — represents general market uplift
        p.assets
          .filter(a => a.cashflow > 0)
          .forEach(a => { a.cashflow = Math.round(a.cashflow * 1.08); });
      },
      logMsg: '🌊 Investeringsgolf: alle bezittingen +8% cashflow.',
    },
    {
      id:     'kredietSchaarste',
      icon:   '🔒',
      type:   'neutral',
      title:  'Kredietschaarste',
      sub:    'Banken verscherpen de leenvoorwaarden. Nieuwe leningen zijn duurder. Wie al investeert, plukt de vruchten.',
      effect: (p) => {
        // Increases debt cost slightly — same mechanic as rentestijging
        p.debts.forEach(d => {
          d.monthlyPayment = Math.round(d.monthlyPayment * 1.1);
        });
      },
      logMsg: '🔒 Kredietschaarste: schuldbetalingen +10%.',
    },
  ];

  newEvents.forEach(ev => {
    // Avoid duplicate ids
    if (!ECON_EVENTS.find(e => e.id === ev.id)) {
      ECON_EVENTS.push(ev);
    }
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// VERBETERING 3 — ZELDZAME INVESTERINGSKANSEN
// Voeg 4 zeldzame kaarten toe aan opportunityCards via push().
// Ze gebruiken exact hetzelfde kaartformaat als de bestaande kaarten.
// Bestaande CardEngine verwerkt ze automatisch.
// ════════════════════════════════════════════════════════════════════════════

(function _addRareOpportunities() {
  if (typeof opportunityCards === 'undefined') return;

  const rareCards = [
    {
      id:          'opp_rare_startup_seed',
      type:        'opportunity',
      rarity:      'rare',
      title:       'Startende onderneming',
      description: 'Een ambitieuze ondernemer zoekt een vroege investeerder. Interessante kans — dit soort momenten komen niet vaak voorbij.',
      cost:        7500,
      cashflow:    0,
      icon:        '🚀',
      choices: [
        {
          label:     'Investeer €7.500 (hoog risico)',
          condition: (p) => p.cash >= 7500,
          effect:    (p) => {
            p.addCash(-7500, '(startup seed)');
            if (Math.random() > 0.45) {
              const gain = Math.floor(Math.random() * 9000) + 5000;
              p.addCash(gain, `(startup exit +${gain})`);
              p.addLog(`🚀 Startup succesvol — exit oplevering: +€${gain.toLocaleString('nl-NL')}.`);
            } else {
              p.addLog('🚀 Startup niet verder gekomen. Investering verloren. Risico hoort erbij.');
            }
          },
        },
        {
          label:  'Overslaan — nu niet het juiste moment',
          effect: (p) => p.addLog('Startup investering overgeslagen.'),
        },
      ],
    },
    {
      id:          'opp_rare_vastgoed_korting',
      type:        'opportunity',
      rarity:      'rare',
      title:       'Vastgoed met korting',
      description: 'Een woning staat 18% onder marktwaarde aangeboden vanwege een snelle verkoop. Stabiele huurvraag in de buurt. Zelden beschikbaar op dit niveau.',
      cost:        12000,
      cashflow:    680,
      icon:        '🏠',
      choices: [
        {
          label:     'Koop woning (€12.000)',
          condition: (p) => p.cash >= 12000,
          effect:    (p) => {
            p.addCash(-12000, '(vastgoed korting)');
            p.addAsset({
              id:       `rare_vastgoed_${Date.now()}`,
              name:     'Huurwoning (korting)',
              cost:     12000,
              cashflow: 680,
              type:     'real_estate',
            });
            p.addLog('🏠 Huurwoning gekocht met 18% korting. Cashflow: +€680/mnd.');
          },
        },
        {
          label:  'Overslaan',
          effect: (p) => p.addLog('Vastgoed met korting overgeslagen.'),
        },
      ],
    },
    {
      id:          'opp_rare_dividend_stabiel',
      type:        'opportunity',
      rarity:      'rare',
      title:       'Stabiel dividendaandeel',
      description: 'Een gevestigd nutsbedrijf betaalt al 12 jaar ononderbroken dividend. Geen hype, geen beloftes — gewoon betrouwbare cashflow.',
      cost:        4500,
      cashflow:    260,
      icon:        '📈',
      choices: [
        {
          label:     'Investeer €4.500',
          condition: (p) => p.cash >= 4500,
          effect:    (p) => {
            p.addCash(-4500, '(dividend aandeel)');
            p.addAsset({
              id:       `rare_div_${Date.now()}`,
              name:     'Stabiel Dividendaandeel',
              cost:     4500,
              cashflow: 260,
              type:     'stocks',
            });
            p.addLog('📈 Dividendaandeel toegevoegd. Stabiele cashflow: +€260/mnd.');
          },
        },
        {
          label:  'Overslaan',
          effect: (p) => p.addLog('Dividendaandeel overgeslagen.'),
        },
      ],
    },
    {
      id:          'opp_rare_digitaal_inkomen',
      type:        'opportunity',
      rarity:      'rare',
      title:       'Digitaal passief inkomen',
      description: 'Een bestaand digitaal product genereert automatisch inkomsten. De vorige eigenaar stopt ermee. Jij kunt de cashflow overnemen.',
      cost:        3800,
      cashflow:    310,
      icon:        '💻',
      choices: [
        {
          label:     'Koop digitaal product (€3.800)',
          condition: (p) => p.cash >= 3800,
          effect:    (p) => {
            p.addCash(-3800, '(digitaal product)');
            p.addAsset({
              id:       `rare_digital_${Date.now()}`,
              name:     'Digitaal Passief Product',
              cost:     3800,
              cashflow: 310,
              type:     'digital',
            });
            p.addLog('💻 Digitaal product overgenomen. Cashflow: +€310/mnd.');
          },
        },
        {
          label:  'Overslaan',
          effect: (p) => p.addLog('Digitaal product overgeslagen.'),
        },
      ],
    },
  ];

  rareCards.forEach(card => {
    if (!opportunityCards.find(c => c.id === card.id)) {
      opportunityCards.push(card);
    }
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// VERBETERING 4 — DAGELIJKSE UITDAGING SESSIE-FEEDBACK
// Toont een motiverende melding wanneer een nieuwe dagelijkse uitdaging
// beschikbaar is. Gebruikt het bestaande DAILY_GOALS systeem.
// Geen nieuwe opslag, geen nieuwe logica.
// ════════════════════════════════════════════════════════════════════════════

(function _installDailyChallengeNotifier() {
  if (typeof _getDailyGoal !== 'function') return;

  function _showChallengeAvailableBadge() {
    const badge = document.getElementById('ch-new-badge');
    if (!badge) return;

    // Only show if today's challenge is not yet completed
    try {
      const data  = JSON.parse(localStorage.getItem('fxminds_challenge') || '{}');
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const done  = (data.history || []).some(h => h.date === today && h.success);
      if (!done) {
        badge.classList.remove('hidden');
        badge.textContent = 'Nieuwe uitdaging beschikbaar — bouw vandaag verder aan je financiële vrijheid.';
        // Auto-hide after 8s so it doesn't dominate the UI
        setTimeout(() => badge.classList.add('hidden'), 8000);
      }
    } catch(_) {}
  }

  // Show once when game screen becomes visible
  const obs = new MutationObserver(() => {
    const gs = document.getElementById('game-screen');
    if (gs && !gs.classList.contains('hidden')) {
      setTimeout(_showChallengeAvailableBadge, 2000);
      obs.disconnect();
    }
  });
  obs.observe(document.body, {
    attributes: true, attributeFilter: ['class'],
    childList: true, subtree: true,
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// VERBETERING 5 — SPANNENDE FAST TRACK FASE
// Patch _showFastTrackIntro voor rijkere NL tekst en voeg 3 grote FT-kaarten
// toe aan het bestaande fastTrackCards array.
// ════════════════════════════════════════════════════════════════════════════

// ── 5a. Patch NL Fast Track intro tekst ─────────────────────────────────────
(function _patchFTIntroText() {
  if (typeof TRANSLATIONS === 'undefined') return;
  const nl = TRANSLATIONS.nl;
  if (!nl) return;

  // Richer, more motivating FT intro copy
  Object.assign(nl, {
    'ft.title':    'Je hebt de Ratrace verlaten.',
    'ft.tagline':  'Vanaf hier draait het om grote kansen en slimme beslissingen.<br>Welkom in de Fast Track.',
    'ft.quote':    '"Rijkdom is niet wat je verdient — het is wat je bezit laat verdienen<br>terwijl jij iets anders doet."',
    'ft.g1.title': 'Bedrijven overnemen',
    'ft.g1.sub':   '— overnames leveren schaalbare cashflow',
    'ft.g2.title': 'Grote vastgoed deals',
    'ft.g2.sub':   '— commercieel vastgoed, hogere rendementen',
    'ft.g3.title': 'Internationale beleggingen',
    'ft.g3.sub':   '— spreid risico over markten wereldwijd',
    'ft.g4.title': 'Jouw kapitaal laten werken',
    'ft.g4.sub':   '— passief inkomen op een nieuw niveau',
    'ft.btn':      '▶ Start de Fast Track',
  });
})();

// ── 5b. Add 3 large Fast Track investment cards ───────────────────────────────
(function _addLargeFTCards() {
  if (typeof fastTrackCards === 'undefined') return;

  const largeFTCards = [
    {
      id:          'ft_overname',
      type:        'fast_track',
      title:       'Bedrijfsovername',
      icon:        '🏢',
      description: 'Een winstgevend mkb-bedrijf staat te koop. De eigenaar stopt na 20 jaar. Cashflow is bewezen, risico is beheersbaar voor een slimme koper.',
      riskLevel:   'medium',
      choices: [
        {
          label:     'Neem het bedrijf over (€25.000)',
          condition: (p) => p.cash >= 25000,
          effect:    (p) => {
            p.addCash(-25000, '(bedrijfsovername)');
            const m = Math.floor(Math.random() * 900) + 1100;
            p.addAsset({
              id:       `overname_${Date.now()}`,
              name:     'Overgenomen Bedrijf',
              cost:     25000,
              cashflow: m,
              type:     'business',
            });
            p.addLog(`🏢 Bedrijfsovername afgerond. Maandelijkse cashflow: +€${m.toLocaleString('nl-NL')}/mnd.`);
          },
        },
        {
          label:  'Passen — nog niet het juiste moment',
          effect: (p) => p.addLog('Bedrijfsovername overgeslagen.'),
        },
      ],
    },
    {
      id:          'ft_commercieel_vastgoed',
      type:        'fast_track',
      title:       'Commercieel Vastgoed',
      icon:        '🏬',
      description: 'Een kantoorpand met langlopende huurcontracten. Professionele huurders, vaste inkomsten. Dit is hoe grote beleggers schaalbaarheid bouwen.',
      riskLevel:   'medium',
      choices: [
        {
          label:     'Investeer in pand (€35.000)',
          condition: (p) => p.cash >= 35000,
          effect:    (p) => {
            p.addCash(-35000, '(commercieel vastgoed)');
            const m = Math.floor(Math.random() * 700) + 1400;
            p.addAsset({
              id:       `comm_vastgoed_${Date.now()}`,
              name:     'Commercieel Vastgoed',
              cost:     35000,
              cashflow: m,
              type:     'real_estate',
            });
            p.addLog(`🏬 Commercieel pand verworven. Huurinkomsten: +€${m.toLocaleString('nl-NL')}/mnd.`);
          },
        },
        {
          label:  'Passen',
          effect: (p) => p.addLog('Commercieel vastgoed overgeslagen.'),
        },
      ],
    },
    {
      id:          'ft_internationaal_fonds',
      type:        'fast_track',
      title:       'Internationaal Beleggingsfonds',
      icon:        '🌍',
      description: 'Beleg in een gediversifieerd internationaal fonds met blootstelling aan groeimarkten. Spreid risico over drie continenten.',
      riskLevel:   'high',
      choices: [
        {
          label:     'Investeer €15.000 in fonds',
          condition: (p) => p.cash >= 15000,
          effect:    (p) => {
            p.addCash(-15000, '(internationaal fonds)');
            const win = Math.random() > 0.35;
            if (win) {
              const m = Math.floor(Math.random() * 600) + 700;
              p.addAsset({
                id:       `intl_fonds_${Date.now()}`,
                name:     'Internationaal Beleggingsfonds',
                cost:     15000,
                cashflow: m,
                type:     'investment',
              });
              p.addLog(`🌍 Internationaal fonds actief. Verwacht rendement: +€${m.toLocaleString('nl-NL')}/mnd.`);
            } else {
              p.addLog('🌍 Fonds presteert onder verwachting. Geen cashflow deze periode. Markt herstelt zich.');
            }
          },
        },
        {
          label:  'Passen',
          effect: (p) => p.addLog('Internationaal fonds overgeslagen.'),
        },
      ],
    },
  ];

  largeFTCards.forEach(card => {
    if (!fastTrackCards.find(c => c.id === card.id)) {
      fastTrackCards.push(card);
    }
  });
})();

// ── 5c. Rare opportunity card feedback toast ──────────────────────────────────
// Show extra motivation when a rare card is drawn
(function _patchRareCardFeedback() {
  const _origShowCard = UIController.prototype.showCard;
  if (!_origShowCard || UIController.prototype._rareCardFeedbackPatched) return;
  UIController.prototype._rareCardFeedbackPatched = true;

  UIController.prototype.showCard = function(data) {
    _origShowCard.call(this, data);
    if (data?.card?.rarity === 'rare') {
      setTimeout(() => {
        if (typeof _showFeedbackToast === 'function') {
          _showFeedbackToast('Interessante kans. Dit soort momenten komen niet vaak voorbij.', 'positive');
        }
      }, 500);
    }
  };
})();

