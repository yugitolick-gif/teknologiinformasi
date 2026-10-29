import React, { useState, useMemo } from 'react';
import { RPS_MEETINGS, MeetingItem } from '../data/rpsData.ts';
import {
  Search,
  Filter,
  CheckCircle,
  Circle,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Award,
  Layers,
  LayoutGrid,
  List,
} from 'lucide-react';

interface RpsMeetingGridProps {
  completedMeetings: number[];
  onToggleComplete: (meetingId: number) => void;
  onSelectMeeting: (meeting: MeetingItem) => void;
  onOpenLab: (labId: string) => void;
}

export const RpsMeetingGrid: React.FC<RpsMeetingGridProps> = ({
  completedMeetings,
  onToggleComplete,
  onSelectMeeting,
  onOpenLab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'pra-uts' | 'pasca-uts' | 'exam'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredMeetings = useMemo(() => {
    return RPS_MEETINGS.filter((item) => {
      // Phase filter
      if (phaseFilter === 'pra-uts' && item.minggu > 7) return false;
      if (phaseFilter === 'pasca-uts' && (item.minggu < 9 || item.minggu > 15)) return false;
      if (phaseFilter === 'exam' && !item.isExam) return false;

      // Category filter
      if (categoryFilter !== 'all' && item.kategori !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.bahanKajian.toLowerCase().includes(query);
        const matchObjective = item.kemampuanAkhir.toLowerCase().includes(query);
        const matchMethod = item.metodePembelajaran.toLowerCase().includes(query);
        const matchSubtopics = item.subTopik.some((st) => st.toLowerCase().includes(query));
        return matchTitle || matchObjective || matchMethod || matchSubtopics;
      }

      return true;
    });
  }, [phaseFilter, categoryFilter, searchQuery]);

  const categories = [
    'all',
    'Dasar & Konsep',
    'Arsitektur & Sistem',
    'Jaringan & Web',
    'Data & Storage',
    'Keamanan & Etika',
    'Tren Modern',
    'Evaluasi',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Control Bar: Filters, Search, View Mode */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi (contoh: biner, hardware, SQL, cloud, TCP/IP)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Reset
              </button>
            )}
          </div>

          {/* Phase Filter Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs">
            <button
              onClick={() => setPhaseFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                phaseFilter === 'all'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua (16 Minggu)
            </button>
            <button
              onClick={() => setPhaseFilter('pra-uts')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                phaseFilter === 'pra-uts'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pra-UTS (1-7)
            </button>
            <button
              onClick={() => setPhaseFilter('pasca-uts')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                phaseFilter === 'pasca-uts'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pasca-UTS (9-15)
            </button>
            <button
              onClick={() => setPhaseFilter('exam')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                phaseFilter === 'exam'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ujian (UTS & UAS)
            </button>
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Tampilan Grid Kartu"
              aria-label="Tampilan Grid Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Tampilan Tabel Silabus"
              aria-label="Tampilan Tabel Silabus"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none border-t border-slate-100 pt-3">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Kategori:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua Topik' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Quick Help */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Menampilkan <span className="font-bold text-slate-800">{filteredMeetings.length}</span> dari 16 Pertemuan
          {searchQuery && <span> untuk kata kunci "{searchQuery}"</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Checklist Belajar Tersimpan
          </span>
        </div>
      </div>

      {/* Render: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMeetings.map((item) => {
            const isCompleted = completedMeetings.includes(item.id);

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between bg-white border rounded-2xl transition-all duration-200 hover:shadow-md ${
                  item.isExam
                    ? 'border-indigo-300 ring-1 ring-indigo-100 bg-linear-to-b from-indigo-50/40 to-white'
                    : isCompleted
                    ? 'border-emerald-200 ring-1 ring-emerald-50'
                    : 'border-slate-200'
                }`}
              >
                {/* Card Header */}
                <div className="p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        M{item.minggu}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {item.kategori}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleComplete(item.id)}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                        isCompleted
                          ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                          : 'text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100'
                      }`}
                      title={isCompleted ? 'Tandai belum selesai' : 'Tandai sudah dipelajari'}
                      aria-label={`Tandai Pertemuan ${item.minggu} selesai`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-semibold text-[11px]">Selesai</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Tandai</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Meeting Topic Title */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                        onClick={() => onSelectMeeting(item)}>
                      {item.bahanKajian}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.kemampuanAkhir}
                    </p>
                  </div>

                  {/* Subtopics snippet */}
                  <div className="space-y-1 pt-1">
                    {item.subTopik.slice(0, 2).map((st, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-500 line-clamp-1">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span>{st}</span>
                      </div>
                    ))}
                    {item.subTopik.length > 2 && (
                      <span className="text-[10px] text-slate-400">
                        +{item.subTopik.length - 2} sub-materi lainnya
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{item.metodePembelajaran}</span>
                    <span className="font-mono text-slate-600 font-semibold">Bobot: {item.bobotIndikatif}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.labId && (
                      <button
                        onClick={() => onOpenLab(item.labId!)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors border border-indigo-100"
                        title="Buka simulasi laboratorium interaktif untuk pertemuan ini"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Lab Interaktif</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectMeeting(item)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold transition-colors border border-slate-200 shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Detail & Kuis</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Render: Table Mode */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-16">Mg</th>
                  <th className="py-3 px-4">Kemampuan Akhir (Sub-CPMK)</th>
                  <th className="py-3 px-4">Bahan Kajian / Topik</th>
                  <th className="py-3 px-4">Metode Pembelajaran</th>
                  <th className="py-3 px-4 text-center w-20">Bobot</th>
                  <th className="py-3 px-4 text-center w-24">Status</th>
                  <th className="py-3 px-4 text-right w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMeetings.map((item) => {
                  const isCompleted = completedMeetings.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.isExam ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        #{item.minggu}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs">
                        {item.kemampuanAkhir}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{item.bahanKajian}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.kategori}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{item.metodePembelajaran}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-800">
                        {item.bobotIndikatif}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onToggleComplete(item.id)}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 font-semibold'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {isCompleted ? 'Selesai' : 'Belum'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectMeeting(item)}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty Search State */}
      {filteredMeetings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">Tidak ada pertemuan yang cocok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau reset filter kategori di atas.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setPhaseFilter('all');
              setCategoryFilter('all');
            }}
            className="px-4 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 underline"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </section>
  );
};
