---
id: sovereignty-risk
locale: en
translation_status: final
tags: [Oracle Cerner, vendor lock-in, MEDITECH, procurement risk, export controls, BC Clinical + Systems Transformation]
related: [current-state, governance, funding]
---

In February 2023, Nova Scotia signed a $385-million ten-year deal with Oracle Health (formerly Cerner) to build a single electronic care record for the province's one million residents. Nova Scotia is now roughly a third of the way into a contract whose full cost the public cannot see, for a system it does not own, built by Cerner (Legacy) headquartered in North Kansas City, Missouri, owned by Oracle based in Austin, Texas, and answerable first to its shareholders and second to Nova Scotia Health. 

This paper is not a prediction that Oracle will discontinue Cerner tomorrow. It hasn't, and Oracle says it won't. The argument is narrower and, for a procurement decision, more useful: the risk a foreign vendor's decisions pose to a province's clinical infrastructure does not require a shutdown announcement to be real. It shows up years earlier, in contract terms provinces can't see, in architecture decisions provinces don't control, and in workforce and ownership changes that happen for reasons entirely unrelated to Canadian health policy.

## Three companies, headquartered elsewhere

What appears to be a competitive market is, in practice, a triopoly. Across Canada's provinces, major hospital clinical information systems have largely converged on three U.S.-headquartered vendors: Oracle Health (Cerner), MEDITECH, and Epic Systems.

Every major clinical information system running in a Canadian hospital today is designed, priced, and roadmapped by a company that reports to American shareholders, operates under American law, and treats the Canadian market as a fraction of a much larger book of business. Canada is a price-taker in its own hospitals.

The issue is not that these companies produce poor software—many are world leaders—but that Canada's core clinical infrastructure is overwhelmingly dependent on software platforms governed, developed, and commercially controlled outside Canada.

## What "deep integration" means once it's happened

Since acquiring Cerner in 2022, Oracle has moved to fold it into its own cloud infrastructure. By early 2026, much of Cerner's workload had been migrated onto Oracle Cloud Infrastructure and the Oracle Autonomous Database, to the point that industry analysts now describe Cerner as no longer an independent application, but a system dependent on Oracle's proprietary networking and database layer underneath it. Whatever a province thought it was buying when it signed with Cerner, what it has today is increasingly inseparable from Oracle's own commercial cloud stack. Unwinding that dependency — migrating off Cerner to any other vendor, Canadian or otherwise — has become a larger technical undertaking than it was the year the contract was signed, and it grows larger every year the integration deepens.

::: keystat 10 yrs | the length of Nova Scotia's Oracle Cerner contract, on undisclosed financial terms
:::

## The volatility is not hypothetical

On March 31, 2026, Oracle cut roughly 30 percent of its Revenue and Health Sciences division — an estimated 8,000 to 10,000 Cerner-trained implementation specialists, clinical informatics engineers, and healthcare data analysts, released into the market in a single quarter. Around the same period, industry analysts began openly discussing whether Oracle intends to sell or spin off the Cerner asset entirely, noting that Oracle may already have extracted what it wanted from the acquisition — the clinical data used to train its healthcare AI products — leaving the underlying software platform as a lower priority. None of this means Cerner is being shut down. It means the roadmap, staffing, and even the ownership of the system running a Canadian province's hospitals can change for reasons that have nothing to do with Canada, with no vote, no consultation, and no advance notice to the health ministries relying on it.

> A ten-year contract on undisclosed terms is not stability. It's a decade of exposure to decisions Canada has no seat at the table for.

## The pattern is broader than health care

This is not a uniquely Canadian problem, and it is not unique to health IT. In June 2026, Anthropic's own Claude Fable and Claude Mythos models were suspended from public access for two weeks to comply with United States Department of Commerce export controls, before the Department lifted those restrictions and access was restored. The episode is unremarkable in itself — export rules changed, and a company complied — but it is a clean, recent, and entirely uncontroversial demonstration of the underlying mechanism this paper is about: a foreign regulatory action, unrelated to any decision made in Canada, can interrupt Canadian access to American-controlled technology on short notice. A clinical information system that runs a province's hospitals is a considerably higher-stakes place for that mechanism to exist than a chat interface.

## Sovereignty is not only a shutdown scenario

The more immediate cost of foreign ownership isn't a doomsday scenario — it's the everyday absence of leverage. BC's Clinical + Systems Transformation project, a $842 million program to bring Vancouver Coastal Health, PHSA, and Providence Health Care onto a shared record, changed its lead contractor mid-project once already, when IBM was replaced by Cerner after a dispute with the Ministry of Health over strategy. Undisclosed contract terms, vendor lock-in through deepening cloud integration, and a market with effectively three buyers' options — this is what provinces already pay for, today, contract by contract, without needing a single American headline to make it real.

## What owning the stack would actually mean

None of this argues that Canadian health authorities have been careless. Procuring a hospital-grade clinical system is genuinely hard, and the vendors that dominate this market do so partly because building an alternative from scratch, thirteen separate times, is not a realistic option for any single province. That's precisely the case for treating this as a national infrastructure problem rather than thirteen procurement problems: mature open-source clinical platforms already exist, Canada's own interoperability standards already exist, and what's missing is a Canadian-owned body with the mandate to assemble them once, govern them jointly, and make the resulting system something every jurisdiction can run without renting it back from abroad. That proposal — what to build on, who governs it, and how it gets paid for — is the subject of the papers that follow.
