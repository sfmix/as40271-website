---
title: "BGP-Communities"
description: "Referenz für AS40271-BGP-Communities — informative Tags und Traffic-Engineering-Aktionen."
---

Von AS40271 verwendete BGP-Communities. **[Informative](#informational)** Communities werden bei der Aufnahme gesetzt und niemals von außen akzeptiert. **[Action](#action)**-Communities werden von Downstreams akzeptiert, um zu steuern, wie sich Routen ausbreiten.

## Informative {#informational}

Werden von AS40271 auf jeder Route gesetzt, sobald sie in unser Netz gelangt. Nützlich für die Diagnose; ignorieren Sie sie auf Ihrer Seite oder filtern Sie nach Belieben darauf.

### Marker für interne Routen

| Community | Name | Bedeutung |
|---|---|---|
| `40271:1500:1` | Internal | Innerhalb von AS40271 originiert (Cache-Präfixe, Infrastruktur). |

### Peer-Typ-ID — `40271:1900:*`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:1900:1` | Transit | Von einem kostenpflichtigen Transit-Upstream gelernt. |
| `40271:1900:2` | Peer | Von einem settlement-free Peer gelernt. |
| `40271:1900:3` | Customer | Von einem Downstream-Kunden / -Teilnehmer gelernt. |
| `40271:1900:4` | Internal | Über iBGP gelernt (von AS40271 originiert). |

### Peer-ASN — `40271:1901:*`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:1901:<asn>` | Origin neighbor ASN | Die 16-Bit-Nachbar-ASN. Verwenden Sie das Large-Community-Äquivalent für 4-Byte-ASNs. |

### RPKI-Status — `40271:1902:*`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:1902:1` | Valid | Ein abdeckendes ROA stimmte mit der Route überein. |
| `40271:1902:2` | Invalid | Abdeckendes ROA stimmte nicht überein. Route wird verworfen; Community wird der Vollständigkeit halber angezeigt. |
| `40271:1902:3` | NotFound / Unknown | Es existiert kein abdeckendes ROA. |

### Standort-ID — `40271:1984:*`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:1984:0` | SFO01 | 365 Main St., San Francisco (Digital Realty) |
| `40271:1984:1` | SFO02 | 200 Paul Ave., San Francisco (Digital Realty) |
| `40271:1984:2` | FMT01 | 48233 Warm Springs Blvd., Fremont (Hurricane Electric) |
| `40271:1984:3` | SJC01 | 11 Great Oaks Blvd., San Jose (Equinix) |
| `40271:1984:4` | SCL01 | 2807 Mission College Blvd., Santa Clara (QTS) |
| `40271:1984:5` | SCL02 | 2972 Stender Way, Santa Clara (CoreSite) |
| `40271:1984:6` | SCL04 | 3223 Kenneth St., Santa Clara (OpenColo) |
| `40271:1984:7` | SJC02 | 55 S Market St., San Jose (CoreSite) |
| `40271:1984:8` | SCL05 | 2805 Lafayette St., Santa Clara (Digital Realty) |

## Action {#action}

Setzen Sie diese Communities auf Routen, die Sie an AS40271 ankündigen, und wir handeln entsprechend. Dies sind die einzigen Communities, die wir beim Ingress berücksichtigen.

### Nicht an eine bestimmte ASN propagieren — `40271:2000:<asn>`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:2000:<asn>` | No-export to ASN | Ersetzen Sie `<asn>` durch die 16-Bit-Nachbar-ASN, von der Sie dieses Präfix fernhalten möchten. |

### Nicht an einen Peer-Typ propagieren — `40271:2001:*`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:2001:1` | No-export to transit | Wird nicht an kostenpflichtige Transit-Upstreams angekündigt. |
| `40271:2001:2` | No-export to peers | Wird nicht an settlement-free Peers angekündigt. |
| `40271:2001:3` | No-export to customers | Wird nicht an Downstream-Teilnehmer angekündigt. |

### Edge-Blackhole — `40271:2666:666`

| Community | Name | Bedeutung |
|---|---|---|
| `40271:2666:666` | Blackhole | Verwirft am Edge von AS40271 Ingress-Traffic in Richtung dieses Präfixes. Nur /32 (v4) oder /128 (v6). |

## Kurzreferenz

```
# Suppress this prefix from being announced to AS15169
ip community-list expanded NO-GOOG permit ^40271:2000:15169$

# Blackhole an attacked /32
route-map BLACKHOLE-OUT permit 10
  match ip address prefix-list MY-V4-HOSTS
  set community 40271:2666:666 additive
```
