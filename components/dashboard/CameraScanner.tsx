'use client'

import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect } from 'react'

interface CameraScannerProps {
  onScanSuccess: (decodedText: string) => void
}

export default function CameraScanner({ onScanSuccess }: CameraScannerProps) {
  useEffect(() => {
    // Pastikan kode hanya berjalan di browser
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.777778 // Rasio 16:9 agar barcode lebih mudah terlihat
      },
      /* verbose= */ false
    )

    scanner.render(
      (decodedText: string) => {
        onScanSuccess(decodedText)
      },
      (error: string) => {
        // Error sering terjadi saat kamera mencari barcode, 
        // biarkan kosong untuk menghindari spam console.
      }
    )

    // Cleanup saat komponen unmount
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error))
    }
  }, [onScanSuccess])

  return (
    <div className='overflow-hidden rounded-xl border-2 border-dashed bg-slate-50'>
      <div id="reader" className="w-full"></div>
      <div className='bg-slate-900 p-2 text-center'>
        <p className='text-[10px] font-medium text-white uppercase tracking-widest'>
          Mode Testing Kamera Aktif
        </p>
      </div>
    </div>
  )
}