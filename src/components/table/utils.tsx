import { ChevronDownIcon } from '@radix-ui/react-icons';
import { HeaderContext, SortingFn } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function generateTableHeader<T = any>(title: string) {
  return ({ column }: HeaderContext<T, unknown>) => {
    const sorted = column.getIsSorted();
    const filtered = column.getIsFiltered();

    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {title}
        {sorted && <ChevronDownIcon className={cn('ml-2 h-4 w-4 transition', { 'rotate-180': sorted === 'desc' })} />}
        {filtered && <span className="ml-2">Filtered</span>}
      </Button>
    );
  };
}

export const tableSortingFns: { [key: string]: SortingFn<any> } = {
  length: (rowA, rowB, id) => {
    const a: any[] = rowA.getValue(id);
    const b: any[] = rowB.getValue(id);
    return b.length - a.length;
  },
  bool: (rowA, rowB, id) => {
    const a = rowA.getValue(id);
    const b = rowB.getValue(id);
    return a === b ? 0 : a ? -1 : 1;
  },
};
