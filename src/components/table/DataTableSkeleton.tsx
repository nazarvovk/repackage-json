import { AccessorKeyColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FC } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export interface DataTableSkeletonProps<T extends object = any> {
  columns: AccessorKeyColumnDef<T, string[]>[];
}

export const DataTableSkeleton: FC<DataTableSkeletonProps> = ({ columns }) => {
  const table = useReactTable({
    data: Array.from({ length: 10 }) as any[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="py-2" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((_, i) => (
            <TableRow key={i} className="h-16">
              {columns.map((column) => (
                <TableCell key={column.accessorKey.toString()}>
                  <Skeleton
                    // TODO variable column width property
                    className="h-[20px] w-[100px] rounded-md"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
