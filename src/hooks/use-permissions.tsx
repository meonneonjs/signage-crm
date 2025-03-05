import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, getUserPermissions } from '@/lib/rbac';

export function usePermission(permission: Permission) {
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkPermission() {
      if (!session?.user?.id) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        const hasAccess = await hasPermission(session.user.id, permission);
        setHasAccess(hasAccess);
      } catch (error) {
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPermission();
  }, [session?.user?.id, permission]);

  return { hasAccess, isLoading };
}

export function useAnyPermission(permissions: Permission[]) {
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkPermissions() {
      if (!session?.user?.id) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        const hasAccess = await hasAnyPermission(session.user.id, permissions);
        setHasAccess(hasAccess);
      } catch (error) {
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPermissions();
  }, [session?.user?.id, permissions]);

  return { hasAccess, isLoading };
}

export function useAllPermissions(permissions: Permission[]) {
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkPermissions() {
      if (!session?.user?.id) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        const hasAccess = await hasAllPermissions(session.user.id, permissions);
        setHasAccess(hasAccess);
      } catch (error) {
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPermissions();
  }, [session?.user?.id, permissions]);

  return { hasAccess, isLoading };
}

export function useUserPermissions() {
  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPermissions() {
      if (!session?.user?.id) {
        setPermissions([]);
        setIsLoading(false);
        return;
      }

      try {
        const userPermissions = await getUserPermissions(session.user.id);
        setPermissions(userPermissions);
      } catch (error) {
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPermissions();
  }, [session?.user?.id]);

  return { permissions, isLoading };
}

export function RequirePermission({
  permission,
  children,
}: {
  permission: Permission;
  children: React.ReactNode;
}) {
  const { hasAccess, isLoading } = usePermission(permission);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}

export function RequireAnyPermission({
  permissions,
  children,
}: {
  permissions: Permission[];
  children: React.ReactNode;
}) {
  const { hasAccess, isLoading } = useAnyPermission(permissions);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}

export function RequireAllPermissions({
  permissions,
  children,
}: {
  permissions: Permission[];
  children: React.ReactNode;
}) {
  const { hasAccess, isLoading } = useAllPermissions(permissions);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
} 