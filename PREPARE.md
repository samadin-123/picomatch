# Evaluation Setup

This file is outside the editable surface. It defines how results are judged. Agents cannot modify the evaluator or the scoring logic — the evaluation is the trust boundary.

Consider defining more than one evaluation criterion. Optimizing for a single number makes it easy to overfit and silently break other things. A secondary metric or sanity check helps keep the process honest.

eval_cores: 1
eval_memory_gb: 1.0
prereq_command: npm test

## Setup

Install dependencies and prepare the evaluation environment:

```bash
# Install main dependencies (project root)
npm install

# Verify tests pass (sanity check)
npm test
```

The `prereq_command` is set to `npm test` to ensure all tests pass before accepting any performance improvement. This prevents optimizations that break correctness.

## Run command

```bash
node .polyresearch/benchmark.js
```

## Output format

The benchmark must print `METRIC=<number>` to stdout. Example:

```
METRIC=2056432
# Completed 3,200,000 operations in 1.556s
# Operations per second: 2,056,432
```

## Metric parsing

The CLI looks for `METRIC=<number>` or `ops_per_sec=<number>` in the output. The metric represents operations per second (higher is better).

## Ground truth

**Baseline performance**: ~2,000,000 ops/sec on baseline hardware (measured on 2026-04-23)

The benchmark measures picomatch's core performance by:
1. Compiling 8 common glob patterns (wildcards, globstars, braces, character classes)
2. Matching each pattern against 8 representative file paths
3. Running 50,000 iterations (3.2M total operations) after warmup
4. Reporting operations per second

The test patterns cover:
- Simple wildcards: `*`, `*.js`
- Nested globstars: `**/*.js`, `src/**/*.js`
- Brace expansion: `{a,b,c}*.txt`, `*.{js,ts,jsx,tsx}`
- Complex patterns: `**/*test*.js`, `lib/**/[a-z]*.js`

The test strings represent realistic file paths from typical JavaScript projects.

## Secondary validation

All changes must pass the full test suite (`npm test`), which includes:
- 2000+ unit tests covering glob patterns, edge cases, and options
- Tests from bash, minimatch, and wildmat compatibility
- Extglob, brace expansion, and POSIX bracket tests
- API tests for picomatch, scan, and posix modules

This ensures performance improvements don't break correctness or compatibility.
