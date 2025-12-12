'use server';

/**
 * @fileOverview A Rule-Based assistant (No AI) that answers questions about the Parade Palace server.
 */

export type ServerQuestionInput = { question: string };
export type ServerQuestionOutput = { answer: string };

const FAQ_DATABASE = [
  {
    keywords: ['apa itu', 'tentang server', 'penjelasan server', 'deskripsi'],
    answer: "Halo! Parade Palace adalah komunitas buat kamu yang suka main game, bersosialisasi, atau sekadar cari tempat santai buat melepas penat. Intinya, kita di sini buat seru-seruan bareng tanpa drama! 👋"
  },
  {
    keywords: ['siapa saja', 'boleh gabung', 'bergabung', 'syarat join'],
    answer: "Siapa saja boleh bergabung! Mau kamu gamer hardcore, pemain santai, atau cuma mau nyari teman ngobrol, pintu kami selalu terbuka. Yang penting saling menghormati ya."
  },
  {
    keywords: ['hanya gamer', 'khusus gamer', 'bukan gamer'],
    answer: "Tentu tidak dong. Selain gaming, kami punya banyak channel buat ngobrolin hobi, musik, film, bahkan tempat buat curhat. Jadi kalau kamu lagi nggak mood main game, tetap bisa nongkrong asik di sini."
  },
  {
    keywords: ['dapat role', 'ambil role', 'self role', 'role member', 'cara role'],
    answer: "Biasanya kamu perlu membaca dan menyetujui Rules terlebih dahulu. Setelah itu, cek channel #self-role atau #ambil-role untuk memilih role sesuai minat dan game yang kamu mainkan."
  },
  {
    keywords: ['baru join', 'pertama kali', 'new member', 'harus apa'],
    answer: "Selamat datang! Langkah pertama: baca #rules biar paham aturannya. Kedua: ambil role kamu. Ketiga: langsung aja sapa member lain di General Chat. Jangan malu-malu, kami ramah kok!"
  },
  {
    keywords: ['link discord', 'invite link', 'link invite', 'tautan', 'join server', 'masuk discord'],
    answer: "Kamu bisa join server Parade Palace lewat link ini: https://discord.gg/tByJCrxmcV. Ditunggu kedatangannya! 🚀"
  },
  {
    keywords: ['game apa', 'list game', 'permainan'],
    answer: "Kami main macam-macam! Mulai dari game PC sampai mobile games. Biasanya tergantung apa yang lagi hype atau seru dimainkan bareng-bareng."
  },
  {
    keywords: ['cari teman', 'mabar', 'teman main', 'ajak main'],
    answer: "Gampang! Kamu bisa masuk ke channel khusus game tersebut, atau tag role game-nya di chat (misal: @MobileLegends). Bilang aja 'Gas mabar?', pasti ada yang nyaut."
  },
  {
    keywords: ['channel ml', 'mobile legends', 'valorant', 'pubg', 'channel game'],
    answer: "Ada dong! Kami menyediakan channel teks dan suara khusus untuk game-game populer supaya komunikasinya lebih fokus dan tidak mengganggu obrolan umum."
  },
  {
    keywords: ['game sepi', 'tidak populer', 'game lain', 'game indie'],
    answer: "Boleh banget! Justru di sini tempatnya meracuni teman lain buat main game baru. Siapa tahu ada member lain yang ternyata main game itu juga."
  },
  {
    keywords: ['voice', 'vc', 'suara', 'open mic'],
    answer: "Siap sedia! Kami punya beberapa Voice Channel (VC) gaming. Langsung aja masuk ke VC yang kosong atau sesuai nama game-nya."
  },
  {
    keywords: ['curhat', 'ngobrol', 'santai', 'cerita'],
    answer: "Kami punya channel khusus untuk chit-chat santai. Kalau mau curhat yang agak deep atau sekadar ngobrolin keseharian, kamu bisa pakai channel tersebut. Ingat, sesama member harus saling support ya!"
  },
  {
    keywords: ['musik', 'lagu', 'dengar', 'nyanyi'],
    answer: "Bisa banget! Gabung aja ke Voice Channel musik atau lounge. Kita biasanya pakai bot musik buat nemenin suasana nongkrong biar makin chill."
  },
  {
    keywords: ['event', 'turnamen', 'lomba', 'kompetisi'],
    answer: "Kami selalu berusaha bikin komunitas ini seru. Event mabar, karaoke, atau turnamen kecil-kecilan pasti ada. Pantau terus channel Announcement biar nggak ketinggalan!"
  },
  {
    keywords: ['admin', 'moderator', 'masalah', 'lapor', 'bantuan'],
    answer: "Kamu bisa cek daftar member di sebelah kanan dan cari yang punya role Admin atau Moderator. Jangan ragu buat DM atau tag mereka kalau kamu butuh bantuan atau melihat pelanggaran rules."
  },
  {
    keywords: ['politik', 'agama', 'sara', 'drama'],
    answer: "Sesuai aturan 'Hindari Drama', sebaiknya topik berat seperti politik, agama, atau SARA dihindari ya. Kita di sini tujuannya buat have fun dan damai. Yuk bahas yang asik-asik aja! 🚫"
  },
  {
    keywords: ['pencipta', 'creator', 'pembuat', 'owner', 'enrico'],
    answer: "Enrico Anderson"
  }
];

export async function answerServerQuestion(
  input: ServerQuestionInput
): Promise<ServerQuestionOutput> {
  const lowercaseQuestion = input.question.toLowerCase();

  // Find the best match
  const match = FAQ_DATABASE.find(entry =>
    entry.keywords.some(keyword => lowercaseQuestion.includes(keyword))
  );

  if (match) {
    return { answer: match.answer };
  }

  // Fallback if no match found
  return {
    answer: "Maaf, saya adalah sistem otomatis sederhana. Saya bisa menjawab pertanyaan tentang cara join, role, event, atau game yang dimainkan. Silakan coba gunakan kata kunci yang lebih spesifik."
  };
}
