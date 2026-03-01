'use client'

import { useState } from 'react'
import { Search, Play, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import Footer from '@/components/shadcn-studio/blocks/footer-component-01/footer-component-01'


const authorCategories = [
  { label: 'Top 250 Authors', active: true },
  { label: 'Favorite Indie Authors', active: false },
  { label: 'Under 30', active: false },
  { label: 'Epic Authors', active: false },
  { label: 'Booker Prize Winners', active: false },
]

const authorCards = [
  {
    id: 1,
    title: 'Top Authors',
    sub: 'Read them side of the story',
    bg: '#7EC8C8',
    imgUrl: 'https://placehold.co/180x220/7EC8C8/1a1a1a?text=👴',
  },
  {
    id: 2,
    title: 'Female Authors',
    sub: 'Most influential women in history',
    bg: '#F5D87A',
    imgUrl: 'https://placehold.co/180x220/F5D87A/1a1a1a?text=👩',
  },
  {
    id: 3,
    title: 'Greek Originals',
    sub: 'Learn from the masters',
    bg: '#F0B89A',
    imgUrl: 'https://placehold.co/180x220/F0B89A/1a1a1a?text=🏛️',
  },
]

const audiobooks = [
  { id: 1, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", duration: "15 hrs 55 mins", cover: 'https://placehold.co/56x72/c0392b/ffffff?text=HP' },
  { id: 2, title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/e67e22/ffffff?text=HP' },
  { id: 3, title: "A Game of Thrones: A Song of Ice and Fire", author: "Roy Dalrice", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/2c3e50/ffffff?text=GoT' },
  { id: 4, title: "Born a Crime: Stories from a South Afric...", author: "J.K. Rowling", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/27ae60/ffffff?text=BAC' },
  { id: 5, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", duration: "15 hrs 55 mins", cover: 'https://placehold.co/56x72/f39c12/ffffff?text=SA' },
  { id: 6, title: "Traction and Orthopaedic Appliances", author: "J.K. Rowling", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/8e44ad/ffffff?text=TO' },
  { id: 7, title: "Competitive Advantage: Creating and Sustaining...", author: "Michael E. Porter", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/16a085/ffffff?text=CA' },
  { id: 8, title: "Steve Jobs", author: "Walter Isaacson", duration: "20 hrs 55 mins", cover: 'https://placehold.co/56x72/7f8c8d/ffffff?text=SJ' },
]

const genres = [
  { label: 'Espionage', count: '187 Authors', bg: '#1a1a2e' },
  { label: 'Mystery', count: '641 Authors', bg: '#16213e' },
  { label: 'Crime', count: '1500 Authors', bg: '#0f3460' },
  { label: 'Love', count: '841 Authors', bg: '#533483' },
  { label: 'Fantasy', count: '968 Authors', bg: '#2b2d42' },
  { label: 'Discover', count: 'Collection of the all', bg: '#1a1a1a' },
]

const showcaseBooks = [
  { id: 1, title: 'The Jungle Book', author: 'Rudyard Kipling', cover: 'https://placehold.co/160x220/27ae60/ffffff?text=🌿', desc: 'On a warm evening in the Seeonee hills, a family of wolves finds someone at the threshold...' },
  { id: 2, title: 'The Wolf Wilder', author: 'K. Rundell', cover: 'https://placehold.co/160x220/2c3e50/ffffff?text=🐺', desc: '"Fairy tale and history merge seamlessly" Publishers Weekly, starred review.' },
  { id: 3, title: 'The Girl of Ink & Stars', author: 'Kiran M. Hargrave', cover: 'https://placehold.co/160x220/e67e22/ffffff?text=⭐', desc: 'Forbidden to leave her island, Isabella dreams of the faraway lands her cartographer father...' },
  { id: 4, title: 'Cogheart', author: 'Peter Bunzl', cover: 'https://placehold.co/160x220/3498db/ffffff?text=⚙️', desc: "When 13-year-old Lily's inventor father vanishes after a Zeppelin crash, Lily is determined..." },
  { id: 5, title: 'Macbeth', author: 'William Shakespeare', cover: 'https://placehold.co/160x220/c0392b/ffffff?text=👑', desc: '"Fairy tale and history merge seamlessly" Publishers Weekly, starred review...' },
]

const lists = [
  { id: 1, title: 'Best Books of the 21st Century', stats: '15.8k Books · 402.2k Votes', covers: ['https://placehold.co/48x64/27ae60/fff?text=1', 'https://placehold.co/48x64/e67e22/fff?text=2', 'https://placehold.co/48x64/c0392b/fff?text=3', 'https://placehold.co/48x64/8e44ad/fff?text=4'] },
  { id: 2, title: 'Old Philosophy Reading List', stats: '70 Books · 16.2k Votes', covers: ['https://placehold.co/48x64/2c3e50/fff?text=A', 'https://placehold.co/48x64/16a085/fff?text=B', 'https://placehold.co/48x64/d35400/fff?text=C', 'https://placehold.co/48x64/7f8c8d/fff?text=D'] },
  { id: 3, title: 'Horror Nights', stats: '120 Books · 118.2k Votes', covers: ['https://placehold.co/48x64/1a1a1a/fff?text=X', 'https://placehold.co/48x64/2c3e50/fff?text=Y', 'https://placehold.co/48x64/7f8c8d/fff?text=Z', 'https://placehold.co/48x64/c0392b/fff?text=W'] },
]

import Header from '@/components/shadcn-studio/blocks/hero-section-41/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-41/hero-section-41'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '#' },
  { title: 'About', href: '#' },
  { title: 'Books', href: '#' },
]

const menudata = [
  { id: 1, img: '/1.png', imgAlt: 'plate-1', userComment: 'author 1.', userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png' },
  { id: 2, img: '/1.png', imgAlt: 'plate-2', userComment: 'author 2.', userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png' },
  { id: 3, img: '/1.png', imgAlt: 'plate-3', userComment: 'author 3.', userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png' },
  { id: 4, img: '/1.png', imgAlt: 'plate-4', userComment: 'author 4.', userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png' },
  { id: 5, img: '/1.png', imgAlt: 'plate-3', userComment: 'author 5.', userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png' },
]

function Blob({ className, color = '#c8e6c9' }: { className?: string; color?: string }) {
  return (
    <div
      className={`absolute rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-40 ${className}`}
      style={{ background: color }}
    />
  )
}

// hero

const HeroSectionPage = () => {
  return (
    <div className='w-full max-w-full overflow-x-hidden'>

      <Header navigationData={navigationData} />
      <main className='flex flex-col pt-17.5'>
        <HeroSection menudata={menudata} />
      </main>
    </div>
  )
}

// search

function SearchBar() {
  return (
    <div className='bg-white border-b border-gray-100 sticky top-14 z-40 w-full'>
      <div className='max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3'>

        {/* Search input */}
        <div className='flex items-center gap-2 text-gray-400 flex-1 min-w-0 max-w-xs'>
          <Search size={16} className='shrink-0' />
          <input
            placeholder='Search'
            className='text-sm text-gray-700 outline-none placeholder:text-gray-400 w-full bg-transparent min-w-0'
          />
        </div>

        {/* FIX 2: nav hidden di mobile, tampil mulai md */}
        <nav className='hidden md:flex gap-6 lg:gap-8 shrink-0'>
          {['Books', 'Authors', 'Genres', 'Lists'].map((item) => (
            <a
              key={item}
              href='#'
              className='text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap'
            >
              {item}
            </a>
          ))}
        </nav>

        {/* FIX 3: Hamburger tampil di mobile sebagai pengganti nav */}
        <button className='md:hidden shrink-0 p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='3' y1='6' x2='21' y2='6' />
            <line x1='3' y1='12' x2='21' y2='12' />
            <line x1='3' y1='18' x2='21' y2='18' />
          </svg>
        </button>

      </div>
    </div>
  )
}

// author

function AuthorsSection() {
  const [active, setActive] = useState(0)
  return (
    <section className='py-10'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <h2 className='text-2xl font-black text-gray-900 mb-4' style={{ fontFamily: 'Georgia, serif' }}>Authors</h2>

        {/* Scroll horizontal tanpa scrollbar terlihat */}
        <div className='flex gap-6 mb-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {authorCategories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`text-sm whitespace-nowrap font-medium pb-1 border-b-2 transition-all ${
                i === active
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {authorCards.map((card) => (
            <div
              key={card.id}
              className='relative rounded-xl overflow-hidden h-48 cursor-pointer group'
              style={{ backgroundColor: card.bg }}
            >
              <div className='absolute inset-0 p-5 flex flex-col justify-end z-10'>
                <h3 className='text-xl font-black text-gray-900 leading-tight' style={{ fontFamily: 'Georgia, serif' }}>
                  {card.title}
                </h3>
                <p className='text-xs text-gray-700 mt-1'>{card.sub}</p>
              </div>
              <img
                src={card.imgUrl}
                alt={card.title}
                className='absolute right-0 bottom-0 h-44 w-auto object-cover opacity-70 group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// audiobook

function AudiobookSection() {
  return (
    <section className='py-10 bg-gray-50/50'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <h2 className='text-2xl font-black text-gray-900 mb-6' style={{ fontFamily: 'Georgia, serif' }}>Recomendation</h2>

        {/* FIX 5: grid-cols-4 → 1 kolom mobile, 2 sm, 4 lg */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5'>
          {audiobooks.map((book) => (
            <div key={book.id} className='flex gap-3 items-start group cursor-pointer'>
              <div className='relative shrink-0'>
                <img src={book.cover} alt={book.title} className='w-14 h-18 rounded-lg object-cover shadow-sm' />
                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Play size={10} fill='currentColor' className='text-gray-800 ml-0.5' />
                </div>
              </div>
              <div className='min-w-0'>
                <p className='text-xs font-semibold text-gray-800 leading-snug line-clamp-2'>{book.title}</p>
                <p className='text-xs text-gray-400 mt-1'>{book.author}</p>
                <p className='text-xs text-gray-400'>{book.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// about sections

function AboutSection() {
  const stats = [
    { value: '3.500+', label: 'Koleksi Buku' },
    { value: '1.200+', label: 'Siswa Aktif' },
    { value: '25+', label: 'Kategori Buku' },
    { value: '5 Tahun', label: 'Melayani Literasi' },
  ]

  return (
    <section className='py-20 relative overflow-hidden bg-[#0f1117]'>

      <div
        className='absolute top-0 left-0 w-80 h-80 rounded-full opacity-10'
        style={{
          background: 'radial-gradient(circle, #2E8B57 0%, transparent 70%)',
          transform: 'translate(-40%, -40%)',
        }}
      />
      <div
        className='absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10'
        style={{
          background: 'radial-gradient(circle, #F4C430 0%, transparent 70%)',
          transform: 'translate(40%, 40%)',
        }}
      />

      <div className='max-w-7xl mx-auto px-4 md:px-6 relative z-10'>

        {/* Label */}
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-8 h-px bg-[#F4C430]' />
          <span className='text-[#F4C430] text-xs font-bold tracking-[0.3em] uppercase'>
            Tentang Kami
          </span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

          {/* Left Content */}
          <div>
            <h2 className='text-4xl md:text-5xl font-black text-white leading-tight mb-6'>
              PerpusMuhda —
              <span className='text-[#F4C430]'> Pusat Literasi </span>
              SMK Muhammadiyah 2 Klaten Utara
            </h2>

            <p className='text-gray-300 text-base leading-relaxed mb-5'>
              PerpusMuhda adalah pusat sumber belajar dan literasi di lingkungan
              SMK Muhammadiyah 2 Klaten Utara. Kami menyediakan berbagai koleksi
              buku pelajaran, referensi kejuruan, novel, hingga buku pengembangan diri
              untuk mendukung prestasi akademik dan karakter siswa.
            </p>

            <p className='text-gray-400 text-sm leading-relaxed mb-8'>
              Kami percaya bahwa budaya membaca adalah fondasi masa depan.
              Perpustakaan bukan hanya tempat meminjam buku, tetapi ruang
              tumbuhnya ide, kreativitas, dan inspirasi.
            </p>

            <div className='flex flex-wrap gap-3'>
              <button className='px-6 py-3 bg-[#F4C430] text-gray-900 text-sm font-bold rounded-full hover:bg-yellow-400 transition'>
                Jelajahi Koleksi
              </button>
              <button className='px-6 py-3 border border-white/20 text-white text-sm rounded-full hover:bg-white/5 transition'>
                Lihat Tata Tertib →
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <div className='rounded-2xl p-6 border border-white/10 bg-[#1a1f2e] mb-8'>
              <p className='text-white/80 text-sm leading-relaxed'>
                "Membaca adalah jendela dunia. Dengan membaca,
                kita memperluas wawasan dan memperkuat iman."
              </p>
              <p className='text-gray-500 text-xs mt-3'>
                — PerpusMuhda
              </p>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-4'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='rounded-xl p-4 border border-white/5 bg-[#1a1f2e]'
                >
                  <p className='text-2xl font-black text-white mb-1'>
                    {stat.value}
                  </p>
                  <p className='text-gray-400 text-xs'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// author by genre

function GenresSection() {
  return (
    <section className='py-10'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <h2 className='text-2xl font-black text-gray-900 mb-6' style={{ fontFamily: 'Georgia, serif' }}>Authors by Genres</h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
          {genres.map((g) => (
            <div
              key={g.label}
              className='relative rounded-xl overflow-hidden h-28 cursor-pointer group'
              style={{ backgroundColor: g.bg }}
            >
              <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-3 z-10'>
                <p className='text-white text-sm font-bold leading-tight'>{g.label}</p>
                <p className='text-gray-400 text-xs mt-0.5'>{g.count}</p>
              </div>
              <div className='absolute top-2 left-2 w-2 h-2 rounded-full bg-white/30' />
              <div className='absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/20' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// books showcase

function BooksShowcase() {
  return (
    <section className='py-10 bg-gray-50/50'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-black text-gray-900' style={{ fontFamily: 'Georgia, serif' }}>Books Showcase</h2>
          <div className='flex gap-2'>
            <button className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors'>
              <ChevronLeft size={16} />
            </button>
            <button className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors'>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5'>
          {showcaseBooks.map((book) => (
            <div key={book.id} className='group cursor-pointer'>
              <div className='relative mb-3 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300'>
                <img
                  src={book.cover}
                  alt={book.title}
                  className='w-full aspect-3/4 object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <h3 className='font-bold text-sm text-gray-900 leading-snug mb-1 line-clamp-2'>{book.title}</h3>
              <p className='text-xs text-gray-400 leading-relaxed line-clamp-3 mb-2'>{book.desc}</p>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full bg-gray-200 shrink-0' />
                <p className='text-xs text-gray-500'>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// list sections

function ListsSection() {
  return (
    <section className='py-10 relative overflow-hidden'>
      <Blob className='w-48 h-48 -right-10 top-0' color='#ffe082' />
      <Blob className='w-32 h-32 right-1/3 bottom-0' color='#f8bbd0' />
      <div className='max-w-6xl mx-auto px-4 md:px-6 relative z-10'>
        <h2 className='text-2xl font-black text-gray-900 mb-6' style={{ fontFamily: 'Georgia, serif' }}>List</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
          {lists.map((list) => (
            <div key={list.id} className='cursor-pointer group'>
              <div className='flex gap-1 mb-3'>
                {list.covers.map((cover, i) => (
                  <img
                    key={i}
                    src={cover}
                    alt=''
                    className={`rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow ${
                      i === 0 ? 'w-20 h-28' : 'w-12 h-16 self-end'
                    }`}
                  />
                ))}
              </div>
              <h3 className='font-bold text-sm text-gray-900 mb-1'>{list.title}</h3>
              <p className='text-xs text-gray-400'>{list.stats}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"

function CTABanner() {
  return (
    <section className='py-6 px-4 md:px-6 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div
          className='relative rounded-3xl overflow-hidden px-6 md:px-12 py-14 md:py-16'
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f3460 100%)' }}
        >

          {/* glow */}
          <div
            className='absolute top-0 left-1/3 w-64 h-64 rounded-full opacity-20 pointer-events-none'
            style={{
              background: 'radial-gradient(circle, #F4C430 0%, transparent 70%)',
            }}
          />

          {/* label */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-px bg-[#F4C430]' />
            <span className='text-[#F4C430] text-xs font-bold tracking-[0.3em] uppercase'>
              PerpusMuhda
            </span>
          </div>

          <div className='relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>

            {/* left */}
            <div className='max-w-xl'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4'>
                Bergabunglah Bersama
                <br />
                <span className='text-[#F4C430]'>Perpustakaan Digital</span>
              </h2>

              <p className='text-gray-300 text-sm md:text-base leading-relaxed'>
                Akses koleksi buku, kelola peminjaman, dan tingkatkan budaya literasi
                bersama PerpusMuhda — pusat literasi
                SMK Muhammadiyah 2 Klaten Utara.
              </p>
            </div>

            {/* right cta */}
            <div className='w-full lg:w-auto shrink-0'>
              <Link href="/signup">
                <button
                  className='w-full lg:w-auto px-10 py-4 rounded-2xl text-sm md:text-base font-bold text-gray-900 hover:brightness-110 transition-all duration-200 active:scale-95'
                  style={{
                    background: 'linear-gradient(135deg, #F4C430 0%, #e6b800 100%)',
                  }}
                >
                  Daftar Sekarang →
                </button>
              </Link>

              <p className='text-gray-500 text-xs mt-3 text-center lg:text-left'>
                Gratis untuk seluruh siswa & guru.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// footer

const FooterPage = () => {
  return <Footer />
}

// page

export default function ReaderHomepage() {
  return (
    <div className='min-h-screen bg-white font-sans antialiased overflow-x-hidden'>
      <HeroSectionPage />
      <SearchBar />
      <AuthorsSection />
      <AudiobookSection />
      <AboutSection />
      <GenresSection />
      <CTABanner />
      <BooksShowcase />
      <ListsSection />
      <Footer />
    </div>
  )
}