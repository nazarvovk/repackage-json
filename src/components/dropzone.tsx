'use client'
import { DragEvent, InputHTMLAttributes, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DropzoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  handleOnDrop: (acceptedFiles: FileList | null) => void
  isLoading?: boolean
}

const Dropzone = ({ handleOnDrop, isLoading, children, ...props }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleOnDrop(null)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    if (inputRef.current) {
      inputRef.current.files = files
      handleOnDrop(files)
    }
  }

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div
      className={cn(
        'flex min-h-60 flex-col items-center justify-center space-y-2 rounded-lg border border-dashed px-2 py-4 text-xs transition',
        props.disabled ? 'bg-muted/50' : 'bg-muted hover:border-muted-foreground/50',
        isLoading ? 'cursor-wait' : props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <div className='flex flex-col items-center justify-center gap-4 p-4 text-muted-foreground'>
        {children}
        <Input
          {...props}
          value={undefined}
          ref={inputRef}
          type='file'
          className='hidden'
          disabled={props.disabled || isLoading}
          onChange={({ target: { files } }) => handleOnDrop(files)}
        />
      </div>
    </div>
  )
}

export default Dropzone
