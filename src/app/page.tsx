import Repackage from './repackage'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-8 px-8 py-24'>
      <h1 className='text-2xl font-bold'>RePackage.JSON</h1>
      <p>
        This app is fully client-side and does not send or store any data. Your file is processed in
        your browser.
      </p>
      <Repackage />
    </main>
  )
}
