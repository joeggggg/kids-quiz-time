# CLAUDE.md — Kids Quiz Time

Guidance for AI assistants (Claude Code / ECC / Antigravity) working in this repo.

## What this project is

Kids Quiz Time is an interactive, educational flip-card quiz web application designed for children (ages 4–12), focusing on STEAM (Science, Technology, Engineering, Arts, Mathematics) topics.
**React + TypeScript (strict) + Vite + Tailwind CSS + Zustand + Gemini AI.**

## Spec-driven development is the law here

`docs/` is the **single source of truth**. Code follows the specs, not the other way around.
Never implement a feature whose intent, acceptance criteria, or types don't exist in `docs/` —
update the spec first, then build. Keep code and `docs/` in sync in the same change.

| Doc | Role |
|-----|------|
| `docs/00-product-requirement-prompt.md` | Build-ready PRP — locked decisions, the single brief |
| `docs/01-prd.md` | Product requirements |
| `docs/02-specs.md` | Functional specs, TS models, metric formulas, design tokens |
| `docs/03-delivery-plan.md` | WBS, epics→stories (INVEST), sequencing, RAID, **DoR/DoD** |
| `docs/04-system-design.md` | Architecture |
| `docs/05-ui-ux-spec.md` | Screens, states, motion |
| `docs/06-data-dictionary.md` | Data shapes |
| `docs/07-test-plan.md` | Test levels, cases, **AC↔test traceability** |
| `docs/08-backlog-and-wbs.md` | Backlog grooming |
| `docs/09-legal-compliance-privacy.md` | Consent, safety gating, privacy |

## The feature loop (run this for every change)

```
1. IDEATE   — frame the change against PRP §goals; confirm it belongs in scope
2. PLAN     — decompose into INVEST story + Given/When/Then AC (delivery-plan style)
3. SYNC SPEC— write/extend the relevant docs/ file(s) FIRST (source of truth)
4. RED      — add failing Vitest cases mapped to each AC (test-plan traceability)
5. GREEN    — implement minimal code; engine/logic stays pure
6. REVIEW   — typescript-reviewer + react-reviewer agents on the diff
7. GATE     — /quality-gate (npm run gate) must pass (DoD) before "done"
8. SYNC BACK— update docs/07 traceability + delivery-plan status
```

## Definition of Done (enforced by npm run gate)

- All AC pass · **0 `any`** · lint clean · strict `tsc` clean
- Store and quiz progression logic unit-tested (Vitest, ≥90% coverage target)
- Feature works in dev build · no console errors
- Keyboard-navigable · accessibility (axe) clean
- Robust error boundary and fallback mechanism for Gemini API failure (offline quiz fallback)

## Conventions

- **Store & Core Logic:** Keep quiz state, progression, score tracking, and AI integration cleanly isolated in `src/store/` and `src/services/`.
- **No `any`.** All quiz, question, and result shapes must be strongly typed.
- **Run:** `npm run dev` · `npm run lint` · `npm run typecheck` · `npm run test` · `npm run gate` (full DoD gate).
