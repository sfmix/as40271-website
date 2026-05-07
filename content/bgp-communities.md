---
title: "BGP Communities"
url: "/bgp-communities/"
---

## Overview

AS40271 uses BGP Large Communities exclusively. All communities use the format `40271:function:value`.

Communities are divided into two categories: **informational** communities tagged on ingestion (not accepted from outside), and **traffic engineering** communities that downstream users can signal to control route propagation.

## Informational Communities

These are tagged as routes are ingested and are **not accepted from outside**.

### Internal Routes

| Community | Description |
|-----------|-------------|
| `40271:1500:1` | SFMIX Transit Internal Infrastructure Routes |

### Peer Type ID (`40271:1900:*`)

| Community | Description |
|-----------|-------------|
| `40271:1900:0` | SFMIX (Transit) Infrastructure |
| `40271:1900:1` | SFMIX Transit — Free — User |
| `40271:1900:2` | SFMIX Transit — Paid — Upstream Transit |
| `40271:1900:3` | SFMIX Transit — Free — Peers |
| `40271:1900:4` | SFMIX Transit — Paid — User |
| `40271:1900:5` | SFMIX Transit — Hosted Cache |

### Peer ASN (`40271:1901:*`)

| Community | Description |
|-----------|-------------|
| `40271:1901:<peer ASN>` | Identifies the peer ASN the route was learned from |

### RPKI State (`40271:1902:*`)

| Community | Description |
|-----------|-------------|
| `40271:1902:0` | RPKI Valid |
| `40271:1902:1` | RPKI Unknown |
| `40271:1902:2` | RPKI Invalid |

### Location ID (`40271:1984:*`)

| Community | Description |
|-----------|-------------|
| `40271:1984:<site code>` | SFMIX site code where the route was learned (see [SFMIX Locations](https://sfmix.org/locations/)) |

## Traffic Engineering Communities

These communities are **accepted from downstream users** and control route propagation scope.

### Don't Propagate to ASN (`40271:2000:*`)

| Community | Description |
|-----------|-------------|
| `40271:2000:<peer ASN>` | Don't propagate to the specified peer ASN |

### Don't Propagate to Peer Type (`40271:2001:*`)

| Community | Description |
|-----------|-------------|
| `40271:2001:0` | Don't propagate to SFMIX Transit Infrastructure |
| `40271:2001:1` | Don't propagate to SFMIX Transit Free Users |
| `40271:2001:2` | Don't propagate to SFMIX Transit Paid Upstream Transits |
| `40271:2001:3` | Don't propagate to SFMIX Transit Free Peers |
| `40271:2001:4` | Don't propagate to SFMIX Transit Paid Users |
| `40271:2001:5` | Don't propagate to SFMIX Transit Hosted Caches |

### Edge Blackhole (`40271:2666:*`)

| Community | Description |
|-----------|-------------|
| `40271:2666:666` | Blackhole at edge |
