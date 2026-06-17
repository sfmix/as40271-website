---
title: "Anschlussleitfaden"
description: "Wie Eyeball-ISPs sich für AS40271 anmelden, was sie erwartet und die ehrlichen Vorbehalte."
---

{{< callout type="warn" title="Lesen Sie zuerst dies" >}}
**AS40271 ist kein Transit-Ersatz.** Es transportiert cachebaren Traffic von einer kleinen Liste von Content-Quellen — mehr nicht. Ihr Netzwerk benötigt weiterhin vollwertigen Transit (oder eine echte BGP-Peering-Präsenz), um den Rest des Internets zu erreichen.

Es gibt **kein SLA**. Caches gehen für Upgrades offline. Content ausschließlich über AS40271 zu beziehen, schadet Ihren Endkunden am ersten Tag eines Ausfalls. Betrachten Sie es als Offload, nicht als Rettungsanker.
{{< /callout >}}

AS40271 ist Opt-in für Eyeball-ISPs in der Bay Area. Hier erfahren Sie, wer dazu passt, was Sie von der Zusammenarbeit erwarten können und welche ehrlichen Vorbehalte gelten, bevor Sie eine BGP-Session aufbauen.

## Voraussetzungen

Wir sind für **lokale Eyeball-Netzwerke** gemacht: Privatkunden-, Community-, kommunale und kleingewerbliche ISPs, deren Nutzer in der San Francisco Bay Area sind. Wenn der Großteil Ihres Traffics für Endkunden auf Consumer-Geräten bestimmt ist, sind Sie bei uns richtig.

Sie benötigen **einen Port an einem unserer Edge-Standorte** (siehe [Standorte auf sfmix.org](https://sfmix.org/locations/)) und Ihre eigene **öffentliche ASN mit mindestens einem Präfix im IRR**. Wir betreiben BGP mit Ihnen über IPv4 und IPv6.

Content-Netzwerke, Transit-Provider und CDNs selbst sollten direkt mit SFMIX peeren ([sfmix.org](https://sfmix.org)) — AS40271 ist für Sie die falsche Anlaufstelle.

## Was Sie erwartet

Wir tauschen eine einzige eBGP-Session pro Adressfamilie aus. AS40271 kündigt die Präfixe an, die von unseren Cache- und Content-Peering-Teilnehmern abgedeckt werden. Sie kündigen Ihre Kundenpräfixe zurück, damit die Caches wissen, wohin sie die Bytes ausliefern sollen. Siehe die [BGP-Communities-Referenz](/bgp-communities/) für informative Tags und Action-Communities, die Sie verwenden können.

Erwarten Sie, dass **mehrere zehn Prozent** Ihrer Downstream-Bytes auf AS40271 landen, sobald es eingespielt ist — die genauen Werte hängen von Ihrem Abonnenten-Mix ab. Steam-Patch-Tage, Apple-OS-Releases, Windows-Update-Rollouts und große YouTube-Events werden alle für Spitzen sorgen. Planen Sie Ihre Kapazität entsprechend.

Sie erhalten die Mailingliste `tech-c@sfmix.org`, eine Telefonnummer für echte Menschen und einen Platz in unseren Planungsgesprächen darüber, welche Content-Quellen wir als Nächstes anstreben.

## Vorbehalte (das langweilige Kleingedruckte)

- **Kein SLA.** Best Effort. Keine Gutschriften, kein Eskalationsbaum.
- **Kein Transit.** Richten Sie keine Default-Route auf uns. Wir filtern Ihre Defaults; Sie werden enttäuscht sein.
- **Nicht ausschließlich beziehen.** Wenn der Cache offline ist, wollen Ihre Endkunden Bytes von irgendwoher. Halten Sie einen echten Upstream bereit.
- **Cache-Content ändert sich.** Was heute auf AS40271 liegt, liegt nächstes Quartal vielleicht nicht mehr auf AS40271. Content-Partnerschaften ändern sich.
- **Präfixe müssen im IRR sein.** Kein IRR-Eintrag, keine Ankündigung. Wir registrieren nicht stellvertretend für Sie.
- **RPKI-ROAs werden dringend empfohlen.** Wir verwerfen Invalids.

## Bereit?

Schreiben Sie eine E-Mail an [tech-c@sfmix.org](mailto:tech-c@sfmix.org) mit Ihrer ASN, dem POP, an dem Sie sich anschließen möchten, und einer einzeiligen Beschreibung Ihres Netzwerks. Wir senden Ihnen einen Peering-Fragebogen zurück und richten eine Session ein.
