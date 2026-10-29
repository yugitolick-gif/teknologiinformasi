import React, { useState, useEffect } from 'react';
import { BookOpen, Calculator, FlaskConical, Users, Library, Printer, Cloud, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { auth, loginWithGoogle, logoutUser, subscribeToAuthState } from '../lib/firebase.ts';
import { User } from 'firebase/auth';

export type ActiveTab = 'rps' | 'simulator' | 'labs' | 'kelas' | 'referensi';

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenPrintModal: () => void;
  completedCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  onOpenPrintModal,
  completedCount,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (currentUser) {
      await logoutUser();
    } else {
      try {
        setIsLoggingIn(true);
        await loginWithGoogle();
      } catch (err) {
        console.error('Login failed', err);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onTabChange('rps')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg shrink-0"
            aria-label="Kembali ke halaman utama RPS"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-200">
              TI
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
                PTI · RPS TI001
              </span>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                3 SKS · Kelas A
              </span>
            </div>
          </button>

          {/* Zone 2: 5 single-line navigation tabs */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-xl"
          >
            <button
              onClick={() => onTabChange('rps')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'rps'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>RPS 16 Pertemuan</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-full font-mono">
                {completedCount}/16
              </span>
            </button>

            <button
              onClick={() => onTabChange('simulator')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'simulator'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulasi Nilai</span>
            </button>

            <button
              onClick={() => onTabChange('labs')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'labs'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Lab Interaktif</span>
            </button>

            <button
              onClick={() => onTabChange('kelas')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'kelas'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Kelas A (Mahasiswa)</span>
            </button>

            <button
              onClick={() => onTabChange('referensi')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'referensi'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              <span>Pustaka & Referensi</span>
            </button>
          </nav>

          {/* Zone 3: Firestore status, Auth & Cetak Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Firestore Cloud Status */}
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full"
              title="Terhubung ke Database Google Cloud Firestore"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Cloud className="w-3.5 h-3.5" />
              <span>Firestore Aktif</span>
            </div>

            {/* Google Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 pl-2 pr-1 py-1 rounded-lg text-xs">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="font-semibold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleAuthAction}
                  className="p-1 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Keluar (Logout)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuthAction}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                title="Masuk dengan akun Google untuk sinkronisasi cloud"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-500" />
                <span>{isLoggingIn ? 'Memproses...' : 'Login Google'}</span>
              </button>
            )}

            <button
              onClick={onOpenPrintModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-98 transition-all rounded-lg shadow-xs whitespace-nowrap shrink-0"
              title="Lihat dokumen RPS resmi untuk dicetak atau disimpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Dokumen RPS</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange('rps')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'rps' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            RPS ({completedCount}/16)
          </button>
          <button
            onClick={() => onTabChange('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Simulasi Nilai
          </button>
          <button
            onClick={() => onTabChange('labs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'labs' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Lab Interaktif
          </button>
          <button
            onClick={() => onTabChange('kelas')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'kelas' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Kelas A
          </button>
          <button
            onClick={() => onTabChange('referensi')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'referensi' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Referensi
          </button>
        </div>
      </div>
    </header>
  );
};
