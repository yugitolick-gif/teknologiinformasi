import React from 'react';
import { COURSE_IDENTITY, CPMK_LIST } from '../data/rpsData.ts';
import { Calendar, Clock, MapPin, Award, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface CourseHeroProps {
  completedCount: number;
  totalMeetings: number;
  onSelectMeeting: (meetingId: number) => void;
  onOpenSimulator: () => void;
}

export const CourseHero: React.FC<CourseHeroProps> = ({
  completedCount,
  totalMeetings,
  onOpenSimulator,
}) => {
  const progressPercent = Math.round((completedCount / totalMeetings) * 100);

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Top Badging / Context Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-indigo-700">{COURSE_IDENTITY.studyProgram}</span>
          <span aria-hidden="true">·</span>
          <span>Semester Ganjil 2026/2027</span>
          <span aria-hidden="true">·</span>
          <span>Kurikulum Berbasis OBE (Outcome-Based Education)</span>
        </div>

        {/* Main Title & Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-mono font-semibold rounded-md border border-slate-200">
                {COURSE_IDENTITY.courseCode}
              </span>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-100">
                {COURSE_IDENTITY.credits} SKS
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100">
                Kelas {COURSE_IDENTITY.className} ({COURSE_IDENTITY.studentCount} Mahasiswa)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
              {COURSE_IDENTITY.courseName}
            </h1>


            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              {COURSE_IDENTITY.description}
            </p>

            {/* Logistics Grid Bar */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Jadwal Kuliah</div>
                  <div className="text-xs font-semibold text-slate-900">{COURSE_IDENTITY.schedule}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Ruang Perkuliahan</div>
                  <div className="text-xs font-semibold text-slate-900">Ruang {COURSE_IDENTITY.room}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Evaluasi</div>
                  <div className="text-xs font-semibold text-slate-900">16 Minggu (UTS & UAS)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Progress Card & Grading Snapshot */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Progres Belajar Mandiri
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {completedCount} <span className="text-sm font-normal text-slate-500">/ {totalMeetings} Selesai</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-200">
                {progressPercent}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quick Scoring Breakdown Box */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Distribusi Bobot Penilaian</span>
                <button
                  onClick={onOpenSimulator}
                  className="text-indigo-600 hover:text-indigo-800 text-[11px] underline underline-offset-2"
                >
                  Buka Kalkulator
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-200/60 flex justify-between items-center">
                  <span className="text-slate-600">Tugas & Kuis</span>
                  <span className="font-mono font-bold text-slate-900">20%</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200/60 flex justify-between items-center">
                  <span className="text-slate-600">Keaktifan</span>
                  <span className="font-mono font-bold text-slate-900">15%</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200/60 flex justify-between items-center">
                  <span className="text-slate-600">UTS (Minggu 8)</span>
                  <span className="font-mono font-bold text-indigo-700">30%</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200/60 flex justify-between items-center">
                  <span className="text-slate-600">UAS (Minggu 16)</span>
                  <span className="font-mono font-bold text-indigo-700">35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CPMK (Capaian Pembelajaran Mata Kuliah) Accordion / Cards */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Capaian Pembelajaran Mata Kuliah (CPMK)
              </h2>
            </div>
            <span className="text-xs text-slate-500">4 Capaian Pembelajaran Utama</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CPMK_LIST.map((cpmk) => (
              <div
                key={cpmk.id}
                className="bg-slate-50 hover:bg-white hover:shadow-xs transition-all border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {cpmk.code}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {cpmk.bloomTaxonomy.split(' - ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {cpmk.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                  {cpmk.bloomTaxonomy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
