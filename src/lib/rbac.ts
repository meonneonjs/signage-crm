import { prisma } from './prisma';

export type Permission = 
  | 'view:dashboard'
  | 'manage:users'
  | 'manage:roles'
  | 'manage:permissions'
  | 'manage:settings'
  | 'manage:workflows'
  | 'manage:integrations'
  | 'manage:api'
  | 'manage:ai'
  | 'manage:security'
  | 'manage:company'
  | 'manage:team'
  | 'manage:billing'
  | 'manage:templates'
  | 'manage:branding'
  | 'manage:layout'
  | 'manage:email'
  | 'manage:chat'
  | 'manage:data'
  | 'manage:reports';

export type Role = 
  | 'admin'
  | 'manager'
  | 'user'
  | 'viewer'
  | 'api';

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'view:dashboard',
    'manage:users',
    'manage:roles',
    'manage:permissions',
    'manage:settings',
    'manage:workflows',
    'manage:integrations',
    'manage:api',
    'manage:ai',
    'manage:security',
    'manage:company',
    'manage:team',
    'manage:billing',
    'manage:templates',
    'manage:branding',
    'manage:layout',
    'manage:email',
    'manage:chat',
    'manage:data',
    'manage:reports',
  ],
  manager: [
    'view:dashboard',
    'manage:users',
    'manage:workflows',
    'manage:integrations',
    'manage:team',
    'manage:templates',
    'manage:email',
    'manage:chat',
    'manage:data',
    'manage:reports',
  ],
  user: [
    'view:dashboard',
    'manage:workflows',
    'manage:email',
    'manage:chat',
    'manage:data',
  ],
  viewer: [
    'view:dashboard',
    'manage:data',
  ],
  api: [
    'manage:api',
  ],
};

export async function hasPermission(userId: string, permission: Permission): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user?.role) {
    return false;
  }

  // Check if user has the permission through their role
  const hasPermission = user.role.permissions.some(p => p.name === permission);
  if (hasPermission) {
    return true;
  }

  // Check if user has the permission through the predefined role permissions
  const role = user.role.name.toLowerCase() as Role;
  return rolePermissions[role]?.includes(permission) || false;
}

export async function hasAnyPermission(userId: string, permissions: Permission[]): Promise<boolean> {
  for (const permission of permissions) {
    if (await hasPermission(userId, permission)) {
      return true;
    }
  }
  return false;
}

export async function hasAllPermissions(userId: string, permissions: Permission[]): Promise<boolean> {
  for (const permission of permissions) {
    if (!(await hasPermission(userId, permission))) {
      return false;
    }
  }
  return true;
}

export async function getUserPermissions(userId: string): Promise<Permission[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user?.role) {
    return [];
  }

  // Get permissions from the database
  const dbPermissions = user.role.permissions.map(p => p.name as Permission);

  // Get permissions from predefined role permissions
  const role = user.role.name.toLowerCase() as Role;
  const predefinedPermissions = rolePermissions[role] || [];

  // Combine and remove duplicates
  return [...new Set([...dbPermissions, ...predefinedPermissions])];
}

export async function assignRole(userId: string, roleId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { roleId },
  });
}

export async function createRole(name: string, description: string, permissions: Permission[]): Promise<void> {
  await prisma.role.create({
    data: {
      name,
      description,
      permissions: {
        create: permissions.map(permission => ({
          name: permission,
          description: `Permission to ${permission}`,
        })),
      },
    },
  });
}

export async function updateRole(roleId: string, data: { name?: string; description?: string; permissions?: Permission[] }): Promise<void> {
  if (data.permissions) {
    // Delete existing permissions
    await prisma.permission.deleteMany({
      where: { roles: { some: { id: roleId } } },
    });

    // Create new permissions
    await prisma.permission.createMany({
      data: data.permissions.map(permission => ({
        name: permission,
        description: `Permission to ${permission}`,
      })),
    });
  }

  await prisma.role.update({
    where: { id: roleId },
    data: {
      name: data.name,
      description: data.description,
    },
  });
}

export async function deleteRole(roleId: string): Promise<void> {
  await prisma.role.delete({
    where: { id: roleId },
  });
} 