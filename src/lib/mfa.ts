import { authenticator } from 'otplib';
import { prisma } from './prisma';
import { generateBackupCodes } from './utils';

export async function enableMFA(userId: string) {
  const secret = authenticator.generateSecret();
  const backupCodes = generateBackupCodes(8);

  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: true,
      mfaSecret: secret,
      mfaBackupCodes: backupCodes,
    },
  });

  return {
    secret,
    backupCodes,
  };
}

export async function disableMFA(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: false,
      mfaSecret: null,
      mfaBackupCodes: [],
    },
  });
}

export async function verifyMFA(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.mfaEnabled || !user?.mfaSecret) {
    return false;
  }

  return authenticator.verify({
    token,
    secret: user.mfaSecret,
  });
}

export async function verifyBackupCode(userId: string, code: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.mfaEnabled || !user?.mfaBackupCodes) {
    return false;
  }

  const isValid = user.mfaBackupCodes.includes(code);
  if (isValid) {
    // Remove used backup code
    await prisma.user.update({
      where: { id: userId },
      data: {
        mfaBackupCodes: user.mfaBackupCodes.filter((c) => c !== code),
      },
    });
  }

  return isValid;
}

export async function generateNewBackupCodes(userId: string) {
  const backupCodes = generateBackupCodes(8);
  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaBackupCodes: backupCodes,
    },
  });
  return backupCodes;
} 