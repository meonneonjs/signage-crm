'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const leadSources = ['Website', 'Referral', 'Trade Show', 'Cold Call', 'Social Media', 'Email Campaign'];
const companyTypes = ['Enterprise', 'SMB', 'Startup', 'Government', 'Non-Profit'];
const budgetRanges = ['< $10k', '$10k - $50k', '$50k - $100k', '$100k - $500k', '> $500k'];
const timeframes = ['Immediate', '1-3 months', '3-6 months', '6-12 months', '> 12 months'];

interface LeadFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  source: string;
  companyType: string;
  budget: string;
  timeframe: string;
  requirements: string;
}

export function NewLeadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    source: '',
    companyType: '',
    budget: '',
    timeframe: '',
    requirements: '',
  });
  const [leadScore, setLeadScore] = useState(0);

  const calculateLeadScore = (data: LeadFormData) => {
    let score = 0;

    // Company Type Scoring
    switch (data.companyType) {
      case 'Enterprise': score += 30; break;
      case 'SMB': score += 25; break;
      case 'Startup': score += 20; break;
      case 'Government': score += 35; break;
      case 'Non-Profit': score += 15; break;
    }

    // Budget Range Scoring
    switch (data.budget) {
      case '> $500k': score += 30; break;
      case '$100k - $500k': score += 25; break;
      case '$50k - $100k': score += 20; break;
      case '$10k - $50k': score += 15; break;
      case '< $10k': score += 10; break;
    }

    // Timeframe Scoring
    switch (data.timeframe) {
      case 'Immediate': score += 20; break;
      case '1-3 months': score += 15; break;
      case '3-6 months': score += 10; break;
      case '6-12 months': score += 5; break;
      case '> 12 months': score += 0; break;
    }

    // Source Scoring
    switch (data.source) {
      case 'Referral': score += 20; break;
      case 'Trade Show': score += 15; break;
      case 'Website': score += 10; break;
      case 'Email Campaign': score += 8; break;
      case 'Social Media': score += 5; break;
      case 'Cold Call': score += 5; break;
    }

    return Math.min(100, score);
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setLeadScore(calculateLeadScore(newData));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save lead
    console.log('New Lead:', { ...formData, score: leadScore });
    setIsOpen(false);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      source: '',
      companyType: '',
      budget: '',
      timeframe: '',
      requirements: '',
    });
    setLeadScore(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter lead details to automatically calculate lead score.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Lead Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleInputChange('source', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {leadSources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type</Label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => handleInputChange('companyType', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange('budget', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Implementation Timeframe</Label>
              <Select
                value={formData.timeframe}
                onValueChange={(value) => handleInputChange('timeframe', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="Enter project requirements and notes..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Lead Score:</span>
              <Badge className={getScoreColor(leadScore)}>{leadScore}</Badge>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
              >
                Create Lead
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 