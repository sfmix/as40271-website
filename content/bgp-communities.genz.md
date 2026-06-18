---
title: "BGP Communities"
description: "reference for AS40271 BGP communities — informational tags and traffic-engineering actions. the full rundown 🤓"
---

BGP communities used by AS40271. **[Informational](#informational)** communities get tagged on ingestion and are never accepted from outside. **[Action](#action)** communities are accepted from downstreams to control how routes propagate. that's the tea ☕.

## informational 🏷️

set by AS40271 on every route as it enters our network. clutch for diagnostics 🔍; ignore them on your side or filter on them however you like.

### Internal route marker

| Community | Name | Meaning |
|---|---|---|
| `40271:1500:1` | Internal | Originated within AS40271 (cache prefixes, infrastructure). |

### Peer Type ID — `40271:1900:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:1900:1` | Transit | Learned from a paid transit upstream. |
| `40271:1900:2` | Peer | Learned from a settlement-free peer. |
| `40271:1900:3` | Customer | Learned from a downstream customer / participant. |
| `40271:1900:4` | Internal | Learned via iBGP (originated by AS40271). |

### Peer ASN — `40271:1901:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:1901:<asn>` | Origin neighbor ASN | The 16-bit neighbor ASN. Use the large-community equivalent for 4-byte ASNs. |

### RPKI state — `40271:1902:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:1902:1` | Valid | A covering ROA matched the route. Green flag. |
| `40271:1902:2` | Invalid | Covering ROA didn't match. Route gets dropped; community shown for completeness. |
| `40271:1902:3` | NotFound / Unknown | No covering ROA exists. |

### Location ID — `40271:1984:*`

| Community | Name | Meaning |
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

## action ⚙️

set these communities on routes you announce to AS40271 and we'll act on them. these are the only communities we honor on ingress, periodt 💅.

### Don't propagate to a specific ASN — `40271:2000:<asn>`

| Community | Name | Meaning |
|---|---|---|
| `40271:2000:<asn>` | No-export to ASN | Replace `<asn>` with the 16-bit neighbor ASN you want to keep this prefix away from. |

### Don't propagate to a peer type — `40271:2001:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:2001:1` | No-export to transit | Won't be advertised to paid transit upstreams. |
| `40271:2001:2` | No-export to peers | Won't be advertised to settlement-free peers. |
| `40271:2001:3` | No-export to customers | Won't be advertised to downstream participants. |

### Edge blackhole — `40271:2666:666`

| Community | Name | Meaning |
|---|---|---|
| `40271:2666:666` | Blackhole | Discard ingress traffic toward this prefix at AS40271's edge. /32 (v4) or /128 (v6) only. |

## quick reference 📋

```
# Suppress this prefix from being announced to AS15169
ip community-list expanded NO-GOOG permit ^40271:2000:15169$

# Blackhole an attacked /32
route-map BLACKHOLE-OUT permit 10
  match ip address prefix-list MY-V4-HOSTS
  set community 40271:2666:666 additive
```
