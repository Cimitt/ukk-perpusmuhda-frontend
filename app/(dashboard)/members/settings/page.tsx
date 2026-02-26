'use client'

import { useState } from 'react'
import { 
  UserIcon, 
  CameraIcon, 
  MapPinIcon, 
  PhoneIcon, 
  SaveIcon,
  ShieldIcon,
  MailIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export default function UserSettingsPage() {
  const [previewImage, setPreviewImage] = useState('https://github.com/shadcn.png')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pengaturan Profil</h1>
        <p className="text-sm text-muted-foreground">Kelola informasi publik dan detail kontak kamu.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* KOLOM KIRI: EDIT PROFIL (8 Kolom) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <UserIcon className="size-4 text-primary" /> Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Foto Profil */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-50">
                <div className="relative group">
                  <Avatar className="size-24 border-4 border-white shadow-xl">
                    <AvatarImage src={previewImage} />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="picture" 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <CameraIcon className="size-6 text-white" />
                    <input 
                      type="file" 
                      id="picture" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Foto Profil</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Format: JPG, PNG atau GIF.<br />Maksimal ukuran file 2MB.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 h-8 text-[10px]" onClick={() => document.getElementById('picture')?.click()}>
                    Ganti Foto
                  </Button>
                </div>
              </div>

              {/* Form Update Data */}
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullname" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nama Lengkap</Label>
                    <Input id="fullname" defaultValue="Ahmad Maulana" disabled className="bg-slate-50/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nis" className="text-xs font-bold uppercase tracking-wider text-slate-500">NIS / Nomor Induk</Label>
                    <Input id="nis" defaultValue="2026010001" disabled className="bg-slate-50/50" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nomor Telepon</Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input id="phone" placeholder="0812xxxx" className="pl-10" defaultValue="081234567890" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-slate-500">Alamat Lengkap</Label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 size-4 text-slate-400" />
                    <textarea 
                      id="address" 
                      rows={3}
                      className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Jl. Pendidikan No. 45, Kecamatan Sukamaju, Jakarta Timur"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full sm:w-fit gap-2 shadow-lg shadow-primary/20">
                  <SaveIcon className="size-4" /> Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: KEAMANAN & INFO (4 Kolom) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldIcon className="size-4 text-primary" /> Keamanan Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[10px] font-bold uppercase text-slate-500">Email Utama</Label>
                <div className="flex items-center gap-2">
                  <Input id="email" defaultValue="ahmad@student.sch.id" disabled className="h-8 text-xs bg-slate-50" />
                  <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0">
                    <Edit3Icon className="size-3" />
                  </Button>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full text-xs h-9 gap-2">
                Ubah Password
              </Button>
            </CardContent>
          </Card>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3 items-start">
            <div className="p-1.5 bg-amber-100 rounded-lg">
              <ShieldIcon className="size-4 text-amber-600" />
            </div>
            <div className="space-y-1">
              <h5 className="text-[11px] font-bold text-amber-900">Verifikasi Data</h5>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                Beberapa data seperti Nama dan NIS hanya bisa diubah melalui Admin Perpustakaan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ikon tambahan untuk melengkapi button
function Edit3Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}