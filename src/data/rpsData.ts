import { DETAILED_MEETING_CONTENTS, DetailedMeetingContent } from './detailedMaterials.ts';

export interface CPMK {
  id: string;
  code: string;
  description: string;
  bloomTaxonomy: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MeetingItem {
  id: number;
  minggu: number;
  kemampuanAkhir: string;
  bahanKajian: string;
  subTopik: string[];
  metodePembelajaran: string;
  pengalamanBelajar: string;
  kriteriaPenilaian: string;
  bobotIndikatif: number;
  cpmkIds: string[];
  kategori: 'Dasar & Konsep' | 'Arsitektur & Sistem' | 'Jaringan & Web' | 'Data & Storage' | 'Keamanan & Etika' | 'Tren Modern' | 'Evaluasi';
  durasi: string;
  rangkumanMateri: string[];
  istilahKunci: { istilah: string; arti: string }[];
  quiz: QuizQuestion[];
  detailedContent?: DetailedMeetingContent;
  labId?: 'binary-converter' | 'sql-sandbox' | 'network-topology' | 'security-crypto' | 'cloud-explorer';
  isExam?: boolean;
}

export interface ReferenceBook {
  id: string;
  authors: string;
  year: number;
  title: string;
  edition: string;
  publisher: string;
  relevantChapters: string;
  coverColor: string;
}

export interface Student {
  id: string;
  nim: string;
  name: string;
  email: string;
  attendance: boolean[]; // 16 meetings
  tugas: number;
  keaktifan: number;
  uts: number;
  uas: number;
  catatanDosen?: string;
}

export const COURSE_IDENTITY = {
  courseName: 'Pengantar Teknologi Informasi',
  courseCode: 'TI001',
  credits: 3,
  className: 'A',
  studentCount: 8,
  schedule: 'Kamis, 10:00 - 11:30',
  room: 'K1.8',
  studyProgram: 'Teknologi Informasi / Ilmu Komputer',
  semester: 'Ganjil 2026/2027',
  faculty: 'Fakultas Ilmu Komputer & Teknologi',
  lecturer: 'Tim Dosen Pengampu PTI',
  description:
    'Mata kuliah ini memperkenalkan konsep dasar teknologi informasi secara komprehensif, mencakup perangkat keras (hardware), perangkat lunak (software), jaringan komputer, internet, basis data, keamanan informasi, hingga tren teknologi mutakhir seperti Cloud Computing, IoT, dan Artificial Intelligence (AI), serta aspek etika dan hukum dalam pemanfaatan TI.',
};

export const CPMK_LIST: CPMK[] = [
  {
    id: 'CPMK-1',
    code: 'CPMK 1',
    description:
      'Mahasiswa mampu memahami evolusi, definisi, dan peran strategis Teknologi Informasi di era modern.',
    bloomTaxonomy: 'C2 - Pemahaman (Comprehension)',
  },
  {
    id: 'CPMK-2',
    code: 'CPMK 2',
    description:
      'Mahasiswa mampu mengidentifikasi komponen utama sistem komputer, baik perangkat keras maupun perangkat lunak.',
    bloomTaxonomy: 'C4 - Analisis (Analysis)',
  },
  {
    id: 'CPMK-3',
    code: 'CPMK 3',
    description:
      'Mahasiswa mampu menjelaskan dasar-dasar jaringan komputer, internet, serta sistem basis data.',
    bloomTaxonomy: 'C3 - Penerapan (Application)',
  },
  {
    id: 'CPMK-4',
    code: 'CPMK 4',
    description:
      'Mahasiswa mampu memahami isu keamanan informasi, privasi, serta etika profesional di bidang TI.',
    bloomTaxonomy: 'C5 - Evaluasi (Evaluation)',
  },
];

export const REFERENCE_BOOKS: ReferenceBook[] = [
  {
    id: 'ref-1',
    authors: "O'Brien, J. A., & Marakas, G. M.",
    year: 2011,
    title: 'Management Information Systems',
    edition: '10th Edition',
    publisher: 'McGraw-Hill',
    relevantChapters: 'Bab 1-4 (Sistem Informasi Enterprise, Hardware & Software, Jaringan Bisnis)',
    coverColor: 'from-blue-900 to-indigo-950',
  },
  {
    id: 'ref-2',
    authors: 'Williams, B. K., & Sawyer, S. C.',
    year: 2014,
    title: 'Using Information Technology: A Practical Introduction to Computers & Communications',
    edition: '11th Edition',
    publisher: 'McGraw-Hill',
    relevantChapters: 'Bab 1-8 (Hardware, System Software, Digital Data, Komunikasi Internet, Cyber Safety)',
    coverColor: 'from-slate-900 to-cyan-950',
  },
  {
    id: 'ref-3',
    authors: 'Morley, D., & Parker, C. S.',
    year: 2017,
    title: 'Understanding Computers: Today and Tomorrow: Comprehensive',
    edition: '16th Edition',
    publisher: 'Cengage Learning',
    relevantChapters: 'Bab 1-12 (Arsitektur Komputer, DBMS, Jaringan Nirkabel, AI, Etika & Hukum Siber)',
    coverColor: 'from-emerald-950 to-teal-900',
  },
];

const RAW_MEETINGS: MeetingItem[] = [
  {
    id: 1,
    minggu: 1,
    kemampuanAkhir: 'Memahami ruang lingkup dan kontrak perkuliahan',
    bahanKajian: 'Pengantar & Sejarah Perkembangan Teknologi Informasi',
    subTopik: [
      'Definisi Teknologi Informasi vs Sistem Informasi vs Ilmu Komputer',
      'Evolusi komputer dari Generasi I (Tabung Vakum) hingga Generasi V (AI)',
      'Hukum Moore dan eksponensialitas pertumbuhan komputasi',
      'Kontrak perkuliahan, silabus, dan sistem penilaian 4 komponen',
    ],
    metodePembelajaran: 'Ceramah & Diskusi',
    pengalamanBelajar: 'Mendiskusikan tonggak sejarah teknologi informasi dan menganalisis peran TI dalam berbagai sektor kehidupan.',
    kriteriaPenilaian: 'Ketepatan menjelaskan perbedaan data, informasi, dan pengetahuan, serta memahami aturan perkuliahan.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-1'],
    kategori: 'Dasar & Konsep',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Data adalah fakta mentah, informasi adalah data yang telah diproses dan memiliki arti, sedangkan pengetahuan (knowledge) adalah pemahaman aplikatif atas informasi.',
      'Perkembangan TI didorong oleh pergeseran komponen: tabung vakum (1940-an), transistor (1950-an), IC (1960-an), mikroprosesor VLSI (1970-sekarang).',
      'Era modern menempatkan TI bukan sekadar alat bantu operasional kantor, melainkan penggerak disrupsi bisnis dan inovasi.',
    ],
    istilahKunci: [
      { istilah: 'Hukum Moore', arti: 'Prediksi bahwa jumlah transistor pada chip berlipat ganda setiap kira-kira 2 tahun.' },
      { istilah: 'Information Literacy', arti: 'Kemampuan mengenali kapan informasi dibutuhkan, serta menemukan, mengevaluasi, dan menggunakannya secara efektif.' },
    ],
    quiz: [
      {
        question: 'Komponen elektronik utama yang menjadi ciri khas komputer Generasi Kedua (1950-an) adalah...',
        options: ['Tabung Vakum (Vacuum Tube)', 'Transistor', 'Integrated Circuit (IC)', 'Mikroprosesor'],
        correctAnswer: 1,
        explanation: 'Transistor menggantikan tabung vakum pada generasi kedua, membuat komputer jauh lebih kecil, cepat, dan hemat daya.',
      },
      {
        question: 'Hubungan yang tepat antara Data, Informasi, dan Pengetahuan adalah...',
        options: [
          'Informasi diproses menjadi Data, lalu menjadi Pengetahuan',
          'Data mentah diolah menjadi Informasi yang bermakna, lalu diasimilasikan menjadi Pengetahuan',
          'Pengetahuan diurai menjadi Informasi tanpa perlu pengolahan Data',
          'Ketiganya merupakan istilah yang memiliki makna persis sama dalam ilmu komputer',
        ],
        correctAnswer: 1,
        explanation: 'Hirarki DIKW (Data -> Information -> Knowledge -> Wisdom) menempatkan data mentah yang diolah menjadi informasi bermanfaat.',
      },
    ],
  },
  {
    id: 2,
    minggu: 2,
    kemampuanAkhir: 'Memahami komponen fisik sistem komputer',
    bahanKajian: 'Perangkat Keras (Hardware) & Arsitektur Komputer',
    subTopik: [
      'Arsitektur Von Neumann: CPU (ALU, CU, Register), Memory, I/O',
      'Siklus Fetch-Decode-Execute (Machine Cycle)',
      'Hierarki Memori: Register, Cache L1/L2/L3, RAM, SSD/HDD, Secondary Storage',
      'Bus Sistem (Data Bus, Address Bus, Control Bus) dan port periferal',
    ],
    metodePembelajaran: 'Kuliah interaktif & Praktikum mini',
    pengalamanBelajar: 'Membongkar dan mengidentifikasi komponen fisik PC mini/motherboard, memeriksa spesifikasi CPU dan RAM.',
    kriteriaPenilaian: 'Ketepatan mengidentifikasi perangkat keras input, proses, penyimpanan, dan output serta fungsi masing-masing.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-2'],
    kategori: 'Arsitektur & Sistem',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Arsitektur Von Neumann menjadi fondasi hampir seluruh komputer modern: data dan instruksi disimpan bersama dalam memori utama.',
      'CPU terdiri dari ALU (Arithmetic Logic Unit) untuk perhitungan matematis/logika, Control Unit (CU) sebagai konduktor instruksi, dan Register berkecepatan paling tinggi.',
      'Hierarki memori menyeimbangkan kecepatan versus biaya: Register (tercepat, terkecil) -> Cache -> RAM -> NVMe SSD -> Penyimpanan sekunder.',
    ],
    istilahKunci: [
      { istilah: 'Machine Cycle', arti: 'Proses empat tahap: Fetch (ambil), Decode (terjemahkan), Execute (eksekusi), Store (simpan).' },
      { istilah: 'Volatile Memory', arti: 'Memori yang kehilangan datanya saat daya dimatikan (seperti RAM).' },
    ],
    quiz: [
      {
        question: 'Bagian CPU yang bertugas mengatur lalu lintas instruksi dan mengarahkan aliran data antar komponen adalah...',
        options: ['ALU (Arithmetic Logic Unit)', 'Control Unit (CU)', 'RAM', 'GPU'],
        correctAnswer: 1,
        explanation: 'Control Unit (CU) berfungsi sebagai pusat komando yang menginterpretasikan instruksi dan mengoordinasikan eksekusi.',
      },
      {
        question: 'Tipe memori berikut yang memiliki kecepatan akses tercepat bagi prosesor adalah...',
        options: ['DDR5 RAM', 'NVMe SSD', 'Register CPU', 'Cache L3'],
        correctAnswer: 2,
        explanation: 'Register berada langsung di dalam inti prosesor dan beroperasi pada frekuensi clock CPU, menjadikannya memori tercepat.',
      },
    ],
  },
  {
    id: 3,
    minggu: 3,
    kemampuanAkhir: 'Memahami jenis dan fungsi perangkat lunak',
    bahanKajian: 'Perangkat Lunak (Software): Sistem Operasi & Aplikasi',
    subTopik: [
      'Klasifikasi Perangkat Lunak: System Software vs Application Software',
      'Fungsi Inti Sistem Operasi: Manajemen Proses, Memori, File System, & Device Driver',
      'Kernel OS: Monolithic vs Microkernel (Windows NT, Linux kernel, macOS XNU)',
      'Lisensi Perangkat Lunak: Proprietary, Open Source (GPL, MIT, Apache), Freeware, SaaS',
    ],
    metodePembelajaran: 'Studi Kasus',
    pengalamanBelajar: 'Menganalisis perbandingan performa dan model bisnis antara OS proprietary (Windows/macOS) dan Open Source (Linux).',
    kriteriaPenilaian: 'Kemampuan menjelaskan alur interaksi user - aplikasi - OS - hardware serta lisensi hukum perangkat lunak.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-2'],
    kategori: 'Arsitektur & Sistem',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Sistem Operasi bertindak sebagai jembatan (abstraksi) antara aplikasi pengguna dengan perangkat keras yang rumit.',
      'Fungsi utama OS meliputi penjadwalan CPU (multitasking), manajemen memori virtual (paging/swapping), proteksi akses file, dan antarmuka I/O.',
      'Model lisensi menentukan hak pakai, distribusi, modifikasi kode sumber (misalnya lisensi copyleft GPL vs permissive MIT).',
    ],
    istilahKunci: [
      { istilah: 'Kernel', arti: 'Komponen inti OS yang selalu berada di memori utama dan mengontrol akses langsung ke hardware.' },
      { istilah: 'Open Source', arti: 'Perangkat lunak dengan kode sumber terbuka yang dapat dipelajari, dimodifikasi, dan didistribusikan kembali.' },
    ],
    quiz: [
      {
        question: 'Program inti sistem operasi yang mengelola sumber daya perangkat keras dan memori secara langsung disebut...',
        options: ['Shell', 'Kernel', 'BIOS', 'Compiler'],
        correctAnswer: 1,
        explanation: 'Kernel adalah inti dari sistem operasi yang menghubungkan perangkat lunak aplikasi dengan perangkat keras komputer.',
      },
      {
        question: 'Lisensi perangkat lunak yang mengizinkan siapa saja menggunakan, memodifikasi, dan mendistribusikan kode tanpa batasan ketat adalah lisensi open-source seperti...',
        options: ['EULA Komersial', 'MIT License', 'Freeware Tertutup', 'Shareware Trial'],
        correctAnswer: 1,
        explanation: 'Lisensi MIT adalah lisensi sumber terbuka yang sangat permisif dan populer dalam ekosistem perangkat lunak modern.',
      },
    ],
  },
  {
    id: 4,
    minggu: 4,
    kemampuanAkhir: 'Memahami cara komputer mengolah data',
    bahanKajian: 'Representasi Data & Pengantar Sistem Bilangan',
    subTopik: [
      'Sistem Bilangan: Desimal (Basis 10), Biner (Basis 2), Oktal (Basis 8), Heksadesimal (Basis 16)',
      'Konversi Antar Sistem Bilangan dan Operasi Aritmatika Biner',
      'Pengkodean Teks: ASCII, Extended ASCII, dan Unicode (UTF-8, UTF-16)',
      'Representasi Multimedia: Bit depth citra (RGB), Sampling rate audio, Kompresi Lossless vs Lossy',
    ],
    metodePembelajaran: 'Latihan Soal & Diskusi',
    pengalamanBelajar: 'Mengerjakan konversi manual angka desimal ke biner dan heksadesimal, serta mencoba kalkulator bit interaktif.',
    kriteriaPenilaian: 'Ketepatan menghitung konversi bilangan dan memahami cara komputer mengkodekan teks dan gambar dalam bentuk bit.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-2'],
    kategori: 'Data & Storage',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Komputer digital beroperasi pada level tegangan logika biner (0 = LOW, 1 = HIGH). Bit adalah unit terkecil, 8 bit = 1 Byte.',
      'Sistem heksadesimal sering digunakan oleh programmer untuk menyingkat representasi biner (1 digit heksa = 4 bit biner/nibble).',
      'Unicode UTF-8 kini menjadi standar universal pengkodean karakter web, mencakup huruf alfabet, huruf daerah, emoji, hingga simbol matematika.',
    ],
    istilahKunci: [
      { istilah: 'Byte', arti: 'Kumpulan 8 bit data yang dapat mewakili satu karakter teks atau angka 0 s.d. 255.' },
      { istilah: 'ASCII', arti: 'American Standard Code for Information Interchange; skema pengkodean 7-bit standar (128 karakter).' },
    ],
    labId: 'binary-converter',
    quiz: [
      {
        question: 'Angka desimal 42 jika dikonversikan ke dalam bentuk biner 8-bit adalah...',
        options: ['00101010', '00110010', '00101100', '00010101'],
        correctAnswer: 0,
        explanation: '32 + 8 + 2 = 42. Dalam biner posisi: 128(0), 64(0), 32(1), 16(0), 8(1), 4(0), 2(1), 1(0) = 00101010.',
      },
      {
        question: 'Satu digit bilangan heksadesimal (0-9, A-F) merepresentasikan berapa bit biner?',
        options: ['2 bit', '4 bit (nibble)', '8 bit (byte)', '16 bit (word)'],
        correctAnswer: 1,
        explanation: 'Karena 2^4 = 16, satu digit heksadesimal setara dengan persis 4 bit biner (contoh: F = 1111).',
      },
    ],
  },
  {
    id: 5,
    minggu: 5,
    kemampuanAkhir: 'Memahami konsep dasar telekomunikasi',
    bahanKajian: 'Jaringan Komputer, Topologi, dan Media Transmisi',
    subTopik: [
      'Klasifikasi Jaringan berdasarkan Cakupan Geografis: PAN, LAN, MAN, WAN',
      'Media Transmisi: Terpandu/Guided (Kabel UTP/STP, Koaksial, Fiber Optik) vs Nirkabel/Unguided (Radio, Wi-Fi, Satelit)',
      'Topologi Jaringan: Star, Bus, Ring, Mesh, Tree, dan Hybrid',
      'Perangkat Keras Jaringan: NIC, Switch, Router, Modem, Access Point',
    ],
    metodePembelajaran: 'Demonstrasi & Presentasi',
    pengalamanBelajar: 'Menganalisis perbandingan topologi pada simulasi interaktif, mengevaluasi redundansi jalur dan single point of failure.',
    kriteriaPenilaian: 'Ketepatan membedakan karakteristik media transmisi, kelebihan/kelemahan topologi, dan peran router vs switch.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-3'],
    kategori: 'Jaringan & Web',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Topologi menentukan susunan fisik dan logis perangkat. Topologi Star paling populer di kantor modern karena kegagalan satu kabel tidak mematikan seluruh jaringan.',
      'Fiber Optik mentransmisikan data melalui pulsa cahaya dengan kecepatan gigabit dan tahan interferensi elektromagnetik.',
      'Switch beroperasi pada Data Link Layer (berdasarkan MAC address), sedangkan Router beroperasi pada Network Layer (berdasarkan IP address).',
    ],
    istilahKunci: [
      { istilah: 'Bandwidth', arti: 'Kapasitas maksimum jalur komunikasi untuk memindahkan data dalam satuan waktu (misal Mbps/Gbps).' },
      { istilah: 'Topologi Star', arti: 'Topologi di mana semua simpul terhubung secara terpusat ke perangkat switch atau hub.' },
    ],
    labId: 'network-topology',
    quiz: [
      {
        question: 'Topologi jaringan di mana semua workstation terhubung langsung ke satu perangkat pusat (seperti switch) disebut...',
        options: ['Topologi Bus', 'Topologi Star', 'Topologi Ring', 'Topologi Mesh'],
        correctAnswer: 1,
        explanation: 'Topologi Star menghubungkan setiap komputer ke switch/hub pusat secara individual.',
      },
      {
        question: 'Media transmisi kabel yang menggunakan serat kaca dan mentransmisikan sinyal berupa pulsa cahaya adalah...',
        options: ['Kabel UTP Cat6', 'Kabel Koaksial', 'Fiber Optic', 'Kabel Twisted Pair'],
        correctAnswer: 2,
        explanation: 'Fiber Optic mentransmisikan data dalam bentuk gelombang cahaya, memberikan bandwidth sangat besar dan minim pelemahan sinyal.',
      },
    ],
  },
  {
    id: 6,
    minggu: 6,
    kemampuanAkhir: 'Memahami infrastruktur internet dan web',
    bahanKajian: 'Internet, WWW, Protokol Jaringan (TCP/IP), & Web Tech',
    subTopik: [
      'Perbedaan mendasar antara "Internet" (infrastruktur global) dan "World Wide Web" (layanan informasi)',
      'Model 4 Layer TCP/IP dan 7 Layer OSI: Enkapsulasi Paket',
      'Pengalamatan Internet: IPv4 (32-bit) vs IPv6 (128-bit) dan cara kerja DNS (Domain Name System)',
      'Protokol Web: HTTP/HTTPS, Web Socket, URL Anatomy, Peran Client-Side (HTML/CSS/JS) vs Server-Side',
    ],
    metodePembelajaran: 'Diskusi Kelompok',
    pengalamanBelajar: 'Menelusuri proses yang terjadi saat mengetik nama domain di browser hingga halaman web tampil (DNS lookup -> TCP Handshake -> TLS -> HTTP GET).',
    kriteriaPenilaian: 'Kemampuan menjelaskan alur paket data dan fungsi protokol DNS, DHCP, HTTP, dan TCP/IP.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-3'],
    kategori: 'Jaringan & Web',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Internet adalah interkoneksi raksasa jutaan jaringan komputer di dunia, sedangkan Web hanyalah salah satu aplikasi/layanan yang berjalan di atas Internet.',
      'DNS berfungsi seperti "buku telepon internet", menerjemahkan domain ramah manusia (misal: google.com) menjadi alamat IP mesin (misal: 142.250.190.46).',
      'Protokol HTTPS menggunakan enkripsi TLS/SSL untuk mengamankan data transaksi dari penyadapan (man-in-the-middle).',
    ],
    istilahKunci: [
      { istilah: 'DNS', arti: 'Domain Name System; layanan direktori yang menerjemahkan nama host menjadi alamat IP numerik.' },
      { istilah: 'TCP/IP', arti: 'Transmission Control Protocol / Internet Protocol; standar protokol komunikasi global.' },
    ],
    quiz: [
      {
        question: 'Protokol yang bertugas menerjemahkan nama domain ramah manusia (seperti unpas.ac.id) menjadi alamat IP numerik adalah...',
        options: ['DHCP', 'DNS', 'FTP', 'SMTP'],
        correctAnswer: 1,
        explanation: 'Domain Name System (DNS) bertindak sebagai buku telepon internet yang memetakan nama domain ke alamat IP.',
      },
      {
        question: 'Perbedaan utama antara IPv4 dan IPv6 adalah...',
        options: [
          'IPv4 menggunakan 32-bit, sedangkan IPv6 menggunakan 128-bit untuk menyediakan ruang alamat yang jauh lebih besar',
          'IPv4 lebih aman secara default daripada IPv6',
          'IPv4 hanya untuk jaringan nirkabel, sedangkan IPv6 untuk kabel',
          'IPv4 menggunakan heksadesimal sedangkan IPv6 menggunakan biner murni',
        ],
        correctAnswer: 0,
        explanation: 'IPv4 hanya menyediakan ~4,3 miliar alamat (32-bit), sementara IPv6 menyediakan ruang alamat 128-bit yang hampir tak terbatas (3.4 x 10^38 alamat).',
      },
    ],
  },
  {
    id: 7,
    minggu: 7,
    kemampuanAkhir: 'Memahami pengelolaan data terstruktur',
    bahanKajian: 'Pengantar Basis Data (Database) dan konsep DBMS',
    subTopik: [
      'Kelemahan Sistem File Tradisional vs Keuntungan Basis Data (Redundansi, Integritas, Keamanan)',
      'Model Data Relasional: Entitas, Atribut, Tuple, Primary Key, Foreign Key, dan Relasi (1:1, 1:N, M:N)',
      'Arsitektur DBMS: RDBMS (PostgreSQL, MySQL) vs NoSQL (Document, Key-Value, Graph)',
      'Pengantar Bahasa SQL: DDL (CREATE, ALTER) dan DML dasar (SELECT, INSERT, UPDATE, DELETE)',
    ],
    metodePembelajaran: 'Praktikum Dasar SQL',
    pengalamanBelajar: 'Mencoba eksekusi query SQL SELECT, WHERE, dan ORDER BY pada mini studio database interaktif yang tersedia.',
    kriteriaPenilaian: 'Kemampuan merancang tabel sederhana, menentukan primary key, dan menyusun query SQL dasar.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-3'],
    kategori: 'Data & Storage',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'DBMS (Database Management System) adalah perangkat lunak perantara yang memungkinkan penyimpanan, query, dan modifikasi data secara terstruktur.',
      'Primary Key menjamin setiap baris data bersifat unik, sedangkan Foreign Key menjaga integritas referensial antar tabel relasional.',
      'SQL (Structured Query Language) adalah bahasa standar ANSI/ISO untuk berinteraksi dengan database relasional.',
    ],
    istilahKunci: [
      { istilah: 'Primary Key', arti: 'Kolom atau kombinasi kolom yang mengidentifikasi secara unik setiap baris dalam tabel.' },
      { istilah: 'Relational Database', arti: 'Basis data yang mengorganisir data ke dalam tabel-tabel dua dimensi yang saling berelasi.' },
    ],
    labId: 'sql-sandbox',
    quiz: [
      {
        question: 'Klausa SQL yang digunakan untuk menyaring data berdasarkan kondisi tertentu adalah...',
        options: ['SELECT', 'ORDER BY', 'WHERE', 'GROUP BY'],
        correctAnswer: 2,
        explanation: 'Klausa WHERE digunakan dalam query SQL untuk memfilter record yang memenuhi kriteria tertentu.',
      },
      {
        question: 'Kunci (key) dalam sebuah tabel relasional yang nilainya mengacu pada Primary Key di tabel lain dinamakan...',
        options: ['Candidate Key', 'Foreign Key', 'Super Key', 'Alternate Key'],
        correctAnswer: 1,
        explanation: 'Foreign Key (Kunci Tamu) digunakan untuk membangun dan memelihara hubungan logis antara dua tabel.',
      },
    ],
  },
  {
    id: 8,
    minggu: 8,
    kemampuanAkhir: 'Evaluasi Tengah Semester',
    bahanKajian: 'Ujian Tengah Semester (UTS)',
    subTopik: [
      'Evaluasi pemahaman materi Pertemuan 1 s.d. Pertemuan 7',
      'Ujian tertulis: Soal Pilihan Ganda, Isian Singkat, dan Studi Kasus Komputasi',
      'Pengujian CPMK-1, CPMK-2, dan CPMK-3',
      'Bobot penilaian resmi: 30% dari total nilai akhir',
    ],
    metodePembelajaran: 'Ujian Tertulis',
    pengalamanBelajar: 'Mengerjakan soal evaluasi komprehensif secara mandiri untuk mengukur ketercapaian kompetensi paruh semester.',
    kriteriaPenilaian: 'Ketepatan jawaban sesuai rubrik penilaian akademis UTS.',
    bobotIndikatif: 30,
    cpmkIds: ['CPMK-1', 'CPMK-2', 'CPMK-3'],
    kategori: 'Evaluasi',
    durasi: '90 Menit',
    rangkumanMateri: [
      'Mencakup penguasaan: Sejarah TI, Arsitektur Von Neumann, Sistem Bilangan Biner/Heksa, Lisensi OS, Topologi Jaringan, Model TCP/IP, dan Konsep Dasar Basis Data.',
      'Persiapkan kalkulator konversi bilangan dan pemahaman konsep dasar relasi tabel SQL.',
    ],
    istilahKunci: [
      { istilah: 'Evaluasi Tengah Semester', arti: 'Asesmen sumatif untuk mengukur penguasaan materi 7 minggu awal perkuliahan.' },
    ],
    isExam: true,
    quiz: [
      {
        question: 'Ujian Tengah Semester (UTS) TI001 memiliki bobot penilaian resmi sebesar berapa persen?',
        options: ['15%', '20%', '30%', '35%'],
        correctAnswer: 2,
        explanation: 'Sesuai silabus resmi sistem penilaian, UTS memiliki bobot 30% dari total nilai akhir.',
      },
    ],
  },
  {
    id: 9,
    minggu: 9,
    kemampuanAkhir: 'Memahami aspek perlindungan data dan sistem',
    bahanKajian: 'Keamanan Informasi, Kriptografi, & Ancaman Siber',
    subTopik: [
      'Triad Keamanan Informasi: Confidentiality, Integrity, Availability (CIA Triad)',
      'Vektor Ancaman: Malware (Virus, Worm, Ransomware), Phishing, Social Engineering, DDoS',
      'Prinsip Kriptografi: Enkripsi Simetris (AES) vs Asimetris (RSA/Public Key), Fungsi Hashing (SHA-256)',
      'Praktek Keamanan Siber Terbaik: Multi-Factor Authentication (MFA), Backup 3-2-1, Patching',
    ],
    metodePembelajaran: 'Analisis Kasus Siber',
    pengalamanBelajar: 'Menganalisis studi kasus insiden kebocoran data dan ransomware, serta mencoba simulasi cipher dan hashing kriptografi.',
    kriteriaPenilaian: 'Kemampuan mengidentifikasi jenis serangan siber dan mengusulkan kontrol mitigasi berbasis CIA triad.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-4'],
    kategori: 'Keamanan & Etika',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'CIA Triad adalah pilar keamanan informasi: Kerahasiaan (hanya pihak berwenang), Integritas (data tidak dimanipulasi tanpa izin), Ketersediaan (sistem dapat diakses saat dibutuhkan).',
      'Hashing bersifat satu arah (one-way); tidak dapat didekripsi balik, berguna untuk verifikasi password dan integritas file.',
      'Sebagian besar insiden keamanan bermula dari kelemahan faktor manusia (human error / social engineering), bukan semata celah teknis perangkat keras.',
    ],
    istilahKunci: [
      { istilah: 'CIA Triad', arti: 'Tiga prinsip dasar keamanan informasi: Confidentiality, Integrity, Availability.' },
      { istilah: 'Ransomware', arti: 'Malware yang mengenkripsi file korban dan menuntut tebusan uang untuk kunci dekripsi.' },
    ],
    labId: 'security-crypto',
    quiz: [
      {
        question: 'Prinsip CIA Triad yang menjamin bahwa informasi hanya dapat dibaca dan diakses oleh pihak yang berhak disebut...',
        options: ['Integrity', 'Confidentiality (Kerahasiaan)', 'Availability', 'Authenticity'],
        correctAnswer: 1,
        explanation: 'Confidentiality mencegah akses tidak sah terhadap informasi rahasia.',
      },
      {
        question: 'Perbedaan mendasar antara Enkripsi dan Hashing adalah...',
        options: [
          'Enkripsi dapat dibalik (didekripsi dengan kunci), sedangkan Hashing adalah transformasi satu arah',
          'Hashing hanya untuk file gambar',
          'Enkripsi tidak memerlukan kunci apapun',
          'Keduanya menghasilkan teks yang selalu bisa didekripsi',
        ],
        correctAnswer: 0,
        explanation: 'Fungsi hash bersifat satu arah (mathematical one-way function), sedangkan enkripsi dua arah (memiliki proses dekripsi).',
      },
    ],
  },
  {
    id: 10,
    minggu: 10,
    kemampuanAkhir: 'Memahami model bisnis digital',
    bahanKajian: 'E-Commerce, E-Business, dan Sistem Informasi Enterprise',
    subTopik: [
      'Definisi E-Commerce vs E-Business: Kategori B2B, B2C, C2C, dan B2G',
      'Arsitektur Sistem Enterprise: ERP (Enterprise Resource Planning), CRM (Customer Relationship Management), SCM (Supply Chain)',
      'Infrastruktur Pembayaran Digital: Payment Gateway, Dompet Digital (E-Wallet), QRIS, Virtual Account',
      'Strategi Transformasi Digital dan Platform Multi-Sisi (Marketplace & Ride-hailing)',
    ],
    metodePembelajaran: 'Studi Kasus Industri',
    pengalamanBelajar: 'Mengkaji model bisnis startup teknologi Indonesia (Tokopedia, GoTo, Blibli) dan alur transaksi end-to-end.',
    kriteriaPenilaian: 'Kemampuan membedakan model bisnis digital dan menjelaskan peran modul ERP dalam integrasi data perusahaan.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-1', 'CPMK-3'],
    kategori: 'Dasar & Konsep',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'ERP mengintegrasikan fungsi bisnis inti (keuangan, manufaktur, SDM, logistik) ke dalam satu basis data terpadu untuk menghilangkan silo data.',
      'Sistem CRM berfokus pada siklus hidup pelanggan untuk meningkatkan retensi dan penjualan.',
      'Standardisasi seperti QRIS di Indonesia mempercepat interoperabilitas pembayaran digital lintas bank dan fintech.',
    ],
    istilahKunci: [
      { istilah: 'ERP', arti: 'Enterprise Resource Planning; perangkat lunak manajemen proses bisnis terintegrasi.' },
      { istilah: 'B2B', arti: 'Business-to-Business; model transaksi komersial antara dua entitas bisnis.' },
    ],
    quiz: [
      {
        question: 'Sistem informasi enterprise yang menyatukan seluruh departemen operasional (keuangan, rantai pasok, produksi, SDM) ke dalam satu database terpusat adalah...',
        options: ['ERP (Enterprise Resource Planning)', 'CMS (Content Management System)', 'CAD', 'IDE'],
        correctAnswer: 0,
        explanation: 'ERP dirancang untuk mengintegrasikan proses bisnis internal dari ujung ke ujung.',
      },
    ],
  },
  {
    id: 11,
    minggu: 11,
    kemampuanAkhir: 'Memahami komputasi berbasis internet modern',
    bahanKajian: 'Cloud Computing (SaaS, PaaS, IaaS)',
    subTopik: [
      'Definisi Cloud Computing menurut NIST: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service',
      'Model Layanan Cloud: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), SaaS (Software as a Service)',
      'Model Deployment: Public Cloud, Private Cloud, Hybrid Cloud, Multi-Cloud',
      'Shared Responsibility Model: Siapa yang mengelola OS, runtime, aplikasi, dan keamanan data',
    ],
    metodePembelajaran: 'Diskusi & Eksplorasi Layanan',
    pengalamanBelajar: 'Membandingkan pembagian tanggung jawab IaaS vs PaaS vs SaaS menggunakan diagram arsitektur interaktif.',
    kriteriaPenilaian: 'Kemampuan memilih model layanan cloud yang tepat berdasarkan kebutuhan skala dan keahlian teknis organisasi.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-3'],
    kategori: 'Tren Modern',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Cloud Computing mengubah model belanja IT dari Capex (Capital Expenditure/beli server sendiri) menjadi Opex (Operational Expenditure/bayar sesuai pakai).',
      'Pada SaaS (Google Workspace, Microsoft 365), penyedia cloud mengelola segalanya; pengguna hanya menggunakan aplikasi.',
      'Pada IaaS (AWS EC2, Google Compute Engine), penyedia hanya menyediakan hardware/virtualisasi; pengguna menginstal OS, keamanan, dan aplikasi.',
    ],
    istilahKunci: [
      { istilah: 'SaaS', arti: 'Software as a Service; aplikasi siap pakai yang di-host di cloud dan diakses lewat browser.' },
      { istilah: 'Elasticity', arti: 'Kemampuan sistem cloud menambah atau mengurangi sumber daya secara otomatis mengikuti beban traffic.' },
    ],
    labId: 'cloud-explorer',
    quiz: [
      {
        question: 'Layanan seperti Google Drive, Gmail, atau Canva di mana pengguna langsung memakai aplikasi tanpa memikirkan server atau OS termasuk kategori...',
        options: ['IaaS', 'PaaS', 'SaaS', 'BaaS'],
        correctAnswer: 2,
        explanation: 'SaaS (Software as a Service) menyediakan aplikasi perangkat lunak lengkap yang dikelola sepenuhnya oleh penyedia.',
      },
      {
        question: 'Dalam model Shared Responsibility IaaS, komponen yang menjadi tanggung jawab pengguna (konsumen) adalah...',
        options: ['Fisik data center dan pendingin', 'Sistem Operasi, patch keamanan OS, dan konfigurasi aplikasi', 'Kabel fiber optik bawah laut', 'Perangkat keras server fisik'],
        correctAnswer: 1,
        explanation: 'Pada IaaS, penyedia mengurus perangkat keras/virtualisasi fisik, sementara pengguna wajib menginstal dan memelihara sistem operasi dan aplikasinya.',
      },
    ],
  },
  {
    id: 12,
    minggu: 12,
    kemampuanAkhir: 'Memahami teknologi sensor dan otomatisasi',
    bahanKajian: 'Internet of Things (IoT) dan Perangkat Pintar',
    subTopik: [
      'Konsep Arsitektur 4 Lapisan IoT: Sensing (Sensor & Aktuator), Network/Gateway, Data Processing/Edge, Application',
      'Protokol Komunikasi IoT: MQTT, CoAP, BLE, Zigbee, LoRaWAN',
      'Penerapan IoT di Industri: Smart City, Smart Agriculture, Smart Home, Industrial IoT (IIoT)',
      'Tantangan Keamanan dan Privasi pada Perangkat IoT Berketerbatasan Daya (Constrained Devices)',
    ],
    metodePembelajaran: 'Presentasi Tren',
    pengalamanBelajar: 'Menganalisis sistem monitoring cuaca/pertanian berbasis IoT dan alur pengiriman data sensor ke dashboard cloud.',
    kriteriaPenilaian: 'Ketepatan menguraikan interaksi sensor, mikrokontroler (Arduino/ESP32/Raspberry Pi), dan konektivitas cloud.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-3', 'CPMK-4'],
    kategori: 'Tren Modern',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'IoT menghubungkan benda mati sehari-hari ke jaringan internet sehingga mampu mengumpulkan dan bertukar data tanpa intervensi manusia.',
      'Sensor bertugas membaca fenomena fisik (suhu, kelembapan, gerak) menjadi sinyal elektrik, sementara aktuator melakukan aksi fisik balik (menyalakan pompa, membuka katup).',
      'Protokol ringan seperti MQTT dirancang khusus untuk jaringan dengan bandwidth terbatas dan perangkat baterai hemat energi.',
    ],
    istilahKunci: [
      { istilah: 'Aktuator', arti: 'Komponen yang mengubah energi listrik menjadi gerakan fisik atau aksi mekanis.' },
      { istilah: 'MQTT', arti: 'Message Queuing Telemetry Transport; protokol perpesanan ringan berbasis publish-subscribe untuk IoT.' },
    ],
    quiz: [
      {
        question: 'Protokol komunikasi jaringan yang sangat ringan, hemat bandwidth, dan umum digunakan pada perangkat IoT adalah...',
        options: ['FTP', 'MQTT', 'POP3', 'Telnet'],
        correctAnswer: 1,
        explanation: 'MQTT (Message Queuing Telemetry Transport) adalah standar de-facto untuk komunikasi IoT ringan hemat daya.',
      },
    ],
  },
  {
    id: 13,
    minggu: 13,
    kemampuanAkhir: 'Memahami dasar kecerdasan buatan',
    bahanKajian: 'Pengantar Artificial Intelligence (AI) dan Data Science',
    subTopik: [
      'Hubungan AI, Machine Learning (ML), Deep Learning (DL), dan Generative AI',
      'Paradigma Pembelajaran Mesin: Supervised Learning, Unsupervised Learning, Reinforcement Learning',
      'Tahapan Siklus Hidup Data Science: Data Collection, Cleaning, EDA, Model Training, Evaluation, Deployment',
      'Etika AI: Bias algoritma, halusinasi model bahasa besar (LLM), dan dampak terhadap masa depan pekerjaan',
    ],
    metodePembelajaran: 'Demonstrasi Tools AI',
    pengalamanBelajar: 'Melihat demonstrasi model klasifikasi data sederhana dan bereksperimen dengan prompt engineering yang etis.',
    kriteriaPenilaian: 'Kemampuan membedakan klasifikasi supervised vs unsupervised serta menjelaskan batasan etis penggunaan AI generatif.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-1', 'CPMK-4'],
    kategori: 'Tren Modern',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'AI adalah istilah payung sistem yang meniru kecerdasan manusia; ML adalah cabang AI yang belajar dari pola data tanpa diprogram eksplisit.',
      'Supervised Learning menggunakan data berlabel (misal gambar berlabel kucing/anjing), sedangkan Unsupervised Learning mencari klaster pola tersembunyi.',
      'Generative AI (seperti LLM dan model difusi) mampu menghasilkan konten baru berdasarkan probabilitas token yang dipelajari dari korpus raksasa.',
    ],
    istilahKunci: [
      { istilah: 'Machine Learning', arti: 'Kemampuan sistem komputer belajar secara otomatis dan meningkatkan performa dari pengalaman data.' },
      { istilah: 'Supervised Learning', arti: 'Metode pelatihan algoritma menggunakan dataset input yang telah dipasangkan dengan label output yang benar.' },
    ],
    quiz: [
      {
        question: 'Metode machine learning di mana model dilatih menggunakan sekumpulan data yang sudah memiliki label kebenaran (ground truth) disebut...',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Clustering', 'Reinforcement Learning tanpa reward'],
        correctAnswer: 0,
        explanation: 'Supervised learning menggunakan pasangan data input beserta label target yang telah ditentukan sebelumnya.',
      },
    ],
  },
  {
    id: 14,
    minggu: 14,
    kemampuanAkhir: 'Memahami aspek legal dan moral ber-TI',
    bahanKajian: 'Etika Profesi, Hak Kekayaan Intelektual (HAKI), & Cyber Law',
    subTopik: [
      'Kode Etik Profesional TI: Kode Etik ACM dan IEEE-CS',
      'Hak Kekayaan Intelektual di Ranah Digital: Hak Cipta Perangkat Lunak, Paten Algoritma, Merek Dagang, dan Lisensi Terbuka (Creative Commons)',
      'Hukum Siber di Indonesia: UU ITE (Informasi dan Transaksi Elektronik) dan UU PDP (Pelindungan Data Pribadi)',
      'Privasi Pengguna, Cookie Tracking, dan Hak Subjek Data (Right to be Forgotten)',
    ],
    metodePembelajaran: 'Debat / Diskusi Etika',
    pengalamanBelajar: 'Mendiskusikan dilema moral profesional TI (whistleblowing, privasi pengguna vs monetisasi iklan, dan pelanggaran hak cipta software bajakan).',
    kriteriaPenilaian: 'Kemampuan menganalisis kasus pelanggaran etika dan mematuhi regulasi perlindungan data pribadi.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-4'],
    kategori: 'Keamanan & Etika',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Profesional TI memiliki tanggung jawab moral yang besar karena kode yang ditulis dapat memengaruhi keselamatan publik, privasi, dan keadilan sosial.',
      'UU PDP Indonesia menjamin hak individu atas data pribadinya, mewajibkan pengendali data memiliki dasar hukum sah dan sistem pengamanan memadai.',
      'Etika TI melarang penggunaan keahlian teknologi untuk merusak, mencuri data, atau melanggar hak kekayaan intelektual orang lain.',
    ],
    istilahKunci: [
      { istilah: 'UU PDP', arti: 'Undang-Undang Pelindungan Data Pribadi di Indonesia (UU No. 27 Tahun 2022).' },
      { istilah: 'Hak Cipta Software', arti: 'Hak eksklusif pencipta yang timbul secara otomatis untuk mengatur pemanfaatan kode program komputer.' },
    ],
    quiz: [
      {
        question: 'Regulasi utama di Indonesia yang secara spesifik mengatur hak subjek data dan kewajiban pengendali data pribadi adalah...',
        options: ['UU Ketenagakerjaan', 'UU Pelindungan Data Pribadi (UU PDP No. 27/2022)', 'UU Hak Tanggungan', 'UU Perbankan'],
        correctAnswer: 1,
        explanation: 'UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi adalah payung hukum spesifik untuk privasi dan data pribadi di Indonesia.',
      },
    ],
  },
  {
    id: 15,
    minggu: 15,
    kemampuanAkhir: 'Mengaplikasikan pemahaman dalam studi kasus',
    bahanKajian: 'Presentasi Proyek Mini / Review Tren Teknologi Terkini',
    subTopik: [
      'Sintesis komprehensif materi semester: Hardware, Jaringan, Basis Data, Cloud, dan AI',
      'Presentasi proyek mini kelompok: Analisis arsitektur sistem TI pada studi kasus dunia nyata',
      'Sesi tanya jawab kritis dan peer-review antar kelompok',
      'Umpan balik komprehensif dari dosen pengampu untuk persiapan UAS',
    ],
    metodePembelajaran: 'Presentasi Kelompok',
    pengalamanBelajar: 'Mempresentasikan hasil telaah implementasi teknologi informasi pada studi kasus industri terpilih.',
    kriteriaPenilaian: 'Ketajaman analisis, kejelasan presentasi, kolaborasi tim, dan kemampuan argumentasi teknis.',
    bobotIndikatif: 5,
    cpmkIds: ['CPMK-1', 'CPMK-2', 'CPMK-3', 'CPMK-4'],
    kategori: 'Dasar & Konsep',
    durasi: '3 x 50 Menit (150 Menit)',
    rangkumanMateri: [
      'Presentasi menguji kemampuan holistik mahasiswa dalam menghubungkan teori akademis dengan aplikasi praktis di industri.',
      'Fokus evaluasi pada pemahaman arsitektur sistem, pemilihan teknologi yang rasional, dan kepatuhan terhadap etika privasi.',
    ],
    istilahKunci: [
      { istilah: 'Mini Project Synthesis', arti: 'Penyatuan berbagai topik semester ke dalam satu studi kasus pemecahan masalah komputasi terpadu.' },
    ],
    quiz: [
      {
        question: 'Tujuan utama dari sesi presentasi proyek mini pada Pertemuan ke-15 adalah...',
        options: [
          'Hanya sekadar menghabiskan waktu perkuliahan',
          'Menguji kemampuan sintesis komprehensif mahasiswa dalam menerapkan materi TI ke dalam studi kasus nyata',
          'Menggantikan kehadiran ujian tertulis UAS',
          'Membeli perangkat keras baru untuk kampus',
        ],
        correctAnswer: 1,
        explanation: 'Proyek mini menyatukan konsep hardware, software, jaringan, basis data, dan etika ke dalam analisis menyeluruh.',
      },
    ],
  },
  {
    id: 16,
    minggu: 16,
    kemampuanAkhir: 'Evaluasi Akhir Semester',
    bahanKajian: 'Ujian Akhir Semester (UAS)',
    subTopik: [
      'Evaluasi komprehensif seluruh materi perkuliahan dengan penekanan pada materi pasca-UTS (Minggu 9 s.d. 15)',
      'Ujian tertulis: Soal Esai Analisis, Rancangan Arsitektur Sederhana, dan Etika Hukum TI',
      'Pengujian menyeluruh CPMK-1 s.d. CPMK-4',
      'Bobot penilaian resmi: 35% dari total nilai akhir perkuliahan',
    ],
    metodePembelajaran: 'Ujian Tertulis',
    pengalamanBelajar: 'Menyelesaikan ujian evaluasi akhir semester secara tertulis dan mandiri dengan integritas akademik tinggi.',
    kriteriaPenilaian: 'Rubrik penilaian akademis UAS (bobot terbesar: 35%).',
    bobotIndikatif: 35,
    cpmkIds: ['CPMK-1', 'CPMK-2', 'CPMK-3', 'CPMK-4'],
    kategori: 'Evaluasi',
    durasi: '90 Menit',
    rangkumanMateri: [
      'UAS mencakup: Keamanan Informasi (CIA, Enkripsi, Malware), E-Business/ERP, Cloud Computing (IaaS/PaaS/SaaS), IoT, AI/Data Science, dan Etika/UU PDP/HAKI.',
      'Komponen terbesar dalam sistem penilaian (35%), menentukan kelulusan mata kuliah TI001.',
    ],
    istilahKunci: [
      { istilah: 'Ujian Akhir Semester', arti: 'Asesmen sumatif akhir untuk mengukur ketuntasan seluruh Capaian Pembelajaran Mata Kuliah (CPMK).' },
    ],
    isExam: true,
    quiz: [
      {
        question: 'Berapakah bobot Ujian Akhir Semester (UAS) dalam sistem penilaian mata kuliah Pengantar Teknologi Informasi (TI001)?',
        options: ['20%', '25%', '30%', '35%'],
        correctAnswer: 3,
        explanation: 'Bobot UAS resmi adalah 35%, menjadikannya komponen dengan porsi penilaian tertinggi.',
      },
    ],
  },
];

export const RPS_MEETINGS: MeetingItem[] = RAW_MEETINGS.map((m) => {
  const detail = DETAILED_MEETING_CONTENTS[m.id];
  return {
    ...m,
    detailedContent: detail,
    quiz: detail?.kuisLengkap
      ? detail.kuisLengkap.map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }))
      : m.quiz,
  };
});

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'mhs-1',
    nim: '265920002',
    name: 'KHAYATUN NURUL JANAH',
    email: 'khayatun.nurul@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 92,
    keaktifan: 95,
    uts: 90,
    uas: 92,
    catatanDosen: 'Sangat aktif dalam diskusi arsitektur sistem dan jaringan.',
  },
  {
    id: 'mhs-2',
    nim: '265920004',
    name: 'MUHAMAD HILMAN RASYID',
    email: 'm.hilman.rasyid@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 88,
    keaktifan: 90,
    uts: 86,
    uas: 89,
    catatanDosen: 'Pemahaman basis data SQL sangat kuat dan konsisten.',
  },
  {
    id: 'mhs-3',
    nim: '265920005',
    name: 'MUHAMMAD WAHID ISMAIL',
    email: 'm.wahid.ismail@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 85,
    keaktifan: 88,
    uts: 84,
    uas: 86,
    catatanDosen: 'Baik dalam simulasi topologi jaringan dan konfigurasi IP.',
  },
  {
    id: 'mhs-4',
    nim: '265920007',
    name: 'TIYO FARIDHO',
    email: 'tiyo.faridho@student.univ.ac.id',
    attendance: [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 82,
    keaktifan: 84,
    uts: 80,
    uas: 83,
    catatanDosen: 'Proyek presentasi tren AI terstruktur dan komunikatif.',
  },
  {
    id: 'mhs-5',
    nim: '265920008',
    name: 'KHOLIS',
    email: 'kholis@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 86,
    keaktifan: 85,
    uts: 82,
    uas: 85,
    catatanDosen: 'Cukup teliti dalam latihan konversi bilangan biner & heksa.',
  },
  {
    id: 'mhs-6',
    nim: '265920009',
    name: 'MUHAMMAD AMNUTTAQYUDIN',
    email: 'm.amnuttaqyudin@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, false],
    tugas: 84,
    keaktifan: 82,
    uts: 85,
    uas: 87,
    catatanDosen: 'Sangat baik dalam memahami model IaaS dan PaaS pada sesi cloud.',
  },
  {
    id: 'mhs-7',
    nim: '265920010',
    name: 'MUHAMMAD ZUHRUL ANAM',
    email: 'm.zuhrul.anam@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 90,
    keaktifan: 92,
    uts: 88,
    uas: 91,
    catatanDosen: 'Konsisten, tugas dikumpulkan selalu tepat waktu dan rapi.',
  },
  {
    id: 'mhs-8',
    nim: '265920014',
    name: 'LUXIANO JOVA NOVA',
    email: 'luxiano.jova@student.univ.ac.id',
    attendance: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
    tugas: 87,
    keaktifan: 88,
    uts: 85,
    uas: 88,
    catatanDosen: 'Kritis saat sesi analisis kasus keamanan siber & etika.',
  },
];
