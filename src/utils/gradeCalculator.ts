/**
 * Pure calculation logic for grading in Mata Kuliah Pengantar Teknologi Informasi (TI001)
 * Bobot:
 * - Tugas & Kuis: 20% (0.20)
 * - Keaktifan & Partisipasi: 15% (0.15)
 * - Ujian Tengah Semester (UTS): 30% (0.30)
 * - Ujian Akhir Semester (UAS): 35% (0.35)
 */

export interface GradeInput {
  tugas: number;
  keaktifan: number;
  uts: number;
  uas: number;
}

export interface LetterGradeInfo {
  letter: string;
  gradePoint: number;
  predicate: string;
  isPassing: boolean;
  colorClass: string;
}

export const WEIGHTS = {
  tugas: 0.20,
  keaktifan: 0.15,
  uts: 0.30,
  uas: 0.35,
};

export function calculateFinalScore(input: GradeInput): number {
  const tugasScore = Math.max(0, Math.min(100, input.tugas || 0)) * WEIGHTS.tugas;
  const keaktifanScore = Math.max(0, Math.min(100, input.keaktifan || 0)) * WEIGHTS.keaktifan;
  const utsScore = Math.max(0, Math.min(100, input.uts || 0)) * WEIGHTS.uts;
  const uasScore = Math.max(0, Math.min(100, input.uas || 0)) * WEIGHTS.uas;

  const total = tugasScore + keaktifanScore + utsScore + uasScore;
  return Math.round(total * 100) / 100;
}

export function getLetterGrade(score: number): LetterGradeInfo {
  if (score >= 85) {
    return { letter: 'A', gradePoint: 4.0, predicate: 'Sangat Memuaskan', isPassing: true, colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  } else if (score >= 80) {
    return { letter: 'A-', gradePoint: 3.7, predicate: 'Memuaskan', isPassing: true, colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  } else if (score >= 75) {
    return { letter: 'B+', gradePoint: 3.3, predicate: 'Sangat Baik', isPassing: true, colorClass: 'text-blue-700 bg-blue-50 border-blue-200' };
  } else if (score >= 70) {
    return { letter: 'B', gradePoint: 3.0, predicate: 'Baik', isPassing: true, colorClass: 'text-blue-600 bg-blue-50 border-blue-200' };
  } else if (score >= 65) {
    return { letter: 'B-', gradePoint: 2.7, predicate: 'Cukup Baik', isPassing: true, colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
  } else if (score >= 60) {
    return { letter: 'C+', gradePoint: 2.3, predicate: 'Cukup', isPassing: true, colorClass: 'text-amber-700 bg-amber-50 border-amber-200' };
  } else if (score >= 55) {
    return { letter: 'C', gradePoint: 2.0, predicate: 'Sedang', isPassing: true, colorClass: 'text-amber-600 bg-amber-50 border-amber-200' };
  } else if (score >= 40) {
    return { letter: 'D', gradePoint: 1.0, predicate: 'Kurang (Perlu Remedial)', isPassing: false, colorClass: 'text-rose-600 bg-rose-50 border-rose-200' };
  } else {
    return { letter: 'E', gradePoint: 0.0, predicate: 'Tidak Lulus', isPassing: false, colorClass: 'text-red-700 bg-red-50 border-red-200' };
  }
}

/**
 * Calculates the required UAS score to reach a desired target total score (e.g. 85 for 'A')
 * target = (tugas * 0.20) + (keaktifan * 0.15) + (uts * 0.30) + (requiredUAS * 0.35)
 * requiredUAS = (target - currentAccrued) / 0.35
 */
export function calculateRequiredUAS(
  targetScore: number,
  tugas: number,
  keaktifan: number,
  uts: number
): { requiredUas: number; achievable: boolean; message: string } {
  const currentAccrued =
    Math.max(0, Math.min(100, tugas)) * WEIGHTS.tugas +
    Math.max(0, Math.min(100, keaktifan)) * WEIGHTS.keaktifan +
    Math.max(0, Math.min(100, uts)) * WEIGHTS.uts;

  const needed = (targetScore - currentAccrued) / WEIGHTS.uas;
  const rounded = Math.round(needed * 10) / 10;

  if (rounded <= 0) {
    return {
      requiredUas: 0,
      achievable: true,
      message: 'Target sudah tercapai bahkan jika nilai UAS = 0!',
    };
  }

  if (rounded > 100) {
    return {
      requiredUas: rounded,
      achievable: false,
      message: `Dibutuhkan nilai ${rounded} (melebihi batas maksimal 100). Target sulit tercapai tanpa revisi komponen lain.`,
    };
  }

  return {
    requiredUas: rounded,
    achievable: true,
    message: `Anda membutuhkan nilai UAS minimal ${rounded} untuk mendapatkan total skor ${targetScore}.`,
  };
}
