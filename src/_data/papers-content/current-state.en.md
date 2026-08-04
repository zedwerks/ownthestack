---
id: current-state
locale: en
translation_status: final
datePublished: "2026-07-26"
dateModified: "2026-07-31"
revision: "1.1"
tags: [fragmentation, BC health authorities, OSCAR EMR, Infoway, CA Core+, primary care]
related: [sovereignty-risk, open-source-foundations]
---

Ask a Canadian which country runs its health data on a shared national record, and most will assume it's their own. It isn't. What we have instead is thirteen provincial and territorial health systems, each of which has spent the last two decades procuring, replacing, and patching together clinical information systems on its own — usually from the same short list of American vendors, usually without much regard for what the province next door just bought.

Every procurement decision is also a **sovereignty** decision. Canada has quietly outsourced much of the software that underpins healthcare to foreign commercial platforms. Before we can discuss sovereignty, however, we first need to understand how fragmented the current landscape actually is.

## The provincial patchwork, seen from inside one province

You don't have to compare provinces to see the fragmentation. British Columbia's five regional health authorities can't agree with each other. Island Health went live on Oracle Cerner in 2016, at Nanaimo Regional General Hospital, in a rollout later found by two separate provincial investigations to have been under-planned and under-resourced. Vancouver Coastal Health, the Provincial Health Services Authority, and Providence Health Care followed onto Cerner in phases from 2018 under the Clinical + Systems Transformation (CST) project — often called CST Cerner — a ten-year program budgeted at $842 million whose original lead contractor, IBM, left in 2015 after a dispute with the participating health organizations over project scope and design methodology; Cerner then took over the lead implementation role.[^3](/evidence/c0003/ "BC’s $842-million CST project and the transition from IBM to Cerner") Meanwhile Fraser Health and Interior Health run MEDITECH Expanse, a system built by a company headquartered in Westwood, Massachusetts.

::: keystat 2 | different American EHR vendors run BC's five health authorities — and that counts as diversification
:::

So a patient who moves from Nanaimo to Surrey doesn't just change health authorities. They change electronic health record vendors, data models, and — in practice — the degree to which their new care team can see anything about their old one. This is not a story about BC being unusually disorganized. It is what every province looks like once you check under the hood: a set of regional or authority-level procurements, each optimized locally, none of them required to be interoperable with the others by anything stronger than goodwill and an evolving voluntary standard.

Imagine a BC resident travelling in Nova Scotia who needs a refill.

The Nova Scotia pharmacist may be legally permitted to dispense the medication. But the pharmacist cannot simply open a national patient record and verify the original prescription, recent dispensing history, relevant diagnoses, laboratory results, allergies and provincial drug-plan eligibility. Instead, the pharmacy may need to telephone or fax the BC pharmacy or prescriber, confirm that the prescription is authentic, determine whether it can legally be transferred, and ask the patient to pay out of pocket because BC PharmaCare generally does not cover medications dispensed outside BC.

The medication may ultimately be supplied. But the patient experiences the system not as one Canadian health service, but as two provincial systems attempting to negotiate with each other manually. ***We can do better***. 

## Primary care adds a second, older layer

Underneath the hospital systems sits an entirely separate layer of primary-care EMRs, procured independently again — this time by individual clinics, under provincial licensing lists that vary by jurisdiction. Canada does have a homegrown, open-source success story here: OSCAR EMR, built at McMaster University and still, by its own community's account, the only widely deployed open-source EMR in the country. But OSCAR's openness has produced its own fragmentation. Because the codebase is free to use and modify, it now exists as several related-but-distinct commercial and community offerings — OSCAR Pro, the WELL Health-backed hosted version; self-hosted installs run by individual clinics or regional groups; and a handful of independent service providers layering their own support and customization on top. A clinic "using OSCAR" in one province may be running software that shares almost nothing operationally with a clinic using OSCAR three provinces away.

::: sidenote
OSCAR is worth naming specifically because it proves the model can work here: it was designed around Canadian billing codes and Canadian family-practice workflows from the start. It is not evidence that open source fails in this market — it is evidence of what happens when an open-source project has no shared governance body directing where contributions go.
:::

## The interoperability layer we already paid for

None of this means Canada has done no national work. Canada Health Infoway has spent years building exactly the kind of shared technical foundation a national system would need: the Canadian Core Data for Interoperability, expressed as the CA Core+ FHIR profile set; the pan-Canadian Patient Summary specification (PS-CA); and the pan-Canadian FHIR Exchange (CA:FeX), all tested annually at a national Projectathon involving health ministries, provincial agencies, and vendors. This is real, usable groundwork — and it is largely voluntary. A vendor can build a CIS for a health authority without ever conforming to CA Core+, and most of the systems in production today predate the specification entirely. Infoway has built the language for interoperability. It has no mechanism to require anyone to speak it.

> Thirteen ministries of health, each independently buying, integrating, and maintaining a version of the same clinical software — that is not thirteen health systems. It is one health system paying thirteen times for the same unfinished job.

## What fragmentation actually costs

The costs of this arrangement are not abstract. Every province re-runs its own procurement, negotiation, integration, and change-management cycle for systems that do fundamentally the same job everywhere: registration, clinical documentation, orders, results, medications, and billing. Every province pays its own implementation partners to rebuild interfaces that another province's implementation partners built the year before. And patients pay a quieter cost in the gaps between jurisdictions: earlier analysis of cross-provincial prescription friction alone estimated roughly 107,000 unnecessary GP visits per year arising simply from the absence of a shared, verifiable record across provincial lines — before any of the larger costs of duplicated hospital procurement are counted.

None of this is a technology problem in the sense of missing capability. Open-source clinical systems capable of running a modern hospital exist today. Canadian-built interoperability standards capable of connecting them exist today. What doesn't exist is a body with the mandate, the funding formula, and the cross-jurisdictional authority to point thirteen procurement cycles at the same target. 

The next paper in this series makes the case that the absence of that body is not merely inefficient — it is a live financial and sovereignty risk, and the clock on it is running faster than most health ministries have priced in.
