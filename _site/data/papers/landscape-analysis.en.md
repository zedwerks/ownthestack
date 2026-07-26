---
id: landscape-analyis
locale: en
translation_status: planned
tags: [open-source, CIS, EHR]
related: [sovereignty-risk, open-source-foundations]
---


This paper surveys existing open-source clinical information system (CIS) and electronic health record (EHR) platforms to assess their suitability as a technical foundation for a proposed pan-Canadian, publicly-owned open-source CIS ("Own the Stack"). Canada's health IT landscape is fragmented across thirteen provincial and territorial jurisdictions, each running independent, largely proprietary systems with limited interoperability and recurring vendor lock-in costs. This paper reviews the architecture, licensing, governance, interoperability maturity, and deployment history of leading open-source candidates — including OpenMRS, OpenEHR-based platforms, Bahmni, GNU Health, OpenEMR, LibreHealth, and HAPI FHIR-based stacks — against a set of criteria specific to the Canadian context: bilingual (EN/FR) support, PHIPA/PIPEDA-class privacy compliance, alignment with pan-Canadian interoperability standards (e.g., PS-CA, FHIR profiles maintained by Canada Health Infoway), multi-jurisdictional configurability, and long-term community/governance sustainability. We find [TODO: summary of findings — e.g., no single candidate meets all criteria out of the box; a composite architecture built on X for the clinical data repository and Y for the front-end is likely required]. We conclude with a recommendation on which system(s) merit deeper technical evaluation in Phase 2.

**Keywords:** open-source health IT, electronic health record, clinical information system, interoperability, Canada, digital health sovereignty

---

## 1. Introduction

- 1.1 Motivation: vendor lock-in, cost, and data sovereignty concerns in Canadian health IT
- 1.2 The "Own the Stack" proposal — scope and goals (recap from project brief)
- 1.3 Purpose of this document: is there an existing open-source CIS/EHR that can serve as a foundation, rather than building from scratch?
- 1.4 Structure of the paper

## 2. Methodology

- 2.1 Candidate selection process (how systems were identified: registries, prior deployments, government pilots, academic literature)
- 2.2 Evaluation criteria
  - Licensing (OSI-approved, copyleft vs. permissive)
  - Architecture (monolith vs. modular/microservice, data model, extensibility)
  - Interoperability (HL7v2, FHIR support/version, terminology services — SNOMED CT, LOINC)
  - Localization (bilingual EN/FR, Canadian date/address/health-number formats)
  - Privacy & security posture (auditability, encryption, alignment with PHIPA/PIPEDA-equivalent controls)
  - Scale & performance (single clinic vs. provincial/national scale, multi-tenancy)
  - Deployment track record (production use, especially government/public-sector)
  - Governance & community health (foundation-backed vs. single-vendor-led, contributor diversity, release cadence)
  - Total cost of ownership / hosting requirements
- 2.3 Scoring/comparison approach (e.g., weighted matrix, qualitative narrative, or both)

## 3. Landscape Overview

- 3.1 Categories of systems: hospital-oriented CIS vs. primary-care EMR vs. standards/interop middleware
- 3.2 Summary table of candidates considered (name, origin, license, primary use case, status)

## 4. Candidate System Profiles

*(One subsection per system — stub each with the same skeleton)*

### 4.1 OpenMRS
- Overview / origin / governance
- Architecture & data model
- Interoperability support
- Known deployments (esp. any Canadian or comparable single-payer contexts)
- Strengths
- Weaknesses / gaps vs. Canadian requirements

### 4.2 Bahmni (built on OpenMRS + OpenELIS + odoo)
- (same skeleton)

### 4.3 GNU Health
- (same skeleton)

### 4.4 OpenEMR
- (same skeleton)

### 4.5 LibreHealth (LibreEHR / LibreHealth Toolkit)
- (same skeleton)

### 4.6 HAPI FHIR-based stacks (e.g., paired with a custom or open front-end)
- (same skeleton)

### 4.7 openEHR-based platforms (e.g., Ripple, Better/Marand ecosystem — note licensing mix)
- (same skeleton)

### 4.8 [Additional candidate — TODO: add if identified, e.g., DHIS2 for public health/registry use cases]
- (same skeleton)

## 5. Comparative Analysis

- 5.1 Comparison matrix against Section 2.2 criteria
- 5.2 Cross-cutting themes (e.g., most systems assume single-country/single-payer deployment; FHIR maturity varies widely; bilingual support is rare out of the box)
- 5.3 Precedents: prior attempts to adapt open-source EHRs for Canadian or similar federated healthcare systems (TODO: research — e.g., any provincial pilots, OSCAR EMR in Ontario as a domestic precedent)

## 6. Gap Analysis vs. Canadian Requirements

- 6.1 Regulatory/privacy gaps
- 6.2 Interoperability standard gaps (PS-CA, Canada Health Infoway FHIR profiles)
- 6.3 Bilingual/localization gaps
- 6.4 Multi-jurisdictional governance/configurability gaps
- 6.5 Scale/performance unknowns

## 7. Options & Recommendation

- 7.1 Option A — Adopt a single existing platform and extend it
- 7.2 Option B — Composite architecture (best-of-breed components glued via FHIR)
- 7.3 Option C — Fork and heavily customize one candidate
- 7.4 Option D — Build new, informed by lessons from candidates (not recommended by default — justify if chosen)
- 7.5 Recommended path forward + rationale
- 7.6 Suggested Phase 2 technical evaluation plan (proof-of-concept scope, success criteria)

## 8. Limitations

- Scope of this review (desk research vs. hands-on technical evaluation)
- Currency of information (open-source project status changes quickly)

## 9. References

*(TODO: populate with citations — project docs, GitHub repos, Infoway standards docs, academic papers)*

---

## Appendix A: Comparison Matrix (Draft Template)

| System | License | FHIR Support | Bilingual Out-of-Box | Production Scale Deployments | Governance Model | Notes |
|---|---|---|---|---|---|---|
| OpenMRS | | | | | | |
| Bahmni | | | | | | |
| GNU Health | | | | | | |
| OpenEMR | | | | | | |
| LibreHealth | | | | | | |
| openEHR-based | | | | | | |

## Appendix B: Glossary

- CIS — Clinical Information System
- EHR — Electronic Health Record
- FHIR — Fast Healthcare Interoperability Resources
- PS-CA — Pan-Canadian FHIR profile set (Canada Health Infoway)
- PHIPA/PIPEDA — Canadian privacy legislation (provincial/federal)