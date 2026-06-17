---
title: "Boardin' Guide"
description: "How eyeball ISPs opt in to AS40271, what to expect, an' th' honest caveats."
---

{{< callout type="warn" title="Read this first, matey" >}}
**AS40271 be no transit replacement.** It carries cacheable traffic from a small list o' content sources — that's it. Yer network still needs full transit (or a real BGP peering footprint) to reach th' rest o' th' Internet.

There be **no SLA**. Caches go down for upgrades. Sole-sourcin' content from AS40271 will hurt yer users on day one o' an outage. Treat it as an offload, not a lifeline.
{{< /callout >}}

AS40271 be opt-in for eyeball ISPs in th' Bay Area. Here be who fits, what to expect from th' relationship, an' th' honest caveats before ye spin up a BGP session.

## Eligibility

We be built for **local eyeball networks**: residential, community, municipal an' small-business ISPs whose users be in th' San Francisco Bay Area. If most o' yer traffic be bound for end-users on consumer devices, ye be our people.

Ye'll need **a port at one o' our edge sites** (see [locations on sfmix.org](https://sfmix.org/locations/)) an' yer own **public ASN with at least one prefix in IRR**. We'll BGP with ye over IPv4 an' IPv6.

Content networks, transit providers an' CDNs themselves should peer with SFMIX directly ([sfmix.org](https://sfmix.org)) — AS40271 be th' wrong front door for ye.

## What to expect

We'll exchange a single eBGP session per address family. AS40271 announces th' prefixes covered by our cache an' content-peering participants. Ye announce yer customer prefixes back so th' caches know where to deliver bytes. See th' [BGP communities reference](/bgp-communities/) for informational tags an' action communities ye can use.

Expect **tens o' percent** o' yer downstream bytes to land on AS40271 once it's hot — exact figures depend on yer subscriber mix. Steam patch days, Apple OS releases, Windows Update rollouts, an' big YouTube events will all spike. Set capacity accordingly.

Ye'll get th' `tech-c@sfmix.org` mailing list, a phone number for actual humans, an' a seat in our plannin' conversations about which content sources to chase next.

## Caveats (th' borin' fine print)

- **No SLA.** Best effort. No credits, no escalation tree.
- **Not transit.** Don't point a default route at us. We'll filter yer defaults; ye'll get sad.
- **Don't sole-source.** When th' cache be down, yer users want bytes from somewhere. Have a real upstream.
- **Cache content drifts.** What's on AS40271 today might not be on AS40271 next quarter. Content partnerships change.
- **Prefixes must be in IRR.** No IRR record, no announcement. We won't proxy-register for ye.
- **RPKI ROAs strongly encouraged.** We'll drop invalids.

## Ready?

Email [tech-c@sfmix.org](mailto:tech-c@sfmix.org) with yer ASN, th' POP ye'd like to connect at, an' a one-line description o' yer network. We'll send back a peering questionnaire an' get a session up.
