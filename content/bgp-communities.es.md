---
title: "Comunidades BGP"
description: "Referencia de las comunidades BGP de AS40271 — etiquetas informativas y acciones de ingeniería de tráfico."
---

Comunidades BGP usadas por AS40271. Las comunidades **[informativas](#informational)** se etiquetan al momento de la ingesta y nunca se aceptan desde el exterior. Las comunidades de **[acción](#action)** se aceptan desde los downstreams para controlar cómo se propagan las rutas.

## Informativas {#informational}

Establecidas por AS40271 en cada ruta a medida que entra en nuestra red. Útiles para diagnóstico; ignóralas en tu lado o fíltralas como prefieras.

### Marcador de ruta interna

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:1500:1` | Internal | Originada dentro de AS40271 (prefijos de caché, infraestructura). |

### ID de tipo de peer — `40271:1900:*`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:1900:1` | Transit | Aprendida desde un upstream de tránsito pagado. |
| `40271:1900:2` | Peer | Aprendida desde un peer sin liquidación (settlement-free). |
| `40271:1900:3` | Customer | Aprendida desde un cliente / participante downstream. |
| `40271:1900:4` | Internal | Aprendida vía iBGP (originada por AS40271). |

### ASN del peer — `40271:1901:*`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:1901:<asn>` | Origin neighbor ASN | El ASN vecino de 16 bits. Usa el equivalente en large-community para ASN de 4 bytes. |

### Estado RPKI — `40271:1902:*`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:1902:1` | Valid | Un ROA que cubre la ruta coincidió. |
| `40271:1902:2` | Invalid | El ROA que cubre la ruta no coincidió. La ruta se descarta; la comunidad se muestra por completitud. |
| `40271:1902:3` | NotFound / Unknown | No existe ningún ROA que cubra la ruta. |

### ID de ubicación — `40271:1984:*`

| Comunidad | Nombre | Significado |
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

## Acción {#action}

Establece estas comunidades en las rutas que anuncias a AS40271 y actuaremos según ellas. Estas son las únicas comunidades que respetamos en el ingreso.

### No propagar a un ASN específico — `40271:2000:<asn>`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:2000:<asn>` | No-export to ASN | Reemplaza `<asn>` con el ASN vecino de 16 bits del que quieres mantener alejado este prefijo. |

### No propagar a un tipo de peer — `40271:2001:*`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:2001:1` | No-export to transit | No se anunciará a los upstreams de tránsito pagados. |
| `40271:2001:2` | No-export to peers | No se anunciará a los peers sin liquidación (settlement-free). |
| `40271:2001:3` | No-export to customers | No se anunciará a los participantes downstream. |

### Blackhole de borde — `40271:2666:666`

| Comunidad | Nombre | Significado |
|---|---|---|
| `40271:2666:666` | Blackhole | Descarta el tráfico de ingreso hacia este prefijo en el borde de AS40271. Solo /32 (v4) o /128 (v6). |

## Referencia rápida

```
# Suppress this prefix from being announced to AS15169
ip community-list expanded NO-GOOG permit ^40271:2000:15169$

# Blackhole an attacked /32
route-map BLACKHOLE-OUT permit 10
  match ip address prefix-list MY-V4-HOSTS
  set community 40271:2666:666 additive
```
