import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_STUDENTS, Student } from '../data/rpsData.ts';
import { calculateFinalScore, getLetterGrade } from '../utils/gradeCalculator.ts';
import {
  seedInitialStudentsIfEmpty,
  subscribeToStudents,
  saveStudentToFirestore,
  testConnection,
} from '../lib/firebase.ts';
import {
  Users,
  CheckCircle2,
  XCircle,
  Award,
  Search,
  Filter,
  TrendingUp,
  UserCheck,
  Edit2,
  Check,
  UserPlus,
  X,
  Download,
  AlertTriangle,
  ShieldAlert,
  Cloud,
  RefreshCw,
  LayoutGrid,
  List,
} from 'lucide-react';

export const ClassRosterView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('pti_kelas_a_students');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState<number>(0);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [filterThreshold, setFilterThreshold] = useState<'all' | 'above50' | 'below50' | 'full'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Form state for adding new student
  const [newNim, setNewNim] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');


  // 1. Initial seed and Firestore setup
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    async function initFirestore() {
      try {
        const connected = await testConnection();
        setIsFirestoreConnected(connected);

        // Seed initial 8 students if Firestore collection is empty
        await seedInitialStudentsIfEmpty(INITIAL_STUDENTS);

        // Subscribe to real-time changes
        unsubscribe = subscribeToStudents(
          (liveStudents) => {
            if (liveStudents && liveStudents.length > 0) {
              setStudents(liveStudents);
              try {
                localStorage.setItem('pti_kelas_a_students', JSON.stringify(liveStudents));
              } catch {
                // ignore
              }
            }
          },
          (err) => {
            console.warn('Firestore subscription fallback to local storage:', err);
          }
        );
      } catch (err) {
        console.warn('Firestore init note:', err);
      }
    }

    initFirestore();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const saveStudents = (newStudentList: Student[], modifiedStudent?: Student) => {
    setStudents(newStudentList);
    try {
      localStorage.setItem('pti_kelas_a_students', JSON.stringify(newStudentList));
    } catch {
      // ignore
    }

    // Persist to Cloud Firestore
    if (modifiedStudent) {
      saveStudentToFirestore(modifiedStudent).catch((err) => {
        console.warn('Could not sync student to Firestore:', err);
      });
    }
  };

  // Toggle single attendance checkbox
  const handleToggleAttendance = (studentId: string, meetingIdx: number) => {
    let targetStudent: Student | undefined;
    const updated = students.map((s) => {
      if (s.id !== studentId) return s;
      const newAtt = [...s.attendance];
      newAtt[meetingIdx] = !newAtt[meetingIdx];
      targetStudent = { ...s, attendance: newAtt };
      return targetStudent;
    });
    saveStudents(updated, targetStudent);
  };

  // Mark all students present for selected meeting
  const handleMarkAllPresent = (meetingIdx: number) => {
    const updated = students.map((s) => {
      const newAtt = [...s.attendance];
      newAtt[meetingIdx] = true;
      const st = { ...s, attendance: newAtt };
      saveStudentToFirestore(st).catch((e) => console.warn(e));
      return st;
    });
    saveStudents(updated);
  };

  const handleUpdateGrade = (studentId: string, field: 'tugas' | 'keaktifan' | 'uts' | 'uas', val: number) => {
    let targetStudent: Student | undefined;
    const updated = students.map((s) => {
      if (s.id !== studentId) return s;
      targetStudent = { ...s, [field]: Math.max(0, Math.min(100, val)) };
      return targetStudent;
    });
    saveStudents(updated, targetStudent);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      for (const st of students) {
        await saveStudentToFirestore(st);
      }
      setIsFirestoreConnected(true);
    } catch (err) {
      console.warn('Sync error:', err);
    } finally {
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNim.trim() || !newName.trim()) return;

    const newStudent: Student = {
      id: `mhs-${newNim.trim()}`,
      nim: newNim.trim(),
      name: newName.trim().toUpperCase(),
      email: newEmail.trim() || `${newNim.trim()}@student.univ.ac.id`,
      attendance: Array(16).fill(true),
      tugas: 85,
      keaktifan: 85,
      uts: 80,
      uas: 85,
      catatanDosen: 'Mahasiswa terdaftar aktif.',
    };

    saveStudents([...students, newStudent], newStudent);
    setNewNim('');
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };


  const handleExportCsv = () => {
    const headers = ['No', 'NIM', 'Nama Mahasiswa', 'Hadir (16 M)', 'Persen Presensi', 'Syarat 50%', 'Tugas', 'Keaktifan', 'UTS', 'UAS', 'Nilai Akhir', 'Grade'];
    const rows = students.map((s, idx) => {
      const attended = s.attendance.filter(Boolean).length;
      const rate = Math.round((attended / 16) * 100);
      const isEligible50 = rate >= 50 ? 'Lolos (≥50%)' : 'Tidak Lolos (<50%)';
      const finalGrade = calculateFinalScore({ tugas: s.tugas, keaktifan: s.keaktifan, uts: s.uts, uas: s.uas });
      const letter = getLetterGrade(finalGrade).letter;
      return [
        idx + 1,
        `"${s.nim}"`,
        `"${s.name}"`,
        `${attended}/16`,
        `${rate}%`,
        isEligible50,
        s.tugas,
        s.keaktifan,
        s.uts,
        s.uas,
        finalGrade.toFixed(1),
        letter,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_presensi_nilai_kelas_A_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const attendedCount = s.attendance.filter(Boolean).length;
      const rate = Math.round((attendedCount / 16) * 100);

      if (filterThreshold === 'above50' && rate < 50) return false;
      if (filterThreshold === 'below50' && rate >= 50) return false;
      if (filterThreshold === 'full' && attendedCount < 15) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.nim.includes(q);
    });
  }, [students, searchQuery, filterThreshold]);

  // Aggregate Class Stats
  const classStats = useMemo(() => {
    const totalStudents = students.length || 1;
    let sumAttendancePercent = 0;
    let sumFinalScore = 0;
    let countAbove50 = 0;
    let fullAttendanceCount = 0;

    students.forEach((s) => {
      const attended = s.attendance.filter(Boolean).length;
      const rate = (attended / 16) * 100;
      sumAttendancePercent += rate;
      if (rate >= 50) countAbove50++;
      if (attended >= 15) fullAttendanceCount++;

      const finalGrade = calculateFinalScore({
        tugas: s.tugas,
        keaktifan: s.keaktifan,
        uts: s.uts,
        uas: s.uas,
      });
      sumFinalScore += finalGrade;
    });

    return {
      avgAttendance: Math.round(sumAttendancePercent / totalStudents),
      avgFinalScore: (sumFinalScore / totalStudents).toFixed(1),
      countAbove50,
      fullAttendanceCount,
      totalStudents: students.length,
    };
  }, [students]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold mb-1">
            <Users className="w-4 h-4" />
            <span>Manajemen Presensi & Evaluasi Akademik</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Daftar Mahasiswa Kelas A ({students.length} Mahasiswa)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Jadwal: Kamis, 10:00 - 11:30 WIB · Ruang Kuliah: K1.8 · Program Studi: Teknologi Informasi / Ilmu Komputer.
          </p>
        </div>

        {/* Aggregate Stats Badges with 50% Threshold Insight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
            <div className="text-[11px] text-slate-500 font-medium">Total Mahasiswa</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {classStats.totalStudents} Mhs
            </div>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-center">
            <div className="text-[11px] text-emerald-800 font-medium">Lolos Presensi ≥50%</div>
            <div className="text-xl font-bold text-emerald-700 font-mono mt-0.5">
              {classStats.countAbove50} / {classStats.totalStudents}
            </div>
          </div>
          <div className="p-3 bg-indigo-50/70 border border-indigo-200/70 rounded-xl text-center">
            <div className="text-[11px] text-indigo-800 font-medium">Rata-rata Kelas</div>
            <div className="text-xl font-bold text-indigo-700 font-mono mt-0.5">
              {classStats.avgFinalScore}
            </div>
          </div>
        </div>
      </div>


      {/* 50% Attendance Policy Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
            50%
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-amber-950">
              Ketentuan Ambang Batas Presensi Minimal 50%
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              Mahasiswa wajib memiliki persentase kehadiran minimal <strong>50% (minimal 8 dari 16 pertemuan)</strong> agar dinyatakan memenuhi syarat mengikuti Ujian Akhir Semester (UAS) dan memperoleh kelulusan mata kuliah TI001.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFilterThreshold('above50')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterThreshold === 'above50'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
            }`}
          >
            Filter Lolos ≥ 50%
          </button>
          <button
            onClick={() => setFilterThreshold('all')}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Quick Attendance Selector for Active Meeting */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              Presensi Cepat Pertemuan Mingguan:
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleMarkAllPresent(selectedMeetingIndex)}
              className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 min-h-[38px]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tandai Semua Hadir di M{selectedMeetingIndex + 1}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 min-h-[38px]"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Tambah Mahasiswa</span>
            </button>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 min-h-[38px]"
              title="Sinkronkan data kelas ke Cloud Firestore"
            >
              <Cloud className={`w-3.5 h-3.5 text-emerald-600 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : isFirestoreConnected ? 'Firestore Tersinkron' : 'Sinkronkan Cloud'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 min-h-[38px]"
              title="Unduh rekapitulasi data nilai & presensi sebagai CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Meeting Buttons 1 to 16 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs touch-pan-x">
          {Array.from({ length: 16 }).map((_, idx) => {
            const meetingNum = idx + 1;
            const isSelected = selectedMeetingIndex === idx;
            const isExam = meetingNum === 8 || meetingNum === 16;

            return (
              <button
                key={idx}
                onClick={() => setSelectedMeetingIndex(idx)}
                className={`min-w-[48px] min-h-[48px] px-3 py-2 rounded-xl font-semibold transition-all shrink-0 font-mono flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isExam
                    ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold leading-none">M{meetingNum}</div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {meetingNum === 8 ? 'UTS' : meetingNum === 16 ? 'UAS' : `W${meetingNum}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student List Container (Cards & Table) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Filter and View Mode Switch Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau NIM mahasiswa..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[38px]"
              />
            </div>

            {/* Threshold Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto shrink-0">
              <button
                onClick={() => setFilterThreshold('all')}
                className={`px-2.5 py-1.5 rounded font-medium min-h-[32px] whitespace-nowrap ${filterThreshold === 'all' ? 'bg-white shadow-2xs font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterThreshold('above50')}
                className={`px-2.5 py-1.5 rounded font-medium min-h-[32px] whitespace-nowrap ${filterThreshold === 'above50' ? 'bg-white shadow-2xs font-bold text-indigo-700' : 'text-slate-600'}`}
              >
                ≥ 50%
              </button>
              <button
                onClick={() => setFilterThreshold('below50')}
                className={`px-2.5 py-1.5 rounded font-medium min-h-[32px] whitespace-nowrap ${filterThreshold === 'below50' ? 'bg-white shadow-2xs font-bold text-rose-700' : 'text-slate-600'}`}
              >
                &lt; 50%
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all min-h-[32px] ${
                  viewMode === 'cards'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Kartu Ramah Sentuh (Sangat Cocok untuk Smartphone & Tablet)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Kartu Mahasiswa</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all min-h-[32px] ${
                  viewMode === 'table'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Tabel Spreadsheet Lengkap (Cocok untuk Laptop / PC)"
              >
                <List className="w-3.5 h-3.5" />
                <span>Tabel Lengkap</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {filteredStudents.length} Mahasiswa
            </span>
          </div>
        </div>

        {/* View Mode 1: Mobile-Friendly Touch Cards */}
        {viewMode === 'cards' && (
          <div className="p-4 sm:p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
              {filteredStudents.map((student, idx) => {
                const attendedCount = student.attendance.filter(Boolean).length;
                const attendanceRate = Math.round((attendedCount / 16) * 100);
                const isEligible50 = attendanceRate >= 50;
                const isPresentCurrent = student.attendance[selectedMeetingIndex];
                const isEditing = editingStudentId === student.id;

                const finalGrade = calculateFinalScore({
                  tugas: student.tugas,
                  keaktifan: student.keaktifan,
                  uts: student.uts,
                  uas: student.uas,
                });
                const letterGrade = getLetterGrade(finalGrade);

                return (
                  <div
                    key={student.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
                  >
                    {/* Top Row: Name, NIM & Edit Toggle */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-xs font-bold text-slate-800">
                            {student.nim}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {student.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {student.email}
                        </div>
                      </div>

                      {/* Edit Button */}
                      <button
                        onClick={() => setEditingStudentId(isEditing ? null : student.id)}
                        className={`p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                          isEditing
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={isEditing ? 'Selesai edit nilai' : 'Edit nilai komponen'}
                      >
                        {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Quick Attendance Button for Current Meeting */}
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">
                          Presensi M#{selectedMeetingIndex + 1}:
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            isEligible50
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isEligible50 ? 'Lolos Syarat ≥50%' : 'Di Bawah 50%'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleAttendance(student.id, selectedMeetingIndex)}
                        className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 ${
                          isPresentCurrent
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {isPresentCurrent ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-white" />
                            <span>Hadir pada Pertemuan {selectedMeetingIndex + 1}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Absen / Belum Hadir (M{selectedMeetingIndex + 1})</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Total Kehadiran:</span>
                        <span className="font-mono font-bold text-slate-800">
                          {attendedCount}/16 Pertemuan ({attendanceRate}%)
                        </span>
                      </div>
                    </div>

                    {/* Grade Components Grid */}
                    <div className="space-y-2 pt-1 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-between">
                        <span>Komponen Nilai:</span>
                        {isEditing && (
                          <span className="text-emerald-700 font-bold">Mode Edit Aktif</span>
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70">
                          <div className="text-[10px] text-slate-500 font-medium">Tugas (20%)</div>
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.tugas}
                              onChange={(e) => handleUpdateGrade(student.id, 'tugas', Number(e.target.value))}
                              className="w-full text-center border border-indigo-400 bg-white rounded px-1 py-1 font-mono font-bold text-xs mt-1"
                            />
                          ) : (
                            <div className="font-mono font-bold text-slate-900 mt-0.5">
                              {student.tugas}
                            </div>
                          )}
                        </div>

                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70">
                          <div className="text-[10px] text-slate-500 font-medium">Aktif (15%)</div>
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.keaktifan}
                              onChange={(e) => handleUpdateGrade(student.id, 'keaktifan', Number(e.target.value))}
                              className="w-full text-center border border-indigo-400 bg-white rounded px-1 py-1 font-mono font-bold text-xs mt-1"
                            />
                          ) : (
                            <div className="font-mono font-bold text-slate-900 mt-0.5">
                              {student.keaktifan}
                            </div>
                          )}
                        </div>

                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70">
                          <div className="text-[10px] text-slate-500 font-medium">UTS (30%)</div>
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.uts}
                              onChange={(e) => handleUpdateGrade(student.id, 'uts', Number(e.target.value))}
                              className="w-full text-center border border-indigo-400 bg-white rounded px-1 py-1 font-mono font-bold text-xs mt-1"
                            />
                          ) : (
                            <div className="font-mono font-bold text-indigo-700 mt-0.5">
                              {student.uts}
                            </div>
                          )}
                        </div>

                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70">
                          <div className="text-[10px] text-slate-500 font-medium">UAS (35%)</div>
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.uas}
                              onChange={(e) => handleUpdateGrade(student.id, 'uas', Number(e.target.value))}
                              className="w-full text-center border border-indigo-400 bg-white rounded px-1 py-1 font-mono font-bold text-xs mt-1"
                            />
                          ) : (
                            <div className="font-mono font-bold text-indigo-700 mt-0.5">
                              {student.uas}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Final Grade Card Banner */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                          Nilai Akhir & Predikat:
                        </span>
                        <span className="font-mono font-extrabold text-base text-slate-900">
                          {finalGrade.toFixed(1)}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${letterGrade.colorClass}`}
                      >
                        Grade {letterGrade.letter} ({letterGrade.predicate})
                      </span>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode 2: Responsive Spreadsheet Table */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs min-w-[900px]">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">NIM</th>
                  <th className="py-3 px-4">Nama Mahasiswa</th>
                  <th className="py-3 px-4 text-center">
                    Presensi M#{selectedMeetingIndex + 1}
                  </th>
                  <th className="py-3 px-4 text-center">Kehadiran (16 M)</th>
                  <th className="py-3 px-4 text-center">Syarat 50%</th>
                  <th className="py-3 px-4 text-center">Tugas (20%)</th>
                  <th className="py-3 px-4 text-center">Keaktifan (15%)</th>
                  <th className="py-3 px-4 text-center">UTS (30%)</th>
                  <th className="py-3 px-4 text-center">UAS (35%)</th>
                  <th className="py-3 px-4 text-center">Nilai Akhir</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student, idx) => {
                  const attendedCount = student.attendance.filter(Boolean).length;
                  const attendanceRate = Math.round((attendedCount / 16) * 100);
                  const isEligible50 = attendanceRate >= 50;
                  const isPresentCurrent = student.attendance[selectedMeetingIndex];

                  const finalGrade = calculateFinalScore({
                    tugas: student.tugas,
                    keaktifan: student.keaktifan,
                    uts: student.uts,
                    uas: student.uas,
                  });
                  const letterGrade = getLetterGrade(finalGrade);
                  const isEditing = editingStudentId === student.id;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* No */}
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                        {idx + 1}
                      </td>

                      {/* NIM */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {student.nim}
                      </td>

                      {/* Student Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {student.email}
                        </div>
                        {student.catatanDosen && (
                          <div className="text-[10px] text-slate-500 italic mt-0.5">
                            "{student.catatanDosen}"
                          </div>
                        )}
                      </td>

                      {/* Presensi Meeting Switch */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleAttendance(student.id, selectedMeetingIndex)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all min-h-[32px] ${
                            isPresentCurrent
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          }`}
                          title="Klik untuk mengubah status presensi pertemuan ini"
                        >
                          {isPresentCurrent ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Hadir</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Absen</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Total Attendance */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="font-bold text-slate-900">{attendedCount}/16</span>
                        <div className="text-[10px] text-slate-500">({attendanceRate}%)</div>
                      </td>

                      {/* Syarat 50% Presensi Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isEligible50
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isEligible50 ? 'Memenuhi (≥50%)' : 'Kurang (<50%)'}
                        </span>
                      </td>

                      {/* Tugas (20%) */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={student.tugas}
                            onChange={(e) => handleUpdateGrade(student.id, 'tugas', Number(e.target.value))}
                            className="w-14 text-center border border-slate-300 rounded px-1 py-0.5 text-xs font-mono"
                          />
                        ) : (
                          student.tugas
                        )}
                      </td>

                      {/* Keaktifan (15%) */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={student.keaktifan}
                            onChange={(e) => handleUpdateGrade(student.id, 'keaktifan', Number(e.target.value))}
                            className="w-14 text-center border border-slate-300 rounded px-1 py-0.5 text-xs font-mono"
                          />
                        ) : (
                          student.keaktifan
                        )}
                      </td>

                      {/* UTS (30%) */}
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-800">
                        {isEditing ? (
                          <input
                            type="number"
                            value={student.uts}
                            onChange={(e) => handleUpdateGrade(student.id, 'uts', Number(e.target.value))}
                            className="w-14 text-center border border-slate-300 rounded px-1 py-0.5 text-xs font-mono"
                          />
                        ) : (
                          student.uts
                        )}
                      </td>

                      {/* UAS (35%) */}
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-800">
                        {isEditing ? (
                          <input
                            type="number"
                            value={student.uas}
                            onChange={(e) => handleUpdateGrade(student.id, 'uas', Number(e.target.value))}
                            className="w-14 text-center border border-slate-300 rounded px-1 py-0.5 text-xs font-mono"
                          />
                        ) : (
                          student.uas
                        )}
                      </td>

                      {/* Final Grade */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 text-sm">
                        {finalGrade.toFixed(1)}
                      </td>

                      {/* Grade Letter */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${letterGrade.colorClass}`}
                        >
                          {letterGrade.letter}
                        </span>
                      </td>

                      {/* Action edit */}
                      <td className="py-3.5 px-4 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => setEditingStudentId(null)}
                            className="p-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors min-h-[32px] min-w-[32px]"
                            title="Simpan perubahan nilai"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingStudentId(student.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors min-h-[32px] min-w-[32px]"
                            title="Edit nilai mahasiswa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Student Modal */}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                Tambah Mahasiswa Baru Kelas A
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor Induk Mahasiswa (NIM):
                </label>
                <input
                  type="text"
                  required
                  value={newNim}
                  onChange={(e) => setNewNim(e.target.value)}
                  placeholder="Contoh: 265920015"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Lengkap Mahasiswa:
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: NAMA MAHASISWA"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg uppercase focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Email Institusi (Opsional):
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nama@student.univ.ac.id"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
                >
                  Simpan Mahasiswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
