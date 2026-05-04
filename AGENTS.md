# AGENTS.md

Project-specific notes the agent maintains for itself across sessions.
Global identity, voice, hard guardrails, and engineering conventions are
injected automatically from the platform's MASTER and DESIGN prompts — do
**not** restate them here. Keep this file focused on what is unique to this
workspace.

Keep the whole file concise (target < 200 lines). When a section grows large,
summarise older entries instead of letting it sprawl.

## Project summary

_One-paragraph description: what this project is, who uses it, and the
shape of the codebase. Update when the purpose or scope shifts._

## Tech stack

_Languages, frameworks, databases, deploy target. Update when a new
framework or runtime dependency is added._

## Key files

_Important files with one-line descriptions: entry point, config, routes,
main components, etc._

_Note: do NOT maintain a file-tree section here. The runtime auto-injects
a fresh `<workspace_map>` block every turn (excludes `node_modules/`,
build output, and `attached_assets/`)._

## Architecture & conventions

_Project-specific data flow, key patterns, and design decisions that aren't
obvious from the code. Cross-cutting platform conventions live in the
DESIGN prompt — only record what differs here._

## Commands

_How to install, build, test, run dev server, lint. Use real commands a new
contributor could copy-paste._

## Decision log

_Append-only history of non-trivial decisions in newest-first order._

- _YYYY-MM-DD_ — _short description of the decision and why._

## Known issues / TODO

_Outstanding bugs, unfinished features, or follow-ups the agent should
pick up next session. Remove items as they are completed._

## Memory

_User preferences, recurring requirements, gotchas learned the hard way.
This is the long-term memory: facts that should persist across chats but
that aren't decisions per se._

---

_The agent owns this file. Update it (a) after structural changes,
(b) after non-trivial decisions, (c) when it learns a project-specific fact
worth keeping. Don't rewrite from scratch every time — patch the relevant
section._
