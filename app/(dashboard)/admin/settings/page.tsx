'use client'

import { 
  SchoolIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  CoinsIcon, 
  SaveIcon,
  UserCogIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Pengaturan</h1>
        <p className='text-muted-foreground text-sm'>Kelola konfigurasi sistem dan preferensi perpustakaan.</p>
      </div>

      <Tabs defaultValue="library" className="space-y-4">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="library" className="text-xs">
            <SchoolIcon className="mr-2 size-3" /> Perpustakaan
          </TabsTrigger>
          <TabsTrigger value="rules" className="text-xs">
            <CoinsIcon className="mr-2 size-3" /> Aturan & Denda
          </TabsTrigger>
          <TabsTrigger value="account" className="text-xs">
            <UserCogIcon className="mr-2 size-3" /> Akun
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: IDENTITAS PERPUSTAKAAN */}
        <TabsContent value="library">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Identitas Sekolah / Instansi</CardTitle>
              <CardDescription>Informasi ini akan muncul pada kartu member dan laporan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="school-name">Nama Perpustakaan</Label>
                <Input id="school-name" defaultValue="Perpustakaan SMK Negeri 1" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" defaultValue="Jl. Pendidikan No. 45, Jakarta" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Kontak</Label>
                  <Input id="email" type="email" defaultValue="perpus@smkn1.sch.id" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.smkn1.sch.id" />
                </div>
              </div>
              <Button size="sm" className="mt-4">
                <SaveIcon className="mr-2 size-4" /> Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: ATURAN PINJAM & DENDA */}
        <TabsContent value="rules">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Konfigurasi Peminjaman</CardTitle>
              <CardDescription>Tentukan batas waktu dan tarif denda keterlambatan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="max-books">Maksimal Buku Dipinjam</Label>
                    <Input id="max-books" type="number" defaultValue="3" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Durasi Pinjam (Hari)</Label>
                    <Input id="duration" type="number" defaultValue="7" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fine-rate">Denda per Hari (Rp)</Label>
                    <Input id="fine-rate" type="number" defaultValue="1000" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-slate-50/50">
                    <div className="space-y-0.5">
                      <Label>Hitung Hari Libur</Label>
                      <p className="text-[10px] text-muted-foreground">Denda tetap berjalan di hari Minggu.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              <Button size="sm">
                <SaveIcon className="mr-2 size-4" /> Update Aturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: AKUN & KEAMANAN */}
        <TabsContent value="account">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Keamanan Akun</CardTitle>
              <CardDescription>Ganti kata sandi admin untuk akses sistem.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="curr-pass">Password Saat Ini</Label>
                <Input id="curr-pass" type="password" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-pass">Password Baru</Label>
                  <Input id="new-pass" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="conf-pass">Konfirmasi Password</Label>
                  <Input id="conf-pass" type="password" />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-lg text-xs border border-amber-200">
                <ShieldCheckIcon className="size-4" />
                Disarankan menggunakan kombinasi huruf, angka, dan simbol.
              </div>
              <Button size="sm">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Footer Branding (Opsional) */}
      <div className="text-center pt-8 opacity-20">
        <p className="text-xs font-mono">Robook System v1.0.4 • 2026</p>
      </div>
    </div>
  )
}