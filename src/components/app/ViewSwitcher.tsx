'use client';

import { LayoutGrid, List, Kanban } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export type ViewType = 'list' | 'grid' | 'kanban';

export interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const viewOptions = [
  { value: 'list', label: 'List View', icon: List },
  { value: 'grid', label: 'Grid View', icon: LayoutGrid },
  { value: 'kanban', label: 'Kanban View', icon: Kanban },
] as const;

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  const currentOption = viewOptions.find(option => option.value === currentView);
  const Icon = currentOption?.icon || List;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon className="w-4 h-4" />
          {currentOption?.label || 'Change View'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {viewOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onViewChange(option.value)}
            className="gap-2"
          >
            <option.icon className="w-4 h-4" />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 