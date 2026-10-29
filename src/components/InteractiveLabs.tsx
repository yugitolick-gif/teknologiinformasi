import React, { useState, useEffect } from 'react';
import {
  Binary,
  Database,
  Network,
  ShieldCheck,
  Cloud,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface InteractiveLabsProps {
  initialLabId?: string;
}

export const InteractiveLabs: React.FC<InteractiveLabsProps> = ({ initialLabId }) => {
  const [activeLab, setActiveLab] = useState<
    'binary-converter' | 'sql-sandbox' | 'network-topology' | 'security-crypto' | 'cloud-explorer'
  >((initialLabId as any) || 'binary-converter');

  useEffect(() => {
    if (initialLabId) {
      setActiveLab(initialLabId as any);
    }
  }, [initialLabId]);

  // LAB 1: Binary Converter State
  const [bits, setBits] = useState<number[]>([0, 0, 1, 0, 1, 0, 1, 0]); // Default 42 (00101010)

  const decimalValue = bits.reduce((acc, bit, idx) => {
    const power = 7 - idx;
    return acc + bit * Math.pow(2, power);
  }, 0);

  const hexValue = decimalValue.toString(16).toUpperCase().padStart(2, '0');
  const asciiChar = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : 'Non-printable';

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  };

  const handleDecimalInput = (val: number) => {
    const clamped = Math.max(0, Math.min(255, val || 0));
    const binStr = clamped.toString(2).padStart(8, '0');
    setBits(binStr.split('').map(Number));
  };

  // LAB 2: Mini SQL Sandbox State
  const sampleStudentsDb = [
    { id: 1, nim: '265920002', nama: 'KHAYATUN NURUL JANAH', prodi: 'Teknologi Informasi', nilai_uts: 90, status: 'Aktif' },
    { id: 2, nim: '265920004', nama: 'MUHAMAD HILMAN RASYID', prodi: 'Ilmu Komputer', nilai_uts: 86, status: 'Aktif' },
    { id: 3, nim: '265920005', nama: 'MUHAMMAD WAHID ISMAIL', prodi: 'Teknologi Informasi', nilai_uts: 84, status: 'Aktif' },
    { id: 4, nim: '265920007', nama: 'TIYO FARIDHO', prodi: 'Ilmu Komputer', nilai_uts: 80, status: 'Aktif' },
    { id: 5, nim: '265920008', nama: 'KHOLIS', prodi: 'Teknologi Informasi', nilai_uts: 82, status: 'Aktif' },
    { id: 6, nim: '265920009', nama: 'MUHAMMAD AMNUTTAQYUDIN', prodi: 'Teknologi Informasi', nilai_uts: 85, status: 'Aktif' },
    { id: 7, nim: '265920010', nama: 'MUHAMMAD ZUHRUL ANAM', prodi: 'Ilmu Komputer', nilai_uts: 88, status: 'Aktif' },
    { id: 8, nim: '265920014', nama: 'LUXIANO JOVA NOVA', prodi: 'Ilmu Komputer', nilai_uts: 85, status: 'Aktif' },
  ];

  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM mahasiswa WHERE nilai_uts >= 80');
  const [sqlResult, setSqlResult] = useState<any[]>(
    sampleStudentsDb.filter((s) => s.nilai_uts >= 80)
  );
  const [sqlError, setSqlError] = useState<string | null>(null);

  const executeSql = (queryToRun: string) => {
    setSqlError(null);
    const clean = queryToRun.trim().toLowerCase();

    if (!clean.startsWith('select')) {
      setSqlError('Hanya query SELECT yang diizinkan pada simulasi latihan ini.');
      return;
    }

    if (!clean.includes('from mahasiswa')) {
      setSqlError('Tabel yang tersedia pada skema demo saat ini adalah: `mahasiswa`.');
      return;
    }

    try {
      let data = [...sampleStudentsDb];

      // Handle simple WHERE filters
      if (clean.includes('where')) {
        if (clean.includes('nilai_uts >=')) {
          const match = clean.match(/nilai_uts\s*>=\s*(\d+)/);
          if (match) {
            const threshold = parseInt(match[1], 10);
            data = data.filter((s) => s.nilai_uts >= threshold);
          }
        } else if (clean.includes("prodi = 'ilmu komputer'") || clean.includes('prodi="ilmu komputer"')) {
          data = data.filter((s) => s.prodi.toLowerCase() === 'ilmu komputer');
        } else if (clean.includes("prodi = 'teknologi informasi'")) {
          data = data.filter((s) => s.prodi.toLowerCase() === 'teknologi informasi');
        } else if (clean.includes("status = 'aktif'")) {
          data = data.filter((s) => s.status === 'Aktif');
        }
      }

      // Handle ORDER BY
      if (clean.includes('order by')) {
        if (clean.includes('nilai_uts desc')) {
          data.sort((a, b) => b.nilai_uts - a.nilai_uts);
        } else if (clean.includes('nama asc')) {
          data.sort((a, b) => a.nama.localeCompare(b.nama));
        }
      }

      setSqlResult(data);
    } catch (err: any) {
      setSqlError('Sintaks SQL tidak valid atau belum didukung di simulasi mini ini.');
    }
  };

  // LAB 3: Network Topology State
  const [topologyType, setTopologyType] = useState<'star' | 'bus' | 'ring' | 'mesh'>('star');
  const [brokenNodeId, setBrokenNodeId] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingMessage, setPingMessage] = useState<string | null>(null);

  const handlePingTest = () => {
    setIsPinging(true);
    setPingMessage('Mengirim paket ICMP echo request dari Node A ke Node C...');

    setTimeout(() => {
      setIsPinging(false);
      if (topologyType === 'star' && brokenNodeId === 0) {
        setPingMessage('PING FAILED: Switch pusat terputus! Seluruh komunikasi jaringan lumpuh.');
      } else if (topologyType === 'star' && (brokenNodeId === 1 || brokenNodeId === 3)) {
        setPingMessage('PING FAILED: Node tujuan atau pengirim sedang offline.');
      } else if (topologyType === 'bus' && brokenNodeId !== null) {
        setPingMessage('PING FAILED: Kabel tulang punggung (backbone) terputus, sinyal memantul tanpa terminator.');
      } else if (topologyType === 'ring' && brokenNodeId !== null) {
        setPingMessage('PING FAILED: Loop cincin terbuka akibat simpul putus tanpa konfigurasi dual-ring.');
      } else {
        setPingMessage('PING SUCCESS: Paket data terkirim & balasan diterima (0% packet loss, RTT = 4ms)!');
      }
    }, 1200);
  };

  // LAB 4: Cryptography & Hashing State
  const [plainText, setPlainText] = useState('PTI KELAS A');
  const [caesarShift, setCaesarShift] = useState(3);
  const [hashInput, setHashInput] = useState('PasswordMahasiswa123');

  const caesarCipher = (str: string, shift: number) => {
    return str
      .toUpperCase()
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join('');
  };

  // Simple pseudo SHA-256 visual mock with authentic avalanche representation
  const pseudoSha256 = (input: string) => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    const hex1 = ('00000000' + (hash >>> 0).toString(16)).slice(-8);
    const hex2 = ('00000000' + (Math.imul(hash, 31) >>> 0).toString(16)).slice(-8);
    const hex3 = ('00000000' + (Math.imul(hash, 97) >>> 0).toString(16)).slice(-8);
    const hex4 = ('00000000' + (Math.imul(hash, 199) >>> 0).toString(16)).slice(-8);
    const hex5 = ('00000000' + (Math.imul(hash, 311) >>> 0).toString(16)).slice(-8);
    const hex6 = ('00000000' + (Math.imul(hash, 541) >>> 0).toString(16)).slice(-8);
    const hex7 = ('00000000' + (Math.imul(hash, 709) >>> 0).toString(16)).slice(-8);
    const hex8 = ('00000000' + (Math.imul(hash, 997) >>> 0).toString(16)).slice(-8);
    return (hex1 + hex2 + hex3 + hex4 + hex5 + hex6 + hex7 + hex8).toLowerCase();
  };

  // LAB 5: Cloud Stack State
  const [cloudModel, setCloudModel] = useState<'onprem' | 'iaas' | 'paas' | 'saas'>('iaas');

  const cloudLayers = [
    { id: 'app', name: 'Applications (Aplikasi)', desc: 'Kode sistem, antarmuka web, logic software' },
    { id: 'data', name: 'Data & Databases', desc: 'Isi basis data, tabel, state pengguna' },
    { id: 'runtime', name: 'Runtime Environment', desc: 'Node.js, Python, Java JRE, .NET' },
    { id: 'middleware', name: 'Middleware & Messaging', desc: 'Message queues, API gateway, cache Redis' },
    { id: 'os', name: 'Operating System (OS)', desc: 'Linux Ubuntu, Windows Server, kernel patch' },
    { id: 'virt', name: 'Virtualization & Hypervisor', desc: 'VMware ESXi, KVM, container runtime' },
    { id: 'server', name: 'Physical Servers', desc: 'CPU, RAM, Motherboard rack datacenter' },
    { id: 'storage', name: 'Storage Hardware', desc: 'SAN, NAS, NVMe storage array' },
    { id: 'net', name: 'Networking Hardware', desc: 'Router, core switch, firewall, pendingin' },
  ];

  const isLayerManagedByUser = (layerIdx: number, model: string) => {
    if (model === 'onprem') return true; // You manage all 9
    if (model === 'iaas') return layerIdx <= 4; // Apps, Data, Runtime, Middleware, OS
    if (model === 'paas') return layerIdx <= 1; // Apps, Data only
    if (model === 'saas') return false; // Cloud provider manages all 9
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Simulasi & Praktikum Interaktif RPS TI001</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Laboratorium Konsep Teknologi Informasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Eksperimen langsung dengan model sistem bilangan biner, database SQL, topologi jaringan komputer, kriptografi, dan arsitektur cloud.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs shrink-0">
          <button
            onClick={() => setActiveLab('binary-converter')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeLab === 'binary-converter'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Biner (M4)
          </button>
          <button
            onClick={() => setActiveLab('network-topology')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeLab === 'network-topology'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Jaringan (M5)
          </button>
          <button
            onClick={() => setActiveLab('sql-sandbox')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeLab === 'sql-sandbox'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. SQL DBMS (M7)
          </button>
          <button
            onClick={() => setActiveLab('security-crypto')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeLab === 'security-crypto'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Kripto (M9)
          </button>
          <button
            onClick={() => setActiveLab('cloud-explorer')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeLab === 'cloud-explorer'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5. Cloud (M11)
          </button>
        </div>
      </div>

      {/* LAB 1: BINARY CONVERTER (Pertemuan 4) */}
      {activeLab === 'binary-converter' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                Pertemuan #4: Representasi Data
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Kalkulator Register 8-Bit Interaktif (Byte Explorer)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik tombol bit individual di bawah untuk menyalakan (1) atau mematikan (0). Amati bagaimana nilai desimal dan heksadesimal terbentuk secara otomatis.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="dec-direct" className="text-xs font-semibold text-slate-600">
                Ketik Desimal (0-255):
              </label>
              <input
                id="dec-direct"
                type="number"
                min="0"
                max="255"
                value={decimalValue}
                onChange={(e) => handleDecimalInput(Number(e.target.value))}
                className="w-20 px-3 py-1.5 font-mono text-center font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 8-Bit Visual Array */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Register 8-Bit (Byte): Klik bit untuk toggle 0 / 1
            </div>

            <div className="grid grid-cols-8 gap-2 sm:gap-3">
              {bits.map((bit, idx) => {
                const bitPower = 7 - idx;
                const bitWeight = Math.pow(2, bitPower);
                const isActive = bit === 1;

                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={`p-3 sm:p-4 rounded-xl text-center border transition-all flex flex-col items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 ring-2 ring-indigo-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-80">
                      2^{bitPower} ({bitWeight})
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono">
                      {bit}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isActive ? 'ON' : 'OFF'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Value Readouts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Nilai Desimal (Basis 10)
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                {decimalValue}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                Rentang: 0 s.d. 255
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Representasi Biner (Basis 2)
              </span>
              <div className="text-2xl font-black text-indigo-700 font-mono mt-1 tracking-wider">
                0b{bits.join('')}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                8 Bit = 1 Byte
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Heksadesimal (Basis 16)
              </span>
              <div className="text-3xl font-black text-emerald-700 font-mono mt-1">
                0x{hexValue}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                2 Nibble (4-bit masing-masing)
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Karakter ASCII
              </span>
              <div className="text-3xl font-black text-amber-700 font-mono mt-1">
                {asciiChar === 'Non-printable' ? '—' : `'${asciiChar}'`}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {asciiChar}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: TOPOLOGI JARINGAN (Pertemuan 5) */}
      {activeLab === 'network-topology' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                Pertemuan #5: Jaringan Komputer & Topologi
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Visualizer Ketahanan Topologi Jaringan & Ping Test
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih bentuk topologi, uji pengiriman paket data (Ping), dan klik salah satu node untuk mensimulasikan kegagalan kabel/perangkat.
              </p>
            </div>

            {/* Topology Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs shrink-0">
              {(['star', 'bus', 'ring', 'mesh'] as const).map((top) => (
                <button
                  key={top}
                  onClick={() => {
                    setTopologyType(top);
                    setBrokenNodeId(null);
                    setPingMessage(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase transition-all ${
                    topologyType === top
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Topology Visual Diagram Canvas */}
          <div className="relative h-64 sm:h-72 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4">
            {/* SVG Cable Lines based on topology */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300">
              {topologyType === 'star' && (
                <>
                  <line x1="300" y1="150" x2="150" y2="70" stroke={brokenNodeId === 1 ? '#EF4444' : '#6366F1'} strokeWidth="3" strokeDasharray={brokenNodeId === 1 ? '4' : 'none'} />
                  <line x1="300" y1="150" x2="450" y2="70" stroke={brokenNodeId === 2 ? '#EF4444' : '#6366F1'} strokeWidth="3" strokeDasharray={brokenNodeId === 2 ? '4' : 'none'} />
                  <line x1="300" y1="150" x2="150" y2="230" stroke={brokenNodeId === 3 ? '#EF4444' : '#6366F1'} strokeWidth="3" strokeDasharray={brokenNodeId === 3 ? '4' : 'none'} />
                  <line x1="300" y1="150" x2="450" y2="230" stroke={brokenNodeId === 4 ? '#EF4444' : '#6366F1'} strokeWidth="3" strokeDasharray={brokenNodeId === 4 ? '4' : 'none'} />
                </>
              )}

              {topologyType === 'bus' && (
                <>
                  {/* Backbone cable */}
                  <line x1="80" y1="150" x2="520" y2="150" stroke={brokenNodeId !== null ? '#EF4444' : '#6366F1'} strokeWidth="4" />
                  <line x1="150" y1="150" x2="150" y2="80" stroke="#6366F1" strokeWidth="2" />
                  <line x1="250" y1="150" x2="250" y2="220" stroke="#6366F1" strokeWidth="2" />
                  <line x1="350" y1="150" x2="350" y2="80" stroke="#6366F1" strokeWidth="2" />
                  <line x1="450" y1="150" x2="450" y2="220" stroke="#6366F1" strokeWidth="2" />
                </>
              )}

              {topologyType === 'ring' && (
                <circle
                  cx="300"
                  cy="150"
                  r="90"
                  fill="none"
                  stroke={brokenNodeId !== null ? '#EF4444' : '#6366F1'}
                  strokeWidth="3"
                  strokeDasharray={brokenNodeId !== null ? '6' : 'none'}
                />
              )}

              {topologyType === 'mesh' && (
                <>
                  <line x1="200" y1="90" x2="400" y2="90" stroke="#6366F1" strokeWidth="2" />
                  <line x1="400" y1="90" x2="400" y2="210" stroke="#6366F1" strokeWidth="2" />
                  <line x1="400" y1="210" x2="200" y2="210" stroke="#6366F1" strokeWidth="2" />
                  <line x1="200" y1="210" x2="200" y2="90" stroke="#6366F1" strokeWidth="2" />
                  <line x1="200" y1="90" x2="400" y2="210" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.7" />
                  <line x1="400" y1="90" x2="200" y2="210" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.7" />
                </>
              )}
            </svg>

            {/* Nodes Interactive Elements */}
            <div className="relative z-10 w-full max-w-lg flex flex-wrap items-center justify-around gap-6 text-white text-xs">
              {topologyType === 'star' && (
                <button
                  onClick={() => setBrokenNodeId(brokenNodeId === 0 ? null : 0)}
                  className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                    brokenNodeId === 0
                      ? 'bg-rose-950 border-rose-500 text-rose-300'
                      : 'bg-indigo-900 border-indigo-400 text-white'
                  }`}
                  title="Klik untuk mensimulasikan kegagalan Switch Pusat"
                >
                  <Network className="w-5 h-5" />
                  <span>Central Switch</span>
                  <span className="text-[10px] font-mono">
                    {brokenNodeId === 0 ? 'STATUS: DOWN' : 'STATUS: UP'}
                  </span>
                </button>
              )}

              <div className="flex gap-4">
                {[1, 2, 3, 4].map((id) => (
                  <button
                    key={id}
                    onClick={() => setBrokenNodeId(brokenNodeId === id ? null : id)}
                    className={`px-3 py-2 rounded-lg border font-mono font-bold transition-all ${
                      brokenNodeId === id
                        ? 'bg-rose-900/90 border-rose-500 text-rose-200'
                        : 'bg-slate-800/90 border-slate-600 text-slate-100 hover:border-indigo-400'
                    }`}
                  >
                    Node {String.fromCharCode(64 + id)}
                    <div className="text-[9px] font-normal">
                      {brokenNodeId === id ? 'Offline' : 'Online'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ping Controller & Diagnostic Feedback */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900">
                Uji Konektivitas Antar Simpul (ICMP Ping)
              </div>
              <div className="text-xs text-slate-600">
                {pingMessage || 'Klik tombol "Kirim Ping" untuk mengecek apakah transmisi data berhasil.'}
              </div>
            </div>

            <button
              onClick={handlePingTest}
              disabled={isPinging}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPinging ? 'Mengirim Paket...' : 'Kirim Ping'}</span>
            </button>
          </div>
        </div>
      )}

      {/* LAB 3: MINI SQL DBMS (Pertemuan 7) */}
      {activeLab === 'sql-sandbox' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                Pertemuan #7: Pengantar Basis Data (DBMS)
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Studio Latihan Query SQL Relasional
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ketik atau pilih query SQL dasar di bawah untuk mengambil dan memfilter data dari tabel `mahasiswa`.
              </p>
            </div>

            {/* SQL Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1">Query Contoh:</span>
              <button
                onClick={() => {
                  const q = 'SELECT * FROM mahasiswa';
                  setSqlQuery(q);
                  executeSql(q);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono"
              >
                SELECT *
              </button>
              <button
                onClick={() => {
                  const q = 'SELECT * FROM mahasiswa WHERE nilai_uts >= 85';
                  setSqlQuery(q);
                  executeSql(q);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono"
              >
                WHERE UTS ≥ 85
              </button>
              <button
                onClick={() => {
                  const q = "SELECT * FROM mahasiswa WHERE prodi = 'Ilmu Komputer'";
                  setSqlQuery(q);
                  executeSql(q);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono"
              >
                WHERE Ilkom
              </button>
            </div>
          </div>

          {/* SQL Input Terminal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Editor Query SQL:</span>
              <button
                onClick={() => executeSql(sqlQuery)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold text-xs transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Jalankan Query (Execute)</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full p-3 font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error Message if any */}
          {sqlError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{sqlError}</span>
            </div>
          )}

          {/* Query Results Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Hasil Query: <strong className="text-slate-800">{sqlResult.length} baris data ditemukan</strong></span>
              <span>Skema: id (INT), nim (VARCHAR), nama (VARCHAR), prodi (VARCHAR), nilai_uts (INT), status (VARCHAR)</span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-mono font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">id</th>
                    <th className="py-2.5 px-4">nim</th>
                    <th className="py-2.5 px-4">nama</th>
                    <th className="py-2.5 px-4">prodi</th>
                    <th className="py-2.5 px-4 text-center">nilai_uts</th>
                    <th className="py-2.5 px-4 text-center">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {sqlResult.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-2 px-4 text-slate-400">{row.id}</td>
                      <td className="py-2 px-4 font-bold text-slate-900">{row.nim}</td>
                      <td className="py-2 px-4 font-sans text-slate-800">{row.nama}</td>
                      <td className="py-2 px-4 font-sans text-slate-600">{row.prodi}</td>
                      <td className="py-2 px-4 text-center font-bold text-indigo-700">{row.nilai_uts}</td>
                      <td className="py-2 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${row.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LAB 4: KRIPTOGRAFI & KEAMANAN (Pertemuan 9) */}
      {activeLab === 'security-crypto' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
              Pertemuan #9: Keamanan Informasi & Kriptografi
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Laboratorium Enkripsi Simetris (Caesar) & Fungsi Hash Satu Arah
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pahami perbedaan mendasar antara enkripsi (bisa didekripsi dengan pergeseran kunci) versus hashing kriptografi satu arah (one-way function).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Caesar Cipher */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  1. Caesar Cipher (Enkripsi Substitusi)
                </h4>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  Shift: +{caesarShift}
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Plaintext (Pesan Asli):</label>
                <input
                  type="text"
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  className="w-full mt-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono uppercase focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Geser Kunci (K):</span>
                  <span className="font-mono font-bold">{caesarShift} Karakter</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer mt-1"
                />
              </div>

              <div className="p-3 bg-white border border-indigo-200 rounded-xl space-y-1">
                <span className="text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">
                  Ciphertext (Teks Terenkripsi):
                </span>
                <div className="text-base font-black font-mono text-indigo-900 break-all">
                  {caesarCipher(plainText, caesarShift)}
                </div>
              </div>
            </div>

            {/* Right: Hashing & Avalanche Effect */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Binary className="w-4 h-4 text-emerald-600" />
                  2. Fungsi Hashing Kriptografis
                </h4>
                <span className="text-xs font-mono text-slate-500">
                  256-Bit Digest
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Input String (Coba ubah 1 huruf):</label>
                <input
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  className="w-full mt-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-white border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                  Hasil Hash (One-Way Hash Digest):
                </span>
                <div className="text-xs font-black font-mono text-emerald-900 break-all leading-relaxed">
                  {pseudoSha256(hashInput)}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-normal bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                <strong className="text-slate-700">Efek Longsoran (Avalanche Effect):</strong> Mengubah bahkan hanya satu spasi atau karakter pada input akan mengubah seluruh output digest secara radikal dan acak.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 5: CLOUD STACK RESPONSIBILITY (Pertemuan 11) */}
      {activeLab === 'cloud-explorer' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                Pertemuan #11: Cloud Computing (NIST Model)
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Eksplorasi Lapisan Tanggung Jawab (Shared Responsibility Model)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bandingkan pembagian tugas pemeliharaan antara pengguna dengan penyedia cloud (AWS / GCP / Azure).
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs shrink-0">
              <button
                onClick={() => setCloudModel('onprem')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  cloudModel === 'onprem' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                On-Premise
              </button>
              <button
                onClick={() => setCloudModel('iaas')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  cloudModel === 'iaas' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                IaaS
              </button>
              <button
                onClick={() => setCloudModel('paas')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  cloudModel === 'paas' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                PaaS
              </button>
              <button
                onClick={() => setCloudModel('saas')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  cloudModel === 'saas' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                SaaS
              </button>
            </div>
          </div>

          {/* Model Description Bar */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between text-xs">
            <div>
              <strong className="text-indigo-950 font-bold uppercase">
                {cloudModel === 'onprem' && 'On-Premise (Tradisional Mandiri)'}
                {cloudModel === 'iaas' && 'IaaS (Infrastructure as a Service, contoh: AWS EC2, GCE)'}
                {cloudModel === 'paas' && 'PaaS (Platform as a Service, contoh: Heroku, Google App Engine)'}
                {cloudModel === 'saas' && 'SaaS (Software as a Service, contoh: Google Workspace, Microsoft 365)'}
              </strong>
              <div className="text-indigo-700 mt-0.5">
                {cloudModel === 'onprem' && 'Organisasi Anda bertanggung jawab atas seluruh 9 lapisan teknologi dari kabel listrik fisik hingga kode aplikasi.'}
                {cloudModel === 'iaas' && 'Penyedia cloud mengurus hardware dan virtualisasi fisik; Anda mengurus sistem operasi, patch, runtime, dan aplikasi.'}
                {cloudModel === 'paas' && 'Penyedia cloud mengurus dari hardware hingga runtime; Anda hanya mengunggah kode aplikasi dan mengelola data.'}
                {cloudModel === 'saas' && 'Penyedia cloud mengurus seluruh 9 lapisan; pengguna akhir hanya langsung menggunakan aplikasi via browser.'}
              </div>
            </div>
          </div>

          {/* 9 Layers Stack */}
          <div className="space-y-2">
            {cloudLayers.map((layer, idx) => {
              const isUserManaged = isLayerManagedByUser(idx, cloudModel);

              return (
                <div
                  key={layer.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isUserManaged
                      ? 'bg-indigo-50/90 border-indigo-300 text-indigo-950'
                      : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white text-slate-800 font-mono text-xs font-bold flex items-center justify-center border border-slate-200">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold">{layer.name}</div>
                      <div className="text-[11px] opacity-80">{layer.desc}</div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-mono shrink-0 ${
                      isUserManaged
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {isUserManaged ? 'DIKELOLA OLEH ANDA' : 'DIKELOLA CLOUD PROVIDER'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
