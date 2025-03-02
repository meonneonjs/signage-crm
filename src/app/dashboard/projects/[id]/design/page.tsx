import { notFound } from 'next/navigation';
import { Card, Title, Text, Badge, Grid } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { DesignVersionList } from '@/components/design/DesignVersionList';
import { DesignUploader } from '@/components/design/DesignUploader';
import { QualityChecklist } from '@/components/design/QualityChecklist';

interface Props {
  params: {
    id: string;
  };
}

async function getProjectDesigns(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      designVersions: {
        include: {
          designChecklist: true
        },
        orderBy: {
          versionNumber: 'desc'
        }
      },
      specifications: true,
      client: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  if (!project) {
    notFound();
  }

  return project;
}

export default async function ProjectDesignPage({ params }: Props) {
  const project = await getProjectDesigns(params.id);
  const latestVersion = project.designVersions[0];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <Title>Design Management</Title>
          <Text>Project: {project.name}</Text>
        </div>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        {/* Project Specifications */}
        <Card>
          <Title>Project Specifications</Title>
          <div className="mt-4 space-y-2">
            {project.specifications.map((spec) => (
              <div key={spec.id} className="space-y-1">
                <Text className="font-medium">{spec.type}</Text>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Text>Dimensions:</Text>
                  <Text>{spec.width}" × {spec.height}"</Text>
                  <Text>Material:</Text>
                  <Text>{spec.primaryMaterial}</Text>
                  <Text>Printing:</Text>
                  <Text>{spec.printingMethod}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Status */}
        <Card>
          <Title>Design Status</Title>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Text>Latest Version:</Text>
              <Badge color="blue">v{latestVersion?.versionNumber || 1}</Badge>
            </div>
            {latestVersion && (
              <div className="mt-2">
                <Badge 
                  color={
                    latestVersion.status === 'APPROVED' ? 'green' :
                    latestVersion.status === 'REJECTED' ? 'red' :
                    latestVersion.status === 'IN_REVIEW' ? 'yellow' :
                    'blue'
                  }
                >
                  {latestVersion.status.replace('_', ' ')}
                </Badge>
                {latestVersion.approvedAt && (
                  <Text className="mt-2 text-sm">
                    Approved on {new Date(latestVersion.approvedAt).toLocaleDateString()}
                  </Text>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Client Information */}
        <Card>
          <Title>Client Information</Title>
          <div className="mt-4">
            <Text className="font-medium">{project.client.name}</Text>
            <Text className="text-sm text-gray-500">{project.client.email}</Text>
          </div>
        </Card>
      </Grid>

      {/* Design Version History */}
      <Card>
        <Title>Design Versions</Title>
        <div className="mt-6">
          <DesignVersionList 
            versions={project.designVersions}
            projectId={project.id}
          />
        </div>
      </Card>

      {/* Design Upload */}
      <Card>
        <Title>Upload New Version</Title>
        <div className="mt-6">
          <DesignUploader 
            projectId={project.id}
            nextVersionNumber={(latestVersion?.versionNumber || 0) + 1}
          />
        </div>
      </Card>

      {/* Quality Checklist */}
      {latestVersion && (
        <Card>
          <Title>Quality Checklist</Title>
          <div className="mt-6">
            <QualityChecklist
              checklist={latestVersion.designChecklist}
              versionId={latestVersion.id}
            />
          </div>
        </Card>
      )}
    </div>
  );
} 