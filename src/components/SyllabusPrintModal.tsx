import React from 'react';
import {
  COURSE_IDENTITY,
  CPMK_LIST,
  RPS_MEETINGS,
  REFERENCE_BOOKS,
} from '../data/rpsData.ts';
import { X, Printer, Download, FileText } from 'lucide-react';

interface SyllabusPrintModalProps {
  onClose: () => void;
}

export const SyllabusPrintModal: React.FC<SyllabusPrintModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Floating Toolbar (Not printed) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4 no-print shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="font-bold">Pratinjau Dokumen Resmi RPS (Format Cetak / PDF)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto print-page font-serif text-slate-900 text-xs sm:text-sm leading-relaxed space-y-6">
          {/* Header Institusi & Mata Kuliah */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="text-xs font-sans font-bold tracking-widest uppercase text-slate-600">
              KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI
            </div>
            <div className="text-sm font-sans font-bold uppercase tracking-wider text-slate-800">
              FAKULTAS ILMU KOMPUTER & TEKNOLOGI · PROGRAM STUDI {COURSE_IDENTITY.studyProgram.toUpperCase()}
            </div>
            <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide pt-2 text-slate-900 font-sans">
              RENCANA PEMBELAJARAN SEMESTER (RPS)
            </h1>
            <div className="text-xs font-sans text-slate-600">
              Dokumen Kurikulum Berbasis Capaian Pembelajaran (OBE)
            </div>
          </div>

          {/* Tabel Identitas Mata Kuliah */}
          <div className="space-y-2">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              I. IDENTITAS MATA KULIAH
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans border border-slate-300 p-3 rounded-sm bg-slate-50/50">
              <div>
                <span className="text-slate-500 block">Nama Mata Kuliah:</span>
                <strong className="text-slate-900">{COURSE_IDENTITY.courseName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Kode Mata Kuliah:</span>
                <strong className="text-slate-900 font-mono">{COURSE_IDENTITY.courseCode}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Bobot SKS:</span>
                <strong className="text-slate-900">{COURSE_IDENTITY.credits} SKS</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Kelas / Jumlah Mhs:</span>
                <strong className="text-slate-900">Kelas {COURSE_IDENTITY.className} — {COURSE_IDENTITY.studentCount} Mahasiswa</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Jadwal Perkuliahan:</span>
                <strong className="text-slate-900">{COURSE_IDENTITY.schedule} WIB</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Ruang Kuliah:</span>
                <strong className="text-slate-900">{COURSE_IDENTITY.room}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Program Studi:</span>
                <strong className="text-slate-900">{COURSE_IDENTITY.studyProgram}</strong>
              </div>
            </div>
          </div>

          {/* Deskripsi & CPMK */}
          <div className="space-y-3">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              II. DESKRIPSI & CAPAIAN PEMBELAJARAN (CPMK)
            </h2>
            <div className="font-sans text-xs text-slate-700 leading-relaxed text-justify">
              <strong>Deskripsi Singkat:</strong> {COURSE_IDENTITY.description}
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-sans font-bold text-slate-800">
                Capaian Pembelajaran Mata Kuliah (CPMK):
              </span>
              <ul className="space-y-1 text-xs font-sans text-slate-700">
                {CPMK_LIST.map((cpmk) => (
                  <li key={cpmk.id} className="flex items-start gap-2">
                    <strong className="text-slate-900 font-mono shrink-0">{cpmk.code}:</strong>
                    <span>{cpmk.description} <em>({cpmk.bloomTaxonomy})</em></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tabel RPS Mingguan (16 Pertemuan) */}
          <div className="space-y-2">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              III. RENCANA PEMBELAJARAN MINGGUAN (16 PERTEMUAN)
            </h2>
            <table className="w-full border-collapse border border-slate-400 text-[11px] font-sans">
              <thead>
                <tr className="bg-slate-100 text-slate-900">
                  <th className="border border-slate-400 p-2 w-10 text-center">Mg</th>
                  <th className="border border-slate-400 p-2 text-left">Kemampuan Akhir yang Diharapkan (Sub-CPMK)</th>
                  <th className="border border-slate-400 p-2 text-left">Bahan Kajian / Materi Pembelajaran</th>
                  <th className="border border-slate-400 p-2 text-left">Metode Pembelajaran</th>
                  <th className="border border-slate-400 p-2 text-center w-16">Bobot (%)</th>
                </tr>
              </thead>
              <tbody>
                {RPS_MEETINGS.map((m) => (
                  <tr key={m.id} className={m.isExam ? 'bg-slate-50 font-semibold' : ''}>
                    <td className="border border-slate-400 p-1.5 text-center font-mono">{m.minggu}</td>
                    <td className="border border-slate-400 p-1.5">{m.kemampuanAkhir}</td>
                    <td className="border border-slate-400 p-1.5">
                      <div className="font-semibold text-slate-900">{m.bahanKajian}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        {m.subTopik.slice(0, 2).join('; ')}
                      </div>
                    </td>
                    <td className="border border-slate-400 p-1.5">{m.metodePembelajaran}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-mono">{m.bobotIndikatif}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sistem Penilaian */}
          <div className="space-y-2">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              IV. SISTEM PENILAIAN & BOBOT EVALUASI
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <span className="text-slate-600 block">Tugas & Kuis:</span>
                <strong className="text-base text-slate-900 font-mono">20%</strong>
              </div>
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <span className="text-slate-600 block">Keaktifan & Partisipasi:</span>
                <strong className="text-base text-slate-900 font-mono">15%</strong>
              </div>
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <span className="text-slate-600 block">Ujian Tengah Semester (UTS):</span>
                <strong className="text-base text-slate-900 font-mono">30%</strong>
              </div>
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <span className="text-slate-600 block">Ujian Akhir Semester (UAS):</span>
                <strong className="text-base text-slate-900 font-mono">35%</strong>
              </div>
            </div>
          </div>

          {/* Referensi Utama */}
          <div className="space-y-2">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              V. REFERENSI UTAMA
            </h2>
            <ul className="list-decimal list-inside space-y-1 text-xs font-sans text-slate-700">
              {REFERENCE_BOOKS.map((ref) => (
                <li key={ref.id}>
                  {ref.authors} ({ref.year}). <em>{ref.title}</em> ({ref.edition}). {ref.publisher}.
                </li>
              ))}
            </ul>
          </div>

          {/* Pengesahan Tanda Tangan */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs font-sans">
            <div className="space-y-12">
              <div>Mengetahui,<br />Ketua Program Studi Teknologi Informasi</div>
              <div className="font-bold underline uppercase">( Dr. Ir. Koordinator Prodi, M.T. )</div>
            </div>
            <div className="space-y-12">
              <div>Dosen Pengampu Mata Kuliah,<br />Pengantar Teknologi Informasi</div>
              <div className="font-bold underline uppercase">( Tim Dosen Pengampu PTI001 )</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
