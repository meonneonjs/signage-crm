import { Mail, Phone } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  status: 'online' | 'offline' | 'away';
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-300',
  away: 'bg-yellow-500',
};

export function ProjectTeam() {
  // TODO: Replace with real data from API
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
      email: 'sarah.j@atelier.com',
      phone: '+1 (555) 123-4567',
      status: 'online',
    },
    {
      id: '2',
      name: 'Alex Kim',
      role: 'Lead Designer',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Kim',
      email: 'alex.k@atelier.com',
      phone: '+1 (555) 234-5678',
      status: 'online',
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'Developer',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen',
      email: 'mike.c@atelier.com',
      phone: '+1 (555) 345-6789',
      status: 'away',
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'Content Strategist',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis',
      email: 'emily.d@atelier.com',
      phone: '+1 (555) 456-7890',
      status: 'offline',
    },
  ];

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Project Team</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-10 w-10 rounded-full"
                />
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    statusColors[member.status]
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="rounded-full p-2 hover:bg-accent"
                      title="Send email"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Send email</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="rounded-full p-2 hover:bg-accent"
                      title="Call"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 