"use client";

import { useState } from 'react';
import { Card, Title, Text, Badge, Button, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import { InstallationSchedule, Project, SignageSpecification, Client, User } from '@prisma/client';
import { format } from 'date-fns';
import { MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

type ExtendedInstallationSchedule = InstallationSchedule & {
  project: Project & {
    specifications: SignageSpecification[];
    client: Client;
  };
};

interface InstallationListProps {
  schedules: ExtendedInstallationSchedule[];
  installers: Pick<User, 'id' | 'name' | 'email' | 'workingHours'>[];
}

function getStatusColor(status: string) {
  const colors = {
    SCHEDULED: 'yellow',
    IN_PROGRESS: 'blue',
    COMPLETED: 'green',
    CANCELLED: 'red',
    PENDING: 'gray'
  } as const;
  return colors[status as keyof typeof colors] || 'gray';
}

export function InstallationList({ schedules, installers }: InstallationListProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

  const handleViewDetails = (scheduleId: string) => {
    setSelectedSchedule(scheduleId === selectedSchedule ? null : scheduleId);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Project</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Team</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedules.map((schedule) => (
          <>
            <TableRow key={schedule.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium">{schedule.project.name}</div>
                <Text className="text-sm text-gray-500">
                  {schedule.project.client.name}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div>{format(new Date(schedule.scheduledDate), 'MMM d, yyyy')}</div>
                    <Text className="text-sm text-gray-500">
                      Duration: {schedule.estimatedDuration}h
                    </Text>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <Text className="truncate max-w-xs" title={schedule.siteAddress}>
                    {schedule.siteAddress}
                  </Text>
                </div>
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(schedule.status)}>
                  {schedule.status}
                </Badge>
                {schedule.permitRequired && !schedule.permitNumber && (
                  <Badge color="red" className="ml-2">
                    Permit Required
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                  <Text>{schedule.crewSize} installers</Text>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => handleViewDetails(schedule.id)}
                >
                  {selectedSchedule === schedule.id ? 'Hide Details' : 'View Details'}
                </Button>
              </TableCell>
            </TableRow>
            {selectedSchedule === schedule.id && (
              <TableRow className="bg-gray-50">
                <TableCell colSpan={6}>
                  <div className="p-4 space-y-4">
                    {/* Site Details */}
                    <div>
                      <Title className="text-sm">Site Details</Title>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <Text className="font-medium">Contact</Text>
                          <Text>{schedule.siteContact || 'Not specified'}</Text>
                        </div>
                        <div>
                          <Text className="font-medium">Phone</Text>
                          <Text>{schedule.sitePhone || 'Not specified'}</Text>
                        </div>
                      </div>
                    </div>

                    {/* Access Instructions */}
                    <div>
                      <Title className="text-sm">Access Instructions</Title>
                      <Text className="mt-2">
                        {schedule.accessInstructions || 'No special instructions provided'}
                      </Text>
                    </div>

                    {/* Equipment Needed */}
                    <div>
                      <Title className="text-sm">Equipment Required</Title>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {schedule.equipmentNeeded.map((equipment, index) => (
                          <Badge key={index} color="blue">
                            {equipment}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Permit Information */}
                    {schedule.permitRequired && (
                      <div>
                        <Title className="text-sm">Permit Information</Title>
                        <div className="mt-2">
                          <Text className="font-medium">Permit Number</Text>
                          <Text>{schedule.permitNumber || 'Pending'}</Text>
                        </div>
                      </div>
                    )}

                    {/* Installation Team */}
                    <div>
                      <Title className="text-sm">Installation Team</Title>
                      <div className="mt-2 space-y-2">
                        {schedule.installers.map((installer) => (
                          <div key={installer.id} className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              {installer.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <Text className="font-medium">{installer.name}</Text>
                              <Text className="text-sm text-gray-500">{installer.email}</Text>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
} 