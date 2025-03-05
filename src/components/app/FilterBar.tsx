'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  onSearchChange: (search: string) => void;
}

export function FilterBar({ filters, onFilterChange, onSearchChange }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (filterId: string, value: string) => {
    const currentValues = activeFilters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    const newFilters = {
      ...activeFilters,
      [filterId]: newValues,
    };

    if (newFilters[filterId].length === 0) {
      delete newFilters[filterId];
    }

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const removeFilter = (filterId: string, value: string) => {
    const newValues = activeFilters[filterId].filter(v => v !== value);
    const newFilters = { ...activeFilters };

    if (newValues.length === 0) {
      delete newFilters[filterId];
    } else {
      newFilters[filterId] = newValues;
    }

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[280px]">
            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <h4 className="font-medium text-sm">{filter.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const isActive = activeFilters[filter.id]?.includes(option);
                      return (
                        <Button
                          key={option}
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleFilterChange(filter.id, option)}
                          className={cn(
                            'capitalize',
                            isActive && 'bg-primary text-primary-foreground'
                          )}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(activeFilters).map(([filterId, values]) => {
            const filter = filters.find(f => f.id === filterId);
            return values.map(value => (
              <Badge
                key={`${filterId}-${value}`}
                variant="secondary"
                className="capitalize"
              >
                {filter?.label}: {value}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(filterId, value)}
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ));
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-900"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
} 