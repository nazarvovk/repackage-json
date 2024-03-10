import { ChevronDownIcon } from '@radix-ui/react-icons'
import { HeaderContext, SortingFn } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export function generateTableHeader<T = unknown>(title: string) {
  const Header = ({ column }: HeaderContext<T, unknown>) => {
    const sorted = column.getIsSorted()
    const filtered = column.getIsFiltered()

    return (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {title}
        {sorted && (
          <ChevronDownIcon
            className={cn('ml-2 size-4 transition', { 'rotate-180': sorted === 'desc' })}
          />
        )}
        {filtered && <span className='ml-2'>Filtered</span>}
      </Button>
    )
  }
  Header.displayName = `Header-${title}`

  return Header
}

export const tableSortingFns: { [key: string]: SortingFn<unknown> } = {
  length: (rowA, rowB, id) => {
    const a: unknown[] = rowA.getValue(id)
    const b: unknown[] = rowB.getValue(id)
    return b.length - a.length
  },
  bool: (rowA, rowB, id) => {
    const a = rowA.getValue(id)
    const b = rowB.getValue(id)
    return a === b ? 0 : a ? -1 : 1
  },
}
