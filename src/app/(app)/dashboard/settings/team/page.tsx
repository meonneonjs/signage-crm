'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePermissions } from '@/contexts/PermissionContext';
import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { UserRole, DashboardPermissions, Permission, rolePermissions } from '@/types/roles';
import { TeamMemberModal } from '@/components/team/TeamMemberModal';
import { useRouter } from 'next/navigation';

// Demo team members data
const teamMembers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'sales_rep' as UserRole,
    avatar: '/avatars/john.png',
    initials: 'JS',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'manager' as UserRole,
    avatar: '/avatars/sarah.png',
    initials: 'SJ',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'admin' as UserRole,
    avatar: '/avatars/michael.png',
    initials: 'MC',
  },
];

const sections: Array<keyof DashboardPermissions> = [
  'analytics',
  'leads',
  'deals',
  'tasks',
  'team',
  'settings',
];

const actions: Array<keyof Permission> = ['view', 'create', 'edit', 'delete'];

export default function TeamManagementPage() {
  const router = useRouter();
  const { userRole, can } = usePermissions();
  const [selectedRole, setSelectedRole] = useState<UserRole>('sales_rep');
  const [permissions, setPermissions] = useState(rolePermissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | undefined>();
  const [members, setMembers] = useState(teamMembers);

  useEffect(() => {
    // Check if user has permission to view this page
    if (!can('team', 'view')) {
      router.push('/dashboard');
      return;
    }
  }, [userRole, router, can]);

  const handlePermissionChange = (
    role: UserRole,
    section: keyof DashboardPermissions,
    action: keyof Permission
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [section]: {
          ...prev[role][section],
          [action]: !prev[role][section][action],
        },
      },
    }));
  };

  const handleAddMember = () => {
    setSelectedMember(undefined);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = (member: {
    id?: string;
    name: string;
    email: string;
    role: UserRole;
  }) => {
    if (member.id) {
      // Edit existing member
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, ...member } : m))
      );
    } else {
      // Add new member
      const newMember = {
        ...member,
        id: Math.random().toString(36).substr(2, 9),
        avatar: '/avatars/default.png',
        initials: member.name
          .split(' ')
          .map((n) => n[0])
          .join(''),
      };
      setMembers((prev) => [...prev, newMember]);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleResetPermissions = () => {
    setPermissions(rolePermissions);
  };

  const handleSavePermissions = () => {
    // In a real application, you would save the permissions to your backend
    console.log('Saving permissions:', permissions);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <PermissionGuard section="team" action="create">
          <Button onClick={handleAddMember}>Add Team Member</Button>
        </PermissionGuard>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{member.role}</span>
                      <PermissionGuard section="team" action="edit">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditMember(member)}
                        >
                          Edit
                        </Button>
                      </PermissionGuard>
                      <PermissionGuard section="team" action="delete">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Remove
                        </Button>
                      </PermissionGuard>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <Button
                    variant={selectedRole === 'sales_rep' ? 'default' : 'outline'}
                    onClick={() => setSelectedRole('sales_rep')}
                  >
                    Sales Rep
                  </Button>
                  <Button
                    variant={selectedRole === 'manager' ? 'default' : 'outline'}
                    onClick={() => setSelectedRole('manager')}
                  >
                    Manager
                  </Button>
                  <Button
                    variant={selectedRole === 'admin' ? 'default' : 'outline'}
                    onClick={() => setSelectedRole('admin')}
                  >
                    Admin
                  </Button>
                  <Button
                    variant={selectedRole === 'owner' ? 'default' : 'outline'}
                    onClick={() => setSelectedRole('owner')}
                  >
                    Owner
                  </Button>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-8">
                    {sections.map((section) => (
                      <div key={section} className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">{section}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {actions.map((action) => (
                            <div
                              key={`${section}-${action}`}
                              className="flex items-center justify-between p-4 rounded-lg border"
                            >
                              <Label htmlFor={`${section}-${action}`} className="capitalize">
                                {action}
                              </Label>
                              <Switch
                                id={`${section}-${action}`}
                                checked={permissions[selectedRole][section][action]}
                                onCheckedChange={() =>
                                  handlePermissionChange(selectedRole, section, action)
                                }
                                disabled={selectedRole === 'owner'} // Owner permissions cannot be modified
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" onClick={handleResetPermissions}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSavePermissions}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMember}
        member={selectedMember}
      />
    </div>
  );
} 