'use client'

import { useEffect, useState } from 'react'
import Dropzone from '@/components/dropzone'
import { FilePlusIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { PackageJSON, PackageJsonSchema } from '@/lib/utils'
import { Dashboard } from './dashboard'

const JSON_FILE_TYPE = 'application/json'

const processPackageJson = async (files: FileList) => {
  if (files.length > 1) {
    throw new Error('Only one file is allowed')
  }
  const [file] = files
  if (file.type !== JSON_FILE_TYPE) {
    throw new Error(
      `File type ${JSON.stringify(file.type || 'unknown')} not supported. Import a valid json file.`,
    )
  }

  const fileReader = new FileReader()
  return new Promise<PackageJSON>((resolve, reject) => {
    fileReader.onload = () => {
      try {
        const packageJson = JSON.parse(fileReader.result?.toString() || '')
        const parsed = PackageJsonSchema.parse(packageJson)
        resolve(parsed)
      } catch (error) {
        reject(error)
      }
    }
    fileReader.readAsText(file)
  })
}

const Repackage = () => {
  const [error, setError] = useState<unknown>(null)
  const [packageJson, setPackageJson] = useState<null | PackageJSON>(null)
  const handleImportFile = async (files: FileList | null) => {
    setError(null)
    if (!files || !(files.length > 0)) return
    try {
      const packageJson = await processPackageJson(files)
      setPackageJson(packageJson)
      setError(null)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (packageJson) {
        event.preventDefault()
        event.returnValue = true
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [packageJson])

  return (
    <div>
      {packageJson ? (
        <Dashboard packageJson={packageJson} />
      ) : (
        <Dropzone handleOnDrop={handleImportFile}>
          <FilePlusIcon className='size-6' />

          {error ? (
            <div className='flex items-center gap-1 whitespace-pre text-red-500'>
              <InfoCircledIcon />
              <span>{String(error)}</span>
            </div>
          ) : (
            <span>
              Drag and drop your{' '}
              <code className='rounded border border-dashed border-zinc-400 px-2 py-1'>
                package.json
              </code>{' '}
              file here or click to select a file.
            </span>
          )}
        </Dropzone>
      )}
    </div>
  )
}

export default Repackage
