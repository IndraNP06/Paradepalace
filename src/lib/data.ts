import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, Bot, Check, Mic, ShieldCheck, Trophy, Users, X } from 'lucide-react';

export const serverStats = [
  {
    value: "15,849",
    label: "Total Anggota",
    icon: Users,
  },
  {
    value: "3,241",
    label: "Online Sekarang",
    icon: Mic,
  },
  {
    value: "8",
    label: "Bot",
    icon: Bot,
  },
];

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const teamMembers = [
  {
    id: "enrico",
    name: "Enrico",
    role: "Owner",
    avatar: '/Pp_ig/Enrico.jpg',
    avatarHint: "Enrico Profile Picture",
    socials: {
      twitter: "https://x.com/enr_cho?t=itNM4NLZqPNPghgdmjkS3g&s=09",
      instagram: "https://www.instagram.com/co_andrson/",
      youtube: "https://www.youtube.com/@chicho_8",
      tiktok: "https://www.tiktok.com/@chi_cho_8?is_from_webapp=1&sender_device=pc",
    }
  },
  {
    id: "yovin",
    name: "Yovin",
    role: "",
    avatar: '/Pp_ig/Yovin.jpg',
    avatarHint: "Yovin Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/kyovin_/?hl=id",
      youtube: null,
      tiktok: "https://www.tiktok.com/@whosyopin",
    }
  },
  {
    id: "turfat",
    name: "Turfat",
    role: "",
    avatar: '/Pp_ig/default.jpg',
    avatarHint: "Turfat Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/fatur_haidar_08/?hl=id",
      youtube: null,
      tiktok: null,
    }
  },
  {
    id: "nopal",
    name: "Nopal",
    role: "",
    avatar: '/Pp_ig/nopal.jpg',
    avatarHint: "Nopal Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/poalala_/",
      youtube: null,
      tiktok: null,
    }
  },
  {
    id: "zchv",
    name: "Zchv",
    role: "",
    avatar: '/Pp_ig/default.jpg',
    avatarHint: "Zchv Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/yardanzachava_/",
      youtube: null,
      tiktok: null,
    }
  },
  {
    id: "jill",
    name: "Jill",
    role: "",
    avatar: '/Pp_ig/jill.jpg',
    avatarHint: "Jill Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/aryasptnal/",
      youtube: null,
      tiktok: null,
    }
  },
  {
    id: "purwa",
    name: "Purwa",
    role: "",
    avatar: '/Pp_ig/default.jpg',
    avatarHint: "Purwa Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/purwasajid/",
      youtube: null,
      tiktok: 'https://www.tiktok.com/@purwasajid?is_from_webapp=1&sender_device=pc',
    }
  },
  {
    id: "kriezn",
    name: "Kriezn",
    role: "",
    avatar: '/Pp_ig/kriezn.jpg',
    avatarHint: "Kriezn Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/totally_unkown12/",
      youtube: null,
      tiktok: "https://www.tiktok.com/@kriezn1",
    }
  },
  {
    id: "alim",
    name: "Alim",
    role: "",
    avatar: '/Pp_ig/alim.jpg',
    avatarHint: "Alim Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/alimaktuall/?hl=id",
      youtube: null,
      tiktok: null,
    }
  },
  {
    id: "oscar",
    name: "Oscar",
    role: "",
    avatar: '/Pp_ig/Oscar.jpg',
    avatarHint: "Oscar Profile Picture",
    socials: {
      twitter: null,
      instagram: "https://www.instagram.com/oscarazhari/?hl=id",
      youtube: null,
      tiktok: null,
    }
  },
];

export const rankingSystem = [
  { level: "Tingkat Perunggu", requirement: "Level 1-10", description: "Mulai perjalanan Anda dan dapatkan akses ke channel dasar." },
  { level: "Tingkat Perak", requirement: "Level 11-25", description: "Buka lebih banyak channel dan berpartisipasi dalam polling." },
  { level: "Tingkat Emas", requirement: "Level 26-50", description: "Dapatkan kemampuan untuk streaming dengan kualitas lebih tinggi." },
  { level: "Kang Ronda", requirement: "Level 50+", description: "Para elit. Akses ke channel eksklusif dan pratinjau acara." },
];

export const specialRoles = [
  { name: "Server Booster", icon: ShieldCheck, description: "Diberikan karena telah boost server. Memberikan warna dan ikon unik." },
  // { name: "Juara Acara", icon: Trophy, description: "Diberikan kepada pemenang acara komunitas besar. Tanda keahlian sejati." },
  // { name: "Artisan", icon: Award, description: "Untuk anggota yang menyumbangkan seni dan konten luar biasa kepada komunitas." },
  { name: "Creator", icon: Mic, description: "YouTuber, Content Creator dan streamer di komunitas kami." },
];

export const uniqueBots = [
  { name: "Poketwo", description: "Bot Pokémon interaktif yang memunculkan monster liar secara acak saat anggota mengobrol di chat. Tangkap, latih level, dan adu Pokémon kamu dalam pertarungan PVP yang kompetitif bersama komunitas.", avatar: '/ppbotdc/poketwo.webp' },
  { name: "Waifugame", description: "Bot simulasi gacha anime yang memungkinkan kamu mengoleksi ribuan kartu karakter Waifu dan Husbando dari berbagai seri. Lakukan summon harian, klaim karakter impian, dan bertukar koleksi dengan pemain lain.", avatar: '/ppbotdc/waifugame.jpg' },
  { name: "PokeMeow", description: "Bot RPG Pokémon berbasis ekonomi dengan sistem grinding, lootbox, dan tingkat kelangkaan (rarity) yang detail. Fokus pada pencarian aktif melalui command untuk memburu Shiny, Legendary, serta menyelesaikan quest harian.", avatar: '/ppbotdc/pokemeow.webp' },
];

export const events = [
  // { isoDate: "2024-08-19T14:00:00.000Z", time: "9:00 PM WIB", title: "Movie Night", description: "Kami akan menonton film klasik sci-fi pilihan komunitas. Siapkan popcorn Anda!" },
  // { isoDate: "2024-08-21T13:00:00.000Z", time: "8:00 PM WIB", title: "Game Tournament", description: "Bergabunglah dengan kami untuk turnamen Valorant persahabatan. Hadiah untuk tim pemenang!" },
  // { isoDate: "2024-08-23T13:30:00.000Z", time: "8:30 PM WIB", title: "Karaoke Night", description: "Tunjukkan bakat terpendam Anda, dari menyanyi hingga komedi tunggal." },
  // { isoDate: "2024-08-26T14:00:00.000Z", time: "9:00 PM WIB", title: "Movie Night", description: "Malam nonton film horor! Pilihan film berdasarkan voting." },
  // { isoDate: "2024-08-28T13:00:00.000Z", time: "8:00 PM WIB", title: "Game Tournament", description: "Turnamen persahabatan League of Legends. Pamerkan keahlianmu!" },
];

export const galleryItems = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));


export const supportTiers = {
  headers: ["Fitur", "Anggota", "Donatur", "Booster"],
  icons: {
    check: Check,
    cross: X,
  },
  rows: [
    { feature: "Akses Emoji Kustom", values: [Check, Check, Check] },
    { feature: "Musik Kualitas Tinggi", values: [Check, Check, Check] },
    { feature: "Warna Profil", values: [X, Check, Check] },
    { feature: "Role Khusus 'Donatur'", values: [X, Check, X] },
    { feature: "Dukungan Prioritas", values: [X, Check, Check] },
    { feature: "Gunakan Emoji Eksternal", values: [X, X, Check] },
    { feature: "Role Khusus 'Booster'", values: [X, X, Check] },
    { feature: "Kustomisasi Profil Server", values: [X, X, Check] },
    { feature: "Batas Unggah Lebih Tinggi (100MB)", values: [X, X, Check] },
  ]
};

export const memberOfTheMonth = {
  name: "Coming Soon",
  contribution: "Project Hall of Fame akan segera hadir. Nantikan update selanjutnya!",
  avatar: '/Pp_ig/default.jpg',
  avatarHint: "Default Avatar",
};
