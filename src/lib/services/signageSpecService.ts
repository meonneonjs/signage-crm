import { prisma } from '@/lib/prisma';
import { SignageType, MaterialType, InstallationType, PrintingMethod, Prisma } from '@prisma/client';

export interface CreateSignageSpecInput extends Omit<Prisma.SignageSpecificationCreateInput, 'project'> {
  projectId: string;
}

export class SignageSpecService {
  static async createSpecification(input: CreateSignageSpecInput) {
    const { projectId, ...data } = input;
    
    return prisma.signageSpecification.create({
      data: {
        ...data,
        project: {
          connect: { id: projectId }
        }
      }
    });
  }

  static async updateSpecification(id: string, input: Partial<CreateSignageSpecInput>) {
    const { projectId, ...data } = input;
    
    return prisma.signageSpecification.update({
      where: { id },
      data: {
        ...data,
        ...(projectId && {
          project: {
            connect: { id: projectId }
          }
        })
      }
    });
  }

  static async getSpecification(id: string) {
    return prisma.signageSpecification.findUnique({
      where: { id }
    });
  }

  static async getSpecificationsByType(type: SignageType) {
    return prisma.signageSpecification.findMany({
      where: { type }
    });
  }

  static async getSpecificationsByProject(projectId: string) {
    return prisma.signageSpecification.findMany({
      where: { projectId }
    });
  }

  static async deleteSpecification(id: string) {
    return prisma.signageSpecification.delete({
      where: { id }
    });
  }

  // Helper methods for technical calculations
  static calculatePowerConsumption(spec: {
    type: SignageType;
    width: number;
    height: number;
    pixelPitch?: number;
    brightness?: number;
  }): number {
    let powerConsumption = 0;
    const area = spec.width * spec.height;
    
    if (spec.type === SignageType.DIGITAL_DISPLAY) {
      // Calculate based on size and pixel density for digital displays
      const pixelsPerSqM = spec.pixelPitch ? 1000000 / (spec.pixelPitch * spec.pixelPitch) : 0;
      const totalPixels = area * pixelsPerSqM;
      // Assume average power per pixel (in watts)
      const powerPerPixel = 0.0003;
      powerConsumption = totalPixels * powerPerPixel;
    } else if (spec.type === SignageType.INDOOR || spec.type === SignageType.OUTDOOR) {
      // Simpler calculation for standard displays
      powerConsumption = area * 0.05; // 50W per square meter
    } else if (spec.brightness) {
      // For other illuminated signs, rough estimate based on brightness
      powerConsumption = area * (spec.brightness / 1000) * 0.1;
    }
    
    return Math.round(powerConsumption * 100) / 100; // Round to 2 decimal places
  }

  static calculateWindLoad(spec: {
    width: number;
    height: number;
    installationType: InstallationType;
    mountingHeight?: number;
  }): number {
    const area = spec.width * spec.height;
    const baseWindPressure = 20; // Base wind pressure in psf
    
    let heightFactor = 1.0;
    if (spec.mountingHeight) {
      // Increase wind load factor with height
      heightFactor = 1.0 + (spec.mountingHeight / 50);
    }
    
    let exposureFactor = 1.0;
    switch (spec.installationType) {
      case InstallationType.WALL_MOUNTED:
        exposureFactor = 0.8;
        break;
      case InstallationType.FREESTANDING:
      case InstallationType.PYLON:
      case InstallationType.MONUMENT:
        exposureFactor = 1.2;
        break;
      case InstallationType.SUSPENDED:
        exposureFactor = 1.5;
        break;
    }
    
    const windLoad = area * baseWindPressure * heightFactor * exposureFactor;
    return Math.round(windLoad * 100) / 100; // Round to 2 decimal places
  }
} 