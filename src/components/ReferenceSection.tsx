import React, { useState } from 'react';
import { REFERENCE_BOOKS } from '../data/rpsData.ts';
import { Library, BookOpen, ExternalLink, Copy, Check } from 'lucide-react';

export const ReferenceSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold mb-1">
            <Library className="w-4 h-4" />
            <span>Pustaka & Daftar Rujukan Akademik</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Buku Teks & Referensi Utama Perkuliahan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Tiga buku teks standar internasional yang digunakan sebagai rujukan penyusunan bahan kajian, modul praktikum, dan materi evaluasi RPS Pengantar Teknologi Informasi.
          </p>
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REFERENCE_BOOKS.map((book) => {
          const apaCitation = `${book.authors} (${book.year}). ${book.title} (${book.edition}). ${book.publisher}.`;
          const isCopied = copiedId === book.id;

          return (
            <div
              key={book.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Card Book Spine / Cover Mock */}
              <div className={`p-6 bg-linear-to-br ${book.coverColor} text-white space-y-3 relative`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                    {book.publisher}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 backdrop-blur-xs text-[10px] font-bold rounded">
                    Tahun {book.year}
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-bold leading-tight line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="text-xs text-white/80 mt-1">
                    {book.edition}
                  </div>
                </div>

                <div className="text-[11px] text-white/70 font-mono">
                  {book.authors}
                </div>
              </div>

              {/* Book Details Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Cakupan Bab Terkait di RPS:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {book.relevantChapters}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Format Sitasi APA 7th:
                    </span>
                    <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 border border-slate-200/60 break-words">
                      {apaCitation}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyCitation(apaCitation, book.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors mt-4"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Sitasi Disalin ke Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Salin Sitasi APA</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Online Access & Digital Library Notes */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Akses Perpustakaan Digital & Bahan Ajar Elektronik
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Seluruh mahasiswa Kelas A dapat mengakses versi e-book atau salinan fisik ketiga buku teks rujukan di atas melalui Perpustakaan Pusat Kampus maupun repositori jurnal digital (IEEE Xplore, ACM Digital Library, dan ScienceDirect) menggunakan akun surel institusi (@student.univ.ac.id).
        </p>
      </div>
    </div>
  );
};
