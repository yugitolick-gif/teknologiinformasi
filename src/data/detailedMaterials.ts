export interface MateriSection {
  judul: string;
  ringkasan: string;
  konten: string[];
  poinKunci: string[];
  contohKasus?: string;
  referensiBab?: string;
}

export interface QuizQuestionDetailed {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subTopik: string;
}

export interface DetailedMeetingContent {
  meetingId: number;
  tujuanInstruksional: string[];
  modulMateri: MateriSection[];
  kuisLengkap: QuizQuestionDetailed[];
  panduanBelajar: string;
  linkReferensi: string;
}

export const DETAILED_MEETING_CONTENTS: Record<number, DetailedMeetingContent> = {
  1: {
    meetingId: 1,
    tujuanInstruksional: [
      'Menjelaskan definisi, evolusi, dan perbedaan esensial antara Data, Informasi, dan Pengetahuan.',
      'Mengidentifikasi tonggak sejarah 5 generasi komputer dari tabung vakum hingga era AI/Kuantum.',
      'Menganalisis dampak Hukum Moore terhadap eksponensialitas teknologi informasi di masyarakat.',
      'Memahami aturan kontrak perkuliahan dan kriteria kelulusan mata kuliah TI001.',
    ],
    modulMateri: [
      {
        judul: '1. Hakikat Teknologi Informasi dan Hierarki DIKW',
        ringkasan: 'Perbedaan mendasar antara Data, Informasi, Pengetahuan (Knowledge), dan Kebijaksanaan (Wisdom).',
        konten: [
          'Teknologi Informasi (TI) secara komprehensif didefinisikan sebagai kombinasi teknologi komputasi (perangkat keras dan perangkat lunak) dengan teknologi komunikasi (jaringan, telepon, satelit, internet) untuk memproses, menyimpan, melindungi, dan mendistribusikan data.',
          'Hierarki DIKW (Data -> Information -> Knowledge -> Wisdom): Data adalah fakta mentah tanpa konteks (contoh: angka 39.5). Informasi adalah data yang telah diorganisasi dan diberi konteks sehingga bermakna (contoh: "Suhu tubuh pasien adalah 39.5°C"). Pengetahuan adalah asimilasi informasi dengan pengalaman praktis (contoh: "Suhu 39.5°C menandakan demam tinggi dan butuh antipiretik"). Wisdom adalah penerapan etis dari pengetahuan untuk pengambilan keputusan strategis.',
          'Teknologi Informasi modern bukan sekadar otomasi administrasi perkantoran, melainkan diferensiator strategis dan pendorong transformasi digital.',
        ],
        poinKunci: [
          'Data = Fakta mentah',
          'Informasi = Data berkonteks',
          'Pengetahuan = Pemahaman terapan',
          'Wisdom = Keputusan berbasis nilai',
        ],
        contohKasus: 'Di Tokopedia/Shopee, data transaksi mentah jutaan pembeli diolah menjadi informasi tren produk terlaris, lalu menjadi pengetahuan rekomendasi mesin personalisasi AI.',
        referensiBab: "O'Brien & Marakas (2011), Bab 1: Foundations of Information Systems in Business",
      },
      {
        judul: '2. Evolusi Lima Generasi Komputer & Hukum Moore',
        ringkasan: 'Kronologi perkembangan komponen switching elektronika dan eksponensialitas komputasi.',
        konten: [
          'Generasi I (1940-1956): Menggunakan Tabung Vakum (Vacuum Tube). Ukuran sangat besar, mengonsumsi ribuan watt listrik, menghasilkan panas luar biasa, dan sering rusak. Bahasa pemrograman masih bahasa mesin tingkat rendah.',
          'Generasi II (1956-1963): Menggunakan Transistor. Ditemukan oleh Shockley, Bardeen, dan Brattain di Bell Labs. Transistor membuat komputer ratusan kali lebih kecil, lebih andal, dan mulai mendukung bahasa assembly serta FORTRAN/COBOL.',
          'Generasi III (1964-1971): Menggunakan Integrated Circuit (IC / Sirkuit Terpadu) yang dirintis Jack Kilby dan Robert Noyce. Ribuan transistor digabungkan pada satu keping semikonduktor silikon.',
          'Generasi IV (1971-Sekarang): Menggunakan Mikroprosesor VLSI (Very Large Scale Integration) dan ULSI. Seluruh CPU berada pada satu chip tunggal (dimulai dari Intel 4004 hingga prosesor modern berarsitektur multi-core miliaran transistor).',
          'Generasi V (Masa Depan & Sekarang): Berbasis Artificial Intelligence, komputasi paralel masif, komputasi kuantum (qubit), dan antarmuka pemrosesan bahasa alami.',
          'Hukum Moore (Gordon Moore, 1965): Jumlah transistor pada sebuah chip silikon berlipat ganda kira-kira setiap 18-24 bulan dengan biaya relatif tetap.',
        ],
        poinKunci: [
          'Gen 1: Tabung Vakum',
          'Gen 2: Transistor',
          'Gen 3: Integrated Circuit (IC)',
          'Gen 4: Mikroprosesor VLSI',
          'Gen 5: AI & Quantum',
          'Hukum Moore memprediksi pelipatgandaan transistor setiap ~2 tahun',
        ],
        contohKasus: 'Komputer ENIAC (1945) seberat 30 ton dengan 18.000 tabung vakum memiliki daya komputasi yang jauh lebih rendah daripada smartphone di saku Anda hari ini.',
        referensiBab: 'Williams & Sawyer (2014), Bab 1; Morley & Parker (2017), Bab 1',
      },
    ],
    kuisLengkap: [
      {
        id: 'q1-1',
        question: 'Komponen elektronik utama yang menjadi penanda lahirnya komputer Generasi Pertama (1940-an) adalah...',
        options: ['Tabung Vakum (Vacuum Tube)', 'Transistor Silikon', 'Mikroprosesor', 'Optical Chip'],
        correctAnswer: 0,
        explanation: 'Generasi Pertama komputer (seperti ENIAC dan UNIVAC) mengandalkan tabung vakum untuk sirkuit dan drum magnetik untuk memori.',
        subTopik: 'Evolusi Generasi Komputer',
      },
      {
        id: 'q1-2',
        question: 'Dalam hierarki piramida DIKW, manakah urutan pemrosesan yang benar dari tingkat terendah hingga tertinggi?',
        options: [
          'Information -> Data -> Wisdom -> Knowledge',
          'Data -> Information -> Knowledge -> Wisdom',
          'Knowledge -> Data -> Information -> Wisdom',
          'Data -> Knowledge -> Information -> Wisdom',
        ],
        correctAnswer: 1,
        explanation: 'Urutan baku piramida kognitif adalah Data (mentah) -> Information (bermakna) -> Knowledge (konseptual/terapan) -> Wisdom (kebijaksanaan kontekstual).',
        subTopik: 'Hierarki DIKW',
      },
      {
        id: 'q1-3',
        question: 'Hukum Moore yang dikemukakan oleh Gordon Moore pada tahun 1965 menyatakan bahwa...',
        options: [
          'Kecepatan download internet akan naik 100% setiap bulan',
          'Jumlah transistor pada sebuah chip semikonduktor akan berlipat ganda kira-kira setiap 2 tahun',
          'Ukuran komputer akan membesar seiring meningkatnya kapasitas memori RAM',
          'Harga perangkat keras komputer akan selalu naik 50% setiap tahunnya',
        ],
        correctAnswer: 1,
        explanation: 'Hukum Moore adalah observasi empiris bahwa kerapatan transistor pada sirkuit terpadu berlipat ganda sekitar setiap 18-24 bulan.',
        subTopik: 'Hukum Moore',
      },
      {
        id: 'q1-4',
        question: 'Manakah di bawah ini yang merupakan contoh bentuk "Informasi" dan bukan sekadar "Data"?',
        options: [
          'Angka terisolasi "140"',
          '"Rata-rata kecepatan berkendara di Jalan Tol Cipularang adalah 140 km/jam, melebihi batas legal"',
          'Karakter ASCII acak "X!9&"',
          'Nilai biner mentah 11001010 tanpa deskripsi variabel',
        ],
        correctAnswer: 1,
        explanation: 'Data menjadi Informasi ketika diolah, diberi konteks, satuan, dan makna yang jelas bagi pembacanya.',
        subTopik: 'Data vs Informasi',
      },
    ],
    panduanBelajar: 'Pelajari slide pertemuan 1 dan baca O\'Brien Bab 1. Catat nama-nama tokoh kunci (Charles Babbage, Alan Turing, John von Neumann, Gordon Moore).',
    linkReferensi: "O'Brien & Marakas (2011), Bab 1",
  },

  2: {
    meetingId: 2,
    tujuanInstruksional: [
      'Menjelaskan arsitektur Von Neumann dan fungsi subsistem CPU (ALU, CU, Register).',
      'Menguraikan 4 tahapan siklus mesin (Fetch, Decode, Execute, Store).',
      'Menganalisis hierarki memori berdasarkan perbandingan kecepatan akses, kapasitas, dan biaya per gigabyte.',
      'Membedakan peran bus sistem (Data Bus, Address Bus, Control Bus).',
    ],
    modulMateri: [
      {
        judul: '1. Arsitektur Komputer Von Neumann & Subsistem CPU',
        ringkasan: 'Prinsip program tersimpan (stored-program concept) dan tiga bagian vital CPU.',
        konten: [
          'Arsitektur Von Neumann diusulkan oleh John von Neumann pada tahun 1945. Prinsip revolusionernya adalah "Stored-Program Concept", yaitu instruksi program dan data disimpan bersama-sama di dalam memori utama (RAM) yang sama.',
          'CPU (Central Processing Unit) memiliki 3 bagian utama: (1) ALU (Arithmetic Logic Unit) yang melakukan operasi hitung matematika (+, -, *, /) dan logika boolean (AND, OR, NOT, perbandingan >, <, =); (2) Control Unit (CU) yang bertindak sebagai "otak pengatur", mengarahkan aliran instruksi, mendekode kode operasi, dan menyinkronkan aktivitas dengan denyut clock generator; (3) Register, memori internal berukuran sangat kecil namun berkecepatan paling tinggi di seluruh sistem komputer (contoh: Instruction Register, Program Counter, Accumulator).',
        ],
        poinKunci: [
          'Stored-program concept = data & program di memori yang sama',
          'ALU = kalkulasi & logika',
          'CU = konduktor instruksi',
          'Register = memori internal tercepat CPU',
        ],
        contohKasus: 'Saat Anda menjalankan program kalkulator, CU mengambil instruksi penjumlahan dari RAM, menyimpannya di Register, meminta ALU melakukan penambahan dua angka, lalu menyimpan hasilnya ke Register penampung.',
        referensiBab: 'Morley & Parker (2017), Bab 2: The System Unit: Processing and Memory',
      },
      {
        judul: '2. Siklus Mesin (Machine Cycle) & Hierarki Memori',
        ringkasan: 'Empat tahap pemrosesan instruksi dan trade-off kecepatan memori.',
        konten: [
          'Setiap instruksi mesin dieksekusi melalui 4 langkah berulang: (1) Fetch: CU mengambil instruksi dari alamat memori yang ditunjuk oleh Program Counter (PC); (2) Decode: CU menerjemahkan instruksi menjadi sinyal kontrol elektronik; (3) Execute: ALU atau komponen terkait menjalankan aksi; (4) Store: Menuliskan hasil kembali ke register internal atau RAM.',
          'Hierarki Memori Komputer (dari tercepat ke terlambat): (1) CPU Register (< 1 ns); (2) Cache L1, L2, L3 (1 - 15 ns, terbuat dari SRAM statis); (3) Main Memory / RAM (DRAM, 50 - 100 ns); (4) Non-Volatile Flash / NVMe SSD (mikrodetik); (5) Hard Disk Magnetik / HDD (milidetik); (6) Tape / Cloud Cold Archive (detik).',
          'Karakteristik Volatile vs Non-Volatile: RAM bersifat volatile (isi data lenyap begitu listrik mati). SSD/HDD bersifat non-volatile (data tetap tersimpan permanen saat daya dipadamkan).',
        ],
        poinKunci: [
          'Machine Cycle = Fetch -> Decode -> Execute -> Store',
          'Register > Cache > RAM > SSD > HDD',
          'Volatile = butuh daya kontinu (RAM)',
          'Non-Volatile = simpan permanen (SSD/HDD)',
        ],
        contohKasus: 'CPU modern memiliki Cache L1 berukuran kecil (~64 KB per core) untuk menyimpan instruksi yang paling sering diulang agar CPU tidak perlu menunggu jeda akses RAM yang 100x lebih lambat.',
        referensiBab: 'Williams & Sawyer (2014), Bab 2; Morley & Parker (2017), Bab 2',
      },
    ],
    kuisLengkap: [
      {
        id: 'q2-1',
        question: 'Prinsip mendasar dari arsitektur komputer Von Neumann adalah...',
        options: [
          'Data dan instruksi program disimpan secara terpisah pada media fisik yang berbeda',
          'Instruksi program dan data disimpan bersama-sama di dalam memori utama yang sama',
          'CPU tidak memerlukan Control Unit jika menggunakan RAM DDR5',
          'Komputer hanya boleh memiliki satu jenis memori non-volatile',
        ],
        correctAnswer: 1,
        explanation: 'Inti dari konsep Von Neumann adalah "stored-program concept", di mana program dan data dimuat ke ruang alamat memori utama yang sama.',
        subTopik: 'Arsitektur Von Neumann',
      },
      {
        id: 'q2-2',
        question: 'Empat tahapan dalam satu putaran siklus mesin (machine cycle) CPU secara berurutan adalah...',
        options: [
          'Compile -> Link -> Build -> Run',
          'Fetch -> Decode -> Execute -> Store',
          'Input -> Processing -> Output -> Distribution',
          'Boot -> BIOS -> OS -> App',
        ],
        correctAnswer: 1,
        explanation: 'Siklus mesin CPU terdiri dari pengambilan instruksi (Fetch), penerjemahan (Decode), pelaksanaan instruksi (Execute), dan penulisan hasil (Store).',
        subTopik: 'Siklus Mesin CPU',
      },
      {
        id: 'q2-3',
        question: 'Di antara pilihan media penyimpanan berikut, manakah yang memiliki latensi akses paling rendah (kecepatan paling tinggi)?',
        options: ['DDR5 SDRAM', 'Register CPU', 'Cache Memory L3', 'NVMe PCIe Gen 4 SSD'],
        correctAnswer: 1,
        explanation: 'Register berada langsung di dalam sirkuit inti prosesor dan beroperasi setara clock frekuensi CPU, menjadikannya memori tercepat dalam hierarki.',
        subTopik: 'Hierarki Memori',
      },
      {
        id: 'q2-4',
        question: 'Bus sistem yang bertugas menentukan lokasi fisik di memori tempat data akan dibaca atau ditulis dinamakan...',
        options: ['Data Bus', 'Address Bus', 'Power Bus', 'Expansion Bus'],
        correctAnswer: 1,
        explanation: 'Address Bus membawa informasi alamat memori (lokasi penyimpanan), sedangkan Data Bus membawa isi bit data aktual.',
        subTopik: 'Bus Sistem',
      },
    ],
    panduanBelajar: 'Gunakan diagram arsitektur Von Neumann dan pelajari letak register, ALU, dan CU. Pahami mengapa cache L1/L2/L3 dibuat terintegrasi di chip CPU.',
    linkReferensi: 'Morley & Parker (2017), Bab 2',
  },

  3: {
    meetingId: 3,
    tujuanInstruksional: [
      'Mengklasifikasikan perangkat lunak ke dalam Perangkat Lunak Sistem (OS, Driver, Utility) dan Aplikasi.',
      'Menjelaskan empat fungsi utama Sistem Operasi (Manajemen Proses, Memori, Berkas, I/O).',
      'Membandingkan arsitektur kernel Monolithic vs Microkernel.',
      'Memahami implikasi hukum berbagai model lisensi perangkat lunak (Proprietary, Open Source MIT/GPL, SaaS).',
    ],
    modulMateri: [
      {
        judul: '1. Taksonomi Perangkat Lunak & Peran Sistem Operasi',
        ringkasan: 'Abstraksi perangkat keras dan klasifikasi software sistem vs aplikasi.',
        konten: [
          'Perangkat Lunak (Software) adalah kumpulan instruksi terprogram yang memberitahu perangkat keras apa yang harus dikerjakan. Terbagi menjadi dua kategori utama: (1) System Software: perangkat lunak yang mengelola dan memfasilitasi operasi internal hardware (Sistem Operasi, Device Driver, Firmware UEFI/BIOS, dan Utility Disk); (2) Application Software: program yang dirancang untuk menyelesaikan kebutuhan tugas spesifik pengguna akhir (Word processor, Spreadsheet, Web Browser, ERP).',
          'Sistem Operasi (OS) bertindak sebagai perantara dan manajer sumber daya antara hardware dan software aplikasi. Tanpa OS, setiap programmer harus menulis kode mesin rumit hanya untuk menggerakkan head hard disk atau menampilkan piksel di layar.',
        ],
        poinKunci: [
          'System Software = penunjang operasional sistem',
          'Application Software = produktivitas pengguna akhir',
          'OS = manajer sumber daya & lapisan abstraksi hardware',
        ],
        contohKasus: 'Ketika Anda mencetak dokumen PDF di Google Chrome, Chrome meminta OS mencetak. OS menggunakan Device Driver printer untuk menerjemahkan dokumen ke perintah mekanik printer.',
        referensiBab: 'Williams & Sawyer (2014), Bab 3: Software: Tools for Productivity and Creativity',
      },
      {
        judul: '2. Empat Fungsi Inti OS & Model Lisensi Perangkat Lunak',
        ringkasan: 'Manajemen proses, virtual memory paging, sistem berkas, serta hak cipta software.',
        konten: [
          'Empat Fungsi Fundamental OS: (1) Process Management: penjadwalan multitasking (preemptive scheduling), alokasi waktu CPU via algoritma Round Robin atau Priority; (2) Memory Management: mengalokasikan ruang RAM dan mengelola Virtual Memory (Paging & Swapping) saat RAM fisik penuh; (3) File System Management: mengorganisir data dalam direktori hierarkis (NTFS, ext4, APFS) serta hak akses (permissions); (4) Device & I/O Management: komunikasi dengan periferal melalui driver dan interrupt handling.',
          'Model Lisensi Perangkat Lunak: (a) Proprietary/Komersial: kode sumber ditutup, pengguna hanya membeli hak guna terbatas melalui EULA (End User License Agreement), misal Microsoft Windows; (b) Open Source Permissive (MIT, Apache 2.0): kode sumber terbuka bebas dimodifikasi dan dipakai untuk proyek komersial; (c) Open Source Copyleft (GNU GPL): mensyaratkan setiap karya turunan wajib ikut dirilis sebagai open source; (d) Freeware: gratis digunakan tetapi kode sumber tetap tertutup.',
        ],
        poinKunci: [
          'Multitasking diatur oleh Process Scheduler',
          'Virtual memory mencegah crash saat RAM fisik habis',
          'Lisensi MIT = sangat bebas',
          'Lisensi GPL = mewajibkan kode turunan tetap open source (copyleft)',
        ],
        contohKasus: 'Sistem operasi Android berbasis kernel Linux yang berlisensi open source, dikombinasikan dengan layanan proprietary Google Mobile Services (GMS).',
        referensiBab: "O'Brien & Marakas (2011), Bab 4; Morley & Parker (2017), Bab 3",
      },
    ],
    kuisLengkap: [
      {
        id: 'q3-1',
        question: 'Program komputer yang berfungsi sebagai jembatan komunikasi langsung antara sistem operasi dengan perangkat keras periferal (seperti kartu grafis atau printer) disebut...',
        options: ['Compiler', 'Device Driver', 'Hypervisor', 'Assembler'],
        correctAnswer: 1,
        explanation: 'Device Driver adalah perangkat lunak sistem khusus yang memungkinkan OS berkomunikasi dengan perangkat keras tertentu.',
        subTopik: 'Perangkat Lunak Sistem',
      },
      {
        id: 'q3-2',
        question: 'Fitur sistem operasi yang memanfaatkan sebagian ruang penyimpanan sekunder (SSD/HDD) sebagai perluasan saat memori RAM fisik hampir penuh disebut...',
        options: ['Cache L1', 'Virtual Memory (Paging)', 'Direct Memory Access', 'Disk Defragmenter'],
        correctAnswer: 1,
        explanation: 'Virtual Memory mengombinasikan RAM dengan ruang disk sekunder (pagefile/swap) untuk menampung program saat RAM fisik penuh.',
        subTopik: 'Fungsi Sistem Operasi',
      },
      {
        id: 'q3-3',
        question: 'Karakteristik utama dari lisensi perangkat lunak Open Source jenis "Copyleft" (seperti GNU General Public License / GPL) adalah...',
        options: [
          'Pengguna wajib membayar royalti tahunan kepada pembuat asli',
          'Karya turunan yang memodifikasi kode tersebut wajib dirilis kembali dengan lisensi open source yang sama',
          'Kode sumber tidak boleh dilihat atau dibaca oleh publik',
          'Hanya boleh dijalankan di sistem operasi Linux',
        ],
        correctAnswer: 1,
        explanation: 'Klausul "copyleft" pada lisensi GPL mewajibkan setiap kode modifikasi atau turunan tetap bersifat open source bebas biaya.',
        subTopik: 'Lisensi Perangkat Lunak',
      },
      {
        id: 'q3-4',
        question: 'Manakah dari komponen berikut yang merupakan bagian inti (core) dari sistem operasi yang selalu dimuat di RAM dan mengontrol akses perangkat keras?',
        options: ['Shell / Terminal', 'Kernel', 'Web Browser', 'File Explorer'],
        correctAnswer: 1,
        explanation: 'Kernel adalah inti dari OS yang mengontrol CPU, memori, dan interaksi hardware tingkat rendah.',
        subTopik: 'Arsitektur OS',
      },
    ],
    panduanBelajar: 'Pahami perbedaan antara sistem operasi monolitik (Linux) dan arsitektur hybrid (Windows NT). Kaji perbandingan lisensi MIT vs GPL.',
    linkReferensi: 'Williams & Sawyer (2014), Bab 3',
  },

  4: {
    meetingId: 4,
    tujuanInstruksional: [
      'Mengonversi bilangan antar sistem desimal, biner, oktal, dan heksadesimal dengan akurat.',
      'Melakukan operasi aritmatika biner dasar (penjumlahan dan pengurangan biner).',
      'Memahami mekanisme representasi data karakter (ASCII dan Unicode UTF-8).',
      'Menjelaskan representasi data multimedia digital (citra piksel RGB dan audio digital sampling).',
    ],
    modulMateri: [
      {
        judul: '1. Sistem Bilangan Komputer: Desimal, Biner, dan Heksadesimal',
        ringkasan: 'Fondasi matematika komputasi digital berbasis tegangan logika dua keadaan.',
        konten: [
          'Komputer digital bekerja secara elektronis menggunakan sakelar transistor yang hanya mengenal dua keadaan: ON (bertegangan tinggi / 1) dan OFF (bertegangan rendah / 0). Angka tunggal 0 atau 1 ini disebut Bit (Binary Digit).',
          'Sistem Desimal (Basis 10): Menggunakan 10 simbol (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) dengan bobot posisi 10^n.',
          'Sistem Biner (Basis 2): Menggunakan 2 simbol (0 dan 1) dengan bobot posisi 2^n (..., 128, 64, 32, 16, 8, 4, 2, 1).',
          'Sistem Heksadesimal (Basis 16): Menggunakan 16 simbol (0-9 dan A=10, B=11, C=12, D=13, E=14, F=15). Heksadesimal sangat disukai dalam ilmu komputer karena 1 digit heksa persis mewakili 4 bit biner (1 nibble). Contoh: Biner 11111111 cukup ditulis FF dalam heksadesimal.',
          'Contoh Konversi: Desimal 42 ke Biner: 32 + 8 + 2 = 2^5 + 2^3 + 2^1 -> Biner: 00101010. Dalam heksadesimal: 0010 = 2, 1010 = A -> 0x2A.',
        ],
        poinKunci: [
          '1 Byte = 8 Bit',
          '1 Nibble = 4 Bit = 1 digit Heksadesimal',
          'Basis 2: bobot 2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128',
          'Heksa mempermudah pembacaan alamat memori dan kode warna RGB (contoh #FFFFFF)',
        ],
        contohKasus: 'Kode warna web CSS `#FF0000` terdiri dari 3 pasang heksadesimal: Merah (FF = 255), Hijau (00 = 0), Biru (00 = 0), menghasilkan warna merah murni.',
        referensiBab: 'Morley & Parker (2017), Bab 2; Williams & Sawyer (2014), Bab 2',
      },
      {
        judul: '2. Pengkodean Teks (ASCII & Unicode) dan Data Multimedia',
        ringkasan: 'Bagaimana komputer mengonversi teks, warna gambar, dan gelombang suara menjadi deretan bit.',
        konten: [
          'Standar ASCII (American Standard Code for Information Interchange): Skema pengkodean 7-bit yang mewakili 128 karakter (huruf Latin kapital, kecil, angka, dan karakter kontrol). Huruf "A" = 65 desimal = 01000001 biner. Huruf "a" = 97 desimal = 01100001 biner.',
          'Standar Unicode (UTF-8, UTF-16): Standar global yang mengatasi keterbatasan ASCII. Unicode mampu mengkodekan lebih dari 149.000 karakter dari seluruh bahasa dunia (Aksara Jawa, Arab, Kanji, Sirilik) serta ribuan Emoji modern.',
          'Representasi Citra Digital: Gambar digital tersusun dari matriks piksel. Pada sistem True Color 24-bit, setiap piksel memiliki 3 channel warna: Red (8-bit = 256 level), Green (8-bit), Blue (8-bit), menghasilkan 256 x 256 x 256 = 16,7 juta variasi warna.',
          'Representasi Audio Digital: Gelombang analog diubah ke digital via ADC (Analog-to-Digital Converter) melalui dua parameter: Sampling Rate (contoh: audio CD = 44.1 kHz, artinya gelombang diukur 44.100 kali per detik) dan Bit Depth (contoh: 16-bit atau 24-bit per sampel).',
        ],
        poinKunci: [
          'ASCII: 7-bit (128 karakter, alfabet Latin dasar)',
          'Unicode UTF-8: Standar universal multibyte untuk seluruh bahasa & emoji',
          'True Color: 24-bit (8-bit R, 8-bit G, 8-bit B = 16.7 juta warna)',
          'Audio Digital: Ditentukan oleh Sampling Rate dan Bit Depth',
        ],
        contohKasus: 'Saat Anda mengirim emoji 👍 di WhatsApp, perangkat Anda mengirimkan urutan byte Unicode UTF-8 `F0 9F 91 8D` yang kemudian dirender sebagai ikon jempol oleh font sistem penerima.',
        referensiBab: 'Williams & Sawyer (2014), Bab 2',
      },
    ],
    kuisLengkap: [
      {
        id: 'q4-1',
        question: 'Berapakah nilai desimal dari bilangan biner 8-bit `00101101`?',
        options: ['37', '45', '53', '61'],
        correctAnswer: 1,
        explanation: '32 (2^5) + 8 (2^3) + 4 (2^2) + 1 (2^0) = 32 + 8 + 4 + 1 = 45.',
        subTopik: 'Konversi Biner ke Desimal',
      },
      {
        id: 'q4-2',
        question: 'Bilangan heksadesimal `0x3F` jika dikonversikan ke dalam bilangan desimal bernilai...',
        options: ['57', '63', '71', '255'],
        correctAnswer: 1,
        explanation: '(3 * 16^1) + (F * 16^0) = (3 * 16) + (15 * 1) = 48 + 15 = 63.',
        subTopik: 'Konversi Heksadesimal ke Desimal',
      },
      {
        id: 'q4-3',
        question: 'Mengapa standar pengkodean teks Unicode (seperti UTF-8) dikembangkan untuk menggantikan standar ASCII klasik?',
        options: [
          'Karena ASCII tidak bisa dijalankan pada prosesor 64-bit',
          'Karena ASCII hanya 7-bit dan terbatas pada 128 karakter alfabet Latin, tidak mampu menampung aksara non-Latin dan emoji',
          'Karena Unicode mengompres file teks menjadi berukuran 0 byte',
          'Karena ASCII dilarang oleh konsorsium web internasional',
        ],
        correctAnswer: 1,
        explanation: 'ASCII 7-bit hanya menampung 128 karakter. Unicode diciptakan agar semua bahasa dunia dan simbol dapat dikodekan dalam standar tunggal.',
        subTopik: 'ASCII vs Unicode',
      },
      {
        id: 'q4-4',
        question: 'Pada format warna digital 24-bit True Color (RGB), berapa banyak variasi kombinasi warna yang dapat dihasilkan?',
        options: ['65.536 warna', '256 warna', 'Kira-kira 16,7 juta warna (256^3)', 'Hanya 1024 warna'],
        correctAnswer: 2,
        explanation: 'Setiap channel R, G, B memiliki 8 bit (256 tingkat intensitas). Total warna = 256 x 256 x 256 = 16.777.216 warna (~16,7 juta warna).',
        subTopik: 'Representasi Multimedia',
      },
    ],
    panduanBelajar: 'Coba gunakan Lab Interaktif Biner di tab Lab aplikasi ini. Klik bit untuk melihat perubahan desimal, heksa, dan karakter ASCII secara seketika.',
    linkReferensi: 'Morley & Parker (2017), Bab 2',
  },

  5: {
    meetingId: 5,
    tujuanInstruksional: [
      'Mengklasifikasikan jaringan komputer berdasarkan jangkauan geografis (PAN, LAN, MAN, WAN).',
      'Menganalisis karakteristik media transmisi kabel (UTP/STP, Koaksial, Fiber Optik) dan nirkabel (Wi-Fi, Bluetooth, Seluler).',
      'Membandingkan topologi fisik jaringan (Star, Bus, Ring, Mesh, Tree) dalam aspek skalabilitas dan single point of failure.',
      'Membedakan peran perangkat keras jaringan (Switch, Router, Access Point, Modem).',
    ],
    modulMateri: [
      {
        judul: '1. Klasifikasi Jaringan dan Media Transmisi Data',
        ringkasan: 'Cakupan geografis jaringan dan karakteristik media guided vs unguided.',
        konten: [
          'Jaringan Komputer adalah interkoneksi dua atau lebih komputer mandiri melalui media transmisi untuk berbagi sumber daya (file, printer, koneksi internet) dan bertukar data.',
          'Klasifikasi Geografis: (1) PAN (Personal Area Network): radius < 10 meter (Bluetooth smartwatch/headphone); (2) LAN (Local Area Network): satu ruangan, gedung kampus, atau kantor (jarak hingga ratusan meter); (3) MAN (Metropolitan Area Network): mencakup satu kota (jaringan TV kabel kota, e-government pemda); (4) WAN (Wide Area Network): mencakup antar negara atau benua (Internet adalah WAN terbesar di dunia).',
          'Media Transmisi Guided (Kabel): (a) Twisted Pair (UTP Cat5e/Cat6): kabel tembaga berpasangan terpilin untuk mengurangi interferensi elektromagnetik (jarak maks 100 meter, kecepatan 1 Gbps - 10 Gbps); (b) Coaxial: kabel tembaga dengan pelindung foil (TV kabel); (c) Fiber Optic: inti kaca silika yang mentransmisikan pulsa cahaya inframerah (sangat cepat, minim redaman, jarak puluhan kilometer, kebal interferensi gelombang elektromagnetik).',
          'Media Transmisi Unguided (Nirkabel): Gelombang Radio (Wi-Fi 802.11, Bluetooth), Gelombang Mikro (Microwave Tower line-of-sight), dan Komunikasi Satelit (LEO seperti Starlink, Geostasioner).',
        ],
        poinKunci: [
          'LAN = gedung/kampus, WAN = global/antar-benua',
          'Kabel UTP maksimal jarak 100 meter tanpa repeater',
          'Fiber Optik menyalurkan pulsa cahaya, kebal gangguan petir/elektromagnetik',
          'Wi-Fi menggunakan frekuensi 2.4 GHz (jangkauan luas) dan 5 GHz (kecepatan tinggi)',
        ],
        contohKasus: 'Kabel bawah laut fiber optik lintas samudra (Subsea Cables) menghubungkan pusat data Indonesia ke Singapura dan Amerika Serikat membawa 99% lalu lintas data internet antar benua.',
        referensiBab: "O'Brien & Marakas (2011), Bab 6; Williams & Sawyer (2014), Bab 5",
      },
      {
        judul: '2. Topologi Jaringan & Perangkat Keras Penghubung',
        ringkasan: 'Struktur logis/fisik susunan node dan fungsi Switch vs Router.',
        konten: [
          'Topologi Jaringan: (1) Topologi Star: Semua simpul terhubung ke sentral konsentrator (Switch). Paling populer di kantor. Kelebihan: jika 1 kabel putus, node lain tetap bekerja normal. Kelemahan: switch pusat menjadi single point of failure; (2) Topologi Bus: Menggunakan kabel utama tunggal (backbone) dengan terminator di kedua ujungnya. Murah, tetapi jika kabel utama putus, seluruh jaringan lumpuh; (3) Topologi Ring: Node membentuk lingkaran tertutup; token dilewatkan berurutan; (4) Topologi Mesh: Setiap node memiliki koneksi langsung point-to-point ke node lain (Full Mesh: n*(n-1)/2 koneksi). Sangat tahan banting (fault-tolerant) namun paling mahal.',
          'Perangkat Keras Jaringan: (a) Switch: Bekerja pada Layer 2 (Data Link). Meneruskan frame data hanya ke port perangkat tujuan spesifik berdasarkan MAC Address (Media Access Control); (b) Router: Bekerja pada Layer 3 (Network). Menghubungkan dua jaringan yang berbeda subnet/IP dan menentukan rute paket terbaik (routing table) antar jaringan LAN ke WAN/Internet; (c) Access Point: Menyediakan konektivitas nirkabel Wi-Fi ke jaringan kabel LAN.',
        ],
        poinKunci: [
          'Topologi Star adalah standar de-facto jaringan perkantoran modern',
          'Topologi Mesh menawarkan redundansi dan ketahanan tertinggi',
          'Switch memfilter lalu lintas berdasarkan MAC Address',
          'Router memfilter dan mengarahkan rute berdasarkan IP Address',
        ],
        contohKasus: 'Di lab komputer kampus, semua PC terhubung via kabel UTP ke sebuah Switch 24-Port (Topologi Star). Switch tersebut kemudian dihubungkan ke Router gerbang utama (Gateway) untuk akses internet.',
        referensiBab: 'Morley & Parker (2017), Bab 4',
      },
    ],
    kuisLengkap: [
      {
        id: 'q5-1',
        question: 'Perbedaan operasional mendasar antara perangkat Switch dan Router dalam jaringan komputer adalah...',
        options: [
          'Switch hanya untuk koneksi internet nirkabel, sedangkan Router hanya memakai kabel serat optik',
          'Switch meneruskan frame data di dalam satu segmen LAN menggunakan MAC address, sedangkan Router menghubungkan antar-jaringan berbeda menggunakan IP address',
          'Router tidak dapat membaca alamat IP apapun',
          'Switch berfungsi menggantikan kabel listrik pada komputer server',
        ],
        correctAnswer: 1,
        explanation: 'Switch bekerja pada Data Link Layer (Layer 2) berbasis MAC Address untuk jaringan lokal, sementara Router bekerja pada Network Layer (Layer 3) berbasis IP Address untuk merutekan paket antar-jaringan.',
        subTopik: 'Perangkat Jaringan',
      },
      {
        id: 'q5-2',
        question: 'Media transmisi kabel yang menggunakan bahan kaca tipis murni dan mentransmisikan sinyal informasi dalam wujud berkas pulsa cahaya dinamakan...',
        options: ['Kabel Koaksial RG-6', 'Kabel UTP Kategori 5e', 'Fiber Optic Cable', 'Kabel Tembaga STP'],
        correctAnswer: 2,
        explanation: 'Fiber Optic menggunakan serat kaca sebagai media perambatan pulsa cahaya inframerah dengan kecepatan dan bandwidth sangat tinggi.',
        subTopik: 'Media Transmisi',
      },
      {
        id: 'q5-3',
        question: 'Manakah jenis topologi jaringan yang paling tangguh (fault-tolerant) karena setiap simpul memiliki sambungan langsung ke semua simpul lainnya?',
        options: ['Topologi Bus', 'Topologi Star', 'Topologi Full Mesh', 'Topologi Ring'],
        correctAnswer: 2,
        explanation: 'Topologi Mesh penuh memiliki banyak jalur alternatif sehingga jika salah satu kabel putus, paket data tetap dapat menemukan jalur lain.',
        subTopik: 'Topologi Jaringan',
      },
      {
        id: 'q5-4',
        question: 'Jarak transmisi maksimum teoritis untuk segmen kabel jaringan UTP (Unshielded Twisted Pair) tanpa menggunakan repeater/switch tambahan adalah...',
        options: ['10 meter', '100 meter', '1.000 meter (1 km)', '10.000 meter'],
        correctAnswer: 1,
        explanation: 'Standar spesifikasi IEEE 802.3 Ethernet membatasi panjang kabel UTP tembaga maksimal 100 meter untuk menjaga integritas sinyal listrik.',
        subTopik: 'Karakteristik Kabel UTP',
      },
    ],
    panduanBelajar: 'Buka Lab Topologi di modul Lab Interaktif untuk mencoba pengiriman ping dan simulasi pemutusan node kabel sentral.',
    linkReferensi: "O'Brien & Marakas (2011), Bab 6",
  },

  6: {
    meetingId: 6,
    tujuanInstruksional: [
      'Membedakan konsep infrastruktur Internet dan layanan World Wide Web (WWW).',
      'Menjelaskan model 4 layer protokol TCP/IP dan 7 layer OSI.',
      'Menguraikan format pengalamatan IPv4 vs IPv6 dan cara kerja Domain Name System (DNS).',
      'Menjelaskan alur protokol HTTP/HTTPS dan arsitektur Client-Server pada aplikasi web modern.',
    ],
    modulMateri: [
      {
        judul: '1. Internet vs World Wide Web & Model Protokol TCP/IP',
        ringkasan: 'Internet sebagai jaringan fisik global dan WWW sebagai sistem hiperteks di atasnya.',
        konten: [
          'Internet lahir dari proyek militer ARPANET (1969) yang mengembangkan packet switching. Internet adalah infrastruktur fisik raksasa jaringan global yang menghubungkan miliaran komputer.',
          'World Wide Web (WWW) diciptakan oleh Tim Berners-Lee di CERN pada tahun 1989. Web adalah kumpulan dokumen hiperteks (HTML) yang saling terhubung melalui tautan (hyperlink) dan diakses melalui protokol HTTP di atas infrastruktur Internet. Layanan lain di Internet meliputi Email (SMTP/IMAP), File Transfer (FTP/SFTP), dan Streaming Game.',
          'Model 4 Layer TCP/IP: (1) Application Layer: protokol antarmuka aplikasi (HTTP, HTTPS, DNS, SMTP, SSH); (2) Transport Layer: keandalan transmisi end-to-end (TCP menjamin paket tiba urut tanpa hilang via 3-way handshake; UDP mentransmisikan data cepat tanpa jaminan kedatangan, cocok untuk game online/video live streaming); (3) Internet Layer: pengalamatan logis dan penentuan rute (IP, ICMP); (4) Link / Network Access Layer: enkapsulasi bit ke media fisik (Ethernet, Wi-Fi).',
        ],
        poinKunci: [
          'Internet = Jalan raya infrastruktur fisik global',
          'WWW = Mobil layanan dokumen web di atas jalan raya',
          'TCP = transmisi andal bergaransi (handshake), UDP = transmisi cepat tanpa garansi',
        ],
        contohKasus: 'Saat Anda menonton siaran langsung bola, aplikasi menggunakan protokol berbasis UDP agar tidak ada jeda buffering, namun saat mengunduh file dokumen menggunakan TCP agar tidak ada bit korup.',
        referensiBab: 'Williams & Sawyer (2014), Bab 5; Morley & Parker (2017), Bab 5',
      },
      {
        judul: '2. Pengalamatan IP (IPv4 vs IPv6), DNS, dan Protokol Web (HTTPS)',
        ringkasan: 'Buku telepon internet DNS, habisnya alamat IPv4, dan enkripsi TLS.',
        konten: [
          'Pengalamatan Internet: (a) IPv4 menggunakan angka biner 32-bit yang dipisahkan 4 oktet desimal (contoh: 192.168.1.1). Total ruang alamat hanya ~4,3 miliar dan kini telah habis teralokasi; (b) IPv6 menggunakan 128-bit yang ditulis dalam 8 grup heksadesimal (contoh: 2001:0db8:85a3::8a2e:0370:7334), menyediakan 3,4 x 10^38 alamat unik, cukup untuk memberikan triliunan alamat IP ke setiap atom di bumi.',
          'DNS (Domain Name System): Sistem direktori terdistribusi yang menerjemahkan nama domain ramah manusia (misal google.com) menjadi alamat IP numerik (142.250.190.46) yang dimengerti router.',
          'Alur Saat Anda Mengetik URL di Browser: (1) Browser meminta resolusi alamat IP ke DNS Resolver; (2) Browser membentuk TCP Handshake (SYN -> SYN-ACK -> ACK); (3) Melakukan TLS Handshake untuk sertifikat enkripsi HTTPS; (4) Mengirim HTTP GET Request; (5) Web Server merespons dokumen HTML, CSS, dan JavaScript; (6) Browser merender halaman.',
        ],
        poinKunci: [
          'IPv4 = 32-bit (~4.3 miliar alamat)',
          'IPv6 = 128-bit (hampir tak terbatas)',
          'DNS = "Buku Telepon Internet"',
          'HTTPS = HTTP + Enkripsi TLS/SSL port 443',
        ],
        contohKasus: 'Saat mengetik `kemdikbud.go.id`, DNS resolver kampus mencari ke Root Server -> TLD `.id` -> Authoritative Server hingga mengembalikan IP tujuan dalam waktu < 20 milidetik.',
        referensiBab: 'Morley & Parker (2017), Bab 5',
      },
    ],
    kuisLengkap: [
      {
        id: 'q6-1',
        question: 'Pernyataan yang paling tepat mendeskripsikan perbedaan antara "Internet" dan "World Wide Web (WWW)" adalah...',
        options: [
          'Internet dan WWW adalah dua kata yang memiliki definisi teknis yang persis identik',
          'Internet adalah infrastruktur jaringan fisik komputer global, sedangkan WWW adalah salah satu sistem layanan informasi berbasis dokumen hiperteks yang berjalan di atas Internet',
          'WWW adalah perangkat keras satelit, sedangkan Internet adalah program web browser',
          'Internet hanya dibuat untuk email, sedangkan WWW hanya untuk game online',
        ],
        correctAnswer: 1,
        explanation: 'Internet adalah jaringan komunikasi global yang mendasari berbagai macam layanan, salah satunya adalah World Wide Web (Web).',
        subTopik: 'Internet vs WWW',
      },
      {
        id: 'q6-2',
        question: 'Berapakah panjang bit alamat pada protokol Internet Protocol versi 6 (IPv6)?',
        options: ['16 bit', '32 bit', '64 bit', '128 bit'],
        correctAnswer: 3,
        explanation: 'IPv6 menggunakan 128-bit untuk menyediakan ruang alamat yang sangat masif dibandingkan 32-bit pada IPv4.',
        subTopik: 'IPv4 vs IPv6',
      },
      {
        id: 'q6-3',
        question: 'Protokol lapisan transport (Layer 4) yang menjamin paket data sampai secara utuh, berurutan, dan bebas kesalahan melalui mekanisme handshake adalah...',
        options: ['UDP (User Datagram Protocol)', 'TCP (Transmission Control Protocol)', 'IP (Internet Protocol)', 'DNS'],
        correctAnswer: 1,
        explanation: 'TCP berorientasi koneksi (connection-oriented) dan menjamin pengiriman paket dengan konfirmasi ACK (acknowledgement).',
        subTopik: 'Protokol Transport',
      },
      {
        id: 'q6-4',
        question: 'Port standar yang digunakan untuk protokol web terenkripsi HTTPS secara default adalah port nomor...',
        options: ['21', '25', '80', '443'],
        correctAnswer: 3,
        explanation: 'HTTP standar menggunakan port 80, sedangkan HTTPS (HTTP Secure dengan TLS) menggunakan port 443.',
        subTopik: 'Protokol Web',
      },
    ],
    panduanBelajar: 'Pelajari proses 3-way handshake TCP (SYN, SYN-ACK, ACK) dan fungsi rekursif query DNS dari root domain hingga authoritative server.',
    linkReferensi: 'Williams & Sawyer (2014), Bab 5',
  },

  7: {
    meetingId: 7,
    tujuanInstruksional: [
      'Menjelaskan kelemahan sistem berkas tradisional dan keunggulan Database Management System (DBMS).',
      'Merancang skema data relasional dengan Primary Key, Foreign Key, dan integritas referensial.',
      'Membedakan arsitektur RDBMS relasional (PostgreSQL, MySQL) dengan NoSQL (MongoDB, Redis).',
      'Menyusun query dasar Structured Query Language (SQL) untuk operasi DDL dan DML.',
    ],
    modulMateri: [
      {
        judul: '1. Konsep Basis Data & Model Relasional',
        ringkasan: 'Organisasi data terstruktur, penghapusan anomali data, dan integritas relasional.',
        konten: [
          'Kelemahan Sistem Berkas Tradisional (Spreadsheet/File terpisah): Redundansi data (duplikasi data di banyak tempat), Inkonsistensi data (data diubah di satu file tapi lupa diubah di file lain), Ketergantungan data pada program aplikasi tertentu, dan Keamanan yang lemah.',
          'Basis Data (Database) adalah kumpulan data terstruktur yang saling berhubungan, disimpan secara terpusat dan dikelola oleh DBMS (Database Management System).',
          'Model Data Relasional (E.F. Codd, 1970): Mengorganisir data ke dalam Tabel (Relasi) dua dimensi yang terdiri dari Baris (Tuple/Record) dan Kolom (Field/Atribut).',
          'Kunci Relasional: (1) Primary Key: Kolom unik yang menjadi pembeda mutlak antar baris (contoh: NIM mahasiswa, NIK KTP, ISBN buku); tidak boleh kosong (NOT NULL) dan tidak boleh kembar; (2) Foreign Key: Kolom yang mengacu pada Primary Key di tabel lain untuk menjalin relasi logis; (3) Kardinalitas Relasi: One-to-One (1:1), One-to-Many (1:N, misal satu Dosen membimbing banyak Mahasiswa), dan Many-to-Many (M:N, misal Mahasiswa mengambil banyak Mata Kuliah).',
        ],
        poinKunci: [
          'DBMS menghilangkan redundansi dan menjaga integritas data',
          'Tabel = baris (record) x kolom (atribut)',
          'Primary Key = unik dan NOT NULL',
          'Foreign Key = menjaga integritas referensial antar tabel',
        ],
        contohKasus: 'Sistem Informasi Akademik (SIAKAD) memiliki tabel `mahasiswa` dengan primary key `nim`. Tabel `krs` menyimpan nilai mahasiswa dengan foreign key yang merujuk pada `nim`.',
        referensiBab: "O'Brien & Marakas (2011), Bab 5: Data Resource Management",
      },
      {
        judul: '2. Pengantar SQL (DDL vs DML) & Tren NoSQL',
        ringkasan: 'Bahasa baku query database dan perbandingan RDBMS vs basis data NoSQL.',
        konten: [
          'SQL (Structured Query Language) terbagi menjadi dua sub-bahasa utama: (1) DDL (Data Definition Language) untuk merancang struktur tabel (CREATE TABLE, ALTER TABLE, DROP TABLE); (2) DML (Data Manipulation Language) untuk mengolah isi data tabel (SELECT, INSERT INTO, UPDATE, DELETE).',
          'Contoh Sintaks Dasar SQL DML: `SELECT nama, nilai_uts FROM mahasiswa WHERE nilai_uts >= 80 ORDER BY nilai_uts DESC;`',
          'RDBMS vs NoSQL: (a) RDBMS (PostgreSQL, MySQL, Oracle): Skema kaku (ACID compliant: Atomicity, Consistency, Isolation, Durability), sangat cocok untuk data keuangan perbankan dan data terstruktur; (b) NoSQL (MongoDB, Redis, Cassandra): Skema fleksibel (Document JSON, Key-Value, Graph), dapat diskalakan secara horizontal (sharding) untuk big data bervolume jutaan transaksi per detik.',
        ],
        poinKunci: [
          'DDL = mendefinisikan struktur (CREATE, ALTER, DROP)',
          'DML = memanipulasi data (SELECT, INSERT, UPDATE, DELETE)',
          'ACID menjamin keandalan transaksi perbankan',
          'NoSQL fleksibel untuk data dokumen tak terstruktur berkecepatan tinggi',
        ],
        contohKasus: 'Aplikasi perbankan BCA menggunakan RDBMS untuk transaksi saldo rekening karena membutuhkan kepatuhan ACID mutlak, sedangkan feed status media sosial menggunakan basis data NoSQL.',
        referensiBab: 'Morley & Parker (2017), Bab 6: Databases and Information Systems',
      },
    ],
    kuisLengkap: [
      {
        id: 'q7-1',
        question: 'Klausa SQL yang berfungsi untuk mengurutkan hasil query dari nilai terbesar ke nilai terkecil adalah...',
        options: ['GROUP BY ... ASC', 'ORDER BY ... DESC', 'SORT BY ... MAX', 'FILTER BY ... DOWN'],
        correctAnswer: 1,
        explanation: 'ORDER BY kolom DESC mengurutkan data secara descending (menurun dari nilai terbesar ke terkecil).',
        subTopik: 'Bahasa Query SQL',
      },
      {
        id: 'q7-2',
        question: 'Atribut atau kolom dalam tabel relasional yang bertugas menjamin bahwa setiap baris data bersifat unik dan tidak boleh bernilai kosong (NOT NULL) disebut...',
        options: ['Foreign Key', 'Primary Key', 'Index Key', 'Secondary Key'],
        correctAnswer: 1,
        explanation: 'Primary Key bertindak sebagai penanda pengenal unik bagi setiap rekaman data baris di tabel relasional.',
        subTopik: 'Kunci Relasional',
      },
      {
        id: 'q7-3',
        question: 'Perintah SQL berikut yang termasuk ke dalam kategori Data Manipulation Language (DML) adalah...',
        options: ['CREATE TABLE', 'DROP DATABASE', 'ALTER TABLE', 'INSERT INTO'],
        correctAnswer: 3,
        explanation: 'INSERT INTO, SELECT, UPDATE, dan DELETE adalah perintah DML untuk memanipulasi isi data di dalam tabel.',
        subTopik: 'DDL vs DML',
      },
      {
        id: 'q7-4',
        question: 'Basis data NoSQL tipe "Document-Store" (seperti MongoDB) menyimpan kumpulan data umumnya dalam format representasi struktur...',
        options: ['Tabel dua dimensi biner', 'Dokumen berformat JSON / BSON', 'Kabel fiber optik', 'File spreadsheet CSV terpisah'],
        correctAnswer: 1,
        explanation: 'Document-oriented database seperti MongoDB menyimpan record dalam bentuk dokumen JSON/BSON fleksibel tanpa skema kolom kaku.',
        subTopik: 'Arsitektur NoSQL',
      },
    ],
    panduanBelajar: 'Kunjungi tab Lab Interaktif SQL di aplikasi ini untuk mencoba mengeksekusi query SELECT, WHERE, dan ORDER BY langsung pada tabel mahasiswa.',
    linkReferensi: "O'Brien & Marakas (2011), Bab 5",
  },

  8: {
    meetingId: 8,
    tujuanInstruksional: [
      'Mengevaluasi penguasaan materi perkuliahan paruh semester pertama (Pertemuan 1 s.d. 7).',
      'Mengukur pencapaian Capaian Pembelajaran Mata Kuliah (CPMK-1, CPMK-2, dan CPMK-3).',
      'Menilai kemampuan pemecahan masalah teknis: arsitektur komputer, konversi sistem bilangan, jaringan, dan SQL.',
      'Memberikan umpan balik akademik komprehensif bagi mahasiswa Kelas A.',
    ],
    modulMateri: [
      {
        judul: '1. Ringkasan Kisi-Kisi Komprehensif Ujian Tengah Semester (UTS)',
        ringkasan: 'Panduan topik inti, rubrik penilaian, dan strategi pengerjaan soal UTS 30%.',
        konten: [
          'Ujian Tengah Semester (UTS) mata kuliah Pengantar Teknologi Informasi (TI001) memiliki bobot 30% dari total nilai akhir. Soal mencakup materi pertemuan 1 sampai pertemuan 7.',
          'Peta Distribusi Soal UTS: (1) Sejarah & Definisi TI (15% bobot): evolusi generasi komputer, konsep DIKW, dan implikasi Hukum Moore; (2) Hardware & Arsitektur Von Neumann (20% bobot): fungsi subsistem CPU (ALU, CU, Register), siklus mesin Fetch-Decode-Execute, dan hierarki memori; (3) Software & Sistem Operasi (15% bobot): manajemen proses, memori virtual, dan klasifikasi lisensi software; (4) Representasi Data & Sistem Bilangan (25% bobot): konversi desimal, biner, heksadesimal, ASCII/Unicode, dan perhitungan kapasitas multimedia; (5) Jaringan & Topologi (15% bobot): klasifikasi PAN/LAN/WAN, topologi Star vs Mesh, media transmisi kabel vs wireless, fungsi router vs switch; (6) Basis Data & SQL (10% bobot): relasi tabel, primary key/foreign key, dan pembacaan query SELECT dasar.',
          'Tips Ujian: Kerjakan soal perhitungan bilangan biner dan arsitektur CPU dengan teliti. Pahami perbedaan konsep konseptual bukan sekadar menghafal definisi singkatan.',
        ],
        poinKunci: [
          'Bobot UTS resmi: 30% dari nilai akhir',
          'Mencakup 7 pertemuan awal (CPMK 1, 2, 3)',
          'Fokus soal: Teori konsep, konversi bilangan, arsitektur hardware/jaringan, dan pemahaman SQL',
        ],
        contohKasus: 'Soal studi kasus UTS: Diberikan skenario sebuah klinik kesehatan yang ingin membangun jaringan LAN 15 komputer dan database pasien. Mahasiswa diminta menentukan topologi yang cocok, spesifikasi server, dan skema tabel relasional.',
        referensiBab: 'Materi Kuliah Pertemuan 1 - 7',
      },
    ],
    kuisLengkap: [
      {
        id: 'q8-1',
        question: 'Jika sebuah komputer memiliki prosesor 3.2 GHz dan mengeksekusi satu instruksi rata-rata dalam 4 clock cycle, subsistem apa yang bertanggung jawab mengoordinasikan detak clock dan aliran instruksi tersebut?',
        options: ['Arithmetic Logic Unit (ALU)', 'Control Unit (CU)', 'Solid State Drive (SSD)', 'Kabel UTP Cat6'],
        correctAnswer: 1,
        explanation: 'Control Unit (CU) berfungsi sebagai pengendali utama yang menerjemahkan instruksi dan mengoordinasikan sinyal waktu sesuai clock CPU.',
        subTopik: 'Review UTS - Arsitektur CPU',
      },
      {
        id: 'q8-2',
        question: 'Sebuah file citra berukuran 1920 x 1080 piksel menggunakan kedalaman warna 24-bit True Color tanpa kompresi. Berapakah ukuran byte mentah file tersebut?',
        options: ['Kira-kira 2 MB', 'Kira-kira 6,2 MB (1920 x 1080 x 3 byte)', 'Kira-kira 24 MB', 'Persis 192 KB'],
        correctAnswer: 1,
        explanation: '1920 x 1080 piksel = 2.073.600 piksel. Tiap piksel butuh 24 bit = 3 byte. Total = 2.073.600 x 3 byte = 6.220.800 byte (~6,2 MB).',
        subTopik: 'Review UTS - Representasi Data',
      },
      {
        id: 'q8-3',
        question: 'Pada topologi jaringan Star dengan 8 komputer klien dan 1 switch sentral, apa yang terjadi bila satu kabel yang menghubungkan Komputer 3 ke switch putus?',
        options: [
          'Seluruh 8 komputer langsung terputus dari jaringan',
          'Hanya Komputer 3 yang terputus, sedangkan 7 komputer lainnya tetap dapat berkomunikasi dengan normal',
          'Switch sentral akan terbakar karena kelebihan beban',
          'Jaringan otomatis beralih menjadi topologi Ring',
        ],
        correctAnswer: 1,
        explanation: 'Keunggulan utama topologi Star adalah isolasi kesalahan (fault isolation): kegagalan kabel pada satu node tidak memengaruhi node lainnya.',
        subTopik: 'Review UTS - Topologi Jaringan',
      },
      {
        id: 'q8-4',
        question: 'Query SQL berikut: `SELECT * FROM produk WHERE stok < 10;` bertujuan untuk...',
        options: [
          'Menghapus seluruh produk yang stoknya di bawah 10',
          'Menampilkan seluruh kolom informasi produk yang memiliki jumlah stok kurang dari 10',
          'Mengubah stok semua produk menjadi angka 10',
          'Membuat tabel baru bernama stok',
        ],
        correctAnswer: 1,
        explanation: 'SELECT * menampilkan semua atribut, sedangkan WHERE stok < 10 memfilter hanya baris yang memenuhi kondisi stok di bawah 10.',
        subTopik: 'Review UTS - Query SQL',
      },
    ],
    panduanBelajar: 'Latihan mandiri dengan kuis review ini. Pastikan Anda telah mencoba simulator nilai di tab Simulasi Nilai untuk melihat dampak nilai UTS 30% terhadap target nilai akhir.',
    linkReferensi: 'Silabus Resmi TI001',
  },

  9: {
    meetingId: 9,
    tujuanInstruksional: [
      'Menganalisis prinsip keamanan informasi berdasarkan CIA Triad (Confidentiality, Integrity, Availability).',
      'Mengidentifikasi spektrum ancaman siber modern: Malware, Phishing, Ransomware, Man-in-the-Middle, dan Serangan DDoS.',
      'Membedakan prinsip Kriptografi Simetris (AES) vs Asimetris (RSA) dan fungsi Hash satu arah (SHA-256).',
      'Menerapkan praktik pertahanan siber: Multi-Factor Authentication (MFA), Backup 3-2-1, dan Zero Trust.',
    ],
    modulMateri: [
      {
        judul: '1. CIA Triad dan Spektrum Ancaman Siber Modern',
        ringkasan: 'Tiga pilar keamanan dan anatomi serangan siber yang menargetkan data dan sistem.',
        konten: [
          'CIA Triad adalah kerangka acuan fundamental keamanan informasi: (1) Confidentiality (Kerahasiaan): Data hanya boleh diakses oleh pihak yang sah berwenang (ancaman: kebocoran data, sniffing; solusi: enkripsi, kontrol akses RBAC); (2) Integrity (Integritas): Data terjamin keasliannya dan tidak dimodifikasi secara ilegal saat disimpan atau dikirim (ancaman: tampering data; solusi: checksum, hashing, digital signature); (3) Availability (Ketersediaan): Sistem dan informasi dapat diakses oleh pengguna yang berhak kapan pun dibutuhkan (ancaman: DDoS, server crash, bencana fisik; solusi: server redundan, backup).',
          'Vektor Ancaman Siber Populer: (a) Malware: software jahat mencakup Virus (butuh inang program), Worm (menyebar sendiri via celah jaringan), Trojan (menyamar sebagai aplikasi sah), Ransomware (mengenkripsi file korban dan memeras uang tebusan crypto); (b) Phishing: rekayasa sosial menipu korban via email/web tiruan agar membocorkan kata sandi atau OTP; (c) DDoS (Distributed Denial of Service): membanjiri server dengan jutaan request palsu dari botnet agar server tumbang.',
        ],
        poinKunci: [
          'Confidentiality = cegah akses tak berhak',
          'Integrity = cegah modifikasi liar',
          'Availability = jamin sistem selalu siap diakses',
          'Ransomware mengenkripsi data dan memeras korban',
        ],
        contohKasus: 'Serangan ransomware pada Pusat Data Nasional (PDN) melumpuhkan layanan imigrasi bandara, membuktikan pelanggaran pilar Availability dan pentingnya sistem backup terisolasi (air-gapped).',
        referensiBab: 'Williams & Sawyer (2014), Bab 8: Personal Cyber Safety and Society; Morley & Parker (2017), Bab 9',
      },
      {
        judul: '2. Prinsip Kriptografi dan Fungsi Hashing Kriptografis',
        ringkasan: 'Enkripsi kunci simetris vs asimetris dan sifat matematika fungsi hash satu arah.',
        konten: [
          'Kriptografi adalah ilmu menyamarkan data (Enkripsi) menjadi teks acak tak terbaca (Ciphertext), dan mengembalikannya (Dekripsi) menggunakan kunci matematika.',
          'Kriptografi Kunci Simetris (Symmetric): Menggunakan satu kunci rahasia yang sama untuk enkripsi dan dekripsi. Sangat cepat dalam memproses data besar (contoh: AES-256). Kelemahannya: bagaimana mendistribusikan kunci rahasia tersebut secara aman ke pihak penerima.',
          'Kriptografi Kunci Asimetris (Public-Key): Menggunakan pasangan dua kunci matematika: Public Key (disebarkan bebas kepada siapa saja untuk mengenkripsi) dan Private Key (disimpan sangat rahasia oleh pemilik untuk mendekripsi). Contoh: algoritma RSA dan Elliptic Curve Cryptography (ECC). Menjadi fondasi keamanan HTTPS, SSH, dan transaksi perbankan internet.',
          'Fungsi Hashing Kriptografis (One-Way Hash): Algoritma yang mengubah input teks berapapun panjangnya menjadi string angka berukuran tetap (misal SHA-256 menghasilkan 64 karakter heksadesimal). Sifat unik hash: (1) Deterministik; (2) Satu arah (tidak bisa di-reverse balik ke plaintext); (3) Tahan benturan (collision resistant); (4) Avalanche Effect: perubahan 1 karakter pada input akan mengubah 50% lebih bit hash secara radikal. Digunakan untuk penyimpanan password dan verifikasi integritas file.',
        ],
        poinKunci: [
          'Simetris (AES) = 1 kunci sama, sangat cepat',
          'Asimetris (RSA) = sepasang kunci (Public & Private)',
          'Hashing = satu arah, tidak dapat didekripsi balik',
          'Avalanche Effect = perubahan minor pada input memicu perubahan total pada hash',
        ],
        contohKasus: 'Website tidak pernah menyimpan password asli Anda dalam database. Mereka menyimpan hash SHA-256 dari password tersebut. Saat login, sistem membandingkan hash input dengan hash yang tersimpan.',
        referensiBab: 'Morley & Parker (2017), Bab 9: Security and Privacy',
      },
    ],
    kuisLengkap: [
      {
        id: 'q9-1',
        question: 'Sebuah serangan siber yang membanjiri server website target dengan miliaran paket data palsu secara serentak dari ribuan perangkat botnet sehingga pengguna asli tidak dapat mengakses layanan merupakan bentuk pelanggaran pilar...',
        options: ['Confidentiality', 'Integrity', 'Availability (Ketersediaan)', 'Non-repudiation'],
        correctAnswer: 2,
        explanation: 'Serangan Denial of Service (DDoS) secara langsung menargetkan pilar Availability agar sistem menjadi offline dan tidak dapat digunakan.',
        subTopik: 'CIA Triad & Ancaman',
      },
      {
        id: 'q9-2',
        question: 'Pada sistem kriptografi kunci asimetris (Public-Key Cryptography), kunci manakah yang digunakan oleh penerima pesan untuk mendekripsi pesan yang dikirimkan kepadanya?',
        options: [
          'Kunci Publik milik Pengirim',
          'Kunci Privat milik Penerima',
          'Kunci Publik milik Penerima',
          'Kunci bersama (Shared Secret) tanpa proteksi',
        ],
        correctAnswer: 1,
        explanation: 'Pengirim mengenkripsi pesan menggunakan Kunci Publik penerima, dan hanya Kunci Privat penerima yang cocok yang dapat mendekripsinya kembali.',
        subTopik: 'Kriptografi Asimetris',
      },
      {
        id: 'q9-3',
        question: 'Karakteristik esensial dari fungsi hash kriptografis (seperti SHA-256) yang membedakannya dari algoritma enkripsi konvensional adalah...',
        options: [
          'Hash selalu menghasilkan file yang lebih besar dari data aslinya',
          'Fungsi hash bersifat satu arah (one-way) sehingga tidak dapat didekripsi kembali menjadi teks asli',
          'Fungsi hash membutuhkan password khusus untuk dibuka',
          'Hash hanya dapat digunakan untuk file audio MP3',
        ],
        correctAnswer: 1,
        explanation: 'Hashing adalah transformasi satu arah yang tidak memiliki operasi balik (dekripsi), berbeda dengan enkripsi yang bersifat dua arah.',
        subTopik: 'Fungsi Hash Kriptografis',
      },
      {
        id: 'q9-4',
        question: 'Strategi backup data standar industri "Aturan 3-2-1" mensyaratkan organisasi untuk memiliki minimal...',
        options: [
          '3 karyawan IT, 2 server, dan 1 printer',
          '3 salinan data, disimpan pada 2 jenis media berbeda, dan minimal 1 salinan berada di lokasi fisik terpisah (offsite/cloud)',
          '3 kata sandi berbeda diubah setiap 2 bulan sekali untuk 1 pengguna',
          '3 firewall berbeda pada 2 kabel fiber optik untuk 1 komputer',
        ],
        correctAnswer: 1,
        explanation: 'Prinsip 3-2-1 Backup: memiliki minimal 3 salinan data, pada 2 media berbeda (misal disk lokal & NAS), dan 1 salinan di lokasi luar (cloud / remote site).',
        subTopik: 'Praktek Keamanan Terbaik',
      },
    ],
    panduanBelajar: 'Gunakan modul Kriptografi di tab Lab Interaktif untuk bereksperimen dengan Caesar cipher dan mengamati efek avalanche SHA-256.',
    linkReferensi: 'Williams & Sawyer (2014), Bab 8',
  },

  10: {
    meetingId: 10,
    tujuanInstruksional: [
      'Membedakan konsep E-Commerce dan E-Business secara menyeluruh.',
      'Mengklasifikasikan model bisnis digital (B2B, B2C, C2C, B2G, Marketplace Multi-Sisi).',
      'Menjelaskan arsitektur Sistem Enterprise: ERP, CRM, dan SCM.',
      'Menganalisis infrastruktur teknologi pembayaran digital (Payment Gateway, E-Wallet, QRIS).',
    ],
    modulMateri: [
      {
        judul: '1. Model Bisnis Digital dan Ekosistem E-Commerce',
        ringkasan: 'Transformasi model transaksi komersial berbasis platform digital internet.',
        konten: [
          'E-Commerce merujuk pada proses pembelian, penjualan, transfer, atau pertukaran produk, jasa, atau informasi melalui jaringan komputer/internet.',
          'E-Business memiliki cakupan yang lebih luas: bukan sekadar transaksi jual-beli online, tetapi juga mencakup seluruh proses bisnis internal digital (kolaborasi rantai pasok, layanan pelanggan terintegrasi, manajemen SDM elektronik).',
          'Klasifikasi Model Transaksi Digital: (1) B2C (Business-to-Consumer): Perusahaan menjual langsung ke konsumen retail (contoh: Blibli, Amazon retail, Netflix); (2) B2B (Business-to-Business): Transaksi antar entitas bisnis bernilai besar (contoh: Alibaba supplier, e-katalog procurement grosir); (3) C2C (Consumer-to-Consumer): Konsumen menjual ke sesama konsumen melalui platform marketplace (contoh: Tokopedia, OLX, eBay); (4) B2G (Business-to-Government): Transaksi swasta ke lembaga pemerintah (contoh: LPSE pengadaan barang dinas).',
          'Infrastruktur Pembayaran Digital: Payment Gateway bertindak sebagai jembatan enkripsi aman antara website merchant dengan jaringan perbankan (Visa, Mastercard, Virtual Account, QRIS). QRIS (Quick Response Code Indonesian Standard) menyatukan seluruh penyedia pembayaran dompet digital (GoPay, OVO, Dana) dan mobile banking ke dalam satu kode QR standar nasional.',
        ],
        poinKunci: [
          'E-Business lebih luas daripada sekadar E-Commerce',
          'B2B = transaksi bisnis antar korporasi',
          'C2C = transaksi difasilitasi platform marketplace antar individu',
          'QRIS menstandarkan interoperabilitas QR perbankan & fintech nasional',
        ],
        contohKasus: 'Platform GoTo menggabungkan e-commerce (Tokopedia), mobilitas/logistik on-demand (Gojek), dan pembayaran digital (GoPay) dalam satu ekosistem multi-sisi terintegrasi.',
        referensiBab: "O'Brien & Marakas (2011), Bab 7 & 8: Electronic Business Systems & E-Commerce Systems",
      },
      {
        judul: '2. Sistem Informasi Enterprise: ERP, CRM, dan SCM',
        ringkasan: 'Integrasi proses bisnis lintas departemen untuk melenyapkan silo data korporasi.',
        konten: [
          'Sistem Informasi Enterprise dirancang untuk mendukung operasional korporasi berskala besar dengan menyatukan aliran data antar divisi fungsional.',
          'ERP (Enterprise Resource Planning): Tulang punggung sistem informasi enterprise yang menyatukan seluruh departemen (Keuangan & Akuntansi, Manufaktur & Produksi, Logistik & Inventori, SDM) ke dalam satu basis data terpusat (contoh: SAP, Oracle ERP, Odoo). ERP menghilangkan "silo data", memastikan setiap transaksi langsung tecermin di buku besar keuangan secara real-time.',
          'CRM (Customer Relationship Management): Berfokus pada siklus hidup pelanggan (Lead -> Prospek -> Penjualan -> Layanan Purna Jual) untuk meningkatkan loyalitas dan retensi pelanggan (contoh: Salesforce, HubSpot).',
          'SCM (Supply Chain Management): Mengelola aliran bahan mentah dari pemasok, proses manufaktur, hingga distribusi barang jadi ke tangan konsumen secara efisien.',
        ],
        poinKunci: [
          'ERP menyatukan seluruh departemen ke satu database terpusat',
          'ERP menghilangkan duplikasi dan inkonsistensi data lintas divisi',
          'CRM berfokus pada pelanggan & retensi penjualan',
          'SCM mengoptimasi rantai pasokan dan logistik persediaan',
        ],
        contohKasus: 'Perusahaan manufaktur mobil seperti Toyota menggunakan sistem ERP terintegrasi dengan SCM Just-In-Time (JIT) sehingga suku cadang tiba di pabrik beberapa jam sebelum dirakit tanpa menumpuk di gudang.',
        referensiBab: "O'Brien & Marakas (2011), Bab 8; Morley & Parker (2017), Bab 11",
      },
    ],
    kuisLengkap: [
      {
        id: 'q10-1',
        question: 'Sistem perangkat lunak enterprise yang bertugas mengintegrasikan seluruh proses bisnis inti (keuangan, manufaktur, persediaan, dan SDM) ke dalam satu database terpusat dinamakan...',
        options: ['CAD / CAM', 'ERP (Enterprise Resource Planning)', 'CMS (Content Management System)', 'IDE'],
        correctAnswer: 1,
        explanation: 'ERP adalah sistem terpadu yang menyatukan seluruh modul operasional bisnis organisasi dalam basis data tunggal.',
        subTopik: 'Sistem Informasi Enterprise',
      },
      {
        id: 'q10-2',
        question: 'Model transaksi e-commerce di mana masyarakat umum menjual barang bekas miliknya langsung kepada konsumen lain melalui platform marketplace perantara dikategorikan sebagai model...',
        options: ['B2B (Business-to-Business)', 'B2G (Business-to-Government)', 'C2C (Consumer-to-Consumer)', 'G2C (Government-to-Citizen)'],
        correctAnswer: 2,
        explanation: 'C2C (Consumer-to-Consumer) memfasilitasi perdagangan langsung antar individu konsumen melalui perantara platform digital.',
        subTopik: 'Model E-Commerce',
      },
      {
        id: 'q10-3',
        question: 'Standar nasional di Indonesia yang mengintegrasikan seluruh transaksi pembayaran berbasis kode QR dari berbagai bank dan dompet digital dinamakan...',
        options: ['SWIFT Code', 'QRIS (Quick Response Code Indonesian Standard)', 'BI-FAST Batch', 'NFC Pay'],
        correctAnswer: 1,
        explanation: 'QRIS distandardisasi oleh Bank Indonesia dan ASPI untuk memungkinkan satu QR code dibaca oleh semua aplikasi pembayaran elektronik.',
        subTopik: 'Teknologi Pembayaran Digital',
      },
      {
        id: 'q10-4',
        question: 'Tujuan utama dari penerapan sistem CRM (Customer Relationship Management) pada perusahaan modern adalah...',
        options: [
          'Menggantikan peran teknisi perangkat keras',
          'Merekam, melacak, dan menganalisis interaksi dengan pelanggan guna meningkatkan kepuasan, loyalitas, dan retensi penjualan',
          'Menghitung pajak tahunan karyawan secara otomatis',
          'Mempercepat kecepatan koneksi internet kantor',
        ],
        correctAnswer: 1,
        explanation: 'CRM mengelola seluruh interaksi pelanggan sepanjang siklus hidup konsumen untuk memaksimalkan retensi dan profitabilitas.',
        subTopik: 'Sistem CRM',
      },
    ],
    panduanBelajar: 'Pahami peran modul-modul ERP (Akuntansi, SDM, Pengadaan) dan bagaimana integrasi basis data mencegah silo data antar-departemen.',
    linkReferensi: "O'Brien & Marakas (2011), Bab 7 & 8",
  },

  11: {
    meetingId: 11,
    tujuanInstruksional: [
      'Menjelaskan 5 karakteristik esensial Cloud Computing berdasarkan standar NIST.',
      'Membandingkan 3 model layanan cloud utama: IaaS, PaaS, dan SaaS.',
      'Menganalisis 4 model penyebaran (Deployment): Public, Private, Hybrid, dan Multi-Cloud.',
      'Memahami pembagian tanggung jawab keamanan data (Shared Responsibility Model).',
    ],
    modulMateri: [
      {
        judul: '1. Karakteristik NIST & Model Layanan Cloud (IaaS, PaaS, SaaS)',
        ringkasan: 'Definisi baku komputasi awan dan hierarki piramida abstraksi layanan.',
        konten: [
          'Definisi Cloud Computing menurut NIST (National Institute of Standards and Technology): Model yang memungkinkan akses jaringan on-demand yang nyaman ke sekumpulan sumber daya komputasi terkonfigurasi bersama (server, storage, aplikasi, jaringan) yang dapat disediakan dan dirilis dengan cepat dengan upaya manajemen minimal.',
          '5 Karakteristik Esensial Cloud NIST: (1) On-demand Self-Service: Pengguna dapat memesan kapasitas komputasi (CPU, RAM, Storage) secara mandiri tanpa interaksi manual dengan staf sales; (2) Broad Network Access: Layanan dapat diakses dari mana saja melalui internet menggunakan berbagai perangkat (laptop, ponsel); (3) Resource Pooling: Sumber daya fisik penyedia dikumpulkan untuk melayani banyak konsumen secara dinamis (multi-tenant model); (4) Rapid Elasticity: Kapasitas dapat diperbesar (scale up/out) atau diperkecil secara elastis mengikuti fluktuasi beban pengguna; (5) Measured Service: Penggunaan sumber daya dimonitor dan ditagih sesuai pemakaian aktual (Pay-As-You-Go).',
          '3 Model Layanan Cloud: (a) IaaS (Infrastructure as a Service): Penyedia menyediakan perangkat keras virtual (VM, storage, jaringan). Pengguna menginstal OS, mengonfigurasi keamanan, dan menginstal aplikasi (contoh: AWS EC2, Google Compute Engine, Microsoft Azure VM); (b) PaaS (Platform as a Service): Penyedia mengurus hardware dan OS/runtime environment. Pengguna cukup fokus mengunggah kode aplikasi dan data (contoh: Google App Engine, Heroku, AWS Elastic Beanstalk); (c) SaaS (Software as a Service): Aplikasi lengkap yang siap dipakai pengguna akhir melalui web browser (contoh: Google Workspace, Microsoft 365, Zoom, Salesforce).',
        ],
        poinKunci: [
          'Capex (Beli server fisik) beralih ke Opex (Sewa bayar sesuai pakai)',
          'IaaS = Sewa infrastruktur virtual (OS diinstal sendiri)',
          'PaaS = Sewa platform runtime (fokus pada penulisan kode)',
          'SaaS = Sewa aplikasi siap pakai langsung di browser',
        ],
        contohKasus: 'Perusahaan startup cukup menggunakan layanan cloud PaaS untuk meluncurkan aplikasi tanpa harus membeli rak server fisik bernilai ratusan juta rupiah di awal usaha.',
        referensiBab: 'Williams & Sawyer (2014), Bab 5; Morley & Parker (2017), Bab 5 & 8',
      },
      {
        judul: '2. Model Deployment & Model Tanggung Jawab Bersama (Shared Responsibility)',
        ringkasan: 'Public vs Private Cloud dan pembagian peran keamanan konsumen vs penyedia cloud.',
        konten: [
          'Model Deployment Cloud: (1) Public Cloud: Infrastruktur dimiliki pihak ketiga (AWS, Google Cloud, Microsoft Azure) dan disewakan kepada publik umum melalui internet publik; (2) Private Cloud: Infrastruktur cloud didedikasikan secara eksklusif untuk satu organisasi tunggal, biasanya di-host di data center internal untuk kepatuhan regulasi ketat (perbankan, militer); (3) Hybrid Cloud: Kombinasi Public Cloud dan Private Cloud yang terhubung secara aman untuk saling berbagi data dan aplikasi (contoh: data transaksi sensitif di Private Cloud, beban web publik di Public Cloud).',
          'Model Tanggung Jawab Bersama (Shared Responsibility Model): Keamanan cloud adalah kerja sama dua pihak. Penyedia Cloud bertanggung jawab atas "Security OF the Cloud" (keamanan fisik gedung data center, pendingin, daya listrik, hardware server, hypervisor, dan kabel jaringan). Konsumen Cloud bertanggung jawab atas "Security IN the Cloud" (konfigurasi firewall, hak akses user/IAM, patch OS pada IaaS, enkripsi data, dan kerahasiaan password).',
        ],
        poinKunci: [
          'Hybrid Cloud memadukan fleksibilitas Public Cloud dengan privasi Private Cloud',
          'Penyedia bertanggung jawab atas keamanan fisik data center & hardware',
          'Konsumen bertanggung jawab atas konfigurasi OS, akses akun, dan data mereka sendiri',
        ],
        contohKasus: 'Jika database Anda di AWS diretas karena Anda menggunakan password `admin123` tanpa MFA, itu adalah kelalaian konsumen (Security IN the Cloud), bukan kegagalan server fisik AWS.',
        referensiBab: 'Morley & Parker (2017), Bab 8',
      },
    ],
    kuisLengkap: [
      {
        id: 'q11-1',
        question: 'Layanan email dan dokumen seperti Google Docs atau Microsoft 365 di mana pengguna langsung menggunakan aplikasi tanpa perlu memikirkan instalasi OS atau pemeliharaan server termasuk ke dalam model layanan...',
        options: ['IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'SaaS (Software as a Service)', 'FaaS (Function as a Service)'],
        correctAnswer: 2,
        explanation: 'SaaS (Software as a Service) menyediakan perangkat lunak aplikasi siap pakai yang di-host di cloud dan diakses langsung via web browser.',
        subTopik: 'Model Layanan Cloud',
      },
      {
        id: 'q11-2',
        question: 'Karakteristik komputasi awan NIST yang memungkinkan sistem menambah atau mengurangi kapasitas CPU dan memori secara otomatis saat traffic pengunjung melonjak atau menurun disebut...',
        options: ['Resource Pooling', 'Rapid Elasticity', 'Measured Service', 'Broad Network Access'],
        correctAnswer: 1,
        explanation: 'Rapid Elasticity adalah kemampuan cloud untuk melakukan scaling otomatis naik (scale up/out) atau turun (scale down/in) sesuai beban kerja.',
        subTopik: 'Karakteristik Cloud NIST',
      },
      {
        id: 'q11-3',
        question: 'Dalam model Shared Responsibility pada layanan Infrastructure as a Service (IaaS), siapakah yang bertanggung jawab melakukan pembaruan keamanan (patching) pada Sistem Operasi mesin virtual?',
        options: [
          'Penyedia Cloud (AWS / Google Cloud / Azure)',
          'Konsumen / Pengguna yang menyewa IaaS tersebut',
          'Kementerian Komunikasi dan Informatika',
          'Vendor pembuat prosesor CPU secara fisik',
        ],
        correctAnswer: 1,
        explanation: 'Pada model IaaS, penyedia hanya mengelola hardware dan virtualisasi fisik; instalasi OS, konfigurasi, dan patching keamanannya merupakan tanggung jawab konsumen.',
        subTopik: 'Shared Responsibility Model',
      },
      {
        id: 'q11-4',
        question: 'Perusahaan perbankan yang menyimpan data rahasia rekening nasabah di data center privat miliknya sendiri, namun menjalankan aplikasi promo musiman di public cloud AWS menerapkan model penyebaran...',
        options: ['Community Cloud murni', 'Hybrid Cloud', 'Peer-to-Peer Cloud', 'Single-Node Cloud'],
        correctAnswer: 1,
        explanation: 'Hybrid Cloud menggabungkan infrastruktur on-premise / private cloud dengan public cloud komersial untuk efisiensi dan keamanan.',
        subTopik: 'Model Deployment Cloud',
      },
    ],
    panduanBelajar: 'Buka modul Lab Interaktif Cloud di tab Lab untuk memvisualisasikan pembagian 9 lapisan teknologi On-Premise vs IaaS vs PaaS vs SaaS.',
    linkReferensi: 'Williams & Sawyer (2014), Bab 5',
  },

  12: {
    meetingId: 12,
    tujuanInstruksional: [
      'Menjelaskan definisi dan arsitektur 4 lapisan Internet of Things (IoT).',
      'Membedakan peran Sensor (input analog/digital) dan Aktuator (output mekanis).',
      'Memahami protokol komunikasi ringan khusus IoT (MQTT, CoAP, LoRaWAN, BLE).',
      'Menganalisis studi kasus IoT di Smart City, Smart Agriculture, dan tantangan keamanannya.',
    ],
    modulMateri: [
      {
        judul: '1. Arsitektur 4 Lapisan IoT & Komponen Sensor-Aktuator',
        ringkasan: 'Interkoneksi perangkat fisik cerdas yang mengumpulkan dan bertukar data lingkungan.',
        konten: [
          'Internet of Things (IoT) adalah ekosistem benda-benda fisik sehari-hari ("things") yang ditanamkan sensor, perangkat lunak, dan teknologi konektivitas untuk mengumpulkan, mengirimkan, dan merespons data lingkungan melalui jaringan internet tanpa perlu campur tangan manusia.',
          'Arsitektur 4 Lapisan IoT: (1) Perception / Sensing Layer: Lapisan perangkat fisik yang terdiri dari Sensor (pengukur besaran fisik seperti suhu, kelembapan, getaran, cahaya, gas) dan Aktuator (penggerak fisik seperti motor listrik, relai sakelar, katup hidrolik, solenoida); (2) Network / Connectivity Layer: Mengirimkan data sensor ke gateway atau cloud (Wi-Fi, Bluetooth Low Energy, Zigbee, Seluler 4G/5G, LoRaWAN); (3) Data Processing / Edge Layer: Memproses, memfilter, dan menganalisis data mentah secara lokal di edge router atau server cloud; (4) Application Layer: Antarmuka dashboard dan otomasi (Smart Home app, Smart City traffic control, pemantau kesehatan).',
        ],
        poinKunci: [
          'Sensor = membaca fenomena fisik menjadi sinyal elektrik',
          'Aktuator = mengubah sinyal elektrik menjadi tindakan mekanik fisik',
          'Edge Computing memproses data dekat dengan sensor untuk latensi rendah',
        ],
        contohKasus: 'Sistem Smart Greenhouse mendeteksi kelembapan tanah di bawah 30% menggunakan Sensor Soil Moisture, mikrokontroler mengirim perintah ke Aktuator pompa air untuk menyiram tanaman otomatis.',
        referensiBab: 'Morley & Parker (2017), Bab 5 & 10: Emerging Technologies',
      },
      {
        judul: '2. Protokol Khusus IoT (MQTT) & Isu Keamanan Perangkat IoT',
        ringkasan: 'Protokol publish-subscribe ringan hemat daya dan tantangan keamanan siber perangkat pintar.',
        konten: [
          'Mengapa protokol web biasa (HTTP) kurang cocok untuk IoT: HTTP memiliki overhead header yang besar, menggunakan model request-response yang boros baterai, dan membutuhkan koneksi terus-menerus yang berat bagi mikrokontroler hemat energi.',
          'Protokol MQTT (Message Queuing Telemetry Transport): Protokol perpesanan standar de-facto untuk IoT. Menggunakan model Publish-Subscribe dengan ukuran header sangat mini (hanya 2 byte). Komponen: (1) Publisher: Sensor yang mempublikasikan data ke sebuah topik (misal: `sensor/suhu/kamar1`); (2) Broker: Server perantara yang menerima dan mendistribusikan pesan; (3) Subscriber: Dashboard aplikasi yang berlangganan topik tersebut.',
          'Tantangan Keamanan IoT: Sebagian besar perangkat IoT berbiaya murah memiliki daya komputasi dan memori sangat minim, sehingga pabrikan sering tidak menyematkan enkripsi kuat atau mekanisme pembaruan firmware (patching). Perangkat IoT yang rentan sering diretas dan digabungkan menjadi Botnet (seperti botnet Mirai) untuk melancarkan serangan DDoS masif.',
        ],
        poinKunci: [
          'MQTT menggunakan arsitektur Publish / Subscribe dengan Broker sentral',
          'Header MQTT sangat ringan (2 byte), hemat baterai dan bandwidth',
          'Banyak perangkat IoT minim keamanan, rentan diretas menjadi botnet',
        ],
        contohKasus: 'Smart City Surabaya menggunakan sensor IoT ultrasonik pada saluran air dan CCTV AI yang terhubung via jaringan LoRaWAN untuk mendeteksi potensi banjir secara real-time.',
        referensiBab: 'Morley & Parker (2017), Bab 10',
      },
    ],
    kuisLengkap: [
      {
        id: 'q12-1',
        question: 'Komponen dalam sistem IoT yang bertugas mengubah energi sinyal listrik menjadi gerakan fisik atau aksi mekanis (seperti memutar motor atau membuka katup) disebut...',
        options: ['Sensor', 'Aktuator (Actuator)', 'Transistor', 'MicroSD'],
        correctAnswer: 1,
        explanation: 'Sensor bertugas membaca lingkungan (input), sedangkan Aktuator melakukan aksi fisik nyata (output mekanis).',
        subTopik: 'Sensor dan Aktuator',
      },
      {
        id: 'q12-2',
        question: 'Protokol komunikasi jaringan yang sangat ringan, hemat daya, dan menggunakan pola arsitektur Publish/Subscribe untuk perangkat IoT adalah...',
        options: ['FTP', 'MQTT (Message Queuing Telemetry Transport)', 'BGP', 'Telnet'],
        correctAnswer: 1,
        explanation: 'MQTT dirancang khusus oleh IBM/OASIS untuk jaringan dengan bandwidth terbatas dan perangkat baterai berdaya rendah.',
        subTopik: 'Protokol Komunikasi IoT',
      },
      {
        id: 'q12-3',
        question: 'Mengapa perangkat Internet of Things (IoT) sering kali menjadi sasaran empuk peretas untuk dijadikan jaringan botnet serangan siber?',
        options: [
          'Karena perangkat IoT selalu berukuran sangat besar',
          'Karena banyak perangkat IoT memiliki kapasitas komputasi terbatas, menggunakan password default pabrik yang tidak diubah, dan jarang menerima update keamanan',
          'Karena IoT tidak menggunakan listrik',
          'Karena IoT hanya berjalan di komputer mainframe',
        ],
        correctAnswer: 1,
        explanation: 'Keterbatasan sumber daya perangkat IoT sering membuat enkripsi ditiadakan dan pengguna jarang mengganti password bawaan pabrik.',
        subTopik: 'Tantangan Keamanan IoT',
      },
      {
        id: 'q12-4',
        question: 'Teknologi jaringan nirkabel jarak jauh (hingga belasan kilometer) dengan konsumsi daya sangat rendah yang ideal untuk sensor pertanian cerdas adalah...',
        options: ['NFC (Near Field Communication)', 'LoRaWAN (Long Range WAN)', 'Kabel HDMI', 'Inframerah IrDA'],
        correctAnswer: 1,
        explanation: 'LoRaWAN memungkinkan sensor nirkabel beroperasi bertahun-tahun dengan baterai kecil untuk mentransmisikan data jarak jauh.',
        subTopik: 'Konektivitas IoT',
      },
    ],
    panduanBelajar: 'Pahami diagram Publish-Subscribe protokol MQTT dan bandingkan perbedaan peran Sensor Suhu (input) dengan Kipas Pendingin (aktuator output).',
    linkReferensi: 'Morley & Parker (2017), Bab 10',
  },

  13: {
    meetingId: 13,
    tujuanInstruksional: [
      'Menjelaskan hubungan dan perbedaan antara Artificial Intelligence (AI), Machine Learning (ML), dan Deep Learning (DL).',
      'Mengidentifikasi 3 paradigma Machine Learning: Supervised, Unsupervised, dan Reinforcement Learning.',
      'Menguraikan tahapan siklus hidup Data Science (Collection, Cleaning, EDA, Modeling, Evaluation).',
      'Menganalisis dampak etis kecerdasan buatan: Bias algoritma, privasi data, dan halusinasi model generatif.',
    ],
    modulMateri: [
      {
        judul: '1. Taksonomi AI, Machine Learning, dan Deep Learning',
        ringkasan: 'Dari pemrograman berbasis aturan konvensional menuju sistem yang belajar dari data.',
        konten: [
          'Perbedaan Pemrograman Tradisional vs Machine Learning: Pada pemrograman tradisional, programmer memasukkan Data + Aturan/Rules (logika `if-else`) untuk menghasilkan Output. Pada Machine Learning, programmer memasukkan Data + Output/Jawaban ke komputer, dan algoritma menghasilkan Aturan/Model secara mandiri.',
          'Hubungan Hierarkis AI, ML, dan DL: (1) Artificial Intelligence (AI): Istilah payung terluas untuk sistem komputer yang mampu melakukan tugas yang biasanya membutuhkan kecerdasan manusia (penalaran, persepsi visual, bahasa); (2) Machine Learning (ML): Cabang AI di mana sistem belajar dan meningkatkan performanya berdasarkan pengalaman data tanpa diprogram eksplisit langkah demi langkah; (3) Deep Learning (DL): Sub-cabang ML yang menggunakan Jaringan Saraf Tiruan berlapis-lapis (Deep Artificial Neural Networks) yang terinspirasi dari struktur neuron otak manusia, mampu mengekstrak fitur otomatis dari data tak terstruktur (citra wajah, suara, teks).',
          'Generative AI & Large Language Models (LLM): Generative AI adalah aplikasi Deep Learning mutakhir (arsitektur Transformer) yang mampu memprediksi probabilitas token berikutnya untuk memproduksi konten teks, kode, gambar, dan audio yang orisinal dan koheren.',
        ],
        poinKunci: [
          'Tradisional: Data + Aturan -> Jawaban',
          'Machine Learning: Data + Jawaban -> Aturan (Model)',
          'AI (Payung) > Machine Learning > Deep Learning (Neural Networks)',
          'Deep Learning unggul pada data tidak terstruktur (gambar, suara, teks)',
        ],
        contohKasus: 'Sistem filter email spam Gmail menggunakan algoritma machine learning untuk mempelajari kata-kata dan pola email yang ditandai spam oleh jutaan pengguna.',
        referensiBab: 'Morley & Parker (2017), Bab 10; Williams & Sawyer (2014), Bab 8',
      },
      {
        judul: '2. Paradigma Pembelajaran Mesin & Etika AI',
        ringkasan: 'Supervised, Unsupervised, Reinforcement Learning, serta tanggung jawab etis pemanfaatan AI.',
        konten: [
          'Tiga Paradigma Utama Machine Learning: (1) Supervised Learning: Algoritma dilatih menggunakan dataset yang memiliki label jawaban benar (labeled data). Contoh tugas: Klasifikasi (apakah gambar ini kucing atau anjing? apakah transaksi ini penipuan/fraud?), Regresi (memprediksi harga rumah berdasarkan luas tanah); (2) Unsupervised Learning: Algoritma diberikan data tanpa label apa pun dan bertugas menemukan pola atau struktur tersembunyi sendiri. Contoh: K-Means Clustering untuk segmentasi kelompok pelanggan; (3) Reinforcement Learning: Agen belajar melalui interaksi coba-coba (trial and error) di dalam lingkungan simulasi, menerima Reward jika aksinya benar dan Penalty jika salah (contoh: AI AlphaGo, mobil otonom).',
          'Siklus Hidup Data Science: (1) Data Collection; (2) Data Cleaning & Preprocessing (menangani missing value dan outlier); (3) Exploratory Data Analysis (EDA); (4) Model Training; (5) Evaluation (akurasi, precision, recall); (6) Deployment.',
          'Isu Etika AI: (a) Algorithmic Bias: Model AI mencerminkan dan memperparah prasangka diskriminatif dari data historis pelatihan; (b) Halusinasi: Model bahasa besar dapat menghasilkan fakta palsu yang terdengar meyakinkan; (c) Hak Cipta & Deepfake: Manipulasi citra dan suara orang lain tanpa izin.',
        ],
        poinKunci: [
          'Supervised = ada label target kebenaran',
          'Unsupervised = mencari klaster pola tanpa label',
          'Reinforcement = sistem reward & penalty',
          'Bias algoritma berakar dari bias dataset historis',
        ],
        contohKasus: 'Sistem pengenalan wajah (facial recognition) yang hanya dilatih menggunakan gambar orang kulit terang mengalami tingkat kesalahan tinggi saat mengidentifikasi orang kulit berwarna.',
        referensiBab: 'Morley & Parker (2017), Bab 10 & 12',
      },
    ],
    kuisLengkap: [
      {
        id: 'q13-1',
        question: 'Sebuah bank melatih model algoritma untuk mendeteksi transaksi kartu kredit ilegal (fraud) menggunakan jutaan data transaksi historis yang sudah diberi tanda "Sah" atau "Fraud". Pendekatan pembelajaran mesin ini tergolong ke dalam paradigma...',
        options: ['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Genetic Evolution'],
        correctAnswer: 1,
        explanation: 'Supervised Learning menggunakan data berlabel (ground truth) di mana algoritma membandingkan prediksinya dengan label jawaban yang sudah diketahui.',
        subTopik: 'Paradigma Machine Learning',
      },
      {
        id: 'q13-2',
        question: 'Sub-cabang dari Machine Learning yang menggunakan arsitektur jaringan saraf tiruan banyak lapisan (Artificial Neural Networks) untuk mengekstraksi fitur kompleks secara otomatis dinamakan...',
        options: ['Expert System Klasik', 'Deep Learning', 'Sistem Aturan Logika Fuzzy', 'Regresi Linier Tunggal'],
        correctAnswer: 1,
        explanation: 'Deep Learning menggunakan jaringan saraf tiruan berlapisan dalam (deep neural networks) untuk mengolah citra, audio, dan bahasa alami.',
        subTopik: 'Deep Learning',
      },
      {
        id: 'q13-3',
        question: 'Fenomena di mana model Large Language Model (LLM) menghasilkan pernyataan atau referensi fiktif yang terdengar sangat meyakinkan tetapi faktanya salah secara ilmiah disebut...',
        options: ['Overfitting', 'Halusinasi (Hallucination)', 'Data Drift', 'Gradient Descent'],
        correctAnswer: 1,
        explanation: 'Halusinasi AI adalah kecenderungan model generatif memprediksi token kata yang terdengar masuk akal tetapi tidak berdasar pada fakta kebenaran.',
        subTopik: 'Etika & Keterbatasan AI',
      },
      {
        id: 'q13-4',
        question: 'Algoritma machine learning yang mengelompokkan data nasabah belanja ke dalam segmen-segmen profil tanpa adanya label arahan sebelumnya menggunakan metode...',
        options: ['Clustering (Unsupervised Learning)', 'Supervised Classification', 'Linear Regression', 'Decision Tree Berlabel'],
        correctAnswer: 0,
        explanation: 'Clustering pada Unsupervised Learning mencari kemiripan intrinsik antar titik data tanpa bantuan label target.',
        subTopik: 'Unsupervised Learning',
      },
    ],
    panduanBelajar: 'Pahami perbedaan esensial antara Supervised (ada label), Unsupervised (tanpa label / klaster), dan Reinforcement (agen, reward, penalty).',
    linkReferensi: 'Morley & Parker (2017), Bab 10',
  },

  14: {
    meetingId: 14,
    tujuanInstruksional: [
      'Menjelaskan kode etik profesi teknologi informasi berdasarkan standar ACM dan IEEE-CS.',
      'Menguraikan 4 pilar Hak Kekayaan Intelektual (HAKI): Hak Cipta, Paten, Merek Dagang, dan Rahasia Dagang.',
      'Menganalisis regulasi hukum siber di Indonesia: UU ITE dan UU Pelindungan Data Pribadi (UU PDP No. 27/2022).',
      'Mengevaluasi hak-hak subjek data privasi (hak akses, hak koreksi, hak penghapusan data).',
    ],
    modulMateri: [
      {
        judul: '1. Kode Etik Profesi TI & Hak Kekayaan Intelektual (HAKI)',
        ringkasan: 'Tanggung jawab moral insinyur perangkat lunak dan perlindungan karya cipta digital.',
        konten: [
          'Mengapa Etika TI Sangat Krusial: Profesional TI memegang kendali atas infrastruktur vital (perbankan, rekam medis, navigasi penerbangan, data pemilu). Kesalahan kode atau kelalaian moral dapat membahayakan keselamatan jiwa manusia dan hak asasi.',
          'Kode Etik ACM & IEEE-CS Software Engineering: (1) Berkontribusi positif bagi masyarakat dan kesejahteraan manusia; (2) Menghindari bahaya (Avoid harm); (3) Bersikap jujur dan dapat dipercaya; (4) Menghormati privasi dan kerahasiaan informasi pengguna; (5) Mengutamakan kepentingan publik di atas kepentingan klien atau perusahaan jika terjadi pertentangan moral.',
          'Empat Pilar Hak Kekayaan Intelektual (HAKI) di Bidang TI: (1) Hak Cipta (Copyright): Melindungi ekspresi nyata dari sebuah ide, timbul secara otomatis (source code program komputer, desain antarmuka, buku); (2) Paten: Melindungi invensi teknis dan proses baru yang dapat diterapkan di industri (contoh: metode kompresi data algoritma baru); (3) Merek Dagang (Trademark): Melindungi simbol, logo, nama brand komersial (contoh: logo Apple, kata "Google"); (4) Rahasia Dagang (Trade Secret): Informasi bisnis berharga yang dijaga kerahasiaannya (contoh: algoritma PageRank Google, resep bumbu Coca-Cola).',
        ],
        poinKunci: [
          'Kode etik mewajibkan kepentingan keselamatan publik di atas segalanya',
          'Hak Cipta melindungi source code program komputer',
          'Paten melindungi metode teknis dan invensi',
          'Merek Dagang melindungi identitas brand komersial',
        ],
        contohKasus: 'Kasus skandal emisi Volkswagen: insinyur software memprogram kode ECU untuk mencurangi uji emisi. Tindakan ini melanggar kode etik IEEE karena secara sadar merugikan kesehatan publik.',
        referensiBab: 'Williams & Sawyer (2014), Bab 8; Morley & Parker (2017), Bab 12: Ethics, Law, and Society',
      },
      {
        judul: '2. Hukum Siber Indonesia: UU ITE dan UU Pelindungan Data Pribadi (PDP)',
        ringkasan: 'Payung hukum tindak pidana siber dan kewajiban pengendali data pribadi di Indonesia.',
        konten: [
          'Undang-Undang Informasi dan Transaksi Elektronik (UU ITE): Mengatur keabsahan dokumen/tanda tangan elektronik serta mempidanakan kejahatan siber: (a) Pasal 30: Akses ilegal terhadap sistem komputer orang lain (hacking); (b) Pasal 31: Penyadapan transmisi data (intersepsi ilegal); (c) Pasal 32: Mengubah, merusak, atau menyembunyikan informasi digital orang lain; (d) Pasal 33: Mengganggu sistem komputer hingga tidak bekerja semestinya.',
          'UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022 / UU PDP): Tonggak sejarah hukum privasi Indonesia yang mengadopsi standar internasional (mirip GDPR Uni Eropa).',
          'Prinsip Utama UU PDP: (1) Data Pribadi Umum: Nama lengkap, jenis kelamin, kewarganegaraan, agama; (2) Data Pribadi Spesifik: Rekam medis kesehatan, data biometrik sidik jari, data genetika, catatan kejahatan, data keuangan anak; (3) Hak Subjek Data: Hak mendapatkan informasi pemrosesan, hak memperbaiki data yang salah, hak mengakhiri pemrosesan, hak menghapus data (right to be forgotten); (4) Kewajiban Pengendali Data: Wajib memiliki dasar hukum pemrosesan (consent), wajib memberitahukan insiden kebocoran data maksimal 3 x 24 jam ke lembaga pengawas dan pemilik data.',
        ],
        poinKunci: [
          'UU ITE mempidanakan hacking, intersepsi ilegal, dan perusakan data',
          'UU PDP No. 27/2022 melindungi privasi warga negara atas data pribadi mereka',
          'Kebocoran data wajib dilaporkan dalam 3 x 24 jam',
          'Pelanggaran kebocoran data diancam denda miliaran rupiah dan sanksi pidana',
        ],
        contohKasus: 'Perusahaan e-commerce yang mengalami kebocoran data jutaan akun konsumen kini dapat dikenai sanksi ganti rugi perdata dan denda administratif hingga miliaran rupiah sesuai ketentuan UU PDP.',
        referensiBab: 'Morley & Parker (2017), Bab 12; Regulasi UU No. 27 Tahun 2022',
      },
    ],
    kuisLengkap: [
      {
        id: 'q14-1',
        question: 'Regulasi spesifik di Indonesia yang secara komprehensif mengatur hak-hak warga negara atas data pribadinya serta sanksi bagi korporasi pengendali data yang lalai adalah...',
        options: [
          'Undang-Undang Ketenagakerjaan',
          'Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)',
          'Undang-Undang Penanaman Modal Asing',
          'Undang-Undang Lalu Lintas Jalan Raya',
        ],
        correctAnswer: 1,
        explanation: 'UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) adalah payung hukum spesifik yang mengatur privasi dan tata kelola data pribadi di Indonesia.',
        subTopik: 'Hukum Siber UU PDP',
      },
      {
        id: 'q14-2',
        question: 'Bentuk perlindungan Hak Kekayaan Intelektual (HAKI) yang secara otomatis timbul untuk melindungi kode sumber (source code) perangkat lunak komputer adalah...',
        options: ['Hak Paten Desain Industri', 'Hak Cipta (Copyright)', 'Merek Dagang (Trademark)', 'Desain Tata Letak Sirkuit Terpadu'],
        correctAnswer: 1,
        explanation: 'Secara hukum internasional dan nasional, kode program komputer (software) diklasifikasikan dan dilindungi di bawah rezim Hak Cipta (Copyright).',
        subTopik: 'HAKI di Bidang TI',
      },
      {
        id: 'q14-3',
        question: 'Tindakan seorang staf IT yang secara sengaja masuk dan mengakses basis data server rumah sakit tanpa izin yang sah untuk mengunduh rekam medis pasien diatur dan diancam pidana dalam UU ITE pada pasal...',
        options: [
          'Pasal 30 tentang Akses Ilegal (Illegal Access)',
          'Pasal 1 tentang Ketentuan Umum',
          'Pasal 15 tentang Nama Domain Internet',
          'Pasal 45 tentang Tanda Tangan Notaris',
        ],
        correctAnswer: 0,
        explanation: 'Pasal 30 UU ITE melarang setiap orang dengan sengaja dan tanpa hak atau melawan hukum mengakses sistem komputer milik orang lain dengan cara apapun.',
        subTopik: 'Tindak Pidana UU ITE',
      },
      {
        id: 'q14-4',
        question: 'Menurut Kode Etik Profesional IEEE dan ACM, apa kewajiban moral tertinggi seorang software engineer jika pimpinan perusahaan memerintahkan merilis perangkat lunak yang diketahui memiliki celah cacat berbahaya bagi keselamatan publik?',
        options: [
          'Mengikuti perintah pimpinan tanpa banyak bertanya demi mempertahankan pekerjaan',
          'Mengutamakan keselamatan, kesehatan, dan kesejahteraan publik di atas kepentingan pemberi kerja, serta melaporkan risiko tersebut secara transparan',
          'Menghapus seluruh backup kode perusahaan secara sembunyi-sembunyi',
          'Menjual celah cacat tersebut ke peretas di dark web',
        ],
        correctAnswer: 1,
        explanation: 'Prinsip nomor satu kode etik profesi insinyur perangkat lunak adalah bahwa keselamatan, kesehatan, dan kesejahteraan publik bersifat mutlak dan berada di atas segalanya.',
        subTopik: 'Etika Profesi ACM/IEEE',
      },
    ],
    panduanBelajar: 'Pelajari ringkasan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi dan identifikasi perbedaan antara Data Pribadi Umum vs Data Pribadi Spesifik.',
    linkReferensi: 'Morley & Parker (2017), Bab 12',
  },

  15: {
    meetingId: 15,
    tujuanInstruksional: [
      'Mensintesis seluruh materi perkuliahan ke dalam studi kasus arsitektur sistem komputasi terpadu.',
      'Mengevaluasi kesiapan presentasi proyek mini kelompok mengenai tren teknologi informasi terkini.',
      'Melatih keterampilan komunikasi teknis, argumentasi ilmiah, dan peer-review antar mahasiswa.',
      'Mengidentifikasi area materi kritis untuk persiapan evaluasi akhir semester (UAS).',
    ],
    modulMateri: [
      {
        judul: '1. Sintesis Terpadu Arsitektur Teknologi Informasi Modern',
        ringkasan: 'Menyatukan hardware, jaringan, basis data, cloud, dan AI dalam satu solusi terintegrasi.',
        konten: [
          'Pada pertemuan ke-15, mahasiswa merefleksikan bagaimana seluruh pilar materi saling terhubung dalam ekosistem dunia nyata: (1) Hardware & IoT mengumpulkan data mentah di lapangan; (2) Jaringan & Protokol TCP/IP mentransmisikan data secara andal melalui fiber optik atau nirkabel; (3) Basis Data & DBMS menyimpan data terstruktur dengan integritas referensial; (4) Cloud Computing menyediakan infrastruktur elastis berbiaya terukur; (5) AI & Data Science mengolah data menjadi wawasan analitik prediktif; (6) Keamanan & Etika Hukum memastikan seluruh ekosistem mematuhi UU PDP dan aman dari ancaman siber.',
          'Rubrik Penilaian Presentasi Proyek Mini: (a) Penguasaan Arsitektur Teknis (30%): Ketepatan memilih komponen software, hardware, dan topologi; (b) Relevansi & Solusi Masalah (25%): Dampak nyata terhadap efisiensi bisnis atau masyarakat; (c) Analisis Keamanan & Etika (25%): Kepatuhan terhadap CIA triad dan perlindungan data pribadi; (d) Keterampilan Komunikasi & Tanya Jawab (20%): Kejelasan presentasi dan kemampuan mempertahankan argumen secara ilmiah.',
        ],
        poinKunci: [
          'Sintesis holistik menghubungkan 14 pertemuan sebelumnya',
          'Setiap arsitektur TI modern harus mempertimbangkan efisiensi, skalabilitas, dan keamanan',
          'Etika dan regulasi privasi adalah syarat wajib kelayakan sistem',
        ],
        contohKasus: 'Proyek Smart Logistics: sensor GPS/suhu IoT di truk es krim mengirim data via MQTT ke broker cloud AWS, disimpan di database PostgreSQL, dianalisis model ML untuk rute tercepat, dan diamankan dengan enkripsi TLS.',
        referensiBab: 'Seluruh Buku Rujukan (O\'Brien, Williams, Morley)',
      },
    ],
    kuisLengkap: [
      {
        id: 'q15-1',
        question: 'Dalam merancang arsitektur aplikasi e-commerce modern yang melayani jutaan transaksi flash sale secara serentak, kombinasi teknologi manakah yang paling ideal?',
        options: [
          'Komputer PC desktop tunggal dengan topologi Bus tanpa internet',
          'Infrastruktur Cloud dengan fitur Auto-Scaling, database relasional untuk transaksi pembayaran, cache in-memory untuk katalog, dan jaringan CDN',
          'Sistem operasi DOS 16-bit tanpa sistem database DBMS',
          'Kabel koaksial tunggal tanpa switch',
        ],
        correctAnswer: 1,
        explanation: 'Skalabilitas tinggi membutuhkan arsitektur cloud elastis, pembagian beban transaksi (RDBMS ACID), dan caching untuk data sering dibaca.',
        subTopik: 'Arsitektur Sistem Terintegrasi',
      },
      {
        id: 'q15-2',
        question: 'Ketika sebuah sistem IoT memproses data sensor secara lokal di mini server dekat lokasi pabrik untuk mengurangi latensi transmisi ke cloud, konsep arsitektur ini disebut...',
        options: ['Mainframe Computing', 'Edge Computing', 'Analog Dial-up Computing', 'Panchromatic Computing'],
        correctAnswer: 1,
        explanation: 'Edge computing mendekatkan proses komputasi dan penyimpanan data ke lokasi perangkat itu sendiri untuk menekan latensi jaringan.',
        subTopik: 'Edge Computing',
      },
      {
        id: 'q15-3',
        question: 'Apa tujuan utama dari tahapan presentasi dan peer-review proyek mini pada Pertemuan ke-15 ini?',
        options: [
          'Hanya sekadar menghabiskan jam perkuliahan',
          'Menguji kemampuan sintesis komprehensif mahasiswa dalam menghubungkan teori hardware, jaringan, database, dan etika ke dalam studi kasus nyata',
          'Menghapus seluruh nilai kuis yang sudah didapat sebelumnya',
          'Memaksa mahasiswa membeli lisensi software berbayar',
        ],
        correctAnswer: 1,
        explanation: 'Sesi sintesis proyek mini menguji pemahaman holistik dan penerapan praktis materi satu semester penuh.',
        subTopik: 'Tujuan Pembelajaran Proyek',
      },
    ],
    panduanBelajar: 'Siapkan materi slide presentasi kelompok Anda dengan fokus pada diagram arsitektur sistem, pemilihan teknologi, dan mitigasi risiko keamanan.',
    linkReferensi: 'Silabus Resmi TI001',
  },

  16: {
    meetingId: 16,
    tujuanInstruksional: [
      'Mengevaluasi penguasaan komprehensif seluruh materi perkuliahan Pengantar Teknologi Informasi.',
      'Mengukur ketuntasan pencapaian Capaian Pembelajaran Mata Kuliah (CPMK-1 s.d. CPMK-4).',
      'Menguji kemampuan analitis mahasiswa dalam aspek keamanan siber, cloud computing, IoT, AI, dan hukum TI.',
      'Menentukan nilai akhir kelulusan mata kuliah TI001 (bobot evaluasi 35%).',
    ],
    modulMateri: [
      {
        judul: '1. Panduan & Kisi-Kisi Komprehensif Ujian Akhir Semester (UAS)',
        ringkasan: 'Struktur evaluasi penentu kelulusan berbobot 35% dengan penekanan materi pasca-UTS.',
        konten: [
          'Ujian Akhir Semester (UAS) mata kuliah Pengantar Teknologi Informasi (TI001) adalah komponen evaluasi dengan porsi bobot tertinggi, yaitu 35% dari total nilai akhir perkuliahan.',
          'Cakupan Materi UAS: Meskipun bersifat komprehensif dari minggu 1 hingga 15, fokus utama (sekitar 70% bobot soal) ditekankan pada materi paruh kedua semester: (1) Keamanan Informasi & Kriptografi (Minggu 9): CIA triad, enkripsi AES vs RSA, hashing SHA-256, malware ransomware; (2) E-Business & Sistem Enterprise (Minggu 10): model B2B/B2C, modul ERP, sistem CRM/SCM, dan pembayaran digital QRIS; (3) Cloud Computing (Minggu 11): 5 karakteristik NIST, model IaaS/PaaS/SaaS, deployment Public/Private/Hybrid, dan model Shared Responsibility; (4) Internet of Things (Minggu 12): arsitektur 4 lapisan IoT, sensor vs aktuator, protokol MQTT; (5) Artificial Intelligence & Data Science (Minggu 13): hierarki AI/ML/DL, supervised vs unsupervised learning, bias algoritma; (6) Etika Profesi & Hukum Siber (Minggu 14): kode etik ACM/IEEE, 4 pilar HAKI, UU ITE dan UU PDP No. 27/2022.',
          'Kriteria Kelulusan: Mahasiswa wajib memperoleh akumulasi nilai akhir minimal 55.0 (Grade C) untuk dinyatakan lulus mata kuliah Pengantar Teknologi Informasi (3 SKS).',
        ],
        poinKunci: [
          'Bobot UAS: 35% (komponen penilaian terbesar)',
          'Fokus utama: Materi pasca-UTS (Minggu 9 s.d. 14)',
          'Menguji ketercapaian holistik CPMK 1, 2, 3, dan 4',
        ],
        contohKasus: 'Soal analisis UAS: Mahasiswa diberikan arsitektur aplikasi telemedicine startup yang menyimpan data rekam medis di cloud. Mahasiswa diminta menganalisis risiko kebocoran data berdasarkan UU PDP dan merancang kontrol mitigasi kriptografi.',
        referensiBab: 'Seluruh Materi Kuliah TI001 (Pertemuan 1 - 15)',
      },
    ],
    kuisLengkap: [
      {
        id: 'q16-1',
        question: 'Sebuah perusahaan rintisan (startup) ingin membangun aplikasi web tanpa mengelola infrastruktur server fisik maupun patch sistem operasi, melainkan hanya mengunggah kode program aplikasinya. Model layanan cloud yang paling efisien adalah...',
        options: ['IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'On-Premise Datacenter', 'Colocation Server Fisik'],
        correctAnswer: 1,
        explanation: 'PaaS (seperti Google App Engine atau Heroku) mengelola hardware dan OS runtime secara penuh sehingga developer hanya fokus menulis kode aplikasi.',
        subTopik: 'Review UAS - Cloud Computing',
      },
      {
        id: 'q16-2',
        question: 'Manakah dari pernyataan berikut yang paling tepat menjelaskan mengapa fungsi hash (seperti SHA-256) digunakan untuk menyimpan password pengguna di basis data dan bukan enkripsi biasa?',
        options: [
          'Karena hash menghasilkan file gambar bitmap',
          'Karena hash bersifat satu arah dan tidak dapat didekripsi balik, sehingga jika database dicuri, peretas tidak dapat melihat kata sandi asli secara langsung',
          'Karena enkripsi tidak membutuhkan kunci matematika',
          'Karena hash hanya berjalan pada sistem operasi Windows',
        ],
        correctAnswer: 1,
        explanation: 'Sifat one-way dari fungsi hash menjamin kata sandi asli tidak dapat di-reverse engineering meskipun database pengguna bocor ke publik.',
        subTopik: 'Review UAS - Keamanan Kriptografi',
      },
      {
        id: 'q16-3',
        question: 'Berdasarkan Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022), manakah di bawah ini yang dikategorikan sebagai "Data Pribadi Bersifat Spesifik" yang membutuhkan perlindungan tingkat tinggi?',
        options: [
          'Nama lengkap dan jenis kelamin',
          'Data riwayat kesehatan rekam medis dan data biometrik',
          'Nama akun media sosial publik',
          'Warna kendaraan pribadi',
        ],
        correctAnswer: 1,
        explanation: 'UU PDP mengklasifikasikan data kesehatan, rekam medis, data biometrik, genetika, dan data keuangan anak sebagai Data Pribadi Spesifik.',
        subTopik: 'Review UAS - Hukum Privasi Data',
      },
      {
        id: 'q16-4',
        question: 'Pada sistem kecerdasan buatan, jika sebuah model pengenalan ucapan (speech recognition) sering gagal mengenali suara wanita dan aksen daerah karena dataset pelatihannya hanya berisi rekaman pria perkotaan, hal ini merupakan contoh dari...',
        options: ['Data Compression Error', 'Algorithmic / Training Data Bias', 'Quantum Computing Failure', 'Buffer Overflow'],
        correctAnswer: 1,
        explanation: 'Bias pada model AI terjadi ketika dataset pelatihan (training dataset) tidak representatif terhadap keragaman dunia nyata.',
        subTopik: 'Review UAS - Etika AI',
      },
      {
        id: 'q16-5',
        question: 'Berapakah bobot resmi Ujian Akhir Semester (UAS) dalam sistem evaluasi mata kuliah Pengantar Teknologi Informasi (TI001)?',
        options: ['15%', '20%', '30%', '35%'],
        correctAnswer: 3,
        explanation: 'UAS memiliki bobot resmi tertinggi yaitu 35% sesuai silabus RPS mata kuliah TI001.',
        subTopik: 'Review UAS - Sistem Penilaian',
      },
    ],
    panduanBelajar: 'Manfaatkan seluruh modul pembelajaran dan latihan kuis di setiap pertemuan untuk memaksimalkan perolehan nilai pada Ujian Akhir Semester.',
    linkReferensi: 'Silabus Resmi TI001',
  },
};
