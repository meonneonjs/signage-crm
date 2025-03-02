import { prisma } from '@/lib/db';
import { CommissionType, PaymentStatus, UserRole } from '@prisma/client';

export class CommissionService {
  private static readonly COMMISSION_RATES = {
    [UserRole.TEAM_LEADER]: {
      [CommissionType.SELF_GENERATED]: 0.40,
      [CommissionType.COMPANY_PROVIDED]: 0.33,
      [CommissionType.OVERRIDE]: 0.10,
    },
    [UserRole.SALES_REP]: {
      [CommissionType.SELF_GENERATED]: 0.30,
      [CommissionType.COMPANY_PROVIDED]: 0.25,
    },
  };

  static async calculateCommission(projectId: string, userId: string, type: CommissionType) {
    try {
      // Get project and user details
      const [project, user] = await Promise.all([
        prisma.project.findUnique({
          where: { id: projectId },
          include: { client: true },
        }),
        prisma.user.findUnique({
          where: { id: userId },
        }),
      ]);

      if (!project || !user) {
        throw new Error('Project or user not found');
      }

      // Get commission rate based on user role and commission type
      const rate = this.COMMISSION_RATES[user.role]?.[type];
      if (!rate) {
        throw new Error('Invalid commission rate configuration');
      }

      const amount = project.budget * rate;

      // Create commission record
      const commission = await prisma.commission.create({
        data: {
          userId,
          projectId,
          amount,
          type,
          percentage: rate,
          status: PaymentStatus.PENDING,
        },
      });

      // If user is a sales rep and has a team leader, calculate override commission
      if (user.role === UserRole.SALES_REP) {
        const teamLeader = await prisma.user.findFirst({
          where: { role: UserRole.TEAM_LEADER },
        });

        if (teamLeader) {
          const overrideRate = this.COMMISSION_RATES[UserRole.TEAM_LEADER][CommissionType.OVERRIDE];
          const overrideAmount = project.budget * overrideRate;

          await prisma.commission.create({
            data: {
              userId: teamLeader.id,
              projectId,
              amount: overrideAmount,
              type: CommissionType.OVERRIDE,
              percentage: overrideRate,
              status: PaymentStatus.PENDING,
            },
          });
        }
      }

      return commission;
    } catch (error) {
      console.error('Error calculating commission:', error);
      throw error;
    }
  }

  static async processMonthlyPayment(userId: string, year: number, month: number) {
    try {
      // Get all pending commissions for the user
      const pendingCommissions = await prisma.commission.findMany({
        where: {
          userId,
          status: PaymentStatus.PENDING,
          createdAt: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });

      if (pendingCommissions.length === 0) {
        return null;
      }

      const totalAmount = pendingCommissions.reduce((sum, commission) => sum + commission.amount, 0);

      // Create payment record
      const payment = await prisma.commissionPayment.create({
        data: {
          userId,
          amount: totalAmount,
          paidAt: new Date(),
          year,
          month,
        },
      });

      // Update commission status to paid
      await prisma.commission.updateMany({
        where: {
          id: {
            in: pendingCommissions.map(c => c.id),
          },
        },
        data: {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      });

      return payment;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  static async getUserCommissionStats(userId: string, year: number, month: number) {
    try {
      const [totalCommissions, pendingAmount, paidAmount] = await Promise.all([
        prisma.commission.count({
          where: {
            userId,
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
        }),
        prisma.commission.aggregate({
          where: {
            userId,
            status: PaymentStatus.PENDING,
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.commission.aggregate({
          where: {
            userId,
            status: PaymentStatus.PAID,
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

      return {
        totalCommissions,
        pendingAmount: pendingAmount._sum.amount || 0,
        paidAmount: paidAmount._sum.amount || 0,
      };
    } catch (error) {
      console.error('Error getting commission stats:', error);
      throw error;
    }
  }
} 