# Produktkravdokument (PRD) - [Prosjektnavn]

**Versjon:** [Versjonsnummer]  
**Dato:** [YYYY-MM-DD]  
**Forfatter(e):** [Navn]

*Intro: Dette er en omfattende mal ment å dekke de fleste behov. Ikke alle seksjoner er relevante for alle prosjekter. Bruk den medfølgende promptet for tips om hvordan du tilpasser malen til ditt prosjekt (MVP vs. kompleks tjeneste) og hvordan du best skriver for en AI-agent. Eksemplene i malen er illustrative, ikke dikterende.*

---

## 1. Prosjektoversikt

* **Visjon:** `[Beskriv det langsiktige, inspirerende målet. Hvor ønsker vi å være om 3-5 år med dette produktet/denne tjenesten?]`
* **Hypotese (Valgfri):** `[Formuler en testbar antagelse om brukerne, markedet eller løsningen som dette prosjektet søker å validere. Eks: "Vi tror at målgruppen X vil oppleve verdi Y hvis vi tilbyr funksjon Z på en enkel måte."]`
* **Problem:** `[Beskriv smerten/utfordringen brukeren eller markedet har i dag på en tydelig måte. Hvorfor er dette et problem verdt å løse? Hvilke nåværende løsninger (inkl. workarounds) er utilstrekkelige?]`
* **Løsning:** `[Beskriv på et overordnet nivå hvordan produktet/tjenesten adresserer problemet definert over. Hva er kjernen i løsningen? Hva er den unike verdien (value proposition) sammenlignet med alternativene?]`
* **Målgruppe:** `[Hvem er de primære og sekundære brukerne? Beskriv nøkkelsegmenter og deres viktigste kjennetegn (f.eks. rolle, bransje, behov, teknisk kompetanse).]`
    * *Persona 1 (Valgfri):* `[Gi et fiktivt navn og en rolle. Beskriv konkrete behov relatert til problemet, mål de prøver å oppnå (jobs-to-be-done), og frustrasjoner/smertepunkter de opplever med dagens situasjon.]`
    * *Persona 2 (Valgfri):* `[...]`
* **Forretningsmål/Produktmål:** `[Definer spesifikke, målbare, oppnåelige, relevante og tidsbestemte (SMART) mål for prosjektet. Koble dem gjerne til overordnede forretningsstrategier. Eks: "Øke kundeengasjement med X% innen Q3", "Redusere manuell behandlingstid med Y timer per uke innen 6 mnd.", "Oppnå Z betalende brukere innen årets slutt."]`
* **Suksesskriterier/Metrikker:** `[Hvordan vet vi objektivt at vi lykkes med å nå målene over? Definer konkrete, målbare nøkkelindikatorer (KPIer) som kan spores. Disse bør reflektere målene og detaljeres videre i Seksjon 16. Eks: "Konverteringsrate fra prøve til betalende > X%", "Gjennomsnittlig daglig brukertid > Y minutter", "Kundestøttekostnad per bruker < Z kr."]`
* **Kjente Begrensninger (Valgfri):** `[List opp viktige tekniske, ressursmessige, tidsmessige, juridiske eller organisatoriske begrensninger som påvirker prosjektets rammer og muligheter.]`
* **Budsjett/Ressursrammer (Valgfri):** `[Angi overordnede budsjettrammer, tilgjengelige ressurser (personell, kompetanse, utstyr) eller andre vesentlige rammebetingelser.]`
* **Omfang (Scope):**
    * **Inkludert:** `[List opp de viktigste funksjonene, egenskapene, leveransene eller brukerreisene som *er* en del av dette prosjektet eller denne fasen. Vær tydelig.]`
    * **Ekskludert:** `[List opp funksjoner, egenskaper eller leveranser som bevisst *ikke* er en del av dette prosjektet/denne fasen, for å unngå misforståelser og scope creep.]`
* **Konkurranselandskap (Valgfri):** `[Identifiser de viktigste direkte og indirekte konkurrentene eller alternative løsningene brukerne har i dag. Hva er deres styrker/svakheter? Hvordan skal vår løsning differensiere seg og posisjoneres i markedet?]`

---

## 2. LLM-Agent Spesifikasjoner

*(Denne seksjonen er relevant hvis løsningen involverer en Large Language Model-agent)*

* **Kapabiliteter:** `[Beskriv spesifikt hvilke oppgaver eller funksjoner LLM-agenten skal kunne utføre. Vær konkret. Eks: "Generere sammendrag av møtereferater på maks 200 ord", "Svare på ofte stilte spørsmål (FAQ) om produkt X basert på gitt kunnskapsbase", "Oversette tekst mellom norsk og engelsk", "Identifisere sentiment i brukeranmeldelser."]`
* **Begrensninger:** `[Identifiser kjente svakheter, risikoer eller begrensninger ved den valgte LLM-modellen eller tilnærmingen som må tas hensyn til i design og implementasjon. Eks: "Modellen kan 'hallusinere' (finne på fakta)", "Begrenset kunnskap om hendelser etter [dato]", "Kan være sensitiv for små endringer i input (prompt)", "Forstår ikke komplekse instruksjoner med mange ledd."]`
* **Ansvarsområder:** `[Definer tydelig hvilke oppgaver eller deler av en prosess agenten har *selvstendig* ansvar for, og hvor dens ansvar slutter før evt. menneskelig involvering.]`
* **Menneskelig Intervensjon:** `[Spesifiser nøyaktig hvor, når og hvordan menneskelig input, gjennomgang, godkjenning eller overstyring er nødvendig i prosessene agenten er involvert i. Eks: "Krever manuell godkjenning for alle svar som inneholder priser", "Eskalerer til menneskelig agent hvis brukeren uttrykker sterk misnøye", "Trenger menneskelig bekreftelse når konfidensscore fra modellen er under 80%."]`
* **Evalueringsmetrikker:** `[Hvordan skal agentens output evalueres objektivt? Spesifiser metrikker og metoder for å måle f.eks. faktabaserthet (grounding, f.eks. RAGAS score), relevans, koherens, sikkerhet/bias, og konfidensscore-nøyaktighet. Angi hvilke datasett eller benchmarks som eventuelt skal brukes. Henvis til Seksjon 13 for testdetaljer.]`
* **Kontekstvindubegrensninger (Valgfri):** `[Hvis relevant for valgt modell, beskriv begrensninger i hvor mye informasjon (antall tokens) agenten kan behandle samtidig. Hvordan påvirker dette designet (f.eks. behov for oppdeling av input, lagring av historikk)?]`
* **Tilnærming til Kompleksitet (Valgfri):** `[Beskriv strategier for å håndtere oppgaver som er for komplekse for agenten alene. Eks: "Dele opp store oppgaver i mindre, håndterbare del-oppgaver (task decomposition)", "Bruke spesifikke prompting-teknikker som 'chain-of-thought' eller 'ReAct'", "Integrere med eksterne verktøy/APIer for spesifikk funksjonalitet (f.eks. kalkulator, databaseoppslag)", "Eskalere til menneskelig ekspert."]`

---

## 3. Funksjonelle Krav (Features)

*(Beskriv de konkrete funksjonene systemet skal ha. Repeter strukturen under for hver funksjon.)*

* **Funksjon 1: [Gi et kort, beskrivende og unikt navn på funksjonen, gjerne brukerorientert. Eks: "Brukerprofil-redigering", "Søk etter produkter", "Generer månedsrapport".]**
    * **Beskrivelse:** `[Forklar hva funksjonen gjør fra et brukerperspektiv og hvilken forretnings- eller brukerverdi den gir. Hvorfor er denne funksjonen viktig? Hvilket brukerbehov dekker den?]`
    * **Brukerinteraksjon:** `[Beskriv steg-for-steg hvordan brukeren interagerer med denne spesifikke funksjonen. Hva klikker/skriver/ser brukeren? Henvis gjerne til brukerflyt i Seksjon 4 eller mockups i Vedlegg.]`
    * **Akseptansekriterier:** `[Definer testbare kriterier for når funksjonen anses som ferdig og korrekt implementert. Bruk formatet Gitt/Når/Så. Ha gjerne flere kriterier per funksjon for å dekke ulike scenarioer. Vær spesifikk og utvetydig. Eks: "Gitt at bruker er logget inn og er på profilsiden, Når bruker endrer navn-feltet og klikker 'Lagre', Så oppdateres navnet i databasen og det nye navnet vises på profilsiden med en suksessmelding."]`
    * **Kanttilfeller (Valgfri):** `[Beskriv hvordan systemet skal håndtere uvanlige, men mulige, situasjoner relatert til denne funksjonen. Tenk på feil input, uventede sekvenser, tomme data etc. Eks: "Hva skjer hvis brukeren prøver å lagre et tomt navn?", "Håndtering av nettverksfeil under lagring."]`
    * **Verdi vs. Kompleksitet:** *(Vurder relativ verdi mot relativ implementasjonskompleksitet for å hjelpe med prioritering)*
        * Verdi: `[Høy/Medium/Lav]` *(Hvor viktig er denne for bruker/forretning?)*
        * Kompleksitet: `[Høy/Medium/Lav]` *(Hvor krevende er den å bygge teknisk?)*
    * **Tekniske Vurderinger (Valgfri):** `[Nevn spesielle tekniske hensyn, avhengigheter (f.eks. til andre systemer, spesifikke APIer), mulige utfordringer eller foreslåtte tekniske løsninger knyttet til implementeringen av *denne* funksjonen.]`
    * **Prioritet:** `[Must Have / Should Have / Could Have / Won't Have]` *(Basert på MoSCoW-prinsippet for denne fasen/releasen)*
    * **Forretningsregler (Valgfri):** `[List opp spesifikke regler eller logikk fra forretningssiden som styrer hvordan denne funksjonen skal oppføre seg under gitte betingelser. Eks: "Kun administratorer kan slette brukere", "Produkt X kan kun kjøpes av kunder i Norge."]`
* **Funksjon 2: [...]** *(Repeter strukturen over for neste funksjon)*

**Prioriteringsmatrise (Valgfri):**
*(Oppsummer funksjonene her for en overordnet prioritering, spesielt nyttig ved prosjektstart eller faseplanlegging.)*
| Funksjon   | Verdi      | Kompleksitet | Prioritet (MoSCoW) | Fase (f.eks. MVP, Fase 2) |
| :--------- | :--------- | :----------- | :----------------- | :------------------------ |
| [Funksjon] | [H/M/L]    | [H/M/L]      | [Must/Should/...]  | [Fase]                    |
| ...        | ...        | ...          | ...                | ...                       |

---

## 4. Brukeropplevelse (UX) og Brukerflyt (Valgfri for små prosjekter)

* **Overordnet Brukerreise:** `[Beskriv den typiske 'hovedveien' eller de viktigste stegene en bruker tar gjennom systemet for å oppnå et sentralt mål (f.eks. fra landing til fullført kjøp). Kan være en liste med 3-7 hovedsteg eller et enkelt flytdiagram. Henvis gjerne til visuelt diagram i Vedlegg.]`
* **Kritiske Flyt (Valgfri):** `[Identifiser og prioriter de 2-3 aller viktigste brukerflytene som er avgjørende for produktets suksess (f.eks. onboarding, kjerneoppgave, konverteringspunkt). Disse bør detaljeres under.]`
* **Detaljert Brukerflyt (Valgfri):** *(Beskriv viktige flyter steg-for-steg. Repeter strukturen under for hver flyt.)*
    * **Flyt 1: [Gi et beskrivende navn på flyten, f.eks. "Registrering og onboarding", "Søke og filtrere produkter", "Fullføre utsjekk".]**
        1.  **Steg:** `[Beskriv det første steget i prosessen fra brukerens perspektiv. Nummerer stegene.]`
            * **Brukerhandling:** `[Hva gjør brukeren spesifikt i dette steget? Eks: "Klikker på 'Opprett konto'-knappen på hjemmesiden", "Fyller ut e-post og passord i skjemaet", "Velger 'Glemt passord'."]`
            * **Systemrespons:** `[Hva gjør systemet eller hva viser brukergrensesnittet som respons på brukerhandlingen? Eks: "Viser registreringsskjemaet", "Validerer e-postformatet live", "Navigerer til 'Nytt passord'-siden", "Sender bekreftelses-e-post."]`
            * **Suksesskriterium:** `[Hva bekrefter objektivt at dette steget er vellykket gjennomført? Eks: "Brukeren er nå på 'Velkommen'-siden og er logget inn", "Valideringsfeil vises ved siden av passordfeltet hvis krav ikke møtes."]`
            * **Feilhåndtering (Valgfri):** `[Hvordan håndterer systemet vanlige feil eller uventede hendelser i dette steget? Hvilke feilmeldinger vises, og er de forståelige? Eks: "Hvis e-post allerede er registrert, vises melding 'E-post er allerede i bruk' med lenke til innlogging."]`
            * **Tilgjengelighetshensyn (Valgfri):** `[Nevn spesifikke WCAG-krav eller andre tilgjengelighetshensyn som er viktige for dette steget. Eks: "Alle skjemafelter har tilknyttede <label>-elementer", "Knapper har tydelig fokusmarkering ved tastaturnavigasjon."]`
        2.  **Steg:** `[Beskrivelse av neste steg...]` *(Repeter underpunktene)*
    * **Flyt 2: [...]** *(Repeter strukturen over for neste flyt)*
* **UI/UX Hensyn (Valgfri):** `[Beskriv overordnede prinsipper eller krav til design og brukeropplevelse som gjelder på tvers av flyter. Eks: "Konsistent bruk av terminologi og ikoner", "Minimalistisk og intuitivt design", "Tydelig visuell feedback på brukerhandlinger", "Hensiktsmessig bruk av 'whitespace'." Henvis gjerne til Seksjon 7.]`
* **Støttede enheter (Valgfri):** `[Spesifiser hvilke enhetstyper (desktop, mobil, nettbrett), nettlesere (versjoner?) og operativsystemer løsningen skal designes for, støtte og testes på. Eks: "Primært desktop (Chrome, Firefox, Edge siste 2 versjoner), sekundært mobil (iOS Safari, Android Chrome siste 2 versjoner)."]`
* **Responsiv atferd (Valgfri):** `[Beskriv hvordan layout, innhold og funksjonalitet skal tilpasse seg ulike skjermstørrelser og orienteringer (portrett/landskap). Er det spesifikke 'breakpoints' å ta hensyn til?]`
* **Visuell Flyt (Valgfri):** `[Beskriv eller henvis til diagrammer (f.eks. site map, user flow diagram i Vedlegg) som viser navigasjonsstier og hvordan brukeren kan bevege seg mellom ulike skjermbilder, sider eller seksjoner i applikasjonen.]`

---

## 5. System-arbeidsflyter (Valgfri, Hopp over for små prosjekter)

*(Fokuserer på automatiserte prosesser, ofte backend eller mellom systemer. Repeter strukturen under for hver arbeidsflyt.)*

* **Arbeidsflyt 1: [Gi et navn som beskriver prosessen tydelig, f.eks. "Automatisk fakturagenerering", "Synkronisering av brukerdata med CRM", "Nattlig import av produktdata".]**
    * **Utløser:** `[Hva starter denne automatiserte prosessen? Eks: "En tidsstyrt jobb (cron job) hver natt kl. 02:00", "En melding mottas på meldingskø X (f.eks. RabbitMQ, Kafka)", "Et API-kall til endepunkt Y", "En database-trigger på tabell Z."]`
    * **Prosess-steg:** `[List opp de logiske hovedstegene i den automatiserte prosessen i riktig rekkefølge. Beskriv kort hva som skjer i hvert steg. Eks: 1. Hent nye ordrer fra database. 2. For hver ordre, generer PDF-faktura. 3. Send faktura via e-post til kunde. 4. Oppdater ordrestatus til 'Fakturert'.]`
    * **Avhengigheter:** `[Hvilke andre systemer, APIer, datakilder, filer eller ressurser er denne arbeidsflyten avhengig av for å kunne kjøre korrekt?]`
    * **Feilhåndtering (Valgfri):** `[Hvordan håndterer systemet feil som kan oppstå underveis i denne automatiserte flyten? Eks: "Logge detaljert feilmelding til sentralt loggsystem", "Sende varsel (e-post/Slack) til driftsteam", "Implementere 'retry'-mekanisme med eksponentiell backoff for midlertidige feil", "Markere feilet element for manuell oppfølging", "Rulle tilbake databaseendringer ved kritisk feil."]`
    * **Ytelsesmål (Valgfri):** `[Definer eventuelle krav til ytelse eller gjennomstrømning for denne spesifikke arbeidsflyten. Eks: "Hele prosessen må fullføres innen X minutter/timer", "Skal kunne behandle Y transaksjoner per time uten å hope seg opp."]`
    * **Gjenopprettingsplan (Valgfri):** `[Hvordan kan systemet eller data gjenopprettes til en konsistent tilstand hvis denne arbeidsflyten feiler kritisk eller fører til inkonsistens? Eks: "Mulighet for manuell re-kjøring av prosessen for et gitt tidsrom/subset av data", "Gjenoppretting av database fra backup."]`
    * **Logging og overvåking (Valgfri):** `[Hvilken informasjon skal logges underveis i prosessen for feilsøking og sporing? Hvilke spesifikke metrikker skal overvåkes for å sikre at flyten fungerer som forventet (f.eks. antall behandlede elementer, antall feil, kjøretid)? Henvis gjerne til Seksjon 15.]`

---

## 6. Ikke-Funksjonelle Krav (NFRs, Forenklet for små prosjekter)

*(Disse kravene beskriver *hvordan* systemet skal fungere og hvilke kvaliteter det skal ha, i motsetning til funksjonelle krav som beskriver *hva* det skal gjøre.)*

* **Ytelse:** `[Spesifiser målbare krav til systemets hastighet, responsivitet og kapasitet under forventet last. Vær så konkret som mulig med både mål og målemetode/kontekst. Eks: "Mål: 95% av alle API-kall skal returnere svar innenfor 500ms under normal last. Målemetode: Verifiseres via lasttest X i staging-miljø.", "Mål: Sider med dynamisk innhold skal laste (LCP) på under 2.5 sekunder på 4G. Målemetode: Måles med verktøy Y i produksjon.", "Mål: Systemet skal kunne håndtere X samtidige aktive brukere uten merkbar ytelsesforringelse. Verifisering: Dokumentert ytelsestest med simulert last."]`
* **Sikkerhet (Valgfri):** `[Beskriv overordnede sikkerhetsprinsipper og spesifikke krav for å beskytte systemet og dataene, med konkrete mål og verifiseringsmetoder. Henvis gjerne til relevante standarder (f.eks. OWASP Top 10, relevante ISO-standarder). Eks: "Mål: All brukerkommunikasjon skal krypteres med HTTPS (TLS 1.2+). Verifisering: SSL Labs test med minst A-rating.", "Mål: Systemet skal motstå OWASP Top 10-angrep. Verifisering: Kvartalsvis sikkerhetsgjennomgang med automatiserte og manuelle tester.", "Mål: Passord skal lagres sikkert (f.eks. med Argon2id). Verifisering: Kodegjennomgang og penetrasjonstest."]`
    * *Sjekkliste (Illustrative eksempler, ikke uttømmende):*
        * [ ] Kryptering av sensitive data 'at rest' (i databasen/filer)
        * [ ] Grundig input-validering på alle API-endepunkter og skjemafelter for å hindre injeksjonsangrep (SQLi, XSS)
        * [ ] Sikker autentiseringsmekanisme (f.eks. multi-faktor autentisering hvis nødvendig)
        * [ ] GDPR-samsvar (se også Seksjon 16 og 17)
* **Skalerbarhet (Valgfri):** `[Beskriv systemets evne til å håndtere økt arbeidsmengde over tid på en kostnadseffektiv måte, med kvantifiserbare mål. Eks: "Mål: Systemet skal kunne håndtere en 10x økning i antall brukere innen 2 år med maksimalt 2x økning i responstid. Målemetode: Skalerbarhetstest med simulert last og kostnadsanalyse.", "Mål: Databasen skal kunne vokse til minst 500GB med mindre enn 10% degradering i spørringer. Verifisering: Volumtest med realistiske datamengder."]`
* **Pålitelighet (Valgfri):** `[Definer krav til systemets stabilitet, oppetid og evne til å håndtere feil, med konkrete mål og målemetoder. Eks: "Mål: Systemet skal ha en månedlig oppetid på minst 99.9% (ekskludert planlagt vedlikehold). Verifisering: Monitorering av tjeneste Z.", "Mål: Systemet skal gjenopprettes innen 30 minutter ved uplanlagt nedetid. Målemetode: Regelmessige disaster recovery-øvelser.", "Mål: Ingen tap av brukerdata ved systemfeil. Verifisering: Automatiserte recovery-tester."]`
* **Brukervennlighet (Valgfri):** `[Beskriv krav til hvor enkelt, effektivt og tilfredsstillende systemet skal være å bruke, med spesifikke mål og målemetoder. Eks: "Mål: Nye brukere skal kunne fullføre kjerneoppgave X innen Y minutter uten ekstern hjelp. Målemetode: Modererte brukertester med representativ brukergruppe.", "Mål: Oppnå SUS-score (System Usability Scale) på minst 80/100. Verifisering: Brukerundersøkelse etter lansering.", "Mål: Maks 5% av brukere forlater systemet før fullført registrering. Målemetode: Konverteringsfunnel-analyse i analyseverktøy."]`
* **Tilgjengelighet (Valgfri):** `[Spesifiser krav til universell utforming med spesifikke standarder og testmetoder. Eks: "Mål: Systemet skal som minimum møte kravene i WCAG 2.1 Nivå AA. Verifisering: Automatisert testing med verktøy X og manuell gjennomgang av ekspert.", "Mål: Alle kjerneoppgaver skal kunne gjennomføres med bare tastatur. Målemetode: Dedikert tilgjengelighetstest med skjermleser og tastaturnavigasjon."]`
* **Vedlikeholdbarhet (Valgfri):** `[Beskriv krav som gjør systemet enklere å forstå, modifisere og videreutvikle, med spesifikke mål og målemetoder. Eks: "Mål: Oppnå kodekvalitetsscore på minst 8/10 i SonarQube eller tilsvarende verktøy. Verifisering: Automatisert kodeanalyse ved hver pull request.", "Mål: Endringer i et modul skal ikke påvirke funksjonalitet i andre moduler. Målemetode: Omfattende enhetstestdekning (>85%)."]`
* **Internasjonalisering (I18n, Valgfri):** `[Beskriv systemets tekniske evne til å støtte ulike språk og formater, med spesifikke designkrav og testmetoder. Eks: "Mål: Alle tekstelementer skal kunne oversettes uten kodeendringer. Verifisering: Gjennomgang av kode for hardkodede strenger.", "Mål: UI skal håndtere tekst som er opptil 30% lengre enn originalspråket. Målemetode: Visuell testing med oversatte tekststrenger."]`
* **Lokalisering (L10n, Valgfri):** `[Spesifiser hvilke konkrete språk og tilpasninger som skal implementeres, med kompletthetkrav. Eks: "Mål: 100% av brukergrensesnittet skal være tilgjengelig på norsk (bokmål) og engelsk (US) ved lansering. Verifisering: Gjennomgang av alle skjermbilder med begge språk aktivert.", "Mål: Alle datoverdier vises i riktig format basert på brukerens språkinnstilling. Testmetode: Automatiserte tester med ulike språkinnstillinger."]`
* **Andre (Valgfri):** `[List opp andre relevante ikke-funksjonelle krav med spesifikke mål og målemetoder. F.eks: "Mål: Systemet skal være fullt kompatibelt med eldre system X versjon Y. Verifisering: Comprehensive integrasjonstester.", "Mål: Applikasjonen skal fungere i offline-modus med synkronisering når nettverket er tilgjengelig. Testmetode: Scenarier med nettverksbrudd og gjenoppretting."]`

---

## 7. Design og Stilguide (Valgfri for små prosjekter)

*(Beskriver de visuelle og interaktive retningslinjene for produktet. Henvis gjerne til et dedikert designsystem eller UI-kit hvis det finnes.)*

* **Designprinsipper:** `[Beskriv 3-5 overordnede prinsipper som skal guide alle designvalg og sikre en konsistent opplevelse. Eks: "Enkelhet og klarhet", "Brukerkontroll og frihet", "Konsistens og standarder", "Tilgjengelighet for alle."]`
* **Fargepalett:** `[Spesifiser de definerte primær-, sekundær-, nøytral- og aksentfargene med deres hex-koder (eller annen relevant kode). Beskriv kort bruksområdet for hver farge (f.eks. knapper, linker, bakgrunner, feilmeldinger). Henvis gjerne til visuell guide i Vedlegg. Eks: "Primær: #00AABB (Hovedknapper, aktive elementer)", "Nøytral-Mørk: #333333 (Brødtekst)." ]`
* **Typografi:** `[Definer skrifttyper (fonter), størrelser, vekting (bold, regular etc.) og linjehøyde for ulike tekstelementer (f.eks. H1, H2, H3, brødtekst, knapper, bildetekster). Spesifiser fontfiler eller webfont-tjeneste. Eks: "Overskrifter: 'Poppins Bold', Brødtekst: 'Inter Regular' 16px / 1.5 linjehøyde."]`
* **Komponentbibliotek (Valgfri):** `[Beskriv eller lenk til et definert sett med gjenbrukbare UI-komponenter (f.eks. knapper i ulike varianter, input-felt, dropdowns, kort, modaler). Angi hvilket rammeverk/bibliotek som brukes (f.eks. Material UI, Ant Design, internt React-bibliotek) eller om det er definert i et designverktøy (Figma).]`
* **Logo/Ikonografi (Valgfri):** `[Spesifiser hvilke logo-varianter som finnes og retningslinjer for korrekt bruk (størrelse, plassering, luft). Beskriv eller lenk til ikonsettet som skal brukes (f.eks. Font Awesome, Material Icons, egendefinert sett) og retningslinjer for stil og bruk.]`
* **Layout/Grid (Valgfri):** `[Beskriv prinsippene for sidens layout og grid-systemet som skal brukes for å sikre visuell konsistens og struktur. Eks: "Bruker et 12-kolonners responsivt grid-system basert på Bootstrap", "Standard marger og padding er X px."]`
* **Designsystem (Valgfri):** `[Hvis et mer omfattende, formelt designsystem eksisterer (som dekker prinsipper, komponenter, mønstre, kode etc.), lenk til det her. Eks: "Se vårt designsystem på [URL] (Figma/Storybook/Zeroheight)." ]`
* **Beskrivelse av Mockups:** `[Gi en kort beskrivelse av og lenker til sentrale design-mockups eller klikkbare prototyper (gjerne i Vedlegg eller lenket fra Figma/Sketch/Adobe XD) som illustrerer det endelige visuelle designet og viktige brukerflyter.]`
* **Animasjoner og overganger (Valgfri):** `[Beskriv prinsipper og retningslinjer for bruk av animasjoner, mikrointeraksjoner og overganger i brukergrensesnittet. Skal de være subtile og funksjonelle? Hvilke elementer skal/skal ikke animeres? Eks: "Animasjoner skal primært brukes for å gi feedback og guide brukeren", "Bruk enkle fade-in/out-effekter på modaler", "Unngå distraherende eller unødvendige animasjoner."]`

---

## 8. Datahåndtering og API-spesifikasjoner (Valgfri, Hopp over for små prosjekter)

* **Datamodeller (Valgfri):** `[Beskriv de sentrale dataobjektene/entitetene i systemet (ofte substantivene i domenet), deres viktigste attributter (egenskaper) og deres datatyper (tekst, tall, dato etc.). Kan være en liste her eller, for mer komplekse systemer, referere til et Entity-Relationship Diagram (ERD) i Vedlegg. Eks: "Bruker { bruker_id: int (PK), navn: string(100), epost: string(255) UNIQUE, opprettet_ts: timestamp }", "Ordre { ordre_id: int (PK), bruker_id: int (FK), ordre_dato: date, totalbeløp: decimal(10,2) }".]`
* **Datarelasjoner (Valgfri):** `[Beskriv hvordan de ulike datamodellene henger sammen. Spesifiser type relasjon (en-til-en, en-til-mange, mange-til-mange). Referer gjerne til ER-diagram i Vedlegg. Eks: "En Bruker kan ha mange Ordrer (1-til-mange relasjon via bruker_id)", "Et Produkt kan finnes på mange Ordrer, og en Ordre kan inneholde mange Produkter (mange-til-mange via en koblingstabell Ordrelinje)."]`
* **LLM-spesifikke Datakrav (Valgfri):** *(Relevant hvis LLM brukes aktivt med spesifikke data)*
    * Treningsdata: `[Hvis LLM-en skal finjusteres ('fine-tuning'), beskriv hvilke data som trengs for dette. Format (eks: prompt/completion par)? Kilde? Volum? Krav til kvalitet og representativitet? Eventuelle krav til preprosessering eller annotering.]`
    * Datakvalitet: `[Definer spesifikke kvalitetskrav til data som brukes som input til LLM-en under operasjonell bruk (f.eks. data fra kunnskapsbase, brukerinput). Eks: "Data i kunnskapsbasen må være oppdatert og faktabasert", "Brukerinput må saniteres for PII før sending til LLM."]`
    * Datamengde: `[Angi nødvendig eller tilgjengelig mengde data for finjustering eller for å gi tilstrekkelig kontekst til LLM-en under operasjon.]`
    * Innsamlingsstrategi: `[Hvordan skal nødvendige data for LLM-en samles inn, enten for trening eller operasjonell bruk? Fra hvilke interne/eksterne kilder?]`
    * Behandlingsstrategi: `[Hvordan skal data forbehandles, anonymiseres, pseudonymiseres, struktureres eller berikes før de brukes av/med LLM-en? Hvilke verktøy/prosesser brukes?]`
* **API-spesifikasjoner (Valgfri):** *(Beskriv grensesnittet for hvordan andre systemer (inkludert frontend) kan interagere med dette systemet. Bruk gjerne standarder som OpenAPI/Swagger og lenk til fullstendig spec i Vedlegg.)*
    * **API Kontrakter/Skjemaer:** `[Henvis til vedlagte eller lenkede formelle kontrakter som OpenAPI/Swagger-spesifikasjoner (for REST), Protocol Buffer-definisjoner (for gRPC), eller JSON Schema-filer (for meldingskøer/objekter). Hvis disse detaljerte kontraktene ikke eksisterer enda, skal dette markeres som en kritisk mangel som må adresseres før implementering.]`
    * **Endepunkt 1: `[METODE] /sti`** *(Eks: `GET /api/v1/users/{userId}`, `POST /api/v1/orders`)*
        * **Beskrivelse:** `[Forklar tydelig formålet med dette endepunktet. Hva gjør det? Hvilken ressurs opererer det på? Hvem er den typiske konsumenten?]`
        * **Request:** `[Beskriv den forventede forespørselen: URL-parametere (som `{userId}`), query-parametre (f.eks. `?status=pending`), påkrevde/valgfrie HTTP-headere (f.eks. `Authorization`, `Content-Type`), og format/skjema for request body (hvis relevant, f.eks. JSON-objekt med spesifikke felt). Angi hva som er påkrevd/valgfritt og eventuelle valideringsregler.]`
        * **Response:** `[Beskriv mulige HTTP-responser: Suksess-statuskoder (f.eks. 200 OK, 201 Created, 204 No Content) og format/skjema for deres response body (hvis relevant). Beskriv også vanlige feil-statuskoder (f.eks. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error) og formatet på deres feilmeldinger/response body.]`
        * **Rate Limiting (Valgfri):** `[Angi eventuelle begrensninger på antall kall tillatt per tidsenhet for dette endepunktet, per bruker eller per API-nøkkel. Eks: "Maks 60 kall per minutt per API-nøkkel."]`
        * **Caching-strategi (Valgfri):** `[Beskriv hvordan responsen fra dette endepunktet (spesielt for GET-kall) kan eller bør caches for å forbedre ytelse og redusere last. Hvilke cache-headere (f.eks. `Cache-Control`, `ETag`) settes? Hvor lenge er data typisk gyldig?]`
    * **Endepunkt 2: [...]** *(Repeter strukturen)*
* **Autentisering (Valgfri):** `[Beskriv den overordnede metoden for hvordan API-konsumenter skal autentisere seg for å få tilgang til beskyttede endepunkter. Eks: "Krever en gyldig API-nøkkel sendt i `X-API-Key`-headeren", "Bruker OAuth 2.0 Client Credentials Flow for server-til-server-kall", "Bruker JWT (JSON Web Tokens) i `Authorization: Bearer <token>`-header etter innlogging."]`
* **Data Validering (Valgfri):** `[Beskriv den generelle strategien for validering av inndata mottatt via API-et. Hvor skjer valideringen (API gateway, applikasjonslag)? Hvilke typer validering utføres (format, lengde, påkrevd, forretningslogikk)?]`
* **Edge Cases (Valgfri):** `[Beskriv hvordan API-et generelt håndterer spesielle eller uventede situasjoner utover standard feilkoder. Eks: "Håndtering av idempotens for POST/PUT-kall (f.eks. via `Idempotency-Key` header)?", "Hva skjer ved ugyldig JSON i request body?"]`
* **Databasemigrering (Valgfri):** `[Beskriv prosessen og verktøyene for hvordan endringer i databaseskjemaet (nye tabeller, endrede felt etc.) skal håndteres på en kontrollert måte mellom ulike versjoner av applikasjonen. Eks: "Bruker 'Alembic' (for Python/SQLAlchemy) for å generere og kjøre migreringsskript", "Migreringer kjøres automatisk som en del av deployment-prosessen."]`
* **Datalagringspolitikk (Valgfri):** `[Beskriv retningslinjer for hvor lenge ulike typer data skal lagres i systemet, når og hvordan data skal slettes eller anonymiseres, og eventuelle krav til arkivering. Må være i tråd med personvernlovgivning (GDPR) og forretningsbehov. Eks: "Brukerdata slettes automatisk 90 dager etter kontosletting", "Logger lagres i 12 måneder."]`

---

## 9. Teknisk Arkitektur (Valgfri, Hopp over for små prosjekter)

*(Beskriver den overordnede strukturen og oppbygningen av systemet.)*

* **Systemkomponenter (Valgfri):** `[Identifiser og beskriv de viktigste logiske eller fysiske byggeblokkene (komponentene) i systemet. Kan være frontend-applikasjon, backend-tjenester (monolitt/mikrotjenester), databaser, meldingskøer, API gateway etc. Forklar kort ansvaret til hver hovedkomponent. Henvis gjerne til et overordnet arkitekturdiagram (f.eks. C4 model L1/L2) i Vedlegg.]`
* **Kommunikasjonsflyt (Valgfri):** `[Beskriv hvordan hovedkomponentene kommuniserer med hverandre. Hvilke protokoller og mønstre brukes (f.eks. synkron REST/HTTPS, asynkron via meldingskø, gRPC)? Hvordan går dataflyten for en typisk forespørsel? Henvis gjerne til sekvensdiagram eller dataflytdiagram i Vedlegg.]`
* **Arkitekturmønster (Valgfri):** `[Beskriv de sentrale arkitekturmønstrene som ligger til grunn for designet. Eks: "Mikrotjenestearkitektur", "Event-Driven Architecture (EDA)", "Lagdelt monolitt (N-tier)", "Serverless architecture", "CQRS (Command Query Responsibility Segregation)." Forklar kort hvorfor mønsteret er valgt.]`
* **Infrastruktur (Valgfri):** `[Beskriv den underliggende infrastrukturen systemet skal kjøre på. Hvilken skyleverandør (AWS, Azure, GCP) eller on-premise løsning? Hvilke sentrale tjenester brukes (f.eks. Kubernetes (EKS, AKS, GKE), virtuelle maskiner (EC2), serverless funksjoner (Lambda, Azure Functions), databasetjenester (RDS, Cosmos DB), lagring (S3, Blob Storage))?]`
* **Datamapping (Integrasjoner):** `[Beskriv hvordan datafelter mappes mellom dette systemet og viktige eksterne systemer det integreres med (f.eks. System X felt A -> CRM felt B).]`
* **Feilhåndteringsstrategi (Integrasjoner):** `[Beskriv hvordan feil i kommunikasjonen med viktige eksterne systemer (f.eks. API timeout, ugyldig respons, rate limit) skal håndteres spesifikt for hver sentral integrasjon (retry-logikk, varsling, fallback-mekanismer etc.).]`
* **Tekstlig Diagram (Valgfri):** `[Gi en enkel tekstbasert representasjon (f.eks. med ASCII-kunst eller innrykk) av hovedkomponentene og de viktigste kommunikasjonslinjene, som et supplement eller alternativ til visuelle diagrammer.]`
* **Teknisk gjeld-strategi (Valgfri):** `[Hvordan skal teknisk gjeld (kompromisser gjort for å levere raskere, som må rettes opp senere) identifiseres, dokumenteres, prioriteres og aktivt nedbetales over tid for å unngå at systemet forfaller?]`
* **Systemgrenser (Valgfri):** `[Definer tydelig grensene for *dette* systemet. Hvilke ansvarsområder har systemet, og hvilke ligger utenfor (i andre systemer)? Hvilke er de viktigste eksterne systemene det integreres mot, og hva er grensesnittet mot dem?]`

---

## 10. Teknologistack

*(Oppsummerer de viktigste teknologiene, verktøyene og plattformene som skal brukes.)*

* **Frontend:** `[List opp hovedteknologier, programmeringsspråk, rammeverk og sentrale biblioteker for brukergrensesnittet. Eks: "JavaScript (ES2022), TypeScript 5.x, React 18.x, Next.js 14.x, Zustand (state management), Tailwind CSS, Jest/React Testing Library."]`
* **Backend (Valgfri):** `[List opp hovedteknologier, programmeringsspråk, rammeverk og sentrale biblioteker for server-siden. Eks: "Java 17, Spring Boot 3.x, Spring Data JPA, Maven", eller "Python 3.11, FastAPI, SQLAlchemy 2.x, Pydantic V2, Poetry."]`
* **Database (Valgfri):** `[Spesifiser hvilke(n) databaseløsning(er) som skal brukes for datalagring. Inkluder gjerne versjon. Eks: "PostgreSQL 16", "MongoDB Atlas", "Redis 7.x (for caching og sesjoner)", "Elasticsearch 8.x (for avansert søk)."]`
* **Eksterne Integrasjoner (Valgfri):** `[List opp viktige eksterne SaaS-tjenester eller tredjeparts APIer som systemet er avhengig av. Eks: "Stripe API (for betalingsbehandling)", "Twilio API (for SMS-varsling)", "Auth0 (for autentisering)", "Google Maps API (for kartvisning)." ]`
* **Utviklingsverktøy:** `[List opp sentrale verktøy som brukes i utviklingsprosessen (utover språk/rammeverk). Eks: "IDE: VS Code / IntelliJ IDEA", "Versjonskontroll: Git / GitHub", "Containerisering: Docker / Docker Compose", "Byggverktøy: Webpack / Vite / Maven / Gradle", "Testing: Pytest / JUnit / Jest / Cypress."]`
* **Deployment:** `[Beskriv hvordan applikasjonen pakkes og deployes til ulike miljøer (utvikling, staging, produksjon). Hvilke plattformer, verktøy og metoder brukes? Eks: "Bygger Docker images i CI/CD", "Deployer til Azure Kubernetes Service (AKS) via Helm charts og Azure DevOps Pipelines", "Frontend deployes til Vercel."]`
* **Overvåkingsverktøy (Valgfri):** `[Spesifiser hvilke verktøy som skal brukes for logging, sporing (tracing), metrikkinnsamling og varsling i produksjon. Eks: "Logging: ELK Stack (Elasticsearch, Logstash, Kibana) / Grafana Loki", "Metrikker: Prometheus / Grafana", "APM/Tracing: Datadog / Dynatrace / OpenTelemetry", "Feilsporing: Sentry." Henvis til Seksjon 15.]`
* **Analytikkplattform (Valgfri):** `[Spesifiser hvilke verktøy som skal brukes for å samle inn, analysere og visualisere brukeratferd og produktmetrikker. Eks: "Amplitude", "Mixpanel", "Google Analytics 4", "Segment (som datanav)." Henvis til Seksjon 16.]`

---

## 11. Prosjekt- og Kodestruktur (Valgfri, Hopp over for små prosjekter)

*(Beskriver hvordan kodebasen og prosjektet organiseres for å fremme samarbeid, vedlikeholdbarhet og kvalitet.)*

* **Mappestruktur:** `[Beskriv eller vis et eksempel på den anbefalte eller påkrevde mappestrukturen for kodebasen. Forklar kort formålet med de viktigste toppnivå-mappene. Eks: `src/` for kildekode, `tests/` for tester, `docs/` for dokumentasjon, `scripts/` for hjelpeskript.]`
* **Navnekonvensjoner (Valgfri):** `[Definer standardiserte konvensjoner for navngivning av filer, mapper, variabler, funksjoner, klasser, komponenter, API-endepunkter etc. for å sikre konsistens. Eks: "Bruk `camelCase` for variabler og funksjoner", "Bruk `PascalCase` for klasser og React-komponenter", "Bruk `kebab-case` for filnavn og CSS-klasser."]`
* **Kode Stilguide (Valgfri):** `[Spesifiser hvilken(e) offisiell(e) eller intern(e) stilguide(r) som skal følges for hvert programmeringsspråk. Nevn hvilke verktøy (linters, formatters) som brukes for å håndheve stilen automatisk. Eks: "Følg PEP 8 for Python (håndheves med Black og Flake8)", "Følg Airbnb JavaScript Style Guide (håndheves med ESLint og Prettier)." ]`
* **Dokumentasjonskrav (Valgfri):** `[Beskriv forventningene til dokumentasjon i kodebasen og prosjektet. Eks: "Alle public funksjoner/metoder/klasser skal ha docstrings", "Kompleks logikk skal kommenteres", "Hver tjeneste/pakke skal ha en README.md", "API-dokumentasjon skal genereres automatisk fra kode (f.eks. med Swagger/OpenAPI)." ]`
* **Versjonskontroll (Valgfri):** `[Spesifiser hvilket versjonskontrollsystem som brukes (vanligvis Git). Beskriv den anbefalte branching-strategien (f.eks. GitFlow, GitHub Flow, Trunk-Based Development) og eventuelle regler for commit-meldinger (f.eks. Conventional Commits).]`
* **CI/CD-flyt (Valgfri):** `[Beskriv hovedstegene i Continuous Integration (CI) og Continuous Deployment/Delivery (CD)-prosessen. Hvilke verktøy brukes (f.eks. GitHub Actions, GitLab CI, Jenkins, Azure DevOps)? Hva utløser en CI-bygg (f.eks. push til branch)? Hva skjer i CI-pipelinen (bygg, test, linting, sikkerhetsskann)? Hvordan trigges deploy til ulike miljøer? Henvis gjerne til deployment-beskrivelsen i Seksjon 10.]`

---

## 12. Utviklingsfaser og Avhengigheter

*(Beskriver hvordan prosjektet deles opp i faser og håndterer avhengigheter.)*

* **Proof of Concept (PoC, Valgfri):** *(Brukes for å teste en spesifikk teknisk hypotese eller redusere en identifisert risiko før full utvikling starter.)*
    * Mål: `[Hva er det konkrete, avgrensede spørsmålet eller den tekniske usikkerheten denne PoC-en skal gi svar på? Eks: "Kan vi integrere med API X?", "Er ytelsen til algoritme Y god nok?", "Er det mulig å oppnå Z med LLM-modell A?"]`
    * Omfang: `[Hva skal spesifikt bygges og testes i PoC-en? Hva er suksesskriteriene for PoC-en? Hva er *ikke* en del av PoC-en (f.eks. UI, full feilhåndtering)?]`
* **Fase 1: MVP (Minimum Viable Product)**
    * **Mål:** `[Hva er det overordnede målet med MVP-en? Hvilken kjerne-hypotese skal testes? Hvilken minimal verdi skal leveres til hvilken tidlig brukergruppe (early adopters)? Eks: "Validere at brukere er villige til å betale for kjernefunksjon X", "Få tidlig feedback på brukervennligheten av kjerneflyt Y."]`
    * **Funksjoner/Krav:** `[List opp de funksjonelle og ikke-funksjonelle kravene (primært 'Must Haves' fra Seksjon 3 og essensielle NFRs fra Seksjon 6) som *må* være med i MVP-en for å nå målet.]`
    * **Logisk Første Steg:** `[Hva er det aller første som må bygges eller settes opp for å kunne begynne å realisere MVP-en? Eks: "Sette opp grunnleggende prosjektstruktur og CI/CD", "Implementere autentisering."]`
* **Fase 2: [Gi fasen et beskrivende navn, f.eks. "Utvidelse med funksjon X", "V1.1 - Ytelsesforbedringer", "Lansering til nytt segment Z"] (Valgfri):**
    * **Mål:** `[Hva er hovedmålet med denne neste fasen, basert på læring fra MVP eller strategiske prioriteringer? Eks: "Øke brukeradopsjon ved å legge til funksjon X", "Forbedre brukertilfredshet ved å fikse de viktigste smertepunktene fra MVP-feedback", "Nå break-even."]`
    * **Funksjoner/Krav:** `[List opp funksjonelle krav (typisk 'Should Haves', kanskje noen 'Could Haves') og eventuelle nye eller justerte NFRs som inngår i denne fasen.]`
    * **Avhengigheter:** `[Er denne fasen avhengig av eksterne faktorer, resultater fra forrige fase, eller ferdigstillelse av andre parallelle løp?]`
* **Iterasjonsplan (Valgfri):** `[Beskriv hvordan utviklingsarbeidet organiseres i kortere sykluser (iterasjoner/sprinter). Hva er lengden på hver iterasjon (f.eks. 2 uker)? Hvilke møter/seremonier brukes (f.eks. sprintplanlegging, daglig stand-up, demo/review, retrospektiv)?]`
* **Logisk Avhengighetskjede:** `[Beskriv eller visualiser (f.eks. med et enkelt Gantt-lignende diagram eller en liste) de viktigste avhengighetene mellom ulike funksjoner, komponenter eller faser. Hva må være ferdig før noe annet kan starte?]`
* **Tilbakemeldingssløyfer (Valgfri):** `[Hvordan og hvor ofte samles tilbakemeldinger inn fra reelle brukere og interne interessenter gjennom utviklingsprosessene? Hvordan brukes denne feedbacken til å justere planer og prioriteringer? Eks: "Ukentlige interne demoer", "Kontinuerlig betatesting med utvalgte brukere", "Systematisk innsamling av brukerfeedback via [verktøy/metode] etter lansering."]`
* **Kriterier for MVP-suksess (Valgfri):** `[Hvordan defineres suksess spesifikt for MVP-lanseringen (utover de overordnede suksesskriteriene i Seksjon 1)? Hvilke kvantitative eller kvalitative observasjoner må gjøres for å validere kjerne-hypotesen og ta en informert beslutning om veien videre (pivot, persevere, stop)? Eks: "Minst X% av inviterte betatestere registrerer seg og fullfører kjerneflyt Y", "Får overveiende positive (eller konstruktive) tilbakemeldinger på brukervennlighet", "Observerer at brukere løser problem Z raskere enn før."]`

---

## 13. Testing og Validering (Valgfri for små prosjekter)

*(Beskriver strategien og metodene for å sikre kvaliteten på produktet.)*

* **Teknisk Testing:** *(Fokuserer på å verifisere at koden og systemet fungerer korrekt teknisk)*
    * Enhetstester: `[Beskriv tilnærmingen til testing av isolerte kodeenheter (funksjoner, metoder, komponenter). Hvilke(t) rammeverk brukes (f.eks. Jest, Pytest, JUnit)? Hva er målet for kodedekning (f.eks. >80%)? Hvem skriver testene (utviklere)?]`
    * Integrasjonstester: `[Beskriv hvordan interaksjonen mellom flere enheter, komponenter eller tjenester testes. Fokuserer man på API-nivå? Tester man mot en ekte database? Hvilke verktøy/rammeverk brukes? Eks: "Tester API-endepunkter med reelle HTTP-kall mot en testdatabase", "Bruker testcontainere (f.eks. Testcontainers) for å sette opp avhengigheter."]`
    * Ytelsestester: `[Beskriv hvordan ytelseskravene definert i Seksjon 6 skal testes. Hvilke typer tester kjøres (lasttest, stresstest, soak test)? Hvilke verktøy brukes (f.eks. k6, Locust, JMeter)? Når kjøres testene (f.eks. før større lanseringer, kontinuerlig i CI)?]`
    * Sikkerhetstester: `[Beskriv tilnærmingen til sikkerhetstesting. Brukes automatiske verktøy (SAST, DAST, f.eks. OWASP ZAP, Snyk)? Utføres manuell testing (f.eks. penetrasjonstesting)? Når utføres disse testene? Hvem er ansvarlig?]`
* **Funksjonell Validering:** *(Fokuserer på å validere at produktet møter brukernes behov og de funksjonelle kravene)*
    * Brukertesting: `[Beskriv hvordan produktets brukervennlighet, nytteverdi og funksjonalitet skal testes med representanter fra målgruppen. Hvilke metoder brukes (f.eks. modererte tester, umodererte tester, A/B-testing, usability heuristics evaluation)? Når i prosessen skjer dette (tidlig med prototyper, før lansering)?]`
    * Betatesting: `[Beskriv planen for testing med en begrenset gruppe ekte brukere i et reelt miljø før full lansering. Hvordan rekrutteres betatestere? Hvordan samles feedback inn? Hva er kriteriene for å gå fra beta til full lansering?]`
* **Valideringskriterier:** `[Hvordan valideres det helhetlig at produktet møter brukernes behov, løser det definerte problemet og når de satte målene? Kobles ofte til suksesskriterier (Seksjon 1) og MVP-suksesskriterier (Seksjon 12). Kan inkludere både kvantitative (metrikker) og kvalitative (brukerfeedback) elementer.]`
* **Testmiljøer (Valgfri):** `[Beskriv de ulike miljøene som brukes for utvikling, testing og validering. Hva er formålet med hvert miljø (f.eks. utviklermiljø, felles testmiljø/staging, pre-produksjon/UAT-miljø)? Hvordan holdes de synkronisert med produksjon (kode, data)?]`
* **Kvalitetssikringsprosess (QA) (Valgfri):** `[Beskriv rollen og ansvaret til et dedikert QA-team eller QA-funksjon, hvis det finnes. Hvilke typer manuell testing utføres (eksplorerende, regresjon)? Brukes automatiserte akseptansetester (E2E-tester, f.eks. med Cypress, Selenium, Playwright)? Hvem har det endelige ansvaret for å godkjenne en release?]`

---

## 14. Forutsetninger, Avhengigheter og Risiko

*(Identifiserer viktige faktorer som kan påvirke prosjektets suksess.)*

* **Forutsetninger:** `[List opp de viktigste grunnleggende antagelsene som må være sanne eller på plass for at prosjektet skal kunne gjennomføres som planlagt og nå sine mål. Tenk på tekniske, organisatoriske, markedsmessige eller juridiske faktorer. Eks: "Vi har tilgang til nødvendige data fra system X", "Nøkkelkompetanse Y er tilgjengelig internt eller kan anskaffes", "Markedet for Z vil fortsette å vokse."]`
* **Eksterne Avhengigheter:** `[List opp spesifikke eksterne faktorer, systemer, APIer, team, leverandører eller hendelser som prosjektet er direkte avhengig av, og som ligger utenfor prosjektteamets fulle kontroll. Angi gjerne tidsfrister hvis relevant. Eks: "Leveranse av design fra eksternt byrå innen [dato]", "Tilgang til og stabilitet av tredjeparts API X", "Godkjenning fra juridisk avdeling før lansering."]`
* **Kompetansekrav (Valgfri):** *(Nyttig for ressursplanlegging)*
    * Roller: `[Hvilke nøkkelroller eller funksjoner trengs i prosjektteamet for å lykkes? Eks: "Produktleder", "Backend-utvikler (Python/Java)", "Frontend-utvikler (React)", "UX-designer", "DevOps-ingeniør", "Tester/QA", "Data Scientist (for AI)." ]`
    * Ekspertise: `[Hvilken spesifikk teknisk kompetanse, domenekunnskap eller erfaring er kritisk eller ønskelig for prosjektet? Eks: "Erfaring med skytjenester (AWS/Azure)", "Kunnskap om maskinlæring og NLP", "Dyp forståelse for [bransje/domene]", "Erfaring med å bygge skalerbare systemer."]`
* **Risiko og Mottiltak:** *(Identifiser potensielle problemer og planlegg for dem)*
    * *Risiko 1:* `[Beskriv en potensiell hendelse eller usikkerhet som kan påvirke prosjektet negativt (scope, tid, kostnad, kvalitet, omdømme). Vær konkret og realistisk. Eks: "Nøkkelpersonell i teamet slutter midt i prosjektet", "Tredjeparts-API vi er avhengige av endres eller blir utilgjengelig", "Estimater for utviklingstid viser seg å være betydelig feil", "Brukeradopsjonen er lavere enn forventet."]`
        * *Mottiltak:* `[Beskriv konkrete handlinger som kan gjøres *proaktivt* for å redusere sannsynligheten for at risikoen inntreffer, eller *reaktivt* for å redusere konsekvensen hvis den inntreffer. Eks: "Sørge for god kunnskapsdeling og dokumentasjon", "Ha dialog med API-leverandør og implementere robust feilhåndtering/retries", "Bruke tidlig prototyping og hyppige estimatjusteringer", "Ha en plan for markedsføring og onboarding."]`
    * *Risiko 2: [...]* *(Repeter for flere identifiserte risikoer)*
    * *AI-spesifikke risikoer (Valgfri):* *(Risikoer knyttet spesifikt til bruk av AI/LLM)*
        * Risiko: `[Beskriv spesifikke AI-relaterte risikoer. Eks: "Modellen genererer innhold som er faktuelt feil, skadelig, eller i strid med retningslinjer", "Utilsiktet bias i modellen fører til diskriminerende eller urettferdige resultater", "Høy kostnad eller uforutsigbarhet knyttet til bruk av ekstern LLM-API", "Datasikkerhetsbrudd relatert til data sendt til/fra LLM-tjeneste." ]`
        * Mottiltak: `[Beskriv spesifikke mottiltak. Eks: "Implementere input/output-filtrering og moderering", "Gjennomføre testing for bias og rettferdighet", "Overvåke API-bruk og kostnader nøye", "Sørge for dataminimering og vurdere lokale/private LLM-alternativer hvis mulig." ]`
* **Fallback-planer (Valgfri):** `[Beskriv alternative planer eller "Plan B" for de mest kritiske risikoene eller avhengighetene. Hva gjør vi hvis en kritisk forutsetning svikter eller en stor risiko materialiserer seg? Eks: "Hvis tredjeparts API X ikke er tilgjengelig ved lansering, lanserer vi med en midlertidig mock-tjeneste eller redusert funksjonalitet.", "Hvis nøkkelperson Y slutter, har vi identifisert person Z som kan ta over."]`
* **Kritisk sti-analyse (Valgfri):** `[Hvis relevant for prosjektplanlegging, identifiser den sekvensen av oppgaver som direkte bestemmer den totale varigheten av prosjektet. Hvilke oppgaver har null 'slakk' og må følges spesielt nøye?]`
* **Risikoprioriteringsmatrise (Valgfri):** *(En tabell for å systematisk vurdere og prioritere risikoer)*
    | Risiko                      | Sannsynlighet (H/M/L) | Konsekvens (H/M/L) | Prioritet (H/M/L) | Mottiltak                                    | Ansvarlig     |
    | :-------------------------- | :-------------------- | :----------------- | :---------------- | :------------------------------------------- | :------------ |
    | [Beskrivelse av Risiko 1] | [Vurdering]           | [Vurdering]        | [Beregnet]        | [Beskrivelse av konkrete mottiltak]          | [Navn/Rolle]  |
    | ...                         | ...                   | ...                | ...               | ...                                          | ...           |

---

## 15. Langsiktig Vedlikehold og Skalering (Valgfri, Hopp over for små prosjekter)

*(Beskriver planer for å holde systemet i drift, oppdatert og skalerbart over tid.)*

* **Vedlikeholdsplan:**
    * Rutinemessig vedlikehold: `[Beskriv planlagte, gjentakende vedlikeholdsaktiviteter som er nødvendige for å holde systemet sunt og sikkert. Eks: "Månedlig patching av OS og kjerneavhengigheter", "Kvartalsvis oppdatering av tredjepartsbiblioteker", "Årlig gjennomgang og opprydding i gammel kode/data", "Regelmessig gjennomgang av sikkerhetslogger."]`
    * Overvåking: `[Beskriv *hvordan* systemets helse, ytelse og sikkerhet skal overvåkes kontinuerlig i produksjon. Hvilke verktøy brukes (se Seksjon 10)? Hva ser man etter? Hvem er ansvarlig for å respondere på varsler? Eks: "Bruker Datadog for sanntidsovervåking av CPU, minne, disk, nettverk, feilrater og responstider", "Setter opp varsler for kritiske terskler (se under)."]`
    * Backup-rutiner: `[Beskriv strategien for sikkerhetskopiering av data. Hvilke data tas backup av (database, filer)? Hvor ofte (f.eks. daglig, ukentlig)? Hvor lagres backupene (fysisk lokasjon, skylagring)? Hvor lenge beholdes de (retention policy)? Hvordan og hvor ofte testes gjenoppretting fra backup? Eks: "Daglig full backup av PostgreSQL-database til AWS S3, lagres i 30 dager. Gjenoppretting testes kvartalsvis."]`
* **Skaleringsplan:** *(Beskriver hvordan systemet kan vokse for å møte økt etterspørsel)*
    * Horisontal skalering: `[Beskriv hvordan systemet kan skaleres ut ved å legge til flere instanser av (typisk stateless) komponenter. Hvilke komponenter er designet for dette (f.eks. web-servere, API-tjenester)? Brukes auto-skalering basert på last? Eks: "Web-laget kjører i en auto-scaling group som legger til/fjerner instanser basert på CPU-bruk."]`
    * Database-skalering: `[Beskriv strategier for å håndtere økt databaselast. Brukes lesereplikaer (read replicas) for å avlaste lesetrafikk? Er vertikal skalering (større maskin) en mulighet? Er det en langsiktig plan for mer avanserte teknikker som sharding hvis nødvendig?]`
* **Ytelsesovervåking:** *(Detaljer rundt overvåking av ytelse)*
    * Metrikker: `[List opp de viktigste spesifikke metrikkene som skal samles inn og følges for å overvåke systemets ytelse og pålitelighet i produksjon. Eks: "Gjennomsnittlig og 95/99-persentil API-responstid", "HTTP feilrate (spesielt 5xx)", "CPU- og minnebruk per instans/container", "Databasenøkkel-metrikker (f.eks. connections, locks, query latency)", "Meldingskø-dybde."]`
    * Varslingstrekkere: `[Definer konkrete terskler eller hendelser basert på metrikkene over som skal utløse automatiske varsler til driftsteamet. Vær spesifikk. Eks: "Varsle hvis P95 API-responstid > 1 sekund i mer enn 5 minutter", "Varsle hvis HTTP 5xx feilrate > 1% i en 10-minutters periode", "Varsle hvis diskplass på databaseserver < 10% ledig."]`
* **End-of-Life-strategi (Valgfri):** `[Beskriv en plan eller prinsipper for når og hvordan systemet, eller deler av det, eventuelt skal fases ut og erstattes i fremtiden. Hvordan håndteres dataarkivering eller migrering til et nytt system? Hvordan informeres brukere/kunder?]`

---

## 16. Analytikk og Datainnsamling (Valgfri)

*(Beskriver hvordan data skal samles inn og brukes for å forstå brukeratferd og måle produktsuksess.)*

* **Forretningsmetrikker:** *(Fokuserer på overordnede resultater)*
    * KPI-er: `[List opp de viktigste Key Performance Indicators som direkte måler om forretningsmålene (fra Seksjon 1) og de overordnede suksesskriteriene nås. Vær målbar og knyttet til forretningsverdi. Eks: "Månedlig Tilbakevendende Inntekt (MRR)", "Kundeanskaffelseskostnad (CAC)", "Livstidsverdi per Kunde (CLTV)", "Kundefrafall (Churn Rate) %", "Net Promoter Score (NPS)." ]`
    * Brukerengasjement: `[List opp metrikker som spesifikt måler hvordan og hvor mye brukerne interagerer med produktet. Disse er ofte ledende indikatorer for verdi og retention. Eks: "Daglige/Ukentlige/Månedlige Aktive Brukere (DAU/WAU/MAU)", "Gjennomsnittlig sesjonslengde", "Fullføringsrate for kjerneoppgaver/flyter", "Adopsjonsrate for nye funksjoner ('feature adoption rate')", "Bruker-retention rate (cohort-basert)." ]`
* **Implementeringsplan:**
    * Implementeringsmetode: `[Beskriv hvordan sporing av hendelser og brukeratferd skal implementeres teknisk. Hvilke verktøy brukes for innsamling og videresending (se Seksjon 10)? Brukes en sentralisert tilnærming (f.eks. via Segment, Rudderstack)? Implementeres sporing i frontend, backend, eller begge? Eks: "Implementerer sporing i frontend (React) ved hjelp av Amplitude SDK. Sender standard sidevisninger og spesifikke brukerhandlinger.", "Backend sporer viktige systemhendelser (f.eks. 'ordre fullført')."]`
    * Datainnsamlingspunkter: `[Spesifiser hvilke konkrete brukerhandlinger, sidevisninger eller systemhendelser som skal spores for å kunne beregne metrikkene over og analysere brukeratferd. Vær nøyaktig med hendelsesnavn og eventuelle egenskaper (properties) som skal sendes med. Eks: "Event: 'Signed Up', Properties: {plan: 'free'}", "Event: 'Viewed Product Page', Properties: {productId: '123', category: 'X'}", "Event: 'Completed Purchase', Properties: {totalAmount: 199.00, currency: 'NOK'}".]`
* **Rapportering (Valgfri):**
    * Rapportformater: `[Hvordan skal innsamlet data og beregnede metrikker presenteres og distribueres? Hvem er mottakerne? Hvor ofte? Eks: "Sanntids-dashboards i Amplitude for produktteamet", "Ukentlig e-postrapport med nøkkeltall til ledelsen", "Månedlig gjennomgang av brukeratferd og trender."]`
* **Personvern (Valgfri):** *(Viktig i henhold til GDPR og brukernes tillit)*
    * Samtykkeinnhenting: `[Hvordan innhentes brukernes samtykke for innsamling og bruk av analytikkdata, spesielt hvis det involverer cookies eller personidentifiserbar informasjon? Brukes et cookie-samtykkeverktøy? Er samtykket granulært og lett å trekke tilbake?]`
    * Dataminimering: `[Hvordan sikres det at kun nødvendige data for analyseformålet samles inn ('data minimization' prinsippet)? Samles det inn personidentifiserbar informasjon (PII) for analyse, eller kan data anonymiseres/pseudonymiseres? Er det en policy for dette?]`

---

## 17. Etiske Vurderinger (Valgfri for små prosjekter)

*(Refleksjon over potensielle etiske implikasjoner av produktet og dets bruk.)*

* **Brukerdata og Personvern:** *(Utdyping utover det rent tekniske/juridiske)*
    * Datainnsamling: `[Oppsummer hvilke typer brukerdata som samles inn. Er det spesielt sensitive data (helse, politikk, religion etc.)? Hvorfor er innsamlingen av hver type data nødvendig? Hvem har tilgang til dataene internt? Hvordan beskyttes de mot misbruk eller uautorisert tilgang?]`
    * Informert samtykke: `[Hvordan sikres det at brukeren gir et *reelt informert* samtykke til datainnsamling og -bruk? Er personvernerklæringen og vilkårene lett tilgjengelige, skrevet på et klart og forståelig språk, og ikke urimelig lange? Er det enkelt for brukeren å forstå hva de samtykker til?]`
* **Tilgjengelighet og Inkludering:** *(Utover de tekniske WCAG-kravene)*
    * Universell utforming: `[Vurder om designet og funksjonaliteten aktivt fremmer inkludering og er brukbar for et bredest mulig spekter av brukere, uavhengig av funksjonsevne, alder, digital kompetanse, språk eller kulturell bakgrunn. Er det utilsiktede barrierer i designet?]`
* **AI-spesifikke Vurderinger (Valgfri):** *(Etiske aspekter spesifikt knyttet til AI/LLM-bruk)*
    * Transparency (Gjennomsiktighet): `[Hvordan sikres åpenhet overfor brukeren om bruken av AI? Informeres brukeren tydelig når de interagerer med en AI versus et menneske? Gis det (på et passende nivå) innsikt i hvordan AI-en fungerer eller hvorfor den gir et bestemt resultat, spesielt ved viktige beslutninger?]`
    * Bias-mitigering (Bias-håndtering): `[Hvilke proaktive tiltak gjøres for å identifisere, vurdere og redusere risikoen for uønsket eller diskriminerende bias (f.eks. basert på kjønn, etnisitet, alder) i treningsdata, modellens oppførsel eller output? Hvordan testes og overvåkes dette kontinuerlig?]`
    * Meningsfullt menneskelig oppsyn (Meaningful Human Control): `[Hvordan sikres det at mennesker beholder tilstrekkelig kontroll og ansvar, spesielt når AI brukes til å ta beslutninger med betydelige konsekvenser for enkeltpersoner? Hvor og hvordan kan mennesker overstyre eller korrigere AI-en? (Se også Seksjon 2 - Menneskelig Intervensjon).]`
* **Miljøkonsekvenser (Valgfri):** `[Vurder miljøpåvirkningen av løsningen, spesielt knyttet til energiforbruk og ressursbruk for datalagring og prosessering (særlig relevant for store AI-modeller eller dataintensive applikasjoner). Er det gjort noen tiltak for å optimalisere ressursbruken eller velge mer bærekraftige infrastruktur-alternativer?]`

---

## 18. Ordliste (Anbefalt for komplekse prosjekter)

*(Definer nøkkelbegreper, akronymer eller prosjektspesifikk sjargong for å sikre felles forståelse.)*

* **[Term]:** `[Klar og konsis definisjon av termen slik den brukes i dette dokumentet.]`
* **[Akronym]:** `[Fullt navn for akronymet og en kort definisjon hvis nødvendig.]`
* **[...]**

---

## 19. Vedlegg (Valgfri)

*(Liste over og lenker til supplerende materialer.)*

* `[Lenke til relevante ressurser, f.eks. brukerundersøkelser, markedsanalyser, detaljerte tekniske spesifikasjoner.]`
* `[Lenke til visuelle diagrammer, f.eks. brukerflytdiagrammer, arkitekturdiagrammer (C4, UML), ER-diagrammer.]`
* `[Lenke til design-ressurser, f.eks. mockups (Figma, Sketch), prototyper, stilguide.]`
* **Beskrivelse av visuelle ressurser:** `[Gi en kort (1-2 setninger) kontekst eller beskrivelse for hvert vedlagte eller lenkede visuelle element for å hjelpe leseren (og en eventuell AI) å forstå dets formål og hovedinnhold. Eks: "Arkitekturdiagram L2: Viser hovedkomponenter og databaser.", "Brukerflyt - Kjøp: Detaljert flyt for utsjekkingsprosessen."]`

---

## 20. Versjonshistorikk

*(Logg over endringer i dokumentet)*

* **1.0 - [YYYY-MM-DD]:** Første utkast. [Evt. kort kommentar om innhold/status]
* **1.1 - [YYYY-MM-DD]:** Lagt til Seksjon X, oppdatert Y basert på feedback fra Z. [Signatur/Forfatter]
* **[Neste Versjon] - [YYYY-MM-DD]:** `[Beskrivelse av endringer.]`

