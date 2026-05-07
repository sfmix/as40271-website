---
title: "Connection Guide"
url: "/connection-guide/"
---

## Overview

AS40271 is the SFMIX IP Network — an opt-in cooperative that delivers caching and content from major sources to local Bay Area eyeball ISPs via managed private peering. Participating networks receive routes to content sources like Google, Apple, Valve/Steam, and others directly through AS40271.

## What AS40271 Is

- An opt-in service for **eyeball / access ISPs** in the Bay Area
- Managed private peering with content networks and caches
- Primarily designed for **cache fill** operations
- A Google **Silver Verified Peering Partner** (VPP)

## What AS40271 Is Not

<div class="callout">
<p><strong>AS40271 is not a replacement for transit.</strong> It is risky and dangerous to sole-source your network's connectivity via SFMIX. We cannot offer an SLA, and the service is primarily built to support cache fill — not to deliver full transit in the same locations where you are getting SFMIX peering today.</p>
</div>

- Not a full transit provider
- Not covered by an SLA
- Not suitable as a sole upstream

## How to Connect

1. **Be an SFMIX participant.** AS40271 is available to networks that are already connected to the SFMIX exchange fabric. If you're not yet connected, see the [SFMIX website](https://sfmix.org/connection-guide/) for details.

2. **Request AS40271 service.** Contact [tech-c@sfmix.org](mailto:tech-c@sfmix.org) to discuss enabling AS40271 for your network. We'll set up a BGP session delivering content routes to your network.

3. **Configure your router.** Establish a BGP session with AS40271 on your SFMIX port. You will receive routes for the available content sources. See the [BGP Communities](/bgp-communities/) reference for traffic engineering options.

4. **Review on PeeringDB.** Our network details are published at [PeeringDB](https://www.peeringdb.com/asn/40271).

## What to Expect

- Routes to content sources (Google, Apple, Valve/Steam, Netskrt, and others as they are added)
- BGP large communities for traffic engineering and propagation control
- Best-effort service — no SLA, no guaranteed uptime
- Monitored and managed by the SFMIX operations team
