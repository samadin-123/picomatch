# Research Program

cli_version: 0.5.3
default_branch: master
lead_github_login: samadin-123
maintainer_github_login: samadin-123
metric_tolerance: 0.01
metric_direction: higher_is_better
required_confirmations: 0
auto_approve: true
min_queue_depth: 5
assignment_timeout: 24h

## Goal

Improve picomatch glob matching performance by at least 1% (measured in operations per second). The focus is on optimizing the core matching logic in lib/ without breaking existing functionality. Target hot paths like pattern compilation, regex generation, and string matching operations.

## What you CAN modify

- `lib/*.js` — core library source code (picomatch.js, parse.js, scan.js, utils.js, constants.js)
- `index.js` — main entry point
- `posix.js` — POSIX-specific exports

## What you CANNOT modify

- `PROGRAM.md` — research program specification
- `PREPARE.md` — evaluation setup and trust boundary
- `.polyresearch/` — runtime directory
- `test/` — test suite (evaluation harness)
- `bench/` — benchmark infrastructure
- `package.json` — project metadata and dependencies
- Any file that defines the evaluation harness or scoring logic

## Constraints

- All changes must pass the evaluation harness defined in PREPARE.md.
- Each experiment should be atomic and independently verifiable.
- All else being equal, simpler is better. A small improvement that adds ugly complexity is not worth keeping. Removing code and getting equal or better results is a great outcome.
- If a run crashes, use judgment: fix trivial bugs (typos, missing imports) and re-run. If the idea is fundamentally broken, skip it and move on.
- Document what you tried and what you observed in the attempt summary.

## Strategy hints

- Read the full codebase before your first experiment. Understand what you are working with.
- Start with the lowest-hanging fruit.
- Measure before and after every change.
- Read results.tsv to learn from history. Do not repeat approaches that already failed.
- If an approach does not show improvement after reasonable effort, release and move on.
- Try combining ideas from previous near-misses.
- If you are stuck, try something more radical. Re-read the source for new angles.