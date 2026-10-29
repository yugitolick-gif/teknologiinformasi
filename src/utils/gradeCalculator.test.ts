import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFinalScore,
  getLetterGrade,
  calculateRequiredUAS,
  WEIGHTS,
} from './gradeCalculator.ts';

test('WEIGHTS sum to 1.0 (100%)', () => {
  const sum = WEIGHTS.tugas + WEIGHTS.keaktifan + WEIGHTS.uts + WEIGHTS.uas;
  assert.equal(Math.round(sum * 100) / 100, 1.0);
});

test('calculateFinalScore calculates with correct percentages', () => {
  // Perfect score: 100 for all
  const perfect = calculateFinalScore({ tugas: 100, keaktifan: 100, uts: 100, uas: 100 });
  assert.equal(perfect, 100);

  // Mixed scores:
  // Tugas 80 * 0.20 = 16
  // Keaktifan 90 * 0.15 = 13.5
  // UTS 70 * 0.30 = 21
  // UAS 80 * 0.35 = 28
  // Total = 16 + 13.5 + 21 + 28 = 78.5
  const result = calculateFinalScore({ tugas: 80, keaktifan: 90, uts: 70, uas: 80 });
  assert.equal(result, 78.5);
});

test('getLetterGrade maps correctly to grade brackets', () => {
  assert.equal(getLetterGrade(90).letter, 'A');
  assert.equal(getLetterGrade(85).letter, 'A');
  assert.equal(getLetterGrade(84.9).letter, 'A-');
  assert.equal(getLetterGrade(78).letter, 'B+');
  assert.equal(getLetterGrade(70).letter, 'B');
  assert.equal(getLetterGrade(66).letter, 'B-');
  assert.equal(getLetterGrade(61).letter, 'C+');
  assert.equal(getLetterGrade(55).letter, 'C');
  assert.equal(getLetterGrade(45).letter, 'D');
  assert.equal(getLetterGrade(30).letter, 'E');
});

test('calculateRequiredUAS correctly calculates needed score for target A (85)', () => {
  // If tugas=90, keaktifan=90, uts=80
  // Accrued = (90*0.2) + (90*0.15) + (80*0.3) = 18 + 13.5 + 24 = 55.5
  // Needed = (85 - 55.5) / 0.35 = 29.5 / 0.35 = 84.2857 -> 84.3
  const plan = calculateRequiredUAS(85, 90, 90, 80);
  assert.equal(plan.achievable, true);
  assert.equal(plan.requiredUas, 84.3);
});
