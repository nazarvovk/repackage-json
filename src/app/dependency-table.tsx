import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Dependencies } from '@/lib/utils'
import { ChevronDownIcon, CopyIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {
  AccessorKeyColumnDef,
  DisplayColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

type Dependency = {
  name: string
  version: string
}

type DependencyPropColumnDef = AccessorKeyColumnDef<Dependency, Dependency[keyof Dependency]>
type CustomColumnDef<T> = DisplayColumnDef<T, unknown>

const DEPENDENCY_TABLE_COLUMNS = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center py-1'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center py-1'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  } satisfies CustomColumnDef<Dependency>,
  {
    header: 'Name',
    accessorKey: 'name' satisfies keyof Dependency,
    cell: ({ cell, row }) => (
      <span className='cursor-pointer py-4 font-mono' onClick={() => row.toggleSelected()}>
        {cell.getValue()}
      </span>
    ),
  } satisfies AccessorKeyColumnDef<Dependency, string>,
  {
    header: 'Version',
    accessorKey: 'version' satisfies keyof Dependency,
    cell: ({ cell }) => <span className='py-4 font-mono'>{cell.getValue()}</span>,
  } satisfies AccessorKeyColumnDef<Dependency, string>,
  {
    id: 'select',
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex justify-center py-1'>
            <Button variant='ghost' className='p-2'>
              <DotsVerticalIcon className='size-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='cursor-pointer'>
            <a
              href={`https://www.npmjs.com/package/${row.original.name}`}
              target='_blank'
              rel='noreferrer'
            >
              <svg viewBox='0 0 780 250' className='size-8'>
                <path
                  fill='#231F20'
                  d='M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z'
                ></path>
              </svg>
              View <code className='text-blue-500'>{row.original.name}</code> on npm
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  } satisfies CustomColumnDef<Dependency>,
] as const satisfies (DependencyPropColumnDef | CustomColumnDef<Dependency>)[]

type DependenciesProps = {
  label: string
  dependencies: Dependencies
}

export const DependencyTable = (props: DependenciesProps) => {
  const { dependencies, label } = props

  const data = useMemo(
    () => Object.entries(dependencies).map(([name, version]) => ({ name, version })),
    [dependencies],
  )

  const table = useReactTable({
    data,
    columns: DEPENDENCY_TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'name', desc: false }],
      // All rows are selected by default
      rowSelection: Object.fromEntries(Object.keys(data).map((key) => [key, true])),
      pagination: { pageSize: 25 },
    },
  })

  const { rows } = table.getRowModel()
  const selectedRows = rows.filter((row) => row.getIsSelected())

  const depString = selectedRows.map((row) => row.original.name).join(' ')

  const depStringWithVersions = selectedRows
    .map((row) => `${row.original.name}@${row.original.version}`)
    .join(' ')

  return (
    <div className='space-y-2'>
      <div className='flex flex-wrap items-center justify-between'>
        <h3 className='text-lg font-bold'>{label}</h3>
        <div className='whitespace-nowrap'>
          <Tooltip>
            <TooltipTrigger disabled={selectedRows.length === 0} asChild>
              <Button
                variant='outline'
                onClick={() => {
                  navigator.clipboard.writeText(depString)
                }}
                className='rounded-r-none'
              >
                <CopyIcon className='mr-2 size-4' />
                Copy selected
              </Button>
            </TooltipTrigger>
            <TooltipContent className='bg-background text-current shadow ring-1 ring-ring'>
              <p className='max-w-sm whitespace-pre-wrap'>
                Copy to clipboard: <code className='text-blue-500'>{depString}</code>
              </p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={selectedRows.length === 0}>
              <Button variant='outline' className='rounded-l-none border-l-0 p-2'>
                <ChevronDownIcon className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Tooltip>
                <TooltipTrigger disabled={false} asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(depStringWithVersions)
                    }}
                    className='cursor-pointer'
                  >
                    <CopyIcon className='mr-2 size-4' />
                    Copy with versions
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent
                  side='right'
                  className='bg-background text-current shadow ring-1 ring-ring'
                >
                  <p className='max-w-sm whitespace-pre-wrap'>
                    Copy to clipboard:{' '}
                    <code className='text-blue-500'>{depStringWithVersions}</code>
                  </p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTable table={table} />
    </div>
  )
}
