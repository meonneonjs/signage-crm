'use client';

import { Button } from '@tremor/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface AddButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function AddButton({ href, children }: AddButtonProps) {
  return (
    <Link href={href}>
      <Button>
        <PlusIcon className="h-5 w-5 mr-2" />
        {children}
      </Button>
    </Link>
  );
} 