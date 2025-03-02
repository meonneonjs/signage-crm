"use client";

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import { DesignVersion, DesignStatus } from '@prisma/client';
import { useState } from 'react';
import Image from 'next/image';

interface DesignVersionListProps {
  versions: (DesignVersion & {
    designChecklist: {
      brandingChecked: boolean;
      dimensionsChecked: boolean;
      colorsChecked: boolean;
      typosChecked: boolean;
      layoutChecked: boolean;
      materialsChecked: boolean;
      notesChecked: boolean;
    } | null;
  })[];
  projectId: string;
}

function getStatusColor(status: DesignStatus) {
  const colors = {
    DRAFT: 'blue',
    IN_REVIEW: 'yellow',
    APPROVED: 'green',
    REJECTED: 'red',
    ARCHIVED: 'gray'
  } as const;
  return colors[status];
}

function getChecklistProgress(checklist: DesignVersionListProps['versions'][0]['designChecklist']) {
  if (!checklist) return 0;
  const checks = [
    checklist.brandingChecked,
    checklist.dimensionsChecked,
    checklist.colorsChecked,
    checklist.typosChecked,
    checklist.layoutChecked,
    checklist.materialsChecked,
    checklist.notesChecked
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function DesignVersionList({ versions, projectId }: DesignVersionListProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const handleApprove = async (versionId: string) => {
    // TODO: Implement approval logic
    console.log('Approving version:', versionId);
  };

  const handleReject = async (versionId: string) => {
    // TODO: Implement rejection logic
    console.log('Rejecting version:', versionId);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Version</TableHeaderCell>
            <TableHeaderCell>Preview</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Checklist</TableHeaderCell>
            <TableHeaderCell>Last Updated</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium">v{version.versionNumber}</div>
                {version.description && (
                  <div className="text-sm text-gray-500">{version.description}</div>
                )}
              </TableCell>
              <TableCell>
                {version.thumbnailUrl ? (
                  <div className="relative h-16 w-16">
                    <Image
                      src={version.thumbnailUrl}
                      alt={`Design version ${version.versionNumber}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    No preview
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(version.status)}>
                  {version.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${getChecklistProgress(version.designChecklist)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {getChecklistProgress(version.designChecklist)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(version.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {version.status === 'IN_REVIEW' && (
                    <>
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => handleApprove(version.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => handleReject(version.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => window.open(version.fileUrl, '_blank')}
                  >
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 