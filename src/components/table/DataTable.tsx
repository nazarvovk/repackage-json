import {
  ColumnDef,
  InitialTableState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from './DataTablePagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export interface DataTableProps<TRow = unknown, TValue = unknown> {
  data: TRow[]
  columns: ColumnDef<TRow, TValue>[]
  initialState: InitialTableState
  pageSizes: number[]
}

export const DataTable = <TRow, TValue>(props: DataTableProps<TRow, TValue>) => {
  const { data, columns, initialState, pageSizes } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState,
  })

  const { rows } = table.getRowModel()

  return (
    <div className='space-y-2'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className='py-2' key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className='h-8'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-0'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='rounded-md border py-2'>
        <DataTablePagination table={table} pageSizes={pageSizes} />
      </div>
    </div>
  )
}
