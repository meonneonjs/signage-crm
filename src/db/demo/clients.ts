export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  createdAt: string;
  status: 'active' | 'inactive';
  notes: string;
}

export const demoClients: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah@moderndesign.co',
    phone: '(555) 123-4567',
    company: 'Modern Design Co.',
    address: '123 Creative Ave, Design District, CA 90210',
    createdAt: '2024-01-15T08:00:00Z',
    status: 'active',
    notes: 'High-value client, interested in branding packages'
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    email: 'mchen@techstart.io',
    phone: '(555) 234-5678',
    company: 'TechStart',
    address: '456 Innovation Blvd, Tech Park, CA 94105',
    createdAt: '2024-02-01T09:30:00Z',
    status: 'active',
    notes: 'Startup client, monthly retainer for design services'
  },
  {
    id: 'c3',
    name: 'Emma Wilson',
    email: 'emma@artisancrafts.com',
    phone: '(555) 345-6789',
    company: 'Artisan Crafts',
    address: '789 Maker Street, Craft Valley, CA 92008',
    createdAt: '2024-02-15T10:15:00Z',
    status: 'active',
    notes: 'Boutique client, quarterly product photography'
  }
]; 