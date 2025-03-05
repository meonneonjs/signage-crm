export type UserRole = 'owner' | 'admin' | 'manager' | 'sales_rep';

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface DashboardPermissions {
  // Analytics & Reporting
  analytics: Permission;
  reports: Permission;
  dashboards: Permission;

  // Sales & CRM
  leads: Permission;
  deals: Permission;
  clients: Permission;
  quotes: Permission;
  invoices: Permission;

  // Project Management
  projects: Permission;
  tasks: Permission;
  calendar: Permission;

  // Production
  production: Permission;
  inventory: Permission;
  maintenance: Permission;

  // Team & Communication
  team: Permission;
  messages: Permission;
  notifications: Permission;

  // Design & Assets
  design: Permission;
  assets: Permission;
  templates: Permission;

  // Settings & Administration
  settings: Permission;
  billing: Permission;
  integrations: Permission;
}

export const rolePermissions: Record<UserRole, DashboardPermissions> = {
  owner: {
    // Analytics & Reporting
    analytics: { view: true, create: true, edit: true, delete: true },
    reports: { view: true, create: true, edit: true, delete: true },
    dashboards: { view: true, create: true, edit: true, delete: true },

    // Sales & CRM
    leads: { view: true, create: true, edit: true, delete: true },
    deals: { view: true, create: true, edit: true, delete: true },
    clients: { view: true, create: true, edit: true, delete: true },
    quotes: { view: true, create: true, edit: true, delete: true },
    invoices: { view: true, create: true, edit: true, delete: true },

    // Project Management
    projects: { view: true, create: true, edit: true, delete: true },
    tasks: { view: true, create: true, edit: true, delete: true },
    calendar: { view: true, create: true, edit: true, delete: true },

    // Production
    production: { view: true, create: true, edit: true, delete: true },
    inventory: { view: true, create: true, edit: true, delete: true },
    maintenance: { view: true, create: true, edit: true, delete: true },

    // Team & Communication
    team: { view: true, create: true, edit: true, delete: true },
    messages: { view: true, create: true, edit: true, delete: true },
    notifications: { view: true, create: true, edit: true, delete: true },

    // Design & Assets
    design: { view: true, create: true, edit: true, delete: true },
    assets: { view: true, create: true, edit: true, delete: true },
    templates: { view: true, create: true, edit: true, delete: true },

    // Settings & Administration
    settings: { view: true, create: true, edit: true, delete: true },
    billing: { view: true, create: true, edit: true, delete: true },
    integrations: { view: true, create: true, edit: true, delete: true },
  },

  admin: {
    // Analytics & Reporting
    analytics: { view: true, create: true, edit: true, delete: false },
    reports: { view: true, create: true, edit: true, delete: false },
    dashboards: { view: true, create: true, edit: true, delete: false },

    // Sales & CRM
    leads: { view: true, create: true, edit: true, delete: true },
    deals: { view: true, create: true, edit: true, delete: true },
    clients: { view: true, create: true, edit: true, delete: true },
    quotes: { view: true, create: true, edit: true, delete: true },
    invoices: { view: true, create: true, edit: true, delete: false },

    // Project Management
    projects: { view: true, create: true, edit: true, delete: false },
    tasks: { view: true, create: true, edit: true, delete: true },
    calendar: { view: true, create: true, edit: true, delete: true },

    // Production
    production: { view: true, create: true, edit: true, delete: false },
    inventory: { view: true, create: true, edit: true, delete: false },
    maintenance: { view: true, create: true, edit: true, delete: false },

    // Team & Communication
    team: { view: true, create: true, edit: true, delete: false },
    messages: { view: true, create: true, edit: true, delete: true },
    notifications: { view: true, create: true, edit: true, delete: true },

    // Design & Assets
    design: { view: true, create: true, edit: true, delete: false },
    assets: { view: true, create: true, edit: true, delete: false },
    templates: { view: true, create: true, edit: true, delete: false },

    // Settings & Administration
    settings: { view: true, create: true, edit: true, delete: false },
    billing: { view: true, create: false, edit: false, delete: false },
    integrations: { view: true, create: true, edit: true, delete: false },
  },

  manager: {
    // Analytics & Reporting
    analytics: { view: true, create: true, edit: false, delete: false },
    reports: { view: true, create: true, edit: false, delete: false },
    dashboards: { view: true, create: true, edit: false, delete: false },

    // Sales & CRM
    leads: { view: true, create: true, edit: true, delete: false },
    deals: { view: true, create: true, edit: true, delete: false },
    clients: { view: true, create: true, edit: true, delete: false },
    quotes: { view: true, create: true, edit: true, delete: false },
    invoices: { view: true, create: true, edit: false, delete: false },

    // Project Management
    projects: { view: true, create: true, edit: true, delete: false },
    tasks: { view: true, create: true, edit: true, delete: true },
    calendar: { view: true, create: true, edit: true, delete: true },

    // Production
    production: { view: true, create: true, edit: false, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    maintenance: { view: true, create: true, edit: false, delete: false },

    // Team & Communication
    team: { view: true, create: false, edit: false, delete: false },
    messages: { view: true, create: true, edit: true, delete: true },
    notifications: { view: true, create: true, edit: true, delete: true },

    // Design & Assets
    design: { view: true, create: false, edit: false, delete: false },
    assets: { view: true, create: true, edit: false, delete: false },
    templates: { view: true, create: false, edit: false, delete: false },

    // Settings & Administration
    settings: { view: false, create: false, edit: false, delete: false },
    billing: { view: false, create: false, edit: false, delete: false },
    integrations: { view: false, create: false, edit: false, delete: false },
  },

  sales_rep: {
    // Analytics & Reporting
    analytics: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, edit: false, delete: false },
    dashboards: { view: true, create: false, edit: false, delete: false },

    // Sales & CRM
    leads: { view: true, create: true, edit: true, delete: false },
    deals: { view: true, create: true, edit: true, delete: false },
    clients: { view: true, create: true, edit: true, delete: false },
    quotes: { view: true, create: true, edit: false, delete: false },
    invoices: { view: true, create: false, edit: false, delete: false },

    // Project Management
    projects: { view: true, create: false, edit: false, delete: false },
    tasks: { view: true, create: true, edit: true, delete: true },
    calendar: { view: true, create: true, edit: true, delete: true },

    // Production
    production: { view: true, create: false, edit: false, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    maintenance: { view: false, create: false, edit: false, delete: false },

    // Team & Communication
    team: { view: true, create: false, edit: false, delete: false },
    messages: { view: true, create: true, edit: true, delete: true },
    notifications: { view: true, create: true, edit: true, delete: true },

    // Design & Assets
    design: { view: true, create: false, edit: false, delete: false },
    assets: { view: true, create: false, edit: false, delete: false },
    templates: { view: true, create: false, edit: false, delete: false },

    // Settings & Administration
    settings: { view: false, create: false, edit: false, delete: false },
    billing: { view: false, create: false, edit: false, delete: false },
    integrations: { view: false, create: false, edit: false, delete: false },
  },
}; 