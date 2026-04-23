#!/usr/bin/env node
'use strict';

/**
 * Simple benchmark script for picomatch performance evaluation.
 * Measures operations per second for common glob patterns.
 * Prints METRIC=<ops_per_sec> for the evaluation harness.
 */

const pm = require('..');

// Test patterns representing common use cases
const patterns = [
  '*',
  '*.js',
  '**/*.js',
  'src/**/*.js',
  '{a,b,c}*.txt',
  '*.{js,ts,jsx,tsx}',
  '**/*test*.js',
  'lib/**/[a-z]*.js'
];

// Test strings to match against
const testStrings = [
  'index.js',
  'src/lib/utils.js',
  'test/api.test.js',
  'a.txt',
  'b.js',
  'lib/parse/scanner.js',
  'test/unit/fixtures/data.json',
  'components/Button.tsx'
];

function runBenchmark() {
  const iterations = 50000;
  const warmupIterations = 5000;

  // Warmup phase
  for (let i = 0; i < warmupIterations; i++) {
    for (const pattern of patterns) {
      const isMatch = pm(pattern);
      for (const str of testStrings) {
        isMatch(str);
      }
    }
  }

  // Actual benchmark
  const startTime = process.hrtime.bigint();

  for (let i = 0; i < iterations; i++) {
    for (const pattern of patterns) {
      const isMatch = pm(pattern);
      for (const str of testStrings) {
        isMatch(str);
      }
    }
  }

  const endTime = process.hrtime.bigint();
  const elapsedNs = Number(endTime - startTime);
  const elapsedSeconds = elapsedNs / 1e9;

  const totalOperations = iterations * patterns.length * testStrings.length;
  const opsPerSec = Math.round(totalOperations / elapsedSeconds);

  console.log(`METRIC=${opsPerSec}`);
  console.log(`# Completed ${totalOperations.toLocaleString()} operations in ${elapsedSeconds.toFixed(3)}s`);
  console.log(`# Operations per second: ${opsPerSec.toLocaleString()}`);
}

runBenchmark();
