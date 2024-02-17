import type { Metadata } from 'next'
import { Repackage } from './repackage'

export const metadata: Metadata = {
  title: 'RePackage.JSON',
}

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-2 p-8'>
      <h1 className='text-2xl font-bold'>RePackage.JSON</h1>
      <p className='text-xs text-zinc-500'>
        This app is fully client-side and does not send or store any data. Your file is processed in
        your browser.
      </p>
      <Repackage />
    </main>
  )
}
