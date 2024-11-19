import type { ColumnDef } from '@tanstack/vue-table';

import type { IProject } from '~/interfaces/project.interface';

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: 'id',
    header: 'آیدی',
  },
  {
    accessorKey: 'title',
    header: 'عنوان',
  },
  {
    accessorKey: 'description',
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
