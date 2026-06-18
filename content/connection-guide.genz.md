---
title: "Connection Guide"
description: "how eyeball ISPs opt in to AS40271, what to expect, and the honest caveats — no cap 🤝"
---

{{< callout type="warn" title="read this first fr 🚨" >}}
**AS40271 is not a transit replacement.** it carries cacheable traffic from a small list of content sources — that's it, that's the whole thing. your network still needs full transit (or a real BGP peering footprint) to reach the rest of the Internet.

there is **no SLA**. caches go down for upgrades, it happens 🤷. sole-sourcing content from AS40271 will lowkey wreck your users on day one of an outage. treat it as an offload, not a lifeline.
{{< /callout >}}

AS40271 is opt-in for eyeball ISPs in the Bay Area. here's who fits, what to expect from the relationship, and the honest caveats before you spin up a BGP session 👇.

## eligibility ✅

we're built for **local eyeball networks**: residential, community, municipal and small-business ISPs whose users are in the San Francisco Bay Area. if most of your traffic is headed for end-users on consumer devices, you're our people fr 🫶.

you'll need **a port at one of our edge sites** (see [locations on sfmix.org](https://sfmix.org/locations/)) and your own **public ASN with at least one prefix in IRR**. we'll BGP with you over IPv4 and IPv6, bet ⚡.

content networks, transit providers and CDNs themselves should peer with SFMIX directly ([sfmix.org](https://sfmix.org)) — AS40271 is the wrong front door for you, no shade 🙅.

## what to expect 👀

we'll exchange a single eBGP session per address family. AS40271 announces the prefixes covered by our cache and content-peering participants. you announce your customer prefixes back so the caches know where to deliver bytes. see the [BGP communities reference](/bgp-communities/) for informational tags and action communities you can use.

expect **tens of percent** of your downstream bytes to land on AS40271 once it's hot 🔥 — exact figures depend on your subscriber mix. Steam patch days, Apple OS releases, Windows Update rollouts, and big YouTube events will all spike hella hard, no cap. set capacity accordingly.

you'll get the `tech-c@sfmix.org` mailing list, a phone number for actual humans, and a seat in our planning convos about which content sources to chase next 🗣️.

## caveats (the boring fine print 📝)

- **No SLA.** best effort. no credits, no escalation tree.
- **Not transit.** don't point a default route at us. we'll filter your defaults; you'll be sad 😔.
- **Don't sole-source.** when the cache is down, your users still want bytes from somewhere. have a real upstream.
- **Cache content drifts.** what's on AS40271 today might not be on AS40271 next quarter. content partnerships change, it's giving fluid 🌊.
- **Prefixes must be in IRR.** no IRR record, no announcement. we won't proxy-register for you.
- **RPKI ROAs strongly encouraged.** we'll drop invalids, periodt 💅.

## ready? 🚀

email [tech-c@sfmix.org](mailto:tech-c@sfmix.org) with your ASN, the POP you'd like to connect at, and a one-line description of your network. we'll send back a peering questionnaire and get a session up. easy W 🏆.
