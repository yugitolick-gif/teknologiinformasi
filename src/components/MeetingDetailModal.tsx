import React, { useState } from 'react';
import { MeetingItem } from '../data/rpsData.ts';
import { recordQuizSubmission } from '../lib/firebase.ts';
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  FileText,
  RotateCcw,
  Check,
  ChevronRight,
  Bookmark,
  Share2,
  ExternalLink,
} from 'lucide-react';


interface MeetingDetailModalProps {
  meeting: MeetingItem | null;
  onClose: () => void;
  onOpenLab: (labId: string) => void;
  isCompleted: boolean;
  onToggleComplete: (meetingId: number) => void;
}

export const MeetingDetailModal: React.FC<MeetingDetailModalProps> = ({
  meeting,
  onClose,
  onOpenLab,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'materi-lengkap' | 'rangkuman' | 'silabus' | 'kuis'>('materi-lengkap');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  if (!meeting) return null;

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const correctCount = meeting.quiz.reduce((acc, q, idx) => {
    return quizAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const quizScorePercent = Math.round((correctCount / (meeting.quiz.length || 1)) * 100);

  const detailed = meeting.detailedContent;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-mono text-xs font-bold rounded-md">
                  Pertemuan #{meeting.minggu}
                </span>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {meeting.kategori}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Bobot Sesi: {meeting.bobotIndikatif}%
                </span>
                {meeting.isExam && (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Sesi Ujian Resmi
                  </span>
                )}
              </div>
              <h2 id="modal-headline" className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {meeting.bahanKajian}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong className="text-slate-800">Kemampuan Akhir (Sub-CPMK):</strong> {meeting.kemampuanAkhir}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
              aria-label="Tutup jendela modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tab Navigation (4 Tabs) */}
          <div className="flex items-center gap-1 sm:gap-2 mt-5 border-b border-slate-200 -mb-5 sm:-mb-6 pt-1 text-xs overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('materi-lengkap')}
              className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'materi-lengkap'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Modul Materi Lengkap</span>
            </button>

            <button
              onClick={() => setActiveTab('rangkuman')}
              className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'rangkuman'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Rangkuman & Istilah</span>
            </button>

            <button
              onClick={() => setActiveTab('silabus')}
              className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'silabus'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Aktivitas & CPMK</span>
            </button>

            <button
              onClick={() => setActiveTab('kuis')}
              className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'kuis'
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Kuis Mandiri ({meeting.quiz.length} Soal)</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: MODUL MATERI LENGKAP (Textbook Style) */}
          {activeTab === 'materi-lengkap' && (
            <div className="space-y-6">
              {/* Highlight Banner / Lab Link if available */}
              {meeting.labId && (
                <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-950">Laboratorium Interaktif Tersedia!</div>
                      <div className="text-[11px] text-indigo-700">
                        Coba simulasi interaktif langsung untuk topik materi ini di tab Lab.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onOpenLab(meeting.labId!);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-xs"
                  >
                    Buka Lab Interaktif
                  </button>
                </div>
              )}

              {/* Instructional Objectives List */}
              {detailed?.tujuanInstruksional && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                    Tujuan Instruksional Khusus (TIK / Capaian Sesi)
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {detailed.tujuanInstruksional.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/60">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Lecture Sections */}
              {detailed?.modulMateri && detailed.modulMateri.length > 0 ? (
                <div className="space-y-6">
                  {detailed.modulMateri.map((section, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
                    >
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {section.judul}
                        </h3>
                        <p className="text-xs text-indigo-700 font-medium mt-0.5">
                          {section.ringkasan}
                        </p>
                      </div>

                      {/* Paragraph Content */}
                      <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                        {section.konten.map((par, pIdx) => (
                          <p key={pIdx}>{par}</p>
                        ))}
                      </div>

                      {/* Key Points Grid */}
                      {section.poinKunci && section.poinKunci.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Poin Kunci yang Harus Diingat:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {section.poinKunci.map((pk, kIdx) => (
                              <div
                                key={kIdx}
                                className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/70 rounded-lg text-xs font-medium text-slate-800"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                                <span>{pk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Case Study Callout Box */}
                      {section.contohKasus && (
                        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                            Contoh Kasus Dunia Nyata / Penerapan Industri:
                          </span>
                          <p className="text-xs text-amber-950 leading-relaxed">
                            {section.contohKasus}
                          </p>
                        </div>
                      )}

                      {/* Chapter Reference */}
                      {section.referensiBab && (
                        <div className="text-[11px] text-slate-500 font-mono pt-1">
                          Rujukan: {section.referensiBab}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
                  Modul bacaan perkuliahan lengkap sedang dimuat.
                </div>
              )}

              {/* Study Guide Banner */}
              {detailed?.panduanBelajar && (
                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-indigo-300 font-bold block uppercase tracking-wider text-[10px]">
                      Panduan Belajar Mandiri:
                    </span>
                    <p className="text-slate-200 mt-0.5">{detailed.panduanBelajar}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('kuis')}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shrink-0 transition-colors"
                  >
                    Mulai Kuis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RANGKUMAN & ISTILAH KUNCI */}
          {activeTab === 'rangkuman' && (
            <div className="space-y-6">
              {/* Rangkuman Poin Kunci */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Rangkuman Pokok Bahasan
                </h3>
                <div className="space-y-2.5">
                  {meeting.rangkumanMateri.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Istilah Kunci & Glosarium */}
              {meeting.istilahKunci && meeting.istilahKunci.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Istilah Kunci (Glosarium)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {meeting.istilahKunci.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs"
                      >
                        <div className="text-xs font-bold text-slate-900 font-mono">{item.istilah}</div>
                        <div className="text-[11px] text-slate-600 leading-normal">{item.arti}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Topik Terperinci */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daftar Sub-Topik Pembahasan
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {meeting.subTopik.map((st, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 flex items-start gap-2 text-slate-700"
                    >
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: AKTIVITAS & CPMK */}
          {activeTab === 'silabus' && (
            <div className="space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Metode Pembelajaran
                  </span>
                  <div className="font-bold text-slate-900 text-sm sm:text-base">
                    {meeting.metodePembelajaran}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Alokasi Waktu
                  </span>
                  <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    {meeting.durasi}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Pengalaman Belajar Mahasiswa
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {meeting.pengalamanBelajar}
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Kriteria & Indikator Penilaian
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {meeting.kriteriaPenilaian}
                </p>
              </div>

              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                    Keterkaitan CPMK
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {meeting.cpmkIds.map((cId) => (
                    <span
                      key={cId}
                      className="px-2.5 py-1 bg-white text-indigo-700 text-xs font-mono font-bold rounded-md border border-indigo-200 shadow-2xs"
                    >
                      {cId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KUIS MANDIRI (LENGKAP SEMUA PERTEMUAN) */}
          {activeTab === 'kuis' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Evaluasi Kuis Mandiri: {meeting.bahanKajian}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Terdapat {meeting.quiz.length} pertanyaan konseptual dan analitis untuk mengukur pemahaman Anda.
                  </p>
                </div>
                {showQuizResults && (
                  <div className="text-left sm:text-right bg-white p-2.5 rounded-lg border border-slate-200 shrink-0">
                    <span className="text-[11px] font-semibold text-slate-500 block">Hasil Evaluasi:</span>
                    <div className="text-base font-bold text-indigo-700 font-mono">
                      {correctCount} / {meeting.quiz.length} Benar ({quizScorePercent}%)
                    </div>
                  </div>
                )}
              </div>

              {/* Quiz Questions List */}
              <div className="space-y-5">
                {meeting.quiz.map((q, qIdx) => {
                  const selectedOption = quizAnswers[qIdx];
                  const hasAnswered = selectedOption !== undefined;
                  const isCorrect = selectedOption === q.correctAnswer;

                  return (
                    <div
                      key={qIdx}
                      className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selectedOption === oIdx;
                          const isTargetCorrect = oIdx === q.correctAnswer;

                          let optionStyles = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (showQuizResults) {
                            if (isTargetCorrect) {
                              optionStyles = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold ring-1 ring-emerald-200';
                            } else if (isOptionSelected && !isCorrect) {
                              optionStyles = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                            } else {
                              optionStyles = 'opacity-60 bg-slate-50 border-slate-200 text-slate-500';
                            }
                          } else if (isOptionSelected) {
                            optionStyles = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-1 ring-indigo-200';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(qIdx, oIdx)}
                              className={`w-full text-left p-3 text-xs sm:text-sm rounded-lg border transition-all flex items-center justify-between gap-3 ${optionStyles}`}
                              disabled={showQuizResults}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs opacity-75 font-semibold">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                              {showQuizResults && isTargetCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Detailed Explanation */}
                      {showQuizResults && (
                        <div
                          className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                              : 'bg-amber-50 text-amber-950 border border-amber-200'
                          }`}
                        >
                          <span className="font-bold block mb-1">
                            {isCorrect ? '✓ Jawaban Anda Benar!' : '✗ Jawaban Belum Tepat'}
                          </span>
                          <span className="font-semibold">Penjelasan Pedagogis:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {showQuizResults ? (
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis Pertemuan Ini</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowQuizResults(true);
                      recordQuizSubmission({
                        meetingId: meeting.id,
                        score: quizScorePercent,
                        correctCount,
                        totalQuestions: meeting.quiz.length,
                      }).catch((err) => console.warn('Could not record quiz submission:', err));
                    }}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
                  >
                    Periksa Jawaban ({Object.keys(quizAnswers).length}/{meeting.quiz.length} Terjawab)
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => onToggleComplete(meeting.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition-colors ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Sudah Dipelajari (Selesai)' : 'Tandai Selesai Dipelajari'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
