---
title: Financieringsmodellen
description: Drie manieren om een open source platform te financieren — en wat de eerlijke afweging is
---

Het continuïteitsprobleem heeft geen perfecte oplossing. Er zijn drie eerlijke opties, elk met echte voor- en nadelen.

---

## Optie 1: Iedereen draagt bij

Het meest zuivere open source model: geen licenties, geen commercieel eigenaar. Gebruikers dragen bij in de vorm van code, documentatie, testwerk, governance of financiering van features. Als genoeg organisaties dat structureel doen, is het platform financieel gezond.

:::tip[Wanneer werkt dit?]
Dit model werkt uitstekend voor grote projecten met een brede gebruikersbasis. Linux wordt onderhouden door duizenden engineers die in dienst zijn van bedrijven die er commercieel belang bij hebben. PostgreSQL wordt gefinancierd door tientallen organisaties wereldwijd. De community is groot genoeg dat uitval van één bijdrager wordt opgevangen door anderen.

Een belangrijk patroon bij die succesvolle projecten: veel ervan zijn begonnen als interne tools bij grote technologiebedrijven. Google had Kubernetes sowieso nodig voor zijn eigen infrastructuur. Meta had React sowieso gebouwd voor zijn eigen frontend. Ze publiceerden de code niet als liefdadigheid — het was gewoon geen core-business, en als concurrenten dezelfde tool gebruiken, verlaagt dat de gedeelde onderhoudslasten en vergroot het de talentenpool. Die dynamiek ontbreekt bij een niche platform voor Nederlandse gemeenten: er is geen grote organisatie die dit platform sowieso had gebouwd en publiceren als bijproduct.
:::

:::caution[Wanneer werkt dit niet?]
Voor een niche platform voor 300+ Nederlandse gemeenten is die kritische massa er niet automatisch. De gebruikersgroep is klein. Bijdragen zijn ongelijkmatig verdeeld — een handvol actieve bijdragers draagt het voor de rest. En bijdragen in natura zijn moeilijk te plannen: ze verdrogen als organisaties bezuinigen, van prioriteit wisselen, of sleutelfiguren vertrekken.

Een platform dat afhankelijk is van vrijwillige bijdragen kan er niet op rekenen dat die bijdragen er zijn op het moment dat ze nodig zijn. Dat is een structureel continuïteitsrisico voor software waarvan gemeenten dagelijks afhankelijk zijn.
:::

**Een variant: van product naar diensten**

Soms wordt open source beschreven als een beweging van product naar diensten: je verdient niet aan de software zelf, maar aan de expertise, support en implementatie eromheen. Dat model klinkt aantrekkelijk — je geeft de code weg, maar de kennis en service zijn de echte waarde.

De structurele zwakte: een concurrent die jouw open source code gebruikt maar niet bijdraagt aan het onderhoud, kan diezelfde diensten goedkoper aanbieden. Ze dragen de infrastructuurlasten niet, maar kunnen wel de vruchten plukken. Naarmate een platform succesvoller wordt, groeit de kans dat precies dit gebeurt — en dan draai je als enige op voor de kosten van een platform dat anderen ook exploiteren.

Het dienstenmodel werkt het best als aanvulling op een duurzame onderhoudsfinanciering, niet als vervanging ervan.

---

## Optie 2: Licenties

Het platform wordt uitgegeven onder een licentie die commercieel gebruik reguleert — in dit geval de Business Source License (BSL) met een change date van één jaar. Na dat jaar wordt de code automatisch volledig open source (Apache 2.0).

Organisaties die het platform commercieel gebruiken betalen een jaarlijkse licentiebijdrage. Die inkomsten financieren het beheer van het platform: governance, architectuur, security, certificering van leveranciers.

:::tip[Wanneer werkt dit?]
Wanneer de gebruikersgroep bestaat uit organisaties die structureel afhankelijk zijn van het platform en er commercieel voordeel uit halen. Gemeenten die er dagelijks voor bedrijfsprocessen op leunen, kunnen een licentiebijdrage rechtvaardigen — zeker als die aanzienlijk lager is dan wat ze anders aan propriëtaire software kwijt zouden zijn.
:::

:::note[Is dit geen lock-in?]
Een begrijpelijke zorg — maar de BSL creëert geen duurzame afhankelijkheid. Na één jaar is de code volledig vrij. Wie een meerjarig contract sluit, zit voor het grootste deel van die periode al in het Apache 2.0-tijdperk van de voorgaande versie. Een concurrerende leverancier kan altijd met de vrijgegeven code aan de slag.

De maximale "vendor lock-in" is in theorie één jaar. In de praktijk minder, omdat licentiecontracten meerjarig zijn en de vorige versie al lang vrij is.
:::

:::caution[Nadeel]
Het vereist dat gebruikers begrijpen waarom ze betalen voor iets dat "open source" heet. Dat vraagt uitleg — en een bereidheid om het gesprek aan te gaan. Het risico op weerstand is reëel, maar oplosbaar met transparantie over wat de bijdrage financiert.
:::

---

## Optie 3: Subsidies

Overheden, fondsen of publieke instellingen financieren het platform. Dat kan een nuttige aanvulling zijn — zeker in de opstartfase of voor specifieke features met een publiek belang.

:::tip[Wanneer werkt dit?]
Als overbruggingsfinanciering, als co-financiering van specifieke roadmap-onderdelen, of als eenmalige startinvestering. Subsidies kunnen helpen een platform op gang te brengen dat daarna op eigen benen staat.
:::

:::caution[Wanneer werkt dit niet?]
Als primair en structureel financieringsmodel voor doorlopend beheer. Subsidies zijn politiek afhankelijk, tijdgebonden en stimuleren de verkeerde prikkels: organisaties optimaliseren voor het binnenhalen van de volgende subsidieronde in plaats van voor de kwaliteit van het platform.

Een platform dat voor zijn voortbestaan afhankelijk is van subsidies, bestaat op de genade van politieke prioriteiten. Dat is geen basis voor digitale infrastructuur die gemeenten jarenlang nodig hebben.
:::

---

## De eerlijke afweging

| | Community bijdragen | Licenties | Subsidies |
|---|---|---|---|
| **Voorspelbaarheid** | Laag | Hoog | Middel |
| **Schaalbaarheid** | Afhankelijk van community | Goed | Slecht |
| **Lock-in risico** | Geen | Minimaal (max. 1 jaar) | Geen |
| **Werkt voor niche platform** | Risico | Ja | Als aanvulling |
| **Duurzaam als enige bron** | Alleen bij grote community | Ja | Nee |

Het eerlijke antwoord: voor een platform met een kleine maar afhankelijke gebruikersgroep — zoals Nederlandse gemeenten — zijn licenties de meest betrouwbare basis. Community bijdragen zijn een waardevolle aanvulling, geen vervanging. Subsidies kunnen helpen in de opstartfase, maar zijn geen fundament.

Dat wil niet zeggen dat licenties voor iedereen verplicht zijn. Organisaties die niet in de positie zijn om een licentie te betalen maar wel gebruik maken van het platform, worden gevraagd op een andere manier bij te dragen — via code, documentatie of directe ondersteuning. De bijdrage is wat telt, niet de vorm.

[→ Welke belangen spelen er bij de verschillende betrokkenen?](/open-source/afnemersperspectief)

[→ Hoe zorg je dat de financiering eerlijk ingezet wordt?](/organisatiestructuur/steward-ownership)
