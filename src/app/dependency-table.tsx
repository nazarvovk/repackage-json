import { DataTable } from '@/components/table/DataTable'
import { Checkbox } from '@/components/ui/checkbox'
import { Dependencies } from '@/lib/utils'
import { AccessorKeyColumnDef, DisplayColumnDef } from '@tanstack/react-table'

type Dependency = {
  name: string
  version: string
}

type DependencyPropColumnDef = AccessorKeyColumnDef<Dependency, Dependency[keyof Dependency]>
type CustomColumnDef<T> = DisplayColumnDef<T, never>

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
] as const satisfies (DependencyPropColumnDef | CustomColumnDef<Dependency>)[]

type DependenciesProps = {
  label: string
  dependencies: Dependencies
}

export const DependencyTable = (props: DependenciesProps) => {
  const { dependencies, label } = props

  const depList = Object.entries(dependencies).map(([name, version]) => ({ name, version }))

  return (
    <div>
      <h3 className='text-lg font-bold'>{label}</h3>
      <DataTable
        data={depList}
        columns={DEPENDENCY_TABLE_COLUMNS}
        pageSizes={[15, 30, 50, 100]}
        initialState={{
          sorting: [{ id: 'name', desc: false }],
          // All rows are selected by default
          rowSelection: Object.fromEntries(Object.keys(depList).map((key) => [key, true])),
          pagination: { pageSize: 15 },
        }}
      />
    </div>
  )
}
