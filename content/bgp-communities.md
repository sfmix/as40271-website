---
title: "BGP Communities"
description: "Reference for AS40271 BGP communities — informational tags and traffic-engineering actions."
---

BGP communities used by AS40271. **Informational** communities are tagged on ingestion and never accepted from outside. **Action** communities are accepted from downstreams to control how routes propagate.

## Informational

Set by AS40271 on every route as it enters our network. Useful for diagnostics; ignore them on your side or filter on them as you like.

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
| `40271:1902:1` | Valid | A covering ROA matched the route. |
| `40271:1902:2` | Invalid | Covering ROA did not match. Route is dropped; community shown for completeness. |
| `40271:1902:3` | NotFound / Unknown | No covering ROA exists. |

### Location ID — `40271:1984:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:1984:1` | SFO01 | 365 Main St., San Francisco |
| `40271:1984:2` | SFO02 | 200 Paul Ave., San Francisco |
| `40271:1984:3` | FMT01 | Fremont (Hurricane Electric) |
| `40271:1984:4` | SJC01 | San Jose (Equinix SV1) |
| `40271:1984:5` | SCL02 | Santa Clara (CoreSite) |

## Traffic Engineering

Set these communities on routes you announce to AS40271 and we'll act on them. These are the only communities we honor on ingress.

### Don't propagate to a specific ASN — `40271:2000:<asn>`

| Community | Name | Meaning |
|---|---|---|
| `40271:2000:<asn>` | No-export to ASN | Replace `<asn>` with the 16-bit neighbor ASN you want to keep this prefix away from. |

### Don't propagate to a peer type — `40271:2001:*`

| Community | Name | Meaning |
|---|---|---|
| `40271:2001:1` | No-export to transit | Will not be advertised to paid transit upstreams. |
| `40271:2001:2` | No-export to peers | Will not be advertised to settlement-free peers. |
| `40271:2001:3` | No-export to customers | Will not be advertised to downstream participants. |

### Edge blackhole — `40271:2666:666`

| Community | Name | Meaning |
|---|---|---|
| `40271:2666:666` | Blackhole | Discard ingress traffic toward this prefix at AS40271's edge. /32 (v4) or /128 (v6) only. |

## Quick reference

```
# Suppress this prefix from being announced to AS15169
ip community-list expanded NO-GOOG permit ^40271:2000:15169$

# Blackhole an attacked /32
route-map BLACKHOLE-OUT permit 10
  match ip address prefix-list MY-V4-HOSTS
  set community 40271:2666:666 additive
```
