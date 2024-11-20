import type { ColumnDef } from '@tanstack/vue-table';
import moment from 'moment-jalaali';

import type { IProject } from '~/interfaces/project.interface';

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: 'index',
    header: 'آیدی',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'title',
    header: 'عنوان',
  },
  {
    accessorKey: 'categories',
    header: 'دسته بندی',
  },
  {
    accessorKey: 'thumbnail',
    header: 'تصویر',
  },

  {
    accessorKey: 'createdAt',
    header: 'تاریخ ایجاد',
  },
  {
    header: 'عملیات',
  },
];
