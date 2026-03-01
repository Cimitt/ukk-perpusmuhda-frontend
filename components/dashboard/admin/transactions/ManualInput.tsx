'use client'

import { useState } from 'react'
import { ScanBarcodeIcon, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ManualInputProps {
  placeholder: string
  onSubmit: (code: string) => Promise<void>
  disabled?: boolean
  autoFocus?: boolean
}

export function ManualInput({ placeholder, onSubmit, disabled, autoFocus }: ManualInputProps) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || loading || disabled) return

    setLoading(true)
    try {
      await onSubmit(value.trim())
      setValue('') // Clear input after success
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div className='relative'>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          autoFocus={autoFocus}
          className='w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-4 pr-12 text-lg font-mono placeholder:text-slate-300 focus:border-primary outline-none transition-all disabled:opacity-50'
        />
        {loading ? (
          <Loader2Icon className='absolute right-4 top-1/2 -translate-y-1/2 text-primary size-5 animate-spin' />
        ) : (
          <ScanBarcodeIcon className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 size-5' />
        )}
      </div>

      <Button type='submit' disabled={!value.trim() || loading || disabled} className='w-full'>
        {loading ? (
          <>
            <Loader2Icon className='mr-2 size-4 animate-spin' />
            Memproses...
          </>
        ) : (
          'Submit'
        )}
      </Button>

      <p className='text-xs text-center text-muted-foreground'>
        Ketik barcode/NIS lalu tekan Enter atau klik Submit
      </p>
    </form>
  )
}