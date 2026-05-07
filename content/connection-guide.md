---
title: "Connection Guide"
description: "How eyeball ISPs opt in to AS40271, what to expect, and the honest caveats."
menu:
  main:
    weight: 20
---

{{< callout type="warn" title="Read this first" >}}
**AS40271 is not a transit replacement.** It carries cacheable traffic from a small list of content sources — that's it. Your network still needs full transit (or a real BGP peering footprint) to reach the rest of the Internet.

There is **no SLA**. Caches go down for upgrades. Sole-sourcing content from AS40271 will hurt your users on day one of an outage. Treat it as an offload, not a lifeline.
{{< /callout >}}

AS40271 is opt-in for eyeball ISPs in the Bay Area. Here's who fits, what to expect from the relationship, and the honest caveats before you spin up a BGP session.

## Eligibility

We're built for **local eyeball networks**: residential, community, municipal and small-business ISPs whose users are in the San Francisco Bay Area. If most of your traffic is destined for end-users on consumer devices, you're our people.

You'll need **a port at one of our edge sites** (see [locations on sfmix.org](https://sfmix.org/locations/)) and your own **public ASN with at least one prefix in IRR**. We'll BGP with you over IPv4 and IPv6.

Content networks, transit providers and CDNs themselves should peer with SFMIX directly ([sfmix.org](https://sfmix.org)) — AS40271 is the wrong front door for you.

## What to expect

We'll exchange a single eBGP session per address family. AS40271 announces the prefixes covered by our cache and content-peering participants. You announce your customer prefixes back so the caches know where to deliver bytes. See the [BGP communities reference](/bgp-communities/) for informational tags and action communities you can use.

Expect **tens of percent** of your downstream bytes to land on AS40271 once it's hot — exact figures depend on your subscriber mix. Steam patch days, Apple OS releases, Windows Update rollouts, and big YouTube events will all spike. Set capacity accordingly.

You'll get the `tech-c@sfmix.org` mailing list, a phone number for actual humans, and a seat in our planning conversations about which content sources to chase next.

## Caveats (the boring fine print)

- **No SLA.** Best effort. No credits, no escalation tree.
- **Not transit.** Don't point a default route at us. We'll filter your defaults; you'll get sad.
- **Don't sole-source.** When the cache is down, your users want bytes from somewhere. Have a real upstream.
- **Cache content drifts.** What's on AS40271 today might not be on AS40271 next quarter. Content partnerships change.
- **Prefixes must be in IRR.** No IRR record, no announcement. We won't proxy-register for you.
- **RPKI ROAs strongly encouraged.** We'll drop invalids.

## Ready?

Email [tech-c@sfmix.org](mailto:tech-c@sfmix.org) with your ASN, the POP you'd like to connect at, and a one-line description of your network. We'll send back a peering questionnaire and get a session up.
