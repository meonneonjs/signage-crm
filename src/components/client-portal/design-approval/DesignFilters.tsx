import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function DesignFilters() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search designs..."
          className="pl-9"
        />
      </div>

      <div className="space-y-4">
        <div>
          <Label>Status</Label>
          <RadioGroup defaultValue="all" className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending">Pending Review</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approved" id="approved" />
              <Label htmlFor="approved">Approved</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="rejected" />
              <Label htmlFor="rejected">Rejected</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="version-asc">Version (Low to High)</SelectItem>
              <SelectItem value="version-desc">Version (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Project</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website Redesign</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="branding">Brand Identity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Designer</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select designer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alex">Alex Kim</SelectItem>
              <SelectItem value="emily">Emily Davis</SelectItem>
              <SelectItem value="mike">Mike Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 