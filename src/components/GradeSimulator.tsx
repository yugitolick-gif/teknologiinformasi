import React, { useState, useMemo } from 'react';
import {
  calculateFinalScore,
  getLetterGrade,
  calculateRequiredUAS,
  WEIGHTS,
} from '../utils/gradeCalculator.ts';
import {
  Calculator,
  Target,
  Sparkles,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
} from 'lucide-react';

export const GradeSimulator: React.FC = () => {
  const [tugas, setTugas] = useState<number>(85);
  const [keaktifan, setKeaktifan] = useState<number>(88);
  const [uts, setUts] = useState<number>(80);
  const [uas, setUas] = useState<number>(84);

  const [targetScore, setTargetScore] = useState<number>(85); // Default Target A

  const finalScore = useMemo(() => {
    return calculateFinalScore({ tugas, keaktifan, uts, uas });
  }, [tugas, keaktifan, uts, uas]);

  const letterInfo = useMemo(() => {
    return getLetterGrade(finalScore);
  }, [finalScore]);

  const uasRequirement = useMemo(() => {
    return calculateRequiredUAS(targetScore, tugas, keaktifan, uts);
  }, [targetScore, tugas, keaktifan, uts]);

  const applyPreset = (presetT: number, presetK: number, presetUts: number, presetUas: number) => {
    setTugas(presetT);
    setKeaktifan(presetK);
    setUts(presetUts);
    setUas(presetUas);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold mb-1">
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Akademik Resmi TI001</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Simulasi & Kalkulator Nilai Akhir Perkuliahan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Hitung perkiraan nilai akhir Anda berdasarkan formula pembobotan resmi RPS Pengantar Teknologi Informasi: Tugas & Kuis (20%), Keaktifan & Partisipasi (15%), UTS (30%), dan UAS (35%).
          </p>
        </div>

        {/* Preset Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">Contoh Skenario:</span>
          <button
            onClick={() => applyPreset(92, 95, 88, 90)}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            Target Predikat A
          </button>
          <button
            onClick={() => applyPreset(80, 80, 75, 78)}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            Rata-rata Kelas
          </button>
          <button
            onClick={() => applyPreset(65, 70, 60, 65)}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            Batas Kelulusan
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Results & Target on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Numeric Inputs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Komponen Evaluasi & Pembobotan
          </h3>

          {/* Component 1: Tugas & Kuis (20%) */}
          <div className="space-y-2 p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="input-tugas" className="text-xs sm:text-sm font-bold text-slate-900">
                  1. Tugas & Kuis Mingguan
                </label>
                <div className="text-[11px] text-slate-500">
                  Bobot resmi: <span className="font-semibold text-slate-700 font-mono">20% (0.20)</span> · Praktikum & Latihan
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="input-tugas"
                  type="number"
                  min="0"
                  max="100"
                  value={tugas}
                  onChange={(e) => setTugas(Number(e.target.value))}
                  className="w-16 px-2.5 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
                <span className="text-xs font-mono text-slate-500">/ 100</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tugas}
              onChange={(e) => setTugas(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Poin: 0)</span>
              <span className="text-indigo-600 font-semibold">
                Kontribusi: {(tugas * WEIGHTS.tugas).toFixed(2)} Poin
              </span>
              <span>100 (Maks 20 Poin)</span>
            </div>
          </div>

          {/* Component 2: Keaktifan (15%) */}
          <div className="space-y-2 p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="input-keaktifan" className="text-xs sm:text-sm font-bold text-slate-900">
                  2. Keaktifan & Partisipasi Kelas
                </label>
                <div className="text-[11px] text-slate-500">
                  Bobot resmi: <span className="font-semibold text-slate-700 font-mono">15% (0.15)</span> · Diskusi, Debat, Tanya Jawab
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="input-keaktifan"
                  type="number"
                  min="0"
                  max="100"
                  value={keaktifan}
                  onChange={(e) => setKeaktifan(Number(e.target.value))}
                  className="w-16 px-2.5 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
                <span className="text-xs font-mono text-slate-500">/ 100</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={keaktifan}
              onChange={(e) => setKeaktifan(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Poin: 0)</span>
              <span className="text-indigo-600 font-semibold">
                Kontribusi: {(keaktifan * WEIGHTS.keaktifan).toFixed(2)} Poin
              </span>
              <span>100 (Maks 15 Poin)</span>
            </div>
          </div>

          {/* Component 3: UTS (30%) */}
          <div className="space-y-2 p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="input-uts" className="text-xs sm:text-sm font-bold text-slate-900">
                  3. Ujian Tengah Semester (UTS)
                </label>
                <div className="text-[11px] text-slate-500">
                  Bobot resmi: <span className="font-semibold text-indigo-700 font-mono">30% (0.30)</span> · Ujian Tertulis Minggu ke-8
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="input-uts"
                  type="number"
                  min="0"
                  max="100"
                  value={uts}
                  onChange={(e) => setUts(Number(e.target.value))}
                  className="w-16 px-2.5 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
                <span className="text-xs font-mono text-slate-500">/ 100</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={uts}
              onChange={(e) => setUts(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Poin: 0)</span>
              <span className="text-indigo-600 font-semibold">
                Kontribusi: {(uts * WEIGHTS.uts).toFixed(2)} Poin
              </span>
              <span>100 (Maks 30 Poin)</span>
            </div>
          </div>

          {/* Component 4: UAS (35%) */}
          <div className="space-y-2 p-4 bg-indigo-50/40 border border-indigo-200/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="input-uas" className="text-xs sm:text-sm font-bold text-slate-900">
                  4. Ujian Akhir Semester (UAS)
                </label>
                <div className="text-[11px] text-slate-500">
                  Bobot resmi: <span className="font-semibold text-indigo-700 font-mono">35% (0.35)</span> · Ujian Tertulis Minggu ke-16
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="input-uas"
                  type="number"
                  min="0"
                  max="100"
                  value={uas}
                  onChange={(e) => setUas(Number(e.target.value))}
                  className="w-16 px-2.5 py-1 text-center font-mono font-bold text-sm bg-white border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
                <span className="text-xs font-mono text-slate-500">/ 100</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={uas}
              onChange={(e) => setUas(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Poin: 0)</span>
              <span className="text-indigo-600 font-semibold">
                Kontribusi: {(uas * WEIGHTS.uas).toFixed(2)} Poin
              </span>
              <span>100 (Maks 35 Poin)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Result Card & Target Solver */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Scoreboard Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kalkulasi Nilai Akhir
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${letterInfo.colorClass}`}>
                {letterInfo.isPassing ? 'Lulus Perkuliahan' : 'Belum Lulus'}
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 font-mono tracking-tight">
                {finalScore.toFixed(1)}
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">
                  Huruf: {letterInfo.letter}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Bobot IP: {letterInfo.gradePoint.toFixed(1)} / 4.0
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Predikat Akademik:</span>
              <span className="font-bold text-slate-900">{letterInfo.predicate}</span>
            </div>

            {/* Poin Akumulasi Rinci */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Rincian Kontribusi Skor
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <div className="text-slate-500 text-[10px]">Tugas (20%)</div>
                  <div className="font-mono font-bold text-slate-800">
                    {(tugas * WEIGHTS.tugas).toFixed(1)} Poin
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <div className="text-slate-500 text-[10px]">Keaktifan (15%)</div>
                  <div className="font-mono font-bold text-slate-800">
                    {(keaktifan * WEIGHTS.keaktifan).toFixed(1)} Poin
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <div className="text-slate-500 text-[10px]">UTS (30%)</div>
                  <div className="font-mono font-bold text-slate-800">
                    {(uts * WEIGHTS.uts).toFixed(1)} Poin
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <div className="text-slate-500 text-[10px]">UAS (35%)</div>
                  <div className="font-mono font-bold text-indigo-700">
                    {(uas * WEIGHTS.uas).toFixed(1)} Poin
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Target Score Solver (Berapa Nilai UAS yang Dibutuhkan?) */}
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-300" />
              <h4 className="text-sm font-bold tracking-tight">
                Simulasi Target Nilai Akhir
              </h4>
            </div>

            <p className="text-xs text-indigo-200 leading-relaxed">
              Pilih target nilai yang ingin Anda capai di akhir semester. Sistem akan menghitung nilai UAS minimum yang harus Anda raih:
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Grade A', score: 85 },
                { label: 'Grade A-', score: 80 },
                { label: 'Grade B+', score: 75 },
                { label: 'Grade B', score: 70 },
              ].map((item) => (
                <button
                  key={item.score}
                  onClick={() => setTargetScore(item.score)}
                  className={`p-2 rounded-xl text-center text-xs font-semibold transition-all ${
                    targetScore === item.score
                      ? 'bg-white text-indigo-950 font-bold shadow-xs'
                      : 'bg-indigo-800/80 text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`}
                >
                  <div>{item.label}</div>
                  <div className="text-[10px] opacity-80">≥ {item.score}</div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-indigo-950/70 border border-indigo-700/60 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-200">Kebutuhan Nilai UAS:</span>
                <span className="text-lg font-mono font-extrabold text-amber-300">
                  {uasRequirement.requiredUas}
                </span>
              </div>
              <p className="text-xs text-indigo-100 leading-normal">
                {uasRequirement.message}
              </p>
            </div>
          </div>

          {/* Konversi Nilai Standar Perguruan Tinggi */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Info className="w-4 h-4 text-slate-500" />
              <span>Standar Konversi Nilai Akademik</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">A</span> : 85.0 - 100 (4.0)
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">A-</span> : 80.0 - 84.9 (3.7)
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">B+</span> : 75.0 - 79.9 (3.3)
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">B</span> : 70.0 - 74.9 (3.0)
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">B-</span> : 65.0 - 69.9 (2.7)
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-slate-900">C+</span> : 60.0 - 64.9 (2.3)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
