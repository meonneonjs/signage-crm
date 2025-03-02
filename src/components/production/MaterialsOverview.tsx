import { Card, Text, ProgressBar } from '@tremor/react';
import { Project, SignageSpecification } from '@prisma/client';

type ExtendedProject = Project & {
  specifications: SignageSpecification[];
};

interface MaterialsOverviewProps {
  projects: ExtendedProject[];
}

interface MaterialSummary {
  type: string;
  totalQuantity: number;
  inStock: number;
  ordered: number;
  pending: number;
}

function calculateMaterialSummary(projects: ExtendedProject[]): MaterialSummary[] {
  const materialMap = new Map<string, MaterialSummary>();

  projects.forEach(project => {
    project.specifications.forEach(spec => {
      const key = spec.primaryMaterial;
      const current = materialMap.get(key) || {
        type: key,
        totalQuantity: 0,
        inStock: 0,
        ordered: 0,
        pending: 0,
      };

      // Calculate area in square feet
      const area = (spec.width * spec.height) / 144; // Convert from square inches to square feet
      current.totalQuantity += area;

      // Update status based on production schedule
      if (project.productionSchedule?.materialStatus === 'in_stock') {
        current.inStock += area;
      } else if (project.productionSchedule?.materialStatus === 'ordered') {
        current.ordered += area;
      } else {
        current.pending += area;
      }

      materialMap.set(key, current);
    });
  });

  return Array.from(materialMap.values());
}

export function MaterialsOverview({ projects }: MaterialsOverviewProps) {
  const materialSummary = calculateMaterialSummary(projects);

  return (
    <div className="space-y-6">
      {materialSummary.map((material) => (
        <Card key={material.type} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text className="font-medium">{material.type}</Text>
              <Text className="text-sm text-gray-500">
                Total Required: {material.totalQuantity.toFixed(2)} sq ft
              </Text>
            </div>
            <div className="text-right">
              <Text className="text-sm text-gray-500">
                In Stock: {material.inStock.toFixed(2)} sq ft
              </Text>
              <Text className="text-sm text-gray-500">
                Ordered: {material.ordered.toFixed(2)} sq ft
              </Text>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Text>Stock Level</Text>
              <Text>
                {((material.inStock / material.totalQuantity) * 100).toFixed(1)}%
              </Text>
            </div>
            <ProgressBar
              value={(material.inStock / material.totalQuantity) * 100}
              color="blue"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <Text className="text-gray-500">Pending</Text>
              <Text className="font-medium">
                {material.pending.toFixed(2)} sq ft
              </Text>
            </div>
            <div>
              <Text className="text-gray-500">Ordered</Text>
              <Text className="font-medium">
                {material.ordered.toFixed(2)} sq ft
              </Text>
            </div>
            <div>
              <Text className="text-gray-500">In Stock</Text>
              <Text className="font-medium">
                {material.inStock.toFixed(2)} sq ft
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 