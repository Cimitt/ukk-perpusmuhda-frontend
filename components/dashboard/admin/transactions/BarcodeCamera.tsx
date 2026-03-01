'use client'

import { useEffect, useRef, useState } from 'react'
import { CameraIcon, CameraOffIcon, Loader2Icon, AlertCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface BarcodeCameraProps {
  onScanSuccess: (code: string) => void
  disabled?: boolean
}

export function BarcodeCamera({ onScanSuccess, disabled }: BarcodeCameraProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<any>(null)
  const isMountedRef = useRef(true)
  const hasStartedRef = useRef(false)

  const startScanning = async () => {
    if (isScanning || isInitializing || hasStartedRef.current) return

    try {
      setError(null)
      setIsInitializing(true)
      hasStartedRef.current = true

      // Dynamic import Html5Qrcode
      const { Html5Qrcode } = await import('html5-qrcode')

      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100))

      // Check if element exists
      const element = document.getElementById('barcode-reader')
      if (!element) {
        throw new Error('Scanner element not found')
      }

      // Initialize scanner
      const scanner = new Html5Qrcode('barcode-reader')
      scannerRef.current = scanner

      // Get camera devices
      const devices = await Html5Qrcode.getCameras()
      if (!devices || devices.length === 0) {
        throw new Error('No camera found')
      }

      // Start scanning
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          if (isMountedRef.current) {
            onScanSuccess(decodedText)
          }
        },
        () => {
          // Error callback - ignore
        }
      )

      if (isMountedRef.current) {
        setIsScanning(true)
      }
    } catch (err: any) {
      console.error('Camera error:', err)
      
      let errorMsg = 'Gagal mengakses kamera.'
      
      if (err.name === 'NotAllowedError') {
        errorMsg = 'Izin kamera ditolak. Mohon berikan akses kamera pada browser.'
      } else if (err.name === 'NotFoundError' || err.message === 'No camera found') {
        errorMsg = 'Kamera tidak ditemukan. Pastikan perangkat memiliki kamera.'
      } else if (err.name === 'NotReadableError') {
        errorMsg = 'Kamera sedang digunakan aplikasi lain.'
      } else if (err.message) {
        errorMsg = err.message
      }
      
      if (isMountedRef.current) {
        setError(errorMsg)
      }
      
      hasStartedRef.current = false
    } finally {
      if (isMountedRef.current) {
        setIsInitializing(false)
      }
    }
  }

  const stopScanning = async () => {
    if (!scannerRef.current) {
      setIsScanning(false)
      hasStartedRef.current = false
      return
    }

    try {
      const scanner = scannerRef.current
      
      // Check if scanner is running
      if (scanner.isScanning) {
        await scanner.stop()
      }
      
      // Clear scanner
      scanner.clear()
      
    } catch (err: any) {
      console.warn('Scanner stop warning:', err.message)
    } finally {
      scannerRef.current = null
      hasStartedRef.current = false
      if (isMountedRef.current) {
        setIsScanning(false)
      }
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      
      if (scannerRef.current) {
        try {
          if (scannerRef.current.isScanning) {
            scannerRef.current.stop()
          }
          scannerRef.current.clear()
        } catch (e) {
          // Ignore
        }
        scannerRef.current = null
      }
    }
  }, [])

  // Stop when disabled
  useEffect(() => {
    if (disabled && isScanning) {
      stopScanning()
    }
  }, [disabled])

  return (
    <div className='space-y-4'>
      {error && (
        <Alert variant='destructive'>
          <AlertCircleIcon className='size-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='relative'>
        <div
          id='barcode-reader'
          className='w-full rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-900'
          style={{ minHeight: '250px' }}
        />
        
        {!isScanning && !isInitializing && (
          <div className='absolute inset-0 flex items-center justify-center bg-slate-50'>
            <div className='text-center'>
              <CameraOffIcon className='size-12 mx-auto text-slate-300 mb-2' />
              <p className='text-sm text-muted-foreground'>Kamera belum aktif</p>
              <p className='text-xs text-muted-foreground mt-1'>
                Klik tombol untuk mulai scan
              </p>
            </div>
          </div>
        )}
        
        {isInitializing && (
          <div className='absolute inset-0 flex items-center justify-center bg-slate-50'>
            <div className='text-center'>
              <Loader2Icon className='size-12 mx-auto text-primary mb-2 animate-spin' />
              <p className='text-sm text-muted-foreground'>Memuat kamera...</p>
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-2'>
        {!isScanning ? (
          <Button
            onClick={startScanning}
            disabled={disabled || isInitializing}
            className='w-full'
          >
            {isInitializing ? (
              <>
                <Loader2Icon className='mr-2 size-4 animate-spin' />
                Memuat...
              </>
            ) : (
              <>
                <CameraIcon className='mr-2 size-4' />
                Aktifkan Kamera
              </>
            )}
          </Button>
        ) : (
          <Button onClick={stopScanning} className='w-full' variant='destructive'>
            <CameraOffIcon className='mr-2 size-4' />
            Matikan Kamera
          </Button>
        )}
      </div>

      {isScanning && (
        <div className='flex items-center justify-center gap-2 text-xs text-green-600 animate-pulse'>
          <div className='size-2 rounded-full bg-green-600' />
          <span className='font-medium'>Kamera aktif - Arahkan barcode ke kamera</span>
        </div>
      )}

      {!isScanning && !isInitializing && (
        <p className='text-xs text-center text-muted-foreground'>
          Pastikan izin kamera sudah diberikan pada browser
        </p>
      )}
    </div>
  )
}